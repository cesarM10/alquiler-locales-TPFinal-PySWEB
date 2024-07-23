import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlquilerService } from '../../services/alquiler.service';
import { Router } from '@angular/router';
import { CuotaAlquilerPago } from '../../dto/cuota-alquiler.pago';

@Component({
  selector: 'app-historial-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-pago.component.html',
  styleUrl: './historial-pago.component.css'
})
export class HistorialPagoComponent {
  readonly monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  cuotaAlquileres: Array<CuotaAlquilerPago> = [];

  constructor(
    private alquilerService: AlquilerService,
    private authService: AuthService,
    private router: Router) {

    if(!this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/home");
      return;
    }

    this.obtenerCuotaAlquiler();
  }

  obtenerCuotaAlquiler(){
    this.alquilerService.getAlquileresByPropietario().subscribe(
      (result) => {
        result.forEach((cuotaAlquilerPago: CuotaAlquilerPago) => {
          this.cuotaAlquileres.push(cuotaAlquilerPago);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  convertMesPago(mesPago: number){
    return this.monthNames[mesPago-1];
  }
}
