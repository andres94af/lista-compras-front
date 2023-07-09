import { Component, EventEmitter, Output } from '@angular/core';
import { Compra, DetalleCompra } from 'src/app/models/models';
import { ComprasService } from 'src/app/service/compras.service';
import { DetallesService } from 'src/app/service/detalles.service';
import { LoginService } from 'src/app/service/login.service';

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

  constructor(private compraService:ComprasService, private detalleService:DetallesService, private loginService:LoginService){
      this.compraService.obtenerCompras().subscribe(comprasObt => {
        this.compras = Object.values(comprasObt);
      })
  }

  cargarDetalles(idCompra:number, total:number){
    this.detalleService.obtenerDetalleCompra(idCompra).subscribe(detallesObt => {
      this.detalles = Object.values(detallesObt);
      this.total = total;
    });
  }

  eliminarCompra(compraId:number){
    let estaSeguro:boolean = confirm("¿Está seguro de eliminar esta compra?")
    if (estaSeguro) {
      this.compraService.eliminarCompra(compraId).subscribe(()=> window.location.reload());
    }
  }

}
