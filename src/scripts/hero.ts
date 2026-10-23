/**
 * Parallax del hero: la foto se inclina levemente y la aurora se desplaza con el cursor.
 * Solo con mouse y sin "reducir movimiento".
 */
export function iniciarHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (sinMovimiento || !conMouse) return;

  const capas = [...hero.querySelectorAll<HTMLElement>('[data-capa]')];
  let objetivo = { x: 0, y: 0 };
  let actual = { x: 0, y: 0 };
  let animando = false;

  const paso = () => {
    actual.x += (objetivo.x - actual.x) * 0.08;
    actual.y += (objetivo.y - actual.y) * 0.08;
    for (const capa of capas) {
      const f = Number(capa.dataset.capa) || 1;
      capa.style.setProperty('--px', `${actual.x * 14 * f}px`);
      capa.style.setProperty('--py', `${actual.y * 10 * f}px`);
      capa.style.setProperty('--rx', `${actual.x * 5 * f}deg`);
      capa.style.setProperty('--ry', `${-actual.y * 4 * f}deg`);
    }
    if (Math.abs(objetivo.x - actual.x) > 0.001 || Math.abs(objetivo.y - actual.y) > 0.001) {
      requestAnimationFrame(paso);
    } else {
      animando = false;
    }
  };
  const mover = () => {
    if (!animando) {
      animando = true;
      requestAnimationFrame(paso);
    }
  };

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    objetivo = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
    mover();
  });
  hero.addEventListener('pointerleave', () => {
    objetivo = { x: 0, y: 0 };
    mover();
  });
}
