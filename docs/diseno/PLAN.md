# Plan de implementación: portafolio de Fabián Rodas

## 0. Contexto
- Dueño: Fabián Rodas, estudiante de Ingeniería en Ciencias de la Computación (UEES, Guayaquil, se gradúa en 2027). GitHub: github.com/Fabianrodas.
- Objetivo: portafolio + bitácora/blog para mostrar proyectos, registrar avances y anunciarse.
- Dominio futuro: fabianrodas.com (configurar `site` en Astro con ese valor).
- Todo el contenido actual es de EJEMPLO (Lumen, Cifra, Taller, Repaso, Nodo, notas, correo hola@fabianrodas.com). Se mantiene tal cual; el dueño lo reemplazará después editando Markdown.

## 1. Fuente de verdad visual
`docs/diseno/artboards/` contiene el diseño aprobado como archivos `.dc.html` (HTML con estilos en línea + un `<script type="text/x-dc">` con datos/lógica de ejemplo):

| Artboard | Ruta en el sitio |
|---|---|
| `Main.dc.html` (escritorio) + `HomeMobile.dc.html` (390 px) | `/` |
| `Proyectos.dc.html` | `/proyectos/` |
| `Proyecto.dc.html` | `/proyectos/[slug]/` (ejemplo: Lumen) |
| `Notas.dc.html` | `/notas/` |
| `Nota.dc.html` | `/notas/[slug]/` |
| `SobreMi.dc.html` | `/sobre-mi/` |
| `Contacto.dc.html` | `/contacto/` |
| `Header*.dc.html`, `Footer*.dc.html` | componentes globales |
| `Shot.dc.html` | mockups de capturas de cada proyecto (ver §5) |

Reglas para leerlos:
- `<dc-import name="X" ...>` = incluir el componente `X.dc.html` con esas props.
- `<sc-for>` / `<sc-if>` / `{{valor}}` = bucles, condicionales y datos calculados en `renderVals()`; tradúcelos a Astro con datos reales de las colecciones.
- Replica EXACTAMENTE colores, tipografías, tamaños, espaciados, radios, orden de secciones y textos. Pasa los estilos en línea a CSS con tokens (no cambies los valores).
- La versión móvil de las páginas distintas al inicio no tiene artboard: adáptalas con el mismo lenguaje que `HomeMobile.dc.html` (una columna, padding 20 px, tarjetas apiladas, menú hamburguesa de `HeaderMobile`).

### Tokens (extraídos del diseño)
- Fondo `#161c1a`, superficie `#1f2725`, superficie 2 `#283330`, pie `#111614`, texto `#e3e2da`, secundario `#9aa099`, texto suave `#c3c8c1`, acento `#9fc7b8`, fondo acento `#24362f`, amarillo `#e2c47e` / `#3a3424`.
- Fuentes Google: Bricolage Grotesque (títulos, 500–700), Geist (texto, 400–600), Geist Mono (código). Usa `@fontsource-variable` en vez del CDN.
- Contenedor `max-width: 1280px`, padding lateral 40 px (20 px en móvil).
- Radios: 999px (píldoras/botones), 22–24px (tarjetas grandes), 18–20px (tarjetas), 12–14px (imágenes), 10px.

## 2. Stack (obligatorio)
- Astro (última estable) + TypeScript estricto. CSS propio con custom properties (sin Tailwind, para replicar exacto).
- Integraciones oficiales: `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`. Shiki para código.
- i18n nativo de Astro: `es` por defecto (sin prefijo) y `en` en `/en/...`. Traduce la interfaz al inglés; el contenido de ejemplo puede tener versión `en` mínima.
- Salida estática. Deploy en Cloudflare Pages (`wrangler.toml` o instrucciones en el README; NO desplegar, no hay credenciales).
- Sin JS de cliente salvo: filtros de Notas/Proyectos, copiar email/RSS y menú móvil (islas pequeñas en vanilla TS).

## 3. Modelo de contenido (content collections, `src/content/`)
```
proyectos/*.md: title, slug, summary, role, stack[], year, status: produccion|desarrollo|archivado,
  version?, platform?, links:{live?, repo?}, cover (kind del mock o imagen), featured:boolean, order:1-5,
  category: web|escritorio|cliente|universidad
notas/*.mdx: title, date, summary, kind: avance|nota|anuncio, project?: slug, tags[], cover?, readingTime (calculado)
```
Carga todo el contenido de ejemplo de los artboards: 5 destacados (Lumen, Cifra, Taller, Repaso, Nodo), 3 "otros" (Vitrina, Almacén, Agenda), 10 notas (lista en `renderVals()` de `Notas.dc.html`). La nota completa de "Lumen v1.7" y el caso completo de Lumen salen de `Nota.dc.html` y `Proyecto.dc.html`; las demás notas/casos con un cuerpo corto de ejemplo usando la misma plantilla.

## 4. Funcionalidades
- Inicio: secciones de `Main.dc.html` en ese orden; destacados y últimas notas desde las colecciones.
- Proyectos: filtros por categoría con conteo y buscador por nombre/tecnología (funcionales).
- Caso: ficha, galería, índice lateral con anclas, decisiones, arquitectura, bitácora = notas ligadas al proyecto ordenadas por fecha.
- Notas: filtros por tipo y por proyecto (funcionales, estado vacío del artboard), destacada + cuadrícula, paginación de 7 por página, etiquetas.
- Nota: ruta, cabecera, cuerpo MDX con estilos del artboard (código, aviso, lista de pendientes), índice lateral generado de los h2, tarjeta del proyecto, compartir, autor, anterior/siguiente, "Más de [proyecto]".
- Contacto: formulario (nombre, email, motivo, mensaje) que envía a un endpoint configurable vía variable de entorno `PUBLIC_FORM_ENDPOINT`; si no está definida, usa `mailto:`. Validación nativa + mensajes de error y éxito accesibles.
- RSS en `/notas/rss.xml` (y `/en/notas/rss.xml`), sitemap, 404 con el estilo del sitio, metadatos Open Graph por página, `robots.txt`.
- CV: enlace a `/cv/fabian-rodas-cv.pdf` (deja un PDF placeholder).
- Selector ES/EN en cabecera que lleva a la página equivalente.

## 5. Imágenes
Las capturas son mockups dibujados en `Shot.dc.html` (prop `kind`: lumen, lumen-movil, lumen-subida, cifra, taller, repaso, nodo, foto). Reimpleméntalos como componente Astro `<Shot kind ratio radius label>` con el mismo HTML/CSS (usa container queries como el original). Deben verse idénticos. El componente acepta también `src` para cuando el dueño ponga capturas reales (`<img>` con `width/height`, `loading="lazy"`, `alt`).

## 6. Animaciones (solo CSS, respetando `prefers-reduced-motion`)
- Entrada escalonada del hero (opacidad + 16 px, 600 ms, 80 ms entre elementos).
- Aparición de tarjetas e imágenes al hacer scroll con `animation-timeline: view()` dentro de `@supports`; sin soporte, se ven estáticas.
- Hover en tarjetas: la imagen escala 1.02 en 300 ms; foco visible siempre (`outline 2px #9fc7b8`).
- View Transitions entre páginas (`<ClientRouter />` o `@view-transition { navigation: auto; }`) como mejora progresiva.

## 7. Calidad
- Accesibilidad: un h1 por página, landmarks, `aria-current` en navegación, contraste ≥ 4.5:1, objetivos táctiles ≥ 44 px, enlace "saltar al contenido".
- Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO (medir con `npx lighthouse` o `unlighthouse` sobre `npm run preview`).
- Sin errores en `astro check` ni en `npm run build`.
- Pruebas: Playwright con capturas a 1440 y 390 de cada ruta; compara visualmente contra los artboards (renderiza los `.dc.html` como referencia si es útil) y corrige diferencias. Prueba de que filtros, menú móvil, ES/EN y formulario funcionan.

## 8. Estructura y documentación
- `README.md` en español: cómo correr, cómo agregar un proyecto o una nota (con ejemplo de frontmatter), cómo cambiar imágenes por reales, cómo desplegar en Cloudflare Pages y conectar el dominio fabianrodas.com.
- `docs/DECISIONES-IMPLEMENTACION.md` y `docs/REPORTE-FINAL.md`.

## 9. Definición de terminado
1. Todas las rutas de §1 existen en ES y EN y coinciden visualmente con los artboards a 1440 px; el inicio coincide con `HomeMobile` a 390 px.
2. Todas las funcionalidades de §4 funcionan y tienen prueba Playwright que pasa.
3. `npm run build`, `astro check` y las pruebas pasan sin errores; Lighthouse ≥ 95 en las cuatro categorías en `/`, `/proyectos/`, `/notas/`.
4. README y reportes escritos; todo comiteado y pusheado (o PR abierto).
