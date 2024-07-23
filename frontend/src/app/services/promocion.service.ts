import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocion } from '../models/promocion';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  urlBase: string = 'http://localhost:3000/api/promocion/';

  constructor(private http: HttpClient) { }

  getPromociones(): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(this.urlBase, httpOption);
  }

  getPromocionesFiltro(sortOrder: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
      params: new HttpParams()
      .append('sortOrder', sortOrder)
    };
    return this.http.get(this.urlBase, httpOption);
  }

  getPromocionById(idPromocion: string): Observable<Promocion>{
    let httpOption ={
      headers: new HttpHeaders({

      })
    }

    return this.http.get<Promocion>(this.urlBase + idPromocion, httpOption)
  }

  getPromocionesPublicas(): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        
      })
    }
    return this.http.get(this.urlBase + 'home', httpOption);
  }

  postPromocion(promocion: Promocion): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body: any = JSON.stringify(promocion)
    return this.http.post(this.urlBase, body, httpOption)
  }

  updatePromocion(promocion: Promocion): Observable<Promocion>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put<Promocion>(this.urlBase + promocion._id, promocion, httpOption)
  }

  deletePromocionById(idPromocion: string): Observable<Promocion>{
    let httpOtion = {
      headers:  new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete<Promocion>(this.urlBase + idPromocion, httpOtion);
  }
}
