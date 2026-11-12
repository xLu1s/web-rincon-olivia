import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://xlu1s.github.io',
  base: '/web-rincon-olivia',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
