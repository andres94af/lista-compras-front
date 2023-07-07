import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra, DetalleCompra, REST_API_URL } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  apiUrl: string = REST_API_URL + '/compra';

  constructor(private http: HttpClient) { }

  obtenerCompras(id:number) {
    return this.http.get(this.apiUrl + '/usuario/'+id);
  }

  guardarCompra(compra:Compra, idUsuario:number){
    return this.http.post(this.apiUrl + '/' + idUsuario, compra);
  }
}
