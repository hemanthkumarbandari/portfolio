"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

const EXPERIENCES = [
  {
    company: "CONSISTENCY.AI",
    role: "AI/ML Intern",
    period: "2024 - Present",
    bullets: [
      "Optimizing neural network architectures for real-time consistency scoring, reducing inference latency by 25% in large-scale AI pipelines.",
      "Architecting RAG-based systems utilizing Pinecone and LangChain to improve context-aware data retrieval precision for enterprise-scale LLM applications.",
    ],
  },
  {
    company: "VAIBHAVAMH",
    role: "Web Developer",
    period: "2023 - 2024",
    bullets: [
      "Designed high-performance PostgreSQL schemas and implemented advanced indexing strategies to handle millions of concurrent transactions with sub-100ms latency.",
      "Managed critical data orchestration and migration for institutional clients, ensuring zero data loss and maintaining high availability across distributed clusters.",
    ],
  },
  {
    company: "Nuhvin Global Services",
    role: "Full-Stack Developer Intern",
    period: "2023",
    bullets: [
      "Developing mission-critical web architectures using Next.js 14 and high-performance Rust-based backend services for real-time monitoring.",
      "Crafting immersive, high-interaction UI components using custom Framer Motion animation engines and robust state management for seamless user journeys.",
    ],
  },
];

// A single experience entry — triggers node pulse when THIS entry's center hits screen center
const ExperienceEntry = ({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCES)[0];
  index: number;
}) => {
  const entryRef = useRef<HTMLDivElement>(null);

  // Fires true when this entry's center crosses the viewport center line
  const isAtCenter = useInView(entryRef, {
    margin: "-40% 0px -40% 0px",
    once: false,
  });

  return (
    <motion.div
      ref={entryRef}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.15 }}
      className="relative pl-12 flex flex-col md:flex-row gap-8 md:gap-24"
    >
      {/* Animated Timeline Node */}
      <div className="absolute left-0 top-3 z-20">
        {/* Expanding ring 1 */}
        <motion.div
          animate={isAtCenter ? { opacity: [0, 0.8, 0], scale: [0.6, 2.2] } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "-1px",
            left: "-1px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            border: "1px solid rgba(147,210,255,0.8)",
            pointerEvents: "none",
          }}
        />

        {/* Expanding ring 2 (slower) */}
        <motion.div
          animate={isAtCenter ? { opacity: [0, 0.5, 0], scale: [0.6, 3.2] } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }}
          style={{
            position: "absolute",
            top: "-1px",
            left: "-1px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            border: "1px solid rgba(120,190,255,0.4)",
            pointerEvents: "none",
          }}
        />

        {/* Glow halo */}
        <motion.div
          animate={isAtCenter ? { opacity: [0, 0.7, 0.3], scale: [0.5, 1] } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            top: "-8px",
            left: "-8px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(140,200,255,0.5) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Core dot */}
        <motion.div
          animate={
            isAtCenter
              ? {
                  borderColor: "rgba(180,220,255,1)",
                  boxShadow: "0 0 8px 2px rgba(140,200,255,0.6)",
                  backgroundColor: "rgba(140,200,255,0.15)",
                }
              : {
                  borderColor: "rgba(255,255,255,0.2)",
                  boxShadow: "0 0 0px 0px transparent",
                  backgroundColor: "#000",
                }
          }
          transition={{ duration: 0.4 }}
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            position: "relative",
            zIndex: 10,
          }}
        />
      </div>

      <div className="flex flex-col gap-2 min-w-[200px]">
        <motion.span
          animate={isAtCenter ? { color: "rgba(255,255,255,0.9)" } : { color: "rgba(255,255,255,0.6)" }}
          transition={{ duration: 0.4 }}
          className="text-[9px] uppercase tracking-[0.3em] font-bold"
        >
          {exp.period}
        </motion.span>
        <h3 className="text-xl font-bold text-white tracking-tight">{exp.role}</h3>
        <span className="text-xs text-white/60 italic font-medium">{exp.company}</span>
      </div>

      <div className="flex flex-col gap-6 max-w-xl">
        {exp.bullets.map((bullet, i) => (
          <p key={i} className="text-[13px] text-white/70 font-light leading-relaxed">
            {bullet}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 25%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.001,
  });

  const cometY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const cometOpacity = useTransform(smoothProgress, [0, 0.04, 0.92, 1], [0, 1, 1, 0]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-48 px-6 bg-black flex flex-col items-center"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="flex flex-col gap-24"
        >
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-bold">
              Evolution
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
              Career <br />
              <span className="text-white/60 italic">Trajectory.</span>
            </h2>
          </div>

          <div className="relative flex flex-col gap-20">
            {/* Base dim line */}
            <div className="absolute left-[7px] top-4 bottom-4 w-[1px] bg-white/[0.07]" />

            {/* Progressive fill line */}
            <div className="absolute left-[7px] top-4 bottom-4 w-[1px] overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full"
                style={{
                  height: lineHeight,
                  background:
                    "linear-gradient(to bottom, rgba(140,200,255,0.0) 0%, rgba(140,200,255,0.3) 60%, rgba(120,180,255,0.55) 100%)",
                }}
              />
            </div>

            {/* Comet */}
            <motion.div
              className="absolute left-[7px] top-4 bottom-4 pointer-events-none"
              style={{ opacity: cometOpacity }}
            >
              <motion.div className="absolute left-0 w-[1px]" style={{ top: cometY }}>
                {/* Tail layer 3 - long diffuse */}
                <div style={{ position: "absolute", bottom: 0, left: "-1px", width: "3px", height: "180px", background: "linear-gradient(to top, rgba(80,160,255,0.0) 0%, rgba(80,140,255,0.04) 40%, transparent 100%)", filter: "blur(2px)" }} />
                {/* Tail layer 2 - mid */}
                <div style={{ position: "absolute", bottom: 0, left: 0, width: "1px", height: "110px", background: "linear-gradient(to top, rgba(140,200,255,0.55) 0%, rgba(140,200,255,0.15) 60%, transparent 100%)" }} />
                {/* Tail layer 1 - short bright */}
                <div style={{ position: "absolute", bottom: 0, left: 0, width: "1px", height: "55px", background: "linear-gradient(to top, rgba(200,230,255,0.95) 0%, rgba(180,220,255,0.6) 40%, transparent 100%)" }} />
                {/* Outer glow halo */}
                <div style={{ position: "absolute", bottom: "-6px", left: "50%", transform: "translateX(-50%)", width: "20px", height: "20px", borderRadius: "50%", background: "radial-gradient(circle, rgba(160,210,255,0.45) 0%, rgba(120,190,255,0.15) 50%, transparent 70%)" }} />
                {/* Mid glow ring */}
                <div style={{ position: "absolute", bottom: "-3px", left: "50%", transform: "translateX(-50%)", width: "9px", height: "9px", borderRadius: "50%", background: "radial-gradient(circle, rgba(220,240,255,0.9) 0%, rgba(160,210,255,0.5) 50%, transparent 80%)" }} />
                {/* Bright core */}
                <div style={{ position: "absolute", bottom: "-1px", left: "50%", transform: "translateX(-50%)", width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,1)", boxShadow: "0 0 3px 1px rgba(220,240,255,1), 0 0 8px 3px rgba(140,200,255,0.8), 0 0 18px 6px rgba(100,170,255,0.4)" }} />
                {/* Scatter sparks */}
                {[-6, 6].map((offset, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0, 0.7, 0], y: [0, -20], x: [0, offset * 1.5] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.3 + i * 0.2, ease: "easeOut" }}
                    style={{ position: "absolute", bottom: "2px", left: "50%", transform: "translateX(-50%)", width: "1.5px", height: "1.5px", borderRadius: "50%", background: "rgba(200,230,255,0.9)", boxShadow: "0 0 3px 1px rgba(140,200,255,0.5)" }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Experience entries */}
            {EXPERIENCES.map((exp, index) => (
              <ExperienceEntry key={exp.company} exp={exp} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
