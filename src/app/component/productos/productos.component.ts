import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Categoria, DetalleCompra, Producto } from 'src/app/models/models';
import { CategoriaService } from 'src/app/service/categoria.service';
import { CloudinaryService } from 'src/app/service/cloudinary.service';
import { DetallesService } from 'src/app/service/detalles.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: [],
})
export class ProductosComponent implements OnInit {
  titulo: string = 'Productos';

  categoriasSelect: Categoria[];
  listadoDeDetalles: DetalleCompra[] = new Array();
  productoSeleccionado: Producto;
  listadoDeProductos: Producto[] = new Array();

  paramIdCategoria: any;
  paramValorBusqueda: any;

  btnLimpiarFiltro: boolean = false;
  btnNuevoProducto:boolean = false;

  cantidadProducto: number;
  datosFormulario = {
    nombre: '',
    informacion: '',
    idCategoria: '',
    precioUnitario: '',
  };
  img: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private cloudinaryService: CloudinaryService,
    private detalleService: DetallesService
  ) {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (categoriasObt) => {
        this.categoriasSelect = Object.values(categoriasObt);
      },
      error: (err) => console.log('No se pudieron cargar las categorias', err),
    });

    this.route.paramMap.subscribe((params) => {
      this.paramIdCategoria = params.get('idCategoria');
      this.paramValorBusqueda = params.get('valorBusqueda');
    });
  }

  ngOnInit(): void {
    //Si existe un parametro idCategoria asigna a la variable productos, los productos objtenidos filtrados por categoria
    if (this.paramIdCategoria != null) {
      this.productoService
        .obtenerProductosPorCategoria(this.paramIdCategoria).subscribe({
          next: (productosObt) => {
            this.listadoDeProductos = Object.values(productosObt);
            if (this.listadoDeProductos.length != 0) this.btnLimpiarFiltro = true;
          },
          error: (err) => console.log('Error al obtener productos', err),
        });
    //Si existe un parametro valorBusqueda asigna a la variable productos, los productos obtenidos filtrados por nombre
    } else if (this.paramValorBusqueda != null) {
      this.productoService
        .obtenerProductosFiltrados(this.paramValorBusqueda)
        .subscribe({
          next: (productosObt) => {
            this.listadoDeProductos = Object.values(productosObt);
            this.btnLimpiarFiltro = true;
          },
          error: (err) => console.log('Error al obtener productos', err),
        });
    //Si no existe ninguno de los parametros anteriores retorna la lista completa de productos
    } else {
      this.productoService.obtenerProductos().subscribe({
        next: (productosObt) => {
          this.listadoDeProductos = Object.values(productosObt);
        },
        error: (err) => console.log('Error al obtener productos', err),
      });
    }
  }

  verDetallesDelProducto(producto: Producto) {
    this.productoSeleccionado = producto;
    this.btnNuevoProducto = true;
  }

  verFormularioNuevoProducto() {
    window.location.reload();
  }

  cambioImagen(event: any) {
    this.img = event.target.files[0];
  }

  guardarNuevoProducto() {
    let producto: Producto = new Producto();
    producto.nombre = this.datosFormulario.nombre;
    producto.informacion = this.datosFormulario.informacion;
    producto.precioUnitario = Number(this.datosFormulario.precioUnitario);
    let catId: string = this.datosFormulario.idCategoria;

    if (
      producto.nombre == '' ||
      producto.informacion == '' ||
      catId == '' ||
      producto.precioUnitario == 0 ||
      !this.img
    )
      return;

    this.cloudinaryService.subirImagen(this.img).subscribe({
      next: (imageObt) => {
        producto.imgUrl = imageObt.secure_url;
        producto.imgId = imageObt.public_id;
        this.productoService
          .generarNuevoProducto(catId, producto)
          .subscribe((): void => this.verFormularioNuevoProducto());
      },
      error: (err) => console.error('Error al subir la imagen', err),
    });
  }

  agregarAListaActual() {
    if (this.cantidadProducto == 0 || this.cantidadProducto == null) return;
    this.detalleService.agregarAListado(this.nuevoDetalle()).subscribe({
      next: () => {
        this.cantidadProducto = 0;
        this.router.navigate(['listado']);
      },
      error: (err) => console.error('Error al subir la imagen', err),
    });
  }

  nuevoDetalle() {
    let detalle: DetalleCompra = new DetalleCompra();
    detalle.nombre = this.productoSeleccionado.nombre;
    detalle.precio = this.productoSeleccionado.precioUnitario;
    detalle.cantidad = this.cantidadProducto;
    detalle.total =
      this.productoSeleccionado.precioUnitario * this.cantidadProducto;
    detalle.total = Number(detalle.total.toFixed(2));
    return detalle;
  }
}
