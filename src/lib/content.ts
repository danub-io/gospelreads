import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const contentDirectory = path.join(process.cwd(), "src/content");
const postsDirectory = path.join(contentDirectory, "posts");
const authorsDirectory = path.join(contentDirectory, "authors");

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

export const getPostSlugs = cache(() => {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
});

export const getPostBySlug = cache((slug: string): Post | null => {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as PostMeta,
    content,
  };
});

export const getAllPosts = cache((): Post[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && !post.meta.draft)
    .sort((post1, post2) =>
      new Date(post1.meta.date) > new Date(post2.meta.date) ? -1 : 1,
    );

  return posts;
});

export const getPostsByAuthor = cache((authorTitle: string): Post[] => {
  return getAllPosts().filter(
    (post) => post.meta.authors && post.meta.authors.includes(authorTitle),
  );
});

export const getAuthorSlugs = cache(() => {
  if (!fs.existsSync(authorsDirectory)) return [];
  return fs
    .readdirSync(authorsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
});

export const getAuthorBySlug = cache((slug: string): Author | null => {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = path.join(authorsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as AuthorMeta,
    content,
  };
});
