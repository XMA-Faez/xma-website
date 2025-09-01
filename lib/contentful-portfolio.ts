import { createClient } from 'contentful';

// Portfolio Category interface
export interface PortfolioCategory {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug: string;
    color?: string;
    icon?: string;
  };
}

// New Portfolio Item interface (separate from Gallery structure)
export interface PortfolioItem {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    description?: any; // Rich text
    media: any; // Cloudinary JSON object
    category: PortfolioCategory;
    tags?: string[];
    featured?: boolean;
    publishDate?: string;
    order?: number;
    isActive?: boolean;
    customMetadata?: any;
  };
}

// Processed Portfolio Item (ready for display)
export interface ProcessedPortfolioItem {
  id: string;
  title: string;
  slug: string;
  description?: string;
  media: any; // Original Cloudinary object
  cloudinaryPublicId: string;
  resourceType: 'video' | 'image';
  category: string;
  categoryData: PortfolioCategory;
  tags: string[];
  featured: boolean;
  publishDate?: string;
  order: number;
  isActive: boolean;
  customMetadata?: any;
  // Generated fields
  url: string;
  thumbnailUrl?: string;
  width: number;
  height: number;
  format: 'square' | 'landscape' | 'portrait' | 'reels';
  type: 'video' | 'graphic';
  loaded: boolean;
}

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

// Category mapping function - simplified for Services/Ecommerce
function mapToCategory(tags: string[], publicId: string): string {
  const tagLower = tags.map(tag => tag.toLowerCase());
  const idLower = publicId.toLowerCase();

  // Check for ecommerce keywords
  if (tagLower.some(tag => 
    tag.includes('ecommerce') || 
    tag.includes('shop') || 
    tag.includes('store') || 
    tag.includes('product') ||
    tag.includes('cart')
  ) || idLower.includes('ecommerce') || idLower.includes('shop')) {
    return 'ecommerce';
  }
  
  // Default to services for everything else
  return 'services';
}

// Fetch categories from Contentful
export async function fetchPortfolioCategories(): Promise<PortfolioCategory[]> {
  try {
    const response = await contentfulClient.getEntries<PortfolioCategory['fields']>({
      content_type: 'portfolioCategory',
    });
    
    return response.items;
  } catch (error) {
    console.error('Error fetching portfolio categories:', error);
    // Return default categories if fetch fails
    return [
      {
        sys: { id: 'default-services' },
        fields: {
          name: 'Services',
          slug: 'services',
          color: 'hsl(217, 91%, 60%)',
          icon: 'Briefcase'
        }
      },
      {
        sys: { id: 'default-ecommerce' },
        fields: {
          name: 'Ecommerce',
          slug: 'ecommerce',
          color: 'hsl(161, 84%, 50%)',
          icon: 'ShoppingCart'
        }
      }
    ];
  }
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
    console.log('Fetched gallery:', gallery);
    
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

// Export main gallery fetch function (KEEP EXISTING FOR OTHER SYSTEMS)
export async function fetchPortfolioData(tags?: string[]): Promise<GalleryResponse> {
  return await fetchGallery(tags);
}

// NEW PORTFOLIO ITEM FUNCTIONS (separate from Gallery)

// Fetch Portfolio Items from Contentful with pagination
export async function fetchPortfolioItems(
  categorySlug?: string,
  limit: number = 20,
  skip: number = 0
): Promise<{ items: ProcessedPortfolioItem[]; total: number; hasMore: boolean }> {
  try {
    let query: any = {
      content_type: 'portfolioItem',
      include: 2, // Include referenced categories
      'fields.isActive': true,
      order: 'fields.order,-sys.createdAt', // Order by order field, then by creation date
      limit: Math.min(limit, 100), // Cap at 100 to avoid rate limits
      skip,
    };

    // If filtering by category, first get the category ID
    if (categorySlug && categorySlug !== 'all') {
      const categoriesResponse = await contentfulClient.getEntries({
        content_type: 'portfolioCategory',
        'fields.slug': categorySlug,
        limit: 1,
      });
      
      if (categoriesResponse.items.length > 0) {
        const categoryId = categoriesResponse.items[0].sys.id;
        query['fields.category.sys.id'] = categoryId;
      } else {
        // Category not found, return empty results
        return {
          items: [],
          total: 0,
          hasMore: false,
        };
      }
    }

    const response = await contentfulClient.getEntries<PortfolioItem['fields']>(query);
    
    const items = response.items.map(processPortfolioItem);
    const hasMore = response.skip + response.items.length < response.total;
    
    return {
      items,
      total: response.total,
      hasMore,
    };
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return {
      items: [],
      total: 0,
      hasMore: false,
    };
  }
}

// Process a single portfolio item
function processPortfolioItem(item: any): ProcessedPortfolioItem {
  const fields = item.fields;
  const category = fields.category?.fields || { name: 'Uncategorized', slug: 'uncategorized' };
  const media = fields.media;
  
  if (!media) {
    throw new Error(`Portfolio item ${item.sys.id} is missing media field`);
  }

  // Extract data from Cloudinary media object
  const publicId = media.public_id;
  const resourceType = media.resource_type; // 'video' or 'image'
  const width = media.width || (resourceType === 'video' ? 1920 : 1200);
  const height = media.height || (resourceType === 'video' ? 1080 : 1200);
  
  // Generate Cloudinary URLs from the media object
  let url: string;
  let thumbnailUrl: string;
  
  if (resourceType === 'video') {
    // Use secure_url if available, otherwise construct URL
    url = media.secure_url || `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_auto,q_auto/${publicId}`;
    thumbnailUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/so_0,f_auto,q_auto,w_400/${publicId}.jpg`;
  } else {
    // For images
    url = media.secure_url || `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}`;
    thumbnailUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_400/${publicId}`;
  }
  
  return {
    id: item.sys.id,
    title: fields.title,
    slug: fields.slug,
    description: fields.description ? extractTextFromRichText(fields.description) : undefined,
    media: media, // Store original Cloudinary object
    cloudinaryPublicId: publicId,
    resourceType: resourceType as 'video' | 'image',
    category: category.slug,
    categoryData: {
      sys: { id: fields.category?.sys?.id || 'unknown' },
      fields: category
    },
    tags: media.tags || fields.tags || [], // Use tags from media or fields
    featured: fields.featured || false,
    publishDate: fields.publishDate,
    order: fields.order || 0,
    isActive: fields.isActive !== false,
    customMetadata: fields.customMetadata,
    // Generated fields
    url,
    thumbnailUrl,
    width,
    height,
    format: getFormatFromAspectRatio(width, height),
    type: resourceType === 'video' ? 'video' : 'graphic',
    loaded: false,
  };
}

// Extract plain text from Contentful Rich Text
function extractTextFromRichText(richText: any): string {
  if (!richText || !richText.content) return '';
  
  return richText.content
    .map((node: any) => {
      if (node.nodeType === 'paragraph' && node.content) {
        return node.content
          .filter((textNode: any) => textNode.nodeType === 'text')
          .map((textNode: any) => textNode.value)
          .join('');
      }
      return '';
    })
    .join(' ')
    .trim();
}

// Fetch featured portfolio items
export async function fetchFeaturedPortfolioItems(limit: number = 6): Promise<ProcessedPortfolioItem[]> {
  try {
    const response = await contentfulClient.getEntries<PortfolioItem['fields']>({
      content_type: 'portfolioItem',
      include: 2,
      'fields.isActive': true,
      'fields.featured': true,
      limit,
      order: 'fields.order,-sys.createdAt',
    });
    
    return response.items.map(processPortfolioItem);
  } catch (error) {
    console.error('Error fetching featured portfolio items:', error);
    return [];
  }
}

// Get portfolio items by category
export async function fetchPortfolioItemsByCategory(categorySlug: string): Promise<ProcessedPortfolioItem[]> {
  const result = await fetchPortfolioItems(categorySlug, 100); // Get more items for category view
  return result.items;
}

// Get portfolio item by slug
export async function fetchPortfolioItemBySlug(slug: string): Promise<ProcessedPortfolioItem | null> {
  try {
    const response = await contentfulClient.getEntries<PortfolioItem['fields']>({
      content_type: 'portfolioItem',
      include: 2,
      'fields.slug': slug,
      'fields.isActive': true,
      limit: 1,
    });
    
    if (response.items.length === 0) return null;
    
    return processPortfolioItem(response.items[0]);
  } catch (error) {
    console.error('Error fetching portfolio item by slug:', error);
    return null;
  }
}

// Update portfolio item order (requires Management API)
export async function updatePortfolioItemsOrder(itemUpdates: { id: string; order: number }[]): Promise<boolean> {
  try {
    // This needs to run on the server side since management token should not be exposed to client
    const response = await fetch('/api/portfolio/reorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemUpdates }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error updating portfolio items order:', error);
    return false;
  }
}
