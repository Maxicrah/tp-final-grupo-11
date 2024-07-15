import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoService } from '../../services/pago.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pago-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-estadisticas.component.html',
  styleUrl: './pago-estadisticas.component.css'
})
export class PagoEstadisticasComponent {
  pagosPorMesChart: any;
  pagosPorLocalChart: any;
  totalPagos: number = 0;

  constructor(private pagoService: PagoService) { }

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.pagoService.obtenerEstadisticasPagos().subscribe((data: any) => {
      this.totalPagos = data.totalPagos;
      this.crearChartPagosPorMes(data.pagosPorMes);
      this.crearChartPagosPorLocal(data.pagosPorLocal);
    });
  }

  crearChartPagosPorMes(pagosPorMes: any): void {
    const labels = pagosPorMes.map((item: any) => `Mes ${item._id}`);
    const data = pagosPorMes.map((item: any) => item.totalPagos);

    this.pagosPorMesChart = new Chart('pagosPorMesChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Pagos por Mes',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  crearChartPagosPorLocal(pagosPorLocal: any): void {
    const labels = pagosPorLocal.map((item: any) => `Local ${item._id}`);
    const data = pagosPorLocal.map((item: any) => item.totalPagos);

    this.pagosPorLocalChart = new Chart('pagosPorLocalChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Pagos por Local',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
