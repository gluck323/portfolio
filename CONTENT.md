# コンテンツの編集ガイド

このサイトの中身は、ほぼ **数か所のファイルを編集するだけ**で更新できます。
編集したら `npm run dev`（ローカル確認）→ 問題なければデプロイ（末尾参照）。

> ヒント: Claude Code に「◯◯という作品を追加して」「実績の△△を直して」と頼むだけでも編集できます。

---

## 1. 作品を追加する（Work）

作品はケーススタディ本文を持つので、1作品＝1つの Markdown ファイルです。

```bash
npm run new:work <slug> "タイトル"
# 例:
npm run new:work iidx-arena-s3 "IIDX HOTOKE ARENA S3 特設サイト"
```

→ `src/content/work/<slug>.md` が生成されます。開いて以下を編集:

| 項目 | 説明 |
|------|------|
| `title` / `summary` | タイトルと一覧用の一言 |
| `year` | 年（"2026" など） |
| `demoUrl` / `repoUrl` | デモ・ソースのURL（不要なら行ごと削除） |
| `tech` | 使用技術の配列（バッジ表示） |
| `featured` | `true` でトップ上位に |
| `order` | 小さいほど先に表示 |
| `draft` | `true` で非公開 |
| `cover` | 画像。`src/assets/work/` に置き、`cover:` の行を有効化 |

本文（`##` 見出し以下）に概要・工夫・学びを書きます。
雛形の見本は [src/content/work/_template.md](src/content/work/_template.md)。

**作品を消す**: そのファイルを削除するか `draft: true`。

---

## 2. 実績を編集する（Recognition）

実績は本文がないので、**1つのファイルにまとめて**あります:
[src/data/achievements.ts](src/data/achievements.ts)

配列に1行足す/消す/書き換えるだけ。並び順は**日付の新しい順に自動**。

```ts
{ title: '◯◯に寄稿', date: '2026-03-01', type: 'contribution', org: '媒体名', url: 'https://...' },
```

- `type`: `award`(受賞/1位) / `contribution`(寄稿) / `talk`(登壇) / `other`(制作・出演など)
- `org`・`url` は任意

---

## 3. 登壇スライドを追加する（Speaking）

[src/data/talks.ts](src/data/talks.ts) の配列に追記。**空ならセクションごと非表示**。

```ts
{ title: '発表タイトル', event: 'イベント名', date: '2026-02-10',
  provider: 'speakerdeck', embedUrl: 'https://speakerdeck.com/player/<ID>' },
```

`embedUrl` の作り方（ファイル冒頭のコメントにも記載）:
- **Speaker Deck**: 共有 → Embed の `https://speakerdeck.com/player/<ID>`
- **Docswell**: 埋め込みコードの `https://www.docswell.com/slide/<ID>/embed`
- **SlideShare / Google Slides**: 各サービスの埋め込みURL

---

## 4. プロフィール・連絡先・SNS

[src/data/site.ts](src/data/site.ts) … 表示名 / Heroの見出し(`tagline`) / 一文(`intro`) / メール / SNS / note のユーザー名。
自己紹介の文章は [src/components/About.astro](src/components/About.astro)。

## 5. note 記事

`site.ts` の `noteUsername` を設定済み。**記事は自動取得**（ビルド時）なので、
note に投稿 → サイトを再ビルドすれば最新が反映されます。

## 6. 見た目（色・フォント・余白のルール）

デザインの決まりごとは [DESIGN.md](DESIGN.md) に集約。色やフォントを変えるときは
[src/styles/global.css](src/styles/global.css) のトークン（`--accent` など）を編集。

---

## 確認と公開

```bash
npm run dev      # http://localhost:4321 でプレビュー
npm run build    # 本番ビルド（dist/）。note記事もここで取得される
```

公開: **`git push` するだけ**（Cloudflare がGitHub連携で自動ビルド＆デプロイ。本番 https://dolphythewolf.m1sum1.workers.dev/ ）。
手動で再デプロイしたい場合は Cloudflareダッシュボード → 該当プロジェクト → Deployments から再実行。
