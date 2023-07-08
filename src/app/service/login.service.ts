import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { REST_API_URL, Usuario } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = REST_API_URL + '/usuario';

  constructor(private usuarioService:UsuarioService) { }

  iniciarSesion(email:string, password:string){
    let usuario:Usuario = new Usuario();
    usuario.id = 1;
    usuario.nombre =  "Andres"
    usuario.apellido = "Fernandez"
    usuario.username = email;
    usuario.password = password;
    this.usuarioService.setIdUsuario(usuario.id);
    this.usuarioService.setNombreDeUsuario(usuario.nombre);
    return true;
  }
}
