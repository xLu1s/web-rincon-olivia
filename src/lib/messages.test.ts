import { describe, expect, it } from 'vitest';
import { siteConfig } from '../data/site';
import { buildOrderMessage, buildQuoteMessage, mailtoHref, quoteErrors, whatsappHref } from './messages';

describe('buildOrderMessage', () => {
  it('incluye producto, ocasión, fecha y dedicatoria', () => {
    const message = buildOrderMessage({
      product: 'Ramo Angela',
      occasion: 'Boda',
      date: '12 de junio',
      dedication: 'Para Ana',
      delivery: 'recogida',
    });
    expect(message).toContain('Producto: Ramo Angela');
    expect(message).toContain('Ocasión: Boda');
    expect(message).toContain('Fecha: 12 de junio');
    expect(message).toContain('Dedicatoria: Para Ana');
    expect(message).toContain('Entrega: recogida en la floristería');
    expect(message).not.toMatch(/\d+\s*€/);
  });

  it('deja marcadores cuando faltan ocasión, fecha o dedicatoria', () => {
    const message = buildOrderMessage({ product: 'Silvestre', occasion: '', date: '  ', dedication: '' });
    expect(message).toContain('Ocasión: a confirmar');
    expect(message).toContain('Fecha: a confirmar');
    expect(message).toContain('Dedicatoria: sin dedicatoria');
  });

  it('añade el extra solo si se ha escrito', () => {
    const withExtra = buildOrderMessage({
      product: 'Seco preservado',
      occasion: 'Gracias',
      date: 'mañana',
      dedication: '',
      extra: 'Jarrón, a confirmar',
      delivery: 'envio',
    });
    expect(withExtra).toContain('Detalle: Jarrón, a confirmar');
    expect(withExtra).toContain('Entrega: envío (zona a confirmar)');
  });
});

describe('whatsappHref', () => {
  it('abre el número de la configuración, marcado como no confirmado para WhatsApp', () => {
    expect(siteConfig.whatsappE164).toBe('+34628484102');
    expect(siteConfig.whatsappConfirmed).toBe(false);
    const href = whatsappHref('Hola, ramo');
    expect(href.startsWith('https://wa.me/34628484102?text=')).toBe(true);
    expect(decodeURIComponent(href.split('text=')[1])).toBe('Hola, ramo');
  });
});

describe('presupuesto', () => {
  const valid = {
    names: 'Ana y Pablo',
    date: '06/09/2027',
    place: 'Alcoy',
    style: 'Silvestre',
    guests: '80',
    contact: 'ana@example.com',
    message: 'Mesa larga y ramo suelto',
    privacy: true,
  };

  it('exige los campos operativos y la privacidad', () => {
    expect(quoteErrors(valid)).toEqual([]);
    expect(quoteErrors({ ...valid, guests: ' ', privacy: false })).toEqual(['guests', 'privacy']);
  });

  it('prepara WhatsApp y mailto con los datos, sin inventar un correo del negocio', () => {
    const message = buildQuoteMessage(valid);
    expect(message).toContain('Nombres: Ana y Pablo');
    expect(message).toContain('Invitados (aprox.): 80');
    expect(message).toContain('Lugar: Alcoy');
    expect(message).toContain('Mensaje: Mesa larga y ramo suelto');
    const mail = mailtoHref(message, 'Presupuesto de boda');
    expect(mail.startsWith('mailto:?subject=')).toBe(true);
    expect(decodeURIComponent(mail)).toContain('Ana y Pablo');
    expect(siteConfig.email).toBeNull();
  });
});
