import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  apiUrl: string = 'http://localhost:8080/categoria';

  constructor(private http: HttpClient) {}

  obtenerCategorias() {
    return this.http.get(this.apiUrl);
  }

  agregarCategoria(categoria:Categoria){
    return this.http.post(this.apiUrl, categoria);
  }
}
