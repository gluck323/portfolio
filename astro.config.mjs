// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 公開先（Cloudflare Pages）。sitemap/OGPの絶対URL生成に使う
  site: 'https://dolphythewolf.m1sum1.workers.dev',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});