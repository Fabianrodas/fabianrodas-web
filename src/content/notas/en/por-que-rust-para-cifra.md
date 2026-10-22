---
title: "Why I chose Rust for Cifra"
date: 2026-10-02
summary: "Memory safety without a garbage collector, and a compiler that makes me think about every error."
kind: nota
project: cifra
tags: [Rust, Security]
cover: cifra
readingTime: 6
---

Cifra handles keys and private files, so a memory bug isn't a detail: it's a leak. That's why its core is written in Rust.

## Safety without a collector

Rust checks at compile time who owns every piece of data. That removes a whole family of bugs without paying for garbage collector pauses.

## A demanding compiler

At first the compiler feels like an obstacle. Over time it becomes a teammate: every `Result` it makes me handle is a case I would have forgotten before.
