import type { PhotoId } from './catalog';

export type Workshop = {
  id: string;
  photo: PhotoId;
  instagramPost: string;
  instagramDate: string;
  announcedPrice: string | null;
  copy: {
    es: {
      title: string;
      summary: string;
      facts: string[];
      pending: string;
      alt: string;
    };
  };
};

/** Solo datos que figuran en las publicaciones de Instagram. Las fechas ya no están vigentes. */
export const workshops: Workshop[] = [
  {
    id: 'navidad',
    photo: '14',
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DCD_U-ZMTPH/',
    instagramDate: '2024-11-07',
    announcedPrice: '45 euros',
    copy: {
      es: {
        title: 'Talleres navideños: coronas y centros de mesa',
        summary: 'Anuncio de talleres de coronas y centros de mesa, en grupos reducidos.',
        facts: [
          'Talleres de coronas',
          'Centros de mesa',
          'Grupos reducidos',
          '5 de diciembre, 19:00–21:00',
          '12 de diciembre, 19:00–21:00',
          '19 de diciembre, 19:00–21:00',
          'Precio anunciado: 45 euros',
          'Reservas por mensaje directo',
        ],
        pending:
          'El post es del 7 de noviembre de 2024, así que esas fechas ya pasaron. La próxima edición está a confirmar.',
        alt: 'Cartel de talleres navideños con una corona y un centro de mesa de verde y bayas.',
      },
    },
  },
  {
    id: 'caja-o-cesto',
    photo: '11',
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DFTUMilM8E2/',
    instagramDate: '2025-01-26',
    announcedPrice: '50 €',
    copy: {
      es: {
        title: 'Taller de ramo de flores en caja o cesto',
        summary: 'Cartel del taller de ramo en caja o cesto, con plazas limitadas.',
        facts: [
          '6 de febrero, 18:30–20:30',
          '20 de febrero, 18:30–20:30',
          'Plazas limitadas',
          'Precio anunciado: 50 €',
          'Reservas por mensaje directo y en el 628 48 41 02',
        ],
        pending:
          'El año no está escrito en el cartel. El post es del 26 de enero de 2025. Esas sesiones ya no están abiertas. La próxima fecha está a confirmar.',
        alt: 'Cartel del taller de ramo de flores en caja o cesto.',
      },
    },
  },
  {
    id: 'grupal',
    photo: '05',
    instagramPost: 'https://www.instagram.com/rincondeolivia/p/DUB1H44CFb1/',
    instagramDate: '2026-01-27',
    announcedPrice: null,
    copy: {
      es: {
        title: 'Taller de ramo de flores grupal',
        summary: 'Un grupo compartiendo el gusto por la artesanía floral, en el taller.',
        facts: ['Taller de ramo de flores en grupo', 'Publicado el 27 de enero de 2026'],
        pending: 'En el texto no hay precio, horario ni una próxima fecha. Todo eso está a confirmar.',
        alt: 'Participantes de un taller de ramo trabajan con flores sueltas en una mesa.',
      },
    },
  },
];
