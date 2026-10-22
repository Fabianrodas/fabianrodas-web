/**
 * Formulario de contacto. Si hay PUBLIC_FORM_ENDPOINT, envía los datos por POST
 * (Formspree, Getform, un Worker…); si no, abre el cliente de correo con un mailto:.
 */
type Textos = {
  nombre: string; email: string; mensaje: string; resumen: string;
  ok: string; okMailto: string; error: string; enviando: string; asunto: string;
  etiquetas: Record<'nombre' | 'email' | 'motivo' | 'mensaje', string>;
};

export function iniciarFormulario() {
  const form = document.querySelector<HTMLFormElement>('[data-contacto]');
  if (!form) return;
  const textos = JSON.parse(form.dataset.textos ?? '{}') as Textos;
  const estado = form.querySelector<HTMLElement>('[data-estado]');
  const boton = form.querySelector<HTMLButtonElement>('[data-enviar]');
  const textoBoton = form.querySelector<HTMLElement>('[data-texto-enviar]');
  const textoOriginal = textoBoton?.textContent ?? '';
  form.noValidate = true;

  const campos = {
    nombre: form.elements.namedItem('nombre') as HTMLInputElement,
    email: form.elements.namedItem('email') as HTMLInputElement,
    mensaje: form.elements.namedItem('mensaje') as HTMLTextAreaElement,
  };

  const mostrar = (mensaje: string, tipo: 'ok' | 'error') => {
    if (!estado) return;
    estado.hidden = false;
    estado.dataset.tipo = tipo;
    estado.textContent = mensaje;
  };

  const validarCampo = (nombre: keyof typeof campos): boolean => {
    const campo = campos[nombre];
    campo.value = nombre === 'mensaje' ? campo.value : campo.value.trim();
    const valido = nombre === 'mensaje' ? campo.value.trim().length >= 10 : campo.checkValidity() && campo.value !== '';
    const error = form.querySelector<HTMLElement>(`[data-error="${nombre}"]`);
    campo.setAttribute('aria-invalid', String(!valido));
    if (error) error.textContent = valido ? '' : textos[nombre];
    return valido;
  };

  for (const nombre of Object.keys(campos) as (keyof typeof campos)[]) {
    campos[nombre].addEventListener('blur', () => {
      if (campos[nombre].value) validarCampo(nombre);
    });
    campos[nombre].addEventListener('input', () => {
      if (campos[nombre].getAttribute('aria-invalid') === 'true') validarCampo(nombre);
    });
  }

  form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const invalidos = (Object.keys(campos) as (keyof typeof campos)[]).filter((n) => !validarCampo(n));
    if (invalidos.length > 0) {
      mostrar(textos.resumen, 'error');
      campos[invalidos[0]!].focus();
      return;
    }
    const datos = new FormData(form);
    if (datos.get('_gotcha')) return;
    datos.delete('_gotcha');
    const endpoint = form.dataset.endpoint;

    if (!endpoint) {
      const e = textos.etiquetas;
      const cuerpo = `${e.nombre}: ${datos.get('nombre')}\n${e.email}: ${datos.get('email')}\n${e.motivo}: ${datos.get('motivo')}\n\n${datos.get('mensaje')}`;
      const url = `mailto:${form.dataset.email}?subject=${encodeURIComponent(`${textos.asunto} · ${datos.get('motivo')}`)}&body=${encodeURIComponent(cuerpo)}`;
      form.dataset.mailto = url;
      window.location.href = url;
      mostrar(textos.okMailto, 'ok');
      return;
    }

    if (boton) boton.disabled = true;
    if (textoBoton) textoBoton.textContent = textos.enviando;
    try {
      const respuesta = await fetch(endpoint, { method: 'POST', body: datos, headers: { Accept: 'application/json' } });
      if (!respuesta.ok) throw new Error(String(respuesta.status));
      form.reset();
      for (const c of Object.values(campos)) c.removeAttribute('aria-invalid');
      mostrar(textos.ok, 'ok');
    } catch {
      mostrar(textos.error, 'error');
    } finally {
      if (boton) boton.disabled = false;
      if (textoBoton) textoBoton.textContent = textoOriginal;
    }
  });
}
