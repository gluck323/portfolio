import type { ArticleCardData } from '../lib/note';

// note RSS が取得できない時に表示する手動カード。
// 通常は site.ts の noteUsername から RSS 自動取得される（こちらは保険）。
export const noteFallback: ArticleCardData[] = [
  {
    title: 'note の記事一覧',
    url: 'https://note.com/japanese_goblin',
    excerpt: 'note の最新記事をここに自動表示します（取得できない場合の予備リンク）。',
    source: 'note',
  },
];
