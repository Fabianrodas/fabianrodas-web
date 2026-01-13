import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private sanitizer = inject(DomSanitizer);

  /**
   * Sanitiza HTML para prevenir ataques XSS
   */
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.sanitize(1, html) || '';
  }

  /**
   * Sanitiza URLs para prevenir ataques de JavaScript
   */
  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.sanitize(4, url) || '';
  }

  /**
   * Sanitiza URLs de recursos (iframes, etc)
   */
  sanitizeResourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.sanitize(5, url) || '';
  }

  /**
   * Valida que un email sea válido
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida que un teléfono sea válido
   */
  validatePhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone);
  }

  /**
   * Escapa caracteres HTML especiales
   */
  escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * Verifica si una URL es segura (HTTPS)
   */
  isSecureUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }
}
