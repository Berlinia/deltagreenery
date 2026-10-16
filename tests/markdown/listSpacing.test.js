require('jsdom-global')();
import Markdown from '../../shared/markdown.js';
const parse=source=>{const el=document.createElement('div');el.innerHTML=Markdown.render(source);return el;};
for(const marker of ['-','1.']) for(const wrapper of ['plain','mustache','quote']) {
 test(`${wrapper} ${marker} list respects blank source line`,()=>{
  const wrap=s=>wrapper==='mustache'?`{{note\n${s}\n}}`:wrapper==='html'?`<div>\n${s}\n</div>`:wrapper==='quote'?s.split('\n').map(l=>'> '+l).join('\n'):s;
  expect(parse(wrap(`Text\n${marker} *item*`)).querySelector('.list-tight em').textContent).toBe('item');
  expect(parse(wrap(`Text\n\n${marker} *item*`)).querySelector('.list-separated em').textContent).toBe('item');
 });
}
test('list item spacing, ordered starts, nesting and code are preserved',()=>{
 const el=parse('Text\n\n3. First\n\n4. Second\n   - Nested');
 expect(el.querySelector('ol').start).toBe(3);
 expect(el.querySelectorAll('ol > li > p')).toHaveLength(2);
 expect(el.querySelector('ul')).not.toBeNull();
 expect(parse('```\nText\n- item\n```').querySelector('ul')).toBeNull();
 expect(parse('Text\r\n  \r\n- item').querySelector('.list-separated')).not.toBeNull();
});
