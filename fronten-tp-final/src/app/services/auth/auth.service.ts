// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/api/usuario';

//   constructor(private http: HttpClient, private router: Router) {}

//   login(credentials: any) {
//     return this.http.post(`${this.apiUrl}/login`, credentials);
//   }

//   saveToken(token: string, rol: string) {
//     localStorage.setItem('token', token);
//     localStorage.setItem('rol', rol);
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }

//   getRol() {
//     return localStorage.getItem('rol');
//   }

//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('rol');
//     this.router.navigate(['/login']);
//   }
// }
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
        this.saveToken(response.token, response.rol);
        if (response.rol === 'propietario') {
          this.router.navigate(['/dashboard-propietario']);
        } else if (response.rol === 'administrador') {
          this.router.navigate(['/dashboard-admin']);
        } else if (response.rol === 'dueño') {
          this.router.navigate(['/dashboard-duenio']);
        } else {
          this.router.navigate(['/dashboard-normal']);
        }
      })
    );
  }

  register(credentials: any) {
    return this.http.post(`${this.apiUrl}/registro`, credentials);
  }

  saveToken(token: string, rol: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRol() {
    return localStorage.getItem('rol');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isOwner(): boolean {
    return this.getRol() === 'dueño';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }
}
