import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/models';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [
  ]
})
export class CategoriasComponent {

  categorias:Categoria[];

  constructor(private router:Router, private categoriaService:CategoriaService){
    categoriaService.obtenerCategorias().subscribe(categoriasObt =>{
      this.categorias = Object.values(categoriasObt);
    });
  }

  verProductosPorCategoria(id:number){
    this.router.navigate(["productos/" + id]);
  }
}
