# Diva IT Solution Architecture

This document outlines the architectural standards and conventions for the Diva IT Solution platform.

## Directory Structure (Feature-Based)

We use a domain-driven, feature-based directory structure to isolate business verticals.

- `src/features/academy/` - All code specific to the IT Academy (courses, mentors, etc.)
- `src/features/agency/` - All code specific to the IT Agency (services, portfolio, etc.)
- `src/features/academy/enrollment/` - Enrollment wizard and modals.
- `src/shared/` - Global components, utilities, and configuration used across multiple features.

## Animation Contract

We use two animation libraries for specific use cases to optimize performance and bundle size.

### Framer Motion (`motion/react`)
Use for:
- Layout animations (e.g., expanding navigation menus)
- Presence transitions (`<AnimatePresence>`)
- Complex gestural interactions (drag, swipe)

### GSAP (`gsap` + `ScrollTrigger`)
Use for:
- Scroll-triggered reveals (`useScrollReveal`)
- Complex timelines requiring precise choreography
- Parallax effects

**Rule:** Never call `gsap.registerPlugin(ScrollTrigger)` directly in components. Always use the `useGSAP()` hook from `@/shared/animations/gsap-init`.

## State Management
- Global state should be minimal. Use React Context only for cross-cutting concerns (e.g., `EnrollmentModalContext`, `ThemeProvider`).
- Colocate state as close to where it's used as possible.

## Content Configuration
- Static content lives in `config/` within the relevant feature (e.g., `src/features/academy/config/`).
- Never import React components (like icons) directly into data files. Use string identifiers and resolve them at render time via `resolveIcon()` in `src/shared/lib/icons.ts`.
- Content schemas are validated with Zod (see `disciplines.schema.ts`, `individual-courses.schema.ts`). New content types should follow the same pattern.

## Styling
- Use Tailwind CSS with semantic design tokens defined in `globals.css`.
- Prefer design-system tokens over arbitrary values. Arbitrary values (e.g., `text-[13px]`) are acceptable for fine-grained sizing that doesn't warrant a new token.
- Avoid inline `<style>` tags. If complex keyframes are needed, define them in `globals.css` or Tailwind config.
