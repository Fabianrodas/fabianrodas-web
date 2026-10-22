/**
 * Filtros de /notas/: tipo, proyecto, etiqueta y búsqueda, con paginación de 7
 * por página. El estado vive en la URL (?tipo=avance&proyecto=lumen&etiqueta=rust&q=…&pagina=2).
 */
type Estado = { tipo: string; proyecto: string; etiqueta: string; q: string; pagina: number };

export function iniciarFiltroNotas() {
  const raiz = document.querySelector<HTMLElement>('[data-notas]');
  if (!raiz) return;
  const textos = JSON.parse(raiz.dataset.textos ?? '{}') as { una: string; varias: string; pagina: string; porPagina: number };
  const porPagina = textos.porPagina || 7;

  const destacadas = [...raiz.querySelectorAll<HTMLElement>('[data-nota-destacada]')];
  const tarjetas = [...raiz.querySelectorAll<HTMLElement>('[data-nota]')];
  const botonesTipo = [...raiz.querySelectorAll<HTMLButtonElement>('[data-filtro-tipo]')];
  const botonesProyecto = [...raiz.querySelectorAll<HTMLButtonElement>('[data-filtro-proyecto]')];
  const enlacesEtiqueta = [...raiz.querySelectorAll<HTMLAnchorElement>('[data-filtro-etiqueta]')];
  const buscador = raiz.querySelector<HTMLInputElement>('[data-buscador]');
  const cuenta = raiz.querySelector<HTMLElement>('[data-cuenta]');
  const vacio = raiz.querySelector<HTMLElement>('[data-vacio]');
  const paginacion = raiz.querySelector<HTMLElement>('[data-paginacion]');
  const textoPagina = raiz.querySelector<HTMLElement>('[data-pagina-texto]');
  const [anterior, siguiente] = [...raiz.querySelectorAll<HTMLAnchorElement>('[data-pag]')];

  const normalizar = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

  const leerUrl = (): Estado => {
    const p = new URLSearchParams(location.search);
    return {
      tipo: p.get('tipo') ?? 'todas',
      proyecto: p.get('proyecto') ?? 'todos',
      etiqueta: p.get('etiqueta') ?? '',
      q: p.get('q') ?? '',
      pagina: Math.max(1, Number(p.get('pagina')) || 1),
    };
  };
  let estado = leerUrl();

  const urlDe = (e: Estado) => {
    const p = new URLSearchParams();
    if (e.tipo !== 'todas') p.set('tipo', e.tipo);
    if (e.proyecto !== 'todos') p.set('proyecto', e.proyecto);
    if (e.etiqueta) p.set('etiqueta', e.etiqueta);
    if (e.q) p.set('q', e.q);
    if (e.pagina > 1) p.set('pagina', String(e.pagina));
    const qs = p.toString();
    return location.pathname + (qs ? `?${qs}` : '');
  };

  const coincide = (el: HTMLElement) => {
    const q = normalizar(estado.q).replace(/\s+/g, '-');
    return (
      (estado.tipo === 'todas' || el.dataset.tipo === estado.tipo) &&
      (estado.proyecto === 'todos' || el.dataset.proyecto === estado.proyecto) &&
      (!estado.etiqueta || (el.dataset.etiquetas ?? '').split(' ').includes(estado.etiqueta)) &&
      (!q || (el.dataset.busqueda ?? '').includes(q))
    );
  };

  const render = () => {
    const indices = tarjetas.filter(coincide).map((t) => t.dataset.indice);
    const total = indices.length;
    const paginas = Math.max(1, Math.ceil(total / porPagina));
    estado.pagina = Math.min(estado.pagina, paginas);
    const desde = (estado.pagina - 1) * porPagina;
    const visibles = indices.slice(desde, desde + porPagina);
    const [primera, ...resto] = visibles;
    for (const d of destacadas) d.hidden = d.dataset.indice !== primera;
    for (const t of tarjetas) t.hidden = !resto.includes(t.dataset.indice);

    if (vacio) vacio.hidden = total > 0;
    if (cuenta) cuenta.textContent = total === 1 ? textos.una : textos.varias.replace('{n}', String(total));
    if (paginacion) paginacion.hidden = paginas < 2;
    if (textoPagina) textoPagina.textContent = textos.pagina.replace('{p}', String(estado.pagina)).replace('{t}', String(paginas));
    const fijarPag = (a: HTMLAnchorElement | undefined, pagina: number, activo: boolean) => {
      if (!a) return;
      a.href = urlDe({ ...estado, pagina });
      if (activo) a.removeAttribute('aria-disabled');
      else a.setAttribute('aria-disabled', 'true');
      a.tabIndex = activo ? 0 : -1;
    };
    fijarPag(anterior, estado.pagina - 1, estado.pagina > 1);
    fijarPag(siguiente, estado.pagina + 1, estado.pagina < paginas);

    for (const b of botonesTipo) b.setAttribute('aria-pressed', String(b.dataset.filtroTipo === estado.tipo));
    for (const b of botonesProyecto) b.setAttribute('aria-pressed', String(b.dataset.filtroProyecto === estado.proyecto));
    for (const a of enlacesEtiqueta) {
      const activo = a.dataset.filtroEtiqueta === estado.etiqueta;
      if (activo) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
      a.href = urlDe({ ...estado, etiqueta: activo ? '' : (a.dataset.filtroEtiqueta ?? ''), pagina: 1 });
    }
    if (buscador && buscador.value !== estado.q) buscador.value = estado.q;
  };

  const cambiar = (parcial: Partial<Estado>, historial: 'push' | 'replace' = 'push') => {
    estado = { ...estado, pagina: 1, ...parcial };
    render();
    history[historial === 'push' ? 'pushState' : 'replaceState'](null, '', urlDe(estado));
  };

  for (const b of botonesTipo) b.addEventListener('click', () => cambiar({ tipo: b.dataset.filtroTipo ?? 'todas' }));
  for (const b of botonesProyecto) b.addEventListener('click', () => cambiar({ proyecto: b.dataset.filtroProyecto ?? 'todos' }));
  for (const a of enlacesEtiqueta)
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const k = a.dataset.filtroEtiqueta ?? '';
      cambiar({ etiqueta: estado.etiqueta === k ? '' : k });
    });
  buscador?.addEventListener('input', () => cambiar({ q: buscador.value }, 'replace'));
  raiz.querySelector('[data-reiniciar]')?.addEventListener('click', () => cambiar({ tipo: 'todas', proyecto: 'todos', etiqueta: '', q: '' }));
  for (const a of [anterior, siguiente]) {
    a?.addEventListener('click', (e) => {
      e.preventDefault();
      if (a.getAttribute('aria-disabled') === 'true') return;
      cambiar({ pagina: estado.pagina + Number(a.dataset.pag) });
      raiz.querySelector('.cuerpo')?.scrollIntoView({ block: 'start' });
    });
  }
  window.addEventListener('popstate', () => {
    estado = leerUrl();
    render();
  });

  render();
}
