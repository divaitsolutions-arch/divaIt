"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronRight } from "lucide-react";
import { dropdownPanel } from "@/shared/animations/variants";
import { divisions, getDivisionSwitchHref } from "./constants";
import type { Division } from "./types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    current: Division;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export function DivisionDropdown({ isOpen, onClose, current, triggerRef, containerRef }: Props) {
    const panelRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const order: Division[] = [current, current === "agency" ? "academy" : "agency"];

    useEffect(() => {
        if (!isOpen) return;

        function handlePointer(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                onClose();
            }
        }
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
                triggerRef.current?.focus();
            }
        }

        document.addEventListener("mousedown", handlePointer);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handlePointer);
            document.removeEventListener("keydown", handleKey);
        };
    }, [isOpen, onClose, containerRef, triggerRef]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={panelRef}
                    role="listbox"
                    aria-label="Choose a division"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={dropdownPanel}
                    transition={reduceMotion ? { duration: 0 } : undefined}
                    className="absolute right-0 top-[calc(100%+10px)] z-50 w-80 origin-top-right rounded-2xl border border-ink/10 bg-paper p-2 shadow-[0_24px_48px_-16px_rgba(15,15,20,0.22)]"
                >
                    <p className="px-3 pb-2 pt-1 text-[0.7rem] font-bold uppercase tracking-wide text-steel">
                        Choose a Division
                    </p>

                    {order.map((key, i) => {
                        const config = divisions[key];
                        const Icon = config.icon;
                        const isCurrent = key === current;

                        return (
                            <div key={key}>
                                {i === 1 && <div className="my-1 h-px bg-ink/10" />}
                                {isCurrent ? (
                                    <div role="option" aria-selected="true" className="flex items-start gap-3 rounded-xl px-3 py-3">
                                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.accentSoftBg}`}>
                                            <Icon size={18} className={config.accentText} strokeWidth={2.25} />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-bold text-ink">{config.shortLabel}</p>
                                            <p className="mt-0.5 text-helper">{config.description}</p>
                                            <p className={`mt-1.5 flex items-center gap-1 text-[0.7rem] font-semibold ${config.accentText}`}>
                                                <Check size={12} strokeWidth={3} />
                                                Current Workspace
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={getDivisionSwitchHref(key)}
                                        role="option"
                                        aria-selected="false"
                                        onClick={onClose}
                                        className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-panel"
                                    >
                                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.accentSoftBg}`}>
                                            <Icon size={18} className={config.accentText} strokeWidth={2.25} />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-bold text-ink">{config.shortLabel}</p>
                                            <p className="mt-0.5 text-helper">{config.description}</p>
                                            <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] font-semibold text-steel transition-colors group-hover:text-ink">
                                                Switch Workspace
                                                <ChevronRight size={12} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
                                            </p>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    );
}