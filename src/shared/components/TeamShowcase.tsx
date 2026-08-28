import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import { Container } from '@/shared/components/layout/Container';
import { Carousel } from '@/shared/components/ui/Carousel';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface TeamShowcaseProps {
  id?: string;
  badge: string;
  headline: React.ReactNode;
  description?: string;
  members: TeamMember[];
}

export function TeamShowcase({ id = 'team', badge, headline, description, members }: TeamShowcaseProps) {
  // Theme colors - using semantic variables
  const accentColor = 'text-secondary';
  const dotColorClass = 'bg-secondary';


  return (
 <section id={id} className="relative w-full py-20 text-ink lg:py-32 overflow-hidden">
      <Container className="relative z-10">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <span className={`mb-6 inline-block text-[13px] font-semibold uppercase tracking-[0.2em] ${accentColor}`}>
            {badge}
          </span>
          <h2 className="section-heading mb-6">{headline}</h2>
          {description && (
            <p className="text-steel text-base md:text-lg leading-relaxed">{description}</p>
          )}
        </div>

        <div className="@container w-full">
          <Carousel
            items={members}
            keyExtractor={(member) => member.id}
            accentColorClass={dotColorClass}
            continuous={true}
            bleed={false}
            gap="gap-16"
            renderItem={(member) => (
              <div className="group relative overflow-hidden rounded-2xl w-[85cqw] sm:w-[calc(50cqw-32px)] lg:w-[calc(33.333cqw-43px)] aspect-[4/5] shadow-lg shrink-0 cursor-pointer">
                {/* Background Image */}
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 320px, 380px"
                />
                
                {/* Default Bottom Gradient (Fades out on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
                
                {/* Hover Full Overlay (Fades in on hover) - Kept clear at the top to preserve face visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                  
                  {/* Name and Designation */}
                  <div className="transform transition-transform duration-500">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                      {member.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {member.role.split(/[,&]+/).map((roleStr) => {
                        const r = roleStr.trim();
                        if (!r) return null;
                        return (
                          <span key={r} className={`px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[13px] font-bold uppercase tracking-wider shadow-sm`}>
                            {r}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hover Content (Bio + Socials) sliding up from bottom */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <div className="min-h-0 overflow-hidden">
                      <div className="pt-6">
                        <p className="text-white/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-6">
                          {member.bio}
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          {member.socials?.linkedin && (
                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:scale-110 transition-all" aria-label={`${member.name}'s LinkedIn`}>
                              <FaLinkedin size={22} />
                            </a>
                          )}
                          {member.socials?.twitter && (
                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:scale-110 transition-all" aria-label={`${member.name}'s Twitter`}>
                              <FaTwitter size={22} />
                            </a>
                          )}
                          {member.socials?.facebook && (
                            <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:scale-110 transition-all" aria-label={`${member.name}'s Facebook`}>
                              <FaFacebook size={22} />
                            </a>
                          )}
                          {member.socials?.instagram && (
                            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:scale-110 transition-all" aria-label={`${member.name}'s Instagram`}>
                              <FaInstagram size={22} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </Container>
    </section>
  );
}
