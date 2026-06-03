import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 作品（ケーススタディ本文あり）。1作品 = 1つの .md ファイル。
// 新規追加は `npm run new:work <slug>` が便利。
const work = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.union([z.number(), z.string()]).optional(),
      cover: image().optional(), // src/assets配下の画像を astro:assets で最適化（無くても可）
      demoUrl: z.string().url().optional(),
      repoUrl: z.string().url().optional(),
      tech: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

// 実績(Recognition)と登壇(Speaking)は単一データファイルで管理:
//   src/data/achievements.ts  /  src/data/talks.ts
export const collections = { work };
