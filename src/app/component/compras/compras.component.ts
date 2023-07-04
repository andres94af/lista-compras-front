import { Component } from '@angular/core';
import { Compra } from 'src/app/models/models';
import { ComprasService } from 'src/app/service/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: [
  ]
})
export class ComprasComponent {

  compras:Compra[]

  constructor(private compraService:ComprasService){
    //Valor quemado con 1 !!!!!!<-----------------------------------
    compraService.obtenerCompras(1).subscribe(comprasObt => {
      console.log(comprasObt)
      this.compras = Object.values(comprasObt);
    })
  }

  cargarDetalleCompra(id:number){
    this.compraService.obtenerDetalleCompra(id).subscribe(detalleObt => {
      console.log(detalleObt);
    })
  }

}
