import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<p class="text-center my-3">Listado de compras &copy; - {{autor}} - {{anio}}</p>`,
  styles: [
  ]
})
export class FooterComponent {

  autor:string = "Andres M. Fernández"
  anio:number = new Date().getFullYear();

}
