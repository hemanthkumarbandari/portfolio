"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const TorchCursor: React.FC = () => {
  const [isHoveringTrigger, setIsHoveringTrigger] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

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

  if (typeof window === "undefined") return null;

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
        {/* Glow Effect */}
        <motion.div
          animate={{
            scale: isHoveringTrigger ? 2.5 : 1.5,
            opacity: isHoveringTrigger ? 0.7 : 0.4,
          }}
          className="absolute w-48 h-48 rounded-full bg-[radial-gradient(circle,_rgba(255,200,50,0.4)_0%,_rgba(255,150,0,0)_70%)] blur-2xl"
          style={{
            left: -24, // Offset to align with torch tip
            top: -24,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Torch Image/SVG */}
        <div 
          className="absolute rotate-[-15deg]"
          style={{
            left: -15, // Offset so the tip is at the mouse point
            top: -10,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_8px_rgba(255,150,0,0.6)]"
          >
            {/* Wooden Handle */}
            <path
              d="M15 25 L25 35 L30 30 L20 20 Z"
              fill="#5D4037"
            />
            <path
              d="M18 22 L22 26 L27 21 L23 17 Z"
              fill="#795548"
            />
            {/* Torch Tip/Metal Part */}
            <rect
              x="12"
              y="12"
              width="10"
              height="10"
              transform="rotate(-45 12 12)"
              fill="#424242"
            />
            {/* Flame/Glow at the tip */}
            <motion.path
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              d="M10 10 L15 4 L20 10 L15 16 Z"
              fill="#FFD600"
            />
            <motion.path
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 0.25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1,
              }}
              d="M12 12 L15 7 L18 12 L15 17 Z"
              fill="#FF8F00"
            />
          </svg>
        </div>
      </motion.div>
    </>
  );
};
