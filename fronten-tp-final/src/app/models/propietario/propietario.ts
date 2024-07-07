import { Alquiler } from "../alquiler/alquiler";

export class Propietario {
    //ATRIBUTOS
    _id!: string;
    apellido: string;
    nombre:string;
    telefono:string;
    dni:number;
    email:string;
    domicilio:string;
    //usuario:Usuario;

    //CONSTRUCTOR
    constructor(){
        this.apellido = "";
        this.nombre = "";
        this.telefono = "";
        this.dni = 0;
        //this.alquileres = new Array<Alquiler>();
        this.email="";
        this.domicilio = "";
       // this.usuario = new Usuario();
    }
}
