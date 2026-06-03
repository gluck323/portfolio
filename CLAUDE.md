# CLAUDE.md

このリポジトリで作業するエージェント向けの最初に読むファイル。詳細は [DESIGN.md](DESIGN.md)（デザイン規則）と [CONTENT.md](CONTENT.md)（編集手順）に分離している。

## これは何か
**Kota Takahashi の個人ポートフォリオサイト。** ゲーム制作・映像制作・Webアプリ制作の作品、note記事、これまでの実績を1か所に集約する。
公開先は **Cloudflare Pages（`dolphy.pages.dev`）の静的サイト**。独自ドメインは当面なし。

最重要の前提: **「いかにもAIが量産したVibe Codingっぽい見た目」を避ける**こと。方向性は**エディトリアル／タイポグラフィ主導**。デザインを変更・追加するときは必ず [DESIGN.md](DESIGN.md) の規則と禁止リストに従う。

## 技術スタック
- **Astro 6**（静的出力 / Content Collections / View Transitions）
- **Tailwind CSS v4**（`@tailwindcss/vite`。設定は `tailwind.config` ではなく `src/styles/global.css` の `@theme` と CSS変数）
- **TypeScript（strict）**
- フォント: **Crimson Pro × Inter**（＋ 日本語 Noto Serif/Sans JP）を Fontsource でセルフホスト
- **shadcn/ui は使わない**（量産っぽさの主因のため）。UIは自作 ＋ `@layer components` で意味のある名前に抽象化。

## コマンド
```bash
npm run dev                         # http://localhost:4321 プレビュー
npm run build                       # 本番ビルド（dist/）。note記事もここで取得
npm run preview                     # dist を配信して確認
npm run new:work <slug> "タイトル"   # 作品ページの雛形を生成
```
デプロイ: `npx wrangler login`（人手で1回）→ `npm run build` → `npx wrangler pages deploy dist --project-name dolphy`

## どこを編集するか（コンテンツ）
**まず [CONTENT.md](CONTENT.md) を読む。** 要点:
- 実績(Recognition) … [src/data/achievements.ts](src/data/achievements.ts)（配列を編集。日付降順に自動）
- 登壇(Speaking) … [src/data/talks.ts](src/data/talks.ts)（空ならセクション非表示）
- 作品(Work) … `src/content/work/<slug>.md`（本文ありMarkdown。雛形は `_template.md`）
- プロフィール/SNS/Hero/note名 … [src/data/site.ts](src/data/site.ts)
- 自己紹介文 … [src/components/About.astro](src/components/About.astro)
- note記事 … 自動取得（`site.ts` の `noteUsername` → [src/lib/note.ts](src/lib/note.ts)、失敗時 `src/data/noteFallback.ts`）

## どこを編集するか（構造・見た目）
- デザイン規則・禁止事項 … [DESIGN.md](DESIGN.md)
- カラー/フォントのトークン … [src/styles/global.css](src/styles/global.css)（`:root`/`.dark` のCSS変数、`@theme inline`、`@layer components`）
- ページ共通の枠（SEO/OGP・ダークモード・遷移）… [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro)
- セクション部品 … [src/components/](src/components/)（Hero, WorkItem, ArticleCard, SlideEmbed, Timeline, Header, Footer, ThemeToggle, SectionHeading, About）
- トップの構成 … [src/pages/index.astro](src/pages/index.astro)（Hero→Work→Writing→Speaking→Recognition→About→Contact）
- 作品詳細ページ … [src/pages/work/[slug].astro](src/pages/work/%5Bslug%5D.astro)
- コレクション定義 … [src/content.config.ts](src/content.config.ts)（現在は `work` のみ）

## デザインの鉄則（変更時は必ず守る）
- **禁止**: グラデーション / 絵文字 / Interを見出しに単体使用 / ガラスモーフィズム / Bentoグリッド / 3カード横並び / プログレスバー / `rounded-lg`以上 / `shadow-md`以上 / 全セクション中央寄せ / 誇張コピー
- 色は3トークン（`paper`/`ink`/`accent`=テラコッタ `#8B3A2F`）のみ。見出しはセリフ・左揃え・非対称グリッド・余白で見せる。
- **変更後の監査**: `gradient` `rounded-lg` `rounded-full` `shadow-md` `backdrop-blur` `text-center` と絵文字を grep して混入していないか確認（`linear-gradient(var(--accent),var(--accent))` は下線アニメ用の単色なので例外）。

## 現在のコンテンツ状態
- Work: 「IIDX HOTOKE ARENA S2 特設サイト」1件（featured）。
- Recognition: 8件（音GEN寄稿 / 早慶戦ロゴ監修 / Bemani Keio Meister / オトゲラボ取材 / BBD MAGAZINE寄稿 / 楽曲リリース / IR PV / ランキングツール）。
- Speaking: 0件（`talks.ts` が空なので非表示）。
- note: `japanese_goblin` から自動取得。

## 既知の小メモ
- Footerの年は手動の固定値（[src/components/Footer.astro](src/components/Footer.astro) の `year`）。年が変わったら更新。
- 作品の画像は未設定（文字プレースホルダー表示）。`src/assets/work/` に置き frontmatter の `cover:` を有効化すると最適化表示。
- OGP画像 `public/og-default.png` は未配置（SNS共有の見栄え用に1200×630を置くと良い）。
- 計画の記録: `C:\Users\Sachi\.claude\plans\web-note-1-ancient-coral.md`
