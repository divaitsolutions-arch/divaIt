'use client';

import { useMemo, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Code2 } from 'lucide-react';
import { careerPathsContent } from '@/features/academy/config/academy.content';
import { useScrollReveal } from '@/shared/animations/useScrollReveal';
import { Container } from '@/shared/components/layout/Container';
import { CourseCard } from '@/features/academy/components/CourseCard';
import { StatusBadge } from '@/features/academy/components/StatusBadge';
import { formatPrice } from '@/features/academy/enrollment/utils';
import { resolveIcon } from '@/features/academy/lib/icons';
import { Discipline, Course, TrackLevel } from '@/features/academy/types/models';

/* ─────────────────────────────────────────────────────────────
   Derive category filter tabs dynamically from CMS data.
   Each Sanity discipline has a `category` field (e.g. "Development",
   "Design & Creative"). We extract unique categories and assign
   each a stable accent color from a curated palette.
   ───────────────────────────────────────────────────────────── */
const CATEGORY_ACCENTS = ['#6366F1', '#06B6D4', '#F59E0B', '#ED332C', '#34D399', '#A03BB8'];

function buildCategoryTabs(disciplines: Discipline[]) {
  const seen = new Map<string, number>();
  disciplines.forEach((d) => {
    if (!seen.has(d.category)) {
      seen.set(d.category, seen.size);
    }
  });
  return Array.from(seen.entries()).map(([category, idx]) => ({
    id: category,
    title: category,
    accent: CATEGORY_ACCENTS[idx % CATEGORY_ACCENTS.length],
  }));
}

function IconMark({ Icon, color }: { Icon: ReturnType<typeof resolveIcon>; color: string }) {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-sm"
      style={{ borderColor: `${color}30`, backgroundColor: `${color}08`, color }}
    >
      <Icon size={20} strokeWidth={2} aria-hidden="true" />
    </div>
  );
}

export default function CourseSection({ initialDisciplines = [], initialCourses = [] }: { initialDisciplines?: Discipline[], initialCourses?: Course[] }) {
  const sectionRef = useScrollReveal<HTMLElement>('.course-reveal', {
    yOffset: 24,
    duration: 0.6,
    stagger: 0.05,
  });
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const { headline, subhead, cta } = careerPathsContent;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [underline, setUnderline] = useState({ x: 0, width: 0 });

  // Build filter tabs dynamically from CMS categories
  const categoryTabs = useMemo(() => buildCategoryTabs(initialDisciplines), [initialDisciplines]);
  const tabs = useMemo(() => [
    { id: 'all', title: 'All', accent: '#1A1A1A' },
    ...categoryTabs,
    ...(initialCourses.length > 0 ? [{ id: 'short-courses', title: 'Short Courses', accent: '#06B6D4' }] : []),
  ], [categoryTabs, initialCourses.length]);

  const activeTabPosition = tabs.findIndex((t) => t.id === activeCategory);

  // Filter disciplines based on the selected category tab
  const filteredDisciplines = activeCategory === 'all'
    ? initialDisciplines
    : activeCategory === 'short-courses'
      ? []
      : initialDisciplines.filter((d) => d.category === activeCategory);

  // Show individual courses when "All" or "Short Courses" is active
  const filteredCourses = activeCategory === 'all' || activeCategory === 'short-courses'
    ? initialCourses
    : [];

  const totalResults = filteredDisciplines.length + filteredCourses.length;

  // Recompute the tab underline on tab change AND whenever the tablist's
  // own size changes (late font load, container resize, etc.).
  useLayoutEffect(() => {
    const listEl = tabListRef.current;
    if (!listEl) return;

    const updateUnderline = () => {
      const tabEl = tabRefs.current[activeTabPosition];
      if (!tabEl) return;
      const tabRect = tabEl.getBoundingClientRect();
      const listRect = listEl.getBoundingClientRect();
      setUnderline({ x: tabRect.left - listRect.left + listEl.scrollLeft, width: tabRect.width });
    };

    updateUnderline();
    window.addEventListener('resize', updateUnderline);

    const resizeObserver = new ResizeObserver(updateUnderline);
    resizeObserver.observe(listEl);

    return () => {
      window.removeEventListener('resize', updateUnderline);
      resizeObserver.disconnect();
    };
  }, [activeTabPosition]);

  // Announce filter changes to screen reader users.
  useLayoutEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `${totalResults} course${totalResults === 1 ? '' : 's'} shown`;
    }
  }, [activeCategory, totalResults]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, position: number) {
    let next = position;
    if (e.key === 'ArrowRight') next = (position + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (position - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActiveCategory(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section ref={sectionRef} id="courses" className="relative w-full bg-panel py-20 text-ink lg:py-24 overflow-hidden">
      {/* Depth: ambient glow + mesh */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-primary/[0.04] hidden" />
        <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-pink-500/[0.03] hidden" />
        <div className="absolute inset-0 mesh-grid opacity-40" />
      </div>

      <Container className="relative z-10">
        <div className="course-reveal mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
              {initialCourses.length} courses &amp; {initialDisciplines.length} tracks
            </span>
            <h2 className="section-heading">{headline}</h2>
            <p className="mt-4 text-base leading-relaxed text-steel md:text-lg">{subhead}</p>
          </div>

          <Link
            href={cta.href}
            className="group hidden shrink-0 items-center gap-2 rounded-full bg-surface-inverse px-7 py-3 text-sm font-bold text-paper transition-transform hover:scale-[1.02] md:inline-flex"
          >
            {cta.label}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Category tabs */}
        <div className="course-reveal relative mb-10 border-b border-ink/10">
          {/* Edge fades hint that the tablist scrolls horizontally on mobile */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-panel to-transparent sm:hidden" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-panel to-transparent sm:hidden" aria-hidden="true" />

          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Course categories"
            className="scrollbar-none flex gap-8 overflow-x-auto"
          >
            {tabs.map((tab, position) => {
              const isActive = activeCategory === tab.id;
              const count = tab.id === 'all'
                ? initialDisciplines.length + initialCourses.length
                : tab.id === 'short-courses'
                  ? initialCourses.length
                  : initialDisciplines.filter((d) => d.category === tab.id).length;
              return (
                <button
                  key={tab.id}
                  id={`course-tab-${tab.id}`}
                  ref={(el) => {
                    tabRefs.current[position] = el;
                  }}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="course-tabpanel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveCategory(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, position)}
                  className={`shrink-0 whitespace-nowrap pb-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 ${isActive ? 'text-ink' : 'text-steel hover:text-ink'
                    }`}
                >
                  {tab.title}
                  <span className="ml-1.5 text-helper/80">{count}</span>
                </button>
              );
            })}
          </div>
          <div
            className="tab-underline absolute bottom-0 h-[2px] transition-all duration-400 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ left: underline.x, width: underline.width, backgroundColor: tabs[activeTabPosition]?.accent }}
            aria-hidden="true"
          />
        </div>

        {/* Screen-reader-only announcement of result count on filter change */}
        <div ref={liveRegionRef} role="status" aria-live="polite" className="sr-only" />

        {/* Cards */}
        <div
          id="course-tabpanel"
          role="tabpanel"
          aria-labelledby={`course-tab-${activeCategory}`}
          key={activeCategory}
          className="grid-fade flex flex-col gap-12"
        >
          {totalResults === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 py-16 text-center">
              <p className="text-sm font-semibold text-steel">No courses in this category yet</p>
              <p className="mt-1 text-helper/70">Check back soon, or explore another category above.</p>
            </div>
          )}

          {/* ── Discipline Track Cards (from CMS) ── */}
          {filteredDisciplines.length > 0 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-display font-bold text-ink">Career Tracks</h3>
                <p className="text-steel mt-1 text-sm">Full-length programs designed for a complete career switch.</p>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredDisciplines.map((discipline) => {
                  const Icon = resolveIcon(discipline.icon);
                  const accent = discipline.accent;
                  const isUpcoming = discipline.tracks.every((t) => t.upcoming);
                  const hasPopularTrack = discipline.tracks.some((t) => t.popular);

                  // Calculate starting price from all track levels
                  const startingPrice = Math.min(
                    ...discipline.tracks.flatMap((track) =>
                      track.levels.map((level: TrackLevel) => level.tuition.amount)
                    )
                  );

                  // Compute total duration range across tracks
                  const durations = discipline.tracks.flatMap((t) =>
                    t.levels.map((l: TrackLevel) => l.duration)
                  );
                  const durationLabel = durations.length === 1
                    ? durations[0]
                    : `${durations[0]} — ${durations[durations.length - 1]}`;

                  const cardClasses = [
                    'group relative flex flex-col overflow-hidden rounded-2xl border border-ink/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300',
                    isUpcoming ? 'opacity-90 hover:-translate-y-1.5 hover:border-ink/10 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]' : 'hover:-translate-y-1.5 hover:border-ink/10 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]'
                  ].join(' ');

                  return (
                    <Link key={discipline.slug} href={`/academy/courses/${discipline.slug}`} className={cardClasses}>
                      <div className="relative flex flex-1 flex-col bg-paper p-6">
                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 bg-paper/30 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                          <span className="rounded-full bg-surface-inverse px-6 py-2.5 text-sm font-bold text-paper shadow-lg scale-95 group-hover:scale-100 transition-transform duration-300">
                            {isUpcoming ? 'Details & Waitlist' : 'Details'}
                          </span>
                        </div>

                        <div className="relative flex items-start justify-between">
                          <IconMark Icon={Icon} color={accent} />
                          {isUpcoming ? (
                            <StatusBadge label="Upcoming" tone="amber" />
                          ) : hasPopularTrack ? (
                            <StatusBadge label="Popular" />
                          ) : null}
                        </div>

                        <h3 className="relative mt-6 font-display text-lg font-bold text-ink">
                          {discipline.title}
                        </h3>
                        <p className="relative mt-2 flex-1 text-sm font-medium leading-relaxed text-steel line-clamp-2">
                          {discipline.heroDesc}
                        </p>

                        <div className="relative flex items-center gap-2.5 mt-3">
                          {activeCategory === 'all' && (
                            <span
                              className="w-fit rounded-full border-[1.5px] px-3.5 py-1 text-[13px] font-bold tracking-wide transition-colors"
                              style={{ borderColor: `${accent}50`, color: accent, backgroundColor: 'transparent' }}
                            >
                              {discipline.category}
                            </span>
                          )}
                          <span className="ml-auto flex items-center gap-1.5 text-sm font-bold text-ink/70">
                            <Clock size={15} className="text-ink/50" />
                            {durationLabel}
                          </span>
                        </div>
                        <p className="relative mt-4 text-sm font-semibold text-ink">
                          Starts at <span style={{ color: accent }}>{formatPrice(startingPrice)}</span>
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Individual Short Courses ── */}
          {filteredCourses.length > 0 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-display font-bold text-ink">Individual Short Courses</h3>
                <p className="text-steel mt-1 text-sm">Focused 2-4 week courses to level up specific skills.</p>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.slug} course={course} showCategoryTag={activeCategory === 'all'} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="course-reveal mt-10 flex justify-center md:hidden">
          <Link
            href={cta.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-surface-inverse px-7 py-3 text-sm font-bold text-paper"
          >
            {cta.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
