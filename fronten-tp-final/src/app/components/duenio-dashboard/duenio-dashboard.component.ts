import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { MainNavbarComponent } from '../shared/main-navbar/main-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-duenio-dashboard',
  standalone: true,
  imports: [SidebarComponent, MainNavbarComponent, RouterOutlet],
  templateUrl: './duenio-dashboard.component.html',
  styleUrl: './duenio-dashboard.component.css'
})
export class DuenioDashboardComponent {

  @ViewChild('hamBurger') hamBurger!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    // Luego de que la vista y sus elementos estén inicializados
    this.hamBurger.nativeElement.addEventListener('click', () => {
      const sidebar = document.querySelector('#sidebar');
      if (sidebar) {
        sidebar.classList.toggle('expand');
      }
    });
  }
}
