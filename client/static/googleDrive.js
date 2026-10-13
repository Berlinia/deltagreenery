import { serializeDocument, parseDocument } from './documentFormat.js';
const SCOPE = 'https://www.googleapis.com/auth/drive.file';
const API = 'https://www.googleapis.com/drive/v3';
let sdkPromise;
export function loadGoogleIdentity() {
	if(window.google?.accounts?.oauth2) return Promise.resolve();
	if(!sdkPromise) sdkPromise = new Promise((resolve, reject)=>{
		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.onload = resolve;
		script.onerror = ()=>{ sdkPromise = null; script.remove(); reject(new Error('Could not load Google authorization. Try again when online.')); };
		document.head.appendChild(script);
	});
	return sdkPromise;
}
export function createDriveClient({ clientId, googleProvider = ()=>window.google, fetchImpl = (...args)=>fetch(...args), now = ()=>Date.now() }) {
	let token = null, expiresAt = 0, account = null;
	const connected = ()=>!!token && now() < expiresAt && !!account;
	const disconnect = ()=>{ token = null; account = null; expiresAt = 0; };
	async function call(url, options = {}) {
		if(!token || now() >= expiresAt) { disconnect(); throw new Error('Connect Google Drive again to continue. Your browser draft is safe.'); }
		const response = await fetchImpl(url, { ...options, headers: { ...options.headers, Authorization: 'Bearer ' + token } });
		if(response.status === 401) { disconnect(); throw new Error('Google authorization expired. Connect Google Drive again.'); }
		if(response.status === 412) throw new Error('This Drive file changed elsewhere. Open the latest copy or save this draft as a new file.');
		if(!response.ok) throw new Error('Google Drive request failed (' + response.status + '). Your browser draft has been kept.');
		return response;
	}
	async function metadata(id) {
		const response = await call(API + '/files/' + encodeURIComponent(id) + '?fields=id,name,modifiedTime,trashed');
		return { ...(await response.json()), etag: response.headers.get('etag') };
	}
	return {
		connected, disconnect,
		account: ()=>account,
		connect() {
			if(!clientId) return Promise.reject(new Error('Google Drive has not been configured for this site yet. Browser drafts and Markdown downloads are available.'));
			return new Promise((resolve, reject)=>{
				const oauth = googleProvider()?.accounts?.oauth2;
				if(!oauth) { reject(new Error('Google authorization is still loading. Try Connect Google Drive again.')); return; }
				disconnect();
				const client = oauth.initTokenClient({
					client_id: clientId, scope: SCOPE, include_granted_scopes: false,
					error_callback: ()=>reject(new Error('Google connection was cancelled or the popup was blocked. Try again.')),
					callback: async (result)=>{
						try {
							if(result.error || !result.access_token || !oauth.hasGrantedAllScopes(result, SCOPE)) throw new Error('Google Drive permission was not granted.');
							token = result.access_token;
							expiresAt = now() + (Number(result.expires_in) - 30) * 1000;
							account = (await (await call(API + '/about?fields=user(displayName,emailAddress,permissionId)')).json()).user;
							if(!account?.permissionId) throw new Error('Could not identify the connected Drive.');
							resolve(account);
						} catch(error) { disconnect(); reject(error); }
					}
				});
				client.requestAccessToken({ prompt: 'select_account' });
			});
		},
		async list() {
			const files = [];
			let nextPageToken;
			do {
				const query = new URLSearchParams({ q: "trashed = false and appProperties has { key='application' and value='deltagreenery' }", fields: 'nextPageToken,files(id,name,modifiedTime)', pageSize: '100', orderBy: 'modifiedTime desc' });
				if(nextPageToken) query.set('pageToken', nextPageToken);
				const result = await (await call(API + '/files?' + query)).json();
				files.push(...(result.files || [])); nextPageToken = result.nextPageToken;
			} while(nextPageToken);
			return files;
		},
		async open(id) {
			const info = await metadata(id);
			if(info.trashed) throw new Error('This file is in the Drive trash.');
			const source = await (await call(API + '/files/' + encodeURIComponent(id) + '?alt=media')).text();
			return { ...parseDocument(source), drive: { id, account: account.permissionId, modifiedTime: info.modifiedTime, etag: info.etag } };
		},
		async save(draft, asNew = false) {
			if(!connected()) throw new Error('Connect Google Drive before saving.');
			// Never reuse another Google account's cached file ID.
			const existing = !asNew && draft.drive?.account === account.permissionId ? draft.drive : null;
			let latest;
			if(existing) {
				latest = await metadata(existing.id);
				if(latest.trashed || latest.modifiedTime !== existing.modifiedTime) throw new Error('This Drive file changed elsewhere. Open the latest copy or use Save new Drive copy.');
			}
			const name = (draft.title || 'Untitled operation').replace(/[\\/:*?"<>|]/g, '-') + '.md';
			const meta = { name, mimeType: 'text/markdown', appProperties: { application: 'deltagreenery', draftId: draft.id } };
			const boundary = 'dg_' + crypto.randomUUID();
			const body = '--' + boundary + '\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n' + JSON.stringify(meta) +
				'\r\n--' + boundary + '\r\nContent-Type: text/markdown; charset=UTF-8\r\n\r\n' + serializeDocument(draft) + '\r\n--' + boundary + '--';
			const headers = { 'Content-Type': 'multipart/related; boundary=' + boundary };
			if(existing && latest.etag) headers['If-Match'] = latest.etag;
			const response = await call('https://www.googleapis.com/upload/drive/v3/files' + (existing ? '/' + encodeURIComponent(existing.id) : '') + '?uploadType=multipart&fields=id,name,modifiedTime', {
				method: existing ? 'PATCH' : 'POST', headers, body
			});
			const info = await response.json();
			return { id: info.id, account: account.permissionId, modifiedTime: info.modifiedTime, etag: response.headers.get('etag') };
		}
	};
}
