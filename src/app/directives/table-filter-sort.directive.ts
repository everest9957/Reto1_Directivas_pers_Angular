import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  OnInit,
} from '@angular/core';
import {
  FilterConfig,
  SortConfig,
} from '../models/table-config.model';

@Directive({
  selector: '[appTableFilterSort]',
  standalone: true,
})
export class TableFilterSortDirective<T extends Record<string, any>>
  implements OnInit, OnChanges
{
  /** Datos originales sobre los que se aplicará filtro + ordenación */
  @Input() appTableFilterSort: T[] = [];

  /** Configuración del filtro activo (opcional) */
  @Input() filterConfig: FilterConfig | null = null;

  /** Configuración de la ordenación activa (opcional) */
  @Input() sortConfig: SortConfig | null = null;

  /** Emite el resultado filtrado y ordenado */
  @Output() dataProcessed = new EventEmitter<T[]>();

  constructor(
    private el: ElementRef<HTMLTableElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Añadimos una clase para estilos opcionales
    this.renderer.addClass(this.el.nativeElement, 'table-filter-sort');
    this.process();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['appTableFilterSort'] ||
      changes['filterConfig'] ||
      changes['sortConfig']
    ) {
      this.process();
    }
  }

  /**
   * Punto de entrada: aplica filtro y luego ordenación.
   */
  private process(): void {
    let result = [...(this.appTableFilterSort ?? [])];

    if (this.filterConfig) {
      result = this.applyFilter(result, this.filterConfig);
    }

    if (this.sortConfig && this.sortConfig.direction) {
      result = this.applySort(result, this.sortConfig);
    }

    this.dataProcessed.emit(result);
  }

  // ---------- FILTRADO ----------

  private applyFilter(data: T[], config: FilterConfig): T[] {
    const { field, operator, value } = config;

    return data.filter((item) => {
      const itemValue = item[field];

      switch (operator) {
        case 'equals':
          return itemValue === value;

        case 'contains':
          return String(itemValue)
            .toLowerCase()
            .includes(String(value).toLowerCase());

        case 'gt':
          return this.toComparable(itemValue) > this.toComparable(value);

        case 'lt':
          return this.toComparable(itemValue) < this.toComparable(value);

        case 'between': {
          if (!Array.isArray(value) || value.length !== 2) return true;
          const [min, max] = value;
          const v = this.toComparable(itemValue);
          return v >= this.toComparable(min) && v <= this.toComparable(max);
        }

        case 'in':
          return Array.isArray(value) && value.includes(itemValue);

        default:
          return true;
      }
    });
  }

  // ---------- ORDENACIÓN ----------

  private applySort(data: T[], config: SortConfig): T[] {
    const { field, direction } = config;
    const factor = direction === 'asc' ? 1 : -1;

    return [...data].sort((a, b) => {
      const va = this.toComparable(a[field]);
      const vb = this.toComparable(b[field]);

      if (va < vb) return -1 * factor;
      if (va > vb) return 1 * factor;
      return 0;
    });
  }

  // ---------- UTILIDAD ----------

  /**
   * Convierte cualquier valor a algo comparable:
   * - Fechas (ISO strings) → timestamp numérico
   * - Números → número
   * - Strings → string en minúsculas
   */
  private toComparable(value: any): any {
    if (value === null || value === undefined) return '';

    if (typeof value === 'number') return value;

    if (value instanceof Date) return value.getTime();

    if (typeof value === 'string') {
      // Detectar fecha ISO (YYYY-MM-DD ...)
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}/;
      if (isoDateRegex.test(value)) {
        const t = Date.parse(value);
        if (!isNaN(t)) return t;
      }
      return value.toLowerCase();
    }

    return String(value).toLowerCase();
  }
}