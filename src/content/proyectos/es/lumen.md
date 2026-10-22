---
title: Lumen
slug: lumen
summary: Un álbum privado para guardar recuerdos en familia, con varias fotos y videos por publicación. Lo diseñé, lo programé y lo mantengo en mi propio servidor.
homeSummary: "Un álbum privado para guardar recuerdos en familia: varias fotos y videos por publicación, comentarios, favoritos y etiquetas. Corre en mi propio servidor."
tagline: Un álbum privado para guardar recuerdos en familia.
label: Álbum familiar
role: Diseño, desarrollo y despliegue
stack: [React, Flask, PostgreSQL, Nginx, Linux]
tags: [React, Flask, PostgreSQL, Nginx]
year: 2025–2026
period: Septiembre 2025 a hoy
kind: Proyecto personal
status: produccion
version: 1.7.0
platform: Web y app instalable en el teléfono
platformShort: Web y móvil
links:
  live: https://lumen.fabianrodas.com
  privateRepo: true
cover: lumen
featured: true
order: 1
category: [web]
case:
  gallery:
    main:
      cover: lumen
      caption: La vista de un recuerdo en escritorio, con la cuadrícula de fotos y videos.
    mobile:
      cover: lumen-movil
      caption: En el teléfono, instalado como app.
    secondary:
      cover: lumen-subida
      caption: La subida de varios archivos mantiene el formulario de siempre.
  problem:
    - Las fotos de la familia estaban repartidas entre chats, teléfonos y nubes distintas. Nadie sabía dónde había quedado el video del último cumpleaños, y los álbumes compartidos mezclaban todo con lo de otras personas.
    - Quería un lugar privado, rápido en el teléfono y lo bastante simple como para que mis abuelos lo usaran sin ayuda.
  solution:
    - Una web app que se instala en el teléfono. Cada recuerdo junta hasta 30 fotos y videos con una sola descripción, y la familia puede comentar, marcar favoritos y etiquetar a las personas.
  features:
    - Hasta 30 fotos y videos por recuerdo
    - Comentarios, favoritos y etiquetas
    - Registro cerrado, cuentas creadas por el administrador
    - Se instala en el teléfono como una app
  decisions:
    - icon: server
      title: Servidor propio
      text: Flask y PostgreSQL en un servidor que administro yo, para controlar costos y respaldos.
    - icon: upload
      title: Cola de subida
      text: Los archivos se suben de tres en tres para que un recuerdo grande no bloquee el teléfono.
    - icon: lock
      title: Registro cerrado
      text: "Nadie fuera de la familia entra por accidente: las cuentas las crea el administrador."
  architecture:
    intro: Todo corre en un solo servidor. Cada versión pasa por pruebas en el navegador antes de desplegarse.
    nodes:
      - { title: Navegador, text: "React, app instalable" }
      - { title: Nginx, text: HTTPS y archivos }
      - { title: API en Flask, text: Recuerdos y cuentas, highlight: true }
      - { title: PostgreSQL, text: Datos y respaldos }
    caption: Las fotos y videos se guardan en disco; la base de datos solo guarda sus rutas.
  learned:
    - Mantener algo en producción es otro trabajo distinto a construirlo. Ahora escribo una lista de pruebas antes de cada versión, separo lo urgente de lo que puede esperar y documento lo que cambia para no depender de mi memoria.
---
