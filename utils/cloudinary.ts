// Cloudinary URL optimization utilities

export function optimizeCloudinaryVideoUrl(url: string): string {
  // Apply transformations to reduce video size and bandwidth
  // q_auto = automatic quality
  // f_auto = automatic format (webm for modern browsers)
  // vc_auto = automatic video codec
  // w_256 = max width 256px (matches w-64 display size)
  
  if (!url.includes('cloudinary.com')) return url;
  
  // Replace /upload/ with /upload/transformations/
  return url.replace(
    '/video/upload/',
    '/video/upload/q_auto,f_auto,vc_auto,w_512,c_scale/'
  );
}

export function getOptimizedThumbnail(url: string): string {
  if (!url.includes('cloudinary.com')) return url;
  
  // Extract public_id from video URL
  const match = url.match(/\/v\d+\/(.+)\.(mp4|mov|webm)/);
  if (!match) return url;
  
  const publicId = match[1];
  
  // Generate optimized thumbnail URL
  return `https://res.cloudinary.com/dw1j7izud/video/upload/f_auto,q_auto,c_scale,w_320,so_0/${publicId}.jpg`;
}
