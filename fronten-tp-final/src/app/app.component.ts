import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { MainNavbarComponent } from './components/shared/main-navbar/main-navbar.component';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent, SidebarComponent, MainNavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private authService: AuthService){}

  isOwnerLoggedIn(): boolean {
    return this.authService.isOwner() && this.authService.isAuthenticated();
  }
  isPropertyOwnerLoggedIn(): boolean{
    return this.authService.isPropertyOwner() && this.authService.isAuthenticated();
  }


}
