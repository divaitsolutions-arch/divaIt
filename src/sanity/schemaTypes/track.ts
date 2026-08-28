import { defineType, defineField } from 'sanity';

export const trackType = defineType({
  name: 'track',
  title: 'Track',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r: any) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r: any) => r.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', validation: (r: any) => r.required() }),
    defineField({ name: 'heroDesc', title: 'Hero Description', type: 'text', validation: (r: any) => r.required().min(10) }),
    defineField({ name: 'popular', title: 'Popular?', type: 'boolean', initialValue: false }),
    defineField({ name: 'upcoming', title: 'Upcoming?', type: 'boolean', initialValue: false }),
    
    // We add a reference back to the Discipline so it's easy to see which discipline this belongs to in the Studio
    defineField({
      name: 'disciplineRef',
      title: 'Parent Discipline',
      type: 'reference',
      to: [{ type: 'discipline' }],
      description: 'The discipline this track belongs to (e.g. Web Development)',
    }),

    /* ── Levels ── */
    defineField({
      name: 'levels',
      title: 'Levels',
      type: 'array',
      of: [{
        type: 'object',
        name: 'trackLevel',
        title: 'Track Level',
        fields: [
          defineField({ name: 'id', title: 'Level ID', type: 'string', validation: (r: any) => r.required() }),
          defineField({ name: 'name', title: 'Level Name', type: 'string', validation: (r: any) => r.required() }),
          defineField({ name: 'badge', title: 'Badge', type: 'string' }),
          defineField({ name: 'isDefault', title: 'Is Default?', type: 'boolean', initialValue: false }),
          defineField({ name: 'duration', title: 'Duration', type: 'string', validation: (r: any) => r.required() }),
          defineField({ name: 'commitment', title: 'Commitment', type: 'string', validation: (r: any) => r.required() }),
          defineField({ name: 'careerOutcome', title: 'Career Outcome', type: 'string', validation: (r: any) => r.required() }),
          defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Name', type: 'string', validation: (r: any) => r.required() }),
                defineField({ name: 'icon', title: 'Icon Slug', type: 'string', validation: (r: any) => r.required() }),
              ],
            }],
            validation: (r: any) => r.required().min(1),
          }),
          defineField({ name: 'requirements', title: 'Requirements', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'learningOutcomes', title: 'Learning Outcomes', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'projects', title: 'Projects', type: 'array', of: [{ type: 'string' }] }),
          defineField({
            name: 'syllabus',
            title: 'Syllabus',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'week', title: 'Week / Section', type: 'string', validation: (r: any) => r.required() }),
                defineField({ name: 'title', title: 'Module Title', type: 'string', validation: (r: any) => r.required() }),
                defineField({ name: 'topics', title: 'Topics', type: 'array', of: [{ type: 'string' }], validation: (r: any) => r.required().min(1) }),
              ],
            }],
            validation: (r: any) => r.required().min(1),
          }),
          defineField({
            name: 'brochurePdf',
            title: 'Course Brochure (PDF)',
            type: 'file',
            options: { accept: 'application/pdf' },
          }),
          defineField({
            name: 'syllabusPdf',
            title: 'Detailed Syllabus (PDF)',
            type: 'file',
            options: { accept: 'application/pdf' },
          }),
          defineField({
            name: 'courseNotesPdf',
            title: 'Course Notes (PDF)',
            type: 'file',
            options: { accept: 'application/pdf' },
          }),
          defineField({
            name: 'tuition',
            title: 'Tuition',
            type: 'object',
            fields: [
              defineField({ name: 'amount', title: 'Online Amount (NPR)', type: 'number', validation: (r: any) => r.required().min(0) }),
              defineField({ name: 'offlineAmount', title: 'Offline Amount (NPR)', type: 'number' }),
              defineField({ name: 'originalAmount', title: 'Original Amount (NPR)', type: 'number' }),
              defineField({ name: 'installments', title: 'Installments Label', type: 'string', validation: (r: any) => r.required() }),
              defineField({ name: 'note', title: 'Note', type: 'string', validation: (r: any) => r.required() }),
            ],
          }),
        ],
      }],
      validation: (r: any) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle' },
  },
});
