# Reporte final

> **Rediseño "Sala oscura" (octubre de 2026):** todo el sitio pasó a una dirección oscura con Newsreader, sin píldoras, cristal, iconos ni franjas; el inicio tiene la foto con el nombre cruzándola, proyectos como nombres grandes y la hora de Guayaquil en el contacto. La foto es de ejemplo (avatar de GitHub). Detalle en `docs/DECISIONES-IMPLEMENTACION.md` (decisiones 40 a 49) y abajo, en "Sala oscura".

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
| `/` | escritorio | 100 | 96 | 100 | 100 |
| `/proyectos/` | móvil | 100 | 96 | 100 | 100 |
| `/proyectos/` | escritorio | 100 | 96 | 100 | 100 |
| `/sobre-mi/` | móvil | 99 | 100 | 100 | 100 |
| `/sobre-mi/` | escritorio | 100 | 100 | 100 | 100 |

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

0. **Tus fotos**: hoy se usa tu avatar de GitHub como ejemplo. Ver "Poner tus fotos" en el README.
1. **Proyectos reales**: edita o borra los archivos de `src/content/proyectos/{es,en}/`.
2. **Capturas reales**: cambia `cover: lumen` (y los de `case.gallery`) por `{ src, alt, width, height }` con imágenes en `public/img/`. Ver el README.
3. **Fotos de Sobre mí**: las tres de "Fuera del código" (`public/img/fuera-*.webp`).
4. **Datos de contacto**: `src/lib/sitio.ts` (email `hola@fabianrodas.com`, LinkedIn y GitHub de ejemplo).
5. **CV**: reemplaza `public/cv/fabian-rodas-cv.pdf` (hoy es un PDF de una página que dice que es de ejemplo).
6. **Los textos del inicio** (frase del hero, datos de Sobre mí, tarjeta de contacto) y los de la página Sobre mí (experiencia, educación, certificados), que están en `src/views/Inicio.astro` y `src/views/SobreMi.astro`.
7. **Endpoint del formulario**: define `PUBLIC_FORM_ENDPOINT` en Cloudflare si no quieres depender del `mailto:`.
8. **Enlaces de ejemplo** de los proyectos (`lumen.fabianrodas.com`, `taller.example.com`, `repaso.example.com` y los repos de GitHub).
9. Regenerar `public/og.png` con `npm run og` cuando cambies la foto o la frase.
10. Opcional: Erode en lugar de Newsreader (ver "Tipografía" en el README).

## Sala oscura: verificación con taste-skill

- `lint.mjs src`: 0 FAIL, 0 WARN.
- `inspect.mjs` a 1440, 768 y 390 px: 0 FAIL en inicio, proyectos, caso de Lumen y Sobre mí. Contacto mantiene `few-pictures` (una sola foto; decisión 49).
- Avisos que se defienden: contraste bajo y texto diminuto dentro de los mockups de capturas (se van con capturas reales); "font-not-dealt" (Newsreader en lugar de Erode, decisión 41); sin video (no hay material); márgenes desiguales que vienen del borde irregular del texto, no del contenedor.

```
ROUND 1
Seen in one second: la foto de Fabián y "fabián rodas" en grande cruzándola.
Idea (one sentence): una sala oscura donde la persona y sus proyectos son las piezas iluminadas.
Live thing: la hora actual de Guayaquil y si responde hoy o mañana.
Layout words by section: hero=foto inset con nombre que cruza / proyectos=índice de nombres con vista fija / sobre mí=datos al lado y párrafo / contacto=reloj y tarjeta / pie=una línea
Scores: design 7 · usability 8 · creativity 7 · content 7 → overall 7.3.
Caps applied: menos de cuatro fotos reales en el inicio (design ≤ 6.5 hasta tener fotos reales; el retrato es el avatar de GitHub).
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. El retrato es un avatar de baja resolución (inicio-es-1440, sobre-mi-es-1440): reemplazar por una foto vertical de unos 1000 px.
2. Las capturas de proyectos son mockups dibujados con colores planos (proyectos-es-1440): reemplazar por capturas reales.
3. Fuera del código repite la misma foto en tres recortes (sobre-mi-es-1440): usar fotos distintas.
```
