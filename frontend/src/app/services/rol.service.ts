import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  urlHost: string = 'http://localhost:3000/api/rol/';

  constructor(private _http:HttpClient) { 

  }

getRoles(): Observable<any> {
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }
  return this._http.get(this.urlHost, httpOptions);
}

}
