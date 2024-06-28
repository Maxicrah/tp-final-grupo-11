import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchText = '';
  filterType = '';

  searchLocal: FormGroup;

  locales = [
    { nombre: 'Local 1', descripcion: 'Descripción del Local 1', imagen: 'assets/galeria4.jpg', popularidad: 5, precio: 1500 },
    { nombre: 'Local 2', descripcion: 'Descripción del Local 2', imagen: 'assets/galeria1.jpg', popularidad: 3, precio: 1000 },
    { nombre: 'Local 3', descripcion: 'Descripción del Local 3', imagen: 'assets/galeria4.jpg', popularidad: 4, precio: 1200 },
    { nombre: 'Local 4', descripcion: 'Descripción del Local 4', imagen: 'assets/galeria4.jpg', popularidad: 4, precio: 1200 },
    { nombre: 'Local 5', descripcion: 'Descripción del Local 5', imagen: 'assets/galeria4.jpg', popularidad: 4, precio: 1200 },
    { nombre: 'Local 6', descripcion: 'Descripción del Local 6', imagen: 'assets/galeria4.jpg', popularidad: 4, precio: 1200 },
    { nombre: 'Local 7', descripcion: 'Descripción del Local 7', imagen: 'assets/galeria4.jpg', popularidad: 4, precio: 1200 },
    { nombre: 'Local 8', descripcion: 'Descripción del Local 8', imagen: 'assets/galeria4.jpg', popularidad: 4, precio: 1200 },
    { nombre: 'Local 9', descripcion: 'Descripción del Local 9', imagen: 'assets/galeria4.jpg', popularidad: 4, precio: 1200 },
    { nombre: 'Local 10', descripcion: 'Descripción del Local 10', imagen: 'assets/galeria4.jpg', popularidad: 4, precio: 1200 },
    { nombre: 'Local 11', descripcion: 'Descripción del Local 11', imagen: 'assets/galeria4.jpg', popularidad: 4, precio: 1200 },
    { nombre: 'Local 12', descripcion: 'Descripción del Local 12', imagen: 'assets/galeria4.jpg', popularidad: 4, precio: 1200 },
    { nombre: 'Local 13', descripcion: 'Descripción del Local 13', imagen: 'assets/galeria4.jpg', popularidad: 4, precio: 1200 }
  ];

  constructor(private fb: FormBuilder) {
    this.searchLocal = this.fb.group({
      text: ['', Validators.required]
    });
  }

  onSearch(): void {
    this.searchText = this.searchLocal.get('text')?.value || '';
    this.currentPage = 1;
  }

  filteredLocales() {
    let filtered = this.locales.filter(local => local.nombre.toLowerCase().includes(this.searchText.toLowerCase()));
    if (this.filterType) {
      filtered = this.applyFilter(filtered);
    }
    return filtered;
  }

  filterBy(type: string) {
    this.filterType = type;
  }

  applyFilter(locales: any[]) {
    switch (this.filterType) {
      case 'populares':
        return locales.sort((a, b) => b.popularidad - a.popularidad);
      case 'menosPopulares':
        return locales.sort((a, b) => a.popularidad - b.popularidad);
      case 'mayorPrecio':
        return locales.sort((a, b) => b.precio - a.precio);
      case 'menorPrecio':
        return locales.sort((a, b) => a.precio - b.precio);
      default:
        return locales;
    }
  }

  get paginatedLocales(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredLocales().slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.filteredLocales().length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
