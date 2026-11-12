export type OccasionId =
  | 'cumpleanos'
  | 'aniversario'
  | 'nacimiento'
  | 'condolencias'
  | 'gracias';

export type BouquetTypeId = 'fresco' | 'novia' | 'seco';
export type ColorId = 'rosa' | 'crema' | 'amarillo' | 'mixto';

export type FilterableBouquet = {
  slug: string;
  type: BouquetTypeId;
  color: ColorId;
  occasions: OccasionId[];
  sameDay: boolean;
};

export type BouquetFilters = {
  occasion: OccasionId | 'todas';
  type: BouquetTypeId | 'todos';
  color: ColorId | 'todos';
  forToday: boolean;
};

export const defaultFilters: BouquetFilters = {
  occasion: 'todas',
  type: 'todos',
  color: 'todos',
  forToday: false,
};

export function filterBouquets<T extends FilterableBouquet>(items: T[], filters: BouquetFilters): T[] {
  return items.filter((item) => {
    if (filters.occasion !== 'todas' && !item.occasions.includes(filters.occasion)) return false;
    if (filters.type !== 'todos' && item.type !== filters.type) return false;
    if (filters.color !== 'todos' && item.color !== filters.color) return false;
    if (filters.forToday && !item.sameDay) return false;
    return true;
  });
}

export function relatedBouquets<T extends { slug: string; type: BouquetTypeId }>(
  items: T[],
  slug: string,
  limit = 3,
): T[] {
  const current = items.find((item) => item.slug === slug);
  const others = items.filter((item) => item.slug !== slug);
  if (!current) return others.slice(0, limit);
  const same = others.filter((item) => item.type === current.type);
  const rest = others.filter((item) => item.type !== current.type);
  return [...same, ...rest].slice(0, limit);
}

export function parseFilters(params: URLSearchParams): BouquetFilters {
  const occasion = params.get('ocasion');
  const type = params.get('tipo');
  const color = params.get('color');
  const occasions: Array<OccasionId | 'todas'> = [
    'todas',
    'cumpleanos',
    'aniversario',
    'nacimiento',
    'condolencias',
    'gracias',
  ];
  const types: Array<BouquetTypeId | 'todos'> = ['todos', 'fresco', 'novia', 'seco'];
  const colors: Array<ColorId | 'todos'> = ['todos', 'rosa', 'crema', 'amarillo', 'mixto'];
  return {
    occasion: occasions.includes(occasion as OccasionId | 'todas')
      ? (occasion as OccasionId | 'todas')
      : 'todas',
    type: types.includes(type as BouquetTypeId | 'todos') ? (type as BouquetTypeId | 'todos') : 'todos',
    color: colors.includes(color as ColorId | 'todos') ? (color as ColorId | 'todos') : 'todos',
    forToday: params.get('hoy') === '1',
  };
}
