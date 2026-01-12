import { Component, inject, signal } from '@angular/core';
import { ContactComponent } from '../../components/contact/contact';
import { PortfolioService } from '../../../services/portfolio.service';
import { Contact } from '../../../models/portfolio.model';

@Component({
  selector: 'app-contact-page',
  imports: [ContactComponent],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css'
})
export class ContactPage {
  private portfolioService = inject(PortfolioService);
  
  contactData = signal<Contact | null>(null);
  loading = signal(true);

  constructor() {
    this.portfolioService.getPortfolioData().subscribe({
      next: (data) => {
        this.contactData.set(data.contact);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading contact data:', err);
        this.loading.set(false);
      }
    });
  }
}
