# Decisiones de implementación

Decisiones tomadas donde `docs/diseno/PLAN.md` o los artboards no especificaban algo, o donde había que elegir entre dos lecturas.

## Stack y herramientas

1. **Astro 7.4 con Node 24.** La última versión estable de Astro exige Node ≥ 22.23.4. Se agregó `.nvmrc` (24) y `engines` en `package.json`; en Cloudflare Pages hay que fijar `NODE_VERSION=24`.
2. **TypeScript 6** en lugar de 7: `@astrojs/check` aún declara compatibilidad con TS 5–6.
3. **Override de `vscode-languageserver-types` a 3.18.4**: el registro de npm no servía el tarball 3.18.5 que pide `@astrojs/check`. Se puede quitar cuando el registro lo resuelva.
4. **`shiki` como dependencia directa** para tipar el tema y el transformador propios (`src/lib/shiki.ts`).
5. **Salida estática con `trailingSlash: 'always'`**, coherente con cómo Cloudflare Pages sirve carpetas.
6. **View Transitions con `@view-transition { navigation: auto; }`** (CSS puro) en lugar de `<ClientRouter />`: no agrega JavaScript y los scripts de cada página siguen funcionando sin re-inicialización.

## Contenido y modelo de datos

7. **Archivos por idioma** (`src/content/{proyectos,notas}/{es,en}/`). Si falta una traducción, la ruta en inglés muestra la versión en español en vez de un 404. El enlace "Read in English" solo aparece cuando la traducción existe.
8. **`category` es una lista**, no un valor único: los conteos del artboard de Proyectos (Web 4, Escritorio 3, Para clientes 2, Universidad 3 sobre 8 proyectos) solo cuadran si un proyecto puede tener varias categorías.
9. **Campos extra en el frontmatter** para reproducir los textos exactos de cada tarjeta, que en el diseño cambian según el lugar: `homeSummary`, `tagline`, `label`, `tags`, `homeTags`, `period`, `kind`, `platform`, `platformShort`, `links.privateRepo` y el bloque `case` (galería, problema, solución, decisiones, arquitectura, aprendizajes).
10. **11 notas en lugar de 10.** La bitácora de Lumen (`Proyecto.dc.html`) y "Más de Lumen" (`Nota.dc.html`) muestran "La primera versión para la familia" (v0.5.0, 2 abr 2026), que no está en la lista de `Notas.dc.html`. Se agregó como nota para que la bitácora salga de la colección, como pide el plan. Por eso los conteos de /notas/ dicen "Todas 11", "Avances 5" y "Lumen 4" en vez de 10/4/3.
11. **Campos de nota**: `shortTitle` (ruta de navegación: "Lumen v1.7"), `logTitle` (título en la bitácora: "Publicaciones con varias fotos"), `lead` (entradilla bajo el título, distinta del resumen) y `version`.
12. **Tiempo de lectura**: se calcula (≈200 palabras/min), pero acepta `readingTime` en el frontmatter. Las notas de ejemplo lo fijan para mostrar los mismos minutos que el diseño, ya que sus cuerpos son cortos.
13. **Portada de "Lumen ya está en producción"**: `lumen-subida`, como en "Más de Lumen" de `Nota.dc.html` (en la lista de `Notas.dc.html` figuraba `lumen`; esa nota está en la página 2, así que no afecta la primera pantalla).
14. **Etiquetas de la barra lateral de Notas**: lista editable en `src/lib/sitio.ts` (`etiquetasDestacadas`) con el orden del artboard; si se vacía, se muestran las 8 más usadas.
15. **Casos de estudio solo para proyectos destacados.** Los "otros proyectos" (Vitrina, Almacén, Agenda) enlazan a GitHub, como en el artboard.
16. **"Bitácora de versiones"** muestra las notas del proyecto que tienen `version`; si ninguna la tiene, todas. "Ver las N notas" lleva a `/notas/?proyecto=slug`.

## Comportamiento

17. **Filtros de Notas en la URL** (`?tipo=`, `?proyecto=`, `?etiqueta=`, `?q=`, `?pagina=`): se pueden compartir, el botón Atrás funciona y los enlaces del caso de estudio y de las etiquetas usan los mismos parámetros. Paginación de 7: la primera nota de cada página usa la tarjeta destacada.
18. **Sin JavaScript**: los botones de filtro y el buscador se ocultan, todas las notas se listan y el formulario envía con su `action` (endpoint o `mailto:`).
19. **Filtros de Proyectos** ocultan cualquier tarjeta que no coincida (destacada, cuadrícula y "otros") y muestran un estado vacío con el mismo estilo que el de Notas (el artboard de Proyectos no tenía uno).
20. **Formulario**: validación propia accesible (`aria-invalid`, mensajes bajo cada campo, resumen en un `role="status"` y foco en el primer error), campo trampa `_gotcha` contra spam, envío `fetch` con `Accept: application/json`. Sin `PUBLIC_FORM_ENDPOINT`, arma un `mailto:` con asunto y cuerpo.
21. **Botones de copiar** (email, RSS, enlace de la nota, código) usan la API del portapapeles y anuncian "Copiado" en una región `aria-live`. Los "Copiar enlace del RSS" son enlaces reales al feed, así que sin JavaScript abren el RSS.
22. **Menú móvil** bajo 1040 px (la cabecera de escritorio no cabe antes): panel desplegable con los cinco enlaces y el CV; se cierra con Escape, al elegir un enlace o al ensanchar la ventana.
23. **El 404 es bilingüe** (una sola página en la raíz, que es la que Cloudflare Pages sirve).

## Diseño y fidelidad

24. **Shot conserva los estilos en línea del artboard** (es un dibujo de una captura, no parte del sistema de estilos) y usa `box-sizing: content-box`, como el original, para medir igual. El resto de las páginas pasó a CSS con tokens (`src/styles/global.css`).
25. **Los artboards no usaban `box-sizing: border-box`.** Donde un ancho más padding dependía de eso (teléfono flotante del hero, alto de los campos del formulario) se compensó para que midan lo mismo.
26. **Títulos sin `line-height` en el artboard heredan 1.55**; se respetó (por eso `.h2-medio` tiene 1.55).
27. **Objetivos táctiles de 44 px**: algunos controles del diseño medían 40–42 px (flechas de "Otros proyectos", filtros por proyecto, paginación, compartir). Se subieron a 44 px por el requisito de accesibilidad del plan; la diferencia visual es mínima.
28. **Versiones móviles sin artboard** (Proyectos, caso, Notas, Nota, Sobre mí, Contacto): una columna, gutter de 20 px, tarjetas apiladas, filtros con scroll horizontal y el menú de `HeaderMobile`. Entre 761 y 1040 px hay un diseño intermedio de una o dos columnas.
29. **Los radios del formulario se ven oscuros** (el sitio declara `color-scheme: dark`); en el artboard aparecían con el estilo claro por defecto del navegador.
30. **Lighthouse Accessibility = 96**: los puntos que faltan son textos de 4 px dentro de los mockups de Shot (réplica exacta del diseño). Los mockups están marcados como imagen (`role="img"` + `aria-label`) y su interior `aria-hidden`; al poner capturas reales con `<img>` el aviso desaparece.
31. **Imagen Open Graph** (`public/og.png`) generada a partir del hero con `npm run og`.

## Verificación

32. **Renderizador local de artboards** (`scripts/artboards/support.js`): el `support.js` original no estaba en el repositorio, así que se escribió uno mínimo que interpreta `<dc-import>`, `<sc-for>`, `<sc-if>` y `{{…}}`. Las pruebas comparan cada ruta con su artboard renderizado en el mismo navegador.

## Cambios posteriores (después de fusionar el PR #1)

33. **Se quitó la sección de Notas del alcance.** Se eliminaron la colección `notas`, las rutas `/notas/` y `/en/notas/` (lista, nota individual y RSS), los filtros y la paginación, los componentes MDX (`Figura`, `Aviso`, `Pendientes`), el tema de Shiki y las integraciones `@astrojs/mdx` y `@astrojs/rss`. También salieron de la navegación, el pie (enlace e icono RSS), el inicio ("Últimas notas"), el caso de estudio ("Bitácora de versiones" y su entrada en el índice), la tarjeta de Lumen en /proyectos/ ("N notas en la bitácora") y el motivo "Una nota del blog" del formulario. Las decisiones 10 a 14 y 16 a 18 sobre notas ya no aplican. Los artboards `Notas.dc.html` y `Nota.dc.html` se conservan en `docs/` como historial del diseño.
34. **Hero del inicio rediseñado** para que se vea menos genérico: se quitaron la insignia "Disponible…", el titular de eslogan, los dos botones tipo píldora, la lista con iconos y el collage de capturas con la tarjeta flotante. Ahora es tipográfico: una línea con rol y ciudad sobre una regla fina, el nombre en grande (Bricolage Grotesque), una presentación en primera persona con enlaces a Lumen y Cifra dentro del texto, enlaces discretos (proyectos, CV y email) y una ficha a la derecha con "Ahora / Estudio / Antes / Busco". La ficha reemplaza a la sección "En qué estoy ahora", que repetía esa información. Las capturas siguen apareciendo justo debajo, en "Proyectos destacados".
35. **Pruebas visuales**: el inicio ya no se compara con `Main.dc.html` ni `HomeMobile.dc.html` (se cambió a propósito), y en el caso de estudio solo se compara la primera pantalla porque la página es más corta sin la bitácora.

36. **Hero animado con foto sin fondo.** Se combinaron patrones conocidos de portafolios: retrato recortado anclado al borde inferior y desvanecido con `mask-image` sobre un brillo tipo *aurora* (tres degradados radiales desenfocados que derivan con `@keyframes`); una franja *marquee* gigante con texto en contorno detrás de la foto; el nombre revelado línea por línea con máscara (`overflow: hidden` + `translateY(110%)`, el efecto *split text reveal*); la foto apareciendo con `clip-path` de abajo hacia arriba; una píldora "Ahora: Lumen v1.8" con punto que late; un indicador de scroll; un leve parallax e inclinación 3D de la foto y la aurora que siguen al mouse (`src/scripts/hero.ts`, solo con mouse), y el fondo del hero alejándose con `animation-timeline: scroll()`. Todo respeta `prefers-reduced-motion`. La foto real se configura en `sitio.retrato`; mientras tanto se usa una silueta SVG.
37. **El nombre ya no está en la cabecera.** Solo queda el monograma "FR" como enlace al inicio (con `aria-label`). La cabecera ahora es fija (`position: sticky`) con fondo translúcido y `backdrop-filter`, y muestra un borde al hacer scroll.
38. **Más profundidad en todo el sitio**: grano de película sutil (SVG `feTurbulence` en `body::after`); tarjetas con borde de luz, sombra y *spotlight* que sigue al cursor (patrón de Linear/Vercel; `src/scripts/spotlight.ts` y las clases `.tarjeta` / `.spot`); las tarjetas enlazadas suben 4 px al pasar el mouse; bandas de contraste a todo el ancho (`.banda`) en Proyectos destacados, Qué hago, Certificaciones, Otros proyectos y el final del caso; títulos que se revelan con máscara al entrar en pantalla (`animation-timeline: view()`, solo donde hay soporte), y una doble franja *marquee* de tecnologías bajo el hero. Se agregaron tokens nuevos (`--c-borde`, `--c-banda`, `--c-brillo`, sombras) sin cambiar los colores originales.
39. **Pruebas visuales**: ahora solo comparan la primera pantalla con los artboards (≥ 90 %); el alto ya no, porque las bandas cambian el largo de las páginas a propósito.

### Rediseño "Sala oscura" (octubre de 2026)

Diseño completo en `docs/superpowers/specs/2026-10-22-sala-oscura-design.md` y plan en `docs/superpowers/plans/2026-10-22-sala-oscura.md`. Reemplaza las decisiones 34, 36, 37 y 38.

40. **Dirección elegida con taste-skill.** De las tres direcciones que repartió (Sala oscura, Instrumento silencioso, El objeto impreso), Fabián eligió Sala oscura: fondo casi negro de arriba abajo, paleta "Lunar and bronze" (`#111`, `#1c1c1c`, tinta `#f2f2f2`, acento bronce `#a08672` solo en la acción principal), esquinas rectas y cinco tamaños de letra.
41. **Newsreader en lugar de Erode.** La hoja dio Erode (Fontshare), que no se puede descargar desde este entorno. Newsreader (OFL) es la serif ligera que la biblioteca de taste-skill acepta para esta dirección. Se sirve desde `src/styles/fuentes/` con pesos 300 a 500. Bricolage Grotesque, Geist y Geist Mono ya no se usan en el sitio; los paquetes quedan solo para renderizar los artboards de `docs/` (`scripts/artboards/support.js`).
42. **Fuera los adornos:** píldoras (de estado, filtros, buscador, "Ahora: Lumen v1.8", "Disponible"), cristal (`backdrop-filter`), grano, aurora, spotlight y bordes de luz, sombras, bandas de contraste, marquee, monograma "FR", iconos decorativos (se borró `Icono.astro`) y la fuente monoespaciada del 404. Estados, etiquetas y tecnologías pasan a texto separado por comas.
43. **Barra lisa sin nombre:** enlaces de texto, "Contacto" como único botón bronce y fondo opaco al quedar fija. En el teléfono, "Menú" como palabra.
44. **Inicio nuevo:** foto a la izquierda con el nombre en minúsculas cruzándola (es el `h1`); proyectos como nombres grandes con una vista fija de la captura; Sobre mí con datos al lado y un párrafo ancho; tarjeta de contacto con la hora actual de Guayaquil y una línea que cambia según sea de día (8 a 22 h) o de noche. Sin JavaScript se ve "Respondo en uno o dos días".
45. **Movimiento:** el nombre crece al bajar y la foto se oscurece (`animation-timeline: scroll()`); zoom lento sobre la foto; entradas por partes de cada sección (`[data-entra]` + `src/scripts/entradas.ts`, que solo agrega la clase `.visible`). Sin JS o con "reducir movimiento" todo queda visible y quieto.
46. **Fotos de ejemplo:** el retrato es el avatar de GitHub de Fabián recortado a 800 × 1000 (`public/img/retrato.webp`). "Fuera del código" usa tres recortes de esa misma foto. Se usa también en Contacto y en `public/og.png`. Se cambian siguiendo "Poner tus fotos" en el README.
47. **Páginas internas:** conservan su estructura y su funcionamiento (filtros con `aria-pressed`, buscador, formulario, índice lateral y copiar). Los títulos de página van al tamaño del nombre para que haya un elemento dominante; los campos del formulario usan una línea inferior de 2 px.
48. **Pruebas:** se quitaron las comparaciones píxel a píxel con los artboards (el diseño ya no se parece a ellos a propósito), junto con `tests/servidor-artboards.mjs`, `pixelmatch` y `pngjs`. Se agregaron dos pruebas de la hora de Guayaquil con un reloj fijo.
49. **Excepción defendida de taste-skill:** Contacto tiene una sola foto (`few-pictures` pide cuatro). No hay más fotos reales de Fabián ni de Guayaquil; se completa cuando lleguen. El campo trampa del formulario lleva `taste-skill-ignore` porque su `height: 1px` no es una línea.
