# Plan: rediseño "Sala oscura"

Diseño aprobado: `docs/superpowers/specs/2026-10-22-sala-oscura-design.md` (aprobado por Fabián el 2026-10-22, con fotos de mock: la foto de su perfil de GitHub).

Cada tarea termina con `npm run build`, `npm run check`, `npm test` y un commit.

1. **Tokens y tipografía.** Instalar `@fontsource-variable/newsreader`; reescribir `src/styles/global.css` con la paleta Lunar and bronze, cinco tamaños, un solo botón rectangular bronce y sin sombras, gradientes, bordes, grano ni spotlight. Quitar Bricolage, Geist, Geist Mono y `src/scripts/spotlight.ts`.
2. **Barra y pie.** Barra lisa sin logo, con enlaces de texto y el botón "Contacto"; opaca y fija sin desenfoque. Pie de una línea en tres columnas.
3. **Foto.** `public/img/retrato.webp` (recorte 4:5 del avatar de GitHub) en `sitio.retrato`, con el tratamiento `brightness(0.85) contrast(1.05)`.
4. **Inicio.** Hero con foto inset y nombre que la cruza (el `h1`); proyectos como nombres grandes con vista fija; Sobre mí con datos al lado y párrafo ancho; tarjeta de contacto con la hora de Guayaquil; movimiento (nombre que escala con el scroll, entradas por sección y zoom lento en la foto).
5. **Otras páginas.** Proyectos, caso, Sobre mí, Contacto y 404 con los nuevos tokens: filtros en texto, estado en texto, stack con comas y paneles de tono. `Shot` marcado con `data-ui`.
6. **Pruebas.** Quitar las comparaciones con los artboards; agregar la prueba de la hora de Guayaquil; ajustar los selectores.
7. **Puerta.** `lint.mjs` e `inspect.mjs` de taste-skill sin FAIL (1440/768/390), la crítica por escrito y Lighthouse ≥ 95. Actualizar README, decisiones y reporte. Push a la rama, sin PR.
