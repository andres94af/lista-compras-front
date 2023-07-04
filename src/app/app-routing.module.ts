import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './component/productos/productos.component';
import { ComprasComponent } from './component/compras/compras.component';
import { CategoriasComponent } from './component/categorias/categorias.component';

const routes: Routes = [
  {path: "productos", component: ProductosComponent},
  {path: "productos/:id", component: ProductosComponent},
  {path: "compras", component: ComprasComponent},
  {path: "categorias", component: CategoriasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
