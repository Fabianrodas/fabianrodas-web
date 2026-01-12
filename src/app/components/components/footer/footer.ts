import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../services/portfolio.service';
import { Footer as FooterData } from '../../../models/portfolio.model';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private portfolioService = inject(PortfolioService);
  
  footerData = signal<FooterData | null>(null);

  constructor() {
    this.portfolioService.getPortfolioData().subscribe({
      next: (data) => {
        this.footerData.set(data.footer);
      },
      error: (err) => {
        console.error('Error loading footer data:', err);
      }
    });
  }
}
