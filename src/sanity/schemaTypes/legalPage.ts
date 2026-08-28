import { defineType, defineField } from 'sanity';

/* ============================================================
   Legal Page Schema
   Privacy Policy, Terms of Service, etc.
============================================================ */

export const legalPageType = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'updated', title: 'Last Updated Date', type: 'string', description: 'e.g. "July 12, 2026"', validation: (r) => r.required() }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'legalSection',
          title: 'Section',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 5, validation: (r) => r.required() }),
          ],
          preview: {
            select: { title: 'heading' },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'updated' },
  },
});
