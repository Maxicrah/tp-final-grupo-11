import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-crud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-crud.component.html',
  styleUrl: './usuario-crud.component.css'
})
export class UsuarioCrudComponent {

  private readonly _router = Inject(Router)

  // usuarios: Usuario[] = [];
  // obtenerUsuarios(): void {
  //   this.usuarioService.getUsuarios().subscribe(data => {
  //     this.usuarios = data;
  //   });
  // }

  nuevoUsuario(): void {
    this._router.navigate(['/usuario-form']);
  }

  // editarUsuario(usuario: Usuario): void {
  //   this._router.navigate(['/usuario-form', usuario.id]);
  // }

  // eliminarUsuario(id: string): void {
  //   this.usuarioService.deleteUsuario(id).subscribe(() => {
  //     this.obtenerUsuarios();
  //   });
  // }
}
//}
