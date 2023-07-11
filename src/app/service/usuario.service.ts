import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REST_API_URL } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl: string = REST_API_URL + "/usuario";

  constructor(private http:HttpClient) { }

  nuevoUsuario(usuario:any){
    return this.http.post(this.apiUrl + '/nuevo', usuario);
  }

}
