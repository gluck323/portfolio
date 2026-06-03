import { XMLParser } from 'fast-xml-parser';
import { site } from '../data/site';
import { noteFallback } from '../data/noteFallback';

export type ArticleCardData = {
  title: string;
  url: string;
  excerpt?: string;
  date?: string; // ISO
  thumbnail?: string;
  source: 'note';
};

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });

/**
 * note の RSS をビルド時に取得してカード用に正規化する。
 * - ビルド時(Node)の fetch なので CORS は無関係。
 * - noteUsername 未設定 or 取得失敗時は noteFallback を返し、ビルドは止めない。
 */
export async function getNoteArticles(limit = 6): Promise<ArticleCardData[]> {
  const username = site.noteUsername?.trim();
  if (!username) return noteFallback.slice(0, limit);

  try {
    const res = await fetch(`https://note.com/${username}/rss`, {
      headers: { 'User-Agent': 'portfolio-build/1.0 (+astro)' },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`note feed HTTP ${res.status}`);

    const xml = await res.text();
    const data = parser.parse(xml);
    const raw = data?.rss?.channel?.item ?? [];
    const items = Array.isArray(raw) ? raw : [raw];

    const articles = items.slice(0, limit).map((it: any): ArticleCardData => {
      const html = String(it['content:encoded'] ?? it.description ?? '');
      return {
        title: String(it.title ?? '').trim(),
        url: String(it.link ?? '').trim(),
        excerpt: stripHtml(it.description ?? '').slice(0, 110),
        date: it.pubDate ? new Date(it.pubDate).toISOString() : undefined,
        thumbnail: it['media:thumbnail']?.['@_url'] ?? firstImgSrc(html),
        source: 'note',
      };
    });

    return articles.length ? articles : noteFallback.slice(0, limit);
  } catch (err) {
    console.warn('[note] RSS取得に失敗。フォールバックを表示:', (err as Error).message);
    return noteFallback.slice(0, limit);
  }
}

function stripHtml(s: unknown): string {
  return String(s ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstImgSrc(html: string): string | undefined {
  return html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
}
