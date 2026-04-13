import { getAuthorBySlug, getAuthorSlugs, getAllPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import PostCard from '@/components/PostCard';
import Image from 'next/image';

export function generateStaticParams() {
  const authors = getAuthorSlugs();
  return authors.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const author = getAuthorBySlug(resolvedParams.slug);
  if (!author) return { title: 'Not Found' };
  return {
    title: `${author.meta.title} | Autores GospelReads`,
    description: author.meta.description,
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const author = getAuthorBySlug(resolvedParams.slug);
  if (!author) notFound();

  const authorPosts = getAllPosts().filter(
    (post) => post.meta.authors && post.meta.authors.includes(author.meta.title)
  );

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
      <header className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12 mb-16 pb-12 border-b-2 border-border">
        {author.meta.image && (
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0 border-4 border-muted">
            <Image src={author.meta.image} alt={author.meta.title} fill className="object-cover" />
          </div>
        )}
        <div className="text-center md:text-left">
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">{author.meta.title}</h1>
          <div className="prose prose-lg text-muted-foreground font-serif">
            <MarkdownRenderer content={author.content} />
          </div>
        </div>
      </header>

      <section>
        <h2 className="font-heading font-bold text-3xl mb-8">Artigos Publicados</h2>
        {authorPosts.length > 0 ? (
          <div className="space-y-8">
            {authorPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="font-serif text-muted-foreground">Nenhum artigo encontrado para este autor.</p>
        )}
      </section>
    </div>
  );
}
