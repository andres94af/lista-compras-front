import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto, REST_API_URL } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  apiUrl: string = REST_API_URL + '/producto';

  constructor(private http: HttpClient) {}

  obtenerProductos() {
    return this.http.get(this.apiUrl + '/listar');
  }

  obtenerProductosPorCategoria(id: number) {
    return this.http.get(this.apiUrl + '/listar/' + id);
  }

  obtenerProductosFiltrados(valorFiltro: string) {
    return this.http.get(this.apiUrl + '/listar/filtrado/' + valorFiltro);
  }

  generarNuevoProducto(catId: string, producto: Producto) {
    return this.http.post(this.apiUrl + '/' + catId, producto);
  }
}
