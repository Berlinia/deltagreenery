import fs from 'fs-extra';
import path from 'node:path';
import { createHash } from 'node:crypto';
import vitreum from 'vitreum';
import lessTransform from 'vitreum/transforms/less.js';

import babel from '@babel/core';
import babelConfig from '../babel.config.json' with { type: 'json' };
import less from 'less';
import { normalizeBasePath, rebaseCss } from './staticPaths.js';
import project from './project.json' with { type: 'json' };

const basePath = normalizeBasePath(process.env.BASE_PATH);
const output = path.resolve('dist');
if(output !== path.join(process.cwd(), 'dist')) throw new Error('Unexpected build output directory.');
await fs.emptyDir(output);
const themes = { Legacy: {}, V3: {} };
for(const family of Object.keys(themes)) {
	for(const name of await fs.readdir('themes/' + family)) {
		const directory = 'themes/' + family + '/' + name;
		const settings = await fs.readJSON(directory + '/settings.json');
		themes[family][name] = { ...settings, path: name };
		const { css } = await less.render(await fs.readFile(directory + '/style.less', 'utf8'), { compress: true });
		await fs.outputFile('dist/' + directory + '/style.css', rebaseCss(css, directory + '/style.css', basePath));
		for(const image of ['dropdownTexture.png', 'dropdownPreview.png']) {
			if(await fs.pathExists(directory + '/' + image)) await fs.copy(directory + '/' + image, 'dist/' + directory + '/' + image);
		}
	}
}
await fs.writeJSON('themes/themes.json', themes, { spaces: 2 });
await fs.copy('themes/fonts', 'dist/fonts');
await fs.copy('themes/assets', 'dist/assets');
await fs.copy('client/icons', 'dist/icons');
await fs.copy('node_modules/codemirror/theme', 'dist/homebrew/cm-themes');
await fs.copy('themes/codeMirror/customThemes', 'dist/homebrew/cm-themes');
await fs.outputFile('dist/homebrew/cm-themes/default.css', '/* Default CodeMirror styling is included in the application bundle. */');
const editorThemes = ['default', ...(await fs.readdir('dist/homebrew/cm-themes')).filter((name)=>name.endsWith('.css') && name !== 'default.css').map((name)=>name.slice(0, -4))];
await fs.writeJSON('themes/codeMirror/editorThemes.json', editorThemes, { spaces: 2 });
await fs.copy('themes/codeMirror', 'dist/homebrew/codeMirror');
const transform = async (code, filename)=>(await babel.transformAsync(code, { ...babelConfig, filename })).code;
const { bundle } = await vitreum.pack('./client/static/App.jsx', {
	name: 'DeltaGreenery', paths: ['./shared', './'], libs: project.libs,
	transforms: { '.js': transform, '.jsx': transform, '.less': lessTransform, '*': async (code, filename)=>{ const relative = path.relative(path.resolve('client'), filename); if(relative.startsWith('..')) throw new Error('Asset outside client: ' + filename); await fs.copy(filename, path.join(output, relative)); return 'module.exports=' + JSON.stringify(basePath + '/' + relative.replace(/\\/g, '/')) + ';'; } }
});
const css = rebaseCss(await lessTransform.generate({ paths: ['./shared', './'] }), 'homebrew/bundle.css', basePath);
const config = await fs.readFile('static/config.js', 'utf8');
const boot = await fs.readFile('static/boot.js', 'utf8');
const version = createHash('sha256').update(bundle + css + config + boot + basePath).digest('hex').slice(0, 16);
const assetPaths = {
 '/homebrew/bundle.js': '/homebrew/bundle.' + version + '.js',
 '/homebrew/bundle.css': '/homebrew/bundle.' + version + '.css',
 '/config.js': '/config.' + version + '.js',
 '/boot.js': '/boot.' + version + '.js'
};
await fs.outputFile('dist' + assetPaths['/homebrew/bundle.js'], bundle);
await fs.outputFile('dist' + assetPaths['/homebrew/bundle.css'], css);
await fs.outputFile('dist' + assetPaths['/config.js'], config + '\nObject.assign(window.DELTA_GREENERY_CONFIG, ' + JSON.stringify({ basePath, assetPaths, assetVersion: version }) + ');\n');
await fs.outputFile('dist' + assetPaths['/boot.js'], boot);
const html = (await fs.readFile('static/index.html', 'utf8')).replace(/(href|src)="(\/(?!\/)[^"]*)"/g, (_, attr, url)=>attr + '="' + basePath + (assetPaths[url] || url) + '"');
await fs.outputFile('dist/index.html', html);
await fs.outputFile('dist/.nojekyll', '');
await fs.copy('static/eula.html', 'dist/eula.html');
await fs.copy('static/privacy.html', 'dist/privacy.html');
// Keep Google's account-specific ownership proof at the root of the Pages site.
await fs.copy('static/googlea05187bd2aa32598.html', 'dist/googlea05187bd2aa32598.html');
await fs.copy('client/homebrew/favicon.ico', 'dist/favicon.ico');
console.log('Static frontend built in dist/. No server code, database, or API is required.');
