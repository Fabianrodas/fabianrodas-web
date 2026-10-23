/**
 * Entradas por partes: cada [data-entra] recibe .visible la primera vez que aparece,
 * y sus hijos suben en cascada (global.css). Sin JS (o sin IntersectionObserver) todo queda visible.
 */
export function iniciarEntradas() {
  const elementos = [...document.querySelectorAll<HTMLElement>('[data-entra]')];
  if (!('IntersectionObserver' in window)) {
    for (const el of elementos) el.classList.add('visible');
    return;
  }
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('visible');
        observador.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  );
  for (const el of elementos) observador.observe(el);
}
