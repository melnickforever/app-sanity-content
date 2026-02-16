import {defineField} from 'sanity'

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO Title',
    type: 'string',
    group: 'seo',
    description: 'This title is used for search engine results. If left empty, the page title will be used.',
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO Description',
    type: 'text',
    group: 'seo',
    description: 'This description is used for search engine results. It should be a concise summary of the page content.',
  }),
  defineField({
    name: 'seoImage',
    title: 'SEO Image',
    type: 'image',
    group: 'seo',
    description: 'This image is used for social media sharing and search engine results.',
  }),
]

