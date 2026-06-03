// 実績(Recognition)。実データは src/data/cms/achievements.json（/keystatic で編集）。
import cms from './cms/achievements.json';

export type AchievementType = 'award' | 'talk' | 'contribution' | 'other';

export interface Achievement {
  title: string;
  date: string; // 'YYYY-MM-DD'（表示は年のみ）
  type: AchievementType;
  org?: string;
  url?: string;
}

export const achievements: Achievement[] = cms.items as Achievement[];
