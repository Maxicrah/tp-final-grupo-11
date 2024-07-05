import { Injectable } from '@angular/core';
import { Local } from '../../models/local/local';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler } from '../../models/alquiler/alquiler';
@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  constructor(private _http:HttpClient) { }
  
  //GET obtener todos
  public obtenerListaDeAlquiler():Observable<any>{
    return this._http.get('http://localhost:3000/api/alquiler/');
  }

  //POST AGREGAR
  public crearAlquiler(alquiler:Alquiler):Observable<any>{
    return this._http.post('http://localhost:3000/api/alquiler/',alquiler);
  }


}
