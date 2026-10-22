import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** El id de cada entrada es su ruta sin extensión ("es/lumen"), aunque tenga `slug` en el frontmatter. */
const idPorRuta = ({ entry }: { entry: string }) => entry.replace(/\.mdx?$/, '');

/** Tipos de mockup disponibles en el componente Shot. */
export const tiposShot = ['lumen', 'lumen-movil', 'lumen-subida', 'cifra', 'taller', 'repaso', 'nodo', 'foto'] as const;

/** Portada: un mockup del componente Shot o una imagen real en /public. */
const portada = z.union([
  z.enum(tiposShot),
  z.object({
    src: z.string(),
    alt: z.string(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
]);

const iconosDecision = ['server', 'upload', 'lock', 'code', 'database', 'layout', 'calendar', 'book-open', 'target'] as const;

const proyectos = defineCollection({
  // Un archivo por proyecto e idioma: src/content/proyectos/es/lumen.md y src/content/proyectos/en/lumen.md
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos', generateId: idPorRuta }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    /** Descripción completa (página de Proyectos y caso de estudio). */
    summary: z.string(),
    /** Descripción para la tarjeta grande del inicio (si falta, se usa summary). */
    homeSummary: z.string().optional(),
    /** Frase corta para las tarjetas pequeñas. */
    tagline: z.string(),
    /** Etiqueta muy corta para la tarjeta móvil del inicio ("Sitio para un cliente"). */
    label: z.string().optional(),
    role: z.string(),
    stack: z.array(z.string()).min(1),
    /** Etiquetas de la tarjeta en /proyectos/ (si falta, se usa stack). */
    tags: z.array(z.string()).optional(),
    /** Dos etiquetas para la tarjeta pequeña del inicio (si falta, las dos primeras de stack). */
    homeTags: z.array(z.string()).optional(),
    /** Año o rango mostrado ("2025–2026"). */
    year: z.string(),
    /** Periodo largo para la ficha del caso ("Septiembre 2025 a hoy"). */
    period: z.string().optional(),
    /** Tipo de proyecto para la ficha ("Proyecto personal"). */
    kind: z.string().optional(),
    status: z.enum(['produccion', 'desarrollo', 'archivado']),
    version: z.string().optional(),
    platform: z.string().optional(),
    /** Texto corto de plataforma para la tarjeta destacada ("Web y móvil"). */
    platformShort: z.string().optional(),
    links: z
      .object({
        live: z.url().optional(),
        repo: z.url().optional(),
        /** true si el código es privado (muestra "Código privado"). */
        privateRepo: z.boolean().optional(),
      })
      .default({}),
    cover: portada,
    featured: z.boolean().default(false),
    order: z.number().int().min(1).max(99),
    category: z.array(z.enum(['web', 'escritorio', 'cliente', 'universidad'])).min(1),
    /** Contenido estructurado del caso de estudio (solo proyectos destacados). */
    case: z
      .object({
        gallery: z
          .object({
            main: z.object({ cover: portada, caption: z.string() }),
            mobile: z.object({ cover: portada, caption: z.string() }).optional(),
            secondary: z.object({ cover: portada, caption: z.string() }).optional(),
          })
          .optional(),
        problem: z.array(z.string()).default([]),
        solution: z.array(z.string()).default([]),
        features: z.array(z.string()).default([]),
        decisions: z
          .array(z.object({ icon: z.enum(iconosDecision).default('code'), title: z.string(), text: z.string() }))
          .default([]),
        architecture: z
          .object({
            intro: z.string().optional(),
            nodes: z.array(z.object({ title: z.string(), text: z.string(), highlight: z.boolean().default(false) })),
            caption: z.string().optional(),
          })
          .optional(),
        learned: z.array(z.string()).default([]),
      })
      .optional(),
  }),
});

const notas = defineCollection({
  // Un archivo por nota e idioma: src/content/notas/es/mi-nota.mdx
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notas', generateId: idPorRuta }),
  schema: z.object({
    title: z.string(),
    /** Título corto para la ruta de navegación y la bitácora del proyecto. */
    shortTitle: z.string().optional(),
    logTitle: z.string().optional(),
    date: z.coerce.date(),
    summary: z.string(),
    /** Entradilla bajo el título de la nota (si falta, se usa summary). */
    lead: z.string().optional(),
    kind: z.enum(['avance', 'nota', 'anuncio']),
    /** slug del proyecto relacionado. */
    project: z.string().optional(),
    /** Versión del proyecto que anuncia esta nota (aparece en la bitácora). */
    version: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: portada.optional(),
    /** Minutos de lectura. Si falta, se calcula a partir del texto. */
    readingTime: z.number().int().positive().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { proyectos, notas };
