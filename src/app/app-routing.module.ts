import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './component/productos/productos.component';
import { ComprasComponent } from './component/compras/compras.component';
import { CategoriasComponent } from './component/categorias/categorias.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { ListadoComponent } from './component/listado/listado.component';
import { LoginComponent } from './component/login/login.component';
import { LoginGuard } from './helpers/login.guard';
import { AuthGuard } from './helpers/auth.guard';
import { RegistroComponent } from './component/registro/registro.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'compras', component: ComprasComponent, canActivate:[AuthGuard] },
  { path: 'listado', component: ListadoComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard] },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/:idCategoria', component: ProductosComponent },
  { path: 'productos/busqueda/:valorBusqueda', component: ProductosComponent },
  { path: 'registro', component: RegistroComponent, canActivate:[LoginGuard]  },
  { path: '**', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
