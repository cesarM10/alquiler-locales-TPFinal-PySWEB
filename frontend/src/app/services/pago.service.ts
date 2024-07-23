import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  urlBase: string = "http://localhost:3000/api/alquiler/pago/";
  
  constructor(private http: HttpClient) { }
  
  generarPagoMercadoPago(pago: Pago) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { pago };
    return this.http.post(this.urlBase, body, { headers: headers });
  }
}
