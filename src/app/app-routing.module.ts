import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './component/productos/productos.component';
import { ComprasComponent } from './component/compras/compras.component';
import { CategoriasComponent } from './component/categorias/categorias.component';
import { InicioComponent } from './component/inicio/inicio.component';

const routes: Routes = [
  {path: "", component: InicioComponent},
  {path: "productos", component: ProductosComponent},//Muestra todos los productos
  {path: "productos/:id", component: ProductosComponent},//Muestra productos por categoria
  {path: "productos/filtro/:valorBusqueda", component: ProductosComponent},//Muestra productos filtrados por nombre
  {path: "compras/:idUsuario", component: ComprasComponent},
  {path: "categorias", component: CategoriasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
