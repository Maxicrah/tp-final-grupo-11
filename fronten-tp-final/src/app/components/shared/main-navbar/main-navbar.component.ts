import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent implements OnInit {

  
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.rol = this.authService.getRol();
  }

  rol: string | null = '';

  getDashboardTitle(): string {
    if (this.rol === 'propietario') {
      return 'Propietario Dashboard';
    } else if (this.rol === 'administrador') {
      return 'Admin Dashboard';
    } else if (this.rol === 'dueño') {
      return 'Dueño Dashboard';
    } else {
      return 'Dashboard';
    }
  }

  getDashboardLink(): string {
    if (this.rol === 'propietario') {
      return '/propietario-dashboard';
    } else if (this.rol === 'administrador') {
      return '/dashboard-admin';
    } else if (this.rol === 'dueño') {
      return '/duenio-dashboard';
    } else {
      return '/dashboard-normal';
    }
  }
  logout() {
    this.authService.logout();
  }
}
