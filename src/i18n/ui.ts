export const idiomas = ['es', 'en'] as const;
export type Lang = (typeof idiomas)[number];
export const idiomaPorDefecto: Lang = 'es';

export function esLang(valor: string | undefined): valor is Lang {
  return valor === 'es' || valor === 'en';
}

/** Ruta interna con el prefijo del idioma: ruta('en', '/proyectos/') → '/en/proyectos/'. */
export function ruta(lang: Lang, path = '/'): string {
  const limpio = path.startsWith('/') ? path : `/${path}`;
  return lang === 'es' ? limpio : `/en${limpio}`;
}

/** Quita el prefijo de idioma de una ruta: '/en/proyectos/' → '/proyectos/'. */
export function rutaSinIdioma(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') return '/';
  return pathname.startsWith('/en/') ? pathname.slice(3) : pathname;
}

export function otroIdioma(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

const locales: Record<Lang, string> = { es: 'es-EC', en: 'en-US' };
export const localeDe = (lang: Lang) => locales[lang];

const mesesCortos: Record<Lang, string[]> = {
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};
const mesesLargos: Record<Lang, string[]> = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

/** "14 oct 2026" / "Oct 14, 2026" (en UTC para que no cambie con la zona horaria). */
export function fechaCorta(fecha: Date, lang: Lang): string {
  const d = fecha.getUTCDate();
  const m = mesesCortos[lang][fecha.getUTCMonth()];
  const a = fecha.getUTCFullYear();
  return lang === 'es' ? `${d} ${m} ${a}` : `${m} ${d}, ${a}`;
}

/** "14 de octubre de 2026" / "October 14, 2026". */
export function fechaLarga(fecha: Date, lang: Lang): string {
  const d = fecha.getUTCDate();
  const m = mesesLargos[lang][fecha.getUTCMonth()];
  const a = fecha.getUTCFullYear();
  return lang === 'es' ? `${d} de ${m} de ${a}` : `${m} ${d}, ${a}`;
}

export const ui = {
  es: {
    'meta.titulo': 'Fabián Rodas',
    'meta.descripcion': 'Portafolio de Fabián Rodas, estudiante de Ingeniería en Ciencias de la Computación en Guayaquil.',
    'saltar': 'Saltar al contenido',
    'nav.principal': 'Principal',
    'nav.idioma': 'Idioma',
    'nav.inicio': 'Inicio',
    'nav.proyectos': 'Proyectos',
    'nav.sobre': 'Sobre mí',
    'nav.contacto': 'Contacto',
    'nav.cv': 'CV',
    'nav.abrir': 'Abrir menú',
    'nav.cerrar': 'Cerrar menú',
    'nav.menu': 'Menú',
    'pie.rol': 'Desarrollador de software en formación',
    'pie.bio': 'Estudiante de Ingeniería en Ciencias de la Computación en Guayaquil. Aquí están los proyectos que construí y mantengo.',
    'pie.sitio': 'Sitio',
    'pie.proyectos': 'Proyectos',
    'pie.proyectosDestacados': 'Proyectos destacados',
    'pie.mas': 'Más',
    'pie.cv': 'Descargar CV',
    'pie.otroIdioma': 'English version',
    'pie.copy': '© 2026 Fabián Rodas. Hecho con Astro, publicado en Cloudflare.',
    'pie.copyCorto': '© 2026 Fabián Rodas',
    'pie.arriba': 'Volver arriba',
    'estado.produccion': 'En producción',
    'estado.desarrollo': 'En desarrollo',
    'estado.archivado': 'Archivado',
    'copiar': 'Copiar',
    'copiado': 'Copiado',
    'copiarEmail': 'Copiar email',
    'emailCopiado': 'Email copiado',
    'escribeme': 'Escríbeme',
  },
  en: {
    'meta.titulo': 'Fabián Rodas',
    'meta.descripcion': 'Portfolio of Fabián Rodas, a Computer Science Engineering student in Guayaquil, Ecuador.',
    'saltar': 'Skip to content',
    'nav.principal': 'Main',
    'nav.idioma': 'Language',
    'nav.inicio': 'Home',
    'nav.proyectos': 'Projects',
    'nav.sobre': 'About',
    'nav.contacto': 'Contact',
    'nav.cv': 'CV',
    'nav.abrir': 'Open menu',
    'nav.cerrar': 'Close menu',
    'nav.menu': 'Menu',
    'pie.rol': 'Software developer in training',
    'pie.bio': 'Computer Science Engineering student in Guayaquil. Here are the projects I have built and maintain.',
    'pie.sitio': 'Site',
    'pie.proyectos': 'Projects',
    'pie.proyectosDestacados': 'Featured projects',
    'pie.mas': 'More',
    'pie.cv': 'Download CV',
    'pie.otroIdioma': 'Versión en español',
    'pie.copy': '© 2026 Fabián Rodas. Built with Astro, hosted on Cloudflare.',
    'pie.copyCorto': '© 2026 Fabián Rodas',
    'pie.arriba': 'Back to top',
    'estado.produccion': 'In production',
    'estado.desarrollo': 'In development',
    'estado.archivado': 'Archived',
    'copiar': 'Copy',
    'copiado': 'Copied',
    'copiarEmail': 'Copy email',
    'emailCopiado': 'Email copied',
    'escribeme': 'Get in touch',
  },
} as const;

export type Clave = keyof (typeof ui)['es'];

export function useT(lang: Lang) {
  return (clave: Clave): string => ui[lang][clave] ?? ui.es[clave];
}

/** Texto en línea para copys propios de una vista: tx(lang, { es: '…', en: '…' }). */
export function tx<T>(lang: Lang, textos: Record<Lang, T>): T {
  return textos[lang];
}
