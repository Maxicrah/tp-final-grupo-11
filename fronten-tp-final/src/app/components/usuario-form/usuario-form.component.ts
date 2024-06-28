import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {

  // usuarioForm: FormGroup;
  // // usuario: Usuario = new Usuario();

  // private readonly _usuarioService = Inject(UsuarioService);
  // private readonly _router = Inject(Router);
  // private readonly _route = Inject(ActivatedRoute);

  // constructor(
  //   private fb: FormBuilder
  // ) {
  //   this.usuarioForm = this.fb.group({
  //     nombre: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     rol: ['', Validators.required]
  //   });
  // }

  // ngOnInit(): void {
  //   const id = this._route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this._usuarioService.getUsuario(id).subscribe(data => {
  //       this.usuario = data;
  //       this.usuarioForm.patchValue(this.usuario);
  //     });
  //   }
  // }

  // onSubmit(): void {
  //   if (this.usuarioForm.valid) {
  //     if (this.usuario.id) {
  //       this._usuarioService.updateUsuario(this.usuario.id, this.usuarioForm.value).subscribe(() => {
  //         this._router.navigate(['/usuario-crud']);
  //       });
  //     } else {
  //       this._usuarioService.createUsuario(this.usuarioForm.value).subscribe(() => {
  //         this._router.navigate(['/usuario-crud']);
  //       });
  //     }
  //   }
  // }
}
