// Datos de contacto (de ejemplo: reemplázalos por los reales).
export const sitio = {
  nombre: 'Fabián Rodas',
  iniciales: 'FR',
  email: 'hola@fabianrodas.com',
  github: 'https://github.com/Fabianrodas',
  githubTexto: 'github.com/fabianrodas',
  linkedin: 'https://www.linkedin.com/in/fabianrodas/',
  linkedinTexto: 'in/fabianrodas',
  cv: '/cv/fabian-rodas-cv.pdf',
  url: 'https://fabianrodas.com',
} as const;

/**
 * Etiquetas que se muestran en la barra lateral de /notas/, en este orden.
 * Si una lista queda vacía, se muestran las 8 etiquetas más usadas.
 */
export const etiquetasDestacadas = {
  es: ['Rust', 'Flask', 'Despliegue', 'Astro', 'Seguridad', 'Universidad', 'PostgreSQL', 'Carrera'],
  en: ['Rust', 'Flask', 'Deployment', 'Astro', 'Security', 'University', 'PostgreSQL', 'Career'],
} as const;
