import type {StructureResolver} from 'sanity/structure'
export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.divider().title('cms pages'),
      S.listItem()
        .title('All Pages')
        .schemaType('page')
        .child(S.documentList().title('All CMS Pages').filter('_type == "page"')),
      S.listItem()
        .title('Active Pages')
        .schemaType('page')
        .child(S.documentList().title('CMS Pages').filter('_type == "page" && enabled == true')),
      S.listItem()
        .title('Inactive Pages')
        .schemaType('page')
        .child(S.documentList().title('CMS Pages').filter('_type == "page" && enabled == false')),
      S.divider().title('Portfolio'),
      S.listItem()
        .title('All Projects')
        .schemaType('portfolio')
        .child(
          S.documentList()
            .title('All CMS Pages')
            .filter('_type == "portfolio"')
            .defaultOrdering([{field: 'sortOrder', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Projects Enabled')
        .schemaType('portfolio')
        .child(
          S.documentList().title('Projects')
            .filter(' _type == "portfolio" && enabled == true')
            .defaultOrdering([{field: 'sortOrder', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Projects Disabled')
        .schemaType('portfolio')
        .child(
          S.documentList()
            .title('Projects')
            .filter(' _type == "portfolio" && enabled == false')
            .defaultOrdering([{field: 'sortOrder', direction: 'asc'}]),
        ),
      S.documentTypeListItem('skill').title('Skills'),
    ])