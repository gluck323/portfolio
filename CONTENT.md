# コンテンツの編集ガイド

更新のしかたは2通り。**文章のちょい変更や実績の追加なら、ブラウザのエディタ（おすすめ）**が楽です。

> ヒント: Claude Code に「実績の△△を直して」「◯◯という作品を追加して」と頼むだけでも編集できます。

---

## 0. ブラウザのエディタで編集（おすすめ・Keystatic）

コードを触らず、フォーム画面で編集できます。

```bash
npm run dev
```
→ ブラウザで **http://localhost:4321/keystatic** を開く。次の3つをフォームで編集できます:

- **サイト設定 / プロフィール** … 表示名・Heroの見出し/一文・About文・メール・SNS・note名・Focus
- **実績 (Recognition)** … 「項目を追加」で新しい実績を足す（並びは日付順に自動）
- **登壇 (Speaking)** … スライドの埋め込みを追加（空ならセクション非表示）

編集して保存すると、対応するファイル（`src/data/cms/*.json`）が書き換わります。
あとは公開するだけ:

```bash
git add -A
git commit -m "update content"
git push        # → 自動でビルド＆公開
```

メモ:
- このエディタは**手元で `npm run dev` 中だけ**動きます（本番サイトは静的のまま）。将来、スマホ/ブラウザからのクラウド編集にも拡張できます。
- **作品(Work)** は本文がMarkdownなので、今はエディタ対象外（下の 1. を参照）。

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

本文（`##` 見出し以下）に概要・工夫・学びを書きます。雛形は [_template.md](src/content/work/_template.md)。
**作品を消す**: そのファイルを削除するか `draft: true`。

---

## 2. 実績（Recognition）

- かんたん: **エディタ**の「実績」で追加・編集（上の 0.）
- 直接: [src/data/cms/achievements.json](src/data/cms/achievements.json) の `items` 配列を編集
- `type`: `award`(受賞/1位) / `contribution`(寄稿) / `talk`(登壇) / `other`(制作・出演など)。`org`・`url` は任意。並びは日付の新しい順に自動。

## 3. 登壇（Speaking）

- かんたん: **エディタ**の「登壇」で追加（上の 0.）
- 直接: [src/data/cms/talks.json](src/data/cms/talks.json) の `items` 配列を編集
- `embedUrl` の作り方: **Speaker Deck** `https://speakerdeck.com/player/<ID>` ／ **Docswell** `https://www.docswell.com/slide/<ID>/embed` ／ SlideShare・Google Slides は各埋め込みURL

## 4. プロフィール・About・SNS

- かんたん: **エディタ**の「サイト設定 / プロフィール」（上の 0.）
- 直接: [src/data/cms/site.json](src/data/cms/site.json)（表示名・`tagline`・`intro`・`aboutLead`/`aboutBody`・メール・SNS・`noteUsername`・`focus`）
- ※ ナビ項目だけはコード側 [src/data/site.ts](src/data/site.ts) の `nav`

## 5. note 記事

`noteUsername` を設定済み。**記事は自動取得**（ビルド時）。note に投稿 → 再ビルド（=push）で最新が反映されます。

## 6. 見た目（色・フォント・余白のルール）

デザインの決まりごとは [DESIGN.md](DESIGN.md)。色やフォントは [src/styles/global.css](src/styles/global.css) のトークン（`--accent` など）を編集。

## 7. お問い合わせフォーム（任意）

静的サイトのまま動くフォーム（**Web3Forms**・無料・サーバー不要）。
1. https://web3forms.com で自分のメールを入れて **Access Key** を無料取得
2. `/keystatic` →「サイト設定」→ **「お問い合わせフォーム: Web3Forms Access Key」** にキーを貼って保存
3. → Contact にフォームが表示され、送信は自分のメールに届く（空欄なら非表示）

---

## 確認と公開

```bash
npm run dev      # http://localhost:4321 でプレビュー（/keystatic でエディタ）
npm run build    # 本番ビルド（dist/）。note記事もここで取得される
```

公開: **`git push` するだけ**（Cloudflare がGitHub連携で自動ビルド＆デプロイ。本番 https://dolphythewolf.m1sum1.workers.dev/ ）。
手動で再デプロイは Cloudflareダッシュボード → 該当プロジェクト → Deployments から。
