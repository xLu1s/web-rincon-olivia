# Rincón de Olivia

Demo de web para la floristería de autor Rincón de Olivia, en Alcoy (Alcoi). Propuesta de Luis Balaguer. Estática, en castellano, con el menú preparado para añadir valenciano.

Publicación prevista: [https://xlu1s.github.io/web-rincon-olivia/](https://xlu1s.github.io/web-rincon-olivia/)

Los encargos no se pagan en la web: abren WhatsApp con el ramo, la ocasión, la fecha y la dedicatoria. El número está en `src/data/site.ts` (`whatsappE164`) y queda marcado como **a confirmar**.

## Datos que hay que confirmar

Todo lo pendiente vive en `src/data/site.ts` (`pendingItems`, dirección, horario, fundadora, precios, zonas). No hay reseñas inventadas.

## Comandos

```bash
npm test
npm run build
npm run test:e2e
npm run dev
```

## Idiomas

`src/i18n/index.ts` declara `es` y `va`. Solo `es` tiene textos. `vaReady` sigue en `false` hasta que exista la traducción.
