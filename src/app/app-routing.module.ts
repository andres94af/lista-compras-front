import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './component/productos/productos.component';
import { ComprasComponent } from './component/compras/compras.component';
import { CategoriasComponent } from './component/categorias/categorias.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { ListadoComponent } from './component/listado/listado.component';

const routes: Routes = [
  { path: '', component: InicioComponent }, //Muestra pagna inicial
  { path: 'categorias', component: CategoriasComponent }, //Muestra listado de categorias
  { path: 'compras', component: ComprasComponent }, //Mustra las compras del usuario actual
  { path: 'listado', component: ListadoComponent }, //Muestra el listado actual
  { path: 'login', component: ListadoComponent }, //Muestra el listado actual
  { path: 'productos', component: ProductosComponent }, //Muestra todos los productos
  { path: 'productos/:idCategoria', component: ProductosComponent }, //Muestra productos por categoria
  { path: 'productos/busqueda/:valorBusqueda', component: ProductosComponent }, //Muestra productos filtrados por nombre
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
