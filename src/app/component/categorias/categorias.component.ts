import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/models';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [],
})
export class CategoriasComponent {
  categorias: Categoria[];
  categoria: Categoria;
  nombreCategoria: string;
  titulo: string = 'Categorías';
  formAgregar: boolean = false;

  constructor(
    private router: Router,
    private categoriaService: CategoriaService
  ) {
    categoriaService.obtenerCategorias().subscribe((categoriasObt) => {
      this.categorias = Object.values(categoriasObt);
    });
  }

  verProductosPorCategoria(id: number) {
    this.router.navigate(['productos/' + id]);
  }

  nuevaCategoria() {
    this.formAgregar = true;
  }

  agregarCategoria() {
    if (this.nombreCategoria != undefined) {
      this.categoria = new Categoria();
      this.categoria.nombre = this.nombreCategoria;
      this.categoriaService
        .agregarCategoria(this.categoria)
        .subscribe((datos) => {
          window.location.reload();
        });
    }
  }
}
