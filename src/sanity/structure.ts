import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('DivaIT Content')
    .items([
      // ── Academy Section ──
      S.listItem()
        .title('Academy')
        .child(
          S.list()
            .title('Academy')
            .items([
              S.documentTypeListItem('discipline').title('Career Paths (Disciplines)'),
              S.documentTypeListItem('track').title('Tracks'),
              S.documentTypeListItem('individualCourse').title('Individual Courses'),
              S.documentTypeListItem('package').title('Packages & Pricing'),
            ])
        ),

      S.divider(),

      // ── Agency Section ──
      S.listItem()
        .title('Agency')
        .child(
          S.list()
            .title('Agency')
            .items([
              S.documentTypeListItem('agencyService').title('Services'),
              S.documentTypeListItem('agencyPortfolio').title('Portfolio Case Studies'),
              S.documentTypeListItem('agencyPackageGroup').title('Promotional Packages'),
            ])
        ),

      S.divider(),

      // ── Blog ──
      S.documentTypeListItem('blogPost').title('Blog Posts'),

      S.divider(),

      // ── Company ──
      S.listItem()
        .title('Global Shared Content')
        .child(
          S.list()
            .title('Global Content')
            .items([
              S.documentTypeListItem('teamMember').title('Team Members'),
              S.documentTypeListItem('legalPage').title('Legal Pages'),
              S.documentTypeListItem('faq').title('FAQs'),
            ])
        ),
    ])
