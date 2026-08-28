"use client";

import GlobalCTA from "@/shared/components/GlobalCTA";
import { useEnrollmentModal } from "@/features/academy/enrollment/contexts/EnrollmentModalContext";
import { academyCtaContent } from "@/features/academy/config/academy.content";

export default function AcademyCTAWrapper() {
  const cta = academyCtaContent;
  const { openModal } = useEnrollmentModal();

  return (
    <GlobalCTA
      id="enroll"
      eyebrowText={cta.eyebrow}
      headline={
        <>
          {cta.headline}{" "}
          <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
            {cta.headlineAccent}
          </span>
        </>
      }
      description={cta.description}
      primaryButtonText={cta.primaryCta.label}
      primaryButtonLink={cta.primaryCta.href}
      onPrimaryClick={openModal}
      secondaryButtonText={cta.secondaryCta.label}
      secondaryButtonLink={cta.secondaryCta.href}
      trustItems={[...cta.trustItems]}
    />
  );
}
