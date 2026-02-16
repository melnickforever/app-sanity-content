import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'The title of the skill.',
      validation: (rule) =>
        rule.required().info('This field is required and will be used as the skill title'),
    }),
  ],
})
