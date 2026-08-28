"use client";

import { useEffect, useState } from "react";
import { motion, useTransform, useMotionValue, useScroll } from "motion/react";

/* ── Noise Overlay ── */
export const NoiseLayer = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-[0.03]"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
  />
);

/* ── Abstract 3D Tech Globe ── */
export const FixedGlassSphere = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [size, setSize] = useState({ w: 1000, h: 1000 });

  useEffect(() => {
    const timer = setTimeout(() => setSize({ w: window.innerWidth, h: window.innerHeight }), 0);
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  const x = useTransform(mouseX, [0, size.w], [-20, 20]);
  const y = useTransform(mouseY, [0, size.h], [-20, 20]);

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none flex items-center justify-center overflow-hidden" aria-hidden="true">
      <motion.div style={{ x, y }} className="relative flex items-center justify-center">
        
        {/* Wireframe Globe */}
        <div className="relative w-72 h-72 md:w-96 md:h-96" style={{ perspective: '1200px' }}>
          <div className="absolute inset-0 globe-wrapper">
             {/* Meridians (Vertical rings) */}
             {Array.from({ length: 12 }).map((_, i) => (
               <div key={`m-${i}`} className="globe-meridian" style={{ transform: `rotateY(${i * 15}deg)` }} />
             ))}
             
             {/* Parallels (Horizontal rings) */}
             {Array.from({ length: 11 }).map((_, i) => {
               // 11 parallels: -75 to +75 degrees
               const angle = (i - 5) * 15; 
               if (angle === 90 || angle === -90) return null;
               
               const scale = Math.cos(angle * Math.PI / 180);
               const transY = Math.sin(angle * Math.PI / 180) * 50;
               
               return (
                 <div 
                   key={`p-${i}`} 
                   className="globe-parallel" 
                   style={{ transform: `translateY(${transY}%) rotateX(90deg) scale(${scale})` }} 
                 />
               );
             })}
          </div>

          {/* Ambient Glow */}
          <div className="absolute inset-[15%] rounded-full bg-gradient-to-tr from-primary/40 to-primary/40 hidden mix-blend-screen" />
        </div>

      </motion.div>
    </div>
  );
};

/* ── Parallax Blobs ── */
export const ParallaxBlobs = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 300]);
  const y3 = useTransform(scrollY, [0, 2000], [0, -200]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <motion.div style={{ y: y1 }} animate={{ x: [0, 40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] h-[1200px] w-[1200px] rounded-full bg-purple-600/35 hidden" />
      <motion.div style={{ y: y2 }} animate={{ x: [0, -40, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[-20%] h-[900px] w-[900px] rounded-full bg-blue-600/35 hidden" />
      <motion.div style={{ y: y3 }} animate={{ x: [0, 60, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[20%] h-[1000px] w-[1000px] rounded-full bg-pink-600/25 hidden" />
    </div>
  );
};

/* ── Particles ── */
export const Particles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles] = useState(() => Array.from({ length: 40 }).map(() => ({
    sz: Math.random() * 2.5 + 1.5,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * -20,
  })));

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white/40"
          style={{ width: p.sz, height: p.sz, left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [0, -100, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
};
