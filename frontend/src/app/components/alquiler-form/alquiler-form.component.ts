import { Component, inject } from '@angular/core';
import { AlquilerService } from '../../services/alquiler.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { UsuarioService } from '../../services/usuario.service';
import { Local } from '../../models/local';
import { Usuario } from '../../models/usuario';
import { Alquiler } from '../../models/alquiler';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constantes } from '../../helpers/constantes';

@Component({
  selector: 'app-alquiler-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alquiler-form.component.html',
  styleUrl: './alquiler-form.component.css'
})
export class AlquilerFormComponent {
  rol = Constantes;
  locales = Array<Local>();
  propietarios = Array<Usuario>();
  alquiler = new Alquiler();
  propietario = new Usuario();
  local = new Local();

  accion: string = "new";
  toastSrvc= inject(ToastrService);

  constructor(
    private alquilerService: AlquilerService,
    private localService: LocalService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.cargarLocales();
    this.cargarPropietarios();
    this.iniciarVariable();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.iniciarVariable();
      } else {
        this.accion = "update";
        this.cargarAlquilerActualizar(params['id']);
      }
    })
  }

  cargarAlquilerActualizar(idAlquiler: string) {
    this.alquilerService.getAlquiler(idAlquiler).subscribe(
      (result) => {
        Object.assign(this.alquiler, result);
        this.alquiler.fechaAlquiler = this.parsearFecha(new Date(result.fechaAlquiler))
      },
      (error) => {
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
    this.localService.getLocalesFiltros(true, false).subscribe(
      result => {
        this.locales = result;
      },
      (error) => {
        console.log(error);
      })
  }

  iniciarVariable(): void {
    this.alquiler = new Alquiler();
    this.locales = new Array<Local>();
  }

  cargarPropietarios(): void {
    this.usuarioService.getUsuarioByRoleName(this.rol.PROPIETARIO).subscribe({
      next: (result) => {
        this.propietarios = result;
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  crearAlquiler() {
    this.alquilerService.addAlquiler(this.alquiler).subscribe(
      (result) => {
        this.toastSrvc.success("Alquiler creado", "Operación exitosa");
        this.irALista();
      },
      (error) => {
        this.toastSrvc.error("Error al crear alquiler", "Operación fallida");
        console.log(error);
      }
    )
  }

  actualizarAlquiler() {
    this.alquilerService.updateAlquiler(this.alquiler).subscribe(
      (result) => {
        this.toastSrvc.success("Alquiler modificado", "Operación exitosa");
        this.irALista();
      },
      (error) => {
        this.toastSrvc.error("Error al modificar alquiler", "Operación fallida");
        console.log(error);
      }
    )
  }

  irALista() {
    this.router.navigate(['alquiler-lista']);
  }
}
