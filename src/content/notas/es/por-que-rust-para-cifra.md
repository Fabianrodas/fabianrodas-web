---
title: "Por qué elegí Rust para Cifra"
date: 2026-10-02
summary: "Seguridad de memoria sin recolector de basura, y un compilador que me obliga a pensar en cada error."
kind: nota
project: cifra
tags: [Rust, Seguridad]
cover: cifra
readingTime: 6
---

Cifra maneja llaves y archivos privados, así que un error de memoria no es un detalle: es una fuga. Por eso el núcleo está escrito en Rust.

## Seguridad sin recolector

Rust revisa en compilación quién es dueño de cada dato. Eso elimina una familia entera de errores sin pagar las pausas de un recolector de basura.

## Un compilador exigente

Al principio el compilador parece un obstáculo. Con el tiempo se vuelve un compañero: cada `Result` que me obliga a manejar es un caso que antes habría olvidado.
