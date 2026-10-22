import { chromium } from '@playwright/test';
const b=await chromium.launch();
const rutas=['/','/proyectos/','/proyectos/lumen/','/proyectos/cifra/','/notas/','/notas/lumen-v1-7/','/notas/por-que-rust-para-cifra/','/sobre-mi/','/contacto/','/404/','/en/','/en/notas/lumen-v1-7/','/en/proyectos/nodo/'];
for (const w of [390,768,1024,1440]) { const p=await b.newPage({viewport:{width:w,height:800}});
for (const r of rutas){ await p.goto('http://localhost:4321'+r); const o=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth); if(o>0) console.log('OVERFLOW',w,r,o);} await p.close();}
await b.close(); console.log('fin');
