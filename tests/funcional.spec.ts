import { test, expect } from '@playwright/test';

test.describe('Proyectos: filtros y buscador', () => {
  test('filtra por categoría y muestra el conteo correcto', async ({ page }) => {
    await page.goto('/proyectos/');
    const visibles = page.locator('[data-proyecto]:visible');
    await expect(visibles).toHaveCount(8);

    await page.getByRole('button', { name: /^Escritorio/ }).click();
    await expect(page.getByRole('button', { name: /^Escritorio/ })).toHaveAttribute('aria-pressed', 'true');
    await expect(visibles).toHaveCount(3);

    await page.getByRole('button', { name: /^Para clientes/ }).click();
    await expect(visibles).toHaveCount(2);
    await expect(page.getByRole('heading', { name: 'Taller' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Lumen' })).toBeHidden();
  });

  test('busca por nombre o tecnología y muestra el estado vacío', async ({ page }) => {
    await page.goto('/proyectos/');
    const buscador = page.getByRole('searchbox', { name: 'Buscar proyecto' });
    await buscador.fill('rust');
    await expect(page.locator('[data-proyecto]:visible')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Cifra' })).toBeVisible();

    await buscador.fill('postgresql');
    await expect(page.locator('[data-proyecto]:visible')).toHaveCount(3);

    await buscador.fill('cobol');
    await expect(page.getByText('No hay proyectos con este filtro')).toBeVisible();
    await page.getByRole('button', { name: 'Ver todos los proyectos' }).click();
    await expect(page.locator('[data-proyecto]:visible')).toHaveCount(8);
    await expect(buscador).toHaveValue('');
  });
});

test.describe('Notas: filtros, paginación y etiquetas', () => {
  test('filtra por tipo y por proyecto', async ({ page }) => {
    await page.goto('/notas/');
    const cuenta = page.locator('[data-cuenta]');
    await expect(cuenta).toHaveText('11 notas');

    await page.getByRole('button', { name: /^Anuncios/ }).click();
    await expect(cuenta).toHaveText('2 notas');
    await expect(page).toHaveURL(/tipo=anuncio/);
    await expect(page.locator('[data-nota-destacada]:visible')).toHaveCount(1);

    await page.getByRole('button', { name: /^Lumen/ }).click();
    await expect(cuenta).toHaveText('1 nota');
    await expect(page.getByRole('heading', { name: 'Lumen ya está en producción' })).toBeVisible();
  });

  test('muestra el estado vacío y lo reinicia', async ({ page }) => {
    await page.goto('/notas/?tipo=anuncio&proyecto=cifra');
    await expect(page.getByText('Todavía no hay notas con este filtro')).toBeVisible();
    await page.getByRole('button', { name: 'Ver todas las notas' }).click();
    await expect(page.locator('[data-cuenta]')).toHaveText('11 notas');
    await expect(page).toHaveURL(/\/notas\/$/);
  });

  test('pagina de 7 en 7', async ({ page }) => {
    await page.goto('/notas/');
    await expect(page.getByText('Página 1 de 2')).toBeVisible();
    await expect(page.locator('[data-nota]:visible')).toHaveCount(6);
    await page.getByRole('link', { name: 'Siguiente' }).click();
    await expect(page.getByText('Página 2 de 2')).toBeVisible();
    await expect(page).toHaveURL(/pagina=2/);
    await expect(page.locator('[data-nota-destacada]:visible')).toHaveCount(1);
    await expect(page.locator('[data-nota]:visible')).toHaveCount(3);
    await expect(page.getByRole('link', { name: 'Siguiente' })).toHaveAttribute('aria-disabled', 'true');
    await page.goBack();
    await expect(page.getByText('Página 1 de 2')).toBeVisible();
  });

  test('filtra por etiqueta y por búsqueda', async ({ page }) => {
    await page.goto('/notas/');
    await page.getByRole('link', { name: 'Rust', exact: true }).click();
    await expect(page).toHaveURL(/etiqueta=rust/);
    await expect(page.locator('[data-cuenta]')).toHaveText('2 notas');

    await page.goto('/notas/');
    await page.getByRole('searchbox', { name: 'Buscar en las notas' }).fill('pasantía');
    await expect(page.locator('[data-cuenta]')).toHaveText('1 nota');
  });

  test('el caso de estudio enlaza a las notas del proyecto', async ({ page }) => {
    await page.goto('/proyectos/lumen/');
    await page.getByRole('link', { name: /Ver las \d+ notas/ }).click();
    await expect(page).toHaveURL(/proyecto=lumen/);
    await expect(page.locator('[data-cuenta]')).toHaveText('4 notas');
  });
});

test.describe('Menú móvil', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('abre, navega y se cierra con Escape', async ({ page }) => {
    await page.goto('/');
    const boton = page.getByRole('button', { name: 'Abrir menú' });
    await expect(page.getByRole('navigation', { name: 'Principal' })).toBeHidden();
    await boton.click();
    await expect(page.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');
    const menu = page.getByRole('navigation', { name: 'Menú' });
    await expect(menu).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeFocused();

    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await menu.getByRole('link', { name: 'Notas' }).click();
    await expect(page).toHaveURL(/\/notas\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Notas' })).toBeVisible();
  });
});

test.describe('Idiomas', () => {
  test('el selector ES/EN lleva a la página equivalente', async ({ page }) => {
    await page.goto('/proyectos/lumen/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await page.getByRole('navigation', { name: 'Idioma' }).getByRole('link', { name: 'EN' }).click();
    await expect(page).toHaveURL(/\/en\/proyectos\/lumen\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('link', { name: 'Projects' }).first()).toBeVisible();
    await page.getByRole('navigation', { name: 'Language' }).getByRole('link', { name: 'ES' }).click();
    await expect(page).toHaveURL(/\/proyectos\/lumen\/$/);
  });

  test('la nota enlaza a su traducción y las rutas en inglés existen', async ({ page }) => {
    await page.goto('/notas/lumen-v1-7/');
    await page.getByRole('link', { name: 'Read in English' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lumen v1.7: posts with several photos');
    for (const ruta of ['/en/', '/en/proyectos/', '/en/notas/', '/en/sobre-mi/', '/en/contacto/', '/en/notas/rss.xml', '/notas/rss.xml']) {
      const r = await page.request.get(ruta);
      expect(r.status(), ruta).toBe(200);
    }
  });
});

test.describe('Formulario de contacto', () => {
  test('valida los campos con mensajes accesibles', async ({ page }) => {
    await page.goto('/contacto/');
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.getByRole('textbox', { name: 'Nombre' })).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByText('Escribe tu nombre.')).toBeVisible();
    await expect(page.getByText('Escribe un email válido')).toBeVisible();
    await expect(page.getByRole('status')).toHaveText('Revisa los campos marcados.');
    await expect(page.getByRole('textbox', { name: 'Nombre' })).toBeFocused();

    await page.getByRole('textbox', { name: 'Email' }).fill('no-es-un-email');
    await page.getByRole('textbox', { name: 'Email' }).blur();
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
  });

  async function llenar(page: import('@playwright/test').Page) {
    await page.getByRole('textbox', { name: 'Nombre' }).fill('Ana Pérez');
    await page.getByRole('textbox', { name: 'Email' }).fill('ana@example.com');
    await page.getByText('Un proyecto', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Mensaje' }).fill('Hola, quiero conversar sobre un proyecto.');
  }

  test('sin endpoint abre el correo con un mailto:', async ({ page }) => {
    await page.goto('/contacto/');
    await llenar(page);
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.getByRole('status')).toContainText('Se abrió tu app de correo');
    const mailto = await page.locator('[data-contacto]').getAttribute('data-mailto');
    expect(mailto).toMatch(/^mailto:hola@fabianrodas\.com\?subject=/);
    expect(decodeURIComponent(mailto ?? '')).toContain('Ana Pérez');
  });

  test('con endpoint envía por POST y confirma', async ({ page }) => {
    let recibido = '';
    await page.route('https://formulario.example.com/**', async (ruta) => {
      recibido = ruta.request().postData() ?? '';
      await ruta.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });
    await page.goto('/contacto/');
    await page.locator('[data-contacto]').evaluate((f) => f.setAttribute('data-endpoint', 'https://formulario.example.com/enviar'));
    await llenar(page);
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.getByRole('status')).toHaveText('¡Gracias! Tu mensaje llegó. Te respondo en uno o dos días.');
    expect(recibido).toContain('Ana Pérez');
    await expect(page.getByRole('textbox', { name: 'Nombre' })).toHaveValue('');
  });

  test('muestra un error si el endpoint falla', async ({ page }) => {
    await page.route('https://formulario.example.com/**', (ruta) => ruta.fulfill({ status: 500, body: 'error' }));
    await page.goto('/contacto/');
    await page.locator('[data-contacto]').evaluate((f) => f.setAttribute('data-endpoint', 'https://formulario.example.com/enviar'));
    await llenar(page);
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.getByRole('status')).toContainText('No se pudo enviar el mensaje');
  });
});

test.describe('Copiar y accesibilidad básica', () => {
  test('copia el email al portapapeles', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/contacto/');
    await page.getByRole('button', { name: 'Copiar', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Email copiado' })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('hola@fabianrodas.com');
  });

  test('tiene enlace para saltar al contenido y aria-current en la navegación', async ({ page }) => {
    await page.goto('/notas/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
    await expect(page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Notas' })).toHaveAttribute('aria-current', 'page');
  });

  test('la página 404 usa el estilo del sitio', async ({ page }) => {
    const r = await page.goto('/no-existe/');
    expect(r?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: 'Esta página no existe' })).toBeVisible();
  });
});
