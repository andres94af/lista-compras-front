import { Component, EventEmitter, Output } from '@angular/core';
import { Compra, DetalleCompra } from 'src/app/models/models';
import { ComprasService } from 'src/app/service/compras.service';
import { DetallesService } from 'src/app/service/detalles.service';
import { UsuarioService } from 'src/app/service/usuario.service';

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
  idUsuario:number;

  constructor(private compraService:ComprasService, private detalleService:DetallesService, private usuarioService:UsuarioService){
    //Valor quemado con 1, 
    //Deberia obtener el Id del usuario del localStorage! <-------------------------
    this.idUsuario = this.usuarioService.getIdUsuario();

    this.compraService.obtenerCompras(this.idUsuario).subscribe(comprasObt => {
      this.compras = Object.values(comprasObt);
    })
  }

  cargarDetalles(idCompra:number, total:number){
    this.detalleService.obtenerDetalleCompra(idCompra).subscribe(detallesObt => {
      this.detalles = Object.values(detallesObt);
      this.total = total;
    });
  }

}
