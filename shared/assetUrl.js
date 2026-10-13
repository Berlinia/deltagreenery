// The static build supplies basePath; the legacy server defaults to the origin root.
export function assetUrl(path) {
 const base = typeof window === 'undefined' ? '' : window.DELTA_GREENERY_CONFIG?.basePath || '';
 return base + '/' + path.replace(/^\/+/, '');
}
