import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PagoService } from '../../services/pago.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  pagoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService
  ) {}

  ngOnInit(): void {
    this.pagoForm = this.fb.group({
      alquilerId: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]],
      metodoPago: ['', Validators.required],
      fechaPago: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.pagoForm.valid) {
      this.pagoService.crearPago(this.pagoForm.value).subscribe(
        response => {
          console.log('Pago creado exitosamente:', response);
        },
        error => {
          console.error('Error al crear el pago:', error);
        }
      );
    }
  }
}
