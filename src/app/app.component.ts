import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  valorBusqueda: string = "";

  constructor(private router: Router) {}

  buscarProducto() {
    if(this.valorBusqueda != ""){
      this.router.navigate(['productos/filtro/' + this.valorBusqueda]);
      this.valorBusqueda = "";
    }
  }
}
