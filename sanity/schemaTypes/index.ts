import { type SchemaTypeDefinition } from 'sanity'
import blogPost from './blogPost'
import gallery from './gallery'
import showcaseWebsite from './showcaseWebsite'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost, gallery, showcaseWebsite],
}
