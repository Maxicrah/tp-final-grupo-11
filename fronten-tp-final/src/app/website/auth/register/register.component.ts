import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword) {
      return password.value === confirmPassword.value ? null : { mismatch: true };
    }

    return null;
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response: any) => {
          this.authService.saveToken(response.token, response.rol, response._id);
          localStorage.setItem('nombreUsuario', this.registerForm.value.nombreUsuario);
          this.router.navigate(['/login']);
        },
        error => {
          this.errorMessage = error.error.message || 'Error al registrar el usuario';
        }
      );
    }
  }

  hasErrors(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return (control && control.touched && control.hasError(errorName)) ?? false;
  }
}
