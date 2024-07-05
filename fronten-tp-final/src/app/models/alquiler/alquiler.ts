import { Local } from "../local/local";
import { Pago } from "../pago/pago";
import { Propietario } from "../propietario/propietario";

export class Alquiler {
    //ATRIBUTOS
    _id!:string;
    propietario:Propietario;
    local:Local;
    pagoAlquiler:Array <Pago>;
    plazoMes:number;
    fechaAlquiler:Date;
    costoAlquiler:number;
    
    

    //CONSTRUCTOR
    constructor(){
        this.propietario=new Propietario();
        this.local=new Local();
        this.pagoAlquiler=new Array<Pago>();
        this.plazoMes=0;
        this.fechaAlquiler=new Date();
        this.costoAlquiler=0;
    }


}
