'use client';

import { type LucideIcon } from 'lucide-react';
import { useScrollReveal } from '@/shared/animations/useScrollReveal';
import { usePanelParallax } from '@/shared/animations/usePanelParallax';
import { Container } from '@/shared/components/layout/Container';
import { OrbitField, type OrbitIconPlacement } from '@/shared/components/OrbitField';
import { OrbitPaths } from '@/shared/components/banner/OrbitPaths';
import { OrbitDots, type OrbitDotPlacement } from '@/shared/components/banner/OrbitDots';
import { PulseBadge } from '@/shared/components/banner/PulseBadge';
import { IconEyebrow } from '@/shared/components/banner/IconEyebrow';
import { BannerCTA } from '@/shared/components/banner/BannerCTA';

export interface DescriptionPart {
    text: string;
    color?: string;
}

interface PulseBadgeConfig {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    top: string;
    right: string;
}

export interface PackagesBannerProps {
    eyebrowLabel: string;
    eyebrowIcon?: LucideIcon;
    trendingLabel?: string;
    headline: React.ReactNode;
    description: DescriptionPart[];
    ctaHref: string;
    ctaText: string;
    ctaNote?: [string, string];
    icons: OrbitIconPlacement[];
    orbitDots?: OrbitDotPlacement[];
    pulseBadge?: PulseBadgeConfig;
}

export default function PackagesBanner({
    eyebrowLabel,
    eyebrowIcon,
    trendingLabel,
    headline,
    description,
    ctaHref,
    ctaText,
    ctaNote,
    icons,
    orbitDots,
    pulseBadge,
}: PackagesBannerProps) {
    const contentRef = useScrollReveal<HTMLDivElement>('children', {
        yOffset: 24,
        duration: 0.8,
        stagger: 0.1,
    });

    const { panelRef, mouseX, mouseY, handleMove, handleLeave } = usePanelParallax({ smooth: true });

    const showOrbitDecoration = !!orbitDots && orbitDots.length > 0;

    return (
        <Container as="section" className=" py-12">
            <div
                ref={panelRef}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                className="group relative overflow-hidden rounded-[2rem] border border-ink/10 bg-gradient-to-r from-panel via-panel to-primary/[0.14] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] transition-shadow duration-300 hover:shadow-[0_24px_70px_-20px_rgba(0,0,0,0.2)]"
            >
                {showOrbitDecoration && <OrbitPaths />}
                {showOrbitDecoration && <OrbitDots dots={orbitDots!} />}

                {/* Floating brand icons + special-offer centerpiece — raised to xl so
                    icons don't collide with the text column on mid-width screens */}
                <div className="pointer-events-none absolute inset-0 hidden xl:block" aria-hidden="true">
                    {pulseBadge && (
                        <PulseBadge
                            icon={pulseBadge.icon}
                            title={pulseBadge.title}
                            subtitle={pulseBadge.subtitle}
                            top={pulseBadge.top}
                            right={pulseBadge.right}
                        />
                    )}
                    <OrbitField icons={icons} mouseX={mouseX} mouseY={mouseY} className="absolute inset-0" />
                </div>

                <div className="relative z-10 flex flex-col gap-10 p-8 sm:p-12 lg:min-h-[360px] lg:justify-center lg:py-12">
                    <div ref={contentRef} className="max-w-xl text-left">
                        <IconEyebrow icon={eyebrowIcon} label={eyebrowLabel} trendingLabel={trendingLabel} />

                        <h2 className="section-heading leading-[1.08] antialiased">
                            {headline}
                        </h2>

                        <p className="mt-5 max-w-lg text-base leading-relaxed text-steel antialiased sm:text-lg">
                            {description.map((part, i) =>
                                part.color ? (
                                    <span key={i} className="font-semibold" style={{ color: part.color }}>
                                        {part.text}
                                    </span>
                                ) : (
                                    <span key={i}>{part.text}</span>
                                )
                            )}
                        </p>

                        <div className="mt-9">
                            <BannerCTA
                                href={ctaHref}
                                text={ctaText}
                                variant="dark"
                                size="lg"
                                className="relative z-20 rounded-full"
                                note={ctaNote}
                                gap="gap-5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}