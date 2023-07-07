import { Component } from '@angular/core';
import { DetalleCompra } from 'src/app/models/models';
import { DetallesService } from 'src/app/service/detalles.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [],
})
export class ListadoComponent {

  titulo: string = 'Listado actual';

  comenzarLista:boolean = false;

  listadoDeDetalles: DetalleCompra[];

  totalLista:number = 0;

  constructor(private detalleService: DetallesService) {
    this.detalleService.obtenerListadoActual().subscribe((detallesObt) => {
      this.listadoDeDetalles = Object.values(detallesObt);
      this.totalLista = this.listadoDeDetalles.reduce((total, detalle) => total + detalle.total, 0);
      if (this.listadoDeDetalles.length > 0) {
        this.comenzarLista = true;
      }
    });
  }

  limpiarLista(){
    let estaSeguro:boolean = confirm("¿Esta seguro de eliminar todos los elementos de la lista?")
    if (estaSeguro) {
      this.detalleService.limpiarListaActual().subscribe(()=> window.location.reload());
    }
  }
}
