import { phoneDigits, siteConfig } from '../data/site';

export type OrderDraft = {
  product: string;
  occasion: string;
  date: string;
  dedication: string;
  delivery?: 'recogida' | 'envio' | '';
  extra?: string;
};

export type QuoteDraft = {
  names: string;
  date: string;
  place: string;
  style: string;
  guests: string;
  contact: string;
  message: string;
  privacy: boolean;
};

export function buildOrderMessage(draft: OrderDraft): string {
  const lines = [
    'Hola, Rincón de Olivia. Me gustaría encargar:',
    `Producto: ${draft.product.trim()}`,
    `Ocasión: ${draft.occasion.trim() || 'a confirmar'}`,
    `Fecha: ${draft.date.trim() || 'a confirmar'}`,
    `Dedicatoria: ${draft.dedication.trim() || 'sin dedicatoria'}`,
  ];
  if (draft.delivery === 'recogida') lines.push('Entrega: recogida en la floristería');
  if (draft.delivery === 'envio') lines.push('Entrega: envío (zona a confirmar)');
  if (draft.extra?.trim()) lines.push(`Detalle: ${draft.extra.trim()}`);
  lines.push('El precio «desde» está a confirmar. ¿Me confirmáis disponibilidad?');
  return lines.join('\n');
}

export function buildQuoteMessage(draft: QuoteDraft): string {
  return [
    'Hola, Rincón de Olivia. Querríamos un presupuesto de boda o evento, sin pago en la web:',
    `Nombres: ${draft.names.trim()}`,
    `Fecha: ${draft.date.trim() || 'a confirmar'}`,
    `Lugar: ${draft.place.trim() || 'a confirmar'}`,
    `Estilo: ${draft.style.trim() || 'a confirmar'}`,
    `Invitados (aprox.): ${draft.guests.trim() || 'a confirmar'}`,
    `Contacto: ${draft.contact.trim()}`,
    `Mensaje: ${draft.message.trim() || '—'}`,
  ].join('\n');
}

export function quoteErrors(draft: QuoteDraft): Array<keyof QuoteDraft> {
  const errors: Array<keyof QuoteDraft> = [];
  if (!draft.names.trim()) errors.push('names');
  if (!draft.date.trim()) errors.push('date');
  if (!draft.place.trim()) errors.push('place');
  if (!draft.guests.trim()) errors.push('guests');
  if (!draft.contact.trim()) errors.push('contact');
  if (!draft.privacy) errors.push('privacy');
  return errors;
}

export function whatsappHref(message: string, e164: string = siteConfig.whatsappE164): string {
  return `https://wa.me/${phoneDigits(e164)}?text=${encodeURIComponent(message)}`;
}

export function mailtoHref(message: string, subject: string, email: string | null = siteConfig.email): string {
  const target = email ?? '';
  return `mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
