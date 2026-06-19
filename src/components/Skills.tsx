"use client";

import React from "react";
import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    title: "Languages & Frameworks",
    skills: ["Python", "JavaScript", "TypeScript", "HTML5", "CSS3"]
  },
  {
    title: "Technologies",
    skills: ["React.js", "Next.js", "Node.js", "FastAPI", "Express.js", "Three.js", "Tailwind CSS", "REST APIs", "PostgreSQL", "MySQL", "MongoDB"]
  },
  {
    title: "AI & Intelligent Systems",
    skills: ["Artificial Intelligence", "Machine Learning", "Prompt Engineering", "AI Agents", "RAG", "TensorFlow", "Pandas", "Matplotlib"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Docker", "Jenkins", "Vercel", "Netlify", "Postman", "VS Code", "Jupyter", "Figma", "Canva", "Tableau", "Power BI"]
  }
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative w-full py-48 px-6 bg-black flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="flex flex-col gap-24"
        >
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-bold">Stack</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
              Technical <br />
              <span className="text-white/60 italic">Arsenal.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {SKILL_GROUPS.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="flex flex-col gap-8"
              >
                <h3 className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-bold border-l border-white/10 pl-4">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="group relative px-6 py-2.5 bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all duration-500 rounded-sm"
                    >
                      <span className="text-[11px] text-white/70 group-hover:text-white transition-colors duration-500 font-medium tracking-wide">
                        {skill}
                      </span>
                    </div>
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
