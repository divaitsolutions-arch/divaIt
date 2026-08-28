import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { Course } from '@/features/academy/types/models';
import { resolveTechIcon, resolveTechColor } from '@/features/academy/lib/tech-icons';
import { formatPrice } from '@/features/academy/enrollment/utils';

interface CourseCardProps {
    course: Course;
    /** Show the category pill in the footer (only relevant on the "All" tab). */
    showCategoryTag?: boolean;
}

export function CourseCard({ course, showCategoryTag = false }: CourseCardProps) {
    const techIcons = course.techStack.map((t) => ({
        Icon: resolveTechIcon(t.icon),
        color: resolveTechColor(t.icon) ?? course.accent,
        name: t.name,
    }));

    const isTrending = course.badge?.toLowerCase() === 'trending';
    const hasDiscount = Boolean(course.tuition.originalAmount);

    return (
        <Link
            href={`/academy/courses/individual/${course.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-ink/10 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
        >
            {/* Accent bar — gradient for trending, subtle for others */}
            <div
                className={`h-1 w-full ${
                    isTrending
                        ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500'
                        : course.popular
                          ? 'bg-gradient-to-r from-primary to-secondary'
                          : 'bg-ink/[0.04]'
                }`}
                aria-hidden="true"
            />

            <div className="relative flex flex-1 flex-col bg-paper p-6 pt-5">
                {/* Hover overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 bg-paper/30 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-surface-inverse px-6 py-2.5 text-sm font-bold text-paper shadow-lg scale-95 group-hover:scale-100 transition-transform duration-300">
                        View Details
                    </span>
                </div>

                {/* Top row: tech icons + single badge */}
                <div className="relative flex items-start justify-between">
                    <div className="flex items-center -space-x-1.5">
                        {techIcons.slice(0, 3).map(({ Icon, color, name }, i) => (
                            <div
                                key={name}
                                className="flex shrink-0 items-center justify-center rounded-full bg-paper p-1 shadow-[0_0_0_2px_#ffffff]"
                                style={{ zIndex: 3 - i }}
                            >
                                {Icon && <Icon size={24} color={color} aria-hidden="true" className="opacity-90 transition-opacity group-hover:opacity-100" />}
                            </div>
                        ))}
                    </div>

                    {/* Single merged badge — Trending takes priority over Popular */}
                    {isTrending ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                            <span className="text-sm animate-emoji-glow">🔥</span>
                            Trending
                        </span>
                    ) : course.badge ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                            {course.badge}
                        </span>
                    ) : course.popular ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                            Popular
                        </span>
                    ) : null}
                </div>

                {/* Title */}
                <h3 className="relative mt-5 font-display text-lg font-bold text-ink leading-snug">{course.title}</h3>
                <p className="relative mt-2 flex-1 text-sm font-medium leading-relaxed text-steel line-clamp-2">{course.heroDesc}</p>

                {/* Category + Duration */}
                <div className="relative flex items-center gap-2.5 mt-4">
                    {showCategoryTag && (
                        <span
                            className="rounded-full border border-ink/10 px-3 py-0.5 text-[13px] font-semibold text-steel"
                        >
                            {course.category}
                        </span>
                    )}
                    <span className="ml-auto flex items-center gap-1.5 text-[13px] font-semibold text-steel">
                      <Clock size={14} className="text-ink/40" />
                      {course.duration}
                    </span>
                </div>

                {/* Price row */}
                <div className="relative mt-4 flex items-baseline gap-2 border-t border-ink/[0.06] pt-4">
                    {course.tuition.offlineAmount && (
                        <span className="text-[13px] font-semibold uppercase tracking-wider text-steel/70">From</span>
                    )}
                    <span className="font-display text-base font-extrabold tracking-tight text-ink">
                        {formatPrice(course.tuition.amount)}
                    </span>
                    {hasDiscount && (
                        <span className="text-[13px] font-semibold text-red-400/80 line-through decoration-red-400/40">
                            {formatPrice(course.tuition.originalAmount!)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
