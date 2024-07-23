import { Component, inject } from '@angular/core';
import { AlquilerService } from '../../services/alquiler.service';
import { Local } from '../../models/local';
import { Usuario } from '../../models/usuario';
import { Alquiler } from '../../models/alquiler';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constantes, EstadosPago } from '../../helpers/constantes';
import { AuthService } from '../../services/auth.service';
import { MercadopagoService } from '../../services/mercadopago.service';
import { CuotaAlquiler } from '../../dto/cuota-alquiler';
import { Cuota } from '../../models/cuota';

@Component({
  selector: 'app-alquiler-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alquiler-lista.component.html',
  styleUrl: './alquiler-lista.component.css'
})
export class AlquilerListaComponent {
  readonly monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  estados = EstadosPago;
  rol = Constantes;
  local: Local = new Local();
  usuario: Usuario = new Usuario();
  alquiler: Alquiler = new Alquiler();
  cuotaAlquiler: Array<CuotaAlquiler> = new Array<CuotaAlquiler>();
  today: Date = new Date();
  mesPago: number = 0;
  anioPago: number = 0;
  //injecto el servicio de toast.
  toastSrvc= inject(ToastrService);

  constructor(private alquilerService: AlquilerService,
    private authService: AuthService,
    private router: Router, 
    private mercadopagoService: MercadopagoService) { 
    this.iniciarVariables();
      this.obtenerAlquiler();
  }

  hasRole(role: String){
    return this.authService.getRole() == role;
  }

  iniciarVariables(){
    this.local = new Local();
    this.usuario = new Usuario();
    this.alquiler = new Alquiler();
    this.cuotaAlquiler = new Array<CuotaAlquiler>();
  }

  obtenerAlquiler(){
    this.cuotaAlquiler = new Array<CuotaAlquiler>();
    this.alquilerService.getAlquileres().subscribe(
      (result) => {
        result.forEach((cuotaAlquiler: CuotaAlquiler) => {
          this.cuotaAlquiler.push(cuotaAlquiler);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  agregarAlquiler(){
    this.router.navigate(['alquiler-form', "0"]);
  }

  pagarAlquiler(cuotaAlquiler: CuotaAlquiler){
    this.obtenerUltimoMesPago(cuotaAlquiler.cuota);
    this.mercadopagoService.createPreference(cuotaAlquiler).subscribe({
      next: (result) => {
        this.router.navigateByUrl(`/cuota?preferenceId=${result.id}&totalPagar=${cuotaAlquiler.alquiler.costoalquiler}&mesPago=${this.mesPago+1}&anioPago=${this.anioPago}`);
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  pagarAlquilerAdministrativo(cuotaAlquiler: CuotaAlquiler){
  }

  obtenerUltimoMesPago(cuotas: Cuota[]){
    if (cuotas.length == 0){
      this.mesPago = this.today.getUTCMonth();
      this.anioPago = this.today.getUTCFullYear();
      return;
    }
    
    var maxMesDePago = 0;
    var maxAnio = cuotas[0].anioPago;
    cuotas.forEach(cuota => {
      if (cuota.anioPago > maxAnio){
        maxAnio = cuota.anioPago;
        maxMesDePago = cuota.mesPago;
      }
    });
    
    cuotas.forEach(cuota => {
      if (cuota.anioPago == maxAnio && cuota.mesPago > maxMesDePago)
        maxMesDePago = cuota.mesPago;
    });


    if(maxMesDePago == 12 && maxAnio <= new Date().getUTCFullYear()){
      maxMesDePago = 0;
      maxAnio = new Date().getUTCFullYear() + 1;
    }

    this.mesPago = maxMesDePago;
    this.anioPago = maxAnio;
  }

  pagarAdelanto(idAlquiler: string){
    this.router.navigate(['alquiler-form', idAlquiler]);
  }

  modificarAlquiler(idAlquiler: string){
    this.router.navigate(['alquiler-form', idAlquiler]);
  }

  eliminarAlquiler(idAlquiler: string){
    this.alquilerService.deleteAlquiler(idAlquiler).subscribe(
      (result) => {
        this.toastSrvc.success("Alquiler eliminado", "Operación exitosa");
        this.obtenerAlquiler();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  validarMesPago(cuotaAlquiler: CuotaAlquiler){
    this.obtenerUltimoMesPago(cuotaAlquiler.cuota);

    return this.monthNames[this.mesPago] + " - Año: " + this.anioPago;
  }

  validarEstados(cuotaAlquiler: CuotaAlquiler){
    if(cuotaAlquiler.cuota.length > 0){
      var maxMesDePago = cuotaAlquiler.cuota[0].mesPago;
      cuotaAlquiler.cuota.forEach((cuota) => {
        if (cuota.mesPago > maxMesDePago){
          maxMesDePago = cuota.mesPago
        }
      })

      if (this.today.getMonth()+1 < maxMesDePago){
        return this.estados.PENDIENTE;
      }else{
        return this.estados.PENDIENTE;
      }
    }else{
      return this.estados.PENDIENTE;
    }
  }
}

