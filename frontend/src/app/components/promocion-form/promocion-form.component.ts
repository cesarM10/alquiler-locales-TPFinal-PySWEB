import { Component, inject, Inject } from '@angular/core';
import { PromocionService } from '../../services/promocion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Promocion } from '../../models/promocion';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { Local } from '../../models/local';
import { AlquilerService } from '../../services/alquiler.service';
import { Alquiler } from '../../models/alquiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promocion-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promocion-form.component.html',
  styleUrl: './promocion-form.component.css'
})
export class PromocionFormComponent {

  promocion = new Promocion();
  accion: string = "new";
  locales = Array<Local>();

  alquileres = Array<Alquiler>();

  toastSrvc = inject(ToastrService);

  constructor(
    private promocionService: PromocionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localService: LocalService,
    private alquilerService: AlquilerService){
    this.cargarLocales()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.iniciarVariable();
      } else {
        this.accion = "update";
        this.cargarPromocionActualizar(params['id']);
      }
    })
  }

  iniciarVariable(): void {
    this.promocion = new Promocion();
    this.locales = new Array<Local>();
  }

  crearPromocion(){
    this.promocion.fechaInicio.toString();
    this.promocion.fechaFin.toString();

    this.promocionService.postPromocion(this.promocion).subscribe(
      (result)=>{
        this.toastSrvc.success("Promocion creada con exito", "Promocion Creada");
        this.router.navigate(['promocion-lista']);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  cargarPromocionActualizar(id: string): void {
    this.promocionService.getPromocionById(id).subscribe(
      (result: any) => {
        this.promocion = result;
        // this.promocion.nroLocal= this.promocion.local.numeroLocal;
        this.promocion.fechaInicio= this.parsearFecha(new Date(result.fechaInicio))
        this.promocion.fechaFin= this.parsearFecha(new Date(result.fechaFin))
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  parsearFecha(fecha: Date): string {
    var anio = fecha.getUTCFullYear();
    var mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
    var dia = String(fecha.getUTCDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  cargarLocales(): void {
    this.alquilerService.getAlquileresByUsuario().subscribe(
      (result: any) => {
        this.alquileres = result;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  modificarPromocion(){
    this.promocionService.updatePromocion(this.promocion).subscribe(
      (result)=>{
        this.toastSrvc.success("Promocion actualizada con exito", "Promocion Actualizada");
        this.router.navigate(['promocion-lista']);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  irALista(){
    this.router.navigate(['promocion-lista']);
    }


    seleccionImg(event: any) {
      const files = event.target.files[0];
      if (files.size > 2000000) {//limite de tamaño de imagen hasta 2mb 
        this.toastSrvc.warning("El tamaño maximo de la imagen es de 2MB", "Imagen muy grande");
        event.target.value = null;
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          let base64 = reader.result as string;
          this.promocion.imagen = base64;//almaceno en imagen el url base64
        };
        reader.readAsDataURL(files);
      }
    }

}
