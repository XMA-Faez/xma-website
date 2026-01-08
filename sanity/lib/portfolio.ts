import { client } from './client'
import type {
  Gallery,
  CloudinaryAsset,
  CloudinaryVideo,
  CloudinaryGraphic,
  GalleryResponse,
} from './types'

const galleryQuery = `*[_type == "gallery"][0]{
  _id,
  title,
  cloudinaryVideos,
  cloudinaryGraphics
}`

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

function mapToCategory(tags: string[], publicId: string): string {
  const tagLower = tags.map((tag) => tag.toLowerCase())
  const idLower = publicId.toLowerCase()

  if (
    tagLower.some((tag) => tag.includes('web') || tag.includes('website')) ||
    idLower.includes('web')
  ) {
    return 'web-design'
  }
  if (
    tagLower.some((tag) => tag.includes('brand') || tag.includes('logo')) ||
    idLower.includes('brand') ||
    idLower.includes('logo')
  ) {
    return 'branding'
  }
  if (
    tagLower.some(
      (tag) => tag.includes('social') || tag.includes('instagram') || tag.includes('facebook')
    ) ||
    idLower.includes('social')
  ) {
    return 'social-media'
  }
  if (
    tagLower.some((tag) => tag.includes('motion') || tag.includes('animation')) ||
    idLower.includes('motion') ||
    idLower.includes('anim')
  ) {
    return 'motion'
  }
  if (
    tagLower.some((tag) => tag.includes('ui') || tag.includes('ux') || tag.includes('interface')) ||
    idLower.includes('ui') ||
    idLower.includes('ux')
  ) {
    return 'ui-ux'
  }

  return 'web-design'
}

function getFormatFromAspectRatio(
  width: number,
  height: number
): 'square' | 'landscape' | 'portrait' | 'reels' {
  if (!width || !height) return 'landscape'

  const aspectRatio = width / height

  if (aspectRatio > 0.9 && aspectRatio < 1.1) {
    return 'square'
  } else if (aspectRatio < 0.9) {
    return 'portrait'
  } else {
    return 'landscape'
  }
}

function transformCloudinaryAssetToVideo(
  asset: CloudinaryAsset,
  index: number
): CloudinaryVideo {
  const format = getFormatFromAspectRatio(asset.width, asset.height)
  const category = mapToCategory(asset.tags || [], asset.public_id || '')

  const videoUrl = CLOUDINARY_CLOUD_NAME
    ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_auto,q_auto/${asset.public_id}`
    : asset.secure_url || asset.url

  const thumbnailUrl = CLOUDINARY_CLOUD_NAME
    ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/so_0,f_auto,q_auto,w_400/${asset.public_id}.jpg`
    : asset.secure_url || asset.url

  return {
    id: `video-${index}`,
    type: 'video',
    cloudinaryId: asset.public_id,
    title: asset.public_id?.split('/').pop()?.replace(/[-_]/g, ' ') || `Video ${index + 1}`,
    description: `Professional video content showcasing ${category.replace('-', ' ')} expertise`,
    url: videoUrl,
    highQualityUrl: asset.secure_url || asset.url,
    thumbnailUrl,
    tags: asset.tags || [],
    width: asset.width || 1920,
    height: asset.height || 1080,
    format,
    category,
    loaded: false,
    duration: asset.duration ? `${Math.floor(asset.duration / 60)}:${Math.floor(asset.duration % 60).toString().padStart(2, '0')}` : undefined,
    views: Math.floor(Math.random() * 50000) + 1000,
    date: asset.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
  }
}

function transformCloudinaryAssetToGraphic(
  asset: CloudinaryAsset,
  index: number
): CloudinaryGraphic {
  const format = getFormatFromAspectRatio(asset.width, asset.height)
  const category = mapToCategory(asset.tags || [], asset.public_id || '')

  let graphicType = 'graphic'
  const typeKeywords: Record<string, string> = {
    logo: 'logo',
    banner: 'banner',
    icon: 'icon',
    background: 'background',
    illustration: 'illustration',
    social: 'social media',
    web: 'web design',
    ui: 'interface',
  }

  Object.entries(typeKeywords).forEach(([keyword, value]) => {
    if (asset.public_id && asset.public_id.toLowerCase().includes(keyword)) {
      graphicType = value
    }
  })

  return {
    id: `graphic-${index}`,
    type: 'graphic',
    cloudinaryId: asset.public_id,
    title: asset.public_id?.split('/').pop()?.replace(/[-_]/g, ' ') || `Graphic ${index + 1}`,
    description: `Creative ${graphicType} design for ${category.replace('-', ' ')} project`,
    graphicType,
    industry: 'general',
    format,
    url: asset.secure_url || asset.url,
    width: asset.width || 1200,
    height: asset.height || 1200,
    tags: asset.tags || [],
    category,
    loaded: false,
    views: Math.floor(Math.random() * 25000) + 500,
    date: asset.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
  }
}

export async function fetchPortfolioData(tags?: string[]): Promise<GalleryResponse> {
  try {
    const gallery = await client.fetch<Gallery | null>(galleryQuery)

    if (!gallery) {
      return {
        videos: [],
        graphics: [],
        meta: {
          totalVideos: 0,
          totalGraphics: 0,
          filteredVideos: 0,
          filteredGraphics: 0,
        },
      }
    }

    const allVideos = (gallery.cloudinaryVideos || []).map((asset, index) =>
      transformCloudinaryAssetToVideo(asset, index)
    )

    const allGraphics = (gallery.cloudinaryGraphics || []).map((asset, index) =>
      transformCloudinaryAssetToGraphic(asset, index)
    )

    const videos = tags?.length
      ? allVideos.filter((video) => video.tags.some((tag) => tags.includes(tag)))
      : allVideos

    const graphics = tags?.length
      ? allGraphics.filter((graphic) => graphic.tags.some((tag) => tags.includes(tag)))
      : allGraphics

    return {
      videos,
      graphics,
      meta: {
        totalVideos: allVideos.length,
        totalGraphics: allGraphics.length,
        filteredVideos: videos.length,
        filteredGraphics: graphics.length,
      },
    }
  } catch (error) {
    console.error('Error fetching portfolio from Sanity:', error)
    return {
      videos: [],
      graphics: [],
      meta: {
        totalVideos: 0,
        totalGraphics: 0,
        filteredVideos: 0,
        filteredGraphics: 0,
      },
    }
  }
}
