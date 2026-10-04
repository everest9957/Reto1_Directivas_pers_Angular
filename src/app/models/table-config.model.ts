// src/app/models/table-config.model.ts

export type FilterOperator =
  | 'equals'      // igual a
  | 'contains'    // contiene (texto)
  | 'gt'          // mayor que
  | 'lt'          // menor que
  | 'between'     // entre dos valores (fechas o números)
  | 'in';         // pertenece a una lista

export type SortDirection = 'asc' | 'desc' | null;

export interface FilterConfig {
  /** Campo del objeto sobre el que se filtra */
  field: string;
  /** Operador de comparación */
  operator: FilterOperator;
  /** Valor(es) del filtro. Para 'between' usar [min, max] */
  value: any | [any, any];
}

export interface SortConfig {
  /** Campo por el que ordenar */
  field: string;
  /** Dirección de la ordenación */
  direction: SortDirection;
}