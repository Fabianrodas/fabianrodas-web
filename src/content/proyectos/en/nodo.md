---
title: Nodo
slug: nodo
summary: Member, news and event management for a professional association, with memberships per member type.
tagline: Member and events dashboard for an association.
label: Admin dashboard
role: Dashboard and API development
stack: [Angular, Express, PostgreSQL]
homeTags: [Angular, Express]
year: "2025"
period: January to December 2025
kind: Client project
status: archivado
platform: Web dashboard
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
      caption: The members dashboard with totals per membership type.
  problem:
    - The association tracked members in spreadsheets and announced events by email, without knowing who was up to date with their membership.
  solution:
    - An admin dashboard to manage members, memberships, news and events, with a clear status for every member.
  features:
    - Professional and business members
    - Membership status for every member
    - News and event publishing
    - Spreadsheet export
  decisions:
    - icon: layout
      title: Angular
      text: Large forms with validation, where Angular felt comfortable.
    - icon: server
      title: Express API
      text: A small REST API with role-based authentication.
    - icon: database
      title: PostgreSQL
      text: Clear relations between members, memberships and payments.
  architecture:
    nodes:
      - { title: Dashboard, text: Angular }
      - { title: API, text: Express, highlight: true }
      - { title: Database, text: PostgreSQL }
  learned:
    - Closing a project is part of the job too. Before archiving it I documented how to export the data and how to deploy it again.
---
