import { defineField, defineType } from 'sanity';

export const agencyPackageGroupType = defineType({
  name: 'agencyPackageGroup',
  title: 'Agency Package Group',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Legacy ID',
      type: 'string',
      description: 'Legacy identifier for this package group',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'ID / Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'bestForLabel',
      title: 'Best For Label',
      type: 'string',
    }),
    defineField({
      name: 'whatItIs',
      title: 'What it is',
      type: 'text',
    }),
    defineField({
      name: 'whyItMatters',
      title: 'Why it matters',
      type: 'text',
    }),
    defineField({
      name: 'process',
      title: 'Process Steps',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'bestForList',
      title: 'Best For List Items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'customFeaturesLabel',
      title: 'Custom Features Label',
      type: 'string',
      description: 'Use if this group represents a custom solution instead of tiered packages.',
    }),
    defineField({
      name: 'customFeatures',
      title: 'Custom Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'packages',
      title: 'Package Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'ID', type: 'string' },
            { name: 'name', title: 'Tier Name', type: 'string' },
            { name: 'popular', title: 'Is Popular?', type: 'boolean' },
            { name: 'accent', title: 'Accent Color Hex', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    }),
  ],
});
