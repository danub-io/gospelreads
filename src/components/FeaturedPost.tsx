import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '@/lib/content';
import Image from 'next/image';

export default function FeaturedPost({ post }: { post: Post }) {
  const { title, description, date, image, image_alt, authors, tags } = post.meta;
  
  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 pb-12 mb-12 border-b-4 border-foreground group">
      {/* Image Section (Shows Top on Mobile, Right on Desktop usually, but let's do Left Image, Right Text) */}
      {image && (
        <Link href={`/posts/${post.slug}`} className="block relative aspect-video lg:aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image 
            src={image} 
            alt={image_alt || title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </Link>
      )}

      {/* Content Section */}
      <div className="flex flex-col justify-center pt-8 lg:pt-0">
        {tags && tags.length > 0 && (
          <span className="text-brand font-black text-xs uppercase tracking-widest mb-6 font-sans border-b-2 border-brand pb-1 inline-block self-start">
            {tags[0]}
          </span>
        )}
        <Link href={`/posts/${post.slug}`} className="block mb-8">
          <h2 className="font-heading font-black tracking-tight text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6 group-hover:text-brand transition-colors text-balance">
            {title}
          </h2>
          <p className="font-serif text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>
        </Link>
        <div className="flex items-center text-xs font-sans text-muted-foreground uppercase tracking-wider font-semibold mt-auto">
          {authors && authors.length > 0 && (
            <>
              <span className="text-foreground">{authors[0]}</span>
              <span className="mx-2 text-brand">•</span>
            </>
          )}
          <time dateTime={date}>
            {format(new Date(date), "d 'de' MMM, yyyy", { locale: ptBR })}
          </time>
        </div>
      </div>
    </article>
  );
}
