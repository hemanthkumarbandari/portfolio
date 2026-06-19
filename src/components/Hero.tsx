"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { TorchlightBackground } from "./TorchlightBackground";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const MagneticButton = ({ children, className, primary = false }: { children: React.ReactNode, className?: string, primary?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 12, stiffness: 120 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative pointer-events-auto"
    >
      <button className={`
        group relative px-10 py-4 rounded-sm transition-all duration-700 overflow-hidden flex items-center gap-3 torch-trigger
        ${primary 
          ? "bg-[#f2f2f2] text-black hover:bg-white" 
          : "bg-transparent border border-white/20 text-white/70 hover:text-white hover:border-white/40"}
        ${className}
      `}>
        <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold">
          {children}
        </span>
        {primary && (
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
        )}
      </button>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-[#010103] flex flex-col items-center justify-center">
      {/* Cinematic Atmosphere */}
      <div className="ambient-blue-glow" />
      <div className="ambient-fog" />
      <div className="noise-bg" />
      <TorchlightBackground />

      {/* Main Content */}
      <div className="relative z-[50] w-full max-w-7xl px-6 md:px-24 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 pt-24 md:pt-12 h-full pointer-events-none">
        
        {/* Left Column (Bio & Text details) */}
        <div className="flex flex-col text-left justify-center w-full md:w-[58%] max-w-3xl h-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="text-white/60 uppercase tracking-[0.6em] text-[10px] font-bold">
              AI/ML ENGINEER • FULL-STACK DEVELOPER
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-0"
          >
            <h1 className="text-5xl md:text-[80px] lg:text-[92px] font-medium text-white tracking-[-0.05em] leading-[0.9] inline-block">
              Hemanth Kumar
            </h1>
            <h1 className="text-5xl md:text-[80px] lg:text-[92px] font-bold text-white tracking-[-0.05em] leading-[0.9] inline-block">
              Bandari
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-lg"
          >
            <p className="text-[14px] md:text-[15px] text-white/70 leading-relaxed tracking-wide font-light">
              I architect intelligent digital systems and scalable web applications 
              at the intersection of AI and modern engineering. Focused on performance, 
              scalability, and immersive user experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex items-center gap-8"
          >
            <a href="#projects" className="pointer-events-auto">
              <MagneticButton primary>
                View Projects <ArrowUpRight size={14} />
              </MagneticButton>
            </a>
            
            <a href="#contact" className="pointer-events-auto">
              <MagneticButton>
                Contact Me <ArrowRight size={14} />
              </MagneticButton>
            </a>
          </motion.div>
        </div>

        {/* Right Column (Floating Premium Profile Photo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center md:justify-end w-full md:w-[38%] mt-8 md:mt-0 pb-16 md:pb-0 pointer-events-auto"
        >
          {/* Stunning atmospheric radial glow behind the photo */}
          <div className="absolute w-[260px] h-[260px] md:w-[360px] md:h-[360px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.035)_0%,_rgba(255,255,255,0)_75%)] pointer-events-none blur-xl animate-pulse-slow" />
          
          {/* Card frame */}
          <motion.div
            animate={{ 
              y: [0, -12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="group relative torch-trigger w-[220px] h-[280px] md:w-[280px] md:h-[360px] rounded-sm overflow-hidden border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-md shadow-2xl transition-all duration-700 hover:border-white/[0.18] hover:shadow-[0_0_50px_rgba(255,255,255,0.03)]"
          >
            {/* The Photo */}
            <Image 
              src="/profile.jpeg" 
              alt="Hemanth Kumar Bandari" 
              fill
              priority
              sizes="(max-width: 768px) 220px, 280px"
              className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-1000 ease-out filter grayscale group-hover:grayscale-0 contrast-[1.08] brightness-[0.95]"
            />
            
            {/* Neon atmospheric gradients & overlay scanline effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-700" />
            
            {/* Sub-UI Info Details */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 pointer-events-none">
              <span className="text-[9px] text-white font-bold tracking-[0.25em] uppercase opacity-90 transition-all duration-500 group-hover:text-amber-200">
                SYSTEM_OPERATOR
              </span>
              <span className="text-[7.5px] text-white/55 tracking-[0.12em] font-mono">
                PORTFOLIO // CODENAME: HE MANTH
              </span>
            </div>
            
            {/* Ambient inner glow highlight */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none" />
          </motion.div>
        </motion.div>

      </div>

      {/* Absolute Branding Logo (Top Left) */}
      <div className="absolute top-8 left-8 md:left-20 z-[60] pointer-events-auto">
        <a href="#home">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white hover:bg-white/90 shadow-lg cursor-pointer transition-all duration-300 torch-trigger"
          >
            <span className="text-black text-sm font-black pointer-events-none">H</span>
          </motion.div>
        </a>
      </div>

      {/* Standalone Scroll Indicator (Bottom Right) */}
      <div className="absolute bottom-12 right-8 md:right-20 z-[60] pointer-events-none hidden md:flex flex-col items-center gap-4">
        <span className="text-[9px] text-white/40 uppercase tracking-[0.5em] font-bold whitespace-nowrap rotate-90 origin-right translate-x-[50%] translate-y-[-100%]">
          Scroll to Explore
        </span>
        <div className="relative w-[1px] h-16 bg-white/10 overflow-hidden mt-6">
          <motion.div 
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white/30"
          />
        </div>
      </div>

      {/* Subtle Depth Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/40 pointer-events-none z-[10]" />
    </section>
  );
};
