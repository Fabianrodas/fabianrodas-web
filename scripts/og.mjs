// Genera public/og.png (1200×630), la imagen para compartir en redes. Uso: node scripts/og.mjs
import { chromium } from '@playwright/test';
import { resolve, join } from 'node:path';
import { writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const raiz = resolve(import.meta.dirname, '..');
const archivo = (r) => pathToFileURL(resolve(raiz, r)).href;
// Fondo negro, el nombre en Newsreader y el retrato recortado saliendo de un panel de tono, como en el hero.
const html = `<!doctype html><html><head><style>
@font-face { font-family: N; font-weight: 300 500; src: url(${archivo('src/styles/fuentes/newsreader-latin-opsz-normal.woff2')}); }
body { margin: 0; width: 1200px; height: 630px; background: #111; color: #f2f2f2; font-family: N; display: grid; grid-template-columns: 1fr 440px; }
.f { position: relative; display: flex; align-items: flex-end; justify-content: center; }
.f::before { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 70%; background: #1c1c1c; }
img { position: relative; width: 400px; height: auto; }
.t { display: flex; flex-direction: column; justify-content: flex-end; gap: 28px; padding: 64px 72px; }
h1 { margin: 0; font-size: 112px; font-weight: 400; letter-spacing: -0.04em; line-height: 0.9; }
p { margin: 0; font-size: 32px; line-height: 1.3; }
span { font-size: 24px; color: #a08672; }
</style></head><body><div class="t"><h1>Fabián<br>Rodas</h1><p>Estudiante de Ingeniería en Ciencias de la Computación en Guayaquil. Hago software que llega a producción.</p><span>fabianrodas.com</span></div><div class="f"><img src="${archivo('src/assets/fotos/retrato.png')}" alt=""></div></body></html>`;

const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
const dir = await mkdtemp(join(tmpdir(), 'og-'));
await writeFile(join(dir, 'og.html'), html);
await pagina.goto(pathToFileURL(join(dir, 'og.html')).href);
await pagina.evaluate(() => document.fonts.ready);
await pagina.screenshot({ path: resolve(raiz, 'public/og.png') });
await navegador.close();
await rm(dir, { recursive: true });
