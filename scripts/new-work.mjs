#!/usr/bin/env node
// 作品ページの雛形を生成する小さなヘルパー。
// 使い方:
//   npm run new:work <slug> "タイトル"
//   例: npm run new:work iidx-arena-s3 "IIDX HOTOKE ARENA S3 特設サイト"
//
// 既存ファイルは上書きしません。生成後 src/content/work/<slug>.md を編集してください。

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [, , slugRaw, ...titleParts] = process.argv;

if (!slugRaw) {
  console.error('Usage: npm run new:work <slug> "タイトル"');
  process.exit(1);
}

const slug = slugRaw
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9\-]+/g, '-')
  .replace(/^-+|-+$/g, '');

const title = titleParts.join(' ').trim() || slug;
const year = new Date().getFullYear(); // 生成日の年（必要なら編集）

const dir = join(process.cwd(), 'src', 'content', 'work');
const file = join(dir, `${slug}.mdoc`);

if (existsSync(file)) {
  console.error(`既に存在します: ${file}`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });

const body = `---
title: "${title}"
summary: "一覧カードに出る短い説明（1文）。"
year: "${year}"
demoUrl: "https://example.com"
repoUrl: "https://github.com/..."
tech: ["React", "TypeScript"]
featured: false
order: 10
draft: false
---

## 概要

何を作ったか。

## 工夫した点

- ポイントを箇条書きで。
`;

writeFileSync(file, body, 'utf8');
console.log(`✓ 作成しました: src/content/work/${slug}.mdoc`);
console.log('  → /keystatic の「作品 (Work)」、または直接ファイルで編集できます。');
