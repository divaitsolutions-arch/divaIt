'use client';

import { mentorsContent } from '@/features/academy/config/academy.content';
import { TeamShowcase } from '@/shared/components/TeamShowcase';
import type { TeamMember as TeamMemberCMS } from '@/shared/types/models';

export default function Mentors({ members }: { members: TeamMemberCMS[] }) {
  const { headline, description } = mentorsContent;

  // Map CMS shape to TeamShowcase shape
  const mapped = members.map((m) => ({
    id: m._id,
    name: m.name,
    role: m.role,
    bio: m.bio,
    image: m.image,
    socials: m.socials,
  }));
  
  return (
    <TeamShowcase
      id="mentors"
      badge="Our Team"
      headline={headline}
      description={description}
      members={mapped}
    />
  );
}