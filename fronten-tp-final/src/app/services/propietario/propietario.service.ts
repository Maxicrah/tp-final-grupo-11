import { Injectable } from '@angular/core';
import { Propietario } from '../../models/propietario/propietario';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  listaDePropietarios:Array<Propietario>;

  constructor() {
    this.listaDePropietarios = [];
    this.cargarListaDePropietarios();
   }

   cargarListaDePropietarios():void{
     let propi1:Propietario=new Propietario();
     let propi2:Propietario=new Propietario();
     let propi3:Propietario=new Propietario();
     propi1._id = "66810786d34b92b113be00a0";
     propi1.apellido="perez";
     propi1.nombre="juan";
     propi1.telefono="12345678";

     propi2._id = "66810786d34b92b113be00a0";
     propi2.apellido="Ramirez";
     propi2.nombre="Pedro";
     propi2.telefono="2222333";

     propi3._id = "66810786d34b92b113be00a0";
     propi3.apellido="Cachi";
     propi3.nombre="Yani";
     propi3.telefono="000999888";

    this.listaDePropietarios.push(propi1);
    this.listaDePropietarios.push(propi2);
    this.listaDePropietarios.push(propi3);
   }

   obtenerListaDePropietarios():Array<Propietario>{
    return this.listaDePropietarios;
   }
}
