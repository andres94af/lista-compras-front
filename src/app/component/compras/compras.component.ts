import { Component } from '@angular/core';
import { Compra, DetalleCompra } from 'src/app/models/models';
import { ComprasService } from 'src/app/service/compras.service';
import { DetallesService } from 'src/app/service/detalles.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: [],
})
export class ComprasComponent {
  listadoDeCompras: Compra[] = [];
  titulo: string = 'Mis listados';
  detalles: DetalleCompra[];
  total: number;

  constructor(
    private compraService: ComprasService,
    private detalleService: DetallesService
  ) {
    this.compraService.obtenerCompras().subscribe((comprasObt) => {
      this.listadoDeCompras = Object.values(comprasObt);
    });
  }

  cargarDetalles(compraId: number, total: number) {
    this.detalleService
      .obtenerDetalleCompra(compraId)
      .subscribe((detallesObt) => {
        this.detalles = Object.values(detallesObt);
        this.total = total;
      });
  }

  eliminarCompra(compraId: number) {
    let estaSeguro: boolean = confirm('¿Está seguro de eliminar esta compra?');
    if (estaSeguro) {
      this.compraService
        .eliminarCompra(compraId)
        .subscribe(() => window.location.reload());
    }
  }

  cambiarEstadoCompra(compraId: number) {
    this.compraService.cambiarEstado(compraId).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => console.log(err),
    });
  }

  noTieneCompras() {
    return this.listadoDeCompras.length === 0;
  }
}
