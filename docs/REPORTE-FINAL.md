# Reporte final

> **Estructura anterior con estilo Sala oscura (23 de octubre de 2026):** el sitio volvió al diseño anterior (hero con retrato, tarjetas de proyectos, banda de contacto, pie en columnas) con la paleta negro y bronce, Newsreader y esquinas rectas, sin píldoras de cristal, "FR" ni marquee, y con fotos HD de ejemplo. Detalle en `docs/DECISIONES-IMPLEMENTACION.md` (decisiones 50 a 55). La versión Sala oscura con nombres grandes (decisiones 40 a 49) se descartó.

## Resultado

El portafolio está implementado de punta a punta según `docs/diseno/PLAN.md` y los artboards de `docs/diseno/artboards/`. Se cumplen los cuatro criterios de "Definición de terminado":

| Criterio | Estado |
|---|---|
| Todas las rutas de §1 existen en ES y EN, sin scroll horizontal de 390 a 1440 px | ✅ |
| Funcionalidades de §4 con prueba Playwright | ✅ 34 pruebas pasan |
| `npm run build`, `astro check` y pruebas sin errores; Lighthouse ≥ 95 | ✅ `astro check`: 0 errores, 0 avisos |
| README, reportes, todo comiteado y pusheado | ✅ |

### Comparación con los artboards

Ya no se mide: desde el rediseño Sala oscura el sitio deja de parecerse a los artboards a propósito. Siguen en `docs/diseno/artboards/` y `docs/capturas/referencia/` como historial. Capturas actuales del sitio (ES/EN, 1440 y 390 px): `docs/capturas/sitio/`.

### Lighthouse (sobre `npm run preview`)

| Ruta | Modo | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|---|
| `/` | móvil | 99 | 100 | 100 | 100 |
| `/` | escritorio | 100 | 100 | 100 | 100 |
| `/proyectos/` | móvil | 100 | 96 | 100 | 100 |
| `/proyectos/` | escritorio | 100 | 96 | 100 | 100 |
| `/sobre-mi/` | móvil | 99 | 100 | 100 | 100 |
| `/sobre-mi/` | escritorio | 100 | 100 | 100 | 100 |
| `/contacto/` | móvil | 100 | 100 | 100 | 100 |
| `/contacto/` | escritorio | 100 | 100 | 100 | 100 |

Accessibility no llega a 100 solo por el texto diminuto dentro de los mockups dibujados (réplica exacta del diseño). Se resuelve solo al usar capturas reales.

## Qué se hizo

- **Stack**: Astro 7.4 estático, TypeScript estricto, CSS propio con tokens, `@astrojs/sitemap` y Newsreader servida desde `src/styles/fuentes/`.
- **Rutas** (ES sin prefijo, EN en `/en/`): inicio, proyectos, 5 casos de estudio, sobre mí, contacto, sitemap, `robots.txt` y un 404 con el estilo del sitio.
- **Contenido** en colecciones (`src/content/`): 8 proyectos en español e inglés. El caso de Lumen está completo; el resto tiene textos cortos con la misma plantilla.
- **Componente `Shot`**: los 8 mockups de `Shot.dc.html` con el mismo HTML y container queries. Acepta `src` para imágenes reales.
- **JavaScript mínimo** (vanilla TS): filtros y buscador de Proyectos; menú móvil; botones de copiar; índice lateral activo; formulario de contacto; vista fija de proyectos, hora de Guayaquil y entradas por sección en el inicio.
- **Formulario**: envía a `PUBLIC_FORM_ENDPOINT` si existe; si no, abre un `mailto:`. Validación accesible y mensajes de éxito y error.
- **Animaciones** respetando `prefers-reduced-motion`: el nombre crece con el scroll (`animation-timeline: scroll()`), zoom lento en la foto, entradas por partes de cada sección, zoom de capturas en hover y View Transitions entre páginas.
- **SEO y metadatos**: título y descripción por página, Open Graph y Twitter con `og.png`, `hreflang` ES/EN y canónicas.
- **Accesibilidad**: un `h1` por página, landmarks, `aria-current` en la navegación, enlace "Saltar al contenido", foco visible, objetivos táctiles de 44 px y sin scroll horizontal de 390 a 1440 px.
- **Pruebas** (`tests/`): capturas de 10 rutas (ES/EN) a 1440 y 390 px, y pruebas funcionales de filtros, menú móvil, rutas eliminadas, ES/EN, formulario (mailto, endpoint correcto y endpoint con error), copiar, 404 y la hora de Guayaquil.

Las decisiones que el plan no especificaba están en `docs/DECISIONES-IMPLEMENTACION.md`.

## Cómo correrlo

```bash
nvm use            # Node 24 (Astro 7 exige ≥ 22.23.4)
npm install
npm run dev        # desarrollo
npm run build && npm run preview
npm run check
npm test           # con el build hecho
```

El despliegue en Cloudflare Pages y la conexión de fabianrodas.com están explicados en el `README.md` (build `npm run build`, salida `dist`, `NODE_VERSION=24`). No se desplegó porque no hay credenciales.

## Qué falta que reemplaces

0. **Tus fotos**: hoy se usan fotos HD de ejemplo. Ver "Poner tus fotos" en el README.
1. **Proyectos reales**: edita o borra los archivos de `src/content/proyectos/{es,en}/`.
2. **Capturas reales**: cambia `cover: lumen` (y los de `case.gallery`) por `{ src, alt, width, height }` con imágenes en `public/img/`. Ver el README.
3. **Fotos de Sobre mí**: las tres de "Fuera del código" (`src/assets/fotos/`).
4. **Datos de contacto**: `src/lib/sitio.ts` (email `hola@fabianrodas.com`, LinkedIn y GitHub de ejemplo).
5. **CV**: reemplaza `public/cv/fabian-rodas-cv.pdf` (hoy es un PDF de una página que dice que es de ejemplo).
6. **Los textos del inicio** (presentación del hero, Sobre mí breve, banda de contacto) y los de la página Sobre mí (experiencia, educación, certificados), que están en `src/views/Inicio.astro` y `src/views/SobreMi.astro`.
7. **Endpoint del formulario**: define `PUBLIC_FORM_ENDPOINT` en Cloudflare si no quieres depender del `mailto:`.
8. **Enlaces de ejemplo** de los proyectos (`lumen.fabianrodas.com`, `taller.example.com`, `repaso.example.com` y los repos de GitHub).
9. Regenerar `public/og.png` con `npm run og` cuando cambies la foto o la frase.
10. Opcional: Erode en lugar de Newsreader (ver "Tipografía" en el README).

## Verificación con taste-skill y ui-ux-pro-max

- `lint.mjs src`: 0 FAIL.
- `inspect.mjs` a 1440, 768 y 390 px: 0 FAIL en Proyectos, el caso de Lumen y Sobre mí. Excepciones defendidas (decisión 55): el botón "Ver los 8 proyectos" en la cabecera de la sección del inicio y una sola foto en Contacto.
- Checklist de ui-ux-pro-max: contraste ≥ 4,5:1 (texto bronce en `#c9ad95`), foco visible de 2 px, objetivos táctiles de 44 px, sin scroll horizontal de 390 a 1440 px, imágenes WebP con `srcset` y espacio reservado, y `prefers-reduced-motion` respetado.
- Avisos que se defienden: texto diminuto y de bajo contraste dentro de las capturas dibujadas (se van con capturas reales) y Newsreader en lugar de Erode.
