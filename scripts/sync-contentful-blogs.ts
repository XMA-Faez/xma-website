/**
 * Sync Script: Contentful to Sanity (Incremental)
 *
 * Fetches blog posts from Contentful and only creates posts
 * that don't already exist in Sanity.
 *
 * Run with: bun run sync:blogs
 * Or: bunx tsx scripts/sync-contentful-blogs.ts
 */

import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient as createContentfulClient } from 'contentful'
import { createClient as createSanityClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'

interface ContentfulBlogPost {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
  fields: {
    title: string
    slug: string
    excerpt: string
    content: ContentfulRichText
    featuredImage?: {
      fields: {
        file: {
          url: string
          contentType: string
          fileName: string
        }
        title: string
      }
    }
    author: string
    publishDate: string
    categories?: string[]
    tags?: string[]
    metaTitle?: string
    metaDescription?: string
    readingTime?: number
  }
}

interface ContentfulRichText {
  nodeType: string
  content: ContentfulNode[]
  data: Record<string, unknown>
}

interface ContentfulNode {
  nodeType: string
  content?: ContentfulNode[]
  value?: string
  data?: {
    uri?: string
    target?: {
      fields: {
        file: { url: string; contentType: string }
        title: string
      }
    }
  }
  marks?: { type: string }[]
}

interface SanityBlock {
  _type: string
  _key: string
  style?: string
  listItem?: string
  level?: number
  children?: SanitySpan[]
  markDefs?: SanityMarkDef[]
  asset?: { _type: string; _ref: string }
  alt?: string
}

interface SanitySpan {
  _type: string
  _key: string
  text: string
  marks?: string[]
}

interface SanityMarkDef {
  _type: string
  _key: string
  href?: string
}

const contentfulClient = createContentfulClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

const sanityClient = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

function generateKey(): string {
  return uuidv4().replace(/-/g, '').slice(0, 12)
}

async function uploadImageToSanity(imageUrl: string, filename: string): Promise<string | null> {
  try {
    const fullUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl
    console.log(`  Uploading image: ${filename}`)

    const response = await fetch(fullUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const buffer = await response.arrayBuffer()
    const asset = await sanityClient.assets.upload('image', Buffer.from(buffer), {
      filename,
    })

    console.log(`  Uploaded image: ${asset._id}`)
    return asset._id
  } catch (error) {
    console.error(`  Failed to upload image ${filename}:`, error)
    return null
  }
}

function convertContentfulMarks(marks: { type: string }[] | undefined): string[] {
  if (!marks) return []

  const sanityMarks: string[] = []
  for (const mark of marks) {
    switch (mark.type) {
      case 'bold':
        sanityMarks.push('strong')
        break
      case 'italic':
        sanityMarks.push('em')
        break
      case 'underline':
        sanityMarks.push('underline')
        break
      case 'code':
        sanityMarks.push('code')
        break
    }
  }
  return sanityMarks
}

async function convertContentfulRichTextToPortableText(
  richText: ContentfulRichText
): Promise<SanityBlock[]> {
  const blocks: SanityBlock[] = []

  async function processNode(
    node: ContentfulNode,
    parentStyle: string = 'normal',
    listItem?: string,
    level?: number
  ): Promise<void> {
    switch (node.nodeType) {
      case 'document':
        if (node.content) {
          for (const child of node.content) {
            await processNode(child)
          }
        }
        break

      case 'paragraph': {
        const children: SanitySpan[] = []
        const markDefs: SanityMarkDef[] = []

        if (node.content) {
          for (const child of node.content) {
            if (child.nodeType === 'text') {
              children.push({
                _type: 'span',
                _key: generateKey(),
                text: child.value || '',
                marks: convertContentfulMarks(child.marks),
              })
            } else if (child.nodeType === 'hyperlink') {
              const linkKey = generateKey()
              markDefs.push({
                _type: 'link',
                _key: linkKey,
                href: child.data?.uri,
              })

              if (child.content) {
                for (const linkChild of child.content) {
                  if (linkChild.nodeType === 'text') {
                    children.push({
                      _type: 'span',
                      _key: generateKey(),
                      text: linkChild.value || '',
                      marks: [...convertContentfulMarks(linkChild.marks), linkKey],
                    })
                  }
                }
              }
            }
          }
        }

        if (children.length > 0) {
          const block: SanityBlock = {
            _type: 'block',
            _key: generateKey(),
            style: parentStyle,
            children,
            markDefs,
          }

          if (listItem) {
            block.listItem = listItem
            block.level = level || 1
          }

          blocks.push(block)
        }
        break
      }

      case 'heading-1':
      case 'heading-2':
      case 'heading-3':
      case 'heading-4': {
        const headingLevel = node.nodeType.replace('heading-', 'h')
        const children: SanitySpan[] = []
        const markDefs: SanityMarkDef[] = []

        if (node.content) {
          for (const child of node.content) {
            if (child.nodeType === 'text') {
              children.push({
                _type: 'span',
                _key: generateKey(),
                text: child.value || '',
                marks: convertContentfulMarks(child.marks),
              })
            } else if (child.nodeType === 'hyperlink') {
              const linkKey = generateKey()
              markDefs.push({
                _type: 'link',
                _key: linkKey,
                href: child.data?.uri,
              })

              if (child.content) {
                for (const linkChild of child.content) {
                  if (linkChild.nodeType === 'text') {
                    children.push({
                      _type: 'span',
                      _key: generateKey(),
                      text: linkChild.value || '',
                      marks: [...convertContentfulMarks(linkChild.marks), linkKey],
                    })
                  }
                }
              }
            }
          }
        }

        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: headingLevel,
          children,
          markDefs,
        })
        break
      }

      case 'unordered-list':
        if (node.content) {
          for (const child of node.content) {
            if (child.nodeType === 'list-item' && child.content) {
              for (const listContent of child.content) {
                await processNode(listContent, 'normal', 'bullet', 1)
              }
            }
          }
        }
        break

      case 'ordered-list':
        if (node.content) {
          for (const child of node.content) {
            if (child.nodeType === 'list-item' && child.content) {
              for (const listContent of child.content) {
                await processNode(listContent, 'normal', 'number', 1)
              }
            }
          }
        }
        break

      case 'blockquote':
        if (node.content) {
          for (const child of node.content) {
            await processNode(child, 'blockquote')
          }
        }
        break

      case 'hr':
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: generateKey(),
              text: '---',
              marks: [],
            },
          ],
          markDefs: [],
        })
        break

      case 'embedded-asset-block': {
        const target = node.data?.target
        if (target?.fields?.file?.url) {
          const imageUrl = target.fields.file.url
          const filename = imageUrl.split('/').pop() || 'image.jpg'
          const assetId = await uploadImageToSanity(imageUrl, filename)

          if (assetId) {
            blocks.push({
              _type: 'image',
              _key: generateKey(),
              asset: {
                _type: 'reference',
                _ref: assetId,
              },
              alt: target.fields.title || '',
            })
          }
        }
        break
      }
    }
  }

  await processNode(richText as unknown as ContentfulNode)
  return blocks
}

async function getExistingSanityBlogIds(): Promise<Set<string>> {
  const query = `*[_type == "blogPost"]{ _id }`
  const results = await sanityClient.fetch<{ _id: string }[]>(query)
  return new Set(results.map((doc) => doc._id))
}

async function syncBlogPosts(): Promise<void> {
  console.log('\n📝 Syncing Blog Posts from Contentful to Sanity...')

  console.log('Fetching existing Sanity blog post IDs...')
  const existingSanityIds = await getExistingSanityBlogIds()
  console.log(`Found ${existingSanityIds.size} existing blog posts in Sanity`)

  console.log('Fetching Contentful blog posts...')
  const response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    limit: 1000,
  })
  console.log(`Found ${response.items.length} blog posts in Contentful`)

  const newPosts = response.items.filter((item) => {
    const sanityId = `blogPost-${item.sys.id}`
    return !existingSanityIds.has(sanityId)
  })

  if (newPosts.length === 0) {
    console.log('\n✅ No new blog posts to sync. Everything is up to date!')
    return
  }

  console.log(`\n📋 Found ${newPosts.length} new blog posts to sync:`)
  for (const post of newPosts) {
    console.log(`  - ${(post as unknown as ContentfulBlogPost).fields.title}`)
  }

  let successCount = 0
  let failCount = 0

  for (const item of newPosts) {
    const post = item as unknown as ContentfulBlogPost
    console.log(`\nProcessing: ${post.fields.title}`)

    try {
      let featuredImageRef: string | null = null
      if (post.fields.featuredImage?.fields?.file?.url) {
        const imageUrl = post.fields.featuredImage.fields.file.url
        const filename = post.fields.featuredImage.fields.file.fileName || 'featured.jpg'
        featuredImageRef = await uploadImageToSanity(imageUrl, filename)
      }

      const portableTextContent = await convertContentfulRichTextToPortableText(post.fields.content)

      const sanityDocument = {
        _type: 'blogPost',
        _id: `blogPost-${post.sys.id}`,
        title: post.fields.title,
        slug: {
          _type: 'slug',
          current: post.fields.slug,
        },
        excerpt: post.fields.excerpt,
        content: portableTextContent,
        featuredImage: featuredImageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: featuredImageRef,
              },
              alt: post.fields.featuredImage?.fields?.title || post.fields.title,
            }
          : undefined,
        author: post.fields.author,
        publishDate: post.fields.publishDate,
        categories: post.fields.categories || [],
        tags: post.fields.tags || [],
        metaTitle: post.fields.metaTitle || '',
        metaDescription: post.fields.metaDescription || '',
        readingTime: post.fields.readingTime || undefined,
      }

      await sanityClient.create(sanityDocument)
      console.log(`  ✅ Created: ${post.fields.title}`)
      successCount++
    } catch (error) {
      console.error(`  ❌ Failed to sync: ${post.fields.title}`, error)
      failCount++
    }
  }

  console.log('\n=========================================')
  console.log('📊 Sync Summary:')
  console.log(`  ✅ Successfully synced: ${successCount}`)
  console.log(`  ❌ Failed: ${failCount}`)
  console.log(`  ⏭️  Skipped (existing): ${existingSanityIds.size}`)
}

async function main(): Promise<void> {
  console.log('🔄 Starting Contentful to Sanity Blog Sync')
  console.log('=========================================')

  const requiredEnvVars = [
    'CONTENTFUL_SPACE_ID',
    'CONTENTFUL_ACCESS_TOKEN',
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN',
  ]

  const missingVars = requiredEnvVars.filter((v) => !process.env[v])
  if (missingVars.length > 0) {
    console.error(`❌ Missing environment variables: ${missingVars.join(', ')}`)
    process.exit(1)
  }

  console.log(`\nContentful Space: ${process.env.CONTENTFUL_SPACE_ID}`)
  console.log(`Sanity Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`Sanity Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)

  try {
    await syncBlogPosts()
    console.log('\n✅ Sync Complete!')
  } catch (error) {
    console.error('\n❌ Sync failed:', error)
    process.exit(1)
  }
}

main()
