'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MoveRight, Download, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useEnrollmentModal } from '@/features/academy/enrollment/contexts/EnrollmentModalContext';
import { Course } from '@/features/academy/types/models';
import { formatPrice } from '@/features/academy/enrollment/utils';
import { typography } from '@/features/academy/styles/typography';
import PdfViewerModal from '@/features/academy/components/pdf/PdfViewerModal';

/**
 * Shared focus ring applied to every interactive element in the sidebar,
 * so keyboard users always get a visible focus indicator.
 */
const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

/* ─── Desktop Sidebar Card ─── */

export default function IndividualCourseSidebar({ course }: { course: Course }) {
    const [showBrochureModal, setShowBrochureModal] = useState(false);
    const { openModal } = useEnrollmentModal();

    const quickFacts = [
        { label: 'Duration', value: course.duration },
        { label: 'Commitment', value: course.commitment },
        { label: 'Format', value: course.format },
        { label: 'Level', value: course.difficulty },
    ];

    return (
        <>
            <div className="w-full shrink-0 lg:sticky lg:top-24 lg:w-[380px]">
                <div className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-sm">
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary to-secondary" aria-hidden="true" />

                    <div className="border-b border-ink/5 bg-panel p-5">
                        <h3 className="mb-0.5 font-display text-lg font-bold tracking-tight text-ink">Enrollment</h3>
                        <p className="text-helper">Enroll today. Start learning immediately.</p>
                    </div>

                    <div className="flex flex-col gap-6 p-5 lg:p-6">
                        {/* Price */}
                        {course.tuition.offlineAmount ? (
                            <div className="flex w-full items-stretch gap-2.5">
                                <div className="flex flex-1 flex-col rounded-xl border border-ink/10 bg-paper p-3.5 text-center shadow-sm">
                                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Online</span>
                                    <div className="mt-auto pt-2">
                                        {course.tuition.originalAmount && (
                                            <p className="text-xs font-semibold text-ink/40 line-through">
                                                NPR {course.tuition.originalAmount.toLocaleString()}
                                            </p>
                                        )}
                                        <p className="font-display text-xl font-extrabold tracking-tight text-ink tabular-nums">
                                            NPR {course.tuition.amount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col rounded-xl border-2 border-primary/20 bg-primary/5 p-3.5 text-center shadow-sm">
                                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Physical</span>
                                    <div className="mt-auto pt-2">
                                        <p className="font-display text-xl font-extrabold tracking-tight text-ink tabular-nums">
                                            NPR {course.tuition.offlineAmount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-center">
                                <span className="mb-2 rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-steel">Online Format</span>
                                {course.tuition.originalAmount && (
                                    <p className="mb-0.5 text-sm font-semibold text-ink/40 line-through">
                                        NPR {course.tuition.originalAmount.toLocaleString()}
                                    </p>
                                )}
                                <div className={`${typography.price} flex items-baseline gap-1.5`}>
                                    <span className="text-xl text-ink/40">NPR</span>
                                    <span>{course.tuition.amount.toLocaleString()}</span>
                                </div>
                                {course.tuition.installments !== 'One-time' && (
                                    <p className="mt-1 text-helper">or {course.tuition.installments}</p>
                                )}
                                <p className="mt-2 text-helper">{course.tuition.note}</p>
                            </div>
                        )}

                        {/* Quick facts */}
                        <div className="flex flex-col gap-2.5 border-t border-ink/5 pt-4">
                            {quickFacts.map(({ label, value }) => (
                                <div key={label} className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-steel">{label}</span>
                                    <span className="font-semibold text-ink">{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <button
                            type="button"
                            onClick={() => openModal(course.title)}
                            className={`group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 text-white shadow-sm transition-opacity hover:opacity-90 active:opacity-80 ${typography.button} ${focusRing}`}
                        >
                            Enroll Now
                            <MoveRight
                                size={18}
                                aria-hidden="true"
                                className="transition-transform group-hover:translate-x-0.5"
                            />
                        </button>

                        {course.brochurePdfUrl && (
                            <button
                                type="button"
                                onClick={() => setShowBrochureModal(true)}
                                className={`flex w-full items-center justify-center gap-2 rounded-xl border border-ink/10 bg-panel px-6 py-3.5 text-ink shadow-sm transition-colors hover:bg-ink/[0.04] active:bg-ink/[0.06] ${typography.button} ${focusRing}`}
                            >
                                <Download size={18} aria-hidden="true" className="text-steel" />
                                Preview Course Brochure
                            </button>
                        )}

                        <p className="flex items-center justify-center gap-1.5 text-helper">
                            <CheckCircle2 size={14} aria-hidden="true" className="text-emerald-500" />
                            Seats are limited. Reserve yours today.
                        </p>

                        {/* Upgrade path */}
                        {course.upgradePathTrack && (
                            <div className="border-t border-ink/5 pt-4">
                                <div className="mb-2 flex items-center gap-1.5 text-steel">
                                    <TrendingUp size={13} aria-hidden="true" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Want to go deeper?</span>
                                </div>
                                <Link
                                    href={`/academy/courses/${course.upgradePathTrack.discipline}/${course.upgradePathTrack.track}`}
                                    className={`group/upgrade flex items-center justify-between rounded-xl border border-ink/10 p-3.5 transition-colors hover:bg-panel ${focusRing}`}
                                >
                                    <div>
                                        <p className="text-sm font-bold text-ink">{course.upgradePathTrack.label}</p>
                                        <p className="text-xs text-steel">Full career track →</p>
                                    </div>
                                    <MoveRight
                                        size={16}
                                        aria-hidden="true"
                                        className="shrink-0 text-steel transition-transform group-hover/upgrade:translate-x-0.5"
                                    />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showBrochureModal && course.brochurePdfUrl && (
                <PdfViewerModal
                    url={course.brochurePdfUrl}
                    title={`${course.title} — Brochure`}
                    onClose={() => setShowBrochureModal(false)}
                />
            )}
        </>
    );
}

/* ─── Mobile Sticky CTA ─── */

export function MobileEnrollBar({ course }: { course: Course }) {
    const { openModal } = useEnrollmentModal();

    return (
        <div
            className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-paper/95 px-4 pt-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:hidden"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
            <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
                <div className="min-w-0 leading-tight">
                    <p className="text-xs font-bold uppercase tracking-wider text-steel">
                        {course.tuition.offlineAmount ? 'Starting At' : 'Price'}
                    </p>
                    <div className="mt-0.5 flex flex-col">
                        {course.tuition.originalAmount && (
                            <p className="text-xs font-semibold text-ink/40 line-through">
                                {formatPrice(course.tuition.originalAmount)}
                            </p>
                        )}
                        <p className="truncate font-display text-xl font-extrabold tabular-nums text-ink">
                            {formatPrice(course.tuition.amount)}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => openModal(course.title)}
                    className={`flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-3 text-white shadow-sm transition-opacity hover:opacity-90 active:opacity-80 ${typography.button} ${focusRing}`}
                >
                    Enroll Now
                    <MoveRight size={16} aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}