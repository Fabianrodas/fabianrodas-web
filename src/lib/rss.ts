import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { ruta, type Lang } from '@/i18n/ui';
import { obtenerNotas, slugNota } from '@/lib/contenido';
import { sitio } from '@/lib/sitio';

export async function feed(context: APIContext, lang: Lang) {
  const notas = await obtenerNotas(lang);
  return rss({
    title: lang === 'es' ? `${sitio.nombre} · Notas` : `${sitio.nombre} · Notes`,
    description:
      lang === 'es'
        ? 'Avances de mis proyectos, apuntes de lo que voy aprendiendo y anuncios.'
        : "Project updates, notes on what I'm learning and announcements.",
    site: context.site ?? sitio.url,
    items: notas.map((n) => ({
      title: n.data.title,
      description: n.data.summary,
      pubDate: n.data.date,
      link: ruta(lang, `/notas/${slugNota(n)}/`),
      categories: n.data.tags,
    })),
    customData: `<language>${lang === 'es' ? 'es-EC' : 'en-us'}</language>`,
  });
}
