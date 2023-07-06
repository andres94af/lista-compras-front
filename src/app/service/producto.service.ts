import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  apiUrl: string = 'http://localhost:8080/producto';
  
  constructor(private http: HttpClient) { }
  
  obtenerProductos() {
    return this.http.get(this.apiUrl);
  }
  
  obtenerProductosPorCategoria(id:number) {
    return this.http.get(this.apiUrl + '/'+id);
  }

  obtenerProductosFiltrados(valorFiltro: string) {
    return this.http.get(this.apiUrl + '/filtrado/' + valorFiltro);
  }
}
