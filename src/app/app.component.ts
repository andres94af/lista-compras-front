import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  valorBusqueda: string = '';
  estaLogueado: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {
    const username = this.loginService.obtenerUsername();
    this.estaLogueado = this.loginService.estaLogueado();
  }

  buscarProducto() {
    if (this.valorBusqueda != '') {
      this.router.navigate(['productos/busqueda/' + this.valorBusqueda]);
      this.valorBusqueda = '';
    }
  }

  cerrarSesion() {
    var confirma: boolean = confirm(
      'Se cerrará la sesión y se eliminara el listado en curso. ¿Está seguro?'
    );
    if (confirma) {
      this.loginService.cerrarSesion();
      this.estaLogueado = this.loginService.estaLogueado();
      this.router.navigate(['/login']);
    }
  }
}
