require('jsdom-global')();
import fs from 'node:fs';
import Markdown from '../../shared/markdown.js';

test('local opening guide renders live examples without static-site storage instructions',()=>{
 const text=fs.readFileSync('client/homebrew/pages/homePage/welcome_msg.md','utf8');
 const pages=text.split(/^\\page$/m);
 expect(pages).toHaveLength(12);
 expect(Markdown.validate(text)).toEqual([]);
 const root=document.createElement('div');root.innerHTML=pages.map((page,i)=>Markdown.render(page,i)).join('');
 expect(root.querySelector('pre')).toBeNull();
 expect(root.querySelector('.chapterOpener.wide:not(.compact)')).not.toBeNull();
 expect(root.querySelectorAll('img').length).toBeGreaterThan(0);
 expect(text).not.toMatch(/__(FIELD|DEMO|GUIDE|PHOTO)_/);
 expect(text).not.toContain('Connect Google Drive');
 expect(text).toContain('MongoDB');
 expect(pages[0]).toContain('Published by arrangement with the Delta Green Partnership.');
 expect(pages[0]).toContain('Delta Greenery contributors');
});
