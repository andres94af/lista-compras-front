import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  apiUrl: string = 'http://localhost:8080/compra';

  constructor(private http: HttpClient) { }

  obtenerCompras(id:number) {
    return this.http.get(this.apiUrl + '/usuario/'+id);
  }

  obtenerDetalleCompra(id:number){
    return this.http.get(this.apiUrl + '/detalle/'+id);
  }
}
