import { defineType, defineField } from 'sanity';

/* ============================================================
   Individual Course Schema
   Short, single-topic courses (HTML, CSS, JS, Python, etc.)
============================================================ */

export const individualCourseType = defineType({
  name: 'individualCourse',
  title: 'Individual Course',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity' },
    { name: 'visual', title: 'Visual' },
    { name: 'taxonomy', title: 'Taxonomy' },
    { name: 'content', title: 'Content' },
    { name: 'pricing', title: 'Pricing' },
    { name: 'meta', title: 'Meta & Navigation' },
  ],
  fields: [
    /* ── Identity ── */
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'identity', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'identity', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', group: 'identity', validation: (r) => r.required() }),
    defineField({ name: 'batch', title: 'Batch', type: 'string', group: 'identity' }),
    defineField({ name: 'heroDesc', title: 'Hero Description', type: 'text', group: 'identity', validation: (r) => r.required().min(10) }),
    defineField({ name: 'badge', title: 'Badge', type: 'string', group: 'identity' }),
    defineField({ name: 'icon', title: 'Icon Slug', type: 'string', group: 'identity', validation: (r) => r.required() }),

    /* ── Visual ── */
    defineField({ name: 'accent', title: 'Accent Color (Hex)', type: 'string', group: 'visual', validation: (r) => r.required().regex(/^#([0-9a-fA-F]{3}){1,2}$/, 'Must be a valid hex color') }),
    defineField({ name: 'gradient', title: 'Gradient CSS', type: 'string', group: 'visual', validation: (r) => r.required() }),

    /* ── Taxonomy ── */
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'taxonomy',
      options: {
        list: [
          'Web Fundamentals',
          'Programming Languages',
          'Frontend',
          'Backend',
          'Database',
          'DevOps & Tools',
          'AI & Automation',
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      group: 'taxonomy',
      options: { list: ['Beginner', 'Intermediate', 'Advanced'] },
      validation: (r) => r.required(),
    }),

    /* ── Quick facts ── */
    defineField({ name: 'duration', title: 'Duration', type: 'string', group: 'content', validation: (r) => r.required() }),
    defineField({ name: 'commitment', title: 'Commitment', type: 'string', group: 'content', validation: (r) => r.required() }),
    defineField({ name: 'format', title: 'Format', type: 'string', group: 'content', validation: (r) => r.required() }),

    /* ── Selling points ── */
    defineField({ name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }], group: 'content', validation: (r) => r.required().min(1) }),
    defineField({ name: 'prerequisites', title: 'Prerequisites', type: 'array', of: [{ type: 'string' }], group: 'content' }),

    /* ── Content ── */
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'icon', title: 'Icon Slug', type: 'string', validation: (r) => r.required() }),
        ],
      }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'syllabus',
      title: 'Syllabus',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'week', title: 'Week / Section', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'title', title: 'Module Title', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'topics', title: 'Topics', type: 'array', of: [{ type: 'string' }], validation: (r) => r.required().min(1) }),
        ],
      }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'brochurePdf',
      title: 'Course Brochure (PDF)',
      type: 'file',
      group: 'content',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'syllabusPdf',
      title: 'Detailed Syllabus (PDF)',
      type: 'file',
      group: 'content',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'courseNotesPdf',
      title: 'Course Notes (PDF)',
      type: 'file',
      group: 'content',
      options: { accept: 'application/pdf' },
    }),
    defineField({ name: 'projects', title: 'Projects', type: 'array', of: [{ type: 'string' }], group: 'content' }),

    /* ── Pricing ── */
    defineField({
      name: 'tuition',
      title: 'Tuition',
      type: 'object',
      group: 'pricing',
      fields: [
        defineField({ name: 'amount', title: 'Online Amount (NPR)', type: 'number', validation: (r) => r.required().min(0) }),
        defineField({ name: 'offlineAmount', title: 'Offline Amount (NPR)', type: 'number' }),
        defineField({ name: 'originalAmount', title: 'Original Amount (NPR)', type: 'number' }),
        defineField({ name: 'installments', title: 'Installments Label', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'note', title: 'Note', type: 'string', validation: (r) => r.required() }),
      ],
    }),

    /* ── Audience & methodology ── */
    defineField({ name: 'targetAudience', title: 'Target Audience', type: 'array', of: [{ type: 'string' }], group: 'meta' }),
    defineField({
      name: 'howItWorks',
      title: 'How It Works',
      type: 'array',
      group: 'meta',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'step', title: 'Step Title', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'desc', title: 'Description', type: 'string', validation: (r) => r.required() }),
        ],
      }],
    }),

    /* ── Navigation helpers ── */
    defineField({ name: 'popular', title: 'Popular?', type: 'boolean', group: 'meta', initialValue: false }),
    defineField({ name: 'relatedCourses', title: 'Related Course Slugs', type: 'array', of: [{ type: 'string' }], group: 'meta' }),
    defineField({
      name: 'upgradePathTrack',
      title: 'Upgrade Path Track',
      type: 'object',
      group: 'meta',
      fields: [
        defineField({ name: 'discipline', title: 'Discipline', type: 'string' }),
        defineField({ name: 'track', title: 'Track', type: 'string' }),
        defineField({ name: 'label', title: 'Label', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
});
