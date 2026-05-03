import fs from 'node:fs';
import path from 'node:path';

interface PostMeta {
  title: string;
  description?: string;
  date?: string;
}

interface AuthorMeta {
  name: string;
  image?: string;
  description?: string;
}

interface ContentResult<T> {
  slug: string;
  meta: T;
  content: string;
}

function parseFrontmatter(filePath: string): { meta: Record<string, unknown>; content: string } | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return null;
    const meta: Record<string, unknown> = {};
    for (const line of match[1].split('\n')) {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) {
        meta[key.trim()] = rest.join(':').trim();
      }
    }
    return { meta, content: match[2].trim() };
  } catch {
    return null;
  }
}

export function getPostBySlug(slug: string): ContentResult<PostMeta> | null {
  const filePath = path.join(process.cwd(), 'src', 'content', 'posts', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const parsed = parseFrontmatter(filePath);
  if (!parsed) return null;
  return { slug, meta: parsed.meta as unknown as PostMeta, content: parsed.content };
}

export function getAuthorBySlug(slug: string): ContentResult<AuthorMeta> | null {
  const filePath = path.join(process.cwd(), 'src', 'content', 'authors', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const parsed = parseFrontmatter(filePath);
  if (!parsed) return null;
  return { slug, meta: parsed.meta as unknown as AuthorMeta, content: parsed.content };
}
