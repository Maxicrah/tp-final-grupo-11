
export class Rol {
  id?: string; // El ID puede ser opcional, ya que al crear un nuevo usuario no lo tendrás
  nombreRol: String;

  constructor(nombreRol: String, id?: string) {
    this.nombreRol = nombreRol;
    if (id) {
      this.id = id;
    }
  }
}
