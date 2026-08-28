'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Clock,
  Signal,
  Sparkles,
} from 'lucide-react';
import { Course } from '@/features/academy/types/models';
import { resolveTechIcon, resolveTechColor } from '@/features/academy/lib/tech-icons';
import { formatPrice } from '@/features/academy/enrollment/utils';

export default function IndividualCoursesClient({ initialCourses = [] }: { initialCourses?: Course[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(initialCourses.map(c => c.category)))];

  const filtered =
    activeCategory === 'All'
      ? initialCourses
      : initialCourses.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      {/* ━━━ Hero ━━━ */}
 <section className="relative overflow-hidden border-b border-ink/5 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full hidden bg-primary/8" />
          <div className="absolute inset-0 mesh-grid opacity-30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
          <Link
            href="/academy#courses"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-steel transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Academy
          </Link>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <Sparkles size={14} className="text-primary" />
            <span className="text-[13px] font-bold uppercase tracking-wider text-primary">
              Individual Courses
            </span>
          </div>

          <h1 className="mb-4 page-heading max-w-3xl text-ink">
            Master One Skill<br className="hidden sm:inline" /> at a Time
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-steel md:text-lg">
            Short, focused courses on individual programming languages and technologies.
            Learn at your own pace, build real projects, and upgrade to a full career track when you&apos;re ready.
          </p>
        </div>
      </section>

      {/* ━━━ Category Tabs ━━━ */}
      <div className="border-b border-ink/5 bg-panel">
        <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none -mx-1 px-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === 'All'
                  ? initialCourses.length
                  : initialCourses.filter((c) => c.category === cat).length;

              // Skip empty categories
              if (count === 0) return null;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-surface-inverse text-paper shadow-sm'
                      : 'text-steel hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  {cat}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[13px] font-bold tabular-nums ${
                      isActive ? 'bg-paper/20 text-paper' : 'bg-ink/5 text-steel'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ━━━ Course Grid ━━━ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => {
              // Pick the primary tech icon for the card
              const primaryTech = course.techStack[0];
              const TechIcon = resolveTechIcon(primaryTech.icon);
              const techColor = resolveTechColor(primaryTech.icon) ?? course.accent;

              return (
                <Link
                  key={course.slug}
                  href={`/academy/courses/individual/${course.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/5 bg-paper shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Accent bar */}
                  <div
                    className={`h-1 w-full bg-gradient-to-r ${course.gradient}`}
                    aria-hidden="true"
                  />

                  <div className="flex flex-1 flex-col p-6">
                    {/* Top row: icon + badges */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex shrink-0 items-center justify-center">
                        {TechIcon && <TechIcon size={28} color={techColor} className="opacity-90 transition-opacity group-hover:opacity-100" />}
                      </div>
                      <div className="flex items-center gap-2">
                        {course.popular && (
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[13px] font-bold uppercase tracking-wider text-primary">
                            Popular
                          </span>
                        )}
                        <span
                          className="rounded-full px-2.5 py-1 text-[13px] font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${course.accent}12`,
                            color: course.accent,
                          }}
                        >
                          {course.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Title & subtitle */}
                    <h3 className="mb-1 font-display text-lg font-bold tracking-tight text-ink">
                      {course.title}
                    </h3>
                    <p className="mb-4 text-helper">{course.subtitle}</p>

                    {/* Description */}
                    <p className="mb-6 text-base font-medium leading-relaxed text-steel max-w-[55ch]">
                      {course.heroDesc}
                    </p>

                    {/* Tech stack chips */}
                    <div className="mb-6 flex flex-wrap gap-1.5">
                      {course.techStack.map((tech, i) => {
                        const Icon = resolveTechIcon(tech.icon);
                        const color = resolveTechColor(tech.icon) ?? course.accent;
                        return (
                          <span
                            key={`${tech.name}-${i}`}
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-[13px] font-semibold"
                            style={{ backgroundColor: `${color}10`, color }}
                          >
                            {Icon && <Icon size={11} />}
                            {tech.name}
                          </span>
                        );
                      })}
                    </div>

                    {/* Bottom: meta + CTA */}
                    <div className="mt-auto border-t border-ink/5 pt-4">
                      <div className="mb-3 flex items-center gap-4 text-helper">
                        <span className="flex items-center gap-1">
                          <Clock size={12} style={{ color: course.accent }} />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Signal size={12} style={{ color: course.accent }} />
                          {course.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-base font-extrabold tabular-nums text-ink">
                          {formatPrice(course.tuition.amount)}
                        </span>
                        <span
                          className="flex items-center text-sm font-bold transition-colors"
                          style={{ color: course.accent }}
                        >
                          View Course
                          <ChevronRight
                            size={16}
                            className="ml-0.5 transition-transform group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-semibold text-ink">No courses in this category yet</p>
              <p className="mt-1 text-helper">Check back soon. We&apos;re adding new courses regularly.</p>
            </div>
          )}
        </div>
      </section>

      {/* ━━━ Upgrade CTA ━━━ */}
 <section className="border-t border-ink/5 py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left gap-6">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Ready for the Full Journey?
              </h2>
              <p className="mt-2 max-w-lg text-helper">
                Our career tracks combine multiple skills into intensive, project-based programs that take you from beginner to job-ready.
              </p>
            </div>
            <Link
              href="/academy#courses"
              className="group flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-pink-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 active:scale-95"
              style={{ boxShadow: '0 8px 24px rgba(160,59,184,0.4)' }}
            >
              Browse Career Tracks
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
