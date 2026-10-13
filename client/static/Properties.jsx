import React from 'react';
import themes from '../../themes/themes.json';
export default function Properties({ metadata, onChange }) {
	const change = (key, value)=>onChange({ ...metadata, [key]: value }, key);
	const family = metadata.renderer === 'legacy' ? 'Legacy' : 'V3';
	return <div className='localProperties'>
		<h2>Document properties</h2>
		<label>Title<input value={metadata.title} onChange={(e)=>change('title', e.target.value)} /></label>
		<label>Description<textarea value={metadata.description} onChange={(e)=>change('description', e.target.value)} /></label>
		<label>Renderer<select value={metadata.renderer} onChange={(e)=>onChange({ ...metadata, renderer: e.target.value, theme: 'DeltaGreen' }, 'renderer')}>
			<option value='V3'>Standard</option><option value='legacy'>Legacy</option>
		</select></label>
		<label>Theme<select value={metadata.theme} onChange={(e)=>change('theme', e.target.value)}>
			{!themes[family][metadata.theme] && <option value={metadata.theme}>Unavailable theme</option>}
			{Object.entries(themes[family]).map(([id, theme])=><option key={id} value={id}>{theme.name}</option>)}
		</select></label>
		<label>Language<input value={metadata.lang} onChange={(e)=>change('lang', e.target.value)} /></label>
		<p>Changes are stored in this browser. Download a Markdown backup or save to your own Google Drive to keep a separate copy.</p>
	</div>;
}
