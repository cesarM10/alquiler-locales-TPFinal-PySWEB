import { Component, inject } from '@angular/core';
import { NovedadService } from '../../services/novedad.service';
import { Novedad } from '../../models/novedad';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Constantes } from '../../helpers/constantes';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-novedad-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novedad-lista.component.html',
  styleUrl: './novedad-lista.component.css'
})
export class NovedadListaComponent {
  rol = Constantes;
  novedad: Novedad = new Novedad();
  novedades: Array<Novedad> = [];
  toastSrvc = inject(ToastrService);
  estadoAux: string="";

  constructor(private novedadService: NovedadService,
    private router: Router,
    private authService: AuthService) {
    this.novedad = new Novedad();
    this.novedades = [];

    this.obtenerNovedades();
  }

  hasRole(role: String){
    return this.authService.getRole() == role;
  }

  obtenerNovedades() {
    this.estadoAux = "";
    this.novedades = new Array<Novedad>();
    this.novedadService.getNovedades().subscribe(
      (result) => {
        this.novedades = result.reverse();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  obtenerNovedadesFiltro() {
    this.novedades = new Array<Novedad>();
    this.novedadService.getNovedadesFiltro(this.estadoAux).subscribe(
      (result) => {
        let vnovedad = new Novedad();
        result.forEach((element: any) => {
          Object.assign(vnovedad, element);
          this.novedades.push(vnovedad);
          vnovedad = new Novedad();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  agregarNovedad() {
    this.router.navigate(['novedad-form', "0"]);
  }

  modificarNovedad(idNovedad: string) {
    this.router.navigate(['novedad-form', idNovedad]);
  }

  eliminarNovedad(idNodevad: string) {
    this.novedadService.deleteNovedad(idNodevad).subscribe(
      (result) => {
        this.toastSrvc.success("Novedad eliminada correctamente", "Operación exitosa");
        this.obtenerNovedades();
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
