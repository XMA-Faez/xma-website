import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'showcaseWebsite',
  title: 'Showcase Website',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'showcaseWebsite' }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      description: 'Screenshot or preview image of the website (recommended: 1200x800)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileThumbnail',
      title: 'Mobile Thumbnail',
      description: 'Mobile screenshot of the website (recommended: 390x844)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'externalUrl',
      title: 'Website URL',
      type: 'url',
      description: 'Link to the live website',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Show this project in the homepage showcase',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'externalUrl',
      featured: 'featured',
    },
    prepare({ title, url, featured }) {
      return {
        title: title || 'Untitled Project',
        subtitle: `${featured ? '[Featured] ' : ''}${url || 'No URL'}`,
      }
    },
  },
})
