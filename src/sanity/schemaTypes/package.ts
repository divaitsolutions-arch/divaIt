import { defineType, defineField } from 'sanity';

/* ============================================================
   Package Schema
   Academy pricing packages (Starter, Professional, etc.)
============================================================ */

export const packageType = defineType({
  name: 'package',
  title: 'Package',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug / ID', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'priceValue', title: 'Online Price (NPR)', type: 'number', validation: (r) => r.required().min(0) }),
    defineField({ name: 'offlinePriceValue', title: 'Offline/Physical Price (NPR)', description: 'Optional alternative price for physical classes', type: 'number', validation: (r) => r.min(0) }),
    defineField({ name: 'regularPriceValue', title: 'Regular Price (NPR)', description: 'Original price before discount (optional)', type: 'number', validation: (r) => r.min(0) }),
    defineField({ name: 'period', title: 'Period', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'duration', title: 'Duration', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'level', title: 'Level', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'badge', title: 'Badge', type: 'string', description: 'Optional text badge (e.g. Trending, Best Value)' }),
    defineField({ name: 'icon', title: 'Icon Slug', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'popular', title: 'Popular?', type: 'boolean', initialValue: false }),
    defineField({ name: 'accent', title: 'Accent Color (Hex)', type: 'string', validation: (r) => r.required().regex(/^#([0-9a-fA-F]{3}){1,2}$/, 'Must be a valid hex color') }),
    defineField({ name: 'description', title: 'Description', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }], validation: (r) => r.required().min(1) }),
    defineField({ name: 'support', title: 'Support Text', type: 'string', description: 'e.g. Lifetime Community Access' }),
    defineField({ name: 'supportIcon', title: 'Support Icon Name', type: 'string', description: 'Lucide icon name (e.g. Users, Headphones)' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'duration' },
  },
});
