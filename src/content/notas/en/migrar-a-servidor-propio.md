---
title: "Moving the deployment to my own server"
date: 2026-09-03
summary: "What it cost, what broke and the checklist I now follow for every release."
kind: nota
project: lumen
version: 1.6.0
tags: [Deployment, Flask]
cover: lumen
readingTime: 7
logTitle: Moving the deployment to my own server
---

Lumen started on shared hosting. With more photos and videos, space and cost stopped adding up, so I moved it to my own server.

## What broke

File paths were hard-coded in two places. After the move, half the thumbnails stopped loading for an afternoon.

## The checklist I follow now

Before every release I check backups, environment variables, folder permissions and a full browser test.
