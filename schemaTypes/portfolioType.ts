import {defineField, defineType} from 'sanity'
import {ProjectsIcon} from '@sanity/icons'
import {seoFields} from './seo/seoConfig'
import {globalVariables} from './config/globalVariables'

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  icon: ProjectsIcon,
  groups: [
    {name: 'details', title: 'Project Details'},
    {name: 'media', title: 'Media'},
    {name: 'seo', title: 'Search Engine Optimization'},
  ],
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: false,
      description:
        'Toggle to enable or disable the project. Disabled projects will not be visible on the website.',
      group: 'details',
    }),
    defineField({
      name: 'sortOrder',
      type: 'number',
      description:
        'The sort order for the project. Projects will be displayed in ascending order based on this value.',
      options: {
        list: Array.from({length: globalVariables.PORTFOLIO_ITEM_MAX_WEIGHT}, (_, i) => i + 1),
      },
      initialValue: globalVariables.PORTFOLIO_ITEM_DEFAULT_WEIGHT,
      validation: (rule) =>
        rule.required().info('This field is required and will be used as the skill title'),
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'The title of the portfolio item.',
      validation: (rule) =>
        rule.required().info('This field is required and will be used as the skill title'),
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
      name: 'projectUrl',
      type: 'url',
      description:
        'The URL of the project. This should link to the live project or its repository.',
      validation: (rule) =>
        rule
          .warning()
          .uri({scheme: ['http', 'https']})
          .info('A valid URL is required for the project'),
    }),
    defineField({
      name: 'description',
      type: 'array',
      description:
        'A short description of the project. Use this field to add text, images, and other media.',
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
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      description: 'The skills used in this project.',
      group: 'details',
      of: [{type: 'reference', to: {type: 'skill'}}],
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      group: 'media',
      description:
        'The main image for the portfolio item. This will be displayed prominently on the site.',
    }),
    defineField({
      name: 'Images',
      type: 'array',
      group: 'media',
      description:
        'Additional images for the portfolio item. These can be used in the description or gallery.',
      of: [{type: 'image'}],
    }),
    ...seoFields,
  ],
})
