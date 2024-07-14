import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private readonly _httpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/mp-pago'; // URL del backend

  constructor() { }

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token || ''}`
    });
    return { headers };
  }

  crearPago(paymentData: any): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrl}/`, paymentData, this.getHttpOptions());
  }

  redirigirAPago(urlPago: string) {
    console.log('Redirigiendo a URL de pago:', urlPago); // Verifica la URL aquí
    window.location.href = urlPago; // Redirige al usuario al link de pago
  }

  obtenerEstadisticasPagos(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/estadisticas/pagos`, this.getHttpOptions());
  }

  obtenerPagosPorMes(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/estadisticas/pagos/mes`, this.getHttpOptions());
  }

  obtenerPagosPorLocal(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/estadisticas/pagos/local`, this.getHttpOptions());
  }

  obtenerTotalPagos(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/estadisticas/pagos/total`, this.getHttpOptions());
  }
}