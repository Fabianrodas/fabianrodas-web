import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { PortfolioData } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  
  // Desarrollo: /data/portfolio.json | Producción: GitHub raw URL
  private apiUrl = '/data/portfolio.json';
  //private apiUrl = 'https://raw.githubusercontent.com/Fabianrodas/fabianrodas-web/refs/heads/main/public/data/portfolio.json?token=GHSAT0AAAAAADSG3RTUG25ZE5HRIFSX53IQ2LFP7RQ';
  
  private portfolioData$?: Observable<PortfolioData>;

  // Obtiene datos con caché
  getPortfolioData(): Observable<PortfolioData> {
    if (!this.portfolioData$) {
      this.portfolioData$ = this.http.get<PortfolioData>(this.apiUrl).pipe(
        shareReplay(1)
      );
    }
    return this.portfolioData$;
  }

  // Refresca los datos
  refreshData(): Observable<PortfolioData> {
    this.portfolioData$ = undefined;
    return this.getPortfolioData();
  }
}
