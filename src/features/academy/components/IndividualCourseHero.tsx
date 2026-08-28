'use client';

import Link from 'next/link';
import {
    ChevronLeft,
    Clock,
    CalendarDays,
    Signal,
    FileText,
} from 'lucide-react';

import { Course } from '@/features/academy/types/models';
import { resolveTechColor, resolveTechIcon } from '@/features/academy/lib/tech-icons';
import { typography } from '@/features/academy/styles/typography';

interface CourseHeroProps {
    course: Course;
}

export default function IndividualCourseHero({ course }: CourseHeroProps) {
    const primaryTech = course.techStack[0];
    const PrimaryTechIcon = resolveTechIcon(primaryTech.icon);
    const primaryTechColor =
        resolveTechColor(primaryTech.icon) ?? '#64748b';

    return (
        <section className="relative overflow-hidden border-b border-ink/5 bg-paper pt-28 pb-20 lg:pt-36 lg:pb-24">
            {/* Background */}
            <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                aria-hidden="true"
            >
                <div className="absolute -top-48 right-0 h-[520px] w-[520px] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute inset-0 mesh-grid opacity-15" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
                {/* Back */}
                <Link
                    href="/academy/courses/individual"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-steel transition-colors hover:text-primary"
                >
                    <ChevronLeft
                        size={16}
                        className="transition-transform duration-200 group-hover:-translate-x-0.5"
                    />
                    Individual Courses
                </Link>

                {/* Category */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/5 shadow-sm"
                        style={{
                            backgroundColor: `${primaryTechColor}14`,
                        }}
                    >
                        {PrimaryTechIcon && (
                            <PrimaryTechIcon
                                size={22}
                                color={primaryTechColor}
                            />
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span
                            className={`${typography.eyebrow} rounded-full bg-primary/10 px-3 py-1.5`}
                        >
                            {course.difficulty}
                        </span>

                        <span className="text-ink/20">•</span>

                        <span className={typography.meta}>
                            {course.category}
                        </span>
                    </div>
                </div>

                {/* Accent */}
                <div
                    className="mt-8 h-1.5 w-16 rounded-full bg-gradient-to-r from-primary to-secondary"
                    aria-hidden="true"
                />

                {/* Title */}
                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                    <h1
                        className={`${typography.hero} max-w-4xl text-balance`}
                    >
                        {course.title}
                    </h1>
                    <a
                        href="#syllabus"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10 hover:border-primary/30"
                    >
                        <FileText size={14} />
                        View Syllabus
                    </a>
                </div>

                {/* Description */}
                <p
                    className={`${typography.heroDescription} mt-6 max-w-3xl`}
                >
                    {course.heroDesc}
                </p>

                {/* Quick Facts */}
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/5 pt-6">
                    <QuickFact
                        icon={<Clock size={18} />}
                        text={course.duration}
                    />

                    <QuickFact
                        icon={<CalendarDays size={18} />}
                        text={course.commitment}
                    />

                    <QuickFact
                        icon={<Signal size={18} />}
                        text={course.difficulty}
                    />

                    <QuickFact
                        icon={<FileText size={18} />}
                        text="Notes & PDF Included"
                    />
                </div>
            </div>
        </section>
    );
}

interface QuickFactProps {
    icon: React.ReactNode;
    text: string;
}

function QuickFact({ icon, text }: QuickFactProps) {
    return (
        <div className="flex items-center gap-2 text-sm font-medium text-steel">
            <span className="text-primary">{icon}</span>
            <span>{text}</span>
        </div>
    );
}