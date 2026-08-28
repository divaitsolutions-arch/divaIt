import { defineType, defineField } from 'sanity';

/* ============================================================
   Team Member Schema
   Shared team members used by both Academy and Agency sections
============================================================ */

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'bio', title: 'Short Bio', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({ name: 'image', title: 'Profile Image URL', type: 'url', validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', validation: (r) => r.required().min(0), initialValue: 0 }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
      ],
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
});
