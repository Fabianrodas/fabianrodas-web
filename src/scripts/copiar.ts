/**
 * Botones y enlaces de copiar:
 *  - [data-copiar="texto"]: copia ese texto (email, enlace del RSS, enlace de la nota).
 *  - [data-copiar-codigo]: copia el bloque de código vecino.
 * El texto de [data-etiqueta] cambia a data-copiado durante 2 s y se anuncia a lectores de pantalla.
 */
async function escribir(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = texto;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

function anunciar(mensaje: string) {
  const region = document.getElementById('anuncio');
  if (!region) return;
  region.textContent = '';
  window.setTimeout(() => (region.textContent = mensaje), 50);
}

export function iniciarCopiar() {
  const lang = document.documentElement.lang;
  const copiadoPorDefecto = lang === 'en' ? 'Copied' : 'Copiado';

  document.addEventListener('click', async (evento) => {
    const objetivo = (evento.target as HTMLElement).closest<HTMLElement>('[data-copiar], [data-copiar-codigo]');
    if (!objetivo) return;
    evento.preventDefault();

    let texto = objetivo.dataset.copiar ?? '';
    if (objetivo.hasAttribute('data-copiar-codigo')) {
      texto = objetivo.closest('.codigo')?.querySelector('pre')?.innerText ?? '';
    }
    if (!texto) return;

    const ok = await escribir(texto);
    if (!ok) return;

    const etiqueta = objetivo.querySelector<HTMLElement>('[data-etiqueta]') ?? objetivo;
    const original = etiqueta.dataset.original ?? etiqueta.textContent ?? '';
    etiqueta.dataset.original = original;
    const mensaje = objetivo.dataset.copiado ?? copiadoPorDefecto;
    if (etiqueta !== objetivo || objetivo.children.length === 0) etiqueta.textContent = mensaje;
    objetivo.setAttribute('data-estado', 'copiado');
    anunciar(mensaje);
    window.setTimeout(() => {
      etiqueta.textContent = original;
      objetivo.removeAttribute('data-estado');
    }, 2000);
  });
}
