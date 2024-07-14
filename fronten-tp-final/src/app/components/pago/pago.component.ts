import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PagoService } from '../../services/pago.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  pagoForm: FormGroup;

  private authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService
  ) {
    this.pagoForm = this.fb.group({
      alquiler: ['', Validators.required],
      unit_price: ['', [Validators.required, Validators.min(1)]],
      metodoPago: ['', Validators.required],
      descripcion: ['', Validators.required],
      usuario: ['', Validators.required],
      tipo: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    const userRol = this.authService.getRol();
    
    if (userRol === 'propietario' && userId) {
      this.pagoForm.patchValue({ usuario: userId });
    }
  }

  onSubmit() {
    if (this.pagoForm.valid) {
      this.pagoService.crearPago(this.pagoForm.value).subscribe(
        (response) => {
          console.log('Respuesta del backend:', response);
          if (response.status === '1' && response.data && typeof response.data.urlPago === 'string') {
            this.pagoService.redirigirAPago(response.data.urlPago);
          } else {
            console.error('Error: no se recibió la URL de pago válida');
          }
        },
        (error) => {
          console.error('Error al crear el pago:', error);
        }
      );
    }
  }
}
