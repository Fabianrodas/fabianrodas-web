/** Filtros por categoría y buscador de /proyectos/. */
export function iniciarFiltroProyectos() {
  const botones = [...document.querySelectorAll<HTMLButtonElement>('[data-categoria]')];
  const buscador = document.querySelector<HTMLInputElement>('[data-buscador]');
  const items = [...document.querySelectorAll<HTMLElement>('[data-proyecto]')];
  const grupos = [...document.querySelectorAll<HTMLElement>('[data-grupo]')];
  const vacio = document.querySelector<HTMLElement>('[data-vacio]');
  const resultado = document.querySelector<HTMLElement>('[data-resultado]');
  const reiniciar = document.querySelector<HTMLButtonElement>('[data-reiniciar]');
  if (!buscador || items.length === 0) return;
  const textos: { resultado: string[] } = JSON.parse(resultado?.dataset.textos ?? '{"resultado":[]}');

  let categoria = 'todos';
  const normalizar = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

  const aplicar = () => {
    const q = normalizar(buscador.value);
    let visibles = 0;
    for (const item of items) {
      const cats = (item.dataset.categorias ?? '').split(' ');
      const ok = (categoria === 'todos' || cats.includes(categoria)) && (!q || normalizar(item.dataset.busqueda ?? '').includes(q));
      item.hidden = !ok;
      if (ok) visibles++;
    }
    for (const g of grupos) g.hidden = !g.querySelector('[data-proyecto]:not([hidden])');
    if (vacio) vacio.hidden = visibles > 0;
    if (resultado) {
      const [cero, uno, varios] = textos.resultado;
      resultado.textContent = visibles === 0 ? (cero ?? '') : visibles === 1 ? (uno ?? '') : (varios ?? '').replace(/\d+/, String(visibles));
    }
  };

  const elegir = (clave: string) => {
    categoria = clave;
    for (const b of botones) b.setAttribute('aria-pressed', String(b.dataset.categoria === clave));
    aplicar();
  };

  for (const b of botones) b.addEventListener('click', () => elegir(b.dataset.categoria ?? 'todos'));
  buscador.addEventListener('input', aplicar);
  reiniciar?.addEventListener('click', () => {
    buscador.value = '';
    elegir('todos');
  });
}
