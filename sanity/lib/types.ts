import type { PortableTextBlock } from '@portabletext/types'

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface BlogPost {
  _id: string
  _type: 'blogPost'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: SanitySlug
  excerpt: string
  content: PortableTextBlock[]
  featuredImage?: SanityImage
  author: string
  publishDate: string
  categories: string[]
  tags: string[]
  metaTitle?: string
  metaDescription?: string
  readingTime?: number
}

export interface BlogPostCard {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: SanitySlug
  excerpt: string
  featuredImage?: SanityImage
  author: string
  publishDate: string
  categories: string[]
  tags: string[]
  readingTime?: number
}

export interface BlogPostsResponse {
  posts: BlogPostCard[]
  total: number
  skip: number
  limit: number
}

export interface CloudinaryAsset {
  _type: 'cloudinary.asset'
  _key?: string
  public_id: string
  resource_type: 'image' | 'video'
  type: string
  format: string
  version: number
  url: string
  secure_url: string
  width: number
  height: number
  bytes: number
  duration?: number
  tags: string[]
  context?: {
    custom?: {
      alt?: string
    }
  }
  created_at: string
  access_mode: string
  _version: number
}

export interface CloudinaryVideo {
  id: string
  cloudinaryId: string
  title: string
  url: string
  highQualityUrl?: string
  thumbnailUrl: string
  width: number
  height: number
  loaded: boolean
  tags: string[]
  format: 'square' | 'landscape' | 'portrait' | 'reels'
  type: 'video'
  duration?: string
  views?: number
  description?: string
  category: string
  date: string
}

export interface CloudinaryGraphic {
  id: string
  cloudinaryId: string
  title: string
  graphicType: string
  industry: string
  format: 'square' | 'landscape' | 'portrait' | 'reels'
  url: string
  width: number
  height: number
  loaded: boolean
  tags: string[]
  views?: number
  description?: string
  category: string
  date: string
  type: 'graphic'
}

export interface GalleryResponse {
  videos: CloudinaryVideo[]
  graphics: CloudinaryGraphic[]
  meta: {
    totalVideos: number
    totalGraphics: number
    filteredVideos: number
    filteredGraphics: number
  }
}

export interface Gallery {
  _id: string
  _type: 'gallery'
  title: string
  slug: SanitySlug
  description?: string
  cloudinaryVideos: CloudinaryAsset[]
  cloudinaryGraphics: CloudinaryAsset[]
}

export interface ShowcaseWebsite {
  _id: string
  _type: 'showcaseWebsite'
  title: string
  slug: SanitySlug
  thumbnail: SanityImage
  externalUrl: string
  orderRank?: string
  featured: boolean
}

export interface ShowcaseWebsiteCard {
  _id: string
  title: string
  thumbnailUrl: string
  externalUrl: string
}
