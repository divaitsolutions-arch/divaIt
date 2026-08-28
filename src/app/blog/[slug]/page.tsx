import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug, getAllBlogPosts } from '@/shared/services/cms';
import type { BlogPost } from '@/shared/types/models';
import { CustomPortableText } from '@/shared/components/cms/CustomPortableText';
import { StructuredData } from '@/shared/components/seo/StructuredData';
import { siteConfig } from '@/shared/config/site';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static routes for all blog posts at build time
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }
  
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 600,
          alt: post.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.coverImage],
    }
  };
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const from = resolvedSearchParams?.from;
  
  let backLink = '/blog';
  let backText = 'Back to Blog';
  let paramsString = '';
  
  if (from === 'agency') {
    backLink = '/agency';
    backText = 'Back to Agency';
    paramsString = '?from=agency';
  } else if (from === 'academy') {
    backLink = '/academy';
    backText = 'Back to Academy';
    paramsString = '?from=academy';
  }

  const post = await getBlogPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
    return null; // For TS
  }

  // Get related posts (just the other posts for now)
  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts.filter((p: BlogPost) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.metaTitle,
    "description": post.metaDescription,
    "image": post.coverImage,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": siteConfig.url + "/shared/logo.png"
      }
    }
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <main className="min-h-[100dvh] bg-[#faf9f6] text-ink pb-24 pt-24 lg:pt-32 relative overflow-hidden">
        {/* Paper texture overlay for the details page to differentiate from listing */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }} />

      <article className="mx-auto w-full max-w-[760px] px-6 lg:px-12 relative z-10">
        {/* Back Link */}
        <Link
          href={backLink}
          className="group mb-12 inline-flex items-center gap-2 text-sm font-semibold text-steel transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          {backText}
        </Link>
        
        {/* Hero Section */}
        <section className="mb-12 mt-8 md:mb-16 md:mt-12">
          <div className="mb-6 flex flex-wrap gap-3">
            {post.tags.map((tag: string) => (
              <span 
                key={tag} 
                className="rounded-full bg-primary/10 px-3 py-1.5 text-[13px] font-bold uppercase tracking-wider text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-ink mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-steel leading-relaxed mb-10">
            {post.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-b border-ink/5 py-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {post.author.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-ink">{post.author}</span>
                <div className="flex items-center gap-2 text-sm font-medium text-steel">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            {post.socials && (
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold uppercase tracking-wider text-steel mr-2">Find on:</span>
                {post.socials.linkedin && (
                  <a href={post.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full border border-ink/10 bg-paper text-ink transition-all hover:-translate-y-1 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:shadow-lg hover:shadow-[#0A66C2]/20">
                    <FaLinkedin size={16} />
                  </a>
                )}
                {post.socials.twitter && (
                  <a href={post.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full border border-ink/10 bg-paper text-ink transition-all hover:-translate-y-1 hover:border-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white hover:shadow-lg hover:shadow-[#1DA1F2]/20">
                    <FaTwitter size={16} />
                  </a>
                )}
                {post.socials.facebook && (
                  <a href={post.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full border border-ink/10 bg-paper text-ink transition-all hover:-translate-y-1 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:shadow-lg hover:shadow-[#1877F2]/20">
                    <FaFacebook size={16} />
                  </a>
                )}
                {post.socials.instagram && (
                  <a href={post.socials.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-10 w-10 rounded-full border border-ink/10 bg-paper text-ink transition-all hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:shadow-lg">
                    <FaInstagram size={16} />
                  </a>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Cover Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2rem] bg-ink/5 mb-16 shadow-2xl shadow-primary/5">
          <Image 
            src={post.coverImage} 
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 800px"
          />
        </div>

        {/* Article Body */}
        <section
          className="max-w-none
          [&_h2]:font-display [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-ink [&_h2]:text-3xl [&_h2]:mt-16 [&_h2]:mb-8
          [&_h3]:font-display [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-ink [&_h3]:text-2xl [&_h3]:mt-10 [&_h3]:mb-6
          [&_p]:font-serif [&_p]:text-[#333] [&_p]:leading-[2] [&_p]:mb-8 [&_p]:text-lg md:[&_p]:text-[1.3rem]
          [&>p:first-of-type]:first-letter:text-7xl [&>p:first-of-type]:first-letter:font-display [&>p:first-of-type]:first-letter:font-black [&>p:first-of-type]:first-letter:text-ink [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:leading-[0.8]
          [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary
          [&_blockquote]:border-l-4 [&_blockquote]:border-ink [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:font-serif [&_blockquote]:font-medium [&_blockquote]:italic [&_blockquote]:text-[#111] [&_blockquote]:mb-10 [&_blockquote]:text-xl md:[&_blockquote]:text-2xl [&_blockquote]:leading-relaxed
          [&_strong]:text-ink [&_strong]:font-bold
          [&_ul]:font-serif [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:mb-8 [&_ul]:text-[#333] [&_ul]:text-lg md:[&_ul]:text-[1.3rem] [&_ul]:leading-[2] [&_li]:mb-3
          [&_ol]:font-serif [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:mb-8 [&_ol]:text-[#333] [&_ol]:text-lg md:[&_ol]:text-[1.3rem] [&_ol]:leading-[2] [&_li]:mb-3"
        >
          {Array.isArray(post.content) ? (
            <CustomPortableText value={post.content} />
          ) : post.content ? (
            <p>{post.content as string}</p>
          ) : null}
        </section>

        {/* Footer & Related */}
        <footer className="mt-32 border-t border-ink/10 pt-16">
          <h3 className="font-display text-3xl font-bold text-ink mb-10 tracking-tight">Read Next</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedPosts.map((related: BlogPost) => (
              <Link 
                key={related.slug} 
                href={`/blog/${related.slug}${paramsString}`}
                className="group flex flex-col rounded-[2rem] border border-ink/5 bg-panel p-3 transition-all duration-300 hover:shadow-xl hover:shadow-ink/5 hover:-translate-y-1 hover:border-primary/20"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-ink/5 mb-6">
                  <Image 
                    src={related.coverImage} 
                    alt={related.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-4 pb-4">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {related.tags.slice(0, 2).map((tag: string) => (
                      <span 
                        key={tag} 
                        className="rounded-full bg-ink/5 px-2.5 py-1 text-[13px] font-bold uppercase tracking-wider text-steel group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className="mb-3 font-display text-xl font-bold leading-tight text-ink group-hover:text-primary transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                  
                  <p className="mb-6 text-sm leading-relaxed text-steel line-clamp-3">
                    {related.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </footer>
      </article>
    </main>
    </>
  );
}
