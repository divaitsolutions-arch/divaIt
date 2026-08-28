import GlobalCTA from '@/shared/components/GlobalCTA';
import { agencyCtaContent, agencyServicesContent, agencyPortfolioContent } from '@/features/agency/config/agency.content';
import AgencyHero from '@/features/agency/components/hero/AgencyHero';
import AgencyServices from '@/features/agency/components/AgencyServices';
import AgencyPortfolio from '@/features/agency/components/AgencyPortfolio';
import AgencyProcess from '@/features/agency/components/AgencyProcess';
import AgencyTeam from '@/features/agency/components/AgencyTeam';
import AgencyTestimonials from '@/features/agency/components/AgencyTestimonials';
import AgencyPackagesBanner from '@/features/agency/components/AgencyPackagesBanner';
import { generateAgencyLocalBusinessSchema } from '@/shared/lib/seo';
import { getAllAgencyServices, getAllAgencyCaseStudies, getAllTeamMembers } from '@/shared/services/cms';

export default async function AgencyHome() {
  const cta = agencyCtaContent;
  const schema = generateAgencyLocalBusinessSchema();
  const servicesData = await getAllAgencyServices();
  const portfolioData = await getAllAgencyCaseStudies();
  const teamMembers = await getAllTeamMembers();

  return (
    <div className="min-h-[100dvh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AgencyHero />
      <AgencyPackagesBanner />

      <AgencyServices services={servicesData} content={agencyServicesContent} />

      <AgencyPortfolio projects={portfolioData} content={agencyPortfolioContent} />
      <AgencyProcess />
      <AgencyTeam members={teamMembers} />
      <AgencyTestimonials />

      <GlobalCTA
        id="contact"
        headline={
          <>
            {cta.headline}{' '}
            <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              {cta.headlineAccent}
            </span>
          </>
        }
        description={cta.description}
        primaryButtonText={cta.primaryCta.label}
        primaryButtonLink={cta.primaryCta.href}
        secondaryButtonText={cta.secondaryCta.label}
        secondaryButtonLink={cta.secondaryCta.href}
        trustItems={[...cta.trustItems]}
      />
    </div>
  );
}