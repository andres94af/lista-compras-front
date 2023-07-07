import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Compra, DetalleCompra } from 'src/app/models/models';
import { ComprasService } from 'src/app/service/compras.service';
import { DetallesService } from 'src/app/service/detalles.service';
import { UsuarioService } from 'src/app/service/usuario.service';

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

  compraGenerada:Object;

  constructor(private detalleService: DetallesService, private compraService:ComprasService, private usuarioService:UsuarioService, private router:Router) {
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

  generarListado(){
    let idUsuario = this.usuarioService.getIdUsuario();

    let nuevaCompra:Compra = new Compra();
    nuevaCompra.total = this.totalLista;
    nuevaCompra.completada = false;
    nuevaCompra.fecha = new Date();

    this.compraService.guardarCompra(nuevaCompra, idUsuario).subscribe(()=> this.router.navigate(['/compras']));
  }
}
