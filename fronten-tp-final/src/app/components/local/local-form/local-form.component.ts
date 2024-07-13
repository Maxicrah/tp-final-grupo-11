import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { LocalService } from '../../../services/local/local.service';
import { Local } from '../../../models/local/local';

export function nonNegativeNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = control.value >= 0;
    return isValid ? null : { nonNegative: { value: control.value } };
  };
}

@Component({
  selector: 'app-local-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './local-form.component.html',
  styleUrl: './local-form.component.css'
})
export class LocalFormComponent implements OnInit{

//  private _localService = Inject(LocalService);

nuevoLocal: Local = new Local();
  localForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private _localService: LocalService) {
    this.localForm = this.fb.group({
      nombreNumerico: ['', [Validators.required, nonNegativeNumberValidator()]],
      superficie: ['', [Validators.required, nonNegativeNumberValidator()]],
      habilitado: [false],
      costoMes: ['', [Validators.required, nonNegativeNumberValidator()]],
      pathImagen: ['', Validators.required],
      alquilado: [false]
    });

  }

  ngOnInit(): void {
    this.selectedFileUrl = null;
  }
  openModal() {
    this.nuevoLocal = { ...this.localForm.value };
    this.nuevoLocal.pathImagen = this.selectedFileUrl as string;
  }

  cancel() {
    this.localForm.reset();
    this.selectedFile = null;
    this.selectedFileUrl = null;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.selectedFileUrl = e.target.result;
      } else {
        this.selectedFileUrl = null;
      }
    };
    reader.readAsDataURL(file);
  }

  // submitLocal() {
  //   this.nuevoLocal = this.localForm.value;
  //   this.nuevoLocal.pathImagen = this.selectedFileUrl as string;
  
  //   // Convertir los valores de los checkboxes a booleanos explícitamente
  //   this.nuevoLocal.habilitado = !!this.nuevoLocal.habilitado;
  //   this.nuevoLocal.alquilado = !!this.nuevoLocal.alquilado;
  
  //   console.log('Enviando local al servicio:', this.nuevoLocal);
  //   this.crearLocal();
  //   this.selectedFile = null;
  //   this.selectedFileUrl = null;
  //   this.localForm.reset();
  // }
  

  
  submitLocal() {
    this.nuevoLocal = this.localForm.value;
    this.nuevoLocal.pathImagen = this.selectedFileUrl as string;
  
    // Convertir los valores de los checkboxes a booleanos explícitamente
    this.nuevoLocal.habilitado = !!this.nuevoLocal.habilitado;
    this.nuevoLocal.alquilado = !!this.nuevoLocal.alquilado;
  
    //console.log('Enviando local al servicio:', this.nuevoLocal);
  
    
    //console.log('Antes de llamar a crearLocal');
  


    this._localService.crearLocal(this.nuevoLocal).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response); 
        alert('Local creado exitosamente');
      },
      (error) => {
        console.error('Error al crear el local:', error); // Manejo de errores
        alert('Error al crear el local');
      }
    );
  
    //console.log('Después de llamar a crearLocal');
  
    this.selectedFile = null;
    this.selectedFileUrl = null;
    this.localForm.reset();
  }
  
}