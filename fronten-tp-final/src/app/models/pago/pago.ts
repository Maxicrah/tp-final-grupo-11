export class Pago {
    //ATRIBUTOS
    fechaDePago:Date; //fecha en que se cobra la cuota del mes de alquiler.
    pagoCostoMes:number;
    descripcion:string;
    pagado:boolean;

    //CONSTRUCTOR
    constructor(){
        this.fechaDePago = new Date
        this.pagoCostoMes=0;
        this.descripcion = "";
        this.pagado = false;

    }

}
