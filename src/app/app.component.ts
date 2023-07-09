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
    const token = this.loginService.obtenerToken();
    if (token) {
      this.estaLogueado = true;
    }
  }

  buscarProducto() {
    if (this.valorBusqueda != '') {
      this.router.navigate(['productos/busqueda/' + this.valorBusqueda]);
      this.valorBusqueda = '';
    }
  }

  cerrarSesion() {
    this.loginService.cerrarSesion().subscribe();
    this.estaLogueado = false;
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
