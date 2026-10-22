---
title: Nodo
slug: nodo
summary: La gestión de socios, noticias y eventos de una asociación profesional, con membresías por tipo de socio.
tagline: Panel de socios y eventos para una asociación.
label: Panel administrativo
role: Desarrollo del panel y la API
stack: [Angular, Express, PostgreSQL]
homeTags: [Angular, Express]
year: "2025"
period: Enero a diciembre de 2025
kind: Proyecto para un cliente
status: archivado
platform: Panel web
platformShort: Web
links:
  repo: https://github.com/Fabianrodas/nodo
cover: nodo
featured: true
order: 5
category: [web, cliente]
case:
  gallery:
    main:
      cover: nodo
      caption: El panel de socios con los totales por tipo de membresía.
  problem:
    - La asociación llevaba a sus socios en hojas de cálculo y anunciaba los eventos por correo, sin saber quién estaba al día con su membresía.
  solution:
    - Un panel administrativo para registrar socios, membresías, noticias y eventos, con un estado claro de cada socio.
  features:
    - Socios profesionales y empresariales
    - Estado de la membresía de cada socio
    - Publicación de noticias y eventos
    - Exportación a hoja de cálculo
  decisions:
    - icon: layout
      title: Angular
      text: Formularios grandes con validación, donde Angular resultó cómodo.
    - icon: server
      title: API en Express
      text: Una API REST pequeña con autenticación por roles.
    - icon: database
      title: PostgreSQL
      text: Relaciones claras entre socios, membresías y pagos.
  architecture:
    nodes:
      - { title: Panel, text: Angular }
      - { title: API, text: Express, highlight: true }
      - { title: Base de datos, text: PostgreSQL }
  learned:
    - Cerrar un proyecto también es parte del trabajo. Antes de archivarlo dejé documentado cómo exportar los datos y cómo volver a desplegarlo.
---
