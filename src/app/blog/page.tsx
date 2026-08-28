import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { getAllBlogPosts } from '@/shared/services/cms';
import { siteConfig } from '@/shared/config/site';
import type { BlogPost } from '@/shared/types/models';

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: 'Insights on software engineering, technology trends, and skill development from the team at Diva IT Solutions.',
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: 'Insights on software engineering, technology trends, and skill development from the team at Diva IT Solutions.',
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const from = resolvedParams?.from;
  
  let backLink = '/';
  let backText = 'Back to Gateway';
  if (from === 'agency') {
    backLink = '/agency';
    backText = 'Back to Agency';
  } else if (from === 'academy') {
    backLink = '/academy';
    backText = 'Back to Academy';
  }

  const posts: BlogPost[] = await getAllBlogPosts();



  return (
    <main className="min-h-[100dvh] bg-paper text-ink pb-24 pt-24 lg:pt-32 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="bg-brand-glow" />

      <section className="mx-auto w-full max-w-[1200px] px-6 lg:px-12 relative z-10">
        {/* Header */}
        <Link
          href={backLink}
          className="group mb-12 inline-flex items-center gap-2 text-sm font-semibold text-steel transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          {backText}
        </Link>
        
        <div className="mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Insights <span className="text-steel font-medium italic">&</span> Ideas
          </h1>
          <p className="text-xl text-steel max-w-2xl leading-relaxed">
            Thoughts, perspectives, and guides on modern software development, AI, and the evolving tech ecosystem.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-[2rem] border border-ink/5 bg-panel p-3 transition-all duration-300 hover:shadow-xl hover:shadow-ink/5 hover:-translate-y-1 hover:border-primary/20"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-ink/5 mb-6">
                <Image 
                  src={post.coverImage} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-4 pb-4">
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag: string) => (
                    <span 
                      key={tag} 
                      className="rounded-full bg-ink/5 px-2.5 py-1 text-[13px] font-bold uppercase tracking-wider text-steel group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="mb-3 font-display text-xl font-bold leading-tight text-ink group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="mb-6 text-base leading-relaxed text-steel">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-ink/5 pt-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-ink">{post.author}</span>
                    <div className="flex items-center gap-2 text-helper">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink transition-all group-hover:bg-primary group-hover:text-white">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
