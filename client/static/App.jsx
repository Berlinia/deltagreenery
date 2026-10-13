import React, { useEffect, useMemo, useRef, useState } from 'react';
import './app.less';
import Editor from '../homebrew/editor/editor.jsx';
import BrewRenderer from '../homebrew/brewRenderer/brewRenderer.jsx';
import SplitPane from '../components/splitPane/splitPane.jsx';
import Markdown from '../../shared/markdown.js';
import { printCurrentBrew } from '../../shared/helpers.js';
import { createDraftStore } from './draftStore.js';
import { emptyDocument, parseDocument, serializeDocument } from './documentFormat.js';
import { getThemeBundle } from './themeBundle.js';
import { createDriveClient, loadGoogleIdentity } from './googleDrive.js';
import Properties from './Properties.jsx';

const welcome = '# Your next operation\n\n## A private workspace\n\nWrite your briefing here. Your changes are saved in this browser automatically.\n\nUse **Download Markdown** to keep a backup, or connect your own Google Drive to save a copy there.\n\n{{note\n##### Field notes\nUse the DG menu above the editor to insert timelines, disinformation, and other templates.\n}}\n\n\\column\n\n## Working with pages\n\nAdd `\\page` on its own line to begin a new page. The paintbrush tab lets you customize the document CSS.\n\nYour publication disclaimer is added to every page automatically.\n\n{{pageNumber,auto}}';
const makeDraft = (document = emptyDocument())=>({ ...document, id: crypto.randomUUID(), revision: 0, driveDirty: true });

function App() {
	const [brew, setBrew] = useState(null), [drafts, setDrafts] = useState([]);
	const [error, setError] = useState(''), [status, setStatus] = useState('Loading browser drafts...');
	const [busy, setBusy] = useState(false), [account, setAccount] = useState(null), [driveFiles, setDriveFiles] = useState(null);
	const [cursor, setCursor] = useState(1), [viewPage, setViewPage] = useState(1), [previewPage, setPreviewPage] = useState(1);
	const store = useRef(null), current = useRef(null), editor = useRef(null), upload = useRef(null), locallySaved = useRef(true);
	const clientId = typeof window === 'undefined' ? '' : window.DELTA_GREENERY_CONFIG?.googleClientId || '';
	const drive = useMemo(()=>createDriveClient({ clientId }), [clientId]);
	const show = (draft)=>{ current.current = draft; setBrew(draft); };
	const refresh = ()=>setDrafts(store.current.list());
	const persist = (next)=>{
		try {
			const saved = store.current.save(next);
			store.current.select(saved.id);
			locallySaved.current = true;
			show(saved); refresh(); setStatus('Saved in this browser');
			return saved;
		} catch(err) {
			locallySaved.current = false;
			show(next); setStatus('Not saved in this browser');
			setError(err.code === 'CONFLICT' ? err.message : 'Browser storage is full or unavailable. Download Markdown now to keep your changes.');
			return null;
		}
	};
	useEffect(()=>{
		try {
			store.current = createDraftStore(window.localStorage);
			const existing = store.current.list();
			const active = existing.find((item)=>item.id === store.current.active()) || existing[0];
			if(active) { show(active); setDrafts(existing); setStatus('Saved in this browser'); }
			else {
				// Preserve the previous installation's unsaved editor draft, if present.
				const previous = localStorage.getItem('HB_newPage_content');
				const initial = emptyDocument(previous ?? welcome);
				initial.title = previous ? 'Recovered browser draft' : 'Your next operation';
				if(previous) { initial.style = localStorage.getItem('HB_newPage_style') || ''; initial.snippets = localStorage.getItem('HB_newPage_snippets') || ''; }
				persist(makeDraft(initial));
			}
		} catch(err) { show(makeDraft(emptyDocument(welcome))); locallySaved.current = false; setError('Browser storage is unavailable. Download Markdown to keep your work. ' + err.message); setStatus('Browser drafts unavailable'); }
		const unload = (event)=>{ if(!locallySaved.current) { event.preventDefault(); event.returnValue = ''; } };
		const changed = (event)=>{ if(event.key?.startsWith('DG_draft_')) { try { refresh(); } catch(err) { setError(err.message); } } };
		window.addEventListener('beforeunload', unload); window.addEventListener('storage', changed);
		if(clientId) loadGoogleIdentity().catch((err)=>setError(err.message));
		return ()=>{ window.removeEventListener('beforeunload', unload); window.removeEventListener('storage', changed); };
	}, []);
	useEffect(()=>{
		const keys = (event)=>{
			if(!(event.ctrlKey || event.metaKey)) return;
			if(event.key.toLowerCase() === 's') { event.preventDefault(); if(current.current) persist(current.current); }
			if(event.key.toLowerCase() === 'p') { event.preventDefault(); if(current.current) printCurrentBrew(); }
		};
		document.addEventListener('keydown', keys);
		return ()=>document.removeEventListener('keydown', keys);
	}, []);
	const theme = useMemo(()=>{
		if(!brew) return { bundle: {}, error: '' };
		try { return { bundle: getThemeBundle(brew.renderer, brew.theme), error: '' }; }
		catch(err) { return { bundle: getThemeBundle('V3', 'Blank'), error: err.message }; }
	}, [brew?.renderer, brew?.theme]);
	const change = (field)=>(value)=>{
		const next = field === 'metadata' ? { ...current.current, ...value } : { ...current.current, [field]: value };
		persist({ ...next, driveDirty: true });
	};
	const canLeave = ()=>locallySaved.current || window.confirm('This document has changes that could not be saved. Download Markdown first to keep them. Leave anyway?');
	const select = (draft)=>{
		if(!draft || !canLeave()) return;
		show(draft); locallySaved.current = true; setCursor(1); setViewPage(1); setPreviewPage(1); setError(''); setStatus('Saved in this browser');
		try { store.current.select(draft.id); } catch(err) { setError(err.message); }
	};
	const create = ()=>{ if(canLeave()) { setError(''); const saved = persist(makeDraft()); if(saved) select(saved); } };
	const download = ()=>{
		const url = URL.createObjectURL(new Blob([serializeDocument(current.current)], { type: 'text/markdown;charset=utf-8' }));
		const anchor = document.createElement('a'); anchor.href = url; anchor.download = (current.current.title || 'operation').replace(/[\\/:*?"<>|]/g, '-') + '.md'; anchor.click();
		setTimeout(()=>URL.revokeObjectURL(url), 1000);
	};
	const run = async (action)=>{
		if(busy) return;
		setBusy(true); setError('');
		try { await action(); } catch(err) { setError(err.message); }
		finally { setAccount(drive.connected() ? drive.account() : null); setBusy(false); }
	};
	const saveDrive = (asNew = false)=>run(async ()=>{
		const snapshot = { ...current.current };
		const file = await drive.save(snapshot, asNew);
		const next = { ...current.current, drive: file, driveDirty: serializeDocument(current.current) !== serializeDocument(snapshot) };
		persist(next);
	});
	const openDrive = (file)=>run(async ()=>{
		if(!canLeave()) return;
		const document = await drive.open(file.id);
		const saved = persist({ ...makeDraft(document), driveDirty: false });
		if(saved) select(saved);
		setDriveFiles(null);
	});
	const importFile = async (event)=>{
		const file = event.target.files[0]; event.target.value = '';
		if(!file || !canLeave()) return;
		try {
			if(file.size > 5 * 1024 * 1024) throw new Error('Choose a Markdown file smaller than 5 MB.');
			const document = parseDocument(await file.text());
			if(document.title === 'Untitled operation') document.title = file.name.replace(/\.(md|markdown|txt)$/i, '');
			const saved = persist(makeDraft(document)); if(saved) select(saved);
		} catch(err) { setError(err.message); }
	};
	const remove = ()=>{
		if(!window.confirm('Remove this browser draft? Any copy on Google Drive will remain.')) return;
		try { store.current.remove(brew.id); locallySaved.current = true; const remaining = store.current.list(); refresh(); if(remaining.length) select(remaining[0]); else persist(makeDraft()); }
		catch(err) { setError(err.message); }
	};
	return <div className='staticApp'>
		<header className='appHeader'>
			<a className='brand' href='./'>DELTA GREENERY</a>
			<span className='storageStatus' role='status'>{status}{brew?.drive && (brew.driveDirty ? ' · Drive has an older copy' : ' · Drive copy saved')}</span>
			<div className='actions'>
				<button disabled={busy || !brew} onClick={create}>New</button>
				<button disabled={busy || !brew} onClick={()=>upload.current.click()}>Import Markdown</button>
				<button disabled={!brew} onClick={download}>Download Markdown</button>
				<button disabled={!brew} onClick={printCurrentBrew}>Print / PDF</button>
				<button disabled={busy || !clientId} title={!clientId ? 'Drive connection will be available after the site owner configures Google authorization.' : ''} onClick={()=>run(()=>drive.connect())}>{account ? 'Switch Google account' : 'Connect Google Drive'}</button>
			</div>
		</header>
		{(error || theme.error) && <div className='appError' role='alert'>{error || theme.error}<button onClick={()=>setError('')}>Dismiss</button></div>}
		<div className='workspaceBar'>
			<label>Browser drafts <select aria-label='Browser drafts' value={brew?.id || ''} disabled={busy} onChange={(e)=>select(drafts.find((item)=>item.id === e.target.value))}>
				{drafts.map((item)=><option value={item.id} key={item.id}>{item.title || 'Untitled operation'}</option>)}
			</select></label>
			<button disabled={busy || !brew} onClick={()=>{ const copy = makeDraft({ ...current.current, title: current.current.title + ' (copy)', drive: undefined }); persist(copy); }}>Save browser copy</button>
			<button disabled={busy || !brew} onClick={remove}>Remove browser draft</button>
			{account ? <>
				<span className='driveAccount'>{account.emailAddress}</span>
				<button disabled={busy || !brew} onClick={()=>saveDrive()}>Save to my Drive</button>
				<button disabled={busy || !brew} onClick={()=>saveDrive(true)}>Save new Drive copy</button>
				<button disabled={busy} onClick={()=>run(async ()=>setDriveFiles(await drive.list()))}>Open from Drive</button>
				<button disabled={busy} onClick={()=>{ drive.disconnect(); setAccount(null); setDriveFiles(null); }}>Disconnect</button>
			</> : <span className='storageNote'>Drafts stay on this browser. Clearing site data removes them.</span>}
		</div>
		{driveFiles && <section className='drivePicker' aria-label='Your Drive documents'>
			<h2>Your Delta Greenery files</h2><button onClick={()=>setDriveFiles(null)}>Close</button>
			<p>Files saved by this site to the connected Google Drive.</p>
			{driveFiles.length ? driveFiles.map((file)=><button disabled={busy} key={file.id} onClick={()=>openDrive(file)}>{file.name}</button>) : <p>No files yet. Save your first document to Drive.</p>}
		</section>}
		<input ref={upload} type='file' accept='.md,.markdown,.txt' hidden onChange={importFile} />
		{brew && <main className='workspace'>
			<SplitPane onDragFinish={()=>editor.current?.update()}>
				<Editor key={brew.id} ref={editor} brew={brew} renderer={brew.renderer} onBrewChange={change} themeBundle={theme.bundle} propertiesComponent={Properties} browserOnly={true}
					onCursorPageChange={setCursor} onViewPageChange={setViewPage} currentEditorCursorPageNum={cursor} currentEditorViewPageNum={viewPage} currentBrewRendererPageNum={previewPage} reportError={(err)=>setError(err.message)} />
				<BrewRenderer key={brew.id} text={brew.text} style={brew.style} renderer={brew.renderer} theme={brew.theme} lang={brew.lang} themeBundle={theme.bundle} errors={Markdown.validate(brew.text)}
					currentEditorCursorPageNum={cursor} currentEditorViewPageNum={viewPage} currentBrewRendererPageNum={previewPage} onPageChange={setPreviewPage} allowPrint={true} showNotifications={false} />
			</SplitPane>
		</main>}
	</div>;
}

module.exports = App;
