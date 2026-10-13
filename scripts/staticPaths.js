export function normalizeBasePath(value = '') {
 if(!value || value === '/') return '';
 if(!/^\/(?:[A-Za-z0-9_-]+\/?)+$/.test(value)) throw new Error('BASE_PATH must be a URL path such as /deltagreenery.');
 return value.replace(/\/$/, '');
}
// Resolve compiled CSS paths within the output tree, then mount that tree under basePath.
export function rebaseCss(css, filename, basePath) {
 return css.replace(/url\(\s*(['"]?)([^)'"\r\n]+)\1\s*\)/g, (match, quote, value)=>{
  const url = value.trim();
  if(/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url)) return match;
  const resolved = new URL(url, 'https://static.invalid/' + filename);
  return 'url("' + basePath + resolved.pathname + resolved.search + resolved.hash + '")';
 });
}
