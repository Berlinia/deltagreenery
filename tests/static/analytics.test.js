import { createAnalytics, CONSENT_KEY } from '../../client/static/analytics.js';
function harness(config = {googleAnalyticsId:'G-TEST123',basePath:'/deltagreenery'}) {
 const values = new Map();
 const win = {location:{origin:'https://example.com',search:'?private=secret',hash:'#private'},localStorage:{getItem:key=>values.get(key) || null,setItem:(key,value)=>values.set(key,value)}};
 const doc = {cookie:'',createElement:()=>({}),head:{appendChild:jest.fn()}};
 return {win,doc,values,client:createAnalytics(win,doc,config)};
}
test('absent or invalid ID never loads a tag',()=>{
 for(const id of ['', 'bad-id']) { const {client,doc}=harness({googleAnalyticsId:id}); client.choose('granted'); expect(doc.head.appendChild).not.toHaveBeenCalled(); expect(client.enabled).toBe(false); }
});
test('unknown and denied consent send no analytics, allowing loads once with safe page metadata',()=>{
 const {client,doc,win}=harness();
 client.apply(client.read()); client.choose('denied');
 expect(doc.head.appendChild).not.toHaveBeenCalled(); expect(win.dataLayer).toBeUndefined();
 client.choose('granted'); client.choose('granted');
 expect(doc.head.appendChild).toHaveBeenCalledTimes(1);
 const commands=win.dataLayer.map(args=>Array.from(args));
 expect(commands[0][2]).toMatchObject({ad_storage:'denied',analytics_storage:'granted'});
 expect(commands.find(c=>c[0]==='config')[2]).toMatchObject({page_title:'Delta Greenery',page_location:'https://example.com/deltagreenery/',page_referrer:'',allow_google_signals:false,cookie_domain:'none'});
 expect(JSON.stringify(commands)).not.toContain('secret');
 client.choose('denied'); expect(win['ga-disable-G-TEST123']).toBe(true);
 expect(client.read()).toBe('denied');
});
test('expired consent and unavailable storage default to no collection',()=>{
 const {client,values,win,doc}=harness();
 values.set(CONSENT_KEY,JSON.stringify({choice:'granted',time:0})); expect(client.read()).toBe(null);
 win.localStorage.getItem=()=>{throw Error('blocked');}; win.localStorage.setItem=()=>{throw Error('blocked');};
 expect(client.read()).toBe(null); client.apply(client.read()); expect(doc.head.appendChild).not.toHaveBeenCalled();
 expect(()=>client.choose('denied')).not.toThrow();
});
test('withdrawing consent removes only app analytics cookies',()=>{
 const {client,doc}=harness(); const writes=[];
 Object.defineProperty(doc,'cookie',{get:()=> 'dg_analytics__ga=123; unrelated=keep',set:value=>writes.push(value)});
 client.choose('denied'); expect(writes).toEqual(['dg_analytics__ga=; Max-Age=0; Path=/deltagreenery/; SameSite=Lax']);
});
