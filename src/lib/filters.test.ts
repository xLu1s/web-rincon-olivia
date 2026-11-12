import { describe, expect, it } from 'vitest';
import { bouquets } from '../data/catalog';
import { defaultFilters, filterBouquets, parseFilters, relatedBouquets, type BouquetFilters } from './filters';

const filters = (patch: Partial<BouquetFilters> = {}): BouquetFilters => ({ ...defaultFilters, ...patch });

describe('filterBouquets', () => {
  it('devuelve todo el catálogo con los filtros por defecto', () => {
    expect(filterBouquets(bouquets, defaultFilters)).toHaveLength(bouquets.length);
  });

  it('filtra por ocasión y deja fuera los ramos de novia sin esa etiqueta', () => {
    const slugs = filterBouquets(bouquets, filters({ occasion: 'cumpleanos' })).map((item) => item.slug);
    expect(slugs).toEqual(['ciudad-y-campo', 'silvestre']);
  });

  it('filtra por tipo ramo de novia', () => {
    const slugs = filterBouquets(bouquets, filters({ type: 'novia' })).map((item) => item.slug);
    expect(slugs).toEqual(['angela', 'hortensia-blanca']);
  });

  it('combina ocasión y tipo', () => {
    const slugs = filterBouquets(bouquets, filters({ occasion: 'gracias', type: 'seco' })).map((item) => item.slug);
    expect(slugs).toEqual(['seco-preservado']);
  });

  it('condolencias no tiene ramos: el servicio de funeral no está confirmado', () => {
    expect(filterBouquets(bouquets, filters({ occasion: 'condolencias' }))).toEqual([]);
  });

  it('filtra por color como en el diseño', () => {
    const slugs = filterBouquets(bouquets, filters({ color: 'crema' })).map((item) => item.slug);
    expect(slugs).toEqual(['hortensia-blanca']);
  });

  it('para hoy no marca ningún ramo mientras la hora límite esté a confirmar', () => {
    expect(bouquets.every((item) => item.sameDay === false)).toBe(true);
    expect(filterBouquets(bouquets, filters({ forToday: true }))).toEqual([]);
  });
});

describe('parseFilters', () => {
  it('lee la query y ignora valores desconocidos', () => {
    const params = new URLSearchParams('ocasion=nacimiento&tipo=fresco&hoy=1');
    expect(parseFilters(params)).toEqual({ occasion: 'nacimiento', type: 'fresco', color: 'todos', forToday: true });
    expect(parseFilters(new URLSearchParams('ocasion=funeral&tipo=rosa'))).toEqual(defaultFilters);
  });
});

describe('relatedBouquets', () => {
  it('prioriza el mismo tipo y no repite el ramo actual', () => {
    const related = relatedBouquets(bouquets, 'angela', 3).map((item) => item.slug);
    expect(related).not.toContain('angela');
    expect(related[0]).toBe('hortensia-blanca');
    expect(related).toHaveLength(3);
  });
});
