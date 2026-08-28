'use client';

import {
  CheckCircle2,
  Cpu,
  Sparkles,
  FolderGit2,
  ClipboardCheck,
  Users,
  ListOrdered,
} from 'lucide-react';
import { Course } from '@/features/academy/types/models';
import { resolveTechIcon, resolveTechColor } from '@/features/academy/lib/tech-icons';
import { typography } from '@/features/academy/styles/typography';
import { SectionEyebrow, ListRow, isLastRow } from '@/features/academy/components/CoursePrimitives';
import CourseResources from '@/features/academy/components/CourseResources';
import IndividualCourseHero from '@/features/academy/components/IndividualCourseHero';
import IndividualCourseSidebar, { MobileEnrollBar } from '../IndividualCourseSidebar';

/**
 * A list row with a leading marker (dot or icon) and body text.
 * Shared by "Who This Is For" and "Prerequisites", which are visually
 * identical except for the marker.
 */
function MetaListItem({ marker, children }: { marker: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3.5 py-3">
      {marker}
      <span className={typography.list}>{children}</span>
    </li>
  );
}

/* ─── Main Component ─── */

export default function IndividualCourseDetail({ course }: { course: Course }) {
  return (
    <main className="min-h-[100dvh] bg-paper text-ink pb-24 lg:pb-16">
      <IndividualCourseHero course={course} />

      {/* ━━━ Main 2-Column Content ━━━ */}
      <div className="mx-auto mt-12 w-full max-w-[1200px] px-6 lg:mt-16 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          {/* Left Column */}
          <div className="flex min-w-0 flex-1 flex-col gap-12">
            {/* 1. What You'll Learn (Highest Priority) */}
            <section>
              <SectionEyebrow icon={Sparkles} label="What You'll Learn" />
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
                {course.highlights.map((item, i) => (
                  <ListRow
                    key={`highlight-${i}`}
                    icon={CheckCircle2}
                    title={item}
                    isLast={isLastRow(i, course.highlights.length)}
                  />
                ))}
              </div>
            </section>

            {/* 2. Tech Stack */}
            <section>
              <SectionEyebrow icon={Cpu} label="Technologies You'll Learn" />
              <div className="flex flex-wrap gap-3">
                {course.techStack.map((tech, i) => {
                  const TechIcon = resolveTechIcon(tech.icon);
                  const iconColor = resolveTechColor(tech.icon) ?? '#64748b';
                  return (
                    <span
                      key={`${tech.name}-${i}`}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-ink/[0.03]"
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

            {/* 3. Projects */}
            {course.projects && course.projects.length > 0 && (
              <section>
                <SectionEyebrow icon={FolderGit2} label="Projects You'll Build" />
                <ol className="flex flex-col">
                  {course.projects.map((project, i, arr) => (
                    <li
                      key={`project-${i}`}
                      className={`flex items-start gap-3.5 py-4 ${typography.list} ${i === arr.length - 1 ? '' : 'border-b border-ink/5'
                        }`}
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      {project}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* 4. Who This Is For */}
            {course.targetAudience && course.targetAudience.length > 0 && (
              <section>
                <SectionEyebrow icon={Users} label="Who This Is For" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
                  {course.targetAudience.map((audience, i) => (
                    <MetaListItem
                      key={`audience-${i}`}
                      marker={<span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                    >
                      {audience}
                    </MetaListItem>
                  ))}
                </ul>
              </section>
            )}

            {/* 5. Prerequisites */}
            {course.prerequisites && course.prerequisites.length > 0 && (
              <section>
                <SectionEyebrow icon={ClipboardCheck} label="Prerequisites" />
                <ul className="flex flex-col">
                  {course.prerequisites.map((req, i) => (
                    <MetaListItem
                      key={`prereq-${i}`}
                      marker={<CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />}
                    >
                      {req}
                    </MetaListItem>
                  ))}
                </ul>
              </section>
            )}

            {/* 6. Syllabus + Course Notes — shared component */}
            <CourseResources currentLevel={course} />

            {/* 7. How It Works */}
            {course.howItWorks && course.howItWorks.length > 0 && (
              <section>
                <SectionEyebrow icon={ListOrdered} label="How This Course Works" />
                <ol className="flex flex-col gap-6">
                  {course.howItWorks.map((item, i) => (
                    <li key={`how-${i}`} className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text- font-bold tabular-nums text-primary">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-base font-bold text-ink">{item.step}</p>
                        <p className={`mt-1 ${typography.body}`}>{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          {/* ━━━ Right Column — Sidebar ━━━ */}
          <IndividualCourseSidebar course={course} />
        </div>
      </div>

      <MobileEnrollBar course={course} />
    </main>
  );
}