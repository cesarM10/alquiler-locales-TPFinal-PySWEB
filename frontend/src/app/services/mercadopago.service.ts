import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alquiler } from '../models/alquiler';
import { CuotaAlquiler } from '../dto/cuota-alquiler';
import { Cuota } from '../models/cuota';

declare var MercadoPago: any;

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {
  private mercadoPago: any;
  mesPago: number = 0;
  anioPago: number = 0;
  today: Date = new Date();

  readonly monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  urlBase: string = 'http://localhost:3000/api/mercadopago';

  constructor(private http: HttpClient) {
    this.mercadoPago = new MercadoPago("APP_USR-1536e292-06d7-4c55-b191-dceac72d056c", {
      locale: 'es-AR'
    });
  }

  obtenerUltimoMesPago(cuotas: Cuota[]){
    if (cuotas.length == 0){
      this.mesPago = this.today.getUTCMonth()+1;
      this.anioPago = this.today.getUTCFullYear();
      return;
    }
    
    var maxMesDePago = 0;
    var maxAnio = cuotas[0].anioPago;
    cuotas.forEach(cuota => {
      if (cuota.anioPago > maxAnio){
        maxAnio = cuota.anioPago;
        maxMesDePago = cuota.mesPago;
      }
    });
    
    cuotas.forEach(cuota => {
      if (cuota.anioPago == maxAnio && cuota.mesPago > maxMesDePago)
        maxMesDePago = cuota.mesPago;
    });

    maxMesDePago++;
    if(maxMesDePago >= 12 && maxAnio <= new Date().getUTCFullYear()){
      maxMesDePago = 1;
      maxAnio = new Date().getUTCFullYear() + 1;
    }

    this.mesPago = maxMesDePago;
    this.anioPago = maxAnio;
  }

  createPreference(cuotaAlquiler: CuotaAlquiler): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    this.obtenerUltimoMesPago(cuotaAlquiler.cuota)

    const orderData = {
      product_id: cuotaAlquiler.alquiler._id,
      title: "Pago de Alquiler",
      quantity: 1,
      description: this.mesPago+ "." + this.anioPago,
      price: cuotaAlquiler.alquiler.costoalquiler
    };

    const body = JSON.stringify(orderData);
    return this.http.post(`${this.urlBase}/create_preference`, body, httpOption);
  }

  async createCheckout(preferenceId: String) {
    await this.mercadoPago.bricks().create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
      customization: {
        texts: {
          valueProp: 'smart_option',
        },
      },
    });
  }

  formatDate(fechaAlquiler: Date) : String {
    const year = fechaAlquiler.getUTCFullYear();
    const month = String(fechaAlquiler.getUTCMonth() + 1).padStart(2, '0');
    const day = String(fechaAlquiler.getUTCDate()).padStart(2, '0');
    
    return `${day}-${month}-${year}`;
  }

  obtenerPago(payment_id: string){
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(this.urlBase + "/payment/" + payment_id, httpOption);
  }
}
