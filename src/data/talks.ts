// 登壇(Speaking)。実データは src/data/cms/talks.json（/keystatic で編集）。空なら非表示。
import cms from './cms/talks.json';

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

export const talks: Talk[] = cms.items as Talk[];
