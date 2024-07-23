import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { UsuarioListaComponent } from '../usuario-lista/usuario-lista.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Constantes } from '../../helpers/constantes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule, UsuarioFormComponent, UsuarioListaComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  rol = Constantes;

  constructor(private authService: AuthService, private router: Router) {
  }

  isAuthenticated(){
    return this.authService.isLoggedIn();
  }

  getUserName(){
    return this.authService.getUserEmail();
  }

  cerrarSesion(){
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

  hasRole(role: String){
    return this.authService.getRole() == role;
  }
}
