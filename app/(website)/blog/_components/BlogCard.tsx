'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { BlogPostCard } from '@/sanity/lib/types'

interface BlogCardProps {
  post: BlogPostCard
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(800).height(450).url()
    : '/placeholder-blog.svg'

  return (
    <Link href={`/blog/${post.slug.current}`} className="group">
      <article className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishDate)}
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold mb-2 group-hover:text-red-500 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-400 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">By {post.author}</span>

            {post.categories && post.categories.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-300 bg-zinc-800 px-2 py-1 rounded">
                  {post.categories[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
