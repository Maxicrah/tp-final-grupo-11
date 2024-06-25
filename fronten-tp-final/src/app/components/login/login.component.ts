import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    
  loginForm: FormGroup;

  constructor(private _fb: FormBuilder){
    this.loginForm = this._fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(){
    console.log(this.loginForm)
  }

}
