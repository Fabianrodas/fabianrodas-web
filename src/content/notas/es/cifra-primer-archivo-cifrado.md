---
title: "Cifra: primer archivo cifrado de punta a punta"
date: 2026-07-19
summary: "Del archivo original al cifrado y de vuelta, sin que la llave salga del equipo."
kind: avance
project: cifra
version: 0.1.0
tags: [Rust, Seguridad]
cover: cifra
readingTime: 4
logTitle: Primer archivo cifrado de punta a punta
---

Por fin Cifra completó el ciclo entero: tomó un archivo, lo cifró, lo dejó en la carpeta de la nube y lo devolvió idéntico.

## La prueba que importa

Una prueba compara byte por byte el archivo original con el descifrado. Si falla, no hay versión.
