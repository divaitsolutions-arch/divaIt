import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, X } from "lucide-react";
import { mobileMenuSlide, mobileMenuItem } from "@/shared/animations/variants";
import { divisions, getDivisionSwitchHref } from "./constants";
import type { Division } from "./types";

interface NavData {
  readonly links: ReadonlyArray<{ readonly href: string; readonly label: string }>;
  readonly cta: { readonly href: string; readonly label: string };
  [key: string]: unknown;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isNeutral: boolean;
  divisionKey: Division;
  currentNav: NavData;
}

export function MobileMenu({
  isOpen,
  onClose,
  isNeutral,
  divisionKey,
  currentNav,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-brand={divisionKey}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-paper/98 p-8 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          variants={mobileMenuSlide}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-2 text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col items-center gap-6 text-center">
            {currentNav.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="text-2xl font-bold tracking-tight text-ink transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
            
          <motion.div variants={mobileMenuItem} className="mt-4">
            <Link
              href={currentNav.cta.href}
              onClick={onClose}
              className="group inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white bg-cta whitespace-nowrap shadow-md shadow-cta/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cta/30"
            >
              {currentNav.cta.label}
              <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div variants={mobileMenuItem} className="mt-6 w-full max-w-xs">
            <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-wide text-steel">Workspace</p>
            <div className="flex flex-col gap-2">
              {(["agency", "academy"] as Division[]).map((key) => {
                const config = divisions[key];
                const Icon = config.icon;
                const isCurrent = !isNeutral && key === divisionKey;

                return isCurrent ? (
                  <div key={key} className={`flex items-center gap-3 rounded-xl ${config.accentSoftBg} px-4 py-3`}>
                    <Icon size={18} className={config.accentText} strokeWidth={2.25} />
                    <span className="text-sm font-bold text-ink">{config.shortLabel}</span>
                    <span className={`ml-auto text-[0.65rem] font-semibold ${config.accentText}`}>Current</span>
                  </div>
                ) : (
                  <Link
                    key={key}
                    href={getDivisionSwitchHref(key)}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl border border-ink/10 px-4 py-3 transition-colors hover:bg-panel"
                  >
                    <Icon size={18} className="text-steel" strokeWidth={2.25} />
                    <span className="text-sm font-bold text-ink">{config.shortLabel}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
