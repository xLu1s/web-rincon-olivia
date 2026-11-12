/**
 * Datos del negocio en un solo sitio.
 * Lo marcado `confirmed: false` se enseña en la web como «a confirmar».
 * El teléfono de WhatsApp vive solo aquí: el resto del código lo importa.
 */
export const siteConfig = {
  name: 'Rincón de Olivia',
  tagline: 'Floristería en Alcoy',
  city: 'Alcoy',
  cityAlt: 'Alcoi',
  region: 'Alicante',
  postalCode: '03801',
  country: 'ES',
  countryName: 'España',
  /** Teléfono publicado en la bio de Instagram y en directorios. */
  phoneE164: '+34628484102',
  phoneDisplay: '628 48 41 02',
  /**
   * Mismo móvil. No hay perfil de WhatsApp Business verificado en abierto:
   * el número de WhatsApp queda a confirmar, pero el enlace usa este valor.
   */
  whatsappE164: '+34628484102',
  whatsappConfirmed: false,
  instagram: 'https://www.instagram.com/rincondeolivia/',
  instagramHandle: '@rincondeolivia',
  instagramConfirmed: true,
  url: 'https://xlu1s.github.io/web-rincon-olivia/',
  locale: 'es-ES',
  designer: 'Luis Balaguer',
  /** Correo no publicado. El mailto abre el cliente sin destinatario. */
  email: null as string | null,
  logo: null as string | null,
} as const;

export const address = {
  street: 'Placeta el Fossar, 3',
  locality: 'Alcoy (Alcoi)',
  postalCode: '03801',
  region: 'Alicante',
  confirmed: false,
  alternative: 'C/ Sant Tomàs, 8',
  alternativeNote:
    'Algunos directorios citan C/ Sant Tomàs, 8. Las dos están a confirmar.',
} as const;

export const hours = {
  confirmed: false,
  note: 'Los directorios no coinciden. No publicamos un horario hasta confirmarlo.',
  rows: [
    { days: 'Lunes a viernes', value: 'a confirmar' },
    { days: 'Sábado', value: 'a confirmar' },
    { days: 'Domingo', value: 'a confirmar' },
  ],
} as const;

/** Hora límite para encargos «para hoy». */
export const sameDayCutoff = {
  confirmed: false,
  label: 'a confirmar',
} as const;

export const delivery = {
  shopCityConfirmed: 'Alcoy',
  zonesConfirmed: false,
  /** Hipótesis de comarca, no una lista cerrada. */
  zonesToConfirm: ['Cocentaina', 'Muro', 'Ibi', 'Onil', 'Castalla'],
  fee: 'a confirmar',
} as const;

export const founder = {
  role: 'Fundadora',
  training: 'Ingeniera técnica agrícola',
  name: null as string | null,
  photo: null as string | null,
} as const;

export const priceFrom = 'a confirmar' as const;

export const pendingItems = [
  { id: 'address', label: 'Dirección canónica (Placeta el Fossar, 3, o la alternativa C/ Sant Tomàs, 8)' },
  { id: 'hours', label: 'Horario de apertura' },
  { id: 'whatsapp', label: 'Que el +34 628 48 41 02 sea el WhatsApp del negocio' },
  { id: 'founder-name', label: 'Nombre de la fundadora' },
  { id: 'founder-photo', label: 'Foto de la fundadora' },
  { id: 'logo', label: 'Logo real (sustituir el wordmark provisional)' },
  { id: 'prices', label: 'Precios de ramos y plantas (ahora «desde a confirmar €»)' },
  { id: 'delivery-zones', label: 'Zonas de entrega y portes (Cocentaina, Muro, Ibi, Onil y Castalla son hipótesis)' },
  { id: 'same-day', label: 'Hora límite de encargos para hoy, y si incluye envío o solo recogida' },
  { id: 'payment', label: 'Forma de pago al cerrar el encargo (no hay pago en la web)' },
  { id: 'dedication', label: 'Si la tarjeta de dedicatoria va incluida' },
  { id: 'vase', label: 'Si ofrecen jarrón u otro extra' },
  { id: 'funeral', label: 'Si preparan flores de funeral o coronas de tanatorio (sin página en esta demo)' },
  { id: 'email', label: 'Correo electrónico de contacto' },
  { id: 'legal', label: 'Razón social y NIF para el aviso legal' },
  { id: 'workshops', label: 'Próximas fechas de talleres (las publicadas en Instagram ya pasaron)' },
  { id: 'reviews', label: 'Reseñas con permiso y nota oficial (no se muestran opiniones inventadas)' },
] as const;

export function phoneDigits(e164: string = siteConfig.whatsappE164): string {
  return e164.replace(/\D/g, '');
}
