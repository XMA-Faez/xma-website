import { getBlogPostBySlug, getRelatedPosts } from '@/sanity/lib/blog'
import { urlFor } from '@/sanity/lib/image'
import { BlogContent } from '../_components/BlogContent'
import { RelatedPosts } from '../_components/RelatedPosts'
import { SocialShare } from '../_components/SocialShare'
import { BlogCTA } from '../_components/BlogCTA'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, Clock, User, Tag } from 'lucide-react'

export const revalidate = 3600

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(1200).url() : undefined

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
    },
    keywords: post.tags?.join(', '),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post._id, post.categories || [], 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(1200).url() : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.publishDate,
    dateModified: post._updatedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'XMA',
    },
    keywords: post.tags?.join(', '),
    articleSection: post.categories?.[0],
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl/[1.2] font-bold mb-6 text-zinc-100">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>

          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <Tag className="w-4 h-4 text-gray-500" />
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-red-600/20 text-red-400 text-sm rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {imageUrl && (
            <div className="relative aspect-video mb-12 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none mb-8">
          <BlogContent content={post.content} />
        </div>

        <footer className="border-t border-zinc-800 pt-8">
          <div className="mb-8">
            <SocialShare
              url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug.current}`}
              title={post.title}
              description={post.excerpt}
            />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
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

          {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </footer>
      </article>
    </>
  )
}
