export class Categoria {
  id: number;
  nombre: string;
  productos: Producto[];
}

export class Producto {
  id: number;
  nombre: string;
  informacion: string;
  imgUrl: string;
  precioUnitario: number;
  categoria: Categoria;
}

export class Usuario {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  password: string;
}

export class Compra {
  id: number;
  usuario: Usuario;
  fecha: Date;
  detalles: DetalleCompra[];
  total: number;
  completada: boolean;
}

export class DetalleCompra {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  total: number;
  // compra: Compra;
}

export const REST_API_URL:string = "http://localhost:8080";
