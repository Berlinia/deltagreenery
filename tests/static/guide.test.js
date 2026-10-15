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
test('guide has twelve valid pages, live examples without duplicate source blocks',()=>{
 const guide=createGuide(); const pages=guide.text.split(/^\\page$/m);
 expect(pages).toHaveLength(12); expect(Markdown.validate(guide.text)).toEqual([]);
 const wrapper=document.createElement('div'); wrapper.innerHTML=pages.map((page,i)=>Markdown.render(page,i)).join('');
 expect(wrapper.querySelectorAll('.timeline')).toHaveLength(1);
 expect(wrapper.querySelectorAll('.unnaturalTome')).toHaveLength(1);
 expect(wrapper.querySelectorAll('.pinkBackground')).toHaveLength(1);
 expect(wrapper.querySelector('a[href="#p10"]')).not.toBeNull();
 expect(wrapper.textContent).not.toContain('Unnatural Tome (TODO)');
 expect(wrapper.querySelector('pre')).toBeNull();
 expect(guide.style).toContain('.page .runningHeader');
 expect(guide.snippets).toContain('\\snippet Evidence note');
 for(const selector of ['.ritualEntry','.advicePanel','.evidencePhoto','.chapterOpener','.briefingSheet','.mapSheet','.sectionDivider','.framedTitle','.loosePaperTable']) expect(wrapper.querySelector(selector)).not.toBeNull();
 expect(wrapper.textContent).not.toMatch(/__(FIELD|DEMO)_/);
 for(const link of wrapper.querySelectorAll('a[href^="#p"]')) {
  expect(Number(link.getAttribute('href').slice(2))).toBeLessThanOrEqual(pages.length);
 }
 expect(Markdown.render(pages[0],0)).toContain('Published by arrangement with the Delta Green Partnership.');
 expect(Markdown.render(pages[0],0)).toContain('Delta Greenery contributors');
 expect(Markdown.render(pages[10],10)).toContain('chapterOpener');
 expect(guide.title).toBe('Delta Greenery Guide');
});
