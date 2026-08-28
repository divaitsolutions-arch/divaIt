"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { megaMenuShelf, scrimFade } from "@/shared/animations/variants";
import { divisions } from "./constants";
import type { Division, DivisionMegaMenu } from "./types";
import { Container } from '@/shared/components/layout/Container';

interface Props {
    menu: DivisionMegaMenu;
    isOpen: boolean;
    division: Division;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onRequestClose: () => void;
}

export function MegaMenu({ menu, isOpen, division, onMouseEnter, onMouseLeave, onRequestClose }: Props) {
    const reduceMotion = useReducedMotion();
    const config = divisions[division];

    useEffect(() => {
        if (!isOpen) return;
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onRequestClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, onRequestClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 z-10 bg-ink/15 backdrop-blur-sm"
                        variants={scrimFade}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={reduceMotion ? { duration: 0 } : undefined}
                        onClick={onRequestClose}
                        aria-hidden="true"
                    />

                    <motion.div
                        role="region"
                        aria-label={`${config.shortLabel} menu`}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={megaMenuShelf}
                        transition={reduceMotion ? { duration: 0 } : undefined}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className="absolute left-0 right-0 top-full z-20 hidden lg:block"
                    >
                        <Container>
                            <div className="overflow-hidden rounded-b-3xl border border-t-0 border-ink/10 bg-paper shadow-[0_32px_64px_-24px_rgba(15,15,20,0.25)]">
                                <div className="p-8">
                                    <p className="mb-6 border-b border-ink/5 pb-4 text-[0.7rem] font-bold uppercase tracking-wide text-steel">
                                        Explore {config.shortLabel}
                                    </p>

                                    <div className="grid grid-cols-[1fr_auto] gap-10">
                                        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
                                            {menu.categories.map((cat) => {
                                                const Icon = cat.icon;
                                                return (
                                                    <div key={cat.title}>
                                                        <div className="mb-4 flex items-center gap-2.5">
                                                            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cat.tint.bg}`}>
                                                                <Icon size={16} className={cat.tint.text} strokeWidth={2.25} />
                                                            </span>
                                                            <p className="text-sm font-bold text-ink">{cat.title}</p>
                                                        </div>
                                                        <ul className="space-y-2.5">
                                                            {cat.links.map((l) => (
                                                                <li key={l.label}>
                                                                    <Link
                                                                        href={l.href}
                                                                        className={`text-[0.83rem] transition-colors flex items-center justify-between ${l.upcoming ? "text-steel/70 hover:text-ink/70" : "text-steel hover:text-ink"}`}
                                                                    >
                                                                        <span>{l.label}</span>
                                                                        {l.upcoming && (
                                                                            <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[13px] font-bold uppercase tracking-wider text-amber-600 ml-2">
                                                                                Upcoming
                                                                            </span>
                                                                        )}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <Link
                                                            href={cat.viewAllHref}
                                                            className={`mt-4 inline-flex items-center gap-1 text-[13px] font-semibold ${config.accentText}`}
                                                        >
                                                            View All <ArrowUpRight size={14} strokeWidth={2.5} />
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className={`flex w-64 shrink-0 flex-col rounded-2xl border border-ink/5 ${config.accentSoftBg} p-6`}>
                                            <span className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-paper ${config.accentText}`}>
                                                <Sparkles size={18} strokeWidth={2.25} />
                                            </span>
                                            <p className="text-[0.95rem] font-bold leading-snug text-ink">{menu.guidance.heading}</p>
                                            <p className="mt-2 text-[13px] leading-relaxed text-steel">{menu.guidance.body}</p>
                                            <Link
                                                href={menu.guidance.ctaHref}
                                                className={`mt-5 inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-br ${config.gradient} px-4 py-2.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5`}
                                            >
                                                {menu.guidance.ctaLabel} <ArrowUpRight size={14} strokeWidth={2.5} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}