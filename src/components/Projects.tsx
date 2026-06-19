"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Github, ExternalLink, ChevronRight } from "lucide-react";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  live: string;
  color: string;
  accentColor: string;
  category: string;
  year: string;
  features: string[];
  role: string;
}

const PROJECTS: Project[] = [
  {
    title: "Loan Approval Prediction",
    category: "AI / Machine Learning",
    year: "2024",
    role: "ML Engineer & Backend Developer",
    description: "End-to-end AI system using deep learning to automate risk assessment in financial services, featuring a high-performance FastAPI backend.",
    longDescription: "A production-grade machine learning system that automates loan approval decisions for financial institutions. The model ingests applicant financial data, runs it through a multi-layer neural network trained on historical loan data, and produces a risk score with explainability reports. The FastAPI backend handles thousands of concurrent requests with sub-100ms response times.",
    tech: ["Python", "TensorFlow", "FastAPI", "PostgreSQL", "Scikit-learn", "Pandas", "Docker", "REST API"],
    github: "https://github.com/hemanthkumarbandari/loan-approval-prediction",
    live: "#",
    color: "from-blue-500/10",
    accentColor: "rgba(59,130,246,0.15)",
    features: [
      "Neural network model with 94% accuracy on test dataset",
      "Real-time risk scoring via high-performance FastAPI endpoints",
      "Explainability layer — shows which factors drove the decision",
      "PostgreSQL schema for audit trail of all predictions",
      "Dockerized for seamless cloud deployment",
    ],
  },
  {
    title: "IND Masters",
    category: "Full-Stack Web Platform",
    year: "2024",
    role: "Full-Stack Developer",
    description: "Comprehensive e-learning platform featuring specialized courses. Includes a robust frontend for students, a secure backend, and a fully-featured admin panel.",
    longDescription: "IND Masters is a full-stack e-learning ecosystem built for delivering professional courses online. The platform has three layers — a student-facing Next.js frontend for browsing and enrolling in courses, a Node.js/Express REST API backend handling authentication, payments, and content delivery, and a React-based admin panel for instructors to manage courses, users, and analytics.",
    tech: ["React.js", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST API", "JWT"],
    github: "#",
    live: "#",
    color: "from-purple-500/10",
    accentColor: "rgba(168,85,247,0.15)",
    features: [
      "Student portal with course browsing, enrollment, and progress tracking",
      "Secure JWT-based authentication with role-based access control",
      "Admin panel for course management, user analytics, and content uploads",
      "RESTful Node.js/Express backend with MongoDB for flexible data modeling",
      "Responsive design optimized for all devices",
    ],
  },
];

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0c] border border-white/[0.08] rounded-sm shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top ambient gradient line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Header */}
          <div className="relative p-8 md:p-12 pb-0">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 pointer-events-auto"
            >
              <X size={14} />
            </button>

            {/* Hero gradient background */}
            <div
              className="absolute top-0 left-0 w-full h-64 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at top left, ${project.accentColor} 0%, transparent 70%)`,
              }}
            />

            <div className="relative flex flex-col gap-6">
              {/* Category & Year badge */}
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-bold border border-white/10 px-3 py-1.5 rounded-full">
                  {project.category}
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">
                  {project.year}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight uppercase leading-[0.9]">
                {project.title}
              </h2>

              {/* Role */}
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Role: <span className="text-white/70">{project.role}</span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-8 md:mx-12 my-8 h-[1px] bg-white/[0.06]" />

          {/* Body */}
          <div className="px-8 md:px-12 pb-12 flex flex-col gap-10">
            {/* Overview */}
            <div className="flex flex-col gap-4">
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">Overview</span>
              <p className="text-[14px] text-white/70 font-light leading-relaxed max-w-2xl">
                {project.longDescription}
              </p>
            </div>

            {/* Key Features */}
            <div className="flex flex-col gap-4">
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">Key Features</span>
              <ul className="flex flex-col gap-3">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                    className="flex items-start gap-3 text-[13px] text-white/65 font-light leading-relaxed"
                  >
                    <ChevronRight size={12} className="text-white/30 mt-1 flex-shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-col gap-4">
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">Tech Stack</span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] uppercase tracking-[0.2em] text-white/60 font-bold border border-white/10 bg-white/[0.03] px-3 py-1.5 rounded-full hover:border-white/25 hover:text-white transition-all duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/[0.06]">
              {project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-7 py-3.5 bg-white text-black text-[9px] uppercase tracking-widest font-bold rounded-sm hover:bg-white/90 transition-all duration-300 pointer-events-auto"
                >
                  Live Preview <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-7 py-3.5 border border-white/15 text-white/70 text-[9px] uppercase tracking-widest font-bold rounded-sm hover:border-white/40 hover:text-white transition-all duration-300 pointer-events-auto"
                >
                  GitHub <GithubIcon size={13} />
                </a>
              )}
              {project.github === "#" && project.live === "#" && (
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">
                  // Private Repository
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
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
                  className="group relative flex flex-col gap-10 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
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
                      <span className="px-6 py-2 bg-white text-black text-[9px] uppercase tracking-widest font-bold torch-trigger">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-6 px-2">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[8px] uppercase tracking-[0.3em] text-white/35 font-bold">{project.category}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[8px] uppercase tracking-[0.3em] text-white/35 font-bold">{project.year}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white tracking-tight uppercase group-hover:text-white/90 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-[13px] text-white/70 font-light leading-relaxed max-w-md">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-[8px] uppercase tracking-[0.2em] text-white/55 font-bold border border-white/10 px-2.5 py-1 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-white/50 group-hover:text-white transition-colors duration-500 pt-2">
                      View Case Study <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};
