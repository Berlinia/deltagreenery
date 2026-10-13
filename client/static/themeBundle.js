import themes from '../../themes/themes.json';
import { normalizeThemeName } from '../../shared/themeNames.js';
export function getThemeBundle(renderer, theme) {
	const family = renderer === 'legacy' ? 'Legacy' : 'V3';
	let id = normalizeThemeName(theme);
	const styles = [], snippets = [], visited = new Set();
	const selected = themes[family]?.[id];
	if(!selected) throw new Error('This theme is not installed. Choose a built-in theme in Properties; custom CSS is preserved.');
	while(id) {
		if(visited.has(id)) throw new Error('Circular theme inheritance.');
		visited.add(id);
		const current = themes[family][id];
		if(!current) throw new Error('Missing base theme: ' + id);
		styles.unshift('@import url("/themes/' + family + '/' + id + '/style.css");');
		snippets.unshift(family + '_' + (current.baseSnippets || id));
		id = current.baseTheme;
	}
	return { name: selected.name, styles, snippets: [...new Set(snippets)], joinedStyles: styles.map((style)=>'<style>' + style + '</style>').join('\n') };
}
