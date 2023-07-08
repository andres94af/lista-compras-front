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
    idCategoria: '',
    precioUnitario: '',
  };
  img: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private cloudinaryService:CloudinaryService,
    private detalleService: DetallesService
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
    )  return;

    this.cloudinaryService.subirImagen(this.img).subscribe(
      imageUrl => {
        producto.imgUrl = imageUrl.secure_url;
        producto.imgId = imageUrl.public_id;
        this.productoService
        .generarNuevoProducto(catId, producto)
        .subscribe((): void => this.verFormularioNuevoProducto());
      },
      error => {
        console.error('Error al subir la imagen', error);
      }
    );
  }

  agregarAListaActual() {
    if (this.cantidadProducto == 0 || this.cantidadProducto == null) return;
    this.detalleService.agregarAListado(this.nuevoDetalle()).subscribe(() => {
      this.cantidadProducto = 0;
      this.router.navigate(['listado']);
    });
  }

  nuevoDetalle() {
    let detalle: DetalleCompra = new DetalleCompra();
    detalle.nombre = this.productoSeleccionado.nombre;
    detalle.precio = this.productoSeleccionado.precioUnitario;
    detalle.cantidad = this.cantidadProducto;
    detalle.total = this.productoSeleccionado.precioUnitario * this.cantidadProducto;
    detalle.total = Number(detalle.total.toFixed(2));
    return detalle;
  }
}
