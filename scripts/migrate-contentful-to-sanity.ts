/**
 * Migration Script: Contentful to Sanity
 *
 * This script migrates blog posts and gallery data from Contentful to Sanity.
 *
 * Prerequisites:
 * 1. Set environment variables:
 *    - CONTENTFUL_SPACE_ID
 *    - CONTENTFUL_ACCESS_TOKEN
 *    - NEXT_PUBLIC_SANITY_PROJECT_ID
 *    - NEXT_PUBLIC_SANITY_DATASET
 *    - SANITY_API_TOKEN (create a write token at sanity.io/manage)
 *
 * 2. Run with: bunx tsx scripts/migrate-contentful-to-sanity.ts
 */

import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient as createContentfulClient } from 'contentful'
import { createClient as createSanityClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'

// Types
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
  caption?: string
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

interface CloudinaryAsset {
  _key: string
  _type: 'cloudinary.asset'
  _version: number
  access_mode: string
  bytes: number
  created_at: string
  duration?: number | null
  format: string
  height: number
  public_id: string
  resource_type: 'image' | 'video'
  secure_url: string
  tags: string[]
  type: string
  url: string
  version: number
  width: number
}

// Initialize clients
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

async function migrateBlogPosts(): Promise<void> {
  console.log('\n📝 Migrating Blog Posts...')

  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blogPost',
      limit: 1000,
    })

    console.log(`Found ${response.items.length} blog posts`)

    for (const item of response.items) {
      const post = item as unknown as ContentfulBlogPost
      console.log(`\nProcessing: ${post.fields.title}`)

      let featuredImageRef: string | null = null
      if (post.fields.featuredImage?.fields?.file?.url) {
        const imageUrl = post.fields.featuredImage.fields.file.url
        const filename = post.fields.featuredImage.fields.file.fileName || 'featured.jpg'
        featuredImageRef = await uploadImageToSanity(imageUrl, filename)
      }

      const portableTextContent = await convertContentfulRichTextToPortableText(
        post.fields.content
      )

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

      await sanityClient.createOrReplace(sanityDocument)
      console.log(`  ✅ Migrated: ${post.fields.title}`)
    }

    console.log(`\n✅ Blog posts migration complete!`)
  } catch (error) {
    console.error('Error migrating blog posts:', error)
    throw error
  }
}

async function migrateGallery(): Promise<void> {
  console.log('\n🖼️ Migrating Gallery...')

  try {
    const response = await contentfulClient.getEntries({
      content_type: 'gallery',
      include: 2,
      limit: 1,
    })

    if (!response.items.length) {
      console.log('No gallery found in Contentful')
      return
    }

    const gallery = response.items[0] as any
    console.log('Found gallery entry')

    const cloudinaryVideos: CloudinaryAsset[] = []
    const cloudinaryGraphics: CloudinaryAsset[] = []

    if (gallery.fields.cloudinaryVideos) {
      for (const video of gallery.fields.cloudinaryVideos) {
        cloudinaryVideos.push({
          _key: generateKey(),
          _type: 'cloudinary.asset',
          _version: 1,
          access_mode: 'public',
          bytes: video.bytes || 0,
          created_at: video.created_at || new Date().toISOString(),
          duration: video.duration || null,
          format: video.format || 'mp4',
          height: video.height || 1080,
          public_id: video.public_id,
          resource_type: 'video',
          secure_url: video.secure_url,
          tags: video.tags || [],
          type: video.type || 'upload',
          url: video.url,
          version: video.version || Date.now(),
          width: video.width || 1920,
        })
      }
    }

    if (gallery.fields.cloudinaryGraphics) {
      for (const graphic of gallery.fields.cloudinaryGraphics) {
        cloudinaryGraphics.push({
          _key: generateKey(),
          _type: 'cloudinary.asset',
          _version: 1,
          access_mode: 'public',
          bytes: graphic.bytes || 0,
          created_at: graphic.created_at || new Date().toISOString(),
          format: graphic.format || 'jpg',
          height: graphic.height || 1200,
          public_id: graphic.public_id,
          resource_type: 'image',
          secure_url: graphic.secure_url,
          tags: graphic.tags || [],
          type: graphic.type || 'upload',
          url: graphic.url,
          version: graphic.version || Date.now(),
          width: graphic.width || 1200,
        })
      }
    }

    const sanityGallery = {
      _type: 'gallery',
      _id: 'gallery',
      title: 'Portfolio Gallery',
      cloudinaryVideos,
      cloudinaryGraphics,
    }

    await sanityClient.createOrReplace(sanityGallery)
    console.log(
      `✅ Gallery migrated: ${cloudinaryVideos.length} videos, ${cloudinaryGraphics.length} graphics`
    )
  } catch (error) {
    console.error('Error migrating gallery:', error)
    throw error
  }
}

async function main(): Promise<void> {
  console.log('🚀 Starting Contentful to Sanity Migration')
  console.log('=========================================')

  // Validate environment variables
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
    console.error('\nPlease set these in your .env.local file:')
    for (const v of missingVars) {
      console.error(`  ${v}=your_value_here`)
    }
    process.exit(1)
  }

  console.log(`\nContentful Space: ${process.env.CONTENTFUL_SPACE_ID}`)
  console.log(`Sanity Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`Sanity Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)

  try {
    await migrateBlogPosts()
    await migrateGallery()

    console.log('\n=========================================')
    console.log('✅ Migration Complete!')
    console.log('\nNext steps:')
    console.log('1. Verify content in Sanity Studio: http://localhost:3000/studio')
    console.log('2. Update your frontend to use Sanity queries')
    console.log('3. Test all pages thoroughly')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

main()
