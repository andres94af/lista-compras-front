import { Injectable } from '@angular/core';
import { REST_API_URL } from '../models/models';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = REST_API_URL + "/login";

  constructor(private http:HttpClient, private router:Router) { }

  iniciarSesion(creds:any){
    return this.http.post(this.apiUrl, creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');
      
      sessionStorage.setItem('token', token);
      return body;
    }))
  }

  obtenerToken(){
    return sessionStorage.getItem('token');
  }

  cerrarSesion(){
    return this.http.get(REST_API_URL + '/logout');
  }
}
