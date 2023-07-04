import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  obtenerCategorias() {
    return this.http.get(this.apiUrl + '/categoria');
  }
}
