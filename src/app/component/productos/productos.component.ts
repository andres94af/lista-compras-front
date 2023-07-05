import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Producto } from 'src/app/models/models';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [],
})
export class ProductosComponent implements OnInit {
  productos: Producto[];
  titulo: string = 'Productos';
  id:any;
  valorBusqueda:any;
  btnVisible:boolean = false;

  constructor(private route: ActivatedRoute, private productoService: ProductoService) {
    this.route.paramMap.subscribe(params =>{
      this.id = params.get('id');
      this.valorBusqueda = params.get('valorBusqueda');
    })
  }

  ngOnInit(): void {
    if (this.id != null) {
      this.productoService
        .obtenerProductosPorCategoria(this.id)
        .subscribe((productosObt) => {
          this.productos = Object.values(productosObt);
          this.btnVisible = true;
        });
    } else if (this.valorBusqueda != null) {
      this.productoService
        .obtenerProductosFiltrados(this.valorBusqueda)
        .subscribe((productosObt) => {
          this.productos = Object.values(productosObt);
          this.btnVisible = true;
        });
    } else {
      this.productoService.obtenerProductos().subscribe((productosObt) => {
        this.productos = Object.values(productosObt);
      });
    }
  }
}
