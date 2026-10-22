import { test, expect, type Page } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

/**
 * Compara cada ruta con su artboard (docs/diseno/artboards) renderizado en el mismo navegador.
 * El inicio ya no se compara: su hero se rediseñó y la sección de notas se quitó del alcance.
 *  - la altura total de la página debe parecerse (±4 %),
 *  - y la primera pantalla debe coincidir píxel a píxel en al menos un 90 %.
 * Además guarda capturas a 1440 y 390 px de cada ruta en ES y EN como adjuntos del reporte.
 */
const pares: { artboard: string; ruta: string; ancho: number; sinAlto?: boolean }[] = [
  { artboard: 'Proyectos', ruta: '/proyectos/', ancho: 1440 },
  // Sin comparar el alto: el caso ya no tiene la sección «Bitácora de versiones» (dependía de las notas).
  { artboard: 'Proyecto', ruta: '/proyectos/lumen/', ancho: 1440, sinAlto: true },
  { artboard: 'SobreMi', ruta: '/sobre-mi/', ancho: 1440 },
  { artboard: 'Contacto', ruta: '/contacto/', ancho: 1440 },
];

async function referencia(page: Page, artboard: string) {
  await page.goto(`http://localhost:4401/docs/diseno/artboards/${artboard}.dc.html`);
  await page.waitForSelector('html[data-listo]', { state: 'attached' });
  await page.evaluate(() => document.fonts.ready);
}

async function sitio(page: Page, ruta: string) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(ruta);
  await page.evaluate(() => document.fonts.ready);
}

const alto = (page: Page) => page.evaluate(() => document.documentElement.scrollHeight);

for (const p of pares) {
  test(`${p.ruta} a ${p.ancho}px coincide con ${p.artboard}.dc.html`, async ({ page }, info) => {
    await page.setViewportSize({ width: p.ancho, height: 900 });
    await referencia(page, p.artboard);
    const altoRef = await alto(page);
    const capRef = PNG.sync.read(await page.screenshot());

    await sitio(page, p.ruta);
    const altoSitio = await alto(page);
    const capSitio = PNG.sync.read(await page.screenshot());
    await info.attach(`${p.artboard}-sitio.png`, { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });

    const diferencia = p.sinAlto ? 0 : Math.abs(altoSitio - altoRef) / altoRef;
    expect(diferencia, `alto del sitio ${altoSitio}px vs artboard ${altoRef}px`).toBeLessThan(0.04);

    const { width, height } = capRef;
    const diff = new PNG({ width, height });
    const distintos = pixelmatch(capRef.data, capSitio.data, diff.data, width, height, { threshold: 0.2 });
    const parecido = 1 - distintos / (width * height);
    await info.attach(`${p.artboard}-diferencias.png`, { body: PNG.sync.write(diff), contentType: 'image/png' });
    expect(parecido, `primera pantalla ${(parecido * 100).toFixed(1)} % igual`).toBeGreaterThan(0.9);
  });
}

const rutas = ['/', '/proyectos/', '/proyectos/lumen/', '/sobre-mi/', '/contacto/'];
for (const ancho of [1440, 390]) {
  for (const lang of ['es', 'en']) {
    for (const ruta of rutas) {
      const url = lang === 'en' ? `/en${ruta}` : ruta;
      test(`captura ${url} a ${ancho}px`, async ({ page }, info) => {
        await page.setViewportSize({ width: ancho, height: 900 });
        await sitio(page, url);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 'sin scroll horizontal').toBeLessThanOrEqual(0);
        await expect(page.locator('h1')).toHaveCount(1);
        await info.attach(`${lang}${ruta.replaceAll('/', '_')}${ancho}.png`, { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
      });
    }
  }
}
