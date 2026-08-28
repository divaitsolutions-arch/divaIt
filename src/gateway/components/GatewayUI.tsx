"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, animate } from "motion/react";

/* ── Custom Cursor ── */
export const Cursor = () => {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSize = useMotionValue(12);
  const cursorOpacity = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 400, mass: 0.1 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 400, mass: 0.1 });
  const smoothSize = useSpring(cursorSize, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as HTMLElement;
      const isCard = target.closest(".magnetic-card");
      const isLink = target.closest("a") || target.closest("button");
      cursorSize.set(isCard ? 80 : isLink ? 40 : 12);
      cursorOpacity.set(1);
    };
    const hide = () => cursorOpacity.set(0);

    window.addEventListener("mousemove", updateMouse, { passive: true });
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("mouseleave", hide);
    };
  }, [mouseX, mouseY, cursorSize, cursorOpacity]);

  if (!mounted) return null;
  return (
    <motion.div
      style={{ x: smoothX, y: smoothY, width: smoothSize, height: smoothSize, opacity: cursorOpacity, translateX: "-50%", translateY: "-50%" }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white mix-blend-difference"
    />
  );
};

/* ── Counter ── */
export const AnimatedCounter = ({ value }: { value: string }) => {
  const numValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let controls: ReturnType<typeof animate> | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        controls = animate(0, numValue, { duration: 1.5, ease: [0.33, 1, 0.68, 1], onUpdate: (v) => setCount(Math.round(v)) });
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      controls?.stop();
      observer.disconnect();
    };
  }, [numValue]);

  return <span ref={ref}>{count}{suffix}</span>;
};
