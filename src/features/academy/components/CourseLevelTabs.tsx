'use client';

import { TrackLevel } from '@/features/academy/types/models';

interface CourseLevelTabsProps {
    levels: TrackLevel[];
    selectedLevelId: string;
    onSelect: (levelId: string) => void;
    /** @deprecated accent is kept for backward compat but no longer used — uniform brand color applied. */
    accent?: string;
}

/**
 * Renders a dynamic row of level pills driven entirely by `levels` data.
 * Uses the uniform academy brand color (via CSS variable) so all course
 * detail pages look consistent regardless of discipline.
 */
export default function CourseLevelTabs({ levels, selectedLevelId, onSelect }: CourseLevelTabsProps) {
    if (levels.length <= 1) return null;

    return (
        <div role="tablist" aria-label="Course level" className="flex flex-wrap gap-2.5">
            {levels.map((level) => {
                const isActive = level.id === selectedLevelId;
                return (
                    <button
                        key={level.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onSelect(level.id)}
                        className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-base font-bold transition-all duration-200 ${isActive
                            ? 'border-transparent bg-primary text-white shadow-md'
                            : 'border-ink/10 bg-paper text-steel shadow-sm hover:border-ink/20 hover:text-ink'
                            }`}
                    >
                        {level.name}
                        {level.badge && (
                            <span
                                className={`rounded-full px-2 py-0.5 text-[13px] font-bold uppercase tracking-wider ${isActive ? 'bg-white/20 text-white' : 'bg-ink/5 text-steel'
                                    }`}
                            >
                                {level.badge}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}