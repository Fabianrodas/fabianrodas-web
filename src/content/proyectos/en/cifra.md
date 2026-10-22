---
title: Cifra
slug: cifra
summary: A desktop app that encrypts your files before they reach the cloud, without the key ever leaving your computer.
tagline: Encrypts your files before they reach the cloud.
label: Desktop app
role: Design and development
stack: [Rust, Tauri, SQLite]
tags: [Rust, Desktop, Cryptography]
homeTags: [Rust, Desktop]
year: "2026"
period: June 2026 to today
kind: Personal project
status: desarrollo
version: 0.4.0
platform: Desktop (Windows, macOS and Linux)
platformShort: Desktop
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
      caption: The vault with encrypted files and the encryption queue.
  problem:
    - Free cloud storage is convenient, but whoever runs the service can read what you upload. I wanted to keep personal documents in the cloud without handing anyone the key.
  solution:
    - A desktop app that encrypts every file on your computer before it goes to the synced cloud folder. The key is never uploaded.
  features:
    - Local encryption before syncing
    - Key protected by a master password
    - Key backup in a separate file
    - Works with any cloud folder
  decisions:
    - icon: code
      title: Rust core
      text: Memory safety without a garbage collector, and a compiler that makes me handle every error.
    - icon: lock
      title: Proven algorithms
      text: Audited libraries instead of inventing my own crypto.
    - icon: database
      title: Local index
      text: SQLite maps each encrypted file to its original, with no sensitive data.
  architecture:
    intro: Everything happens on the user's computer; the cloud only receives encrypted files.
    nodes:
      - { title: Interface, text: Tauri and HTML }
      - { title: Rust core, text: Encryption and keys, highlight: true }
      - { title: Index, text: Local SQLite }
      - { title: Cloud folder, text: Encrypted files only }
  learned:
    - Reading cryptography docs slowly beats any shortcut. I also learned to write tests that check a file comes back byte-for-byte after encrypting and decrypting it.
---
