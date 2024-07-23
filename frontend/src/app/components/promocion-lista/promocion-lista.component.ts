import { Component, inject } from '@angular/core';
import { PromocionService } from '../../services/promocion.service';
import { Promocion } from '../../models/promocion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookService, InitParams } from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promocion-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promocion-lista.component.html',
  styleUrl: './promocion-lista.component.css'
})
export class PromocionListaComponent {
  msjPosteo?: string = "hola prueba";
  promociones: Array<Promocion> = [];//Para obtener todas las sucripciones de la bd.

  sortOrder: string = "";

  toastSrvc = inject(ToastrService);

  constructor(private promocionService: PromocionService,
    private router: Router,
    private fbService: FacebookService,
    private authService: AuthService) {
    this.obtenerPromociones();
    // this.sesionFb();
  }

  hasRole(role: String) {
    return this.authService.getRole() == role;
  }

  obtenerPromociones(): void {
    this.promocionService.getPromocionesFiltro(this.sortOrder).subscribe(
      result => {
        this.promociones = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSortOrderChange(sortOrder: string): void {
    this.sortOrder = sortOrder;
    this.obtenerPromociones();
  }

  agregarPromocion() {
    this.router.navigate(['promocion-form', "0"]);
  }

  modificarPromocion(_id: string) {
    this.router.navigate(['promocion-form', _id]);
  }

  eliminarPromocion(_id: string) {
    this.promocionService.deletePromocionById(_id).subscribe(
      (result: any) => {
        this.toastSrvc.success("Promocion eliminada correctamente", "Promocion eliminada correctamente");
        this.obtenerPromociones();
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  posteoFb() {
    var apiMethod: ApiMethod = "post";
    this.fbService.api('/348066471731907/feed', apiMethod,
      {
        "message": this.msjPosteo,
        "access_token": "EAAKnza2tB7kBOZBHePLT6xdMjHof9TWbCF0dbeebYH2EqYnVZBif1BdXP1UHTD7UJkun3cVDaxGLPZAauUU815fIaVpN5tzXJHk2ujQt2ayzgMPLDoF2UK9AFic9yUscLyZAbQZA8M31ZBHaQqsHNIMLpVOXsyeGIjZCnnQ98IT00E5dvLwrAHCZCyY3fLZA80NVpVb2R7hcvKv9zdbHH9RynFwPmqwZDZD"
      });
  }

  sesionFb() {
    let initParams: InitParams = {
      appId: '1757474011058319',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v7.0'
    };

    this.fbService.init(initParams);
    this.posteoFb();
  }
}