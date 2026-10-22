---
title: Repaso
slug: repaso
summary: Quizzes, narrated videos and slides to review two university courses before every exam.
tagline: Quizzes and videos to review university courses.
label: Study app
role: Design, development and content
stack: [JavaScript, Netlify]
tags: [JavaScript, Netlify, University]
homeTags: [JavaScript, Netlify]
year: "2026"
period: March 2026 to today
kind: University project
status: produccion
platform: Website
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
      caption: A question from the Intelligent Systems quiz.
  problem:
    - Before each exam my classmates and I studied from scattered notes and long videos. We needed a quick way to practice.
  solution:
    - A web app with quizzes per topic, short narrated videos and slides, split by course with its own progress.
  features:
    - Quizzes that explain every answer
    - Short narrated videos
    - Progress saved per course
    - Works without an account
  decisions:
    - icon: code
      title: Plain JavaScript
      text: The app is small; with no dependencies it loads instantly and stays easy to maintain.
    - icon: database
      title: Local progress
      text: Progress is stored in the browser, with no server or accounts.
    - icon: book-open
      title: JSON content
      text: Adding a course means adding a file of questions.
  architecture:
    nodes:
      - { title: Questions, text: JSON files }
      - { title: App, text: JavaScript, highlight: true }
      - { title: Netlify, text: Hosting }
  learned:
    - Writing good questions is harder than coding the app. Testing it with classmates taught me to prioritize what they actually used.
---
