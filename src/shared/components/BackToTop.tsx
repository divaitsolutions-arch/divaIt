'use client';

import { useEffect, useState } from 'react';
import { ChevronsUp } from 'lucide-react';

/**
 * A premium "Back to Top" floating button.
 * - Hidden on the root gateway page (/)
 * - Appears after scrolling 400px on all other pages
 * - Smooth-scrolls to top on click
 */
export function BackToTop() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ink/40 backdrop-blur-md border border-white/10 text-white shadow-lg shadow-black/20 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-primary/25 hover:bg-primary/80 hover:border-primary/50 active:scale-95 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <ChevronsUp size={26} strokeWidth={2.5} className="animate-scroll-up" />
    </button>
  );
}
