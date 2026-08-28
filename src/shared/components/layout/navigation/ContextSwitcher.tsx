"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { divisions } from "./constants";
import type { Division } from "./types";
import { DivisionDropdown } from "./DivisionDropdown";

export function ContextSwitcher({ division }: { division: Division }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const config = divisions[division];

    return (
        <div ref={containerRef} className="relative">
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className={`group inline-flex items-center gap-1 rounded-lg px-2 py-0.5 transition-colors bg-ink/5 hover:bg-ink/10`}
            >
                <span className="text-lg font-black tracking-tight text-ink">{config.shortLabel}</span>
                <ChevronDown
                    size={14}
                    strokeWidth={3}
                    className={`text-ink/60 transition-all duration-200 group-hover:text-ink/100 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            <DivisionDropdown
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                current={division}
                triggerRef={triggerRef}
                containerRef={containerRef}
            />
        </div>
    );
}