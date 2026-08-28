"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,

  type Variants,
} from "motion/react";
import { Rocket, GraduationCap } from "lucide-react";
import { gatewayContent } from "@/gateway/config/gateway.content";

/* ─── Shared easing ─── */
const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Variants ─── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease },
  },
};

/* Stagger wrapper for inner card content */
const innerStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
};

const letterPop: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease },
  },
};

const wordSlide: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
};

/* ─── Magnetic Tilt Card ─── */
function MagneticCard({
  children,
  className,
  accentColor,
}: {
  children: React.ReactNode;
  className?: string;
  accentColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
    damping: 20,
    stiffness: 150,
  });
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, ${accentColor}15 0%, transparent 60%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className={`relative h-full [backface-visibility:hidden] [-webkit-font-smoothing:antialiased] ${className ?? ""}`}
    >
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-none"
        style={{ background: glareBackground }}
      />
      {children}
    </motion.div>
  );
}

/* ─── Floating Particles ─── */
const PARTICLE_CONFIGS = [
  { size: 3, x: 15, y: 25, duration: 5, delay: 0 },
  { size: 2.5, x: 40, y: 60, duration: 6.5, delay: 1.2 },
  { size: 4, x: 65, y: 15, duration: 4.5, delay: 0.6 },
  { size: 2, x: 80, y: 45, duration: 7, delay: 2.1 },
  { size: 3.5, x: 30, y: 80, duration: 5.5, delay: 1.8 },
  { size: 2.5, x: 55, y: 35, duration: 6, delay: 0.9 },
];

function FloatingParticles({ color }: { color: string }) {
  return (
    <>
      {PARTICLE_CONFIGS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none z-20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: color,
          }}
          whileInView={{
            y: [0, -20, 0],
            opacity: [0, 0.7, 0],
            scale: [0.5, 1, 0.5],
          }}
          viewport={{ once: false }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/* ─── Animated Reveal Line ─── */
function RevealLine({ color }: { color: string }) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[2px] z-20 pointer-events-none"
      style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      initial={{ width: "0%", opacity: 0 }}
      whileInView={{ width: "100%", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease, delay: 0.8 }}
    />
  );
}

/* ─── External Link Icon (Arrow pops out on hover) ─── */
function HoverExternalLink({ className }: { className?: string }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`overflow-visible ${className ?? ""}`}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <g className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </g>
    </svg>
  );
}

/* ─── Letter-by-letter typing ─── */
function TypedLetters({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
      }}
      className="flex"
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterPop}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ─── Word-by-word description ─── */
function TypedWords({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      className="text-ink/70 text-base md:text-lg leading-relaxed max-w-lg group-hover:text-ink transition-colors duration-300"
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={wordSlide}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ─── Infinite character-by-character typewriter title ─── */
function TypedTitle({
  text,
  cursorColor,
  colorClass,
  textGradientClass,
  initialDelay = 0,
}: {
  text: string;
  cursorColor: string;
  colorClass?: string;
  textGradientClass?: string;
  initialDelay?: number;
}) {
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"waiting" | "typing" | "hold">("waiting");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "waiting") {
      timer = setTimeout(() => setPhase("typing"), initialDelay);
    } else if (phase === "typing") {
      if (charIndex < text.length) {
        timer = setTimeout(() => setCharIndex((c) => c + 1), 60);
      } else {
        timer = setTimeout(() => setPhase("hold"), 0); // Stay in hold phase forever once typed
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, phase, text.length, initialDelay]);

  return (
    <motion.h2
      variants={fadeUp}
      className={`relative text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 transition-colors duration-300 w-fit`}
    >
      {/* Spacer — reserves space; completely invisible in both themes */}
      <span className="text-transparent box-decoration-clone px-4 py-1.5 block w-fit select-none" aria-hidden="true">
        {text}
      </span>
      {/* Visible typed text overlaid on top */}
      <motion.span 
        className={`absolute inset-0 px-4 py-1.5 ${textGradientClass ? `${textGradientClass} bg-[length:300%_auto] bg-clip-text text-transparent` : colorClass}`}
        animate={phase === "hold" && textGradientClass ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : { backgroundPosition: "0% 50%" }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        {text.slice(0, charIndex)}
        {phase !== "hold" && (
          <span
            className="inline-block w-[3px] h-[0.8em] align-middle ml-0.5 rounded-sm animate-cursor"
            style={{ backgroundColor: cursorColor }}
          />
        )}
      </motion.span>
    </motion.h2>
  );
}

/* ═══════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════ */
export function GatewayCards() {
  const { agency, academy } = gatewayContent;

  return (
    <section className="w-full border-t border-b border-ink/10 bg-paper overflow-hidden relative z-20">
      {/* Staggered container for the two cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] divide-y md:divide-y-0 md:divide-x divide-ink/10"
      >
        {/* ── Agency Gateway ── */}
        <motion.div variants={cardVariants} data-brand="agency">
          <MagneticCard accentColor="#ef4444" className="group">
            {/* Ambient glow */}
            <motion.div
              className="absolute inset-0 bg-primary/20 hidden pointer-events-none"
              whileInView={{ opacity: [0.05, 0.25, 0.05] }}
              viewport={{ once: false }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <FloatingParticles color="rgba(239,68,68,0.15)" />
            <RevealLine color="#ef4444" />

            <Link
              href={agency.href}
              className="group block h-full p-10 md:p-16 relative overflow-hidden transition-all duration-500"
            >
              {/* Hover wash */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

              {/* Staggered inner content */}
              <motion.div
                variants={innerStagger}
                className="relative z-10 h-full flex flex-col"
              >
                {/* Header row */}
                <motion.div
                  variants={fadeUp}
                  className="flex justify-between items-center mb-6 md:mb-8"
                >
                  <span className="text-base md:text-lg font-bold tracking-[0.2em] text-primary uppercase flex items-center gap-2.5">
                    <Rocket size={20} className="text-primary" />
                    <TypedLetters text="AGENCY" delay={0.2} />
                  </span>
                  <HoverExternalLink className="text-primary/70 group-hover:text-primary transition-colors duration-500" />
                </motion.div>

                {/* Title + Description */}
                <div className="mt-12 md:mt-16">
                  <TypedTitle
                    text={agency.title}
                    cursorColor="#ef4444"
                    textGradientClass="bg-gradient-to-r from-red-400 via-orange-400 to-red-400"
                    initialDelay={900}
                  />
                  <motion.div variants={fadeUp}>
                    <TypedWords text={agency.description} delay={2.1} />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </MagneticCard>
        </motion.div>

        {/* ── Academy Gateway ── */}
        <motion.div variants={cardVariants} data-brand="academy">
          <MagneticCard accentColor="#9333ea" className="group">
            {/* Ambient glow */}
            <motion.div
              className="absolute inset-0 bg-primary/20 hidden pointer-events-none"
              whileInView={{ opacity: [0.05, 0.25, 0.05] }}
              viewport={{ once: false }}
              transition={{
                duration: 7,
                delay: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <FloatingParticles color="rgba(147,51,234,0.15)" />
            <RevealLine color="#9333ea" />

            <Link
              href={academy.href}
              className="group block h-full p-10 md:p-16 relative overflow-hidden transition-all duration-500"
            >
              {/* Hover wash */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

              {/* Staggered inner content */}
              <motion.div
                variants={innerStagger}
                className="relative z-10 h-full flex flex-col"
              >
                {/* Header row */}
                <motion.div
                  variants={fadeUp}
                  className="flex justify-between items-center mb-6 md:mb-8"
                >
                  <span className="text-base md:text-lg font-bold tracking-[0.2em] text-primary uppercase flex items-center gap-2.5">
                    <GraduationCap size={20} className="text-primary" />
                    <TypedLetters text="ACADEMY" delay={0.4} />
                  </span>
                  <HoverExternalLink className="text-primary/70 group-hover:text-primary transition-colors duration-500" />
                </motion.div>

                {/* Title + Description */}
                <div className="mt-12 md:mt-16">
                  <TypedTitle
                    text={academy.title}
                    cursorColor="#9333ea"
                    textGradientClass="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400"
                    initialDelay={1200}
                  />
                  <motion.div variants={fadeUp}>
                    <TypedWords text={academy.description} delay={3.2} />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </MagneticCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
