import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/i18n/ui';

export type Proyecto = CollectionEntry<'proyectos'>;
export type Nota = CollectionEntry<'notas'>;

/** "es/lumen" → { lang: 'es', slug: 'lumen' } */
function partirId(id: string): { lang: string; slug: string } {
  const [lang, ...resto] = id.split('/');
  return { lang: lang ?? 'es', slug: resto.join('/') };
}

export function slugNota(nota: Nota): string {
  return partirId(nota.id).slug;
}

/**
 * Devuelve las entradas del idioma pedido. Si una entrada no está traducida,
 * se usa la versión en español para que el sitio en inglés nunca quede incompleto.
 */
function porIdioma<T extends { id: string }>(entradas: T[], lang: Lang, slugDe: (e: T) => string): T[] {
  const delIdioma = new Map<string, T>();
  const espanol = new Map<string, T>();
  for (const e of entradas) {
    const { lang: l } = partirId(e.id);
    if (l === lang) delIdioma.set(slugDe(e), e);
    if (l === 'es') espanol.set(slugDe(e), e);
  }
  const resultado = new Map(espanol);
  for (const [slug, e] of delIdioma) resultado.set(slug, e);
  return [...resultado.values()];
}

export function esTraduccion(entrada: { id: string }, lang: Lang): boolean {
  return partirId(entrada.id).lang === lang;
}

export async function obtenerProyectos(lang: Lang): Promise<Proyecto[]> {
  const todos = await getCollection('proyectos');
  return porIdioma(todos, lang, (p) => p.data.slug).sort((a, b) => a.data.order - b.data.order);
}

export async function obtenerNotas(lang: Lang): Promise<Nota[]> {
  const todas = await getCollection('notas', (n) => !n.data.draft);
  return porIdioma(todas, lang, slugNota).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Minutos de lectura: el valor del frontmatter o ~200 palabras por minuto. */
export function minutosLectura(nota: Nota): number {
  if (nota.data.readingTime) return nota.data.readingTime;
  const texto = (nota.body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`\-[\]()]/g, ' ');
  const palabras = texto.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

export type Estado = Proyecto['data']['status'];
export type TipoNota = Nota['data']['kind'];

export const claseEstado: Record<Estado, string> = {
  produccion: 'chip--acento',
  desarrollo: 'chip--amarillo',
  archivado: 'chip--apagado',
};

export const claseTipo: Record<TipoNota, string> = {
  avance: 'chip--acento',
  nota: '',
  anuncio: 'chip--amarillo',
};
