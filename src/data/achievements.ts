// 実績（Recognition）はこの配列を編集するだけ。
// ・並び順は気にしなくてOK（日付の新しい順に自動で並びます）
// ・日付は 'YYYY-MM-DD'（表示は「年」だけ）
// ・type: 'award'(受賞/1位) | 'contribution'(寄稿) | 'talk'(登壇) | 'other'(制作/出演など)
// ・org / url は任意

export type AchievementType = 'award' | 'talk' | 'contribution' | 'other';

export interface Achievement {
  title: string;
  date: string;
  type: AchievementType;
  org?: string;
  url?: string;
}

export const achievements: Achievement[] = [
  { title: '音楽ゲーム合同誌「音GEN」に寄稿', date: '2025-12-01', type: 'contribution', org: '同人合同誌' },
  { title: '第14回 音ゲー早慶戦 ロゴ制作を監修', date: '2025-10-01', type: 'other', org: '音ゲー早慶戦' },
  { title: 'Webサービス「Bemani Keio Meister」をリリース', date: '2025-06-01', type: 'other', org: '音ゲー早慶戦 対策サービス' },
  { title: '音ゲー情報同人誌「オトゲラボ。」の取材を受ける', date: '2025-05-01', type: 'other', org: 'オトゲラボ。' },
  { title: '部誌「BBD MAGAZINE」創刊号に寄稿', date: '2024-12-01', type: 'contribution', org: '早稲田大学 BBD' },
  { title: 'オリジナル楽曲「メメント・モリ」「死.exe」をリリース', date: '2024-12-01', type: 'award', org: 'アドベントカレンダー投票 1位' },
  { title: '春・秋IR プロモーションムービーを制作', date: '2024-06-01', type: 'other', org: '早稲田大学 BBD' },
  { title: 'ランキング自動生成ツールを共同制作', date: '2023-09-01', type: 'other', org: 'Discord 連携ツール' },
];
