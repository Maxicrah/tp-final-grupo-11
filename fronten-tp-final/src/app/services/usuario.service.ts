import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly _htppClient = inject(HttpClient)

  private apiUrl = 'http://localhost:3000/api/usuario'; // URL del backend

  constructor() { }


  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token'); // o donde guardes tu token JWT
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }


  public getUsuarios():Observable<Usuario[]>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
    }
    return this._htppClient.get<Usuario[]>(this.apiUrl + "/usuarios", httpOptions);
  } 
  // getUsuarios(): Observable<Usuario[]> {
  //   return this._htppClient.get<Usuario[]>(this.apiUrl, this.getHttpOptions());
  // }

  getUsuario(id: string): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    return this._htppClient.get<Usuario>(url, this.getHttpOptions());
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this._htppClient.post<Usuario>(this.apiUrl, usuario, this.getHttpOptions());
  }

  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    return this._htppClient.put<Usuario>(url, usuario, this.getHttpOptions());
  }

  deleteUsuario(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this._htppClient.delete<void>(url, this.getHttpOptions());
  }

}
