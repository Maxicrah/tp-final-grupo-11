  import { CommonModule } from '@angular/common';
  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
  import { LocalService } from '../../services/local/local.service';
  import { Local } from '../../models/local/local';
import { UsuarioService } from '../../services/usuario.service';
  
  @Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit {
    currentPage: number = 1;
    itemsPerPage: number = 10;
    searchText = '';
    userRol: string = ''; 
    searchLocal: FormGroup;
    locales: Local[] = [];
    filteredLocales: Local[] = [];


    constructor(private fb: FormBuilder, private _localService: LocalService,
      private _usuarioService: UsuarioService
    ) {
      this.searchLocal = this.fb.group({
        text: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.loadLocales();
      this._localService.localCreated$.subscribe(() => {
        this.loadLocales();
      });
      // Asumiendo que tienes una manera de obtener el id del usuario actual, como desde un servicio de autenticación
    const userId = this._usuarioService.getCurrentUserId(); 
    this.obtenerRolUsuario(userId);
    }

    obtenerRolUsuario(id: string): void {
      this._usuarioService.getRolUsuario(id).subscribe(
        (response) => {
          this.userRol = response.rol;  // Asignar solo el valor de 'rol'
        },
        (error) => {
          console.error('Error al obtener el rol del usuario:', error);
        }
      );
    }
    
    
    filterBy(criteria: string): void {
      switch(criteria) {
        case 'mayorCosto':
          this.filteredLocales = [...this.locales].sort((a, b) => b.costoMes - a.costoMes);
          break;
        case 'menorCosto':
          this.filteredLocales = [...this.locales].sort((a, b) => a.costoMes - b.costoMes);
          break;
        case 'habilitados':
          this.filteredLocales = this.locales.filter(local => local.habilitado);
          break;
        case 'alquilados':
          this.filteredLocales = this.locales.filter(local => local.alquilado == false);
          break;
        default:
          this.filteredLocales = this.locales;
      }
      this.currentPage = 1;
    }
  
    loadLocales(): void {
      this._localService.obtenerListaDeLocales().subscribe(
        (response: { data: Local[] }) => {
          console.log(response.data); 
          this.locales = response.data;
          this.filteredLocales = this.locales; // Inicialmente, filteredLocales tiene todos los locales
        },
        error => {
          console.log(error);
        }
      );
    }
  
    onSearch(): void {
      this.searchText = this.searchLocal.get('text')?.value || '';
      this.filteredLocales = this.locales.filter(local => 
        local.nombreNumerico.toString().includes(this.searchText)
        
      );
      this.currentPage = 1;
    }
  
    get paginatedLocales(): Local[] {
      if (!Array.isArray(this.filteredLocales)) {
        console.error('filteredLocales no es un array:', this.filteredLocales);
        return [];
      }
  
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredLocales.slice(startIndex, endIndex);
    }
  
    nextPage(): void {
      if ((this.currentPage * this.itemsPerPage) < this.filteredLocales.length) {
        this.currentPage++;
      }
    }
  
    prevPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }


    // deletLocal(local:Local):void{
    //   this._localService.eliminarLocal(local._id).subscribe(
    //     () => {
    //       console.log('Local eliminado correctamente.');
    //       this.loadLocales();
    //     },
    //     (error) => {
    //       console.error('Error al eliminar el local:', error);
    //     }
    //   )
    // }
    
    deleteLocal(local: Local): void {
      if (this.userRol === 'dueño') {
        this._localService.eliminarLocal(local._id).subscribe(
          () => {
            console.log('Local eliminado correctamente.');
            this.loadLocales();
          },
          (error) => {
            console.error('Error al eliminar el local:', error);
          }
        );
      } else {
        console.error('No tienes permisos para eliminar locales.');
        // Aquí podrías mostrar un mensaje al usuario indicando que no tiene permisos
      }
    }
    
  }