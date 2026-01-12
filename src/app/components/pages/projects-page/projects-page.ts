import { Component, inject, signal } from '@angular/core';
import { ProjectsComponent } from '../../components/projects/projects';
import { PortfolioService } from '../../../services/portfolio.service';
import { Projects } from '../../../models/portfolio.model';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectsComponent],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css'
})
export class ProjectsPage {
  private portfolioService = inject(PortfolioService);
  
  projectsData = signal<Projects | null>(null);
  loading = signal(true);

  constructor() {
    this.portfolioService.getPortfolioData().subscribe({
      next: (data) => {
        this.projectsData.set(data.projects);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading projects data:', err);
        this.loading.set(false);
      }
    });
  }
}
