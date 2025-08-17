import { createClient } from 'contentful';

// Contentful types for portfolio data
export interface CloudinaryVideo {
  id: string;
  cloudinaryId: string;
  title: string;
  url: string;
  highQualityUrl?: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  loaded: boolean;
  tags: string[];
  format: 'square' | 'landscape' | 'portrait' | 'reels';
  type: 'video';
  duration?: string;
  views?: number;
  description?: string;
  category: string;
  date: string;
}

export interface CloudinaryGraphic {
  id: string;
  cloudinaryId: string;
  title: string;
  type: string;
  industry: string;
  format: 'square' | 'landscape' | 'portrait' | 'reels';
  url: string;
  width: number;
  height: number;
  loaded: boolean;
  tags: string[];
  views?: number;
  description?: string;
  category: string;
  date: string;
}

export interface GalleryResponse {
  videos: CloudinaryVideo[];
  graphics: CloudinaryGraphic[];
  meta: {
    totalVideos: number;
    totalGraphics: number;
    filteredVideos: number;
    filteredGraphics: number;
  };
}

// Contentful client configuration from environment variables
const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// Initialize Contentful client
const contentfulClient = createClient({
  space: CONTENTFUL_SPACE_ID!,
  accessToken: CONTENTFUL_ACCESS_TOKEN!,
});

// Category mapping function
function mapToCategory(tags: string[], publicId: string): string {
  const tagLower = tags.map(tag => tag.toLowerCase());
  const idLower = publicId.toLowerCase();

  if (tagLower.some(tag => tag.includes('web') || tag.includes('website')) || 
      idLower.includes('web')) {
    return 'web-design';
  }
  if (tagLower.some(tag => tag.includes('brand') || tag.includes('logo')) || 
      idLower.includes('brand') || idLower.includes('logo')) {
    return 'branding';
  }
  if (tagLower.some(tag => tag.includes('social') || tag.includes('instagram') || tag.includes('facebook')) || 
      idLower.includes('social')) {
    return 'social-media';
  }
  if (tagLower.some(tag => tag.includes('motion') || tag.includes('animation')) || 
      idLower.includes('motion') || idLower.includes('anim')) {
    return 'motion';
  }
  if (tagLower.some(tag => tag.includes('ui') || tag.includes('ux') || tag.includes('interface')) || 
      idLower.includes('ui') || idLower.includes('ux')) {
    return 'ui-ux';
  }
  
  return 'web-design'; // Default category
}

// Format mapping function
function getFormatFromAspectRatio(width: number, height: number): 'square' | 'landscape' | 'portrait' | 'reels' {
  if (!width || !height) return 'landscape';
  
  const aspectRatio = width / height;
  
  if (aspectRatio > 0.9 && aspectRatio < 1.1) {
    return 'square';
  } else if (aspectRatio < 0.9) {
    return 'portrait'; // Changed from 'reels' to 'portrait' for better portfolio display
  } else {
    return 'landscape';
  }
}

// Fetch all content from Contentful
async function fetchGallery(tags?: string[]): Promise<GalleryResponse> {
  try {
    // Get the Gallery singleton with all references
    const entries = await contentfulClient.getEntries({
      content_type: 'gallery',
      include: 2,
      limit: 1
    });

    if (!entries.items.length) {
      throw new Error('Gallery not found');
    }

    const gallery = entries.items[0];
    
    // Process videos from cloudinaryVideos field
    const allVideos = (gallery.fields.cloudinaryVideos as any[] || [])
      .map((video: any, index: number): CloudinaryVideo => {
        const format = getFormatFromAspectRatio(video.width, video.height);
        const category = mapToCategory(video.tags || [], video.public_id || '');
        
        // Use optimized video URL with auto format and quality
        const videoUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_auto,q_auto/${video.public_id}`;
        const thumbnailUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/so_0,f_auto,q_auto,w_400/${video.public_id}.jpg`;

        return {
          id: `video-${index}`,
          type: 'video',
          title: video.public_id?.split('/').pop()?.replace(/[-_]/g, ' ') || `Video ${index + 1}`,
          description: `Professional video content showcasing ${category.replace('-', ' ')} expertise`,
          cloudinaryId: video.public_id,
          url: videoUrl,
          thumbnailUrl: thumbnailUrl,
          tags: video.tags || [],
          width: video.width || 1920,
          height: video.height || 1080,
          format,
          category,
          loaded: false,
          duration: video.duration || '1:30',
          views: Math.floor(Math.random() * 50000) + 1000, // Random views for demo
          date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Random date within last year
        };
      });
    
    // Process graphics from cloudinaryGraphics field
    const allGraphics = (gallery.fields.cloudinaryGraphics as any[] || [])
      .map((graphic: any, index: number): CloudinaryGraphic => {
        const format = getFormatFromAspectRatio(graphic.width, graphic.height);
        const category = mapToCategory(graphic.tags || [], graphic.public_id || '');

        // Determine graphic type from public_id
        let type = 'graphic';
        const typeKeywords = {
          'logo': 'logo',
          'banner': 'banner', 
          'icon': 'icon',
          'background': 'background',
          'illustration': 'illustration',
          'social': 'social media',
          'web': 'web design',
          'ui': 'interface'
        };

        Object.entries(typeKeywords).forEach(([keyword, value]) => {
          if (graphic.public_id && graphic.public_id.toLowerCase().includes(keyword)) {
            type = value;
          }
        });

        return {
          id: `graphic-${index}`,
          type: 'graphic',
          cloudinaryId: graphic.public_id,
          title: graphic.public_id?.split('/').pop()?.replace(/[-_]/g, ' ') || `Graphic ${index + 1}`,
          description: `Creative ${type} design for ${category.replace('-', ' ')} project`,
          type,
          industry: 'general',
          format,
          url: graphic.secure_url || graphic.url,
          width: graphic.width || 1200,
          height: graphic.height || 1200,
          tags: graphic.tags || [],
          category,
          loaded: false,
          views: Math.floor(Math.random() * 25000) + 500, // Random views for demo
          date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Random date within last year
        };
      });

    // Filter by tags if provided
    const videos = tags?.length 
      ? allVideos.filter(video => video.tags.some(tag => tags.includes(tag)))
      : allVideos;
      
    const graphics = tags?.length
      ? allGraphics.filter(graphic => graphic.tags.some(tag => tags.includes(tag)))
      : allGraphics;

    return {
      videos,
      graphics,
      meta: {
        totalVideos: allVideos.length,
        totalGraphics: allGraphics.length,
        filteredVideos: videos.length,
        filteredGraphics: graphics.length
      }
    };

  } catch (error) {
    console.error('Error fetching from Contentful:', error);
    // Return empty data structure on error
    return {
      videos: [],
      graphics: [],
      meta: {
        totalVideos: 0,
        totalGraphics: 0,
        filteredVideos: 0,
        filteredGraphics: 0
      }
    };
  }
}

// Export individual fetch functions
export async function fetchCloudinaryVideos(tags?: string[]): Promise<CloudinaryVideo[]> {
  try {
    const gallery = await fetchGallery(tags);
    return gallery.videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export async function fetchCloudinaryGraphics(tags?: string[]): Promise<CloudinaryGraphic[]> {
  try {
    const gallery = await fetchGallery(tags);
    return gallery.graphics;
  } catch (error) {
    console.error('Error fetching graphics:', error);
    return [];
  }
}

// Export main gallery fetch function
export async function fetchPortfolioData(tags?: string[]): Promise<GalleryResponse> {
  return await fetchGallery(tags);
}