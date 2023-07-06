import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Producto } from 'src/app/models/models';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: [],
})
export class ProductosComponent implements OnInit {

  titulo: string = 'Productos';
  productos: Producto[];
  producto:Producto;
  id:any;
  valorBusqueda:any;
  btnVisible:boolean = false;
  cantidadProducto:number;

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
          if(this.productos.length != 0){
            this.producto = this.productos[0];
            this.btnVisible = true;
          }
        });
    } else if (this.valorBusqueda != null) {
      this.productoService
        .obtenerProductosFiltrados(this.valorBusqueda)
        .subscribe((productosObt) => {
          this.productos = Object.values(productosObt);
          this.producto = this.productos[0];
          this.btnVisible = true;
        });
    } else {
      this.productoService.obtenerProductos().subscribe((productosObt) => {
        this.productos = Object.values(productosObt);
        this.producto = this.productos[0];
      });
    }
    
  }

  verDetallesDelProducto(producto:Producto){
    this.producto = producto;
  }

  //Por Hacer
  agregarALista(producto:Producto){
    console.log('Agregar: ' + producto.nombre + ' la cantidad de: ' + this.cantidadProducto);
  }


}
