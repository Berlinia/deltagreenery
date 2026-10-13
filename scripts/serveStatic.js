// Development preview only. Production deploys dist/ to a static host.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.otf': 'font/otf', '.webp': 'image/webp', '.ico': 'image/x-icon' };
http.createServer(async (req, res)=>{
	if(!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
	try {
		const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
		const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
		if(!file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
		const content = await fs.readFile(file);
		res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
		res.end(req.method === 'HEAD' ? undefined : content);
	} catch { res.writeHead(404); res.end('Not found'); }
}).listen(Number(process.env.PORT || 8000), '127.0.0.1', ()=>console.log('Static preview: http://localhost:' + (process.env.PORT || 8000)));
