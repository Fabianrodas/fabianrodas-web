# Portafolio Profesional - Fabian Rodas

Portafolio web profesional construido con Angular 21, diseñado con un esquema de colores oscuro y minimalista. La aplicación consume datos desde archivos JSON y está optimizada para todas las resoluciones de pantalla.

## Características Principales

- **Diseño Oscuro Profesional**: Interfaz minimalista con paleta de colores sobria
- **Arquitectura por Componentes**: Estructura modular y escalable
- **Gestión de Datos JSON**: Contenido centralizado y fácilmente editable
- **Totalmente Responsivo**: Adaptado para móviles, tablets y desktop (320px a 4K)
- **Sistema de Rutas**: Navegación fluida con Angular Router
- **Rendimiento Optimizado**: Lazy loading y carga eficiente de recursos

## Estructura del Proyecto

```
src/app/
├── components/
│   ├── components/         # Componentes reutilizables
│   │   ├── hero/          # Sección principal con presentación
│   │   ├── about/         # Información personal y estadísticas
│   │   ├── skills/        # Habilidades técnicas por categorías
│   │   ├── projects/      # Proyectos destacados
│   │   ├── contact/       # Formulario y datos de contacto
│   │   ├── navbar/        # Navegación principal
│   │   └── footer/        # Pie de página
│   └── pages/             # Páginas principales
│       ├── home/          # Vista principal (todas las secciones)
│       ├── about-page/    # Página dedicada a "Sobre Mí"
│       ├── projects-page/ # Página de proyectos
│       └── contact-page/  # Página de contacto
├── models/                # Interfaces TypeScript
├── services/              # Servicios (PortfolioService)
└── app.routes.ts          # Configuración de rutas

public/data/
└── portfolio.json         # Base de datos del portafolio
```

## Stack Tecnológico

- Angular 21 con standalone components
- TypeScript 5.9
- RxJS 7.8 para programación reactiva
- CSS3 con diseño responsive
- Vitest para testing

## Instalación y Desarrollo

Este proyecto fue generado con Angular CLI 21.0.5.

### Instalación

```bash
npm install
```

### Servidor de Desarrollo

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`. Los cambios se recargan automáticamente.

### Compilación para Producción

```bash
npm run build
# o
ng build
```

Los archivos compilados se guardarán en `dist/fabianrodas-web/browser/`.

## Configuración

### Personalizar Contenido

Todo el contenido está centralizado en `public/data/portfolio.json`. Estructura:

```json
{
  "hero": {
    "name": "Tu Nombre",
    "title": "Tu Cargo/Rol",
    "description": "Breve descripción",
    "ctaButtons": [...]
  },
  "about": {
    "title": "Sobre Mí",
    "paragraphs": [...],
    "stats": [...]
  },
  "skills": {
    "categories": [...]
  },
  "projects": {
    "items": [...]
  },
  "contact": {
    "email": "tu@email.com",
    "phone": "...",
    "social": [...]
  },
  "footer": {...}
}
```

### Configurar API URL para Producción

Edita `src/app/services/portfolio.service.ts`:

```typescript
// Desarrollo local
private apiUrl = '/data/portfolio.json';

// Producción con GitHub Raw
private apiUrl = 'https://raw.githubusercontent.com/USUARIO/REPO/main/public/data/portfolio.json';
```

### Personalizar Colores

Paleta actual (tema oscuro):
- Fondos: `#0f1419`, `#18181b`, `#27272a`
- Texto: `#e4e4e7`, `#f4f4f5`, `#a1a1aa`
- Acento: `#3b82f6` (azul)
- Bordes: `#3f3f46`, `#52525b`

Para cambiar colores, busca y reemplaza en los archivos `.css` de cada componente.

## Despliegue

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages

```bash
npm run build -- --base-href "https://USUARIO.github.io/REPO/"
npx angular-cli-ghpages --dir=dist/fabianrodas-web/browser
```

## Testing

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
