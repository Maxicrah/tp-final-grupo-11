import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Rol } from '../../models/rol';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit{
 

  usuarioForm: FormGroup;
  usuario: Usuario = new Usuario('', '', '', new Rol('', ''));

  private readonly _usuarioService = Inject(UsuarioService);
  private readonly _router = Inject(Router);
  private readonly _route = Inject(ActivatedRoute);

  constructor(
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._usuarioService.getUsuario(id).subscribe((data: Usuario) => {
        this.usuario = data;
        this.usuarioForm.patchValue(this.usuario);
      });
    }
  }
  
  onSubmit(): void {
    if (this.usuarioForm.valid) {
      if (this.usuario.id) {
        this._usuarioService.updateUsuario(this.usuario.id, this.usuarioForm.value).subscribe(() => {
          this._router.navigate(['/usuario-crud']);
        });
      } else {
        this._usuarioService.createUsuario(this.usuarioForm.value).subscribe(() => {
          this._router.navigate(['/usuario-crud']);
        });
      }
    }
  }
}
