import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Portfolio Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Portfolio Gallery',
      readOnly: true,
    }),
    defineField({
      name: 'cloudinaryVideos',
      title: 'Cloudinary Videos',
      description: 'Video content from Cloudinary for the portfolio',
      type: 'array',
      of: [{ type: 'cloudinary.asset' }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'cloudinaryGraphics',
      title: 'Cloudinary Graphics',
      description: 'Graphic/image content from Cloudinary for the portfolio',
      type: 'array',
      of: [{ type: 'cloudinary.asset' }],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      videoCount: 'cloudinaryVideos',
      graphicCount: 'cloudinaryGraphics',
    },
    prepare({ videoCount, graphicCount }) {
      const videos = videoCount?.length || 0
      const graphics = graphicCount?.length || 0
      return {
        title: 'Portfolio Gallery',
        subtitle: `${videos} videos, ${graphics} graphics`,
      }
    },
  },
})
