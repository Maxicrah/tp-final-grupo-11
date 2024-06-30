import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-crud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-crud.component.html',
  styleUrl: './usuario-crud.component.css'
})
export class UsuarioCrudComponent implements OnInit{

  // private readonly _router = Inject(Router)
  //  private readonly _usuarioService = Inject(UsuarioService)

  constructor(private _router: Router, private _usuarioService: UsuarioService){


  }
  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  


   usuarios: Usuario[] = [];
   obtenerUsuarios(): void {
    this._usuarioService.getUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
        console.log(this.usuarios)
      }
    );
  }

  nuevoUsuario(): void {
    this._router.navigate(['/usuario-form']);
  }
  
  
  editarUsuario(usuario: Usuario): void {
    this._router.navigate(['/usuario-form', usuario.id]);
  }

  eliminarUsuario(id: string): void {
    this._usuarioService.deleteUsuario(id).subscribe(() => {
      this.obtenerUsuarios();
    });
  }
}

