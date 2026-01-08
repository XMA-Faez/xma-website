'use client'

import { Facebook, Linkedin, Share2 } from 'lucide-react'

// Custom X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

interface SocialShareProps {
  url: string
  title: string
  description: string
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600/80',
    },
    {
      name: 'X',
      icon: XIcon,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-black',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-700/80',
    },
  ]

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-400">Share this post:</span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full bg-zinc-800 text-gray-400 transition-colors ${link.color} hover:text-white`}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-4 h-4" />
          </a>
        ))}
        <button
          onClick={handleNativeShare}
          className="p-2 rounded-full bg-zinc-800 text-gray-400 hover:bg-zinc-700 transition-colors"
          aria-label="Share via native share or copy link"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}