import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 作品（ケーススタディ本文あり / Markdoc）。1作品 = 1つの .mdoc ファイル。
// /keystatic の「作品 (Work)」フォームで編集できる（cover画像のアップロードも可）。
const work = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdoc', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().default(''),
    year: z.union([z.number(), z.string()]).optional(),
    cover: z.string().optional(), // /images/work/... （Keystaticが public に保存したURL）
    demoUrl: z.string().optional(), // Keystaticは空欄を "" で書くため url() 検証はしない
    repoUrl: z.string().optional(),
    tech: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

// 実績(Recognition)と登壇(Speaking)は単一データファイルで管理:
//   src/data/cms/achievements.json  /  src/data/cms/talks.json
export const collections = { work };
