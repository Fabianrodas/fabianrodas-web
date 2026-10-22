# Reporte final

## Resultado

El portafolio está implementado de punta a punta según `docs/diseno/PLAN.md` y los artboards de `docs/diseno/artboards/`. Se cumplen los cuatro criterios de "Definición de terminado":

| Criterio | Estado |
|---|---|
| Todas las rutas de §1 existen en ES y EN y coinciden con los artboards a 1440 px; el inicio coincide con `HomeMobile` a 390 px | ✅ (tabla abajo) |
| Funcionalidades de §4 con prueba Playwright | ✅ 53 pruebas pasan |
| `npm run build`, `astro check` y pruebas sin errores; Lighthouse ≥ 95 | ✅ `astro check`: 0 errores, 0 avisos |
| README, reportes, todo comiteado y pusheado | ✅ |

### Comparación con los artboards

Medido en Chromium, renderizando cada artboard con `scripts/artboards/support.js` y la ruta del sitio en el mismo viewport.

| Artboard | Ruta | Ancho | Alto artboard | Alto sitio | Primera pantalla idéntica |
|---|---|---|---|---|---|
| Main | `/` | 1440 | 3505 | 3505 | 100 % |
| HomeMobile | `/` | 390 | 3892 | 3884 | 100 % |
| Proyectos | `/proyectos/` | 1440 | 2975 | 2975 | 99.9 % |
| Proyecto | `/proyectos/lumen/` | 1440 | 4730 | 4730 | 100 % |
| Notas | `/notas/` | 1440 | 2717 | 2719 | 99.6 % |
| Nota | `/notas/lumen-v1-7/` | 1440 | 4164 | 4161 | 100 % |
| SobreMi | `/sobre-mi/` | 1440 | 3790 | 3790 | 100 % |
| Contacto | `/contacto/` | 1440 | 1696 | 1696 | 100 % |

Las diferencias pequeñas vienen de los conteos de Notas (11 notas en vez de 10, ver decisión 10) y de algunos controles que subieron a 44 px por accesibilidad. Capturas de referencia: `docs/capturas/referencia/`. Capturas del sitio (ES/EN, 1440 y 390 px): `docs/capturas/sitio/`.

### Lighthouse (sobre `npm run preview`)

| Ruta | Modo | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|---|
| `/` | móvil | 99 | 96 | 100 | 100 |
| `/` | escritorio | 100 | 96 | 100 | 100 |
| `/proyectos/` | móvil | 99 | 96 | 100 | 100 |
| `/proyectos/` | escritorio | 100 | 96 | 100 | 100 |
| `/notas/` | móvil | 98 | 96 | 100 | 100 |
| `/notas/` | escritorio | 100 | 96 | 100 | 100 |

Accessibility no llega a 100 solo por el texto diminuto dentro de los mockups dibujados (réplica exacta del diseño). Se resuelve solo al usar capturas reales.

## Qué se hizo

- **Stack**: Astro 7.4 estático, TypeScript estricto, CSS propio con tokens, `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`, Shiki con un tema propio y fuentes locales con `@fontsource-variable` (Bricolage Grotesque, Geist, Geist Mono).
- **Rutas** (ES sin prefijo, EN en `/en/`): inicio, proyectos, 5 casos de estudio, notas, 11 notas, sobre mí, contacto, RSS por idioma, sitemap, `robots.txt` y un 404 con el estilo del sitio.
- **Contenido** en colecciones (`src/content/`): 8 proyectos y 11 notas, cada uno en español e inglés. La nota "Lumen v1.7" y el caso de Lumen están completos; el resto tiene cuerpos cortos con la misma plantilla.
- **Componente `Shot`**: los 8 mockups de `Shot.dc.html` con el mismo HTML y container queries. Acepta `src` para imágenes reales.
- **JavaScript mínimo** (vanilla TS): filtros y buscador de Proyectos; filtros por tipo, proyecto y etiqueta, búsqueda y paginación de 7 en Notas (estado en la URL); menú móvil; botones de copiar; índice lateral activo; formulario de contacto.
- **Formulario**: envía a `PUBLIC_FORM_ENDPOINT` si existe; si no, abre un `mailto:`. Validación accesible y mensajes de éxito y error.
- **Animaciones** solo CSS y respetando `prefers-reduced-motion`: entrada escalonada del hero, aparición al hacer scroll con `animation-timeline: view()`, zoom de imagen en hover y View Transitions entre páginas.
- **SEO y metadatos**: título y descripción por página, Open Graph y Twitter con `og.png`, `hreflang` ES/EN, canónicas y `article:published_time` en las notas.
- **Accesibilidad**: un `h1` por página, landmarks, `aria-current` en la navegación, enlace "Saltar al contenido", foco visible, objetivos táctiles de 44 px y sin scroll horizontal de 390 a 1440 px.
- **Pruebas** (`tests/`): comparación visual contra los artboards, capturas de 14 rutas a 1440 y 390 px, y pruebas funcionales de filtros, paginación, etiquetas, menú móvil, ES/EN, formulario (mailto, endpoint correcto y endpoint con error), copiar y 404.

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

1. **Proyectos y notas reales**: edita o borra los archivos de `src/content/proyectos/{es,en}/` y `src/content/notas/{es,en}/`.
2. **Capturas reales**: cambia `cover: lumen` (y los de `case.gallery`) por `{ src, alt, width, height }` con imágenes en `public/img/`. Ver el README.
3. **Fotos de Sobre mí**: el retrato y las tres fotos de "Fuera del código" en `src/views/SobreMi.astro`.
4. **Datos de contacto**: `src/lib/sitio.ts` (email `hola@fabianrodas.com`, LinkedIn y GitHub de ejemplo).
5. **CV**: reemplaza `public/cv/fabian-rodas-cv.pdf` (hoy es un PDF de una página que dice que es de ejemplo).
6. **"En qué estoy ahora"** del inicio y los textos de Sobre mí (experiencia, educación, certificados), que están en `src/views/Inicio.astro` y `src/views/SobreMi.astro`.
7. **Endpoint del formulario**: define `PUBLIC_FORM_ENDPOINT` en Cloudflare si no quieres depender del `mailto:`.
8. **Enlaces de ejemplo** de los proyectos (`lumen.fabianrodas.com`, `taller.example.com`, `repaso.example.com` y los repos de GitHub).
9. Opcional: regenerar `public/og.png` con `npm run og` si cambias el titular.
