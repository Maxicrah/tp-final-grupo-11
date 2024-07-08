import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @ViewChild('hamBurger') hamBurger!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.hamBurger.nativeElement.addEventListener('click', () => {
      const sidebar = document.querySelector('#sidebar');
      const mainContent = document.querySelector('.main');
      if (sidebar) {
        sidebar.classList.toggle('expand');
        if (mainContent) {
          mainContent.classList.toggle('expanded');
        }
      }
    });
  }
}
