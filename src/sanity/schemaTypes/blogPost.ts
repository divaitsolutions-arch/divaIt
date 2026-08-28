import { defineType, defineField } from 'sanity';

/* ============================================================
   Blog Post Schema
============================================================ */

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', validation: (r) => r.required() }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'author', title: 'Author', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'readTime', title: 'Read Time', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], validation: (r) => r.required() }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'metaTitle', title: 'Meta Title (SEO)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'metaDescription', title: 'Meta Description (SEO)', type: 'text', validation: (r) => r.required() }),
    defineField({
      name: 'socials',
      title: 'Author Socials',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'author', media: 'coverImage' },
  },
});
