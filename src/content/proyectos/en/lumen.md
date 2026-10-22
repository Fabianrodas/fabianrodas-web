---
title: Lumen
slug: lumen
summary: A private album where my family keeps its memories, with several photos and videos per post. I designed it, built it and run it on my own server.
homeSummary: "A private album where my family keeps its memories: several photos and videos per post, comments, favorites and tags. It runs on my own server."
tagline: A private album for family memories.
label: Family album
role: Design, development and deployment
stack: [React, Flask, PostgreSQL, Nginx, Linux]
tags: [React, Flask, PostgreSQL, Nginx]
year: 2025–2026
period: September 2025 to today
kind: Personal project
status: produccion
version: 1.7.0
platform: Web and installable phone app
platformShort: Web and mobile
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
      caption: A memory on desktop, with its grid of photos and videos.
    mobile:
      cover: lumen-movil
      caption: On the phone, installed as an app.
    secondary:
      cover: lumen-subida
      caption: Uploading several files keeps the same familiar form.
  problem:
    - Family photos were scattered across chats, phones and different clouds. Nobody knew where the video of the last birthday had ended up, and shared albums mixed everything with other people's stuff.
    - I wanted a private place, fast on the phone and simple enough for my grandparents to use without help.
  solution:
    - A web app that installs on the phone. Each memory groups up to 30 photos and videos under one description, and the family can comment, add favorites and tag people.
  features:
    - Up to 30 photos and videos per memory
    - Comments, favorites and tags
    - Invite-only, accounts created by the admin
    - Installs on the phone like an app
  decisions:
    - icon: server
      title: Own server
      text: Flask and PostgreSQL on a server I manage myself, to keep costs and backups under control.
    - icon: upload
      title: Upload queue
      text: Files upload three at a time so a big memory never freezes the phone.
    - icon: lock
      title: Invite-only
      text: "Nobody outside the family gets in by accident: the admin creates every account."
  architecture:
    intro: Everything runs on a single server. Every release goes through browser tests before it ships.
    nodes:
      - { title: Browser, text: "React, installable app" }
      - { title: Nginx, text: HTTPS and files }
      - { title: Flask API, text: Memories and accounts, highlight: true }
      - { title: PostgreSQL, text: Data and backups }
    caption: Photos and videos live on disk; the database only stores their paths.
  learned:
    - Keeping something in production is a different job from building it. I now write a test checklist before every release, separate what is urgent from what can wait, and document what changes so I don't depend on my memory.
---
