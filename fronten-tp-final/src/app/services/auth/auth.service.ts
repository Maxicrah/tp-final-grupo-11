import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/usuario';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.saveToken(response.token, response.rol, response._id);
        this.redirectUser(response.rol);
      })
    );
  }

  register(credentials: any) {
    return this.http.post(`${this.apiUrl}/registro`, credentials);
  }

  saveToken(token: string, rol: string, _id: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
    localStorage.setItem('userId', _id);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRol() {
    return localStorage.getItem('rol');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isOwner(): boolean {
    return this.getRol() === 'dueño';
  }
  isPropertyOwner(): boolean {
    return this.getRol() === 'propietario'
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);

  }

  private redirectUser(rol: string) {
    if (rol === 'propietario') {
      this.router.navigate(['/propietario-dashboard']);
    } else if (rol === 'administrador') {
      this.router.navigate(['/dashboard-admin']);
    } else if (rol === 'dueño') {
      this.router.navigate(['/duenio-dashboard']);
    } else {
      this.router.navigate(['/dashboard-normal']);
    }
  }
}


