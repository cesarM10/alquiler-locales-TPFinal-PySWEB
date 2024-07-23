import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuota } from '../models/cuota';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {
  urlBase: string = "http://localhost:3000/api/alquiler/cuota/";
  
  constructor(private http: HttpClient) { }
  
  generarCuotaMercadoPago(cuota : Cuota) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { cuota };
    return this.http.post(this.urlBase, body, { headers: headers });
  }
}
