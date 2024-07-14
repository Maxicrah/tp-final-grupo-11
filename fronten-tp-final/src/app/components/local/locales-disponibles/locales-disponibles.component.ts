import { Component, inject } from '@angular/core';
import { LocalService } from '../../../services/local/local.service';
import { Local } from '../../../models/local/local';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-locales-disponibles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locales-disponibles.component.html',
  styleUrl: './locales-disponibles.component.css'
})
export class LocalesDisponiblesComponent {

   private readonly _localService = inject(LocalService)
  
  constructor(){
    this.getLocalesNoAlquilados()
  }

   listaLocalesNoAlquilados : Local[] = []

    getLocalesNoAlquilados(){
      this._localService.obtenerListaDeLocalesNoAlquilados().subscribe(
        (locales)=>{
            this.listaLocalesNoAlquilados = locales.data
            console.log(locales.data);
        },
        (err)=>{
          console.log(err);
        }
      )
    }


}
