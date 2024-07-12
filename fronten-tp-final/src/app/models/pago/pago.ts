import { Alquiler } from "../alquiler/alquiler";
import { Usuario } from "../usuario";

export interface Pago {
    _id: string,
    usuario: Usuario,
    montoDePago: number,
    tipo: string,
    status: string,
    fechaPago: Date,
    descripcion: string,
    metodoPago: string,
    preferenceId: string,
    alquiler: Alquiler
}
