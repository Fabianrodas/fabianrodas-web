# Diseño: estructura anterior con el estilo Sala oscura

Fecha: 2026-10-23 · Estado: **aprobado por Fabián** (respuestas del 23 de octubre)

## Intención

La versión Sala oscura (PR #2) no gustó: el inicio y las páginas internas perdieron la estructura que funcionaba (hero con foto, tarjetas de proyectos, banda de contacto, pie en columnas). Fabián pide volver a esa estructura con las correcciones que ya había pedido y con el estilo visual nuevo:
- **Correcciones:** sin píldoras de cristal ("Ahora: Lumen v1.8"), sin el "FR" en círculo, sin la franja de tecnologías (marquee), otra tipografía en el hero y que no se vea plano ni "vibecoded".
- **Estilo nuevo:** la paleta negro y bronce y la tipografía Newsreader de Sala oscura.
- **Fotos:** de ejemplo, en HD, para ver bien el diseño.

## Decisiones (respuestas de Fabián)

| Pregunta | Respuesta |
|---|---|
| ¿Qué es "estilo nuevo"? | La estructura anterior con la paleta y la tipografía de Sala oscura. |
| ¿De dónde salen las fotos HD? | De repositorios públicos de GitHub (lo único accesible desde aquí). |

## Sistema visual

- **Color:** fondo `#111111`, banda `#161616`, superficie `#1c1c1c`, superficie 2 `#262626`, tinta `#f2f2f2`, tinta suave `#d6d6d6`, secundaria `#a6a6a6`, acento bronce `#a08672` (solo en la acción principal, el estado "En producción" y marcadores pequeños).
- **Tipografía:** Newsreader en todo el sitio. Títulos en 400 con tracking negativo, texto en 400 con interlineado 1,55. El nombre del hero ya no va en contorno: dos líneas en tinta plena.
- **Formas:** esquinas rectas. Las tarjetas son paneles de un escalón de tono, sin bordes de luz, sin sombras y sin spotlight. Las etiquetas son rectángulos pequeños de tono (no píldoras). Los botones son rectangulares.
- **Profundidad sin adornos:** bandas de tono a todo el ancho (proyectos destacados y Qué hago), fotos grandes y el retrato recortado que sale de un panel de tono. Sin grano, aurora, gradientes ni cristal.

## Estructura (la anterior)

- **Barra:** sin logo ni nombre; navegación de texto al centro (Inicio, Proyectos, Sobre mí, Contacto, con el activo subrayado en bronce), ES/EN y el botón CV a la derecha. Opaca al quedar fija.
- **Inicio:**
  1. Hero en dos columnas: a la izquierda el saludo, el nombre en dos líneas, la presentación, los datos y las acciones ("Ver proyectos" en bronce, "CV en PDF"). A la derecha, el retrato recortado sobre un panel de tono.
  2. Proyectos destacados en banda: tarjeta grande de Lumen y cuatro tarjetas.
  3. Sobre mí breve con dos fotos (agregado para que el inicio tenga fotos reales además de capturas).
  4. Banda de contacto: foto pequeña, pregunta, hora actual en Guayaquil y botones "Escríbeme" y "Copiar email".
- **Pie en columnas:** nombre y descripción (sin avatar), Sitio, Proyectos, Más, enlaces sociales como texto.
- **Páginas internas:** la estructura de antes (Proyectos con filtros y tarjetas, caso de estudio, Sobre mí con retrato y "Fuera del código", Contacto con canales y formulario, 404). Las tarjetas de "Qué hago" y certificados pierden el icono de arriba.

## Movimiento

- Una secuencia de carga en el hero: el nombre sube línea por línea con máscara y la foto se revela de abajo hacia arriba; leve parallax de la foto con el mouse.
- Al bajar, el hero se aleja un poco (`animation-timeline: scroll()`).
- Respuesta a cada control: hover en tarjetas (zoom de la captura y título subrayado), botones con estado presionado.
- Con "reducir movimiento" todo queda visible y quieto.

## Fotos de ejemplo

Fotos con licencia MIT de las plantillas de StartBootstrap (originalmente de Unsplash): un retrato recortado sin fondo, escritorio con portátil, código en pantalla, cámara y mapa, escritorio con libreta y montañas con niebla. Se procesan con `astro:assets` (WebP a varios anchos). Se reemplazan con las fotos reales de Fabián.

## Verificación

- Pruebas funcionales y de capturas existentes; `astro check` y build sin errores; Lighthouse ≥ 95.
- taste-skill (`lint.mjs` e `inspect.mjs` sin FAIL, o con la excepción escrita) y checklist de ui-ux-pro-max (contraste 4,5:1, foco visible, objetivos de 44 px, sin scroll horizontal, `prefers-reduced-motion`).
