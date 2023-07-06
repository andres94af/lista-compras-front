import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<p class="text-center">Listado de compras &copy; - {{autor}} - {{anio}}</p>`,
  styles: [
  ]
})
export class FooterComponent {

  autor:string = "Andres Mariano Fernández"
  anio:number = new Date().getFullYear();

}
