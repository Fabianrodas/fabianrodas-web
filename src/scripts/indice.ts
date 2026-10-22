/** Marca en el índice lateral ([data-indice]) la sección que se está leyendo. */
export function iniciarIndice() {
  const nav = document.querySelector<HTMLElement>('[data-indice]');
  if (!nav) return;
  const enlaces = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const secciones = enlaces
    .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
    .filter((s): s is HTMLElement => s !== null);
  if (secciones.length === 0) return;

  const activar = (id: string) => {
    for (const a of enlaces) {
      const activo = decodeURIComponent(a.hash) === `#${id}`;
      a.classList.toggle('activo', activo);
      if (activo) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    }
  };

  const actualizar = () => {
    const limite = window.innerHeight * 0.3;
    let actual = secciones[0]!;
    for (const s of secciones) if (s.getBoundingClientRect().top <= limite) actual = s;
    activar(actual.id);
  };
  let pendiente = false;
  window.addEventListener('scroll', () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      actualizar();
    });
  }, { passive: true });
  actualizar();
}
