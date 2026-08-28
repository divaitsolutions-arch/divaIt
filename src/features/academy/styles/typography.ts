export const typography = {
    // ==========================
    // Hero
    // ==========================

    hero:
        "font-display text-2xl md:text-3xl font-bold leading-tight tracking-tight",

    heroDescription:
        "text-lg leading-8 text-ink/80",

    /**
     * Compact hero variant for detail pages nested one level deeper
     * in the nav (e.g. track detail under a discipline), where a
     * full-size hero would carry too much visual weight.
     */
    heroCompact:
        "font-display text-xl md:text-2xl font-bold leading-tight tracking-tight",

    heroDescriptionCompact:
        "text-base md:text-lg font-medium leading-relaxed text-ink/80",

    // ==========================
    // Headings
    // ==========================

    sectionHeading:
        "font-display text-xl md:text-2xl font-bold leading-tight tracking-tight text-ink",

    cardHeading:
        "text-xl font-semibold tracking-tight text-ink",

    // ==========================
    // Body
    // ==========================

    body:
        "text-base leading-7 text-ink/80",

    bodyStrong:
        "text-base font-medium leading-7 text-ink",

    // Better scanability for lists
    list:
        "text-base leading-6 text-ink/90",

    // ==========================
    // UI
    // ==========================

    meta:
        "text-sm font-medium text-steel",

    eyebrow:
        "text-xs font-semibold uppercase tracking-[0.18em] text-primary",

    button:
        "text-sm font-semibold",

    caption:
        "text-xs text-steel",

    // ==========================
    // Pricing
    // ==========================

    price:
        "font-display text-4xl font-extrabold tracking-tight text-ink",

    /**
     * Compact price variant for tighter sidebar layouts where the
     * full `price` token would overflow (e.g. a 380px sidebar card
     * showing "NPR {amount} total" on one line).
     */
    priceCompact:
        "font-display text-xl font-extrabold tracking-tight tabular-nums",

    priceLabel:
        "text-sm font-medium uppercase tracking-[0.14em] text-steel",
} as const;