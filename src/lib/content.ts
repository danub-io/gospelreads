import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');
const postsDirectory = path.join(contentDirectory, 'posts');
const authorsDirectory = path.join(contentDirectory, 'authors');

export interface PostMeta {
  title: string;
  meta_title?: string;
  description: string;
  date: string;
  image?: string;
  image_alt?: string;
  authors?: string[];
  tags?: string[];
  draft?: boolean;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

export interface AuthorMeta {
  title: string;
  image?: string;
  description?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Author {
  slug: string;
  meta: AuthorMeta;
  content: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.resolve(postsDirectory, `${realSlug}.md`);

  if (!fullPath.startsWith(path.resolve(postsDirectory) + path.sep) || !fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as PostMeta,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && !post.meta.draft)
    .sort((post1, post2) => (new Date(post1.meta.date) > new Date(post2.meta.date) ? -1 : 1));
  
  return posts;
}

export function getAuthorSlugs() {
  if (!fs.existsSync(authorsDirectory)) return [];
  return fs.readdirSync(authorsDirectory).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
}

export function getAuthorBySlug(slug: string): Author | null {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.resolve(authorsDirectory, `${realSlug}.md`);

  if (!fullPath.startsWith(path.resolve(authorsDirectory) + path.sep) || !fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as AuthorMeta,
    content,
  };
}
