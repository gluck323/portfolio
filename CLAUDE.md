# CLAUDE.md

このリポジトリで作業するエージェント向けの最初に読むファイル。詳細は [DESIGN.md](DESIGN.md)（デザイン規則）と [CONTENT.md](CONTENT.md)（編集手順）に分離している。

## これは何か
**Kota Takahashi の個人ポートフォリオサイト。** ゲーム制作・映像制作・Webアプリ制作の作品、note記事、これまでの実績を1か所に集約する。
公開先は **Cloudflare（Workers／静的アセット, `dolphythewolf.m1sum1.workers.dev`）の静的サイト**。独自ドメインは当面なし。

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
npm run studio                      # dev + 自動push（/keystaticで保存→自動commit&push→自動デプロイ）
npm run build                       # 本番ビルド（dist/）。note記事もここで取得
npm run preview                     # dist を配信して確認
npm run new:work <slug> "タイトル"   # 作品ページの雛形を生成
```
編集UI(Keystatic): `npm run dev`（または `npm run studio`）起動中に **http://localhost:4321/keystatic** で work/site/実績/登壇をフォーム編集（dev時のみ有効・本番は静的）。`studio` ならコンテンツ保存で自動公開（[scripts/auto-push.mjs](scripts/auto-push.mjs) が `src/data/cms` `src/content/work` `public/images` を監視）。

デプロイ: **GitHubにpushすると自動**（Cloudflare Workers(静的アセット) を `gluck323/portfolio` にGit連携、production branch=main）。手動の再デプロイは Cloudflareダッシュボード → 該当プロジェクト → Deployments から。本番URL: https://dolphythewolf.m1sum1.workers.dev

> ⚠️ デプロイ設定は [wrangler.jsonc](wrangler.jsonc)（`dist` を静的アセットとして配信）。**`@astrojs/cloudflare` アダプタは入れないこと**。入れるとSSR化＋KVセッションのプロビジョニングでビルドが失敗する（静的のままにする）。`wrangler.jsonc` の `name` は Worker名 `dolphythewolf` と一致させる。

## どこを編集するか（コンテンツ）
**まず [CONTENT.md](CONTENT.md) を読む。** 要点:
- 実績(Recognition) … **/keystatic の「実績」** or [src/data/cms/achievements.json](src/data/cms/achievements.json)（日付降順に自動）
- 登壇(Speaking) … **/keystatic の「登壇」** or [src/data/cms/talks.json](src/data/cms/talks.json)（空ならセクション非表示）
- 作品(Work) … `src/content/work/<slug>.md`（本文ありMarkdown。雛形は `_template.md`。※エディタ未対応）
- プロフィール/SNS/Hero/About文/note名 … **/keystatic の「サイト設定」** or [src/data/cms/site.json](src/data/cms/site.json)。`src/data/*.ts` はそのJSONを読む薄いラッパー（ナビ`nav`と`locale`のみコード側）
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
- **カラーモードはダーク固定**（`<html class="dark">`、トグルなし）。
- **変更後の監査**: `gradient` `rounded-lg` `rounded-full` `shadow-md` `backdrop-blur` `text-center` と絵文字を grep して混入していないか確認。例外＝下線アニメの単色 `linear-gradient(var(--accent),var(--accent))` と、Heroマーキーの端フェード `mask-image: linear-gradient(...)`（色の塗りではなくマスク）。

## 現在のコンテンツ状態
- Work: 「IIDX HOTOKE ARENA S2 特設サイト」1件（featured）。
- Recognition: 8件（音GEN寄稿 / 早慶戦ロゴ監修 / Bemani Keio Meister / オトゲラボ取材 / BBD MAGAZINE寄稿 / 楽曲リリース / IR PV / ランキングツール）。
- Speaking: 0件（`talks.json` が空なので非表示）。
- note: `japanese_goblin` から自動取得。

## 既知の小メモ
- 編集UI(Keystatic)は **dev時のみ有効**（[astro.config.mjs](astro.config.mjs) で `NODE_ENV` ゲート、`@astrojs/react`+`@keystatic/astro`）。本番ビルドからは外れ静的のまま。データは `src/data/cms/*.json`、定義は [keystatic.config.ts](keystatic.config.ts)。storageは `local`（手元編集）。後でGitHubクラウド編集に拡張可。
- Footerの年は手動の固定値（[src/components/Footer.astro](src/components/Footer.astro) の `year`）。年が変わったら更新。
- 作品の画像は未設定（文字プレースホルダー表示）。`src/assets/work/` に置き frontmatter の `cover:` を有効化すると最適化表示。
- OGP画像 `public/og-default.png` は未配置（SNS共有の見栄え用に1200×630を置くと良い）。
- 計画の記録: `C:\Users\Sachi\.claude\plans\web-note-1-ancient-coral.md`
