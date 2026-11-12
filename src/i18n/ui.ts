import { resolveLocale, type Locale } from './index';

export const ui = {
  es: {
    skip: 'Saltar al contenido',
    nav: {
      ramos: 'Ramos',
      plantas: 'Plantas',
      bodas: 'Bodas',
      talleres: 'Talleres',
      encargos: 'Encargos',
      floristeria: 'La floristería',
      contacto: 'Contacto',
      menu: 'Abrir el menú',
      menuClose: 'Cerrar el menú',
      primary: 'Principal',
    },
    actions: {
      whatsapp: 'Pedir por WhatsApp',
      whatsappShort: 'WhatsApp',
      call: 'Llamar',
      callPrefer: 'Prefiero llamar',
      seeBouquets: 'Ver ramos de temporada',
      seeAll: 'Ver todos los ramos',
      seePlants: 'Ver plantas',
      weddingQuote: 'Pedir presupuesto de boda',
      write: 'Escribir',
      howToGet: 'Cómo llegar',
      openMail: 'Abrir en el correo',
      instagram: 'Instagram',
    },
    bar: {
      label: 'Acciones rápidas',
    },
    lang: {
      label: 'Idioma',
      vaPending: 'Valenciano, próximamente. El menú ya está preparado para añadirlo.',
    },
    footer: {
      shop: 'Floristería',
      corner: 'Rincón',
      follow: 'Síguenos',
      legal: 'Aviso legal',
      privacy: 'Privacidad',
      cookies: 'Cookies',
      rights: 'Floristería en Alcoy',
      demo: 'Propuesta web de Luis Balaguer. Los datos marcados «a confirmar» están pendientes de la floristería.',
      logoPending: 'Sustituir por logo real',
    },
    priceFrom: 'desde',
    pricePending: 'a confirmar',
    currency: '€',
    pending: 'A confirmar',
    season: 'Temporada',
    today: 'Para hoy',
    filters: {
      occasion: 'Ocasión',
      type: 'Tipo',
      delivery: 'Entrega',
      allOccasions: 'Todas',
      allTypes: 'Todos',
      today: 'Para hoy',
      fresco: 'Fresco',
      novia: 'Ramo de novia',
      seco: 'Seco y preservado',
      cumpleanos: 'Cumpleaños',
      aniversario: 'Aniversario',
      nacimiento: 'Nacimiento',
      condolencias: 'Condolencias',
      gracias: 'Gracias',
    },
    occasions: {
      cumpleanos: 'Cumpleaños',
      aniversario: 'Aniversario',
      nacimiento: 'Nacimiento',
      condolencias: 'Condolencias',
      gracias: 'Para dar las gracias',
    },
    form: {
      names: 'Vuestros nombres',
      date: 'Fecha de la boda',
      dateHint: 'Aproximada, si aún no está cerrada.',
      place: 'Lugar',
      style: 'Estilo',
      guests: 'Invitados',
      guestsError: 'Indica un número aproximado de invitados.',
      contact: 'Email o teléfono',
      message: 'Mensaje e inspiración',
      privacy: 'He leído la política de privacidad. Usaremos tus datos solo para responder a esta solicitud.',
      required: 'Rellena este campo para preparar el mensaje.',
    },
    order: {
      size: 'Tamaño',
      when: '¿Para cuándo?',
      today: 'Hoy',
      tomorrow: 'Mañana',
      other: 'Otra fecha',
      delivery: 'Entrega',
      pickup: 'Recogida',
      ship: 'Envío',
      dedication: 'Dedicatoria',
      optional: '(opcional)',
      dedicationPh: 'Escríbela aquí. Si la tarjeta va incluida, está a confirmar.',
      extra: '¿Quieres jarrón u otro detalle?',
      extraPh: 'Opcional. Si lo tienen, está a confirmar.',
      preview: 'Mensaje que se enviará',
      noPay: 'Sin pago online: te confirmamos disponibilidad, precio final y forma de pago por WhatsApp.',
      dateLabel: 'Fecha',
    },
    empty: {
      none: 'Ningún ramo publicado coincide con este filtro.',
      condolencias:
        'No hay ramos publicados para condolencias. El servicio de flores para funeral está a confirmar y no tiene página propia. Si lo necesitas, pregúntanos por WhatsApp.',
      today:
        'Ningún ramo está marcado como «para hoy»: la hora límite está a confirmar. Escríbenos y te decimos si llegamos con la flor del taller.',
    },
    crumbs: {
      home: 'Inicio',
    },
  },
} as const;

export type Ui = (typeof ui)['es'];

export function getUi(locale: Locale = 'es'): Ui {
  const resolved = resolveLocale(locale);
  if (resolved === 'es') return ui.es;
  return ui.es;
}
