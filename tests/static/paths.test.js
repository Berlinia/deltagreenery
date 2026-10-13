import { normalizeBasePath, rebaseCss } from '../../scripts/staticPaths.js';
import { assetUrl } from '../../shared/assetUrl.js';
test('Pages path accepts root or repository paths and rejects URLs and traversal',()=>{
 expect(normalizeBasePath('/')).toBe(''); expect(normalizeBasePath('/deltagreenery/')).toBe('/deltagreenery');
 for(const value of ['https://example.com','//example.com','/../elsewhere','/path?query']) expect(()=>normalizeBasePath(value)).toThrow();
});
test('CSS assets resolve under the Pages mount without changing external URLs',()=>{
 const css = `a{src:url('../../../fonts/My Font.woff2')}b{background:url('/assets/page.png')}c{background:url(https://example.com/image.png)}d{mask:url(#mask)}`;
 const result = rebaseCss(css,'themes/V3/DeltaGreen/style.css','/deltagreenery');
 expect(result).toContain('/deltagreenery/fonts/My%20Font.woff2'); expect(result).toContain('/deltagreenery/assets/page.png');
 expect(result).toContain('url(https://example.com/image.png)'); expect(result).toContain('url(#mask)');
 expect(rebaseCss('a{src:url(/fonts/icon.woff2)}','homebrew/bundle.css','')).toContain('url("/fonts/icon.woff2")');
});
test('shared runtime assets support the static mount and legacy root',()=>{
 const previous = global.window;
 global.window = {DELTA_GREENERY_CONFIG:{basePath:'/deltagreenery'}};
 expect(assetUrl('/homebrew/bundle.css')).toBe('/deltagreenery/homebrew/bundle.css');
 global.window = {}; expect(assetUrl('/homebrew/bundle.css')).toBe('/homebrew/bundle.css');
 global.window = previous;
});

test('versioned entry assets resolve inside the preview as well as the homepage',()=>{
 const previous = global.window;
 try {
  global.window = {DELTA_GREENERY_CONFIG: {basePath:'/deltagreenery', assetVersion:'abc123', assetPaths:{'/homebrew/bundle.css':'/homebrew/bundle.abc123.css'}}};
  expect(assetUrl('/homebrew/bundle.css')).toBe('/deltagreenery/homebrew/bundle.abc123.css?v=abc123');
  expect(assetUrl('/themes/V3/DeltaGreen/style.css')).toBe('/deltagreenery/themes/V3/DeltaGreen/style.css?v=abc123');
 } finally { global.window = previous; }
});
