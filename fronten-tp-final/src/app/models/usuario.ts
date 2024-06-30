import { Rol } from './rol';

export class Usuario {
  id: string;
  nombreUsuario: string;
  password?: string;
  rol: Rol;

  constructor(nombreUsuario: string, password: string, id: string, rol: Rol) {
    this.nombreUsuario = nombreUsuario;
    this.password = password;
    this.id = id;
    this.rol = rol;
  }

}
