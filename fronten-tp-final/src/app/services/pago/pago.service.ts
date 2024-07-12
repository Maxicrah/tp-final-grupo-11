import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler } from '../../models/alquiler/alquiler';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private _http:HttpClient) { 


  }

  //GET obtener todos los pagos aplicados en un Alquiler
  public getObtenerPagosPorAlquiler(_id:string):Observable<any>{
    return this._http.get('http://localhost:3000/api/pago/pago-alquiler/'+_id);
  }


  


}
