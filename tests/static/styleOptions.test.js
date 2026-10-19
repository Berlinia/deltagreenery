import less from 'less';
import options from '../../shared/styleOptions.js';
import {createGuide} from '../../client/static/guide.js';
test('style options are inert until individual CSS blocks are uncommented',async()=>{
 expect((await less.render(options,{compress:true})).css).toBe('');
 const blocks=[...options.matchAll(/\/\*\n([\s\S]*?)\n\*\//g)].map(m=>m[1]);
 expect(blocks.length).toBeGreaterThan(10);
 for(const css of blocks) expect((await less.render(css)).css.length).toBeGreaterThan(0);
 expect(createGuide().style).toContain(options);
});
