"use client";

import React from "react";
import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    company: "CONSISTENCY.AI",
    role: "AI/ML Intern",
    period: "2024 - Present",
    bullets: [
      "Optimizing neural network architectures for real-time consistency scoring, reducing inference latency by 25% in large-scale AI pipelines.",
      "Architecting RAG-based systems utilizing Pinecone and LangChain to improve context-aware data retrieval precision for enterprise-scale LLM applications."
    ]
  },
  {
    company: "VAIBHAVAMH",
    role: "Database Developer Intern",
    period: "2023 - 2024",
    bullets: [
      "Designed high-performance PostgreSQL schemas and implemented advanced indexing strategies to handle millions of concurrent transactions with sub-100ms latency.",
      "Managed critical data orchestration and migration for institutional clients, ensuring zero data loss and maintaining high availability across distributed clusters."
    ]
  },
  {
    company: "SOPHRION",
    role: "Full-Stack Developer Intern",
    period: "2023",
    bullets: [
      "Developing mission-critical web architectures using Next.js 14 and high-performance Rust-based backend services for real-time monitoring.",
      "Crafting immersive, high-interaction UI components using custom Framer Motion animation engines and robust state management for seamless user journeys."
    ]
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative w-full py-48 px-6 bg-black flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="flex flex-col gap-24"
        >
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-bold">Evolution</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
              Career <br />
              <span className="text-white/60 italic">Trajectory.</span>
            </h2>
          </div>

          <div className="relative flex flex-col gap-20">
            {/* Vertical Line */}
            <div className="absolute left-[7px] top-4 bottom-4 w-[1px] bg-white/[0.08]" />

            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.15 }}
                className="relative pl-12 flex flex-col md:flex-row gap-8 md:gap-24"
              >
                {/* Dot */}
                <div className="absolute left-0 top-3 w-3.5 h-3.5 rounded-full border border-white/20 bg-black z-10" />
                
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-bold">{exp.period}</span>
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
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
