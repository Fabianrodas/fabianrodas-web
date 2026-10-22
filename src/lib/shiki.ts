import type { ShikiTransformer, ThemeRegistration } from 'shiki';

/** Tema de código con los colores del diseño (Nota.dc.html). */
export const temaFabian: ThemeRegistration = {
  name: 'fabian',
  type: 'dark',
  colors: { 'editor.background': '#111614', 'editor.foreground': '#e3e2da' },
  settings: [
    { settings: { foreground: '#e3e2da', background: '#111614' } },
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#9aa099', fontStyle: 'italic' } },
    {
      scope: ['keyword', 'storage', 'storage.type', 'keyword.control', 'keyword.other'],
      settings: { foreground: '#9aa099' },
    },
    { scope: ['keyword.operator'], settings: { foreground: '#e3e2da' } },
    {
      scope: ['constant.other.caps', 'variable.other.constant', 'constant.language', 'support.constant', 'entity.name.tag'],
      settings: { foreground: '#9fc7b8' },
    },
    { scope: ['string', 'constant.numeric', 'constant.character'], settings: { foreground: '#e2c47e' } },
  ],
};

/**
 * Envuelve cada bloque de código en el marco del diseño: barra con el nombre
 * del archivo (```py title="recuerdos.py") y un botón para copiar.
 */
export function marcoDeCodigo(): ShikiTransformer {
  return {
    name: 'marco-de-codigo',
    root(root) {
      const meta = this.options.meta?.__raw ?? '';
      const titulo = /title="([^"]+)"/.exec(meta)?.[1] ?? this.options.lang;
      const pre = root.children[0];
      if (!pre || pre.type !== 'element') return;
      return {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['codigo'] },
            children: [
              {
                type: 'element',
                tagName: 'div',
                properties: { className: ['codigo__barra'] },
                children: [
                  { type: 'element', tagName: 'span', properties: {}, children: [{ type: 'text', value: titulo }] },
                  {
                    type: 'element',
                    tagName: 'button',
                    properties: { type: 'button', className: ['codigo__copiar'], 'data-copiar-codigo': '' },
                    children: [
                      {
                        type: 'element',
                        tagName: 'svg',
                        properties: {
                          width: '14', height: '14', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
                          'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
                        },
                        children: [
                          { type: 'element', tagName: 'rect', properties: { width: '14', height: '14', x: '8', y: '8', rx: '2' }, children: [] },
                          { type: 'element', tagName: 'path', properties: { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }, children: [] },
                        ],
                      },
                      { type: 'element', tagName: 'span', properties: { 'data-etiqueta': '' }, children: [{ type: 'text', value: 'Copiar' }] },
                    ],
                  },
                ],
              },
              pre,
            ],
          },
        ],
      };
    },
  };
}
