// サイト全体の設定を一元管理（複数コンポーネントから参照）

export const site = {
  // 表示名
  name: 'Kota Takahashi',
  // ナビ/ロゴ用の表記
  shortName: 'Kota Takahashi',
  // Heroの主役コピー（\n で改行。最後の行末にアクセントの「.」が付く）
  tagline: 'Games, Film\n& Web Apps',
  // Heroの一文
  intro: 'ゲーム、映像、Webアプリをつくっています。',
  // メタ用デフォルト説明
  description:
    'Kota Takahashi のポートフォリオ。ゲーム制作・映像制作・Webアプリケーション制作と、note記事・実績をまとめています。',
  // 言語
  locale: 'ja',
  // note のユーザー名（https://note.com/<username>/feed を取得）
  noteUsername: 'japanese_goblin',
  // 公開する連絡先・SNS
  email: 'm1sum1@sky-po.net',
  socials: [
    { label: 'GitHub', href: 'https://github.com/gluck323' },
    { label: 'note', href: 'https://note.com/japanese_goblin' },
  ] as { label: string; href: string }[],
};

// グローバルナビ（ページ内アンカー）
export const nav: { label: string; href: string }[] = [
  { label: 'Work', href: '#work' },
  { label: 'Writing', href: '#writing' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];
