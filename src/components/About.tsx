"use client";

import React from "react";
import { motion } from "framer-motion";

export const About: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-48 px-6 flex flex-col items-center justify-center bg-black">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-20"
        >
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.6em] text-white/50 font-bold">Background</span>
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-[0.95] uppercase">
              Merging Intelligence <br />
              <span className="text-white/60 italic">with Architecture.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <p className="text-[14px] text-white/70 leading-relaxed font-light tracking-wide">
              I am a Computer Science student specializing in AI/ML and Full-Stack 
              development. My approach is defined by a commitment to engineering 
              systems that are as intelligent as they are scalable.
            </p>
            <p className="text-[14px] text-white/70 leading-relaxed font-light tracking-wide">
              From architecting deep learning pipelines to crafting immersive digital 
              interfaces, I work at the edge of modern technology to build solutions 
              that solve complex real-world challenges with precision.
            </p>
          </div>

          <div className="pt-20 border-t border-white/[0.05] grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { label: "Focus", value: "AI/ML Systems" },
              { label: "Education", value: "Computer Science" },
              { label: "Domain", value: "Full-Stack Dev" },
              { label: "Drive", value: "Scalable Logic" }
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-3">
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-bold">{item.label}</span>
                <span className="text-[11px] text-white/80 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
