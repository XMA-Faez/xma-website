import { groq } from 'next-sanity'
import { client } from './client'
import type { BlogPost, BlogPostCard, BlogPostsResponse } from './types'

const blogPostCardFields = groq`
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  featuredImage,
  author,
  publishDate,
  categories,
  tags,
  readingTime
`

const blogPostFields = groq`
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  author,
  publishDate,
  categories,
  tags,
  metaTitle,
  metaDescription,
  readingTime
`

export async function getAllBlogPosts(
  limit: number = 20,
  skip: number = 0,
  searchQuery?: string,
  category?: string,
  tag?: string
): Promise<BlogPostsResponse> {
  const start = skip
  const end = skip + limit

  let postsQuery: string
  let countQuery: string
  let params: Record<string, unknown> = { start, end }

  if (searchQuery) {
    postsQuery = groq`*[_type == "blogPost" && title match $searchQuery + "*"] | order(publishDate desc) [$start...$end] { ${blogPostCardFields} }`
    countQuery = groq`count(*[_type == "blogPost" && title match $searchQuery + "*"])`
    params.searchQuery = searchQuery
  } else if (category) {
    postsQuery = groq`*[_type == "blogPost" && $category in categories] | order(publishDate desc) [$start...$end] { ${blogPostCardFields} }`
    countQuery = groq`count(*[_type == "blogPost" && $category in categories])`
    params.category = category
  } else if (tag) {
    postsQuery = groq`*[_type == "blogPost" && $tag in tags] | order(publishDate desc) [$start...$end] { ${blogPostCardFields} }`
    countQuery = groq`count(*[_type == "blogPost" && $tag in tags])`
    params.tag = tag
  } else {
    postsQuery = groq`*[_type == "blogPost"] | order(publishDate desc) [$start...$end] { ${blogPostCardFields} }`
    countQuery = groq`count(*[_type == "blogPost"])`
  }

  const [posts, total] = await Promise.all([
    client.fetch<BlogPostCard[]>(postsQuery, params),
    client.fetch<number>(countQuery, params),
  ])

  return {
    posts: posts || [],
    total: total || 0,
    skip,
    limit,
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = groq`*[_type == "blogPost" && slug.current == $slug][0] { ${blogPostFields} }`
  const post = await client.fetch<BlogPost | null>(query, { slug })
  return post
}

export async function getRelatedPosts(
  currentPostId: string,
  categories: string[],
  limit: number = 3
): Promise<BlogPostCard[]> {
  if (!categories || categories.length === 0) {
    return []
  }

  const query = groq`
    *[_type == "blogPost" && _id != $id && count(categories[@ in $categories]) > 0]
    | order(publishDate desc) [0...$limit] { ${blogPostCardFields} }
  `

  const posts = await client.fetch<BlogPostCard[]>(query, {
    id: currentPostId,
    categories,
    limit,
  })

  return posts || []
}

export async function getAllCategories(): Promise<string[]> {
  const query = groq`array::unique(*[_type == "blogPost"].categories[])`
  const categories = await client.fetch<string[]>(query)
  return (categories || []).filter(Boolean).sort()
}

export async function getAllTags(): Promise<string[]> {
  const query = groq`array::unique(*[_type == "blogPost"].tags[])`
  const tags = await client.fetch<string[]>(query)
  return (tags || []).filter(Boolean).sort()
}

export async function getBlogPostsForSitemap(): Promise<
  { slug: { current: string }; _updatedAt: string }[]
> {
  const query = groq`*[_type == "blogPost"] | order(publishDate desc) { slug, _updatedAt }`
  const posts = await client.fetch<{ slug: { current: string }; _updatedAt: string }[]>(query)
  return posts || []
}
