import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Compra, DetalleCompra } from 'src/app/models/models';
import { ComprasService } from 'src/app/service/compras.service';
import { DetallesService } from 'src/app/service/detalles.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [],
})
export class ListadoComponent {

  titulo: string = 'Listado actual';

  listadoDeDetalles: DetalleCompra[] = [];

  totalLista:number = 0;

  compraGenerada:Object;

  constructor(private detalleService: DetallesService, private compraService:ComprasService, private router:Router) {
    this.listadoDeDetalles = this.detalleService.obtenerListadoActual();
    this.totalLista = this.listadoDeDetalles.reduce((total, detalle) => total + detalle.total, 0);
  }

  limpiarLista(){
    let estaSeguro:boolean = confirm("¿Esta seguro de eliminar todos los elementos de la lista?")
    if (estaSeguro) {
      this.detalleService.limpiarListaActual();
      window.location.reload();
    }
  }

  generarListado(){
      const detallesCompra = this.detalleService.obtenerListadoActual();
      const nuevaCompra:Compra = new Compra();
      nuevaCompra.total = this.totalLista;
      nuevaCompra.completada = false;
      nuevaCompra.fecha = new Date();
      this.compraService.guardarCompra(nuevaCompra, detallesCompra).subscribe(()=> {
        this.detalleService.limpiarListaActual();
        this.router.navigate(['/compras']);
      });
  }

  listaDetalleVacia(){
    return this.listadoDeDetalles.length === 0;
  }
}
