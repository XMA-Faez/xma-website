'use client'

import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface BlogContentProps {
  content: PortableTextBlock[]
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-8">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-6">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold mb-2 mt-4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red-600 pl-4 italic mb-4 text-gray-400">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => (
      <code className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-sm">{children}</code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || ''
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-red-500 hover:text-red-400 underline"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null

      const imageUrl = urlFor(value).width(1200).url()

      return (
        <div className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.caption && (
            <p className="text-center text-sm text-gray-400 mt-2 italic">{value.caption}</p>
          )}
        </div>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="ml-4">
        <div className="inline">{children}</div>
      </li>
    ),
    number: ({ children }) => (
      <li className="ml-4">
        <div className="inline">{children}</div>
      </li>
    ),
  },
}

export function BlogContent({ content }: BlogContentProps) {
  if (!content || content.length === 0) {
    return null
  }

  return (
    <div className="blog-content">
      <PortableText value={content} components={components} />
    </div>
  )
}
