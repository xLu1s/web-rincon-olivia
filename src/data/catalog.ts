import type { BouquetTypeId, OccasionId } from '../lib/filters';

export type PhotoId =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15';

type Copy = {
  name: string;
  summary: string;
  description: string;
  flowersNote: string;
  alt: string;
};

export type Bouquet = {
  slug: string;
  photo: PhotoId;
  type: BouquetTypeId;
  occasions: OccasionId[];
  /** Ninguno está confirmado para entrega en el día. */
  sameDay: false;
  instagramPost: string;
  instagramDate: string;
  copy: { es: Copy };
};

/**
 * Ramos publicados en Instagram @rincondeolivia.
 * Los nombres salen del pie de foto cuando existe; si no, del sentido de la publicación.
 * No hay precios confirmados.
 */
export const bouquets: Bouquet[] = [
  {
    slug: 'ciudad-y-campo',
    photo: '01',
    type: 'fresco',
    occasions: ['cumpleanos', 'aniversario', 'gracias'],
    sameDay: false,
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DfNe-gPiEQg/',
    instagramDate: '2026-11-01',
    copy: {
      es: {
        name: 'Ciudad y campo',
        summary: 'Ramo amplio, de color, para la ciudad o el campo.',
        description:
          'Un ramo grande, sostenido a la puerta, con crisantemos rosas y blancos, gerberas amarillas y verde. En la publicación dicen que hay ramos que combinan con la ciudad, con el campo y contigo.',
        flowersNote:
          'Lo que se ve en la foto de noviembre de 2026. La flor de otra semana puede cambiar; el tono se confirma al encargarlo.',
        alt: 'Persona sentada en un portal de granito sostiene un ramo grande de crisantemos rosas y blancos, gerberas amarillas y follaje, envuelto en papel kraft.',
      },
    },
  },
  {
    slug: 'silvestre',
    photo: '02',
    type: 'fresco',
    occasions: ['cumpleanos', 'nacimiento', 'gracias'],
    sameDay: false,
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DaqOoLGiCkc/',
    instagramDate: '2026-07-11',
    copy: {
      es: {
        name: 'Silvestre',
        summary: 'Ramo fresco, alegre y orgánico, con flor de temporada.',
        description:
          'Composición suelta, con girasoles, flor blanca menuda y verde. Lo describen como un ramo fresco, alegre, silvestre y orgánico, hecho con materiales del entorno y de la temporada.',
        flowersNote:
          'Publicado en julio de 2026. Cada ramo es único y la flor sigue a la estación.',
        alt: 'Ramo silvestre con girasoles, flores blancas y verde, publicado por la floristería.',
      },
    },
  },
  {
    slug: 'angela',
    photo: '03',
    type: 'novia',
    occasions: [],
    sameDay: false,
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/Dc-_69HCLWN/',
    instagramDate: '2026-09-07',
    copy: {
      es: {
        name: 'Angela',
        summary: 'Ramo de novia con dalias de temporada.',
        description:
          'Ramo de novia publicado con el nombre Angela: dalias de temporada, en naranja y terracota, con follaje. Lo presentan como un ramo con carácter, naturalidad y movimiento.',
        flowersNote:
          'Dalias de la publicación de septiembre de 2026. Fuera de esa temporada se busca una flor del mismo tono, y se confirma antes.',
        alt: 'Ramo de novia Angela: dalias naranjas de temporada y hojas verdes, sujeto con la mano sobre un vestido blanco.',
      },
    },
  },
  {
    slug: 'seco-preservado',
    photo: '04',
    type: 'seco',
    occasions: ['gracias', 'aniversario'],
    sameDay: false,
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DYMH8CYCGxH/',
    instagramDate: '2026-05-11',
    copy: {
      es: {
        name: 'Seco preservado',
        summary: 'Ramo seco y preservado, para decorar y recordar.',
        description:
          'Ramo seco-preservado en jarrón de vidrio. En la publicación lo proponen para decorar espacios y recordar momentos especiales.',
        flowersNote:
          'Es flor seca y preservada, no un ramo fresco. El color y el volumen de la foto son de mayo de 2026.',
        alt: 'Ramo seco y preservado, de colores, colocado en un jarrón de vidrio.',
      },
    },
  },
  {
    slug: 'hortensia-blanca',
    photo: '10',
    type: 'novia',
    occasions: [],
    sameDay: false,
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DO9OuuSiEa-/',
    instagramDate: '2025-09-23',
    copy: {
      es: {
        name: 'Hortensia blanca',
        summary: 'Ramo de novia blanco, fresco y atemporal.',
        description:
          'Ramo compacto de hortensia blanca con eucalipto. Lo describen como un ramo blanco, fresco y atemporal, que habla sin decir una palabra.',
        flowersNote: 'Hortensia blanca de la publicación de septiembre de 2025. La disponibilidad se confirma al encargarlo.',
        alt: 'Mano que sostiene un ramo compacto de hortensia blanca con hojas de eucalipto.',
      },
    },
  },
  {
    slug: 'rosas-celebracion',
    photo: '12',
    type: 'fresco',
    occasions: ['aniversario', 'gracias'],
    sameDay: false,
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DNBlbLvMQp_/',
    instagramDate: '2025-08-06',
    copy: {
      es: {
        name: 'Rosas de celebración',
        summary: 'Ramo de rosas crema y blush para una celebración.',
        description:
          'Ramo de rosas en crema y blush. La publicación habla de decoraciones florales para celebraciones, y lleva las etiquetas de bodas y bodas de plata en Alcoy.',
        flowersNote: 'Rosas de la foto de agosto de 2025. El ramo de ahora se compone con la flor disponible, en esa gama.',
        alt: 'Ramo de rosas crema y rosa pálido, sostenido en la mano.',
      },
    },
  },
  {
    slug: 'san-valentin',
    photo: '08',
    type: 'fresco',
    occasions: [],
    sameDay: false,
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DUWJrrbCFI7/',
    instagramDate: '2026-02-04',
    copy: {
      es: {
        name: 'Flores de San Valentín',
        summary: 'Flores en tonos claros, publicadas para el mes del amor.',
        description:
          'Publicación de febrero de 2026, con flores rosa pálido y blanco y un aviso de encargos de San Valentín. Invitan a celebrarlo con flores.',
        flowersNote:
          'La foto es de ese febrero. El ramo de San Valentín de otra campaña se prepara a medida y el precio está a confirmar.',
        alt: 'Flores rosa pálido y blanco de la publicación de San Valentín de la floristería.',
      },
    },
  },
];

export type PortfolioItem = {
  slug: string;
  photo: PhotoId;
  instagramPost: string;
  instagramDate: string;
  copy: { es: { title: string; detail: string; alt: string } };
};

export const portfolio: PortfolioItem[] = [
  {
    slug: 'boda-aa',
    photo: '09',
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DOT_1WFiAnu/',
    instagramDate: '2025-09-07',
    copy: {
      es: {
        title: 'Boda A&A · flores y frutas',
        detail: 'Mesa de celebración con flores, fruta y verde. Publicada como la boda A&A.',
        alt: 'Mesa de boda con un frente de hortensias, gerberas y anturios, y fruta sobre el mantel.',
      },
    },
  },
  {
    slug: 'angela-novia',
    photo: '03',
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/Dc-_69HCLWN/',
    instagramDate: '2026-09-07',
    copy: {
      es: {
        title: 'Ramo de novia Angela',
        detail: 'Dalias de temporada. Uno de los ramos de novia que destacan en su Instagram.',
        alt: 'Ramo de novia de dalias naranjas y follaje.',
      },
    },
  },
  {
    slug: 'hortensia-novia',
    photo: '10',
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DO9OuuSiEa-/',
    instagramDate: '2025-09-23',
    copy: {
      es: {
        title: 'Ramo de hortensia blanca',
        detail: 'Ramo de novia blanco, fresco y atemporal, publicado con la etiqueta de Alcoy.',
        alt: 'Ramo de hortensia blanca con eucalipto.',
      },
    },
  },
  {
    slug: 'blanco',
    photo: '06',
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DQKaa2TiPUd/',
    instagramDate: '2025-10-23',
    copy: {
      es: {
        title: 'Blanco atemporal',
        detail: 'Decoración en blanco, descrita como pura, clásica y atemporal. No se indica el tipo de evento.',
        alt: 'Decoración floral blanca alrededor de un sofá rosa.',
      },
    },
  },
  {
    slug: 'rustico',
    photo: '07',
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DQpi6BFCHDq/',
    instagramDate: '2025-11-04',
    copy: {
      es: {
        title: 'Toque rústico',
        detail: 'Flores alegres sobre un montaje rústico, al aire libre.',
        alt: 'Instalación floral de colores sobre pacas de paja, al aire libre.',
      },
    },
  },
  {
    slug: 'rosas',
    photo: '12',
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DNBlbLvMQp_/',
    instagramDate: '2025-08-06',
    copy: {
      es: {
        title: 'Celebración',
        detail: 'Ramo de rosas crema y blush para una celebración. La publicación menciona bodas y bodas de plata.',
        alt: 'Ramo de rosas crema y blush.',
      },
    },
  },
  {
    slug: 'corona-comunion',
    photo: '13',
    instagramPost: 'https://www.instagram.com/rincondeolivia/reel/DH0ViPNMhr9/',
    instagramDate: '2025-03-30',
    copy: {
      es: {
        title: 'Corona de flores',
        detail: 'Corona o diadema de flores blancas, publicada con la etiqueta de comuniones. El precio está a confirmar.',
        alt: 'Corona de flores blancas sostenida con las dos manos.',
      },
    },
  },
];

export function bouquetBySlug(slug: string): Bouquet | undefined {
  return bouquets.find((item) => item.slug === slug);
}
