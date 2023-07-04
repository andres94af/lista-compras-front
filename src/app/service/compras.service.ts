import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  obtenerCompras(id:number) {
    return this.http.get(this.apiUrl + '/compra/usuario/'+id);
  }

  obtenerDetalleCompra(id:number){
    return this.http.get(this.apiUrl + '/compra/detalle/'+id);
  }
}
