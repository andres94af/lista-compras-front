import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Categoria, DetalleCompra, Producto } from 'src/app/models/models';
import { CategoriaService } from 'src/app/service/categoria.service';
import { DetallesService } from 'src/app/service/detalles.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: [],
})
export class ProductosComponent implements OnInit {

  titulo: string = 'Productos';

  listadoDeProductos: Producto[];
  listadoDeDetalles: DetalleCompra[] = new Array();
  productoSeleccionado: Producto;
  paramIdProducto: any;
  valorBusqueda: any;
  btnVisible: boolean = false;
  cantidadProducto: number;
  categoriasSelect: Categoria[];
  datosFormulario = {
    nombre: '',
    informacion: '',
    imgUrl: '',
    idCategoria: '',
    precioUnitario: '',
  };

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private detalleService:DetallesService
  ) {
    this.categoriaService.obtenerCategorias().subscribe((categoriasObt) => {
      this.categoriasSelect = Object.values(categoriasObt);
    });

    this.route.paramMap.subscribe((params) => {
      this.paramIdProducto = params.get('id');
      this.valorBusqueda = params.get('valorBusqueda');
    });
  }

  ngOnInit(): void {
    if (this.paramIdProducto != null) {
      this.productoService
        .obtenerProductosPorCategoria(this.paramIdProducto)
        .subscribe((productosObt) => {
          this.listadoDeProductos = Object.values(productosObt);
          if (this.listadoDeProductos.length != 0) {
            this.btnVisible = true;
          }
        });
    } else if (this.valorBusqueda != null) {
      this.productoService
        .obtenerProductosFiltrados(this.valorBusqueda)
        .subscribe((productosObt) => {
          this.listadoDeProductos = Object.values(productosObt);
          this.btnVisible = true;
        });
    } else {
      this.productoService.obtenerProductos().subscribe((productosObt) => {
        this.listadoDeProductos = Object.values(productosObt);
      });
    }
  }

  verDetallesDelProducto(producto: Producto) {
    this.productoSeleccionado = producto;
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
    ) return;

    this.productoService.generarNuevoProducto(catId, producto)
      .subscribe((): void => this.verFormularioNuevoProducto());
  }

  agregarAListaActual() {
    if (this.cantidadProducto == 0 || this.cantidadProducto == null) return;
    this.detalleService.agregarAListado(this.nuevoDetalle()).subscribe(() => this.cantidadProducto = 0);
  }

  nuevoDetalle(){
    let detalle: DetalleCompra = new DetalleCompra();
    detalle.nombre = this.productoSeleccionado.nombre;
    detalle.precio = this.productoSeleccionado.precioUnitario;
    detalle.cantidad = this.cantidadProducto;
    detalle.total = this.productoSeleccionado.precioUnitario * this.cantidadProducto;
    return detalle;
  }
}
