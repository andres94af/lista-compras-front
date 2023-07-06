import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Categoria, Producto } from 'src/app/models/models';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: [],
})
export class ProductosComponent implements OnInit {
  titulo: string = 'Productos';
  productos: Producto[];
  producto: Producto;
  id: any;
  valorBusqueda: any;
  btnVisible: boolean = false;
  cantidadProducto: number;
  categorias: Categoria[];
  datosFormulario = {
    nombre: '',
    informacion: '',
    imgUrl: '',
    precioUnitario: '',
    idCategoria: '',
  };

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {
    this.categoriaService.obtenerCategorias().subscribe((categoriasObt) => {
      this.categorias = Object.values(categoriasObt);
    });

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.valorBusqueda = params.get('valorBusqueda');
    });
  }

  ngOnInit(): void {
    if (this.id != null) {
      this.productoService
        .obtenerProductosPorCategoria(this.id)
        .subscribe((productosObt) => {
          this.productos = Object.values(productosObt);
          if (this.productos.length != 0) {
            this.btnVisible = true;
          }
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

  verDetallesDelProducto(producto: Producto) {
    this.producto = producto;
  }

  verFormularioNuevoProducto() {
    window.location.reload();
  }

  guardarNuevoProducto() {
    let producto: Producto = new Producto();
    producto.nombre = this.datosFormulario.nombre;
    producto.informacion = this.datosFormulario.informacion;
    producto.imgUrl = this.datosFormulario.imgUrl;
    producto.precioUnitario = Number(this.datosFormulario.precioUnitario);
    let catId: string = this.datosFormulario.idCategoria;

    if (
      producto.nombre == '' ||
      producto.informacion == '' ||
      producto.imgUrl == '' ||
      catId == '' ||
      producto.precioUnitario == 0
    ) {
      return;
    }
    this.productoService
      .generarNuevoProducto(catId, producto)
      .subscribe((productoObt) => {
        console.log(productoObt);
        this.verFormularioNuevoProducto();
      });
  }

  //Por Hacer
  agregarAListaDeCompras(producto: Producto) {
    console.log(
      'Agregar: ' +
        producto.nombre +
        ' la cantidad de: ' +
        this.cantidadProducto
    );
  }
}
