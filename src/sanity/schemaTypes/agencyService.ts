import { defineField, defineType } from 'sanity';

export const agencyServiceType = defineType({
  name: 'agencyService',
  title: 'Agency Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroDesc',
      title: 'Hero Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Lucide Icon Name',
      type: 'string',
      description: 'e.g., Code2, Sparkles, Megaphone',
    }),
    defineField({
      name: 'accent',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex code, e.g., #3B82F6',
    }),
    defineField({
      name: 'gradient',
      title: 'Gradient Tailwind Classes',
      type: 'string',
      description: 'e.g., from-blue-500 to-blue-700',
    }),
    defineField({
      name: 'shadow',
      title: 'Box Shadow Color',
      type: 'string',
      description: 'RGBA string, e.g., rgba(59,130,246,0.35)',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Feature Description', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'process',
      title: 'Our Process',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
        },
      ],
    }),
  ],
});
