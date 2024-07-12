import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private readonly _httpClient!: HttpClient;

  private apiUrl = 'http://localhost:3000/api/mp-pago'; // URL del backend
  
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() { }


  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return { headers };
    } else {
      // Manejar caso donde no hay token disponible (opcional)
      return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    }
  }

  crearPago(paymentData: any): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrl}/`, paymentData, this.getHttpOptions());
  }

  manejarNotificacion(notificationData: any): Observable<any> {
    const url = `${this.apiUrl}/notifications`;
    return this._httpClient.post<any>(url, notificationData, this.getHttpOptions());
  }
}
