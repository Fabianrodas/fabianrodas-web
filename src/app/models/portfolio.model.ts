// Sección Hero
export interface Hero {
  greeting: string;
  name: string;
  title: string;
  description: string;
  ctaButtons: CtaButton[];
}

export interface CtaButton {
  text: string;
  link: string;
  primary: boolean;
}

// Sección Sobre Mí
export interface About {
  title: string;
  paragraphs: string[];
  stats: Stat[];
}

export interface Stat {
  value: string;
  label: string;
}

// Habilidades técnicas
export interface Skills {
  title: string;
  subtitle: string;
  categories: SkillCategory[];
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number;
}

// Proyectos
export interface Projects {
  title: string;
  subtitle: string;
  items: Project[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  demo?: string;
  featured: boolean;
}

// Contacto
export interface Contact {
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  social: SocialLink[];
  form: ContactForm;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactForm {
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitButton: string;
}

// Pie de página
export interface Footer {
  copyright: string;
  links: FooterLink[];
}

export interface FooterLink {
  text: string;
  url: string;
}

// Estructura completa
export interface PortfolioData {
  hero: Hero;
  about: About;
  skills: Skills;
  projects: Projects;
  contact: Contact;
  footer: Footer;
}
