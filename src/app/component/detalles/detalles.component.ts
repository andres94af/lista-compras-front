import { Component, Input } from '@angular/core';
import { DetalleCompra } from 'src/app/models/models';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styles: [],
})
export class DetallesComponent {

  @Input() detalles: DetalleCompra[];
  @Input() total:number;

  titulo: string = 'Detalles de compra';

  constructor() {}
}
