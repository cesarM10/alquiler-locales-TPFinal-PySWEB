import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Local } from '../models/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  urlBase: string = "http://localhost:3000/api/";
  constructor(private http: HttpClient) {

  }

  //Servicio ver los locales
  getLocales(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    }
    return this.http.get(this.urlBase + "local/", httpOption);
  }

  //
  getLocalesFiltros(hab?: boolean, alq?: boolean): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    };
    if (hab !== undefined) {
      httpOption.params = httpOption.params.set('habilitado', hab.toString());
    }

    if (alq !== undefined) {
      httpOption.params = httpOption.params.set('alquilado', alq.toString());
    }
    return this.http.get(this.urlBase + "local/", httpOption);
  }


  //Servicio ver local por ID
  getLocal(_id: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
        .append('_id', _id)
    }

    return this.http.get(this.urlBase + "local/" + _id, httpOption);
  }

  //Servicio Crear Local
  postLocal(local: Local): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),

      params: new HttpParams()
    }

    let body = JSON.stringify(local); // Serializa el JSON

    return this.http.post(this.urlBase + "local/", body, httpOption);
  }

  //servicio Modificar Local
  putLocal(local: Local): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),

      params: new HttpParams()
        .append('_id', local._id)
    }

    let body = JSON.stringify(local);

    return this.http.put(this.urlBase + "local/" + local._id, body, httpOption);
  }


  //servicio Eliminar Local
  deleteLocal(_id: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
        .append('_id', _id)
    }

    return this.http.delete(this.urlBase + "local/" + _id, httpOption);
  }

  getLocalesPublicos(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
      }),
        params: new HttpParams()
      };
      
    return this.http.get(this.urlBase + "local/home", httpOption);
  }


}
