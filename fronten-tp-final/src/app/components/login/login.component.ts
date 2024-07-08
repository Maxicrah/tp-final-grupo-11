import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = {
    nombreUsuario: '',
    password: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        this.authService.saveToken(response.token, response.rol);
        this.router.navigate(['/duenio-dashboard']);
      },
      error => {
        alert('Usuario o contraseña incorrectos');
        this.errorMessage = 'Credenciales no válidas';
      }
    );
  }
    
  // private readonly _loginService = inject(LoginService)
  // private readonly _route = inject(Router)

  // loginForm: FormGroup;

  // constructor(private _fb: FormBuilder){
  //   this.loginForm = this._fb.group({
  //     nombreUsuario: ['', [Validators.required, Validators.minLength(4)]],
  //     password: ['', Validators.required],
  //   });
  // }

  // login(): void {
  //   if (this.loginForm.valid) {
  //     const { nombreUsuario, password } = this.loginForm.value;
  //     this._loginService.login(nombreUsuario, password).subscribe(
  //       response => {
  //         if (response.status === 1) {
  //           alert('Login exitoso');
  //           // Redirigir según el rol del usuario
  //           if (response.rol.nombreRol === 'propietario') {
  //             this._route.navigate(['/propietario-dashboard']);
  //           } else if (response.rol.nombreRol === 'administrador') {
  //             this._route.navigate(['/admin-dashboard']);
  //           } else if (response.rol.nombreRol === 'encargado') {
  //             this._route.navigate(['/duenio-dashboard']);
  //           }
  //         } else {
  //           alert('Usuario o contraseña incorrectos');
  //         }
  //       },
  //       error => {
  //         alert('Error al iniciar sesión');
  //         console.error(error);
  //       }
  //     );
  //   }
  // }
  // hasErrors(controlUser: string, errorType: string){
  //   return this.loginForm.get(controlUser)?.hasError(errorType) && this.loginForm.get(controlUser)?.touched
  // }


}
