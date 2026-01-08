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
        .title('Portfolio Gallery')
        .schemaType('gallery')
        .child(
          S.document()
            .schemaType('gallery')
            .documentId('gallery')
            .title('Portfolio Gallery')
        ),
    ])
