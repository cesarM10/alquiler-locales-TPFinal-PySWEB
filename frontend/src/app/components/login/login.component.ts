import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  btnClick: boolean = false;
  toastSrvc= inject(ToastrService);

  constructor (private loginService:LoginService, private authService: AuthService, private router: Router){
    if (authService.isLoggedIn()){
      router.navigateByUrl("/home");
    }
  }

  inicioSesion(){
    this.btnClick = true;
    this.loginService.loginUser(this.email, this.password).subscribe(
      (result) => {
        var user = result;
        this.authService.login(user);
        this.toastSrvc.success("Inicio de sesión correcto.", "Login");
        this.router.navigateByUrl("/home");
      },
      error => {
        console.error('Error al iniciar sesión', error);
        this.toastSrvc.error("Error al iniciar sesión", "Login");
        this.btnClick = false;
      }
    );
  }
}
