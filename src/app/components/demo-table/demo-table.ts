import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableFilterSortDirective } from '../../directives/table-filter-sort.directive';
import { Product } from '../../models/product.model';
import { MOCK_PRODUCTS } from '../../data/mock-products';
import { FilterConfig, SortConfig, FilterOperator } from '../../models/table-config.model';

@Component({
  selector: 'app-demo-table',
  standalone: true,
  imports: [CommonModule, FormsModule, TableFilterSortDirective],
  templateUrl: './demo-table.html',
  styleUrl: './demo-table.css',
})
export class DemoTable {
  // Datos originales
  readonly products = MOCK_PRODUCTS;

  // ---- Estado del filtro ----
  filterField = 'nombre';
  filterOperator: FilterOperator = 'contains';
  filterValue: any = '';
  filterValueMin: any = '';
  filterValueMax: any = '';

  activeFilter = signal<FilterConfig | null>(null);

  // ---- Estado de la ordenación ----
  sortField = 'nombre';
  sortDirection: 'asc' | 'desc' | null = null;
  activeSort = signal<SortConfig | null>(null);

  // ---- Resultado procesado por la directiva ----
  processedData = signal<Product[]>(MOCK_PRODUCTS);

  // Campos disponibles para filtrar/ordenar
  readonly filterableFields = [
    { key: 'nombre',     label: 'Nombre',     type: 'text'   },
    { key: 'categoria',  label: 'Categoría',  type: 'select' },
    { key: 'fechaAlta',  label: 'Fecha alta', type: 'date'   },
    { key: 'precio',     label: 'Precio',     type: 'number' },
    { key: 'stock',      label: 'Stock',      type: 'number' },
  ];

  readonly categories = ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros'];

  // ---- Handlers ----

  applyFilter(): void {
    const cfg: FilterConfig = {
      field: this.filterField,
      operator: this.filterOperator,
      value: this.filterOperator === 'between'
        ? [this.filterValueMin, this.filterValueMax]
        : this.filterValue,
    };

    // Validación mínima
    if (this.filterValue === '' && this.filterOperator !== 'between') {
      this.activeFilter.set(null);
      return;
    }

    this.activeFilter.set(cfg);
  }

  clearFilter(): void {
    this.filterValue = '';
    this.filterValueMin = '';
    this.filterValueMax = '';
    this.activeFilter.set(null);
  }

  sortBy(field: string): void {
    let direction: 'asc' | 'desc' = 'asc';
    if (this.sortField === field && this.sortDirection === 'asc') {
      direction = 'desc';
    }
    this.sortField = field;
    this.sortDirection = direction;
    this.activeSort.set({ field, direction });
  }

  clearSort(): void {
    this.sortDirection = null;
    this.activeSort.set(null);
  }

  // Callback de la directiva → actualiza la signal
  onDataProcessed(data: Product[]): void {
    this.processedData.set(data);
  }

  // Helpers de UI
  getSortIcon(field: string): string {
    if (this.sortField !== field) return '⇅';
    return this.sortDirection === 'asc' ? '▲' : '▼';
  }

  onFieldChange(): void {
    // Resetear operador/valores al cambiar de campo
    this.filterValue = '';
    this.filterValueMin = '';
    this.filterValueMax = '';
    if (this.filterField === 'fechaAlta' || this.filterField === 'precio' || this.filterField === 'stock') {
      this.filterOperator = 'gt';
    } else if (this.filterField === 'categoria') {
      this.filterOperator = 'equals';
    } else {
      this.filterOperator = 'contains';
    }
  }
}