import { Component, inject, OnInit } from '@angular/core';
import { NovedadService } from '../../services/novedad.service';
import { Novedad } from '../../models/novedad';
import { LocalService } from '../../services/local.service';
import { UsuarioService } from '../../services/usuario.service';
import { Local } from '../../models/local';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-novedad-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novedad-form.component.html',
  styleUrl: './novedad-form.component.css'
})
export class NovedadFormComponent{
  novedad: Novedad = new Novedad();
  local: Local = new Local();
  usuario: Usuario = new Usuario();
  toastSrvc = inject(ToastrService);
  locales: Array<Local> = [];
  usuarios: Array<Usuario> = [];

  accion: string = "new";

  constructor(private novedadService: NovedadService,
    private localService: LocalService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
    this.iniciarVariable();
    this.obtenerLocales();
    this.obtenerUsuarios();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.iniciarVariable();
      } else {
        this.accion = "update";
        this.cargarNovedadActualizar(params['id']);
      }
    })
  }

  iniciarVariable() {
    this.novedad = new Novedad();
    this.local = new Local();
    this.usuario = new Usuario();
    this.locales = new Array<Local>();
  }

  cargarNovedadActualizar(idNovedad: string) {
    this.novedadService.getNovedadById(idNovedad).subscribe(
      (result) => {
        Object.assign(this.novedad, result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  obtenerLocales() {
    this.localService.getLocales().subscribe(
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

  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (result) => {
        let vusuario = new Usuario();
        result.forEach((element: any) => {
          Object.assign(vusuario, element);
          this.usuarios.push(vusuario);
          vusuario = new Usuario();
        });
      },
      (error) => {
        console.log('Error:',error);
      }
    )
  }

  agregarNovedad() {
    this.novedad.usuario._id = this.authService.getUserId()!;
    this.novedadService.createNovedad(this.novedad).subscribe(
      (result) => {
        this.toastSrvc.success('Novedad creada correctamente', 'Operación exitosa');
        this.novedad = new Novedad();
        this.router.navigate(['novedad-lista']);
      },
      (error) => {
        this.toastSrvc.error('Error al crear la novedad', 'Operación fallida');
        console.log('Error:',error);
      }
    )
  }

  actualizarNovedad() {
    this.novedadService.updateNovedad(this.novedad).subscribe(
      (result) => {
        this.toastSrvc.success('Novedad actualizada correctamente', 'Operación exitosa ');
        this.novedad = new Novedad();
        this.router.navigate(['novedad-lista']);
      },
      (error) => {
        this.toastSrvc.error('Error al actualizar la novedad', 'Operación fallida');
        console.log('Error:',error);
      }
    )
  }

  irALista() {
    this.router.navigate(['novedad-lista']);
  }

  validarCamposNovedad() {
    return !(
      this.novedad.local.numeroLocal != "" &&
      this.novedad.texto != "" &&
      this.novedad.estado != ""
    );
  }
}
