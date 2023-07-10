import { Injectable } from '@angular/core';
import { DetalleCompra, REST_API_URL } from '../models/models';
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
      const listadoActualDetalles:DetalleCompra[] = [];
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');
      const username = body.username;
      
      sessionStorage.setItem("lista_act", JSON.stringify(listadoActualDetalles));
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('username', username);
      return body;
    }))
  }

  obtenerToken(){
    return sessionStorage.getItem('token');
  }

  obtenerUsername(){
    return sessionStorage.getItem('username');
  }

  cerrarSesion(){
    return this.http.get(REST_API_URL + '/logout');
  }
}
