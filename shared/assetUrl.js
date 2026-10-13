// Static builds map entry assets to content hashes; the legacy server uses root paths.
export function assetUrl(path) {
 const config = typeof window === 'undefined' ? {} : window.DELTA_GREENERY_CONFIG || {};
 const url = '/' + path.replace(/^\/+/, '');
 return (config.basePath || '') + (config.assetPaths?.[url] || url) + (config.assetVersion ? '?v=' + config.assetVersion : '');
}
