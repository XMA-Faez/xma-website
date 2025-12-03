// Cloudinary URL optimization utilities

export function optimizeCloudinaryVideoUrl(url: string): string {
  if (!url.includes('cloudinary.com')) return url;

  // q_auto:good = good quality balance
  // f_auto = automatic format (webm for modern browsers)
  // vc_auto = automatic video codec
  // w_720 = 720p width
  // br_2000k = limit bitrate to 2mbps for streaming
  return url.replace(
    '/video/upload/',
    '/video/upload/q_auto:good,f_auto,vc_auto,w_720,c_scale,br_2000k/'
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
