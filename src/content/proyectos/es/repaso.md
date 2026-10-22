---
title: Repaso
slug: repaso
summary: Quizzes, videos narrados y diapositivas para repasar dos materias de la universidad antes de cada examen.
tagline: Quizzes y videos para repasar materias de la universidad.
label: App de estudio
role: Diseño, desarrollo y contenido
stack: [JavaScript, Netlify]
tags: [JavaScript, Netlify, Universidad]
homeTags: [JavaScript, Netlify]
year: "2026"
period: Marzo 2026 a hoy
kind: Proyecto universitario
status: produccion
platform: Sitio web
platformShort: Web
links:
  live: https://repaso.example.com
  repo: https://github.com/Fabianrodas/repaso
cover: repaso
featured: true
order: 4
category: [web, universidad]
case:
  gallery:
    main:
      cover: repaso
      caption: Una pregunta del quiz de Sistemas Inteligentes.
  problem:
    - Antes de cada examen mis compañeros y yo repasábamos con apuntes dispersos y videos largos. Faltaba una forma rápida de practicar.
  solution:
    - Una app web con quizzes por tema, videos cortos narrados y diapositivas, separada por materia y con el progreso de cada una.
  features:
    - Quizzes con explicación de cada respuesta
    - Videos cortos narrados
    - Progreso guardado por materia
    - Funciona sin crear una cuenta
  decisions:
    - icon: code
      title: JavaScript sin framework
      text: La app es pequeña; sin dependencias carga al instante y se mantiene fácil.
    - icon: database
      title: Progreso local
      text: El avance se guarda en el navegador, sin servidor ni cuentas.
    - icon: book-open
      title: Contenido en JSON
      text: Agregar una materia nueva es agregar un archivo de preguntas.
  architecture:
    nodes:
      - { title: Preguntas, text: Archivos JSON }
      - { title: App, text: JavaScript, highlight: true }
      - { title: Netlify, text: Hospedaje }
  learned:
    - Escribir buenas preguntas es más difícil que programar la app. Probarla con compañeros me enseñó a priorizar lo que de verdad usaban.
---
