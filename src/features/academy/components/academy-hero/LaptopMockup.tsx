"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import DashboardUI from "./DashboardUI";

/**
 * 3D MacBook-style mockup with subtle mouse-parallax.
 * Renders the DashboardUI inside the screen.
 */
export default function LaptopMockup() {
  const laptopRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const x = useTransform(springX, (v) => Math.round(v * 8));
  const y = useTransform(springY, (v) => Math.round(v * 8));
  const rotateY = useTransform(springX, (v) => -4 + v * 4);
  const rotateX = useTransform(springY, (v) => 6 - v * 4);

  /* ── Mouse parallax — subtle tilt following cursor ── */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const laptop = laptopRef.current;
      if (!laptop) return;

      const rect = laptop.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      mouseX.set(dx);
      mouseY.set(dy);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative z-10 mx-auto w-full max-w-[380px] perspective-[2000px] pt-8 lg:max-w-[420px] lg:pt-0">
      <motion.div
        ref={laptopRef}
        className="preserve-3d [backface-visibility:hidden] [-webkit-font-smoothing:antialiased]"
        style={{ x, y, rotateY, rotateX, rotateZ: 0 }}
      >
        <div className="relative preserve-3d">
          {/* Screen lid */}
          <div className="relative z-20 aspect-[16/10] w-full overflow-hidden rounded-t-[16px] border-[10px] border-[#1a1a1e] bg-[#1a1a1e] shadow-[0_-4px_30px_rgba(0,0,0,0.15)] sm:rounded-t-[20px] sm:border-[14px]">
            <div className="absolute top-0 left-1/2 z-30 h-[6px] w-[60px] -translate-x-1/2 rounded-b-lg bg-[#1a1a1e] sm:h-2 sm:w-20">
              <div className="mx-auto mt-[2px] h-1 w-1 rounded-full bg-[#2a2a2e] sm:mt-1 sm:h-1.5 sm:w-1.5" />
            </div>
            <div className="relative h-full w-full overflow-hidden rounded-[4px] sm:rounded-md">
              <DashboardUI />
            </div>
          </div>

          {/* Keyboard base */}
          <div className="relative z-10 mx-auto h-[10px] w-[107%] -translate-x-[3.27%] rounded-b-[10px] bg-gradient-to-b from-[#c8c8cc] via-[#b8b8bc] to-[#a8a8ac] shadow-[0_8px_30px_rgba(0,0,0,0.25),0_2px_4px_rgba(0,0,0,0.1)] sm:h-[14px] sm:rounded-b-[14px]">
            <div className="mx-auto h-[5px] w-[18%] rounded-b-md bg-[#a0a0a4] sm:h-[7px]" />
          </div>

          {/* Shadow beneath laptop */}
          <div className="mx-auto h-1 w-[90%] rounded-full bg-black/10 blur-md" />
        </div>
      </motion.div>
    </div>
  );
}
