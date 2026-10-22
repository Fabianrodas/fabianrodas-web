/**
 * Spotlight: actualiza --mx/--my (posición del cursor) en la tarjeta bajo el puntero,
 * para el brillo radial y el borde de luz definidos en global.css.
 */
export function iniciarSpotlight() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  let actual: HTMLElement | null = null;
  let pendiente = false;
  let x = 0;
  let y = 0;
  const pintar = () => {
    pendiente = false;
    if (!actual) return;
    const r = actual.getBoundingClientRect();
    actual.style.setProperty('--mx', `${x - r.left}px`);
    actual.style.setProperty('--my', `${y - r.top}px`);
  };
  document.addEventListener(
    'pointermove',
    (e) => {
      actual = (e.target as HTMLElement).closest<HTMLElement>('.tarjeta, .spot');
      x = e.clientX;
      y = e.clientY;
      if (actual && !pendiente) {
        pendiente = true;
        requestAnimationFrame(pintar);
      }
    },
    { passive: true },
  );
}
