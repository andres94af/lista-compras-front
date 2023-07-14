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
  imgId: string;
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
  fecha: Date;
  usuario: Usuario;
  total: number;
  completada: boolean;
}

export class DetalleCompra {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  total: number;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface NuevoUsuario {
  nombre: string;
  apellido: string;
  username: string;
  password: string;
}

// export const REST_API_URL:string = "http://localhost:8080"; // REST LOCALHOST Y BBDD LOCALHOST
export const REST_API_URL:string = "http://localhost:5000"; // REST LOCALHOST Y BBDD RDS
// export const REST_API_URL: string ='http://lista-compras.us-east-1.elasticbeanstalk.com'; //AWS - REST ELACTIC BEANSTALK Y BBDD RDS
