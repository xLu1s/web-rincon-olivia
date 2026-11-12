import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

await mkdir('public', { recursive: true });
await sharp('src/assets/photos/01-ramo-ciudad-campo.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 72, mozjpeg: true })
  .toFile('public/og.jpg');
