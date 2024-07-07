export class Local {
    //ATRIBUTOS
    _id!:string;
    nombreNumerico:number;
    superficie:number;
    habilitado:boolean;
    costoMes:number;
    pathImagen:string;
    alquilado:boolean;

    //CONSTRUCTOR
    constructor(){
        this.nombreNumerico=0;
        this.superficie=0;
        this.habilitado=false;
        this.costoMes=0;
        this.pathImagen="";
        this.alquilado=false;
    }
    
}
