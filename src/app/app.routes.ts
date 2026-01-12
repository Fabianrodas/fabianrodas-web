import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { AboutPage } from './components/pages/about-page/about-page';
import { ProjectsPage } from './components/pages/projects-page/projects-page';
import { ContactPage } from './components/pages/contact-page/contact-page';

export const routes: Routes = [
    { path: '', component: Home, title: 'Portafolio | Inicio' },
    { path: 'about', component: AboutPage, title: 'Portafolio | Sobre Mí' },
    { path: 'projects', component: ProjectsPage, title: 'Portafolio | Proyectos' },
    { path: 'contact', component: ContactPage, title: 'Portafolio | Contacto' },
    
    { path: '**', redirectTo: '' }
];
