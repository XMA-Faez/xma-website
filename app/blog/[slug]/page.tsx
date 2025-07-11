import { getBlogPostBySlug, getRelatedPosts } from '@/lib/contentful'

export const revalidate = 3600
import { BlogContent } from '@/components/blog/BlogContent'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { SocialShare } from '@/components/blog/SocialShare'
import { BlogCTA } from '@/components/blog/BlogCTA'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, Clock, User, Tag } from 'lucide-react'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const imageUrl = post.fields.featuredImage?.fields.file.url
  const fullImageUrl = imageUrl ? `https:${imageUrl}` : undefined

  return {
    title: post.fields.metaTitle || post.fields.title,
    description: post.fields.metaDescription || post.fields.excerpt,
    openGraph: {
      title: post.fields.metaTitle || post.fields.title,
      description: post.fields.metaDescription || post.fields.excerpt,
      type: 'article',
      publishedTime: post.fields.publishDate,
      authors: [post.fields.author],
      images: fullImageUrl ? [{ url: fullImageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.fields.metaTitle || post.fields.title,
      description: post.fields.metaDescription || post.fields.excerpt,
      images: fullImageUrl ? [fullImageUrl] : undefined,
    },
    keywords: post.fields.tags?.join(', '),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(
    post.sys.id,
    post.fields.categories || [],
    3
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const imageUrl = post.fields.featuredImage?.fields.file.url
  const fullImageUrl = imageUrl ? `https:${imageUrl}` : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.fields.title,
    description: post.fields.excerpt,
    image: fullImageUrl,
    datePublished: post.fields.publishDate,
    dateModified: post.sys.updatedAt,
    author: {
      '@type': 'Person',
      name: post.fields.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'XMA',
    },
    keywords: post.fields.tags?.join(', '),
    articleSection: post.fields.categories?.[0],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="max-w-4xl pt-40 mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl/[1.2] font-bold mb-6 text-zinc-100">{post.fields.title}</h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {post.fields.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>By {post.fields.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.fields.publishDate}>
                {formatDate(post.fields.publishDate)}
              </time>
            </div>
            {post.fields.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.fields.readingTime} min read</span>
              </div>
            )}
          </div>

          {post.fields.categories && post.fields.categories.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <Tag className="w-4 h-4 text-gray-500" />
              {post.fields.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-red-600/20 text-red-400 text-sm rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {fullImageUrl && (
            <div className="relative aspect-video mb-12 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
              <Image
                src={fullImageUrl}
                alt={post.fields.featuredImage?.fields.title || post.fields.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none mb-8">
          <BlogContent content={post.fields.content} />
        </div>

        <footer className="border-t border-zinc-800 pt-8">
          <div className="mb-8">
            <SocialShare
              url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.fields.slug}`}
              title={post.fields.title}
              description={post.fields.excerpt}
            />
          </div>

          {post.fields.tags && post.fields.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.fields.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zinc-800 text-gray-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <BlogCTA />

          {relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} />
          )}
        </footer>
      </article>
    </>
  )
}
