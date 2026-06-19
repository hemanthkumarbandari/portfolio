"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Code2, ArrowRight } from "lucide-react";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LINKS = [
  { label: "Email", href: "mailto:hemanthkumarbandari@gmail.com", icon: Mail },
  { label: "LinkedIn", href: "https://linkedin.com/in/hemanthkumarbandari", icon: LinkedinIcon },
  { label: "GitHub", href: "https://github.com/hemanthkumarbandari", icon: GithubIcon },
  { label: "LeetCode", href: "https://leetcode.com/hemanthkumarbandari", icon: Code2 }
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please provide all required transmission fields.");
      setStatus("error");
      return;
    }
    
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg("Please provide a valid transmission address.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Transmission encountered an anomaly. System offline.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Connection to the server grid lost. Check link layer.");
    }
  };

  return (
    <section id="contact" className="relative w-full py-48 px-6 bg-black flex flex-col items-center justify-center">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.015)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col items-center gap-16"
        >
          {/* Header */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.6em] text-white/50 font-bold">Connectivity</span>
            <h2 className="text-6xl md:text-[120px] font-bold text-white tracking-tighter uppercase leading-[0.8]">
              Build <br />
              <span className="text-white/60 italic">Future.</span>
            </h2>
          </div>

          <p className="text-white/60 text-[13.5px] md:text-[14.5px] font-light max-w-sm leading-relaxed tracking-wide -mt-6">
            Open for strategic collaborations and high-impact AI/ML engineering roles. 
            Initiate a secure transaction/message below.
          </p>

          {/* Futuristic Glassmorphic Contact Form (Email Box) */}
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-xl text-left border border-white/10 bg-[#0c0c0e]/80 backdrop-blur-md p-8 md:p-10 rounded-sm flex flex-col gap-8 shadow-2xl relative"
          >
            {/* Ambient inner gradient line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="flex flex-col gap-2">
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-bold font-mono">Transmission Header</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Operator Name */}
                <div className="flex flex-col gap-2 relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="OPERATOR NAME"
                    className="w-full bg-transparent border-b border-white/20 focus:border-white/60 text-white text-[12px] py-3 uppercase tracking-wider outline-none transition-all placeholder:text-white/40 placeholder:tracking-widest font-mono pointer-events-auto"
                  />
                </div>
                
                {/* Operator Email */}
                <div className="flex flex-col gap-2 relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="OPERATOR EMAIL"
                    className="w-full bg-transparent border-b border-white/20 focus:border-white/60 text-white text-[12px] py-3 uppercase tracking-wider outline-none transition-all placeholder:text-white/40 placeholder:tracking-widest font-mono pointer-events-auto"
                  />
                </div>
              </div>
            </div>

            {/* Transmission Payload */}
            <div className="flex flex-col gap-2 w-full">
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-bold font-mono">Payload Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="TRANSMISSION DATA INPUT..."
                className="w-full bg-transparent border-b border-white/20 focus:border-white/60 text-white text-[12px] py-3 uppercase tracking-wider outline-none resize-none transition-all placeholder:text-white/40 placeholder:tracking-widest font-mono pointer-events-auto leading-relaxed"
              />
            </div>

            {/* Actions & Status Responses */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 w-full pt-4">
              <div className="flex-1">
                {status === "success" && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[9px] text-emerald-400 uppercase tracking-widest font-bold font-mono"
                  >
                    {"// SECURE TRANSMISSION ESTABLISHED. SUCCESS."}
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[9px] text-rose-400 uppercase tracking-widest font-bold font-mono"
                  >
                    {"// ERROR: "}{errorMsg}
                  </motion.span>
                )}
                {status === "sending" && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[9px] text-amber-300 uppercase tracking-widest font-bold font-mono animate-pulse"
                  >
                    {"// UPLINKING METADATA WORKFLOW..."}
                  </motion.span>
                )}
                {status === "idle" && (
                  <span className="text-[8px] text-white/45 uppercase tracking-widest font-mono">
                    {"// INPUT SYSTEM READY"}
                  </span>
                )}
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`
                  group/btn pointer-events-auto relative px-8 py-3.5 rounded-sm overflow-hidden flex items-center justify-center gap-3 border border-white/20 text-white/80 hover:text-white hover:border-white/60 active:scale-[0.98] transition-all duration-500 font-mono torch-trigger
                  ${status === "sending" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                <span className="relative z-10 text-[9px] uppercase tracking-[0.25em] font-bold">
                  {status === "sending" ? "SENDING..." : "INITIATE TRANSMISSION"}
                </span>
                <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform z-10" />
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              </button>
            </div>
          </form>

          {/* Traditional Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20 pt-20 border-t border-white/[0.05] w-full">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative flex flex-col items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-white/55 hover:text-white transition-all duration-500 torch-trigger"
              >
                <link.icon size={20} strokeWidth={1} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                {link.label}
                <span className="absolute -bottom-2 w-0 h-[1px] bg-white/40 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Footer Metadata */}
          <div className="mt-40 pt-10 border-t border-white/[0.05] w-full flex flex-col md:flex-row items-center justify-between gap-10">
            <span className="text-[9px] text-white/40 uppercase tracking-[0.4em] font-medium">© 2024 ARCHITECTURAL VOID // HE MANTH</span>
            <a href="#home" className="group text-[9px] text-white/40 uppercase tracking-[0.4em] hover:text-white transition-all duration-500 flex items-center gap-3">
              Return to origin <ArrowRight size={12} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
