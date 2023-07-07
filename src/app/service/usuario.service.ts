import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  id:number;

  constructor() {
    this.id = 1;
   }

  getIdUsuario(){
    return this.id;
  }

  setIdUsuario(id:number){
    this.id = id;
  }
}
