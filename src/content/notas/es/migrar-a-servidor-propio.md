---
title: "Migrar el despliegue a un servidor propio"
date: 2026-09-03
summary: "Lo que costó, lo que se rompió y la lista de pasos que ahora sigo en cada versión."
kind: nota
project: lumen
version: 1.6.0
tags: [Despliegue, Flask]
cover: lumen
readingTime: 7
logTitle: Migrar el despliegue a un servidor propio
---

Lumen empezó en un hospedaje compartido. Con más fotos y videos, el espacio y el costo dejaron de cuadrar, así que lo moví a un servidor propio.

## Lo que se rompió

Las rutas de los archivos estaban escritas a mano en dos lugares. Al cambiar de servidor, la mitad de las miniaturas dejó de cargar durante una tarde.

## La lista que sigo ahora

Antes de cada versión reviso respaldos, variables de entorno, permisos de las carpetas y una prueba completa en el navegador.
