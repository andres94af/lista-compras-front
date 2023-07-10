import { Injectable } from '@angular/core';
import { DetalleCompra, REST_API_URL } from '../models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DetallesService {

  apiUrl: string = REST_API_URL + '/detalle';
  
  constructor(private http:HttpClient) {
  }

  obtenerListadoActual(){
    const listaDetalles = JSON.parse(sessionStorage.getItem("lista_act")!);
    return listaDetalles;
  }

  agregarAListado(detalle:DetalleCompra) {
    const listaActual = this.obtenerListadoActual();
    listaActual.push(detalle);
    sessionStorage.setItem("lista_act", JSON.stringify(listaActual));
    return listaActual;
  }

  limpiarListaActual(){
    const listadoLimpio:DetalleCompra[] = [];
    sessionStorage.setItem("lista_act", JSON.stringify(listadoLimpio));
  }

  obtenerDetalleCompra(id:number){
    return this.http.get(this.apiUrl + '/'+id);
  }
}
