'use client';

import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';

export interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  autoScrollInterval?: number;
  accentColorClass?: string;
  className?: string;
  gap?: string;
  bleed?: boolean;
  continuous?: boolean;
}

export function Carousel<T>({
  items,
  renderItem,
  keyExtractor,
  autoScrollInterval = 3000,
  accentColorClass = 'bg-secondary',
  className = '',
  gap = 'gap-5',
  bleed = true,
  continuous = false,
}: CarouselProps<T>) {
  // If continuous, we might need 3 sets to ensure smooth loop without gap jumps
  const extendedItems = continuous ? [...items, ...items, ...items] : [...items, ...items];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef<1 | -1>(1);
  const activeIndexRef = useRef(0);
  const isAutoScrollingRef = useRef(false);

  // We determine the max possible index based on viewport
  const [maxIndex, setMaxIndex] = useState(items.length - 1);

  const calculateMaxIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const cards = container.querySelectorAll<HTMLElement>('.carousel-card');
    let maxIdx = items.length - 1;
    
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].offsetLeft >= maxScrollLeft - 10) {
        maxIdx = i;
        break;
      }
    }
    // Cap maxIndex to the original items length for pagination
    setMaxIndex(Math.min(maxIdx, items.length - 1));
  }, [items.length]);

  useEffect(() => {
    calculateMaxIndex();
    window.addEventListener('resize', calculateMaxIndex);
    return () => window.removeEventListener('resize', calculateMaxIndex);
  }, [calculateMaxIndex]);

  const handleScroll = useCallback(() => {
    if (isAutoScrollingRef.current || continuous) return;

    const container = scrollRef.current;
    if (!container) return;

    const containerLeft = container.getBoundingClientRect().left;
    const cards = container.querySelectorAll<HTMLElement>('.carousel-card');
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, i) => {
      // Only consider cards up to maxIndex
      if (i > maxIndex) return;
      const distance = Math.abs(card.getBoundingClientRect().left - containerLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    setActiveIndex(closestIndex);
    activeIndexRef.current = closestIndex;

    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
    const isAtStart = container.scrollLeft <= 10;

    if (isAtStart) {
      directionRef.current = 1;
    } else if (isAtEnd) {
      directionRef.current = -1;
    }
  }, [maxIndex, continuous]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('.carousel-card');
    const card = cards[index];
    if (!card) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const targetScrollLeft = card.offsetLeft;

    isAutoScrollingRef.current = true;
    container.style.scrollSnapType = 'none';
    
    container.scrollTo({ 
      left: Math.min(targetScrollLeft, maxScrollLeft), 
      behavior 
    });

    activeIndexRef.current = index;
    setActiveIndex(index);

    const onDone = () => {
      if (container) container.style.scrollSnapType = 'x mandatory';
      isAutoScrollingRef.current = false;
    };

    if ('onscrollend' in window && behavior === 'smooth') {
      container.addEventListener('scrollend', onDone, { once: true });
      setTimeout(() => {
        isAutoScrollingRef.current = false;
        if (container) container.style.scrollSnapType = 'x mandatory';
      }, 1200);
    } else {
      setTimeout(onDone, behavior === 'smooth' ? 600 : 50);
    }
  }, []);

  useEffect(() => {
    if (isPaused || autoScrollInterval <= 0 || continuous) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      // Continuous forward loop
      const nextIndex = activeIndexRef.current + 1;

      scrollTo(nextIndex, 'smooth');

      // If we've smoothly scrolled into the cloned set (e.g., reaching what looks like index 0 again)
      if (nextIndex >= items.length) {
        // Wait for the smooth scroll to finish, then instantly teleport back to the real index 0 
        // to maintain the illusion of an infinite loop without hitting the end of the scroll container.
        setTimeout(() => {
          const targetIndex = nextIndex % items.length;
          scrollTo(targetIndex, 'instant');
        }, 800); // 800ms is safely longer than the smooth scroll duration
      }
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [isPaused, maxIndex, autoScrollInterval, scrollTo, items.length, continuous]);

  // Continuous Marquee Loop
  useEffect(() => {
    if (!continuous || isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const container = scrollRef.current;
      if (!container) return;

      const deltaTime = time - lastTime;
      lastTime = time;

      // Move at roughly 50px per second
      container.scrollLeft += (deltaTime * 0.05);

      // We added 3 sets, so the original set width is container.scrollWidth / 3.
      // When we scroll past the first set, we seamlessly loop back.
      const singleSetWidth = container.scrollWidth / 3;
      if (container.scrollLeft >= singleSetWidth) {
        container.scrollLeft -= singleSetWidth;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [continuous, isPaused]);

  return (
    <div className={className}>
      <div 
        className={`relative ${bleed ? '-mr-6 lg:-mr-12' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className={`scrollbar-hide relative flex ${!continuous ? 'snap-x snap-mandatory' : ''} ${gap} overflow-x-auto pb-8 ${bleed ? 'pr-12' : ''}`}
          style={{ scrollBehavior: 'auto' }}
        >
          {extendedItems.map((item, index) => {
            const realIndex = index % items.length;
            return (
              <div key={`${keyExtractor(item, realIndex)}-${index}`} className={`carousel-card shrink-0 ${!continuous ? 'snap-start' : ''}`}>
                {renderItem(item, realIndex)}
              </div>
            );
          })}
        </div>
      </div>

      {maxIndex > 0 && !continuous && (
        <div className="mt-2 flex gap-2" role="tablist" aria-label="Carousel pagination">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeIndex % items.length === index}
              aria-label={`Show item ${index + 1}`}
              onClick={() => scrollTo(index, 'smooth')}
              className={`h-2 rounded-full transition-all ${
                activeIndex % items.length === index ? `w-8 ${accentColorClass}` : 'w-2 bg-ink/15 hover:bg-ink/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
