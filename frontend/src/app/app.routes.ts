import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsuarioListaComponent } from './components/usuario-lista/usuario-lista.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { PromocionFormComponent } from './components/promocion-form/promocion-form.component';
import { PromocionListaComponent } from './components/promocion-lista/promocion-lista.component';
import { LoginComponent } from './components/login/login.component';
import { AlquilerFormComponent } from './components/alquiler-form/alquiler-form.component';
import { NovedadFormComponent } from './components/novedad-form/novedad-form.component';
import { NovedadListaComponent } from './components/novedad-lista/novedad-lista.component';
import { AlquilerListaComponent } from './components/alquiler-lista/alquiler-lista.component';
import { LocalComponent } from './components/local/local.component';
import { LocalFormsComponent } from './components/local-forms/local-forms.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { CuotaComponent } from './components/cuota/cuota.component';
import { HistorialPagoComponent } from './components/historial-pago/historial-pago.component';

export const routes: Routes = [
    {path: 'usuario-lista', component:UsuarioListaComponent},
    {path: 'usuario-form', component:UsuarioFormComponent},
    {path: 'usuario-form/:id', component:UsuarioFormComponent},
    {path: 'promocion-form', component: PromocionFormComponent},
    {path: 'promocion-form/:id', component: PromocionFormComponent},
    {path: 'promocion-lista', component: PromocionListaComponent},
    {path: 'login', component:LoginComponent}, 
    {path: 'alquiler-form', component: AlquilerFormComponent},
    {path: 'alquiler-form/:id', component: AlquilerFormComponent},
    {path: 'alquiler-lista', component: AlquilerListaComponent},
    {path: 'novedad-form', component: NovedadFormComponent},
    {path: 'novedad-form/:id', component: NovedadFormComponent},
    {path: 'novedad-lista', component: NovedadListaComponent},
    {path: 'local-lista', component: LocalComponent},
    {path: 'local-forms', component: LocalFormsComponent},
    {path: 'local-forms/:id', component: LocalFormsComponent},
    {path: 'estadistica', component: EstadisticaComponent},
    {path: 'cuota', component: CuotaComponent},
    {path: 'home', component: HomeComponent },
    {path: 'historial-pago', component: HistorialPagoComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home' },
];
