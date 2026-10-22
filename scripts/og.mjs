// Genera public/og.png (1200×630), la imagen para compartir en redes. Uso: node scripts/og.mjs
import { chromium } from '@playwright/test';
import { resolve, join } from 'node:path';
import { writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const raiz = resolve(import.meta.dirname, '..');
const fuente = (f) => pathToFileURL(resolve(raiz, 'node_modules/@fontsource-variable', f)).href;
const html = `<!doctype html><html><head><style>
@font-face { font-family: B; font-weight: 200 800; src: url(${fuente('bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2')}); }
@font-face { font-family: G; font-weight: 100 900; src: url(${fuente('geist/files/geist-latin-wght-normal.woff2')}); }
body { margin: 0; width: 1200px; height: 630px; background: #161c1a; color: #e3e2da; font-family: G; display: flex; }
.c { margin: 72px; padding: 64px; flex: 1; border-radius: 32px; background: #1f2725; display: flex; flex-direction: column; justify-content: space-between; }
.t { display: flex; align-items: center; gap: 18px; font-family: B; font-size: 30px; font-weight: 600; }
.a { width: 64px; height: 64px; border-radius: 50%; background: #283330; color: #9fc7b8; display: flex; align-items: center; justify-content: center; font-size: 24px; }
h1 { margin: 0; font-family: B; font-size: 64px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.06; max-width: 18ch; }
.p { display: inline-flex; align-items: center; gap: 10px; align-self: flex-start; padding: 10px 18px; border-radius: 999px; background: #24362f; color: #9fc7b8; font-size: 22px; }
.p i { width: 10px; height: 10px; border-radius: 50%; background: #9fc7b8; }
</style></head><body><div class="c"><div class="t"><span class="a">FR</span>Fabián Rodas</div>
<h1>Construyo software, de la interfaz al servidor.</h1><span class="p"><i></i>fabianrodas.com</span></div></body></html>`;

const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
const dir = await mkdtemp(join(tmpdir(), 'og-'));
await writeFile(join(dir, 'og.html'), html);
await pagina.goto(pathToFileURL(join(dir, 'og.html')).href);
await pagina.evaluate(() => document.fonts.ready);
await pagina.screenshot({ path: resolve(raiz, 'public/og.png') });
await navegador.close();
await rm(dir, { recursive: true });
