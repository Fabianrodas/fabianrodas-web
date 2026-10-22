# Diseño: rediseño "Sala oscura"

Fecha: 2026-10-22 · Estado: **aprobado (dirección elegida por Fabián)**

## Intención

El sitio se ve plano y "hecho por IA". Fabián quiere un portafolio con su foto en el hero, poco texto sobre él, sin su nombre como logo en la barra, con otra tipografía y sin los adornos típicos de las páginas generadas (píldoras de cristal, franjas de texto, aurora, bordes de luz). Quien lo visite (reclutadores para prácticas en 2027 y clientes pequeños) debe saber en cinco segundos quién es, qué hace y cómo escribirle.

## Metas, no metas y anti-metas

- **Metas:** un hero con foto grande y el nombre como único elemento enorme; una paleta oscura con un solo acento; menos tamaños de letra (cinco); movimiento con propósito (una animación principal y entradas por sección); pasar el inspector de taste-skill sin fallos a 1440, 768 y 390 px.
- **No metas:** cambiar el contenido de los proyectos, el modelo de datos, las rutas, el i18n ES/EN, el formulario ni los filtros.
- **Anti-metas** (sería un fracaso aunque funcione): volver a meter píldoras, insignias, cristal (`backdrop-filter`), gradientes, sombras en reposo, bordes de 1 px, rótulos pequeños encima de los títulos, texto gris de bajo contraste o franjas decorativas.

## Restricciones

- Astro 7, CSS propio, JS mínimo en vanilla TS, `prefers-reduced-motion` respetado, Lighthouse ≥ 95.
- En este entorno solo hay red hacia npm y GitHub. No se puede descargar Erode (Fontshare) ni fotos de archivos abiertos (Wikimedia, Openverse, Unsplash).
- Todavía no hay fotos reales de Fabián; se usa su avatar de GitHub como ejemplo hasta que las tenga.

## Enfoques considerados

Taste-skill repartió tres direcciones para "portafolio personal":

1. **Sala oscura** (elegida por Fabián): fondo casi negro de arriba abajo, sin bandas; la foto y los proyectos como piezas iluminadas en una sala; tipografía ligera; un acento cálido solo en la acción principal. Es la única centrada en una foto de la persona.
2. **Instrumento silencioso:** fondo blanco, azul marino, una columna estrecha y mucho espacio. Se descartó porque arriesgaba volver a verse plano.
3. **El objeto impreso:** el sitio como una carpeta con pestañas. Se descartó porque se aleja del hero con foto.

## Lo decidido

### Sistema visual (todo el sitio)

- **Paleta "Lunar and bronze"** (de la hoja de taste-skill): fondo `#111111`, superficie `#1c1c1c`, tinta `#f2f2f2`, tinta suave `#8f8f8f` (solo para notas secundarias), acento bronce `#a08672` solo en el botón principal y algún marcador pequeño. El texto corrido va en tinta plena (contraste ≥ 7:1).
- **Tipografía: Newsreader** (variable, `@fontsource-variable/newsreader`), una sola familia. Títulos en peso 300–400 con tracking −0,025 a −0,035 em e interlineado 0,95; texto en 400 con interlineado 1,55. *Llamada mía:* la hoja dio **Erode**, pero no se puede descargar desde aquí. Newsreader es la serif ligera de gran tamaño que la biblioteca de taste-skill acepta para esta dirección. Si Fabián descarga Erode de fontshare.com (gratis), se cambia en un archivo.
- **Cinco tamaños:** pequeño 14 px, cuerpo 17–19 px, entrada 20–26 px, título 32–64 px y el nombre del hero (8–9 vw).
- **Formas:** esquinas rectas en imágenes y paneles; botón con una sola forma en todo el sitio (rectangular, relleno bronce). Sin sombras, sin bordes de 1 px, sin gradientes, sin cristal y sin grano. Las superficies se separan con un escalón de tono (`#111` → `#1c1c1c`).
- **Fuera:** el spotlight y los bordes de luz de las tarjetas, las bandas de contraste, la aurora, el marquee, las píldoras de estado ("En producción" pasa a texto en la línea de datos del proyecto), las etiquetas tipo chip (pasan a texto separado por comas) y Geist Mono en el 404.

### Barra de navegación

Una barra lisa, sin logo y sin nombre: enlaces de texto a 15 px arriba a la derecha (Inicio, Proyectos, Sobre mí, CV, ES/EN) y, al final, la única acción, "Contacto", como botón bronce. Al bajar, la barra queda fija con fondo opaco `#111` (sin desenfoque). En el teléfono: "Menú" como palabra y la acción a la derecha.

### Inicio

1. **Hero "foto inset, nombre que cruza":**
   - **Foto:** vertical, a la izquierda (47 % del ancho), con 20 px de margen arriba, a la izquierda y abajo. Si es un recorte sin fondo, va sobre la superficie `#1c1c1c`.
   - **Texto a la derecha**, a media altura: una frase de hasta tres líneas a 24 px que dice quién es y qué hace ("Estudiante de Ingeniería en Ciencias de la Computación en Guayaquil. Hago software que llega a producción."). Debajo, el botón "Ver proyectos".
   - **Nombre:** abajo, en minúsculas, en una línea ("fabián rodas", unos 9 vw, peso ligero). Empieza sobre la esquina inferior derecha de la foto y la cruza en tinta sólida, sin modos de fusión. Es el `h1`.
   - *Llamada mía:* la hoja deja la foto fija durante toda la página; aquí queda fija solo mientras dura el hero. Así las secciones de abajo pueden usar todo el ancho que piden sus composiciones.
   - **En el teléfono:** la foto ocupa el 58 % superior, el nombre va debajo a unos 17 vw rozando su borde y luego la frase.
2. **Proyectos, "nombres grandes con vista fija"** (cambio de la hoja; ver "Cambios a la hoja"):
   - Los cinco proyectos destacados son el índice: nombres a 44–80 px, uno por línea, cada uno un enlace a su caso.
   - A la derecha, una vista fija muestra la captura del proyecto que tienes encima con el mouse o el foco. Bajo cada nombre, una línea con estado, stack y año.
   - En el teléfono, cada nombre lleva su captura debajo.
   - Al final, el enlace "Ver los 8 proyectos".
3. **Sobre mí, "datos al lado, párrafo ancho":** cuatro datos (Guayaquil, UEES 2027, pasantía en Futuresoft 2026, español e inglés B2) en una columna estrecha y, al lado, un párrafo de 60–80 palabras en tinta plena. Título: "Sobre mí".
4. **Contacto, "tarjeta sobre una foto":** una tarjeta opaca con el email, LinkedIn, GitHub y el botón "Escríbeme". *Llamada mía:* si no hay foto de Guayaquil o de Fabián para el fondo, la tarjeta va sobre la superficie oscura a todo el ancho.
5. **Pie: una línea discreta** en todas las páginas: a la izquierda qué es el sitio, al centro los enlaces y a la derecha el año. Sin columnas, sin línea encima y sin cambio de fondo.

### Lo único interactivo de verdad

En la tarjeta de contacto, **la hora actual en Guayaquil** y una línea que cambia según la hora ("son las 10:40 en Guayaquil: suelo responder hoy" / "es de noche en Guayaquil: respondo mañana por la mañana"). Sin JavaScript se ve el texto fijo "Respondo en uno o dos días". Nace del contenido real (zona horaria UTC−5 y la pregunta frecuente sobre trabajo remoto).

### Movimiento

- **Animación principal: el nombre escala con el scroll.** Al bajar, "fabián rodas" crece y sube un poco mientras la foto se oscurece levemente (`animation-timeline: scroll()`; sin soporte, queda quieto). *Llamada mía:* la hoja propone un fundido lento entre 3 o 4 fotos, pero hoy solo hay una. Si Fabián manda más, se agrega.
- **Entradas por sección:** primero el título, luego el texto y luego la imagen, con 60–90 ms entre cada uno y una subida de 16–32 px con opacidad, una sola vez al entrar. Si el script falla, el contenido se ve igual.
- **Respuesta en cada control:** hover, foco y presión en enlaces, botones y nombres de proyecto (los demás nombres bajan a tinta suave y la vista cambia de captura con un fundido).
- **Una imagen en movimiento:** un zoom lento (escala 1 → 1,04 en unos 20 s) sobre la foto del hero.
- Con "reducir movimiento" todo queda quieto y visible.

### Resto de páginas (restyle, misma estructura)

Proyectos, caso de estudio, Sobre mí, Contacto y 404 conservan su estructura y su funcionamiento: filtros, buscador, formulario, índice lateral y copiar. Cambian a la nueva paleta, la tipografía, la escala de cinco tamaños, la barra y el pie, y pierden los adornos:
- los filtros pasan a ser texto (el activo en tinta plena) en lugar de píldoras;
- las tarjetas, a paneles de tono sin borde ni sombra;
- el estado, a texto;
- los chips de tecnologías, a listas con comas.

En Proyectos y el caso, las capturas de los proyectos (`Shot`) se marcan con `data-ui` como fragmentos de interfaz.

### Pruebas y verificación

- Se mantienen las pruebas funcionales (filtros, menú, ES/EN, formulario, copiar, 404, rutas eliminadas) y las capturas a 1440 y 390 px sin scroll horizontal y con un `h1`.
- **Se quitan las comparaciones píxel a píxel con los artboards originales,** porque el diseño deja de parecerse a ellos a propósito. Los artboards quedan en `docs/` como historial.
- Se agrega la prueba de la hora de Guayaquil.
- Puerta final: `lint.mjs` e `inspect.mjs` de taste-skill sin FAIL a 1440, 768 y 390, la crítica de `critique.md` por escrito, Lighthouse ≥ 95 y `astro check` y build sin errores.

## Cambios a la hoja de taste-skill (con motivo)

| Ranura | Hoja | Se usa | Motivo |
|---|---|---|---|
| Tipografía | Erode | Newsreader | Erode no se puede descargar desde este entorno; Newsreader es la serif ligera aceptada para la dirección. |
| Trabajo | Una tira de 4–6 imágenes por proyecto | Nombres grandes con vista fija | Cada proyecto tiene 1 a 3 capturas, no 4–6. |
| Sobre mí | Título fijo y retratos que pasan (hasta 6 personas) | Datos al lado, párrafo ancho | Es una sola persona. |
| Movimiento | Fundido lento entre fotos | Nombre que escala con el scroll | Hay una sola foto. |
| Contacto | Tarjeta sobre una foto del lugar | Igual, con fondo liso de respaldo | No hay fotos de Guayaquil descargables aquí. |

## Lo que queda a criterio de quien construye

Los textos exactos en ES y EN siguiendo `references/copy.md` (títulos de dos líneas como máximo), los cortes responsive intermedios (768 px), las duraciones exactas dentro de los rangos y cómo cambia la vista fija de proyectos sin mouse (con foco o con scroll).

## Pendiente de Fabián

1. **Fotos:** al menos una foto vertical suya (con o sin fondo) para el hero; idealmente 2 o 3 más del mismo encuadre para el fundido y una de Guayaquil para el contacto.
2. **Tipografía:** Newsreader ahora, o Erode si la descarga de fontshare.com y la sube al repo.
