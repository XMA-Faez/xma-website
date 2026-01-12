import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Gallery Identifier',
      type: 'slug',
      description: 'Unique identifier (e.g., "homepage", "portfolio")',
      options: {
        source: 'title',
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Where this gallery is used (internal note)',
    }),
    defineField({
      name: 'cloudinaryVideos',
      title: 'Cloudinary Videos',
      description: 'Video content from Cloudinary',
      type: 'array',
      of: [{ type: 'cloudinary.asset' }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'cloudinaryGraphics',
      title: 'Cloudinary Graphics',
      description: 'Graphic/image content from Cloudinary',
      type: 'array',
      of: [{ type: 'cloudinary.asset' }],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      videoCount: 'cloudinaryVideos',
      graphicCount: 'cloudinaryGraphics',
    },
    prepare({ title, slug, videoCount, graphicCount }) {
      const videos = videoCount?.length || 0
      const graphics = graphicCount?.length || 0
      return {
        title: title || 'Untitled Gallery',
        subtitle: `${slug || 'no-slug'} | ${videos} videos, ${graphics} graphics`,
      }
    },
  },
})
