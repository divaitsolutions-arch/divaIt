"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

// Suppress the React 19 script warning caused by next-themes, and Sanity Studio hydration bugs
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string') {
      const msg = args[0];
      
      // Always suppress next-themes script warning
      if (msg.includes('Encountered a script tag')) {
        return;
      }

      // Only suppress Sanity Studio's internal styled-components hydration bugs if we are in the studio
      if (
        window.location.pathname.startsWith('/studio') &&
        (msg.includes('cannot be a descendant of <p>') || msg.includes('<p> cannot contain a nested'))
      ) {
        return;
      }
    }
    orig.apply(console, args);
  };
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
