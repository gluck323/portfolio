# DESIGN.md — Portfolio Design Constitution

> このファイルは「デザインの単一の真実」です。コンポーネントを作る・直すときは必ずここに従うこと。
> 目的: AIが量産する“Vibe Codingっぽい”見た目を避け、**エディトリアル／タイポグラフィ主導**の上品なサイトにする。

## 方向性
Editorial / Typography-led — 雑誌のように **大きなセリフ見出し・左揃え・非対称グリッド・余白で語る**。
装飾より文章と階層で見せる。note記事（=文章）が映えること。知的・落ち着き・作り手の人間味。

## Color（3色軸。Tailwindデフォルト色 indigo/blue/cyan 等は使用禁止）
| 役割 | Light | Dark |
|------|-------|------|
| 背景 paper | `#FAF8F4` | `#14110F` |
| 文字 ink   | `#1A1714` | `#ECE7DF` |
| アクセント accent | `#8B3A2F`（テラコッタ） | `#C9745E`（明るめテラコッタ） |
| 補助 muted | `#6B6259` | `#9A9087` |
| 罫線 rule  | `#E2DCD2` | `#2C2722` |

- アクセントは**1色だけ**。使う場所: リンクのhover下線 / 見出しの一語強調 / 日付・番号 / 罫線アクセント。面で塗らない。

## Typography
- **Display（見出し）**: 英 = `Crimson Pro`（serif, weight 400–500）/ 和 = `Noto Serif JP`。サイズ大（clamp 40–104px）、行間つめ（1.05–1.15）、**左揃え**、字間わずかにマイナス。
- **Body（本文）**: 英 = `Inter` / 和 = `Noto Sans JP`。16–18px、line-height 1.7、行長 55–75文字。
- **Label（小見出し/メタ）**: Inter、12–13px、`letter-spacing: 0.12em`、`text-transform: uppercase`、muted色。
- 全体に `font-feature-settings: "liga" 1, "kern" 1;`。

## Layout
- 12カラムの非対称グリッド。要素ごとに col-span を変え、**意図的にずらす**（左寄せの本文＋右にメタ等）。
- **中央寄せは原則禁止**（Heroも左揃え＋キーライン）。ロゴ等の例外のみ可。
- セクション間: 96px(SP) – 160px(PC)。コンテンツ最大幅は本文 ~68ch / ワイド ~1200px。
- 区切りは**ヘアライン罫線(1px, rule色)** を多用（影で区切らない）。

## Components
- **Button/Link CTA**: 角丸 0–2px、`uppercase`、`letter-spacing 0.08em`、**影なし**。下線 or 枠線で示す。
- **Card / WorkItem**: 影なし。区切りは1pxの罫線。サムネは角丸0–2px。3カード横並びにしない（番号付きリスト or 左右交互）。
- **リンクhover**: 下線をスライドイン等の**最小モーション**のみ。
- **モーション**: スクロールでフェードイン程度。`prefers-reduced-motion` を必ず尊重。バウンス/オーバーシュート禁止。

## 禁止（厳守 / 最後にgrep監査する）
`gradient`（背景・文字・ボタン全て） / 絵文字 / `Inter`を見出しに単体使用 / ガラスモーフィズム(`backdrop-blur`の多用) /
Bentoグリッド / 3アイコン横並び / プログレスバー（スキルの％棒） / `rounded-lg`以上 / `shadow-md`以上 /
全セクション中央寄せ / 誇張コピー("passionate developer"等の中身のない自己紹介)

## 参照サイト（お手本・トーンの軸）
- Thibaud Allie https://www.thibaudallie.com/ — 「Issue N°」式の編集的構成、モノクロ
- Jennifer Heintz https://jenniferheintz.com/ — 高コントラストセリフ、情報最小・余白
- Elliott Walker https://elliottwalker.co/ — 案件をシステムとして提示
- monaka design https://monakadesign.com/ — 大セリフ＋英日バイリンガル、白基調
- Tomoya Okada v7（Astro製）https://v7.usestate.org/ — Webアプリと自主制作を同価値で、技術を誇示しない
- ※ユーザー自前の参考サイトは追って統合

## 確定事項（このプロジェクト）
- アクセント = テラコッタ `#8B3A2F`
- フォント = Crimson Pro × Inter（＋ Noto Serif/Sans JP）
- ダークモード = ライト基調＋ヘッダーの切替トグル（class戦略）
