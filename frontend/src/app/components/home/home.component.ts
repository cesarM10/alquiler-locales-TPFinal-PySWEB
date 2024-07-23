import { Component } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Local } from '../../models/local';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromocionService } from '../../services/promocion.service';
import { Promocion } from '../../models/promocion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  locales: Array<Local> = [];
  promociones: Array<Promocion> = [];
  constructor(private localService: LocalService,
              private promocionService: PromocionService) {
    this.obtenerLocales();
    this.obtenerPromociones();
   }

   obtenerLocales() {
    this.localService.getLocalesPublicos().subscribe(
      (result) => {
        let vlocal = new Local();
        result.forEach((element: any) => {
          Object.assign(vlocal, element);
          this.locales.push(vlocal);
          vlocal = new Local();
        });
      },
      (error) => {
        console.log(error);
      }
    )
   }

   obtenerPromociones(){
    this.promocionService.getPromocionesPublicas().subscribe(
      (result) => {
        this.promociones = result;
      },
      (error) => {
        console.log(error);
      })
  }
  

}
