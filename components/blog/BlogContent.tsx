'use client'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { Document } from '@contentful/rich-text-types'
import Image from 'next/image'

interface BlogContentProps {
  content: string | Document
}

export function BlogContent({ content }: BlogContentProps) {
  let richTextContent: Document

  if (typeof content === 'string') {
    try {
      richTextContent = JSON.parse(content)
    } catch (error) {
      return (
        <div className="whitespace-pre-wrap">
          {content}
        </div>
      )
    }
  } else {
    richTextContent = content
  }

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-sm">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p className="mb-4 leading-relaxed">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
        <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <h2 className="text-2xl font-bold mb-4 mt-8">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <h3 className="text-xl font-bold mb-3 mt-6">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
        <h4 className="text-lg font-bold mb-2 mt-4">{children}</h4>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
        <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
        <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
        <li className="ml-4">
          <div className="inline">{children}</div>
        </li>
      ),
      [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-red-600 pl-4 italic mb-4 text-gray-400">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-zinc-800" />,
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, file } = node.data.target.fields
        const imageUrl = file.url
        const fullImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl

        return (
          <div className="my-8">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={fullImageUrl}
                alt={title || 'Blog image'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
            {title && (
              <p className="text-center text-sm text-gray-400 mt-2 italic">
                {title}
              </p>
            )}
          </div>
        )
      },
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 hover:text-red-400 underline"
        >
          {children}
        </a>
      ),
    },
  }

  return (
    <div className="blog-content">
      {documentToReactComponents(richTextContent, options)}
    </div>
  )
}