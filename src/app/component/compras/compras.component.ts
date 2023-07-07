import { Component, EventEmitter, Output } from '@angular/core';
import { Compra, DetalleCompra } from 'src/app/models/models';
import { ComprasService } from 'src/app/service/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: [
  ]
})
export class ComprasComponent {

  compras:Compra[]
  titulo:string = "Mis listados";
  detalles:DetalleCompra[];
  total:number;

  constructor(private compraService:ComprasService){
    //Valor quemado con 1, 
    //Deberia obtener el Id del usuario del localStorage! <-------------------------
    compraService.obtenerCompras(1).subscribe(comprasObt => {
      this.compras = Object.values(comprasObt);
    })
  }

  cargarDetalles(detalles:DetalleCompra[], total:number){
    this.detalles = detalles;
    this.total = total;
  }

}
