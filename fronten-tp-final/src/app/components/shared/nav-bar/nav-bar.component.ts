import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  
}
