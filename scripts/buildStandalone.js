import less from 'less';
import fs from 'node:fs/promises';

// Compile the base layout and Delta Green styling in the same order as the renderer.
const source = '@import "themes/V3/Blank/style.less";\n@import "themes/V3/DeltaGreen/style.less";';
const { css } = await less.render(source, { paths: ['.'], compress: true });
await fs.writeFile('deltagreenery.standalone.css', css);
console.log('deltagreenery.standalone.css created (uses the site fonts and assets).');
