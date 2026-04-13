import { getPostBySlug, getAllPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Link from 'next/link';

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.meta.meta_title || post.meta.title,
    description: post.meta.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  const { title, description, date, image, image_alt, authors, tags } = post.meta;

  return (
    <article className="pb-24">
      {/* Article Header (Editorial Style) */}
      <header className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 max-w-4xl text-center">
        {tags && tags.length > 0 && (
          <span className="text-brand font-black text-xs md:text-sm uppercase tracking-widest mb-6 inline-block">
            {tags[0]}
          </span>
        )}
        <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-7xl leading-[1.1] text-foreground mb-6 text-balance mx-auto">
          {title}
        </h1>
        {description && (
          <p className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
            {description}
          </p>
        )}
        
        <div className="flex items-center justify-center text-xs md:text-sm font-sans text-foreground uppercase tracking-wider font-semibold border-t border-b border-border/50 py-4 mt-8">
          <div className="flex flex-col md:flex-row items-center md:space-x-4">
            {authors && authors.length > 0 && (
              <span className="mb-2 md:mb-0">
                Por <Link href={`/autores/${authors[0].toLowerCase().replace(/ /g, '-')}`} className="text-brand hover:underline">{authors[0]}</Link>
              </span>
            )}
            <span className="hidden md:inline text-muted-foreground">•</span>
            <time dateTime={date} className="text-muted-foreground">
              {format(new Date(date), "d 'de' MMMM, yyyy", { locale: ptBR })}
            </time>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {image && (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mb-16">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-xl bg-muted">
            <Image 
              src={image} 
              alt={image_alt || title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Body */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <MarkdownRenderer content={post.content} />
          
          {/* Post Footer Call to Action (Support the Mission usually requested) */}
          <div className="mt-16 py-8 border-t border-b border-border text-center bg-muted/20 px-4 md:px-8 rounded-lg">
            <h3 className="font-heading font-bold text-2xl mb-4">Apoie a Missão</h3>
            <p className="font-serif text-muted-foreground mb-6">
              Se este conteúdo edificou sua vida, considere apoiar nosso ministério para que possamos continuar produzindo e distribuindo gratuitamente.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-white p-2 rounded-xl shadow-sm border border-border inline-block">
                <Image 
                  src="/images/pix-qr.png" 
                  alt="QR Code Pix para Doação" 
                  width={150} 
                  height={150} 
                  className="rounded-lg"
                />
              </div>
              <p className="text-sm font-sans font-semibold text-foreground">Escaneie o QR Code PIX</p>
            </div>
            <div className="mt-8">
              <Link href="/contato" className="inline-block bg-brand hover:bg-foreground transition-colors text-white font-sans font-semibold py-3 px-8 rounded-full text-sm tracking-wide uppercase">
                Outras formas de apoiar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
