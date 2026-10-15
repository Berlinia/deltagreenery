require('jsdom-global')();
import Markdown from '../../shared/markdown.js';
const snippets = require('../../themes/V3/DeltaGreen/snippets.js').find(g=>g.groupName==='DG').snippets;
function render(name) {
 const source=snippets.find(s=>s.name===name).gen();
 expect(Markdown.validate(source)).toEqual([]);
 const root=document.createElement('div'); root.innerHTML=Markdown.render(source);
 expect(root.textContent).not.toContain('{{');
 return root;
}
test('tome snippet generates semantic entry sections instead of a class feature',()=>{
 const root=render('Unnatural Tome');
 expect(root.querySelector('.unnaturalTome > h3')).not.toBeNull();
 expect(root.querySelector('.tomeDetails em')).not.toBeNull();
 expect(root.querySelector('.unnaturalTome blockquote')).not.toBeNull();
 expect(root.querySelector('.tomeRituals strong').textContent).toBe('Recommended rituals:');
});
test('pink paper is a wide editable dossier with labels and body content',()=>{
 const root=render('Pink Background');
 expect(root.querySelector('.pinkBackground.wide')).not.toBeNull();
 expect(root.querySelector('.dossierLabel').textContent).toContain('RESTRICTED BRIEFING');
 expect(root.querySelector('.dossierStamp').textContent).toContain('WORKING COPY');
 expect(root.querySelectorAll('.pinkBackground li')).toHaveLength(3);
 expect(root.querySelector('img')).toBeNull();
});
test('other DG menu entries remain available',()=>{
 for(const name of ['Timeline','Ritual','Disinformation','Disinformation Wide','Monster Stat Block','Artist Credit']) expect(snippets.some(s=>s.name===name)).toBe(true);
});

for(const [name, selector] of [['Ritual','.ritualEntry'], ['Handler Advice','.advicePanel'], ['Evidence Photo','.evidencePhoto.taped'], ['Chapter Opener','.chapterOpener.wide'], ['Briefing Handout','.briefingSheet.wide .briefingColumns'], ['Map Sheet','.mapSheet.wide .mapLegend']]) {
 test(name + ' generates a complete editable layout',()=>{
  const root=render(name); expect(root.querySelector(selector)).not.toBeNull();
  expect(root.textContent).not.toMatch(/TODO|undefined/);
 });
}
test('image placeholders work on GitHub Pages as well as the local server',()=>{
 const previous=window.DELTA_GREENERY_CONFIG;
 try {
  window.DELTA_GREENERY_CONFIG={basePath:'/deltagreenery'};
  expect(render('Evidence Photo').querySelector('img').getAttribute('src')).toBe('/deltagreenery/assets/dg-photo-placeholder.svg');
  window.DELTA_GREENERY_CONFIG={};
  expect(render('Map Sheet').querySelector('img').getAttribute('src')).toBe('/assets/dg-map-placeholder.svg');
 } finally { window.DELTA_GREENERY_CONFIG=previous; }
});
