import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alquiler } from '../../../models/alquiler/alquiler';
import { Pago } from '../../../models/pago/pago';
import { Propietario } from '../../../models/propietario/propietario';
import { AlquilerService } from '../../../services/alquiler/alquiler.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-list-alquiler-propietario',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './list-alquiler-propietario.component.html',
  styleUrl: './list-alquiler-propietario.component.css'
})
export class ListAlquilerPropietarioComponent {


  //ATRIBUTOS
  auxListaAlquiler01:Array<Alquiler>;
  auxListaAlquiler02:Array<Alquiler>;
  auxListaPagos01:Array<Pago>;
  propietario:Propietario;
  //CONSTRUCTOR

  constructor(private alquilerService:AlquilerService, private router:Router) {
    this.auxListaAlquiler01 = [];
    this.auxListaAlquiler02 = [];
    this.auxListaPagos01 = [];
    this.propietario = new Propietario();
    this.obtenerAlquilerPorPropietario();
  }

  //METODOS sin DB
  obtenerAlquilerPorPropietario():void{                       //AQUI debe ir el ID del propietario que inicio sesion
    this.alquilerService.obtenerListaDeAlquilerPorPropietario(this.propietario._id).subscribe(
      (ultado:any)=>{
        this.auxListaAlquiler01=ultado;
        console.log("LO QUE RECIBO DEL BACK EN CRUDO");
        console.log(ultado);
        console.log("LO QUE RECIBO GUARDADO");
        console.log(this.auxListaAlquiler01);
      },(error:any)=>{
        console.log(error);
      }
    )

  }
  //GET CON DB
  obtenerAlquileresDisponibles():void{
    this.alquilerService.obtenerListaDeAlquiler().subscribe(
      (ultado:any)=>{
        this.auxListaAlquiler02=ultado;
        console.log("MI OBJETO LISTA ALQUILERES");
        console.log(this.auxListaAlquiler02);
      },(error:any)=>{
        console.log(error);
      }
    )
  }
  
  mostrarPagos(id:string):void{
    this.router.navigate(['/listaPagoComponent/',id]);
  }



}
