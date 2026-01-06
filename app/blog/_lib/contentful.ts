import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export interface BlogPost {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
  fields: {
    title: string
    slug: string
    excerpt: string
    content: string
    featuredImage: {
      fields: {
        file: {
          url: string
        }
        title: string
      }
    }
    author: string
    publishDate: string
    categories: string[]
    tags: string[]
    metaTitle?: string
    metaDescription?: string
    readingTime?: number
  }
}

export async function getAllBlogPosts(
  limit: number = 20,
  skip: number = 0,
  searchQuery?: string,
  category?: string,
  tag?: string
) {
  const query: any = {
    content_type: 'blogPost',
    limit,
    skip,
    order: '-fields.publishDate',
  }

  if (searchQuery) {
    query['fields.title[match]'] = searchQuery
  }

  if (category) {
    query['fields.categories[in]'] = category
  }

  if (tag) {
    query['fields.tags[in]'] = tag
  }

  const response = await client.getEntries<BlogPost['fields']>(query)
  
  return {
    posts: response.items,
    total: response.total,
    skip: response.skip,
    limit: response.limit,
  }
}

export async function getBlogPostBySlug(slug: string) {
  const response = await client.getEntries<BlogPost['fields']>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  })

  return response.items[0] || null
}

export async function getRelatedPosts(currentPostId: string, categories: string[], limit: number = 3) {
  const response = await client.getEntries<BlogPost['fields']>({
    content_type: 'blogPost',
    'fields.categories[in]': categories.join(','),
    'sys.id[ne]': currentPostId,
    limit,
    order: '-fields.publishDate',
  })

  return response.items
}

export async function getAllCategories() {
  const response = await client.getEntries<BlogPost['fields']>({
    content_type: 'blogPost',
    select: 'fields.categories',
  })

  const categories = new Set<string>()
  response.items.forEach(item => {
    item.fields?.categories?.forEach(category => categories.add(category))
  })

  return Array.from(categories).sort()
}

export async function getAllTags() {
  const response = await client.getEntries<BlogPost['fields']>({
    content_type: 'blogPost',
    select: 'fields.tags',
  })

  const tags = new Set<string>()
  response.items.forEach(item => {
    item.fields?.tags?.forEach(tag => tags.add(tag))
  })

  return Array.from(tags).sort()
}