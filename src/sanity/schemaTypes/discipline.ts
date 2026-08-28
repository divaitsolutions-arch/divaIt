import { defineType, defineField } from 'sanity';

/* ============================================================
   Discipline Schema
   A discipline groups related career-path Tracks together.
   e.g. "Web Development" contains [Full-Stack, Frontend, Backend] tracks.
============================================================ */

export const disciplineType = defineType({
  name: 'discipline',
  title: 'Discipline (Career Path)',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity' },
    { name: 'visual', title: 'Visual' },
    { name: 'content', title: 'Content' },
    { name: 'tracks', title: 'Tracks' },
  ],
  fields: [
    /* ── Identity ── */
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'identity', validation: (r: any) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'identity', options: { source: 'title' }, validation: (r: any) => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', group: 'identity', validation: (r: any) => r.required() }),
    defineField({ name: 'heroDesc', title: 'Hero Description', type: 'text', group: 'identity', validation: (r: any) => r.required().min(10) }),
    defineField({ name: 'icon', title: 'Icon Slug', type: 'string', group: 'identity', validation: (r: any) => r.required() }),

    /* ── Visual ── */
    defineField({ name: 'accent', title: 'Accent Color (Hex)', type: 'string', group: 'visual', validation: (r: any) => r.required().regex(/^#([0-9a-fA-F]{3}){1,2}$/, 'Must be a valid hex color') }),
    defineField({ name: 'gradient', title: 'Gradient CSS', type: 'string', group: 'visual', validation: (r: any) => r.required() }),

    /* ── Shared Content ── */
    defineField({ name: 'sharedHighlights', title: 'Shared Highlights', type: 'array', of: [{ type: 'string' }], group: 'content', validation: (r: any) => r.required().min(1) }),
    defineField({
      name: 'whoIsThisFor',
      title: 'Who Is This For (Personas)',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'persona', title: 'Persona', type: 'string', validation: (r: any) => r.required() }),
          defineField({ name: 'icon', title: 'Icon', type: 'string', validation: (r: any) => r.required() }),
          defineField({ name: 'recommendedTrack', title: 'Recommended Track', type: 'string', validation: (r: any) => r.required() }),
          defineField({ name: 'reason', title: 'Reason', type: 'string', validation: (r: any) => r.required() }),
        ],
      }],
    }),

    /* ── Tracks (References) ── */
    defineField({
      name: 'tracks',
      title: 'Tracks',
      type: 'array',
      group: 'tracks',
      of: [{ type: 'reference', to: [{ type: 'track' }] }],
      validation: (r: any) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
});
