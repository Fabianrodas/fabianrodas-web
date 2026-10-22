---
title: Taller
slug: taller
summary: "The website of a car repair shop in Guayaquil: services, opening hours and WhatsApp bookings. A client project."
tagline: The website of a car repair shop in Guayaquil.
label: Client website
role: Design, development and domain
stack: [Astro, Cloudflare]
tags: [Astro, Cloudflare, Client]
homeTags: [Astro, Client]
year: "2026"
period: August to October 2026
kind: Client project
status: produccion
platform: Website
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
      caption: The home page, with services and the booking button.
  problem:
    - The shop got almost every booking through calls and scattered messages, and customers couldn't find its hours or location online.
  solution:
    - A fast, easy-to-maintain site with services, hours and location that opens WhatsApp with a ready-to-send booking message.
  features:
    - Services with reference prices
    - WhatsApp button with a prefilled message
    - Map and hours always visible
    - Loads in under a second on a phone
  decisions:
    - icon: layout
      title: Static site
      text: Astro outputs HTML without unnecessary JavaScript, ideal for low-end phones.
    - icon: server
      title: Cloudflare Pages
      text: Free hosting, automatic HTTPS and a deploy on every change.
    - icon: calendar
      title: WhatsApp bookings
      text: The client already used WhatsApp; no new booking system was needed.
  architecture:
    nodes:
      - { title: Content, text: Markdown }
      - { title: Astro, text: Builds the site, highlight: true }
      - { title: Cloudflare, text: Hosting and domain }
  learned:
    - Working with a client is mostly listening. Showing the design on a canvas before writing code saved weeks of changes.
---
