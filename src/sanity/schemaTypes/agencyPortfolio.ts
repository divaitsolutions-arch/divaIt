import { defineField, defineType } from 'sanity';

export const agencyPortfolioType = defineType({
  name: 'agencyPortfolio',
  title: 'Agency Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Project Type',
      type: 'string',
      description: 'e.g., Website Redesign, Booking platform + SEO',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
    }),
    defineField({
      name: 'result',
      title: 'Headline Result',
      type: 'string',
      description: 'e.g., +140% organic traffic in 6 months',
    }),
    defineField({
      name: 'heroDesc',
      title: 'Hero Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
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
      description: 'e.g., from-blue-500 to-cyan-500',
    }),
    defineField({
      name: 'initial',
      title: 'Initials',
      type: 'string',
      description: '2 letter initials for logo placeholder',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
    }),
    defineField({
      name: 'results',
      title: 'Detailed Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', title: 'Metric', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
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
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        { name: 'quote', title: 'Quote', type: 'text' },
        { name: 'name', title: 'Author Name', type: 'string' },
        { name: 'role', title: 'Author Role', type: 'string' },
      ],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
    }),
    defineField({
      name: 'liveLink',
      title: 'Live Link',
      type: 'url',
    }),
  ],
});
