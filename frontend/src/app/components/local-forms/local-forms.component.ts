import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { Local } from '../../models/local';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-local-forms',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './local-forms.component.html',
  styleUrl: './local-forms.component.css'
})
export class LocalFormsComponent {

  local = new Local();
  accion: string = "new";

  toastSrvc = inject(ToastrService);
  
  constructor( private router:Router, 
    private localService:LocalService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ){}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.iniciarLocales();
      } else {
        this.accion = "update";
        this.cargarLocal( params['id'] );
        
      }
    })
  }

  cargarLocal(id: string): void {
    this.localService.getLocal(id).subscribe(
      (result) => {
        this.local = result;
      },
      error => {
        alert("Error: " + error);
      }); 
  }


  iniciarLocales():void{
    this.local = new Local();
  }


  //Crear Locales
  crearLocal(): void {
    this.local.usuario = this.authService.getUserId()!;
    this.localService.postLocal(this.local).subscribe(
      (result) => {
        if(result.status == 0){
          this.toastSrvc.warning("El número de local ingresado ya existe.", "Atención");
          return;
        }else{
          this.toastSrvc.success("Local creado con éxito.", "Operación exitosa");
          this.router.navigate(['local-lista']);
        }
      },
      error => {
        alert("Error: " + error);
      });
  }

  //Modificar Local
  modificarLocal() {
    
    this.localService.putLocal(this.local).subscribe(
      (result)=>{
        this.toastSrvc.success("Local modificado con éxito.", "Operación exitosa");
        this.router.navigate(['local-lista'])

      },
      error => {
        alert("Error: " + error);
      });

  }

  volverLocal(){
    this.router.navigate(['local-lista']);
  }



  seleccionImg(event: any) {
    const files = event.target.files[0];
    if (files.size > 2000000) {//limite de tamaño de imagen hasta 2mb 
      alert('El tamaño  de imagen maximo es 2MB');
      event.target.value = null;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        let base64 = reader.result as string;
        this.local.imagen = base64;//almaceno en imagen el url base64
      };
      reader.readAsDataURL(files);
    }
  }

  validarCampos(){
    return !(this.local.superficie > 0 &&
       this.local.costoMes > 0 &&
      this.local.numeroLocal!='0' &&
      this.local.numeroLocal!='-1' &&
      this.local.numeroLocal!='-2' &&
      this.local.numeroLocal!='-3' 
    
    );
  }
}
