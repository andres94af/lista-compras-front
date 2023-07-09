import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { REST_API_URL, Usuario } from '../models/models';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "http://localhost:8080/login";

  constructor(private usuarioService:UsuarioService, private http:HttpClient) { }

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
    return localStorage.getItem('token');
  }
}
