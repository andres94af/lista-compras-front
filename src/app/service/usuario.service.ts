import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  constructor() {}

  getIdUsuario() {
    return Number(window.localStorage.getItem('id_usuario'));
  }

  setIdUsuario(id: number) {
    window.localStorage.setItem('id_usuario', id + '');
  }
}
