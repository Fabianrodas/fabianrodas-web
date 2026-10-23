// Genera public/og.png (1200×630), la imagen para compartir en redes. Uso: node scripts/og.mjs
import { chromium } from '@playwright/test';
import { resolve, join } from 'node:path';
import { writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const raiz = resolve(import.meta.dirname, '..');
const archivo = (r) => pathToFileURL(resolve(raiz, r)).href;
// Sala oscura: fondo casi negro, el retrato a la izquierda y el nombre en Newsreader.
const html = `<!doctype html><html><head><style>
@font-face { font-family: N; font-weight: 300 500; src: url(${archivo('src/styles/fuentes/newsreader-latin-opsz-normal.woff2')}); }
body { margin: 0; width: 1200px; height: 630px; background: #111; color: #f2f2f2; font-family: N; display: grid; grid-template-columns: 420px 1fr; }
img { width: 420px; height: 630px; object-fit: cover; }
.t { display: flex; flex-direction: column; justify-content: flex-end; gap: 28px; padding: 64px 72px; }
h1 { margin: 0; font-size: 120px; font-weight: 400; letter-spacing: -0.04em; line-height: 0.9; }
p { margin: 0; font-size: 32px; line-height: 1.3; }
span { font-size: 24px; color: #a08672; }
</style></head><body><img src="${archivo('public/img/retrato.webp')}" alt="">
<div class="t"><h1>fabián rodas</h1><p>Estudiante de Ingeniería en Ciencias de la Computación en Guayaquil. Hago software que llega a producción.</p><span>fabianrodas.com</span></div></body></html>`;

const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
const dir = await mkdtemp(join(tmpdir(), 'og-'));
await writeFile(join(dir, 'og.html'), html);
await pagina.goto(pathToFileURL(join(dir, 'og.html')).href);
await pagina.evaluate(() => document.fonts.ready);
await pagina.screenshot({ path: resolve(raiz, 'public/og.png') });
await navegador.close();
await rm(dir, { recursive: true });
