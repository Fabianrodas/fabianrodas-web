// Genera capturas para comparar el sitio con el diseño aprobado.
//   node scripts/capturas.mjs referencia   → renderiza los artboards en docs/capturas/referencia/
//   node scripts/capturas.mjs sitio [url]  → captura el sitio (por defecto http://localhost:4321) en docs/capturas/sitio/
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { chromium } from '@playwright/test';

const raiz = resolve(import.meta.dirname, '..');
const modo = process.argv[2] ?? 'referencia';
const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.css': 'text/css' };

const lanzar = () =>
  chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

async function referencia() {
  const servidor = createServer(async (req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const archivo = url.endsWith('/support.js') ? join(raiz, 'scripts/artboards/support.js') : join(raiz, url);
    try {
      const datos = await readFile(archivo);
      res.writeHead(200, { 'content-type': tipos[extname(archivo)] ?? 'application/octet-stream' });
      res.end(datos);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((ok) => servidor.listen(4400, ok));
  const canvas = JSON.parse(await readFile(join(raiz, 'docs/diseno/artboards/canvas.json'), 'utf8'));
  const salida = join(raiz, 'docs/capturas/referencia');
  await mkdir(salida, { recursive: true });
  const navegador = await lanzar();
  for (const [archivo, b] of Object.entries(canvas.boards)) {
    const pagina = await navegador.newPage({ viewport: { width: b.w, height: 900 } });
    await pagina.goto(`http://localhost:4400/docs/diseno/artboards/${archivo}`);
    await pagina.waitForSelector('html[data-listo]', { state: 'attached' });
    await pagina.evaluate(() => document.fonts.ready);
    const nombre = archivo.replace('.dc.html', '');
    await pagina.screenshot({ path: join(salida, `${nombre}.png`), fullPage: true });
    console.log('✓', nombre);
    await pagina.close();
  }
  await navegador.close();
  servidor.close();
}

const rutas = [
  ['inicio', '/'],
  ['proyectos', '/proyectos/'],
  ['proyecto-lumen', '/proyectos/lumen/'],
  ['sobre-mi', '/sobre-mi/'],
  ['contacto', '/contacto/'],
  ['404', '/404/'],
];

async function sitio(base) {
  const salida = join(raiz, 'docs/capturas/sitio');
  await mkdir(salida, { recursive: true });
  const navegador = await lanzar();
  for (const ancho of [1440, 390]) {
    for (const lang of ['es', 'en']) {
      for (const [nombre, ruta] of rutas) {
        const pagina = await navegador.newPage({ viewport: { width: ancho, height: 900 }, reducedMotion: 'reduce' });
        const prefijo = lang === 'en' && nombre !== '404' ? '/en' : '';
        if (lang === 'en' && nombre === '404') continue;
        await pagina.goto(base + prefijo + ruta);
        await pagina.evaluate(() => document.fonts.ready);
        await pagina.screenshot({ path: join(salida, `${nombre}-${lang}-${ancho}.png`), fullPage: true });
        console.log('✓', nombre, lang, ancho);
        await pagina.close();
      }
    }
  }
  await navegador.close();
}

async function una(ruta, ancho, archivo) {
  const navegador = await lanzar();
  const pagina = await navegador.newPage({ viewport: { width: Number(ancho), height: 900 }, reducedMotion: 'reduce' });
  await pagina.goto('http://localhost:4321' + ruta);
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.screenshot({ path: archivo, fullPage: true });
  await navegador.close();
}

if (modo === 'referencia') await referencia();
else if (modo === 'una') await una(process.argv[3], process.argv[4], process.argv[5]);
else await sitio(process.argv[3] ?? 'http://localhost:4321');
