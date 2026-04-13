import { getAllPosts } from '@/lib/content';
import FeaturedPost from '@/components/FeaturedPost';
import PostCard from '@/components/PostCard';
import SectionDivider from '@/components/SectionDivider';

export default function Home() {
  const allPosts = getAllPosts();
  
  if (!allPosts || allPosts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-heading text-4xl mb-4">Bem-vindo ao GospelReads</h1>
        <p className="text-muted-foreground font-serif">Nenhuma publicação encontrada. Adicione conteúdo em src/content/posts.</p>
      </div>
    );
  }

  const featuredPost = allPosts[0];
  const recentPosts = allPosts.slice(1, 5);
  const morePosts = allPosts.slice(5);

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Featured Section */}
      <section>
        <FeaturedPost post={featuredPost} />
      </section>

      {/* Grid of Recent Posts (Metrópoles density) */}
      {recentPosts.length > 0 && (
        <section className="mb-12">
          <SectionDivider title="Destaques Variados" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} dense={true} />
            ))}
          </div>
        </section>
      )}

      {/* Remaining Posts List */}
      {morePosts.length > 0 && (
        <section className="mb-12 max-w-4xl mx-auto">
          <SectionDivider title="Últimas Publicações" />
          <div className="space-y-8">
            {morePosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
