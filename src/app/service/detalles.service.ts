import { Injectable } from '@angular/core';
import { DetalleCompra, Producto } from '../models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DetallesService {
  apiUrl: string = 'http://localhost:8080/detalle';

  constructor(private http:HttpClient) {}

  agregarAListado(detalle:DetalleCompra) {
    return this.http.post(this.apiUrl + '/agregar', detalle);
  }
}
