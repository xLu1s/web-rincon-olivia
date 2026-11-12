import { useEffect, useMemo, useState } from 'react';
import { buildOrderMessage, whatsappHref } from '../../lib/messages';

type Labels = {
  size: string;
  small: string;
  medium: string;
  large: string;
  when: string;
  today: string;
  tomorrow: string;
  other: string;
  date: string;
  delivery: string;
  pickup: string;
  ship: string;
  dedication: string;
  optional: string;
  dedicationPh: string;
  extra: string;
  extraPh: string;
  preview: string;
  send: string;
  call: string;
  noPay: string;
  priceNote: string;
};

function tomorrowIso(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

export default function OrderForm({
  product,
  occasion,
  tel,
  labels,
}: {
  product: string;
  occasion: string;
  tel: string;
  labels: Labels;
}) {
  const [size, setSize] = useState<'pequeño' | 'mediano' | 'grande'>('mediano');
  const [when, setWhen] = useState<'hoy' | 'manana' | 'fecha'>('manana');
  const [date, setDate] = useState(tomorrowIso);
  const [delivery, setDelivery] = useState<'recogida' | 'envio'>('recogida');
  const [dedication, setDedication] = useState('');
  const [extra, setExtra] = useState('');
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const dateLabel = when === 'hoy' ? 'hoy' : when === 'manana' ? 'mañana' : date || 'a confirmar';
  const message = useMemo(
    () =>
      buildOrderMessage({
        product: `${product}, tamaño ${size}`,
        occasion,
        date: dateLabel,
        dedication,
        delivery,
        extra,
      }),
    [product, size, occasion, dateLabel, dedication, delivery, extra],
  );

  return (
    <form className="stack" data-order-form data-hydrated={hydrated ? 'true' : 'false'} onSubmit={(event) => event.preventDefault()}>
      <div>
        <span className="filter-label" id="tamano">{labels.size}</span>
        <div className="seg" role="group" aria-labelledby="tamano">
          {(['pequeño', 'mediano', 'grande'] as const).map((id) => (
            <button key={id} type="button" aria-pressed={size === id} onClick={() => setSize(id)}>
              <b>{id === 'pequeño' ? labels.small : id === 'mediano' ? labels.medium : labels.large}</b>
              <small>{labels.priceNote}</small>
            </button>
          ))}
        </div>
      </div>
      <div>
        <span className="filter-label" id="cuando">{labels.when}</span>
        <div className="seg" role="group" aria-labelledby="cuando">
          <button type="button" aria-pressed={when === 'hoy'} onClick={() => setWhen('hoy')}>{labels.today}</button>
          <button type="button" aria-pressed={when === 'manana'} onClick={() => setWhen('manana')}>{labels.tomorrow}</button>
          <button type="button" aria-pressed={when === 'fecha'} onClick={() => setWhen('fecha')}>{labels.other}</button>
        </div>
        {when === 'fecha' ? (
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="order-date">{labels.date}</label>
            <input id="order-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </div>
        ) : null}
      </div>
      <div>
        <span className="filter-label" id="entrega">{labels.delivery}</span>
        <div className="seg two" role="group" aria-labelledby="entrega">
          <button type="button" aria-pressed={delivery === 'recogida'} onClick={() => setDelivery('recogida')}>{labels.pickup}</button>
          <button type="button" aria-pressed={delivery === 'envio'} onClick={() => setDelivery('envio')}>{labels.ship}</button>
        </div>
      </div>
      <div className="field">
        <label htmlFor="dedicatoria">{labels.dedication} <span className="small">{labels.optional}</span></label>
        <textarea id="dedicatoria" value={dedication} placeholder={labels.dedicationPh} onChange={(event) => setDedication(event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="extra">{labels.extra} <span className="small">{labels.optional}</span></label>
        <input id="extra" value={extra} placeholder={labels.extraPh} onChange={(event) => setExtra(event.target.value)} />
      </div>
      <div className="preview">
        <p className="filter-label">{labels.preview}</p>
        <p>{message}</p>
      </div>
      <div className="row-btns">
        <a className="btn bwa" href={whatsappHref(message)} target="_blank" rel="noopener noreferrer">
          {labels.send}
        </a>
        <a className="btn bcall" href={tel}>{labels.call}</a>
      </div>
      <p className="small">{labels.noPay}</p>
    </form>
  );
}
