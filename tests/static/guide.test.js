require('jsdom-global')();
import Markdown from '../../shared/markdown.js';
import { createGuide } from '../../client/static/guide.js';
const snippets = require('../../themes/V3/DeltaGreen/snippets.js');
const timeline = snippets.find((group)=>group.groupName === 'DG').snippets.find((snippet)=>snippet.name === 'Timeline').gen;
test('DG timeline produces full-width lists matching timeline CSS selectors',()=>{
 const wrapper = document.createElement('div'); wrapper.innerHTML=Markdown.render(timeline());
 const panel = wrapper.querySelector('.timeline.wide'); expect(panel).not.toBeNull();
 expect(panel.querySelectorAll(':scope > h5')).toHaveLength(2);
 expect(panel.querySelectorAll('li')).toHaveLength(3);
 expect(panel.querySelectorAll('li > strong:first-child')).toHaveLength(3);
 expect(panel.querySelectorAll('li > p')).toHaveLength(0);
 expect(wrapper.textContent).not.toContain('{{'); expect(wrapper.textContent).not.toContain('^[1]');
});
test('guide has sixteen valid pages, a real timeline example and protected source examples',()=>{
 const guide=createGuide(); const pages=guide.text.split(/^\\page$/m);
 expect(pages).toHaveLength(16); expect(Markdown.validate(guide.text)).toEqual([]);
 const wrapper=document.createElement('div'); wrapper.innerHTML=pages.map((page,i)=>Markdown.render(page,i)).join('');
 expect(wrapper.querySelectorAll('.timeline')).toHaveLength(1);
 expect(wrapper.querySelectorAll('.unnaturalTome')).toHaveLength(1);
 expect(wrapper.querySelectorAll('.pinkBackground')).toHaveLength(1);
 expect(wrapper.querySelector('a[href="#p10"]')).not.toBeNull();
 expect(wrapper.textContent).not.toContain('Unnatural Tome (TODO)');
 expect(wrapper.querySelector('pre').textContent).toContain('.page .runningHeader');
 expect(wrapper.textContent).toContain('\\snippet Evidence note');
 for(const selector of ['.ritualEntry','.advicePanel','.evidencePhoto','.chapterOpener','.briefingSheet','.mapSheet']) expect(wrapper.querySelector(selector)).not.toBeNull();
 expect(wrapper.textContent).not.toMatch(/__(FIELD|DEMO)_/);
 expect(guide.title).toBe('Delta Greenery Guide');
});
