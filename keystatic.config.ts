import { config, fields, singleton } from '@keystatic/core';

// ローカル編集UI（/keystatic）の定義。
// データは src/data/cms/*.json に保存され、サイト側は src/data/*.ts がそれを読む。
export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Portfolio' },
    navigation: {
      コンテンツ: ['site', 'achievements', 'talks'],
    },
  },
  singletons: {
    site: singleton({
      label: 'サイト設定 / プロフィール',
      path: 'src/data/cms/site',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: '表示名' }),
        shortName: fields.text({ label: 'ロゴ表記（ヘッダー左）' }),
        tagline: fields.text({ label: 'Hero 見出し（改行で複数行）', multiline: true }),
        intro: fields.text({ label: 'Hero 一文' }),
        description: fields.text({ label: 'メタ説明（検索結果/OGP）', multiline: true }),
        email: fields.text({ label: '公開メール' }),
        noteUsername: fields.text({ label: 'note ユーザー名（記事を自動取得）' }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: 'ラベル（例: GitHub）' }),
            href: fields.url({ label: 'URL' }),
          }),
          { label: 'SNS / リンク', itemLabel: (p) => p.fields.label.value || 'リンク' }
        ),
        avatar: fields.image({
          label: 'プロフィール写真 / アイコン',
          description: '1枚アップロードすると About に表示されます',
          directory: 'public/images/profile',
          publicPath: '/images/profile/',
        }),
        aboutLead: fields.text({ label: 'About 見出し文（挨拶など）', multiline: true }),
        aboutBody: fields.text({ label: 'About 本文 / 経歴（空行で段落を分ける）', multiline: true }),
        tools: fields.array(fields.text({ label: 'ツール / ソフト' }), {
          label: 'Tools（使用ツール・ソフト）',
          itemLabel: (p) => p.value || 'ツール',
        }),
      },
    }),

    achievements: singleton({
      label: '実績 (Recognition)',
      path: 'src/data/cms/achievements',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'タイトル' }),
            date: fields.date({ label: '日付' }),
            type: fields.select({
              label: '種別',
              options: [
                { label: '受賞 / 1位 (Award)', value: 'award' },
                { label: '寄稿 (Writing)', value: 'contribution' },
                { label: '登壇 (Talk)', value: 'talk' },
                { label: '制作・その他 (Project)', value: 'other' },
              ],
              defaultValue: 'other',
            }),
            org: fields.text({ label: '主催 / 媒体（任意）' }),
            url: fields.url({ label: 'リンク（任意）' }),
          }),
          { label: '実績（新しい順に自動で並びます）', itemLabel: (p) => p.fields.title.value || '実績' }
        ),
      },
    }),

    talks: singleton({
      label: '登壇 (Speaking)',
      path: 'src/data/cms/talks',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'タイトル' }),
            event: fields.text({ label: 'イベント名' }),
            date: fields.date({ label: '日付' }),
            provider: fields.select({
              label: 'スライドの埋め込み元',
              options: [
                { label: 'Speaker Deck', value: 'speakerdeck' },
                { label: 'Docswell', value: 'docswell' },
                { label: 'SlideShare', value: 'slideshare' },
                { label: 'Google Slides', value: 'googleslides' },
              ],
              defaultValue: 'speakerdeck',
            }),
            embedUrl: fields.url({ label: '埋め込みURL' }),
            eventUrl: fields.url({ label: 'イベントURL（任意）' }),
            ratio: fields.text({ label: '比率', defaultValue: '16 / 9' }),
          }),
          { label: '登壇（空なら非表示）', itemLabel: (p) => p.fields.title.value || '登壇' }
        ),
      },
    }),
  },
});
