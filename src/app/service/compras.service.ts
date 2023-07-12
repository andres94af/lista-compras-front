import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra, DetalleCompra, REST_API_URL } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  apiUrl: string = REST_API_URL + '/compra';

  constructor(private http: HttpClient) {}

  obtenerCompras() {
    return this.http.get(this.apiUrl + '/usuario');
  }

  guardarCompra(compra: Compra, detalles: DetalleCompra[]) {
    const compraDetalle = {
      compra: compra,
      detalles: detalles,
    };
    return this.http.post(this.apiUrl, compraDetalle);
  }

  cambiarEstado(compraId: number) {
    return this.http.put(this.apiUrl, compraId);
  }

  eliminarCompra(compraId: number) {
    return this.http.delete(this.apiUrl + '/' + compraId);
  }
}
