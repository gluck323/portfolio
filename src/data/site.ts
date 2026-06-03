// サイト設定。実データは src/data/cms/site.json（/keystatic のエディタで編集）。
// ここはそれを型付きで読み込み、固定値(nav, locale)を足して公開する薄いラッパー。
import cms from './cms/site.json';

export type Social = { label: string; href: string };

export const site = {
  ...cms,
  locale: 'ja',
} as typeof cms & { locale: string };

// グローバルナビ（ページ内アンカー。構造なのでコード側で管理）
export const nav: { label: string; href: string }[] = [
  { label: 'Work', href: '#work' },
  { label: 'Writing', href: '#writing' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];
