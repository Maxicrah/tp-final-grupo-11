import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  rol: string | null;

  constructor(private auth: AuthService) {
    this.rol = this.auth.getRol();
  }

  isAdmin(): boolean {
    return this.rol === 'administrador';
  }

  isPropietario(): boolean {
    return this.rol === 'propietario';
  }

  isEncargado(): boolean {
    return this.rol === 'encargado';
  }
}
