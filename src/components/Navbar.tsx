"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const NAV_ITEMS = ["Home", "About", "Experience", "Projects", "Skills", "Contact"];

const MagneticLink = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="group relative text-[9.5px] uppercase tracking-[0.5em] font-bold text-white/60 hover:text-white transition-all duration-500 px-3 py-2 torch-trigger"
    >
      <span className="relative z-10">{children}</span>
      <motion.span 
        className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </motion.a>
  );
};

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none"
    >
      <div className={`
        mt-6 px-8 py-3 rounded-full flex items-center gap-1.5 md:gap-3 pointer-events-auto transition-all duration-500
        backdrop-blur-md border shadow-2xl
        ${scrolled 
          ? "bg-black/85 border-white/15 scale-95 shadow-[0_8px_32px_rgba(0,0,0,0.6)]" 
          : "bg-black/50 border-white/10"}
      `}>
        {NAV_ITEMS.map((item) => (
          <MagneticLink key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </MagneticLink>
        ))}
      </div>
    </motion.nav>
  );
};
