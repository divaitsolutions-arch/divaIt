'use client';

import Link from 'next/link';
import {
  ChevronLeft,
  MoveRight,
  CheckCircle2,
  Clock,
  Signal,
  CalendarDays,
  Cpu,
  Sparkles,
  ListChecks,
  FolderGit2,
  ClipboardCheck,
  Users,
  ArrowRight,
  Download,
  FileText,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useEnrollmentModal } from '@/features/academy/enrollment/contexts/EnrollmentModalContext';
import { resolveIcon } from '@/features/academy/lib/icons';
import { resolveTechIcon, resolveTechColor } from '@/features/academy/lib/tech-icons';
import { Discipline } from '@/features/academy/types/models';
import { getDefaultLevel, getLevelById, hasMultipleLevels } from '@/features/academy/lib/track-level';
import CourseLevelTabs from '@/features/academy/components/CourseLevelTabs';
import CourseResources from '@/features/academy/components/CourseResources';
import { SectionEyebrow, ListRow, isLastRow } from '@/features/academy/components/CoursePrimitives';
import PdfViewerModal from '@/features/academy/components/pdf/PdfViewerModal';
import { typography } from '@/features/academy/styles/typography';

/**
 * Shared focus ring for interactive sidebar elements. Mirrors the
 * constant in CourseSidebar.tsx — kept local here since this file's
 * sidebar is a distinct component (waitlist + level-aware pricing)
 * rather than a shared one. If a third detail page needs this same
 * pattern, promote it to shared/styles.
 */
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

// NOTE: exported name dropped the "Client" suffix, same as
// DisciplineOverviewClient.tsx — update any existing
// `import TrackDetailClient from ...` to `import TrackDetail from ...`.
export default function TrackDetail({ discipline, track }: { discipline: Discipline; track: Discipline['tracks'][number] }) {
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [selectedLevelId, setSelectedLevelId] = useState<string>(() => getDefaultLevel(track).id);

  const currentLevel = useMemo(() => getLevelById(track, selectedLevelId), [track, selectedLevelId]);
  const showLevelTabs = hasMultipleLevels(track);

  const { openModal } = useEnrollmentModal();
  const DisciplineIcon = resolveIcon(discipline.icon);
  const isWaitlist = Boolean(track.upcoming);

  function handleSelectLevel(levelId: string) {
    setSelectedLevelId(levelId);
  }

  function handleEnroll() {
    openModal(track.title, isWaitlist ? 'waitlist' : 'enrollment');
  }

  return (
    <main className="min-h-[100dvh] bg-paper text-ink pb-24 lg:pb-16">
      {/* ━━━ Compact Premium Hero ━━━ */}
      <section className="relative border-b border-ink/5 pt-24 pb-14 lg:pt-28 lg:pb-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 mesh-grid opacity-30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
          <Link
            href={`/academy/courses/${discipline.slug}`}
            className={`group mb-4 inline-flex items-center gap-2 ${typography.meta} transition-colors hover:text-ink ${focusRing}`}
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            {discipline.title}
          </Link>

          <div className="mb-4">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-primary/10">
              {/* eslint-disable-next-line react-hooks/static-components */}
              <DisciplineIcon size={14} className="text-primary" />
              <span className={typography.eyebrow}>{discipline.category}</span>
            </div>
          </div>

          <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" aria-hidden="true" />

          {/* Compact hero variant — track pages sit one level deeper
              in the nav than course pages, so they intentionally use
              a smaller scale than typography.hero/.heroDescription. */}
          <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <h1 className={`max-w-4xl ${typography.heroCompact}`}>{track.title}</h1>
            <a
              href="#syllabus"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10 hover:border-primary/30"
            >
              <FileText size={14} />
              View Syllabus
            </a>
          </div>
          <p className={`max-w-2xl ${typography.heroDescriptionCompact}`}>{track.heroDesc}</p>

          {/* Quick facts */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/5 pt-5">
            <span className="quick-fact">
              <Clock size={18} className="text-primary" />
              {currentLevel.duration}
            </span>
            <span className="quick-fact">
              <CalendarDays size={18} className="text-primary" />
              {currentLevel.commitment}
            </span>
            <span className="quick-fact">
              <Signal size={18} className="text-primary" />
              {currentLevel.name} level
            </span>
          </div>
        </div>
      </section>

      {showLevelTabs && (
        <div className="relative z-20 mx-auto w-full max-w-[1200px] px-6 lg:px-12 -mt-6 lg:-mt-7">
          <CourseLevelTabs
            levels={track.levels}
            selectedLevelId={selectedLevelId}
            onSelect={handleSelectLevel}
          />
        </div>
      )}

      {/* ━━━ Main 2-Column Content ━━━ */}
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12 mt-10 lg:mt-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          {/* Left Column (Content) */}
          <div className="flex-1 min-w-0 flex flex-col gap-10">
            {/* Tech Stack — ONLY section where tech brand colors are used */}
            <section>
              <SectionEyebrow icon={Cpu} label="Technologies You'll Master" />
              <div className="flex flex-wrap gap-3">
                {currentLevel.techStack.map((tech, i) => {
                  const TechIcon = resolveTechIcon(tech.icon);
                  const iconColor = resolveTechColor(tech.icon) ?? '#64748b';
                  return (
                    <span
                      key={`${tech.name}-${i}`}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all hover:bg-ink/[0.03]"
                    >
                      {TechIcon && (
                        <span className="flex items-center justify-center">
                          <TechIcon size={18} color={iconColor} />
                        </span>
                      )}
                      <span style={{ color: iconColor }}>{tech.name}</span>
                    </span>
                  );
                })}
              </div>
            </section>

            {/* What You'll Gain */}
            <section>
              <SectionEyebrow icon={Sparkles} label="What You'll Gain" />
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
                {discipline.sharedHighlights?.map((item, i) => (
                  <ListRow
                    key={`highlight-${i}`}
                    icon={CheckCircle2}
                    title={item}
                    isLast={isLastRow(i, discipline.sharedHighlights!.length)}
                  />
                ))}
              </div>
            </section>

            {(currentLevel.learningOutcomes?.length ?? 0) > 0 && (
              <section>
                <SectionEyebrow icon={ListChecks} label={`What You'll Learn in ${currentLevel.name}`} />
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
                  {currentLevel.learningOutcomes?.map((item, i) => (
                    <ListRow
                      key={`outcome-${i}`}
                      icon={CheckCircle2}
                      title={item}
                      isLast={isLastRow(i, currentLevel.learningOutcomes!.length)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {(currentLevel.projects?.length ?? 0) > 0 && (
              <section>
                <SectionEyebrow icon={FolderGit2} label="Projects You'll Build" />
                <ol className="flex flex-col">
                  {currentLevel.projects?.map((project, i) => (
                    <li
                      key={`project-${i}`}
                      className={`flex items-start gap-3.5 py-4 ${typography.list} ${i === currentLevel.projects!.length - 1 ? '' : 'border-b border-ink/5'
                        }`}
                    >
                      <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="max-w-[65ch]">{project}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Who This Is For */}
            {discipline.whoIsThisFor && discipline.whoIsThisFor.length > 0 && (
              <section>
                <SectionEyebrow icon={Users} label="Who This Is For" />
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
                  {discipline.whoIsThisFor?.map((persona, i) => (
                    <ListRow
                      key={`persona-${i}`}
                      icon={resolveIcon(persona.icon)}
                      title={persona.persona}
                      description={persona.reason}
                      isLast={isLastRow(i, discipline.whoIsThisFor!.length)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Requirements */}
            {(currentLevel.requirements?.length ?? 0) > 0 && (
              <section>
                <SectionEyebrow icon={ClipboardCheck} label="Requirements" />
                <ul className="flex flex-col gap-2">
                  {currentLevel.requirements?.map((req, i) => (
                    <li key={`requirement-${i}`} className={`flex items-start gap-3.5 ${typography.list}`}>
                      <CheckCircle2 size={18} className="mt-[3px] shrink-0 text-primary" />
                      <span className="max-w-[65ch]">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Syllabus — its own component; it owns its own
                open/collapse state, this file just hands it the data.
                `key={selectedLevelId}` makes React throw away and
                recreate the component whenever the level changes,
                which resets its internal open/collapsed state —
                same effect the old manual reset used to have. */}
            <CourseResources key={selectedLevelId} currentLevel={currentLevel} />
          </div>

          {/* Right Column — Sidebar */}
          <div className="w-full shrink-0 lg:sticky lg:top-24 lg:w-[380px]">
            <div className="rounded-2xl border border-ink/10 bg-paper overflow-hidden flex flex-col shadow-xl">
              <div className="h-1.5 w-full bg-gradient-to-r from-primary to-secondary" aria-hidden="true" />

              <div className="bg-panel p-5 border-b border-ink/5">
                <h3 className={`${typography.cardHeading} mb-0.5`}>Enrollment</h3>
                <p className="text-helper">Pick a plan. Lock in your seat.</p>
              </div>

              <div className="p-5 lg:p-6 flex flex-col gap-6">
                {/* Tuition options */}
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl border border-primary/30 p-4">
                    <div className="flex justify-between items-start mb-1.5">
                      <p className="text-sm font-bold text-ink">Pay Upfront</p>
                      <span className="rounded-full px-2 py-0.5 bg-primary/10 text-primary text-[13px] font-bold uppercase tracking-wider">
                        Popular
                      </span>
                    </div>
                    {currentLevel.tuition.offlineAmount ? (
                      <div className="mt-2 flex w-full items-stretch gap-2">
                        <div className="flex flex-1 flex-col rounded-lg border border-ink/10 bg-paper p-2.5 text-center shadow-sm">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-steel">Online</span>
                          <div className="mt-1 flex items-baseline justify-center gap-0.5">
                            <span className="text-xs font-medium text-steel">NPR</span>
                            <span className="font-display text-lg font-extrabold tracking-tight text-ink tabular-nums">{currentLevel.tuition.amount.toLocaleString('en-NP')}</span>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col rounded-lg border border-primary/20 bg-primary/5 p-2.5 text-center shadow-sm">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Physical</span>
                          <div className="mt-1 flex items-baseline justify-center gap-0.5">
                            <span className="text-xs font-medium text-primary">NPR</span>
                            <span className="font-display text-lg font-extrabold tracking-tight text-primary tabular-nums">{currentLevel.tuition.offlineAmount.toLocaleString('en-NP')}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-medium text-steel">NPR</span>
                        {/* Compact price variant — the full `typography.price`
                            token (text-4xl) overflows this 380px card next
                            to the "NPR" / "total" labels on the same line. */}
                        <span className={`${typography.priceCompact} text-primary`}>
                          {currentLevel.tuition.amount.toLocaleString('en-NP')}
                        </span>
                        <span className="text-helper">total</span>
                      </div>
                    )}
                    <p className="mt-2 text-helper text-[13px]">Pay once. Nothing else to think about.</p>
                  </div>

                  <div className="rounded-xl border border-ink/10 p-4">
                    <p className="mb-1.5 text-sm font-bold text-ink">Pay in Installments</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-medium text-ink/50">NPR</span>
                      <span className={`${typography.priceCompact} text-lg text-ink`}>
                        {currentLevel.tuition.installments}
                      </span>
                    </div>
                    <p className="mt-1.5 text-helper">
                      Spread the cost across the course.{' '}
                      <span className="font-semibold text-ink/70">{currentLevel.tuition.note}</span>
                    </p>
                  </div>
                </div>

                {/* Outcome */}
                <div className="border-t border-ink/5 pt-5">
                  <div className="mb-1 flex items-center gap-1.5 text-steel">
                    <CheckCircle2 size={13} />
                    <span className={typography.eyebrow}>Career Outcome</span>
                  </div>
                  <p className={typography.bodyStrong}>{currentLevel.careerOutcome}</p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleEnroll}
                    className={`group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 ${typography.button} ${focusRing}`}
                  >
                    {isWaitlist ? 'Join Waitlist' : 'Enroll Now'}
                    <MoveRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                  {currentLevel.brochurePdfUrl && (
                    <button
                      type="button"
                      onClick={() => setShowBrochureModal(true)}
                      className={`group mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-ink/10 bg-panel px-6 py-3.5 text-ink shadow-sm transition-all hover:bg-ink/[0.03] active:scale-95 ${typography.button} ${focusRing}`}
                    >
                      <Download size={18} className="text-steel" />
                      Preview Course Brochure
                    </button>
                  )}
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-helper text-center">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    {isWaitlist ? 'Get notified when enrollment opens.' : 'Reserve your seat for the next cohort.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-paper/95 backdrop-blur-sm px-4 pt-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] lg:hidden"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
          <div className="min-w-0 leading-tight">
            <p className={typography.priceLabel}>From</p>
            <p className="mt-0.5 font-display text-xl font-extrabold tabular-nums text-ink truncate">
              {currentLevel.tuition.installments}
            </p>
          </div>
          <button
            type="button"
            onClick={handleEnroll}
            className={`flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-white shadow-md active:scale-95 transition-transform ${typography.button} ${focusRing}`}
          >
            {isWaitlist ? 'Join Waitlist' : 'Enroll Now'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {showBrochureModal && currentLevel.brochurePdfUrl && (
        <PdfViewerModal
          url={currentLevel.brochurePdfUrl}
          title={`${track.title} — Brochure`}
          onClose={() => setShowBrochureModal(false)}
        />
      )}
    </main>
  );
}