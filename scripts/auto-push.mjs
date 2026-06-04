#!/usr/bin/env node
// 編集内容（/keystatic の保存など）を検知して、自動で commit & push するウォッチャー。
// → push で Cloudflare が自動ビルド＆デプロイするので「保存したら本番反映」になる。
//
// 使い方: `npm run studio`（dev サーバーと一緒に起動）。通常の `npm run dev` では動かない。
// 監視対象はコンテンツのみ（コードは対象外なので、実装中のコードが勝手に push されることはない）。

import { watch } from 'node:fs';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const DIRS = ['src/data/cms', 'src/content/work', 'public/images'];
const DEBOUNCE_MS = 8000;
let timer = null;

function publish() {
  try {
    execSync('git add src/data/cms src/content/work public/images', { stdio: 'ignore' });
    // ステージに差分がなければ何もしない
    try {
      execSync('git diff --cached --quiet');
      return; // 差分なし
    } catch {
      // 差分あり → 続行
    }
    execSync('git commit -m "content: update via editor (auto)"', { stdio: 'ignore' });
    execSync('git push', { stdio: 'ignore' });
    const t = new Date().toLocaleTimeString();
    console.log(`\n[auto-push] 公開しました ${t} — 数分で本番に反映されます。`);
  } catch (err) {
    console.warn('[auto-push] スキップ:', err.message);
  }
}

function schedule() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(publish, DEBOUNCE_MS);
}

let watching = 0;
for (const dir of DIRS) {
  if (!existsSync(dir)) continue;
  try {
    watch(dir, { recursive: true }, schedule);
    watching++;
  } catch (e) {
    console.warn(`[auto-push] ${dir} を監視できませんでした:`, e.message);
  }
}

console.log(
  `[auto-push] 監視開始（${watching}フォルダ）。/keystatic で保存すると約${DEBOUNCE_MS / 1000}秒後に自動で commit & push します。`
);
