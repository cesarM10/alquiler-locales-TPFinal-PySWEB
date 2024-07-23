import { Component, OnInit } from '@angular/core';
import { CuotaService } from '../../services/cuota.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MercadopagoService } from '../../services/mercadopago.service';
import { PagoService } from '../../services/pago.service';
import { Cuota } from '../../models/cuota';
import { EstadosPago } from '../../helpers/constantes';
import { Pago } from '../../models/pago';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cuota',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cuota.component.html',
  styleUrl: './cuota.component.css',
})
export class CuotaComponent implements OnInit{
  estados = EstadosPago;
  estadoPago: String = "";
  btnPagarAlquiler: Boolean = false;
  preferenceId: String = "";
  totalPagar: number = 0;
  mesActual: string = "";
  anioActual: string = "";

  readonly monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private cuotaService: CuotaService, 
    private mercadopagoService: MercadopagoService,
    private pagoService: PagoService,
    private authService: AuthService){

      if(!this.authService.isLoggedIn()){
        this.router.navigateByUrl("/home");
      }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      const status = params['status'];
      const preferenceId = params['preferenceId'];
      const totalPagar = params['totalPagar'];
      
      if (status == "null") {
        this.router.navigateByUrl('/alquiler-lista');
      }
      
      if (status != null && status == "approved"){
        await this.registrarPago(params['payment_id']);
      }

      if (preferenceId != null){
        this.estadoPago = this.estados.PENDIENTE;
        this.preferenceId = preferenceId;
        this.totalPagar = totalPagar;
        this.mesActual = this.monthNames[params["mesPago"]-1];
        this.anioActual = params["anioPago"];
      }
    });
  }

  pagarAlquiler(){
    this.btnPagarAlquiler = true;
    this.createCheckoutButton();
  }

  createCheckoutButton(){
    this.mercadopagoService.createCheckout(this.preferenceId);
  }

  async registrarPago(payment_id: string){
    try{
      var mercadoPagoResponse = await this.obtenerPagoMercadoPago(payment_id);
      var cuotaResponse = await this.registrarCuotaMercadoPago(mercadoPagoResponse);
      var pagoResponse = await this.registrarPagoMercadoPago(cuotaResponse.cuotaId, mercadoPagoResponse.transaction_amount);
      if (Boolean(pagoResponse.status)){
        this.estadoPago = this.estados.APROBADO;
      }else{
        this.estadoPago = this.estados.ERROR;
      }
    }catch(error){
      console.error(error);
      this.estadoPago = this.estados.ERROR;
    }
  }

  private async obtenerPagoMercadoPago(payment_id: string): Promise<any> {
    try {
      const result = await this.mercadopagoService.obtenerPago(payment_id).toPromise();
      return result;
    } catch (error) {
      console.error('Error al obtener el pago desde MercadoPago:', error);
      throw error;
    }
  }

  private async registrarCuotaMercadoPago(mercadoPagoResponse : any) : Promise<any>{
    var alquilerResponse = mercadoPagoResponse.additional_info.items[0];
    var fechaSplit = alquilerResponse.description.split(".");
    var mesDePago = Number(fechaSplit[0]);
    var anioPago = Number(fechaSplit[1]);

    if(mesDePago == 12 && anioPago < new Date().getUTCFullYear()){
      mesDePago = 1;
      anioPago = new Date().getUTCFullYear();
    }

    var cuota = new Cuota();
    cuota.alquiler = alquilerResponse.id;
    cuota.estadoPago = this.estados.APROBADO;
    cuota.mesPago = mesDePago;
    cuota.anioPago = anioPago;
    cuota.montoPago = Number(alquilerResponse.unit_price);
    cuota.idMercadoPago = String(mercadoPagoResponse.id);

    try {
      const result = await this.cuotaService.generarCuotaMercadoPago(cuota).toPromise();
      return result;
    } catch (error) {
      console.error('Error al registrar la cuota:', error);
      throw error;
    }
  }

  private async registrarPagoMercadoPago(cuotaId : string, amount: number) : Promise<any>{
    var pago = new Pago();
    pago.cuota = cuotaId;
    pago.fechaPago = new Date();
    pago.importe = amount,
    pago.metodoPago = "Mercadopago"
    try {
      const result = await this.pagoService.generarPagoMercadoPago(pago).toPromise();
      return result;
    } catch (error) {
      console.error('Error al registrar el pago:', error);
      throw error;
    }
  }
}