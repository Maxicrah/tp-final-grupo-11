import { Component,NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Local } from '../../../models/local/local';
import { Pago } from '../../../models/pago/pago';
import { Propietario } from '../../../models/propietario/propietario';
import { Alquiler } from '../../../models/alquiler/alquiler';

import { PropietarioService } from '../../../services/propietario/propietario.service';
import { LocalService } from '../../../services/local/local.service';
import { AlquilerService } from '../../../services/alquiler/alquiler.service';

@Component({
  selector: 'app-form-alquiler',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './form-alquiler.component.html',
  styleUrl: './form-alquiler.component.css'
})
export class FormAlquilerComponent {

  //ATRIBUTO
  obAlquiler:Alquiler;
  listaDeLocalesDisponibles:Array<Local>;

  //auxListaDeLocales:Array<Local>;
  auxListaDePropietario:Array<Propietario>;
  auxPropietario:Propietario;
  auxLocal:Local;
  auxPagos:Array <Pago>;
  alquilado:boolean;
  habilitado:boolean;
  aux_idDeLocal:string;
  //CONTRUCTOR
  constructor(private propietarioService:PropietarioService, 
    private localService:LocalService, private alquilerService:AlquilerService){
    this.obAlquiler=new Alquiler();
    this.auxPropietario=new Propietario();
    this.auxLocal=new Local();
    this.auxPagos=new Array<Pago>();
   // this.auxListaDeLocales=localService.obtenerListaDeLocales();
    this.auxListaDePropietario=propietarioService.obtenerListaDePropietarios();
    this.listaDeLocalesDisponibles=new Array<Local>();
    this.alquilado=true;
    this.habilitado=true;
    this.cargarLocalesDisponibles();
    this.aux_idDeLocal="";
  }
  
  cargarLocalesDisponibles():void{
    this.localService.obtenerLocalesDisponibles(this.alquilado, this.habilitado).subscribe(
      (ultado:any)=>{
        this.listaDeLocalesDisponibles=ultado;
        console.log("MI LISTA DE LOCALES");
        console.log(this.listaDeLocalesDisponibles);
      }
    )
  }
  mostrarDatos():void{
    console.log(this.aux_idDeLocal);
    console.log(this.obAlquiler.local._id);
    console.log("Datos del alquiler");
    console.log(this.obAlquiler);
    console.log("Datos del propietario");
    console.log(this.auxPropietario);
  }

  cambiarSelect(e:any):void{
    this.obAlquiler.local._id=e.target.value;
    console.log("METODO CAMBIAR SELECT");
    console.log(e.target.value);
  }

  cambiarSelectPpropietario(e:any):void{
    this.obAlquiler.propietario._id=e.target.value;
    console.log("METODO CAMBIAR SELECT PROPIETARIO");
    console.log(e.target.value); //VER Resultados
  }

  registrarAlquiler():void{
    console.log(this.obAlquiler);
    this.alquilerService.crearAlquiler(this.obAlquiler).subscribe(
      (ultado:any)=>{
        console.log('RESULTADO DE CREAR: ');
        console.log(ultado);
        
      }
    )
  }

  
}
