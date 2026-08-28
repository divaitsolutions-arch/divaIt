import { type SchemaTypeDefinition } from 'sanity'

import { individualCourseType } from './individualCourse'
import { disciplineType } from './discipline'
import { blogPostType } from './blogPost'
import { packageType } from './package'
import { agencyPortfolioType } from './agencyPortfolio'
import { agencyServiceType } from './agencyService'
import { agencyPackageGroupType } from './agencyPackageGroup'
import { teamMemberType } from './teamMember'
import { legalPageType } from './legalPage'
import { faqType } from './faq'

import { trackType } from './track'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    faqType,
    individualCourseType, 
    disciplineType, 
    blogPostType, 
    packageType, 
    agencyPortfolioType, 
    agencyServiceType, 
    agencyPackageGroupType,
    teamMemberType,
    legalPageType,
    trackType,
  ],
}

