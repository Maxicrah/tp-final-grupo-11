import { Component, inject, OnInit } from '@angular/core';
import { AlquilerService } from '../../../services/alquiler/alquiler.service';
import { Local } from '../../../models/local/local';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-locales-alquilados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locales-alquilados.component.html',
  styleUrl: './locales-alquilados.component.css'
})
export class LocalesAlquiladosComponent implements OnInit {

  private _alquilerService = inject(AlquilerService);
  private _authService = inject(AuthService);

  localesAlquilados: Local[] = [];

  ngOnInit(): void {
    const propietarioId = this._authService.getUserId();
    console.log('ID del propietario:', propietarioId); // Verifica el ID del propietario
    if (propietarioId) {
      this.getLocalesAlquilados(propietarioId);
    } else {
      console.error('El ID del propietario no está disponible');
    }
  }

  getLocalesAlquilados(propietarioId: string): void {
    this._alquilerService.getLocalesByPropietario(propietarioId).subscribe({
      next: (locales: Local[]) => {
        console.log('Locales alquilados:', locales); // Verifica la respuesta de la API
        this.localesAlquilados = locales;
        if (locales.length === 0) {
          console.warn('No hay locales alquilados para este propietario.');
        }
      },
      error: (error) => {
        console.error('Error al obtener los locales alquilados', error);
      }
    });
  }
}