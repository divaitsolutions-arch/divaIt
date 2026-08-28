'use client';

import { Caveat } from 'next/font/google';
import { Button, type Variant as ButtonVariant } from '@/shared/components/ui/Button';

const caveat = Caveat({ subsets: ['latin'], weight: ['600', '700'] });

interface BannerCTAProps {
    href: string;
    text: string;
    variant: ButtonVariant;
    size?: React.ComponentProps<typeof Button>['size'];
    className?: string;
    /**
     * Optional hand-written annotation shown beside the button on sm+ screens
     * (e.g. ["Find the right", "package for you"]). Each array entry is one
     * line. Omit for a plain button-only CTA row.
     */
    note?: string[];
    /**
     * Tailwind gap class for the row. Default 'gap-4' matches
     * PromotionalPackagesBanner's original spacing; PackagesBanner passes
     * 'gap-5' to match its original spacing exactly.
     */
    gap?: string;
}

/** CTA button row shared by the promotional banners, with an optional hand-drawn note + arrow. */
export function BannerCTA({ href, text, variant, size, className, note, gap = 'gap-4' }: BannerCTAProps) {
    return (
        <div className={`flex flex-wrap items-center ${gap}`}>
            <Button href={href} variant={variant} size={size} className={className}>
                {text}
            </Button>

            {note && note.length > 0 && (
                <div className="hidden items-start gap-2 sm:flex">
                    <svg
                        width="34"
                        height="24"
                        viewBox="0 0 34 24"
                        fill="none"
                        className="mt-2 shrink-0 text-primary/70"
                        aria-hidden="true"
                    >
                        <path d="M32 4C24 2 10 4 4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M4 14L2 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M4 14L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className={`${caveat.className} -mt-1 rotate-[-3deg] text-xl leading-snug text-ink/70`}>
                        {note.map((line, i) => (
                            <span key={i}>
                                {line}
                                {i < note.length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                </div>
            )}
        </div>
    );
}