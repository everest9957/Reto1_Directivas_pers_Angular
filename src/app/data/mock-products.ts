// src/app/data/mock-products.ts
import { Product } from '../models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  { id: 1,  nombre: 'Portátil Pro 15',       categoria: 'Electrónica', fechaAlta: '2024-03-12', precio: 1299.99, stock: 15,  valoracion: 4.7 },
  { id: 2,  nombre: 'Auriculares BT Max',    categoria: 'Electrónica', fechaAlta: '2024-06-05', precio: 149.50,  stock: 42,  valoracion: 4.3 },
  { id: 3,  nombre: 'Camiseta Algodón',      categoria: 'Ropa',        fechaAlta: '2023-11-20', precio: 19.99,   stock: 120, valoracion: 4.1 },
  { id: 4,  nombre: 'Sartén Antiadherente',  categoria: 'Hogar',       fechaAlta: '2024-01-15', precio: 34.90,   stock: 60,  valoracion: 4.5 },
  { id: 5,  nombre: 'Balón Fútbol Pro',      categoria: 'Deportes',    fechaAlta: '2024-08-01', precio: 24.99,   stock: 200, valoracion: 4.6 },
  { id: 6,  nombre: 'Clean Code',            categoria: 'Libros',      fechaAlta: '2023-05-10', precio: 39.95,   stock: 30,  valoracion: 4.9 },
  { id: 7,  nombre: 'Monitor 27" 4K',        categoria: 'Electrónica', fechaAlta: '2024-09-22', precio: 449.00,  stock: 8,   valoracion: 4.8 },
  { id: 8,  nombre: 'Zapatillas Running',    categoria: 'Deportes',    fechaAlta: '2024-02-14', precio: 89.90,   stock: 55,  valoracion: 4.4 },
  { id: 9,  nombre: 'Lámpara LED Escritorio',categoria: 'Hogar',       fechaAlta: '2024-04-30', precio: 27.50,   stock: 90,  valoracion: 4.2 },
  { id: 10, nombre: 'El Quijote (ed. lujo)', categoria: 'Libros',      fechaAlta: '2023-09-01', precio: 55.00,   stock: 12,  valoracion: 5.0 },
  { id: 11, nombre: 'Teclado Mecánico RGB',  categoria: 'Electrónica', fechaAlta: '2024-07-11', precio: 119.00,  stock: 25,  valoracion: 4.6 },
  { id: 12, nombre: 'Chaqueta Impermeable',  categoria: 'Ropa',        fechaAlta: '2023-12-05', precio: 79.90,   stock: 40,  valoracion: 4.3 },
];