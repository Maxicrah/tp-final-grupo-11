import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    
  private readonly _loginService = inject(LoginService)
  private readonly _route = inject(Router)

  loginForm: FormGroup;

  constructor(private _fb: FormBuilder){
    this.loginForm = this._fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { nombreUsuario, password } = this.loginForm.value;
      this._loginService.login(nombreUsuario, password).subscribe(
        response => {
          if (response.status === 1) {
            alert('Login exitoso');
            // Redirigir según el rol del usuario
            if (response.rol.nombreRol === 'propietario') {
              this._route.navigate(['/propietario-dashboard']);
            } else if (response.rol.nombreRol === 'administrador') {
              this._route.navigate(['/admin-dashboard']);
            } else if (response.rol.nombreRol === 'duenio') {
              this._route.navigate(['/duenio-dashboard']);
            }
          } else {
            alert('Usuario o contraseña incorrectos');
          }
        },
        error => {
          alert('Error al iniciar sesión');
          console.error(error);
        }
      );
    }
  }
  hasErrors(controlUser: string, errorType: string){
    return this.loginForm.get(controlUser)?.hasError(errorType) && this.loginForm.get(controlUser)?.touched
  }


}
