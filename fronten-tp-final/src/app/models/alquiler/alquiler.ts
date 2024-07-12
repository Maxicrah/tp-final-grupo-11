import { Local } from "../local/local";
import { Pago } from "../pago/pago";
import { Propietario } from "../propietario/propietario";

export interface Alquiler {
    _id:string
    propietario:Propietario;
    local:Local;
    pagoAlquiler:Array<Pago>;
    plazoMes:number;
    fechaAlquiler:Date;
    costoAlquiler:number;
}
