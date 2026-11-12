import { useEffect, useState } from 'react';
import { buildQuoteMessage, mailtoHref, quoteErrors, whatsappHref, type QuoteDraft } from '../../lib/messages';

type Labels = {
  names: string;
  date: string;
  dateHint: string;
  place: string;
  style: string;
  guests: string;
  guestsError: string;
  contact: string;
  message: string;
  privacy: string;
  required: string;
  send: string;
  mail: string;
  noPay: string;
};

const empty: QuoteDraft = {
  names: '',
  date: '',
  place: '',
  style: '',
  guests: '',
  contact: '',
  message: '',
  privacy: false,
};

export default function QuoteForm({ labels }: { labels: Labels }) {
  const [draft, setDraft] = useState<QuoteDraft>(empty);
  const [showErrors, setShowErrors] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const errors = quoteErrors(draft);
  const ready = errors.length === 0;
  const message = buildQuoteMessage(draft);
  const invalid = (key: keyof QuoteDraft) => showErrors && errors.includes(key);

  function set<K extends keyof QuoteDraft>(key: K, value: QuoteDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  return (
    <form id="presupuesto" data-hydrated={hydrated ? 'true' : 'false'} className="stack" onSubmit={(event) => event.preventDefault()}>
      <div className="form-grid">
        <div className={invalid('names') ? 'field has-error' : 'field'}>
          <label htmlFor="q-names">{labels.names}</label>
          <input id="q-names" value={draft.names} autoComplete="name" onChange={(event) => set('names', event.target.value)} />
          {invalid('names') ? <p className="err" role="alert">{labels.required}</p> : null}
        </div>
        <div className={invalid('date') ? 'field has-error' : 'field'}>
          <label htmlFor="q-date">{labels.date}</label>
          <input id="q-date" type="date" value={draft.date} onChange={(event) => set('date', event.target.value)} />
          <p className="small">{labels.dateHint}</p>
          {invalid('date') ? <p className="err" role="alert">{labels.required}</p> : null}
        </div>
        <div className={invalid('place') ? 'field has-error' : 'field'}>
          <label htmlFor="q-place">{labels.place}</label>
          <input id="q-place" value={draft.place} onChange={(event) => set('place', event.target.value)} />
          {invalid('place') ? <p className="err" role="alert">{labels.required}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="q-style">{labels.style}</label>
          <input id="q-style" value={draft.style} onChange={(event) => set('style', event.target.value)} />
        </div>
        <div className={invalid('guests') ? 'field has-error' : 'field'}>
          <label htmlFor="q-guests">{labels.guests}</label>
          <input id="q-guests" inputMode="numeric" value={draft.guests} onChange={(event) => set('guests', event.target.value)} />
          {invalid('guests') ? <p className="err" role="alert">{labels.guestsError}</p> : null}
        </div>
        <div className={invalid('contact') ? 'field has-error' : 'field'}>
          <label htmlFor="q-contact">{labels.contact}</label>
          <input id="q-contact" value={draft.contact} autoComplete="email" onChange={(event) => set('contact', event.target.value)} />
          {invalid('contact') ? <p className="err" role="alert">{labels.required}</p> : null}
        </div>
        <div className="field wide">
          <label htmlFor="q-message">{labels.message}</label>
          <textarea id="q-message" value={draft.message} onChange={(event) => set('message', event.target.value)} />
        </div>
      </div>
      <label className={invalid('privacy') ? 'check err' : 'check'} htmlFor="q-privacy">
        <input id="q-privacy" type="checkbox" checked={draft.privacy} onChange={(event) => set('privacy', event.target.checked)} />
        <span>{labels.privacy}</span>
      </label>
      <div className="row-btns">
        <a
          className="btn bp"
          href={ready ? whatsappHref(message) : '#presupuesto'}
          target={ready ? '_blank' : undefined}
          rel={ready ? 'noopener noreferrer' : undefined}
          onClick={(event) => {
            if (!ready) {
              event.preventDefault();
              setShowErrors(true);
            }
          }}
        >
          {labels.send}
        </a>
        <a
          className="btn bsd"
          href={ready ? mailtoHref(message, 'Presupuesto de boda o evento · Rincón de Olivia') : '#presupuesto'}
          onClick={(event) => {
            if (!ready) {
              event.preventDefault();
              setShowErrors(true);
            }
          }}
        >
          {labels.mail}
        </a>
      </div>
      <p className="small">{labels.noPay}</p>
    </form>
  );
}
