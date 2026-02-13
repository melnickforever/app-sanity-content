import {defineField, defineType, ValidationContext} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {seoFields} from './seo/seoConfig'
import {globalVariables} from './config/globalVariables'

export const pageType = defineType({
  name: 'page',
  title: 'CMS Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'details', title: 'Page Details'},
    {name: 'seo', title: 'Search Engine Optimization'},
  ],
  fields: [
    defineField({
      name: 'pageId',
      title: 'Page ID',
      type: 'string',
      description: 'Unique ID for the page. This is used for fetching content on the frontend.',
      group: 'details',
      validation: (Rule) =>
        Rule.required().custom(async (pageId: string | undefined, context: ValidationContext) => {
          if (!pageId) {
            return true
          }
          const {document, getClient} = context
          const client = getClient({apiVersion: globalVariables.SANITY_API_VERSION})
          const id = document?._id.replace('drafts.', '')
          const params = {
            draft: `drafts.${id}`,
            published: id,
            pageId,
          }
          const query = `!defined(*[_type == "page" && !(_id in [$draft, $published]) && pageId == $pageId][0])`
          const isUnique: boolean = await client.fetch(query, params)
          return isUnique ? true : 'Page ID must be unique'
        }),
    }),
    defineField({
      name: 'status',
      title: 'Enabled',
      type: 'boolean',
      description:
        'Toggle to enable or disable the page. Disabled pages will not be visible on the website.',
      group: 'details',
    }),
    defineField({
      name: 'title',
      type: 'string',
      description:
        'The title of the page. This will be used as the main heading and in the URL slug.',
      group: 'details',
      validation: (rule) =>
        rule.required().info('This field is required and will be used as the page title'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description:
        'The URL slug for the page. This will be generated from the title but can be customized if needed.',
      group: 'details',
      options: {source: 'title'},
      validation: (Rule) => Rule.required().error('A slug is required for each page'),
      hidden: ({document}) => !document?.title,
      readOnly: ({value, currentUser}) => {
        // Anyone can set the initial slug
        if (!value) {
          return false
        }
        const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')
        // Only admins can change the slug
        return !isAdmin
      },
    }),

    defineField({
      name: 'content',
      type: 'array',
      description:
        'The main content of the page. Use this field to add text, images, and other media.',
      group: 'details',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        },
      ],
    }),
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'title',
      pageId: 'pageId',
    },
    prepare({title, pageId}) {
      const formatedTitle = title
        ? title.substring(0, 10) + (title.length > 10 ? '...' : '')
        : 'No title'
      return {
        title: `[${pageId}] ${formatedTitle}`,
        pageId: pageId,
      }
    },
  },
})
