// 登壇スライド（Speaking）はこの配列に追記するだけ。
// 空のままなら Speaking セクションは自動で非表示になります。
//
// embedUrl の作り方:
//  - speakerdeck : 共有メニューの「Embed」に出る  https://speakerdeck.com/player/<ID>
//  - docswell    : 埋め込みコードの             https://www.docswell.com/slide/<ID>/embed
//  - slideshare  : 埋め込みの                   https://www.slideshare.net/slideshow/embed_code/key/<KEY>
//  - googleslides: 公開→埋め込みの              https://docs.google.com/presentation/d/<ID>/embed

export type SlideProvider = 'speakerdeck' | 'docswell' | 'slideshare' | 'googleslides';

export interface Talk {
  title: string;
  event: string;
  date: string; // 'YYYY-MM-DD'
  provider: SlideProvider;
  embedUrl: string;
  eventUrl?: string;
  ratio?: string; // 既定 '16 / 9'
}

export const talks: Talk[] = [
  // 例（コメントを外して編集）:
  // {
  //   title: 'Astroで作る高速ポートフォリオ',
  //   event: 'Frontend Meetup',
  //   date: '2025-11-20',
  //   provider: 'speakerdeck',
  //   embedUrl: 'https://speakerdeck.com/player/xxxxxxxxxxxx',
  //   eventUrl: 'https://example.com',
  // },
];
