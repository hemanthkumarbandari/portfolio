"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const TorchCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isHoveringTrigger, setIsHoveringTrigger] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isTrigger = target.closest(".torch-trigger") !== null;
      setIsHoveringTrigger(isTrigger);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Wide ambient spotlight */}
        <motion.div
          animate={{
            scale: isHoveringTrigger ? 1.2 : 1,
            opacity: isHoveringTrigger ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_0%,_rgba(255,255,255,0.02)_40%,_transparent_70%)] blur-[60px]"
          style={{
            left: "-400px",
            top: "-400px",
          }}
        />

        {/* Mid-range cool glow */}
        <motion.div
          animate={{
            scale: isHoveringTrigger ? 1.5 : 1,
            opacity: isHoveringTrigger ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(186,230,253,0.3)_0%,_rgba(125,211,252,0.1)_50%,_transparent_80%)] blur-[30px]"
          style={{
            left: "-150px",
            top: "-150px",
          }}
        />

        {/* Core intense light source */}
        <motion.div
          animate={{
            scale: isHoveringTrigger ? 1.5 : 1,
            opacity: isHoveringTrigger ? 1 : 0.7,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute w-[80px] h-[80px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_0%,_rgba(255,255,255,0.4)_40%,_transparent_80%)] blur-[8px]"
          style={{
            left: "-40px",
            top: "-40px",
          }}
        />

        {/* Tiny crisp dot for precision */}
        <motion.div 
          animate={{
            scale: isHoveringTrigger ? 0 : 1,
            opacity: isHoveringTrigger ? 0 : 1,
          }}
          className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1)]"
          style={{
            left: "-4px",
            top: "-4px",
          }}
        />
      </motion.div>
    </>
  );
};
