import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor() {}

  getIdUsuario() {
    return Number(window.sessionStorage.getItem('id_usuario'));
  }

  setIdUsuario(id: number) {
    window.sessionStorage.setItem('id_usuario', id + '');
  }

  getNombreDeUsuario() {
    return window.sessionStorage.getItem('nombre_usuario');
  }

  setNombreDeUsuario(nombre: string) {
    window.sessionStorage.setItem('nombre_usuario', nombre);
  }
}
