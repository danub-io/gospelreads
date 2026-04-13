import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '@/lib/content';

export default function PostCard({ post, dense = false }: { post: Post, dense?: boolean }) {
  const { title, date, authors, tags } = post.meta;
  
  return (
    <article className="flex flex-col group border-b border-border/50 pb-6 mb-6">
      <Link href={`/posts/${post.slug}`} className="flex flex-col flex-1">
        {tags && tags.length > 0 && (
          <span className="text-brand font-black text-xs uppercase tracking-widest mb-2 font-sans">
            {tags[0]}
          </span>
        )}
        <h3 className={`font-heading font-bold text-foreground group-hover:text-brand transition-colors leading-tight mb-2 ${dense ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
          {title}
        </h3>
        {!dense && post.meta.description && (
          <p className="font-serif text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 mb-3">
            {post.meta.description}
          </p>
        )}
      </Link>
      <div className="mt-auto flex items-center text-xs font-sans text-muted-foreground uppercase tracking-wider font-semibold">
        {authors && authors.length > 0 && (
          <>
            <span className="text-foreground">{authors[0]}</span>
            <span className="mx-2 text-brand">•</span>
          </>
        )}
        <time dateTime={date}>
          {format(new Date(date), "d 'de' MMMM", { locale: ptBR })}
        </time>
      </div>
    </article>
  );
}
