'use client';

import { motion, Variants } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinaleCTAButtons() {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const buttonSlide: Variants = {
    hidden: { opacity: 0, x: 80, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col gap-5 w-full md:w-auto"
    >
      <motion.div variants={buttonSlide}>
        <Link href="/agency/contact" className="group relative flex w-full md:w-[280px] p-[1px] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/40">
          {/* Moving Radial Glow (GPU Accelerated) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div
              className="absolute inset-0"
              whileInView={{
                x: ["0%", "100%", "100%", "0%", "0%"],
                y: ["0%", "0%", "100%", "100%", "0%"]
              }}
              viewport={{ once: false }}
              transition={{ duration: 4, ease: "linear", times: [0, 0.41, 0.5, 0.91, 1], repeat: Infinity }}
            >
              <div
                className="absolute w-[150px] h-[150px] -left-[75px] -top-[75px]"
                style={{ background: "radial-gradient(circle, #ffffff 0%, #ef4444 30%, transparent 60%)" }}
              />
            </motion.div>
          </div>

          {/* Button body */}
          <div className="relative z-10 flex w-full items-center justify-between gap-8 bg-gradient-to-br from-red-700 to-red-900 px-8 py-5 text-white rounded-[15px]">
            <span className="inline-flex text-base font-bold uppercase tracking-widest text-transparent bg-clip-text bg-[length:200%_auto] bg-[linear-gradient(110deg,rgba(255,255,255,1)_40%,#ffffff_50%,rgba(255,255,255,1)_60%)] animate-[text-shimmer_3s_linear_infinite]">
              Hire Us
            </span>
            <ArrowRight size={26} className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </div>
        </Link>
      </motion.div>

      <motion.div variants={buttonSlide}>
        <Link href="/academy" className="group relative flex w-full md:w-[280px] p-[1px] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/40">
          {/* Moving Radial Glow (GPU Accelerated) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div
              className="absolute inset-0"
              whileInView={{
                x: ["0%", "0%", "100%", "100%", "0%"],
                y: ["0%", "100%", "100%", "0%", "0%"]
              }}
              viewport={{ once: false }}
              transition={{ duration: 4, ease: "linear", times: [0, 0.09, 0.5, 0.59, 1], repeat: Infinity }}
            >
              <div
                className="absolute w-[150px] h-[150px] -left-[75px] -top-[75px]"
                style={{ background: "radial-gradient(circle, #ffffff 0%, #9333ea 30%, transparent 60%)" }}
              />
            </motion.div>
          </div>

          {/* Button body */}
          <div className="relative z-10 flex w-full items-center justify-between gap-8 bg-gradient-to-br from-purple-700 to-purple-900 px-8 py-5 text-white rounded-[15px]">
            <span className="inline-flex text-base font-bold uppercase tracking-widest text-transparent bg-clip-text bg-[length:200%_auto] bg-[linear-gradient(110deg,rgba(255,255,255,1)_40%,#ffffff_50%,rgba(255,255,255,1)_60%)] animate-[text-shimmer_3s_linear_infinite]">
              Join Academy
            </span>
            <ArrowRight size={26} className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
