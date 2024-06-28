import { Component } from '@angular/core';

@Component({
  selector: 'app-duenio-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './duenio-dashboard.component.html',
  styleUrl: './duenio-dashboard.component.css'
})
export class DuenioDashboardComponent {

  totalLocales = 15;
  localesAlquilados = 10;
  totalIngresos = 50000;
  pagosPendientes = 2;
  pagosRecientes = [
    { fecha: '01/06/2024', descripcion: 'Pago de alquiler - Local 1', monto: 5000, metodoPago: 'Transferencia Bancaria' },
    { fecha: '02/06/2024', descripcion: 'Pago de alquiler - Local 2', monto: 4500, metodoPago: 'Tarjeta de Crédito' },
  ];
}
