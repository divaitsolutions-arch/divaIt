'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { Container } from '@/shared/components/layout/Container';

export default function AcademyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in a real app
    console.error('Academy CMS Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Container>
        <div className="mx-auto max-w-md rounded-2xl border border-ink/10 bg-paper p-8 shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mb-3 font-display text-2xl font-bold text-ink">
            Something went wrong
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-steel">
            We couldn't load the academy courses right now. This is usually a temporary issue with our content system.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-paper transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            >
              <RefreshCcw size={16} />
              Try again
            </button>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-full border border-ink/10 px-6 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-ink/5"
            >
              <ArrowLeft size={16} />
              Go home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
