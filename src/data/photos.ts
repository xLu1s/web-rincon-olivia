import type { ImageMetadata } from 'astro';
import type { PhotoId } from './catalog';
import p01 from '../assets/photos/01-ramo-ciudad-campo.jpg';
import p02 from '../assets/photos/02-ramo-silvestre.jpg';
import p03 from '../assets/photos/03-novia-angela-dalias.jpg';
import p04 from '../assets/photos/04-ramo-seco-preservado.jpg';
import p05 from '../assets/photos/05-taller-ramo-grupal.jpg';
import p06 from '../assets/photos/06-blanco-atemporal.jpg';
import p07 from '../assets/photos/07-flores-toque-rustico.jpg';
import p08 from '../assets/photos/08-flores-san-valentin.jpg';
import p09 from '../assets/photos/09-decoracion-flores-frutas.jpg';
import p10 from '../assets/photos/10-ramo-novia-hortensia.jpg';
import p11 from '../assets/photos/11-taller-ramo-caja-cesto.jpg';
import p12 from '../assets/photos/12-decoracion-floral-celebraciones.jpg';
import p13 from '../assets/photos/13-corona-flores-comunion.jpg';
import p14 from '../assets/photos/14-talleres-coronas-centros-navidad.jpg';
import p15 from '../assets/photos/15-plantas-dia-del-padre.jpg';

export const photos: Record<PhotoId, ImageMetadata> = {
  '01': p01,
  '02': p02,
  '03': p03,
  '04': p04,
  '05': p05,
  '06': p06,
  '07': p07,
  '08': p08,
  '09': p09,
  '10': p10,
  '11': p11,
  '12': p12,
  '13': p13,
  '14': p14,
  '15': p15,
};
