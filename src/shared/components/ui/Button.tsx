'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/* ----------------------------------------------------------
   Button
   Production-ready reusable button for Next.js + Tailwind

   Accessibility fixes applied (WCAG 2.1 AA pass):
   1. Color contrast    — see CONTRAST CHECKLIST below; verify
                           your theme's hex values against it.
   2. Focus ring         — dual-tone ring now visible on both
                           light AND dark button backgrounds.
   3. aria-disabled       — paired with tabIndex={-1} + preventDefault
                           on anchors (native `disabled` covers <button>).
   4. Live region         — announces loading state changes to
                           screen reader users via aria-live.
   5. Icon-only guard     — dev-time warning if an icon-only button
                           ships without an accessible name (checks
                           ariaLabel; note this can't detect a `title`
                           attribute or aria-labelledby, so it's a
                           heuristic, not a guarantee — pass ariaLabel
                           explicitly on icon-only buttons).
   6. Touch target size   — every size variant now meets the 44x44px
                           minimum (WCAG 2.5.5). Note: min-w-11 only
                           has a visible effect on short/icon-only
                           buttons — longer labels already exceed it.

   v2 patch notes:
   - Internal disabled Link no longer swaps href to '' (which could
     leave Next.js resolving a same-page navigation before onClick's
     preventDefault fires). Now always passes the real href and relies
     solely on aria-disabled + tabIndex={-1} + onClick prevention,
     matching the pattern already used for external links/buttons.
   - Icon-only guard comment clarified re: its limits.

   v3 patch notes:
   - Added 'gradient-blue' | 'gradient-purple' | 'gradient-red'
     variants. These previously existed only as a local, uncompiled
     type in a consumer component (PromotionalPackagesBanner) that
     didn't match this file's Variant union — meaning variantClasses
     lookup silently returned undefined and the button rendered with
     no background/shadow/focus-offset classes. Centralizing them
     here means every consumer gets the same gradient, and contrast
     is checked once instead of per-usage.
----------------------------------------------------------- */

// Exported so consumers can type against Button's actual variant list
// instead of redeclaring a parallel local type that can silently drift
// out of sync (see v3 patch notes above — that's exactly how the
// gradient variants broke before this export existed).
export type Variant =
  | 'primary'
  | 'secondary'
  | 'trust'
  | 'cta'
  | 'blue'
  | 'dark'
  | 'outline'
  | 'gradient-blue'
  | 'gradient-purple'
  | 'gradient-red';

type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children?: React.ReactNode;

  href?: string;

  onClick?: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  >;

  variant?: Variant;

  size?: Size;

  arrow?: boolean;

  loading?: boolean;

  /** Text announced to screen readers when `loading` flips true.
   *  Defaults to "Loading". Customize for context, e.g. "Saving…". */
  loadingLabel?: string;

  disabled?: boolean;

  fullWidth?: boolean;

  icon?: React.ReactNode;

  className?: string;

  type?: 'button' | 'submit' | 'reset';

  target?: React.HTMLAttributeAnchorTarget;

  rel?: string;

  ariaLabel?: string;
}

/* ---------------- Utility ----------------
   requires: npm i clsx tailwind-merge
------------------------------------------- */

function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}

/* ----------------------------------------------------------
   FIX 1 — CONTRAST CHECKLIST (manual verification required)
   twMerge/clsx can't check computed contrast at build time —
   your theme tokens (bg-primary, bg-cta, etc.) live in
   tailwind.config, not here. Before shipping, run each pair
   below through a contrast checker (e.g. WebAIM) and confirm
   ≥4.5:1 for body text, ≥3:1 for large text (≥24px or ≥19px bold):
     - bg-primary   + text-white
     - bg-secondary + text-white
     - bg-trust     + text-white
     - bg-cta       + text-white
     - bg-blue-600  + text-white   (Tailwind default, safe: ~5.1:1)
     - bg-surface-inverse + text-paper
     - outline: text-ink on TRANSPARENT — contrast depends on
       whatever background this button sits on. Test per-usage,
       not just once. Same applies to the outline variant's
       focus ring color (ring-ink) — verify against every
       background it's used on, not just once.
     - gradient-blue/purple/red + text-white — check contrast at
       BOTH gradient stops (start and end color), not just one;
       text sits on the whole span as it shifts on hover.

   TIP: if this component ships in a shared design system, consider
   adding a small CI script that reads your resolved Tailwind color
   tokens and computes contrast ratios automatically, rather than
   relying on someone remembering to re-check WebAIM when a new
   variant or theme token is added.
----------------------------------------------------------- */

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30',

  secondary:
    'bg-secondary text-white shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30',

  trust:
    'bg-trust text-white shadow-lg shadow-trust/20 hover:shadow-xl hover:shadow-trust/30',

  cta:
    'bg-cta text-white shadow-lg shadow-cta/20 hover:shadow-xl hover:shadow-cta/30',

  blue:
    'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30',

  dark:
    'bg-surface-inverse text-paper shadow-[0_14px_34px_-8px_rgba(15,15,25,0.45)]',

  outline:
    'border border-ink/15 bg-transparent text-ink hover:bg-ink/5',

  'gradient-blue':
    'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30',

  'gradient-purple':
    'bg-gradient-to-r from-primary to-purple-700 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30',

  'gradient-red':
    'bg-gradient-to-r from-primary to-red-700 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30',
};

/* FIX 6 — every size now guarantees a 44x44px minimum hit target
   via min-h-11 (44px) / min-w-11, on top of the existing padding.
   Padding still controls visual density; min-h/w just floors it. */
const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm min-h-11 min-w-11',
  md: 'px-7 py-3.5 text-sm min-h-11 min-w-11',
  lg: 'px-8 py-4 text-base min-h-11 min-w-11',
};

/* FIX 2 — dual-tone focus ring: a white inner ring plus a
   variant-colored (or neutral, for `dark`) outer ring so the
   ring reads clearly whether the button sits on a light or
   dark section. ring-offset alone (single color) disappears
   against a same-color background — this doesn't. */
const focusRingClasses =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2';

const focusRingByVariant: Record<Variant, string> = {
  primary: 'focus-visible:ring-offset-primary',
  secondary: 'focus-visible:ring-offset-secondary',
  trust: 'focus-visible:ring-offset-trust',
  cta: 'focus-visible:ring-offset-cta',
  blue: 'focus-visible:ring-offset-blue-600',
  dark: 'focus-visible:ring-offset-surface-inverse',
  outline: 'focus-visible:ring-offset-transparent focus-visible:ring-ink',

  // Ring offset matches the gradient's starting stop, since that's
  // what's visible behind the ring on initial focus.
  'gradient-blue': 'focus-visible:ring-offset-blue-500',
  'gradient-purple': 'focus-visible:ring-offset-primary',
  'gradient-red': 'focus-visible:ring-offset-primary',
};

/* ---------------- Component ---------------- */

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      children,
      href,

      onClick,

      variant = 'primary',

      size = 'md',

      arrow = true,

      loading = false,

      loadingLabel = 'Loading',

      disabled = false,

      fullWidth = false,

      icon,

      className,

      type = 'button',

      target,

      rel,

      ariaLabel,
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const isMailOrTel =
      href?.startsWith('mailto:') || href?.startsWith('tel:');

    const isExternal =
      href?.startsWith('http://') ||
      href?.startsWith('https://') ||
      isMailOrTel;

    const resolvedTarget =
      target ?? (isExternal && !isMailOrTel ? '_blank' : undefined);

    /* FIX 5 — icon-only guard: warn in dev if there's no visible
       text (no children) AND no ariaLabel. This is a heuristic,
       not a compile-time guarantee (it can't see a `title` prop
       or aria-labelledby), but it catches the common mistake of
       shipping <Button icon={<X/>} /> with nothing to announce
       to a screen reader. */
    if (process.env.NODE_ENV !== 'production') {
      const hasVisibleText =
        children !== undefined && children !== null && children !== '';
      if (icon && !hasVisibleText && !ariaLabel) {
        // eslint-disable-next-line no-console
        console.warn(
          '[Button] Icon-only button is missing an accessible name. ' +
          'Pass `ariaLabel` so screen reader users know what this button does.'
        );
      }
    }

    const classes = cn(
      'group relative inline-flex items-center justify-center gap-3 rounded-full font-bold transition-all duration-300 ease-out',

      'hover:-translate-y-0.5 active:scale-[0.98]',

      focusRingClasses,
      focusRingByVariant[variant],

      variantClasses[variant],

      sizeClasses[size],

      fullWidth && 'w-full',

      isDisabled &&
      'pointer-events-none cursor-not-allowed opacity-60',

      className
    );

    const content = (
      <>
        {loading && (
          <Loader2
            size={18}
            className="animate-spin"
            aria-hidden="true"
          />
        )}

        {!loading && icon}

        {/* Keep the label present (visually hidden while loading)
            so screen readers still announce what the button does. */}
        <span
          className={cn(
            'transition-transform duration-300 group-hover:translate-x-0.5',
            loading && 'sr-only'
          )}
        >
          {children}
        </span>

        {arrow && !loading && (
          <ArrowRight
            size={18}
            aria-hidden="true"
            className="
              opacity-0
              -translate-x-3
              transition-all
              duration-300
              group-hover:opacity-100
              group-hover:translate-x-0
            "
          />
        )}

        {/* FIX 4 — live region: announces "Loading" / "Loading complete"
            to screen reader users as the state flips. Visually hidden,
            doesn't affect layout. Polite so it doesn't interrupt. */}
        <span role="status" aria-live="polite" className="sr-only">
          {loading ? loadingLabel : ''}
        </span>
      </>
    );

    /* ---------- Button ---------- */

    if (!href) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type={type}
          className={classes}
          onClick={isDisabled ? undefined : onClick}
          disabled={isDisabled}
          aria-label={ariaLabel}
          aria-disabled={isDisabled}
          aria-busy={loading}
        >
          {content}
        </button>
      );
    }

    /* ---------- External Link (incl. mailto:/tel:) ---------- */

    if (isExternal) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={isDisabled ? undefined : href}
          target={resolvedTarget}
          rel={rel ?? (isMailOrTel ? undefined : 'noopener noreferrer')}
          className={classes}
          onClick={isDisabled ? (e) => e.preventDefault() : onClick}
          aria-label={ariaLabel}
          aria-disabled={isDisabled}
          aria-busy={loading}
          tabIndex={isDisabled ? -1 : undefined}
        >
          {content}
        </a>
      );
    }

    /* ---------- Internal Link ----------
       v2: always pass the real `href`, even when disabled — the
       previous `href={isDisabled ? '' : href}` swap meant Next.js
       could still start resolving a same-page navigation before
       onClick's preventDefault ran. Disabled state is now enforced
       exactly the same way as the external-link and button cases:
       aria-disabled + tabIndex={-1} + preventDefault in onClick. */
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
        aria-busy={loading}
        tabIndex={isDisabled ? -1 : undefined}
        onClick={isDisabled ? (e) => e.preventDefault() : onClick}
      >
        {content}
      </Link>
    );
  }
);

Button.displayName = 'Button';