---
title: Taller
slug: taller
summary: "La página de un taller automotriz de Guayaquil: servicios, horarios y citas por WhatsApp. Proyecto para un cliente."
tagline: La página de un taller automotriz de Guayaquil.
label: Sitio para un cliente
role: Diseño, desarrollo y dominio
stack: [Astro, Cloudflare]
tags: [Astro, Cloudflare, Cliente]
homeTags: [Astro, Cliente]
year: "2026"
period: Agosto a octubre de 2026
kind: Proyecto para un cliente
status: produccion
platform: Sitio web
platformShort: Web
links:
  live: https://taller.example.com
  privateRepo: true
cover: taller
featured: true
order: 3
category: [web, cliente]
case:
  gallery:
    main:
      cover: taller
      caption: La portada del sitio, con los servicios y el botón para agendar.
  problem:
    - El taller recibía casi todas sus citas por llamadas y mensajes sueltos, y sus clientes no encontraban los horarios ni la ubicación en internet.
  solution:
    - Un sitio rápido y fácil de mantener que muestra los servicios, los horarios y la ubicación, y lleva directo a WhatsApp con un mensaje listo para agendar.
  features:
    - Servicios con precios de referencia
    - Botón de WhatsApp con mensaje prellenado
    - Mapa y horarios siempre visibles
    - Carga en menos de un segundo en el teléfono
  decisions:
    - icon: layout
      title: Sitio estático
      text: Astro genera HTML sin JavaScript innecesario, ideal para teléfonos de gama baja.
    - icon: server
      title: Cloudflare Pages
      text: Hospedaje gratuito, HTTPS automático y despliegue con cada cambio.
    - icon: calendar
      title: Citas por WhatsApp
      text: El cliente ya usaba WhatsApp; no hacía falta un sistema de reservas nuevo.
  architecture:
    nodes:
      - { title: Contenido, text: Markdown }
      - { title: Astro, text: Genera el sitio, highlight: true }
      - { title: Cloudflare, text: Hospedaje y dominio }
  learned:
    - Trabajar con un cliente es sobre todo escuchar. Mostrar el diseño en un lienzo antes de escribir código ahorró semanas de cambios.
---
