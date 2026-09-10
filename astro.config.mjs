import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: replace with the real production domain once the client confirms one.
const SITE_URL = 'https://hammerresidence.example';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
});
