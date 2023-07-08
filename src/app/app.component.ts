import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  valorBusqueda: string = "";

  constructor(private router: Router, private usuarioService:UsuarioService) {
  }

  buscarProducto() {
    if(this.valorBusqueda != ""){
      this.router.navigate(['productos/busqueda/' + this.valorBusqueda]);
      this.valorBusqueda = "";
    }
  }
}
