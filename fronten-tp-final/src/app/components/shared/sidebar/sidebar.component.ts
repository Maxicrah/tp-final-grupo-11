import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  rol: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
  }

  logout() {
    this.authService.logout();
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

  getPagoLink(): string {
    if (this.rol === 'propietario') {
      return '/propietario-dashboard/pago-form';
    } else if (this.rol === 'administrador') {
      return '';
    } else if (this.rol === 'dueño') {
      return '/duenio-dashboard/pago-form';
    } else {
      return '/dashboard-admin';
    }
  }

  getEstadisticasPagosLink(): string {
    if (this.rol === 'dueño') {
      return '/duenio-dashboard/pagos-estadisticas';
    } else {
      return '';
    }
  }
  
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
  
  getProfileLink(): string {
    if (this.rol === 'dueño') {
      return '/duenio-dashboard/perfil';
    } else if (this.rol === 'administrador') {
      return '/admin-dashboard/perfil';
    } else if (this.rol === 'propietario') {
      return '/propietario-dashboard/perfil';
    } else {
      return '/dashboard/perfil';
    }
  }

  getLocalesAlquiladosLink():string{
    if(this.rol === 'propietario') {
      return '/propietario-dashboard/locales-alquilados';
  }else{
    return '/home';
  }
  }

  getLocalesDisponiblesLink():string {
    if(this.rol === 'propietario') {
      return '/propietario-dashboard/locales-disponibles';
  }else{
    return '/home';
  }
}

  getPostToFacebookLink():string{
    if (this.rol === 'dueño'){
      return '/duenio-dashboard/post-form';
    }
    else if (this.rol === 'administrador') {
      return '/admin-dashboard/post-form';
    } else {
      return '/home';
    }
  }
  
  getLocalFormLink(): string {
    if (this.rol === 'dueño') {
      return '/duenio-dashboard/local-form';
    } else if (this.rol === 'administrador') {
      return '/admin-dashboard/local-form';
    } else {
      return '/dashboard/local-form';
    }
  }
  
  getAlquilerFormLink(): string {
    if (this.rol === 'dueño') {
      return '/duenio-dashboard/alquiler-form';
    } else if (this.rol === 'administrador') {
      return '/admin-dashboard/alquiler-form';
    } else {
      return '/dashboard/alquiler-form';
    }
  }
  
  getNotificacionesLink(): string {
    return '/duenio-dashboard/notificaciones';
  }
  
  getConfiguracionLink(): string {
    if (this.rol === 'dueño') {
      return '/duenio-dashboard/configuracion';
    } else if (this.rol === 'administrador') {
      return '/admin-dashboard/configuracion';
    } else {
      return '/dashboard/configuracion';
    }
  }
}