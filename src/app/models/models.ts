export interface Categoria {
  id: number;
  nombre: string;
  productos: Producto[];
}

export interface Producto {
  id: number;
  nombre: string;
  informacion: string;
  imgUrl: string;
  precioUnitario: number;
  categoria: Categoria;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  password: string;
}

export interface Compra {
  id: number;
  usuario: Usuario;
  fecha: Date;
  detalles: DetalleCompra[];
  total: number;
  completada: boolean;
}

export interface DetalleCompra {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  total: number;
  compra: Compra;
}
