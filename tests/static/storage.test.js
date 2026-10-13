import { emptyDocument, parseDocument, serializeDocument } from '../../client/static/documentFormat.js';
import { createDraftStore } from '../../client/static/draftStore.js';
import { createDriveClient } from '../../client/static/googleDrive.js';
import { getThemeBundle } from '../../client/static/themeBundle.js';
const draft = ()=>({ ...emptyDocument('# Operation Ω'), id: 'draft-1', revision: 0, style: '.page { color: red; }', snippets: 'example' });
const response = (data, status = 200)=>({ ok: status < 400, status, headers: { get: ()=> 'etag-1' }, json: async ()=>data, text: async ()=>data });
function driveHarness(account = 'user-1') {
 const fetchImpl = jest.fn().mockResolvedValue(response({user: {permissionId: account}}));
 const oauth = { hasGrantedAllScopes: ()=>true, initTokenClient: (options)=>({requestAccessToken: ()=>options.callback({access_token:'memory-token', expires_in:3600})}) };
 let time = 0;
 const client = createDriveClient({clientId:'public-id',googleProvider:()=>({accounts:{oauth2:oauth}}),fetchImpl,now:()=>time});
 return {client, fetchImpl, expire:()=>{time=4000000;}};
}
test('Markdown round trips content, CSS and metadata without browser or Drive identifiers', ()=>{
 const original = {...draft(), drive: {id:'private-id'}, access_token:'secret'};
 const text = serializeDocument(original);
 expect(text).not.toContain('private-id'); expect(text).not.toContain('secret');
 expect(parseDocument(text)).toEqual({...emptyDocument(original.text), style:original.style, snippets:original.snippets});
 expect(parseDocument('# Plain').text).toBe('# Plain');
 expect(()=>parseDocument('```metadata\ntitle: [bad]\n```\n')).toThrow('Invalid title');
 expect(parseDocument('```metadata\ntheme: 5ePHB\n```\ntext').theme).toBe('DeltaGreen');
});
test('browser drafts survive reopening; stale edits cannot overwrite another tab', ()=>{
 const values = new Map(); const storage = {get length(){return values.size;},key:i=>[...values.keys()][i],getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};
 const store = createDraftStore(storage), saved=store.save(draft());
 store.select(saved.id); expect(createDraftStore(storage).active()).toBe(saved.id);
 expect(createDraftStore(storage).list()[0].text).toBe(saved.text);
 store.save({...saved,text:'new'}); expect(()=>store.save({...saved,text:'stale'})).toThrow('another tab');
 expect(store.list()[0].text).toBe('new'); store.remove(saved.id); expect(store.list()).toEqual([]);
 storage.setItem=()=>{throw new Error('QuotaExceeded');}; expect(()=>store.save(draft())).toThrow('QuotaExceeded');
});
test('theme bundle resolves both renderers and renamed themes locally',()=>{
 expect(getThemeBundle('V3','5ePHB').joinedStyles).toContain('/V3/DeltaGreen/style.css');
 expect(getThemeBundle('legacy','DeltaGreen').joinedStyles).toContain('/Legacy/DeltaGreen/style.css');
 expect(()=>getThemeBundle('V3','missing')).toThrow('not installed');
});
test('Drive creates a private Markdown file directly using memory token',async()=>{
 const {client,fetchImpl}=driveHarness(); await client.connect();
 fetchImpl.mockResolvedValue(response({id:'file-1',modifiedTime:'t1'}));
 const saved=await client.save(draft()); expect(saved.account).toBe('user-1');
 const [url,options]=fetchImpl.mock.calls.at(-1); expect(url).toContain('upload/drive/v3/files?'); expect(options.method).toBe('POST');
 expect(options.headers.Authorization).toBe('Bearer memory-token'); expect(options.body).toContain('# Operation Ω'); expect(options.body).not.toContain('permissions');
 client.disconnect(); await expect(client.save(draft())).rejects.toThrow('Connect');
});
test('Drive updates use conditional writes and reject changed files',async()=>{
 const {client,fetchImpl}=driveHarness(); await client.connect();
 const linked={...draft(),drive:{id:'file-1',account:'user-1',modifiedTime:'t1'}};
 fetchImpl.mockResolvedValueOnce(response({modifiedTime:'t1'})).mockResolvedValueOnce(response({id:'file-1',modifiedTime:'t2'}));
 await client.save(linked); expect(fetchImpl.mock.calls.at(-1)[1].method).toBe('PATCH'); expect(fetchImpl.mock.calls.at(-1)[1].headers['If-Match']).toBe('etag-1');
 fetchImpl.mockResolvedValueOnce(response({modifiedTime:'t3'})); await expect(client.save(linked)).rejects.toThrow('changed elsewhere');
});
test('switching accounts creates a new file instead of reusing the old account file',async()=>{
 const {client,fetchImpl}=driveHarness('user-2'); await client.connect(); fetchImpl.mockResolvedValue(response({id:'new',modifiedTime:'t1'}));
 await client.save({...draft(),drive:{id:'old-account-file',account:'user-1'}});
 expect(fetchImpl.mock.calls.at(-1)[0]).not.toContain('old-account-file'); expect(fetchImpl.mock.calls.at(-1)[1].method).toBe('POST');
});
test('expired and rejected authorization does not silently retry uploads',async()=>{
 const {client,fetchImpl,expire}=driveHarness(); await client.connect(); expire(); await expect(client.save(draft())).rejects.toThrow('Connect'); expect(fetchImpl).toHaveBeenCalledTimes(1);
 const second=driveHarness(); await second.client.connect(); second.fetchImpl.mockResolvedValue(response({},401)); await expect(second.client.list()).rejects.toThrow('expired'); expect(second.client.connected()).toBe(false);
});
test('Drive lists all pages and opens Markdown with its owning account',async()=>{
 const {client,fetchImpl}=driveHarness(); await client.connect();
 fetchImpl.mockResolvedValueOnce(response({files:[{id:'a'}],nextPageToken:'next'})).mockResolvedValueOnce(response({files:[{id:'b'}]}));
 expect(await client.list()).toHaveLength(2);
 fetchImpl.mockResolvedValueOnce(response({modifiedTime:'t1'})).mockResolvedValueOnce(response(serializeDocument(draft())));
 const opened=await client.open('a'); expect(opened.text).toBe(draft().text); expect(opened.drive.account).toBe('user-1');
});
