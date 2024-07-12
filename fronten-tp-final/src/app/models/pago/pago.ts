export class Pago {
    //ATRIBUTOS
    fechaPago:Date; //fecha en que se cobra la cuota del mes de alquiler.
    total:number;
    descripcion:string;
    pagado:boolean;

    //CONSTRUCTOR
    constructor(){
        this.fechaPago = new Date
        this.total=0;
        this.descripcion = "";
        this.pagado = false;

    }

}
