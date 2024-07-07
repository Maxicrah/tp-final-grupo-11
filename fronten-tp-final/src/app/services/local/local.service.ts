import { Injectable } from '@angular/core';
import { Local } from '../../models/local/local';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private _http:HttpClient){}

  //GET obtenerTodos
  public obtenerListaDeLocales():Observable<any>{
    return this._http.get('http://localhost:3000/api/local/');
  }

  //POST AGREGAR
  public crearLocal(local:Local):Observable<any>{
    return this._http.post('http://localhost:3000/api/local/',local);
  }

//MODIFICAR PUT
public modificarLocal(id:string,local:Local):Observable<any>{
  return this._http.put('http://localhost:3000/api/local/'+id,local);

}

//LOCALES DISPONIBLES
public obtenerLocalesDisponibles(alquilado:boolean, habilitado:boolean):Observable<any>{
  return this._http.get('http://localhost:3000/api/local/'+alquilado+','+habilitado);
}


  /*listaDeLocales:Array<Local>;

  constructor() {
    this.listaDeLocales = [];
    this.cargarListaLocales();
   }

   cargarListaLocales():void{
     let local1:Local=new Local();
     let local2:Local=new Local();
     let local3:Local=new Local();
     local1._id="1";
     local1.costoMensual=200;
     local1.estadoAlquilado=false;
     local1.habilitado=true;
     local1.imagen="xxxx";
     local1.nombreNumerico=1;
     local1.superficie=100;

     local2._id="2";
     local2.costoMensual=200;
     local2.estadoAlquilado=false;
     local2.habilitado=true;
     local2.imagen="xxxx";
     local2.nombreNumerico=2;
     local2.superficie=200;

     local3._id="3";
     local3.costoMensual=300;
     local3.estadoAlquilado=false;
     local3.habilitado=true;
     local3.imagen="xxxx";
     local3.nombreNumerico=3;
     local3.superficie=300;

    this.listaDeLocales.push(local1);
    this.listaDeLocales.push(local2);
    this.listaDeLocales.push(local3);
   }

   obtenerListaDeLocales():Array<Local>{

    return this.listaDeLocales;
   } */


}
