import { test, expect, type Page } from '@playwright/test';

/**
 * Capturas a 1440 y 390 px de cada ruta en ES y EN: sin scroll horizontal y con un solo h1.
 * Las comparaciones con los artboards originales se quitaron con el rediseño Sala oscura
 * (el diseño dejó de parecerse a ellos a propósito; quedan en docs/diseno como historial).
 */
async function sitio(page: Page, ruta: string) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(ruta);
  await page.evaluate(() => document.fonts.ready);
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
