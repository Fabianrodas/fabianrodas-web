import { Component, inject, signal } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { SkillsComponent } from '../../components/skills/skills';
import { ProjectsComponent } from '../../components/projects/projects';
import { ContactComponent } from '../../components/contact/contact';
import { PortfolioService } from '../../../services/portfolio.service';
import { PortfolioData } from '../../../models/portfolio.model';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private portfolioService = inject(PortfolioService);
  
  portfolioData = signal<PortfolioData | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadPortfolioData();
  }

  loadPortfolioData() {
    this.portfolioService.getPortfolioData().subscribe({
      next: (data) => {
        this.portfolioData.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los datos del portafolio');
        this.loading.set(false);
        console.error('Error loading portfolio data:', err);
      }
    });
  }
}
