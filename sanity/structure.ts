import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structure: StructureResolver = (S, context) =>
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
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'showcaseWebsite',
        title: 'Showcase Websites',
        S,
        context,
      }),
    ])
