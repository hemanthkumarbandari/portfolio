"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  {
    title: "Loan Approval Prediction",
    description: "End-to-end AI system using deep learning to automate risk assessment in financial services, featuring a high-performance FastAPI backend.",
    tech: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    github: "https://github.com/hemanthkumarbandari/loan-approval-prediction",
    live: "#",
    color: "from-blue-500/10"
  },
  {
    title: "IND Masters",
    description: "Comprehensive e-learning platform featuring specialized courses. Includes a robust frontend for students, a secure backend, and a fully-featured admin panel.",
    tech: ["React.js", "Node.js", "Express", "MongoDB"],
    github: "#",
    live: "#",
    color: "from-purple-500/10"
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative w-full py-48 px-6 bg-black flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="flex flex-col gap-24"
        >
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-bold">Archives</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
              Strategic <br />
              <span className="text-white/60 italic">Creations.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: index * 0.2, ease: [0.19, 1, 0.22, 1] }}
                className="group relative flex flex-col gap-10"
              >
                {/* Image / Preview Area */}
                <div className={`
                  relative aspect-[16/10] bg-[#0a0a0a] border border-white/[0.05] rounded-sm overflow-hidden 
                  transition-all duration-700 group-hover:border-white/[0.12]
                `}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  {/* Fake UI Detail */}
                  <div className="absolute top-6 left-6 flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-95 group-hover:scale-100">
                    <span className="px-6 py-2 bg-white text-black text-[9px] uppercase tracking-widest font-bold torch-trigger">Explore Project</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6 px-2">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-3xl font-bold text-white tracking-tight uppercase">{project.title}</h3>
                    <p className="text-[13px] text-white/70 font-light leading-relaxed max-w-md">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[8px] uppercase tracking-[0.2em] text-white/55 font-bold border border-white/10 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-8 pt-4">
                    <a href={project.live} className="group/link flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-white hover:text-white/70 transition-all duration-300">
                      Live Preview <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                    <a href={project.github} className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-white/60 hover:text-white transition-all duration-300">
                      Source <GithubIcon size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
