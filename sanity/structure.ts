import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog Posts')
        .schemaType('blogPost')
        .child(S.documentTypeList('blogPost').title('Blog Posts')),
      S.divider(),
      S.listItem()
        .title('Galleries')
        .schemaType('gallery')
        .child(
          S.documentTypeList('gallery')
            .title('Galleries')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
    ])
