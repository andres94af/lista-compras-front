import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REST_API_URL } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  apiUrl: string = REST_API_URL + '/compra';

  constructor(private http: HttpClient) { }

  obtenerCompras(id:number) {
    return this.http.get(this.apiUrl + '/usuario/'+id);
  }

  obtenerDetalleCompra(id:number){
    return this.http.get(this.apiUrl + '/detalle/'+id);
  }
}
