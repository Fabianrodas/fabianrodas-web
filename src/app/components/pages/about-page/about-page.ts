import { Component, inject, signal } from '@angular/core';
import { AboutComponent } from '../../components/about/about';
import { PortfolioService } from '../../../services/portfolio.service';
import { About } from '../../../models/portfolio.model';

@Component({
  selector: 'app-about-page',
  imports: [AboutComponent],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css'
})
export class AboutPage {
  private portfolioService = inject(PortfolioService);
  
  aboutData = signal<About | null>(null);
  loading = signal(true);

  constructor() {
    this.portfolioService.getPortfolioData().subscribe({
      next: (data) => {
        this.aboutData.set(data.about);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading about data:', err);
        this.loading.set(false);
      }
    });
  }
}
