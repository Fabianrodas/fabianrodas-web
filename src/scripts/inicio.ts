/** Inicio: vista fija de proyectos y la hora de Guayaquil. */
export function iniciarInicio() {
  iniciarVistaProyectos();
  iniciarReloj();
}

/** Al pasar el mouse o el foco por un nombre, la vista fija muestra su captura. */
function iniciarVistaProyectos() {
  const raiz = document.querySelector<HTMLElement>('[data-trabajo]');
  if (!raiz) return;
  const enlaces = [...raiz.querySelectorAll<HTMLAnchorElement>('[data-vista]')];
  const capturas = [...raiz.querySelectorAll<HTMLElement>('[data-captura]')];
  const mostrar = (slug: string) => {
    for (const c of capturas) c.classList.toggle('activa', c.dataset.captura === slug);
    for (const e of enlaces) e.classList.toggle('activo', e.dataset.vista === slug);
  };
  for (const e of enlaces) {
    const slug = e.dataset.vista ?? '';
    e.addEventListener('pointerenter', () => mostrar(slug));
    e.addEventListener('focus', () => mostrar(slug));
  }
}

/** Hora actual en Guayaquil (America/Guayaquil, UTC−5) y una línea según si es de día o de noche. */
export function textoRespuesta(hora: number, textos: { dia: string; noche: string }): string {
  return hora >= 8 && hora < 22 ? textos.dia : textos.noche;
}

function iniciarReloj() {
  const raiz = document.querySelector<HTMLElement>('[data-reloj]');
  const hora = raiz?.querySelector<HTMLTimeElement>('[data-hora]');
  const respuesta = raiz?.querySelector<HTMLElement>('[data-respuesta]');
  if (!raiz || !hora || !respuesta) return;
  const textos = JSON.parse(raiz.dataset.textos ?? '{}') as { dia: string; noche: string; locale: string };
  const formato = new Intl.DateTimeFormat(textos.locale, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Guayaquil' });
  const soloHora = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: 'America/Guayaquil' });
  const pintar = () => {
    const ahora = new Date();
    hora.textContent = formato.format(ahora);
    hora.dateTime = ahora.toISOString();
    respuesta.textContent = textoRespuesta(Number(soloHora.format(ahora)) % 24, textos);
  };
  pintar();
  window.setInterval(pintar, 30_000);
}
