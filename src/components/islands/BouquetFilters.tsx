import { useEffect, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import {
  filterBouquets,
  parseFilters,
  type BouquetFilters,
  type BouquetTypeId,
  type ColorId,
  type FilterableBouquet,
  type OccasionId,
} from '../../lib/filters';

type Labels = {
  occasion: string;
  type: string;
  delivery: string;
  allOccasions: string;
  allTypes: string;
  today: string;
  color: string;
  allColors: string;
  rosa: string;
  crema: string;
  amarillo: string;
  mixto: string;
  fresco: string;
  novia: string;
  seco: string;
  cumpleanos: string;
  aniversario: string;
  nacimiento: string;
  condolencias: string;
  gracias: string;
  emptyNone: string;
  emptyCondolencias: string;
  emptyToday: string;
};

const occasions: Array<OccasionId | 'todas'> = ['todas', 'cumpleanos', 'aniversario', 'nacimiento', 'condolencias', 'gracias'];
const types: Array<BouquetTypeId | 'todos'> = ['todos', 'fresco', 'novia', 'seco'];
const colors: Array<ColorId | 'todos'> = ['todos', 'rosa', 'crema', 'amarillo', 'mixto'];

function readCards(): Array<FilterableBouquet & { el: HTMLElement }> {
  return [...document.querySelectorAll<HTMLElement>('[data-bouquet]')].map((el) => ({
    el,
    slug: el.dataset.slug ?? '',
    type: (el.dataset.type ?? 'fresco') as BouquetTypeId,
    color: (el.dataset.color ?? 'mixto') as ColorId,
    occasions: (el.dataset.occasions ?? '').split(',').filter(Boolean) as OccasionId[],
    sameDay: el.dataset.sameDay === 'true',
  }));
}

function emptyMessage(filters: BouquetFilters, labels: Labels): string {
  if (filters.occasion === 'condolencias') return labels.emptyCondolencias;
  if (filters.forToday) return labels.emptyToday;
  return labels.emptyNone;
}

export default function BouquetFilters({ labels }: { labels: Labels }) {
  const [filters, setFilters] = useState<BouquetFilters>({ occasion: 'todas', type: 'todos', color: 'todos', forToday: false });
  const [hydrated, setHydrated] = useState(false);

  function apply(next: BouquetFilters) {
    setFilters(next);
    const cards = readCards();
    const visible = new Set(filterBouquets(cards, next).map((item) => item.slug));
    for (const card of cards) card.el.hidden = !visible.has(card.slug);
    const count = document.querySelector('[data-bouquet-count]');
    if (count) {
      const n = visible.size;
      count.textContent = n === 1 ? '1 ramo' : `${n} ramos`;
    }
    const empty = document.querySelector<HTMLElement>('[data-bouquet-empty]');
    if (empty) {
      empty.hidden = visible.size !== 0;
      empty.textContent = emptyMessage(next, labels);
    }
    const params = new URLSearchParams();
    if (next.occasion !== 'todas') params.set('ocasion', next.occasion);
    if (next.type !== 'todos') params.set('tipo', next.type);
    if (next.color !== 'todos') params.set('color', next.color);
    if (next.forToday) params.set('hoy', '1');
    const query = params.toString();
    const path = window.location.pathname;
    window.history.replaceState(null, '', query ? `${path}?${query}` : path);
  }

  useEffect(() => {
    apply(parseFilters(new URLSearchParams(window.location.search)));
    setHydrated(true);
    // Solo al montar: los filtros siguientes pasan por apply.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const occasionLabel: Record<OccasionId | 'todas', string> = {
    todas: labels.allOccasions,
    cumpleanos: labels.cumpleanos,
    aniversario: labels.aniversario,
    nacimiento: labels.nacimiento,
    condolencias: labels.condolencias,
    gracias: labels.gracias,
  };
  const typeLabel: Record<BouquetTypeId | 'todos', string> = {
    todos: labels.allTypes,
    fresco: labels.fresco,
    novia: labels.novia,
    seco: labels.seco,
  };

  return (
    <div className="filters" data-filters data-hydrated={hydrated ? 'true' : 'false'}>
      <div>
        <span className="filter-label" id="filtro-ocasion">{labels.occasion}</span>
        <ToggleGroup
          type="single"
          value={filters.occasion}
          onValueChange={(value) => apply({ ...filters, occasion: (value || 'todas') as OccasionId | 'todas' })}
          aria-labelledby="filtro-ocasion"
        >
          {occasions.map((id) => (
            <ToggleGroupItem className="chip" key={id} value={id}>{occasionLabel[id]}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div>
        <span className="filter-label" id="filtro-tipo">{labels.type}</span>
        <ToggleGroup
          type="single"
          value={filters.type}
          onValueChange={(value) => apply({ ...filters, type: (value || 'todos') as BouquetTypeId | 'todos' })}
          aria-labelledby="filtro-tipo"
        >
          {types.map((id) => (
            <ToggleGroupItem className="chip" key={id} value={id}>{typeLabel[id]}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div>
        <span className="filter-label" id="filtro-color">{labels.color}</span>
        <ToggleGroup
          type="single"
          value={filters.color}
          onValueChange={(value) => apply({ ...filters, color: (value || 'todos') as ColorId | 'todos' })}
          aria-labelledby="filtro-color"
        >
          {colors.map((id) => (
            <ToggleGroupItem className="chip" key={id} value={id}>
              {id === 'todos' ? labels.allColors : id === 'rosa' ? labels.rosa : id === 'crema' ? labels.crema : id === 'amarillo' ? labels.amarillo : labels.mixto}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div>
        <span className="filter-label" id="filtro-entrega">{labels.delivery}</span>
        <div role="group" aria-labelledby="filtro-entrega">
        <button
          type="button"
          className="chip"
          aria-pressed={filters.forToday}
          onClick={() => apply({ ...filters, forToday: !filters.forToday })}
        >
          <i className="dot" aria-hidden="true" />
          {labels.today}
        </button>
        </div>
      </div>
    </div>
  );
}
