import { Flame } from "lucide-react";
import { formatPrice } from "../utils";
import { ProgramOption } from "../types";
import { ElementType } from "react";

export function SidebarFeature({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: ElementType;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={15} />
      </span>
      <div>
        <p className="text-[13.5px] font-medium leading-tight text-ink">
          {title}
        </p>
        <p className="mt-0.5 text-[13px] font-medium leading-tight text-steel">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export function ModeCard({
  icon: Icon,
  title,
  subtitle,
  active,
  onClick,
}: {
  icon: ElementType;
  title: string;
  subtitle: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
        active
          ? "border-primary bg-primary/[0.04] shadow-[0_0_0_1px_rgba(160,59,184,0.35)]"
          : "border-ink/10 hover:border-ink/20"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          active ? "bg-primary/10 text-primary" : "bg-ink/[0.03] text-steel"
        }`}
      >
        <Icon size={16} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-semibold text-ink">
          {title}
        </span>
        <span className="block truncate text-[11.5px] font-medium text-steel">
          {subtitle}
        </span>
      </span>
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
          active ? "border-primary bg-primary" : "border-ink/20"
        }`}
      >
        {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
    </button>
  );
}

export function ProgramGroupList({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: ProgramOption[];
  onSelect: (title: string) => void;
}) {
  if (!options.length) return null;
  return (
    <div className="mb-1.5 last:mb-0">
      <p className="px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-steel">
        {label}
      </p>
      {options.map((opt) => (
        <button
          key={opt.title}
          type="button"
          onClick={() => onSelect(opt.title)}
          className="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[13.5px] text-ink transition-colors hover:bg-ink/[0.03]"
        >
          <span className="min-w-0 truncate">{opt.title}</span>
          <span className="flex shrink-0 items-center gap-1.5">
            {opt.popular && <Flame size={12} className="text-orange-500" />}
            {opt.price !== undefined && (
              <span className="text-[13px] font-semibold text-primary">
                {formatPrice(opt.price)}
                {opt.availability === "waitlist" && " · Waitlist"}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

export function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium text-ink">
        {label} {required && <span className="text-primary">*</span>}
        {hint && <span className="font-medium text-steel"> ({hint})</span>}
      </label>
      {children}
    </div>
  );
}

export function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-3.5 last:pb-3.5">
      <dt className="text-[12.5px] font-medium text-steel">{label}</dt>
      <dd
        className={`text-right text-[13.5px] font-semibold ${
          highlight ? "text-primary" : "text-ink"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
