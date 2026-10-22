---
title: Cifra
slug: cifra
summary: Una app de escritorio que cifra tus archivos antes de subirlos a la nube, sin que la llave salga de tu equipo.
tagline: Cifra tus archivos antes de subirlos a la nube.
label: App de escritorio
role: Diseño y desarrollo
stack: [Rust, Tauri, SQLite]
tags: [Rust, Escritorio, Criptografía]
homeTags: [Rust, Escritorio]
year: "2026"
period: Junio 2026 a hoy
kind: Proyecto personal
status: desarrollo
version: 0.4.0
platform: Escritorio (Windows, macOS y Linux)
platformShort: Escritorio
links:
  repo: https://github.com/Fabianrodas/cifra
cover: cifra
featured: true
order: 2
category: [escritorio]
case:
  gallery:
    main:
      cover: cifra
      caption: La bóveda con los archivos cifrados y la cola de cifrado.
  problem:
    - Las nubes gratuitas son cómodas, pero quien administra el servicio puede leer lo que subes. Quería guardar documentos personales en la nube sin entregarle a nadie la llave.
  solution:
    - Una app de escritorio que cifra cada archivo en tu equipo antes de que salga hacia la carpeta sincronizada de la nube. La llave nunca se sube.
  features:
    - Cifrado local antes de sincronizar
    - Llave protegida con una contraseña maestra
    - Respaldo de la llave en un archivo aparte
    - Funciona con cualquier carpeta de la nube
  decisions:
    - icon: code
      title: Núcleo en Rust
      text: Seguridad de memoria sin recolector de basura y un compilador que obliga a manejar cada error.
    - icon: lock
      title: Algoritmos probados
      text: Uso bibliotecas auditadas en lugar de inventar mi propio cifrado.
    - icon: database
      title: Índice local
      text: Un SQLite guarda qué archivo corresponde a cada cifrado, sin datos sensibles.
  architecture:
    intro: Todo ocurre en el equipo de la persona; la nube solo recibe archivos ya cifrados.
    nodes:
      - { title: Interfaz, text: Tauri y HTML }
      - { title: Núcleo en Rust, text: Cifrado y llaves, highlight: true }
      - { title: Índice, text: SQLite local }
      - { title: Carpeta en la nube, text: Solo archivos cifrados }
  learned:
    - Leer documentación de criptografía con calma vale más que cualquier atajo. También aprendí a escribir pruebas que verifican que un archivo vuelve exactamente igual después de cifrarlo y descifrarlo.
---
