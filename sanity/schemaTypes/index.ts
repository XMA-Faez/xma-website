import { type SchemaTypeDefinition } from 'sanity'
import blogPost from './blogPost'
import gallery from './gallery'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost, gallery],
}
