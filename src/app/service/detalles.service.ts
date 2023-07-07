import { Injectable } from '@angular/core';
import { DetalleCompra, Producto, REST_API_URL } from '../models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DetallesService {

  apiUrl: string = REST_API_URL + '/detalle';

  constructor(private http:HttpClient) {}

  obtenerListadoActual(){
    return this.http.get(this.apiUrl);
  }

  agregarAListado(detalle:DetalleCompra) {
    return this.http.post(this.apiUrl + '/agregar', detalle);
  }

  limpiarListaActual(){
    return this.http.get(this.apiUrl + '/eliminar');
  }
}
