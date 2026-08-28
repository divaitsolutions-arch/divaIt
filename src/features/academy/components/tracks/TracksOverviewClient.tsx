'use client';

import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { resolveIcon } from '@/features/academy/lib/icons';
import { Discipline } from '@/features/academy/types/models';
import { getDefaultLevel, getLevelSummaryLabel } from '@/features/academy/lib/track-level';
import { formatPrice } from '@/features/academy/enrollment/utils';
import { resolveTechColor } from '@/features/academy/lib/tech-icons';

// NOTE: exported name dropped the "Client" suffix — file keeps it so you
// can still spot client components at a glance in the file tree, but the
// import you use elsewhere becomes `DisciplineOverview`. Update any
// existing `import DisciplineOverviewClient from ...` to
// `import DisciplineOverview from ...` wherever this is used.
export default function TracksOverviewClient({ discipline }: { discipline: Discipline }) {
  const Icon = resolveIcon(discipline.icon);

  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      {/* ━━━ Hero ━━━ */}
      <section className="relative overflow-hidden border-b border-ink/5 pt-32 pb-12 lg:pt-40 lg:pb-16">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 mesh-grid opacity-30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
          {/* Breadcrumb */}
          <Link
            href="/academy#courses"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-steel transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            All Bootcamps
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ backgroundColor: `${discipline.accent}10` }}>
                {/* eslint-disable-next-line react-hooks/static-components */}
                <Icon size={14} style={{ color: discipline.accent }} />
                <span className="text-[13px] font-bold uppercase tracking-wider" style={{ color: discipline.accent }}>
                  {discipline.category}
                </span>
              </div>

              <h1 className="mb-5 page-heading">
                {discipline.title}
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-steel md:text-lg">
                {discipline.heroDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Choose Your Track ━━━ */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Available Tracks</h2>
            <p className="mt-2 text-steel">Choose the technology stack that fits your career goals.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {discipline.tracks.map((track) => {
              const isUpcoming = track.upcoming;
              const cardProps = { href: `/academy/courses/${discipline.slug}/${track.slug}` };

              // Level-specific info now lives on TrackLevel, not Track.
              // Cards show the default level's duration and a dynamically
              // generated level summary (never hardcoded tab/level names).
              const defaultLevel = getDefaultLevel(track);
              const levelSummary = getLevelSummaryLabel(track);

              return (
                <Link
                  key={track.slug}
                  {...cardProps}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-paper p-6 shadow-sm transition-all ${isUpcoming
                    ? 'border-ink/5 opacity-90 hover:-translate-y-1 hover:shadow-lg'
                    : 'border-ink/5 hover:-translate-y-1 hover:shadow-lg'
                    }`}
                >
                  {isUpcoming && (
                    <span className="absolute top-0 right-6 rounded-b-lg bg-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                      Upcoming
                    </span>
                  )}
                  {track.popular && !isUpcoming && (
                    <span className="absolute top-0 right-6 rounded-b-lg bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                      Popular
                    </span>
                  )}
                  <div className="mb-6 flex flex-col gap-3">
                    <h3 className="font-display text-2xl font-bold text-ink">{track.title}</h3>
                    <div className="flex items-center gap-x-2 overflow-hidden">
                      {defaultLevel.techStack.slice(0, 4).map((tech, i) => {
                        const brandColor = resolveTechColor(tech.icon);
                        return (
                          <span key={i} className="flex shrink-0 items-center gap-x-2">
                            <span
                              className="text-[13px] font-bold tracking-wide whitespace-nowrap"
                              style={{ color: brandColor ?? discipline.accent }}
                            >
                              {tech.name}
                            </span>
                            {i < Math.min(defaultLevel.techStack.length, 4) - 1 && (
                              <span className="text-ink/20 text-[13px]">●</span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <p className="mb-6 flex-1 text-base leading-relaxed text-steel max-w-[55ch] line-clamp-2">{track.heroDesc}</p>

                  <div className="mt-auto border-t border-ink/5 pt-4">
                    <div className="mb-4 flex items-center justify-between gap-2 text-[13px] font-semibold text-ink">
                      <span>{defaultLevel.duration}</span>
                      <span className="text-right" title={levelSummary}>
                        {levelSummary}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-ink">
                        {formatPrice(defaultLevel.tuition.amount)}
                      </span>
                      {isUpcoming ? (
                        <div className="flex items-center text-sm font-bold text-amber-600">
                          View details
                        </div>
                      ) : (
                        <div className="flex items-center text-sm font-bold transition-colors" style={{ color: discipline.accent }}>
                          View Full Syllabus
                          <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ Who is this for? ━━━ */}
      {discipline.whoIsThisFor && discipline.whoIsThisFor.length > 0 && (
        <section className="border-t border-ink/5 py-10 lg:py-14">
          <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
            <h2 className="mb-10 font-display text-3xl font-bold tracking-tight md:text-4xl">Which track is right for you?</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {discipline.whoIsThisFor.map((persona) => {
                const track = discipline.tracks.find((t) => t.slug === persona.recommendedTrack);
                return (
                  <div key={persona.persona} className="rounded-2xl border border-ink/10 bg-panel p-8">
                    <h3 className="mb-2 font-display text-xl font-bold text-ink">{persona.persona}</h3>
                    <p className="mb-6 text-base text-steel max-w-[55ch]">{persona.reason}</p>
                    <div className="flex items-center gap-3 border-t border-ink/10 pt-4">
                      <span className="text-[13px] font-bold uppercase tracking-wider text-steel">We Recommend:</span>
                      <Link
                        href={`/academy/courses/${discipline.slug}/${persona.recommendedTrack}`}
                        className="text-sm font-bold hover:underline"
                        style={{ color: discipline.accent }}
                      >
                        {track?.title} <ChevronRight size={14} className="inline" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}