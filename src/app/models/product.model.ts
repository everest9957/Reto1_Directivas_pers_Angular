// src/app/models/product.model.ts

export interface Product {
  id: number;
  nombre: string;
  categoria: 'Electrónica' | 'Ropa' | 'Hogar' | 'Deportes' | 'Libros';
  fechaAlta: string;   // ISO: YYYY-MM-DD
  precio: number;
  stock: number;
  valoracion: number;  // 0 a 5
}