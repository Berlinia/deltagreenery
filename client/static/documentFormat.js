import yaml from 'js-yaml';
import deltaGreenLicense from '../../themes/deltaGreenLicense.js';
import { normalizeThemeName } from '../../shared/themeNames.js';

export const emptyDocument = (text = deltaGreenLicense.subsnippets[0].gen() + '# New operation\n\nBegin your briefing here.\n')=>({
	title: 'Untitled operation', text, style: '', snippets: '', renderer: 'V3',
	theme: 'DeltaGreen', lang: 'en', description: '', tags: [], systems: ['Delta Green']
});
const fields = ['title', 'description', 'renderer', 'theme', 'lang', 'tags', 'systems', 'snippets'];
export function serializeDocument(document) {
	const metadata = Object.fromEntries(fields.map((key)=>[key, document[key] ?? emptyDocument()[key]]));
	return '```metadata\n' + yaml.dump(metadata, { lineWidth: -1 }) + '```\n\n' +
		(document.style ? '```css\n' + document.style + '\n```\n\n' : '') + document.text;
}
export function parseDocument(source) {
	let text = source.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
	const document = emptyDocument('');
	for(const kind of ['metadata', 'css']) {
		if(!text.startsWith('```' + kind + '\n')) continue;
		const end = text.indexOf('\n```', kind.length + 4);
		if(end < 0) throw new Error('The ' + kind + ' block is missing its closing fence.');
		const value = text.slice(kind.length + 4, end);
		if(kind === 'css') document.style = value;
		else {
			const metadata = yaml.load(value, { schema: yaml.JSON_SCHEMA });
			if(!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) throw new Error('Invalid document metadata.');
			for(const key of fields) if(Object.hasOwn(metadata, key)) document[key] = metadata[key];
		}
		text = text.slice(end + 4).replace(/^\n{1,2}/, '');
	}
	for(const key of ['title', 'description', 'renderer', 'theme', 'lang', 'snippets']) {
		if(typeof document[key] !== 'string') throw new Error('Invalid ' + key + ' in document metadata.');
	}
	if(!['V3', 'legacy'].includes(document.renderer)) throw new Error('Unknown document renderer.');
	for(const key of ['tags', 'systems']) if(!Array.isArray(document[key])) document[key] = [];
	document.theme = normalizeThemeName(document.theme);
	document.text = text;
	return document;
}
