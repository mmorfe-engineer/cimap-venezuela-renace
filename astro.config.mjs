import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mmorfe-engineer.github.io',
  base: '/cimap-venezuela-renace/',
  trailingSlash: 'always',
  output: 'static',
  devToolbar: { enabled: false }
});
