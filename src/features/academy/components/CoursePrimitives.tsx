import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { typography } from '@/features/academy/styles/typography';

/**
 * Small, sharp uppercase section label with a tinted icon chip.
 * Uses the uniform academy brand color so every course detail page
 * shares the same visual language.
 */
export function SectionEyebrow({
  icon: Icon,
  label,
  action,
}: {
  icon: LucideIcon;
  label: string;
  accent?: string; // kept for backward compatibility
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon size={16} strokeWidth={2.5} aria-hidden="true" />
        </span>

        <h2 className={typography.sectionHeading}>
          {label}
        </h2>
      </div>

      {action}
    </div>
  );
}

/**
 * Borderless icon-led list row.
 */
export function ListRow({
  icon: Icon,
  title,
  description,
  isLast,
}: {
  icon: LucideIcon;
  accent?: string;
  title: string;
  description?: string;
  isLast: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3.5 py-4 ${isLast ? '' : 'border-b border-ink/5'
        }`}
    >
      <Icon
        size={18}
        className="mt-0.5 shrink-0 text-primary"
        aria-hidden="true"
      />

      <div className="min-w-0">
        <p className={typography.list}>{title}</p>

        {description && (
          <p className={`mt-1 ${typography.body}`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export function isLastRow(
  index: number,
  length: number,
  columns = 2
) {
  return index >= length - columns;
}