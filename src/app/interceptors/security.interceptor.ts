import { Injectable } from '@angular/core';
import { 
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest,
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar headers de seguridad a todas las peticiones
    const secureReq = req.clone({
      setHeaders: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Content-Type-Options': 'nosniff'
      },
      withCredentials: false // No enviar cookies en peticiones cross-origin
    });

    return next.handle(secureReq).pipe(
      retry(2), // Reintentar 2 veces en caso de error
      catchError((error: HttpErrorResponse) => {
        // Log de errores (en producción enviar a servicio de monitoreo)
        console.error('Error en petición HTTP:', {
          status: error.status,
          message: error.message,
          url: error.url
        });
        
        return throwError(() => error);
      })
    );
  }
}
