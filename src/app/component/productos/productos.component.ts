import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/models';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent {

  productos:Producto[];
  id:number;

  constructor(private rutaActiva: ActivatedRoute, private productoService:ProductoService){
    this.id = rutaActiva.snapshot.params['id'];
    if(this.id != null){
      productoService.obtenerProductosPorCategoria(this.id).subscribe(productosObt => {
        this.productos = Object.values(productosObt)
      })
    }else{
      productoService.obtenerProductos().subscribe(productosObt => {
        this.productos = Object.values(productosObt)
      })
    }
  }

}
