import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _htppClient = inject(HttpClient)


  private apiUrl = 'http://localhost:3000/api/usuario'; // URL del backend
  
  login(nombreUsuario: string, password: string): Observable<any> {
    return this._htppClient.post(`${this.apiUrl}/login`, { nombreUsuario, password });
  }

  constructor() { }
}
