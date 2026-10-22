# fabianrodas.com

Portafolio y bitácora de Fabián Rodas. Sitio estático hecho con **Astro 7** y TypeScript estricto, en español (`/`) e inglés (`/en/`), listo para Cloudflare Pages.

> El contenido actual (Lumen, Cifra, Taller, Repaso, Nodo, las notas y hola@fabianrodas.com) es **de ejemplo**. Cámbialo editando los archivos Markdown descritos abajo.

## Requisitos

- Node.js **22.23.4 o superior** (recomendado 24, ver `.nvmrc`).
- npm 10+.

## Cómo correrlo

```bash
npm install
npm run dev        # http://localhost:4321 con recarga en vivo
npm run build      # genera dist/
npm run preview    # sirve dist/ en http://localhost:4321
npm run check      # astro check (tipos y plantillas)
npm test           # pruebas Playwright (necesita npm run build antes)
```

Otros scripts:

| Script | Qué hace |
|---|---|
| `npm run capturas:referencia` | Renderiza los artboards de `docs/diseno/artboards/` en `docs/capturas/referencia/`. |
| `npm run capturas:sitio` | Con `npm run preview` corriendo, captura cada ruta (ES/EN, 1440 y 390 px) en `docs/capturas/sitio/`. |
| `npm run og` | Regenera `public/og.png`, la imagen para compartir en redes. |
| `bash scripts/lighthouse.sh` | Mide Lighthouse sobre `npm run preview`. |

Si Playwright no encuentra su navegador, define `CHROMIUM_PATH` con la ruta a un Chromium instalado.

## Estructura

```
src/
  content/
    proyectos/{es,en}/*.md   ← un archivo por proyecto e idioma
    notas/{es,en}/*.{md,mdx} ← un archivo por nota e idioma
  content.config.ts          ← esquema de los frontmatter
  components/                ← Header, Footer, Shot (mockups), Icono, componentes MDX
  views/                     ← cada página, compartida por ES y EN
  pages/                     ← rutas (las de /en/ reutilizan las mismas vistas)
  i18n/ui.ts                 ← textos de la interfaz en ES/EN y fechas
  lib/sitio.ts               ← email, redes, CV y etiquetas destacadas
  styles/global.css          ← tokens de diseño (colores, fuentes, radios)
public/
  cv/fabian-rodas-cv.pdf     ← CV (placeholder)
  og.png, favicon.svg, robots.txt, _headers
docs/                        ← diseño aprobado, decisiones y reporte final
tests/                       ← pruebas Playwright
```

## Agregar un proyecto

Crea `src/content/proyectos/es/mi-proyecto.md` (y, si quieres, la versión `en/mi-proyecto.md`; si no existe, el sitio en inglés muestra la española):

```yaml
---
title: Mi proyecto
slug: mi-proyecto                 # la URL será /proyectos/mi-proyecto/
summary: Descripción completa para la página de proyectos y el caso de estudio.
tagline: Frase corta para las tarjetas.
role: Diseño y desarrollo
stack: [Astro, TypeScript]
year: "2027"
status: desarrollo                # produccion | desarrollo | archivado
version: 0.1.0                    # opcional
category: [web]                   # web | escritorio | cliente | universidad (una o varias)
cover: foto                       # mockup (lumen, cifra, taller, repaso, nodo, foto…) o una imagen real, ver abajo
featured: true                    # true = tarjeta grande y caso de estudio; false = lista "Otros proyectos"
order: 6                          # orden en las listas
links:
  live: https://mi-proyecto.com   # opcional
  repo: https://github.com/Fabianrodas/mi-proyecto
case:                             # opcional, solo para destacados
  problem: [Primer párrafo del problema.]
  solution: [Cómo lo resolví.]
  features: [Función 1, Función 2]
  decisions:
    - { icon: server, title: Decisión, text: Por qué la tomé. }
  architecture:
    nodes:
      - { title: Navegador, text: Astro }
      - { title: API, text: Workers, highlight: true }
  learned: [Lo que aprendí.]
---
```

Campos opcionales extra: `homeSummary`, `label`, `tags`, `homeTags`, `period`, `kind`, `platform`, `platformShort`, `links.privateRepo`, `case.gallery`. Todos están documentados en `src/content.config.ts`.

## Agregar una nota

Crea `src/content/notas/es/mi-nota.mdx` (la URL será `/notas/mi-nota/`):

~~~mdx
---
title: "Lumen v1.8: respaldo físico"
date: 2026-11-20
summary: Resumen que aparece en las tarjetas y en el RSS.
kind: avance                # avance | nota | anuncio
project: lumen              # opcional: slug del proyecto (aparece en su bitácora)
version: 1.8.0              # opcional: versión que anuncia
tags: [Flask, Despliegue]
cover: lumen                # opcional
---

Texto en Markdown. Cada `## Título` aparece en el índice lateral.

```python title="respaldo.py"
print("bloque de código con nombre de archivo y botón Copiar")
```

<Aviso>Un aviso destacado.</Aviso>

<Figura kind="lumen-movil" titulo="Título" texto="Descripción de la captura." />

<Pendientes items={[{ hecho: true, texto: 'Listo' }, { hecho: false, texto: 'Pendiente' }]} />
~~~

`readingTime` se calcula solo (≈200 palabras por minuto); puedes fijarlo en el frontmatter. Con `draft: true` la nota no se publica. Las notas aparecen en `/notas/`, en el inicio, en el RSS (`/notas/rss.xml` y `/en/notas/rss.xml`) y en la bitácora de su proyecto.

## Cambiar las imágenes de ejemplo por capturas reales

Las capturas son mockups dibujados por `src/components/Shot.astro`. Para usar una imagen real:

1. Copia la imagen a `public/img/`, por ejemplo `public/img/lumen.webp` (ideal: WebP, 1600 px de ancho).
2. En el frontmatter, cambia `cover: lumen` por:

   ```yaml
   cover:
     src: /img/lumen.webp
     alt: Captura de Lumen con la cuadrícula de recuerdos
     width: 1600
     height: 1000
   ```

   Lo mismo sirve dentro de `case.gallery`. En una nota MDX: `<Figura src="/img/movil.webp" alt="…" titulo="…" />`.
3. En `src/views/SobreMi.astro`, reemplaza los `<Shot kind="foto" …>` por `<Shot src="/img/retrato.webp" alt="…" width={800} height={1000} />`.

El componente pone `width`, `height`, `loading="lazy"` y `alt` automáticamente.

Otros datos a reemplazar: `src/lib/sitio.ts` (email, LinkedIn, GitHub), `public/cv/fabian-rodas-cv.pdf` (CV real) y los textos de `src/views/Inicio.astro` ("En qué estoy ahora").

## Formulario de contacto

Copia `.env.example` a `.env` y define `PUBLIC_FORM_ENDPOINT` con la URL de un servicio que reciba formularios por POST (Formspree, Getform, Basin o un Worker propio). Sin esa variable, el formulario abre el cliente de correo del visitante con un `mailto:` ya escrito. En Cloudflare Pages, agrégala en *Settings → Environment variables* y vuelve a desplegar.

## Desplegar en Cloudflare Pages

1. Sube el repositorio a GitHub.
2. En Cloudflare: *Workers & Pages → Create → Pages → Connect to Git* y elige el repositorio.
3. Configuración de build:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Variable de entorno `NODE_VERSION` = `24` (y `PUBLIC_FORM_ENDPOINT` si la usas).
4. Guarda y despliega. Cada push a `main` publica una nueva versión; cada PR genera una vista previa.

Alternativa sin Git: `npm run build && npx wrangler pages deploy` (usa `wrangler.toml`).

### Conectar el dominio fabianrodas.com

1. En el proyecto de Pages: *Custom domains → Set up a custom domain* → `fabianrodas.com`.
2. Si el dominio ya está en Cloudflare, el registro DNS se crea solo. Si no, agrega el dominio a Cloudflare y cambia los nameservers en tu registrador por los que indica Cloudflare.
3. Repite con `www.fabianrodas.com` y, en *Rules → Redirect Rules*, redirige `www` al dominio principal.
4. `site` ya está configurado como `https://fabianrodas.com` en `astro.config.mjs` (canónicas, sitemap y RSS lo usan).

## Calidad

- `npm run build` y `npm run check` sin errores.
- 53 pruebas Playwright: comparación con los artboards (alto de página y primera pantalla píxel a píxel), capturas a 1440 y 390 px en ES/EN sin scroll horizontal, filtros, paginación, menú móvil, ES/EN, formulario y copiar.
- Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO en `/`, `/proyectos/` y `/notas/`.
