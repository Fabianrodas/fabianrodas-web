/*
 * Renderizador mínimo de los artboards .dc.html (docs/diseno/artboards) para
 * generar capturas de referencia. Implementa lo que usan los archivos:
 * <x-dc>, <helmet>, {{expresiones}}, <sc-for>, <sc-if>, <dc-import> y DCLogic.
 * Solo es una herramienta de verificación: no forma parte del sitio.
 */
(function () {
  const fuentesLocales = `
    @font-face { font-family: 'Bricolage Grotesque'; font-weight: 200 800; src: url(/node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2) format('woff2-variations'); }
    @font-face { font-family: 'Geist'; font-weight: 100 900; src: url(/node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2) format('woff2-variations'); }
    @font-face { font-family: 'Geist Mono'; font-weight: 100 900; src: url(/node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2) format('woff2-variations'); }
  `;

  class DCLogic {
    constructor(props) {
      this.props = props;
      this.state = {};
    }
    setState(parcial) {
      Object.assign(this.state, parcial);
      if (this.__render) this.__render();
    }
  }
  window.DCLogic = DCLogic;

  function cargar(nombre) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', nombre + '.dc.html', false);
    xhr.send();
    return new DOMParser().parseFromString(xhr.responseText, 'text/html');
  }

  function definicion(doc) {
    const script = doc.querySelector('script[type="text/x-dc"]');
    const meta = JSON.parse(script.getAttribute('data-props') || '{}');
    const Clase = new Function('DCLogic', script.textContent + '\nreturn Component;')(DCLogic);
    const defaults = {};
    for (const [k, v] of Object.entries(meta)) if (!k.startsWith('$') && v && 'default' in v) defaults[k] = v.default;
    const xdc = doc.querySelector('x-dc');
    const helmet = xdc.querySelector('helmet');
    const plantilla = [...xdc.childNodes].filter((n) => n !== helmet);
    return { Clase, defaults, plantilla, helmet, meta };
  }

  function evaluar(expr, scope) {
    try {
      return new Function(...Object.keys(scope), `return (${expr});`)(...Object.values(scope));
    } catch (e) {
      return undefined;
    }
  }

  const soloExpr = /^\{\{([^}]+)\}\}$/;
  function interpolar(texto, scope) {
    return texto.replace(/\{\{([^}]+)\}\}/g, (_, e) => {
      const v = evaluar(e.trim(), scope);
      return v == null ? '' : String(v);
    });
  }

  function renderNodos(nodos, scope, destino) {
    for (const n of nodos) renderNodo(n, scope, destino);
  }

  function renderNodo(nodo, scope, destino) {
    if (nodo.nodeType === Node.TEXT_NODE) {
      destino.appendChild(document.createTextNode(interpolar(nodo.textContent, scope)));
      return;
    }
    if (nodo.nodeType !== Node.ELEMENT_NODE) return;
    const tag = nodo.tagName.toLowerCase();

    if (tag === 'sc-for') {
      const lista = evaluar(nodo.getAttribute('list').match(soloExpr)[1].trim(), scope) || [];
      const como = nodo.getAttribute('as');
      for (const item of lista) renderNodos(nodo.childNodes, { ...scope, [como]: item }, destino);
      return;
    }
    if (tag === 'sc-if') {
      const v = evaluar(nodo.getAttribute('value').match(soloExpr)[1].trim(), scope);
      if (v) renderNodos(nodo.childNodes, scope, destino);
      return;
    }
    if (tag === 'dc-import') {
      const props = {};
      for (const a of nodo.attributes) {
        if (a.name === 'name' || a.name.startsWith('hint-')) continue;
        const m = a.value.match(soloExpr);
        props[a.name] = m ? evaluar(m[1].trim(), scope) : interpolar(a.value, scope);
      }
      renderComponente(nodo.getAttribute('name'), props, destino);
      return;
    }

    const el = document.createElementNS(nodo.namespaceURI, nodo.localName);
    for (const a of nodo.attributes) {
      const m = a.value.match(soloExpr);
      if (m) {
        const v = evaluar(m[1].trim(), scope);
        if (typeof v === 'function') {
          el.addEventListener(a.name.replace(/^on/i, '').toLowerCase(), v);
          continue;
        }
        if (v === true) {
          el.setAttribute(a.name, '');
          continue;
        }
        if (v === false || v == null) continue;
        el.setAttribute(a.name, String(v));
      } else {
        el.setAttribute(a.name, interpolar(a.value, scope));
      }
    }
    renderNodos(nodo.childNodes, scope, el);
    destino.appendChild(el);
  }

  const cache = {};
  function renderComponente(nombre, props, destino) {
    const def = cache[nombre] || (cache[nombre] = definicion(cargar(nombre)));
    const inst = new def.Clase({ ...def.defaults, ...props });
    const vals = inst.renderVals();
    renderNodos(def.plantilla, vals, destino);
  }

  function iniciar() {
    const def = definicion(document);
    const style = document.createElement('style');
    style.textContent = fuentesLocales;
    document.head.appendChild(style);
    if (def.helmet) {
      for (const n of def.helmet.children) if (n.tagName !== 'LINK') document.head.appendChild(n.cloneNode(true));
    }
    const raiz = document.createElement('div');
    raiz.id = 'dc-raiz';
    document.querySelector('x-dc').replaceWith(raiz);
    const inst = new def.Clase({ ...def.defaults });
    const render = () => {
      raiz.innerHTML = '';
      renderNodos(def.plantilla, inst.renderVals(), raiz);
    };
    inst.__render = render;
    render();
    document.documentElement.dataset.listo = '1';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
