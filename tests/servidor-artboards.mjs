// Servidor estático mínimo para renderizar docs/diseno/artboards con scripts/artboards/support.js.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const raiz = resolve(import.meta.dirname, '..');
const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2' };
createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const archivo = url.endsWith('/support.js') ? join(raiz, 'scripts/artboards/support.js') : join(raiz, url);
  if (!archivo.startsWith(raiz)) return res.writeHead(403).end();
  try {
    const datos = await readFile(archivo);
    res.writeHead(200, { 'content-type': tipos[extname(archivo)] ?? 'application/octet-stream' });
    res.end(datos);
  } catch {
    res.writeHead(404).end();
  }
}).listen(4401);
