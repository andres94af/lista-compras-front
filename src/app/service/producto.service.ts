import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  obtenerProductos() {
    return this.http.get(this.apiUrl + '/producto');
  }

  obtenerProductosPorCategoria(id:number) {
    return this.http.get(this.apiUrl + '/categoria/'+id);
  }
}
