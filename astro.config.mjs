// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// 編集UI(Keystatic)は開発時だけ有効化する。
// 本番ビルド(astro build = NODE_ENV=production)では外し、サイトは静的のまま保つ
// （= Cloudflare の静的デプロイ構成を壊さない）。
const enableKeystatic = process.env.NODE_ENV !== 'production';

// https://astro.build/config
export default defineConfig({
  // 公開先（Cloudflare）。sitemap/OGPの絶対URL生成に使う
  site: 'https://dolphythewolf.m1sum1.workers.dev',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap(), ...(enableKeystatic ? [react(), keystatic()] : [])]
});