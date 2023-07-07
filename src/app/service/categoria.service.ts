import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria, REST_API_URL } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  apiUrl: string = REST_API_URL + '/categoria';

  constructor(private http: HttpClient) {}

  obtenerCategorias() {
    return this.http.get(this.apiUrl);
  }

  agregarCategoria(categoria:Categoria){
    return this.http.post(this.apiUrl, categoria);
  }
}
