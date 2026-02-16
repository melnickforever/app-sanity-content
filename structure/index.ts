import type {StructureResolver} from 'sanity/structure'
export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.divider().title('cms pages'),
      S.listItem()
        .title('All')
        .schemaType('page')
        .child(S.documentList().title('All CMS Pages').filter('_type == "page"')),
      S.listItem()
        .title('Active')
        .schemaType('page')
        .child(S.documentList().title('Active CMS Pages').filter('status == true')),
      S.listItem()
        .title('Inactive')
        .schemaType('page')
        .child(S.documentList().title('Inactive CMS Pages').filter('status == false')),
      S.divider().title('Portfolio'),
      S.documentTypeListItem('skill').title('Skills'),
    ])