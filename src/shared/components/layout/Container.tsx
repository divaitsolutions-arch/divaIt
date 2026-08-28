import { type ReactNode } from 'react';

/**
 * Single source of truth for the site's content column width.
 * Every section (nav, hero, services, footer, etc.) should wrap its
 * content in this instead of hand-rolling `max-w-[...] px-...` —
 * that duplication is what caused the nav/hero misalignment.
 *
 * Values match Navigation.tsx's existing container exactly:
 * `max-w-[1400px] px-6 lg:px-10`
 */
export function Container({
    children,
    className = '',
    as: Component = 'div',
    id,
}: {
    children: ReactNode;
    className?: string;
    as?: React.ElementType;
    id?: string;
}) {
    return (
        <Component id={id} className={`mx-auto w-full max-w-[1400px] px-6 lg:px-12 ${className}`}>
            {children}
        </Component>
    );
}