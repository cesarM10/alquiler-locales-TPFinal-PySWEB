import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Rol } from '../../models/rol';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Constantes } from '../../helpers/constantes';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {
  rol = Constantes;
  accion: string = 'new';
  usuario!: Usuario;
  roles!: Array<Rol>;

  toastSrvc = inject(ToastrService);

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private authService: AuthService
  ) {
    this.iniciarVariable();
    this.cargarRoles();

    if(!authService.isLoggedIn() || authService.getRole()! == this.rol.ADMINISTRATIVO || authService.getRole()! == this.rol.PROPIETARIO){
      router.navigateByUrl("/home");
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == '0') {
        this.accion = 'new';
        this.iniciarVariable();
      } else {
        this.accion = 'update';
        this.cargarUsuario(params['id']);
      }
    });
  }

  iniciarVariable(): void {
    this.usuario = new Usuario();
    this.roles = new Array<Rol>();
  }

  cargarRoles(): void {
    this.rolService.getRoles().subscribe(
      result => {
        this.roles = result.filter((rol: Rol) => rol.nombre !== 'duenio');
      },
      error => {
        console.error('Error al cargar los roles', error);
      }
    );
  }

  agregarUsuario(){
    this.usuarioService.addUsuario(this.usuario).subscribe(
      result => {
        if (result.status ==  1){
          this.toastSrvc.success("Usuario registrado con exito", "Usuario Registrado");
          this.router.navigate(['usuario-lista'])
        }
      },
      error => {
        this.toastSrvc.error("Error al registrar Usuario", "Error");
        console.log(error);
      }
    )
  }

  actualizarUsuario(){
    this.usuarioService.updateUsuario(this.usuario).subscribe(
      result => {
        if (result.status ==  1){
          this.toastSrvc.success("Usuario actualizado con exito", "Usuario Actualizado");
          this.router.navigate(['usuario-lista'])
        }
      },
      (error: any) => {
        this.toastSrvc.error("Error al actualizar Usuario", "Error");
        console.log(error);
      }
    )
    this.usuario = new Usuario();
  }

  cargarUsuario(id: string) {
    this.usuarioService.getUsuario(id).subscribe(
      result => {
        Object.assign(this.usuario, result);
        this.usuario.rol = this.roles.find(rol => rol._id === this.usuario.rol._id)!
      }
    );
  }

  irALista(){
    this.router.navigate(['usuario-lista'])
  }

  validarCamposUsuario(){
    return !(
      this.usuario.apellido != '' && 
      this.usuario.nombre != '' && 
      this.usuario.dni > 0 &&
      this.usuario.email != '' && 
      this.usuario.telefono > 0  &&
      this.usuario.password != '' && 
      this.usuario.rol.nombre != ''
    );
  }

}