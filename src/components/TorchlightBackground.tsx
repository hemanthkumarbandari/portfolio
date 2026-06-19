"use client";

import React, { useEffect, useRef } from "react";

const PREMIUM_TECH = [
  "React", "Next.js", "TypeScript", "Python", "FastAPI", "Docker", 
  "Kubernetes", "PostgreSQL", "TensorFlow", "OpenAI", "LangChain", 
  "GraphQL", "Prisma", "Redis", "AWS", "Linux", "Three.js", "WebGL", 
  "RAG", "AI Agents", "MongoDB", "TailwindCSS", "GitHub Actions"
];

const CODE_FRAGMENTS = [
  "export const", "=> { ... }", "async (req, res)", "<div>", "model.fit()",
  "SELECT * FROM", "useContext()", "git commit -m", "const [state, setState]",
  "npm install", "kubectl apply", "docker-compose", "prisma.user.findMany()",
  "new Vector3()", "torch.nn.Linear", "langchain.load_chain", "struct Agent",
  "impl<T> Block", "pub fn main()", "{ children }", ".map(item =>"
];

interface Element {
  text: string;
  baseX: number;
  baseY: number;
  z: number;
  size: number;
  rotation: number;
  opacity: number;
  isCode?: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  blinkSpeed: number;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export const TorchlightBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, velocityX: 0, velocityY: 0 });
  const elements = useRef<Element[]>([]);
  const stars = useRef<Star[]>([]);
  const particles = useRef<Particle[]>([]);
  const animationFrame = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initScene();
    };

    const initScene = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const newElements: Element[] = [];
      const addElement = (text: string, isCode = false) => {
        let attempts = 0;
        while (attempts < 50) {
          const angle = Math.random() * Math.PI * 2;
          const radius = 150 + Math.random() * (w * 0.4);
          const x = w/2 + Math.cos(angle) * radius;
          const y = h/2 + Math.sin(angle) * radius;
          
          const isTooClose = newElements.some(el => Math.sqrt((el.baseX - x) ** 2 + (el.baseY - y) ** 2) < 140);
          if (!isTooClose) {
            newElements.push({
              text, baseX: x, baseY: y, z: Math.random() * 0.4 + 0.6,
              size: isCode ? Math.random() * 2 + 11 : Math.random() * 4 + 16,
              rotation: (Math.random() - 0.5) * 0.02,
              opacity: isCode ? 0.04 : 0.07,
              isCode
            });
            break;
          }
          attempts++;
        }
      };
      PREMIUM_TECH.forEach(tech => addElement(tech));
      for (let i = 0; i < 20; i++) addElement(CODE_FRAGMENTS[i % CODE_FRAGMENTS.length], true);
      elements.current = newElements;

      // 1. Decent Clean Clear Stars (Lower Density)
      const newStars: Star[] = [];
      for (let i = 0; i < 80; i++) {
        newStars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 0.8 + 0.3, // Smaller stars
          color: Math.random() > 0.5 ? "#ffffff" : "#fff9e0", 
          blinkSpeed: Math.random() * 0.01 + 0.005,
          phase: Math.random() * Math.PI * 2
        });
      }
      stars.current = newStars;

      const newParticles: Particle[] = [];
      for (let i = 0; i < 60; i++) {
        newParticles.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.1, vy: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 1.2 + 0.5, opacity: Math.random() * 0.3 + 0.1
        });
      }
      particles.current = newParticles;
    };

    const render = () => {
      mouse.current.velocityX = (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.velocityY = (mouse.current.targetY - mouse.current.y) * 0.05;
      mouse.current.x += mouse.current.velocityX;
      mouse.current.y += mouse.current.velocityY;
      const { x, y } = mouse.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#010103";
      ctx.fillRect(0, 0, w, h);

      const drawNebula = (cx: number, cy: number, r: number, color: string) => {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      };
      drawNebula(0, 0, w * 0.5, "rgba(40, 20, 80, 0.1)");
      drawNebula(w, h, w * 0.6, "rgba(20, 30, 90, 0.08)");

      const gridSize = 50;
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
      for (let i = 0; i < w; i += gridSize) {
        for (let j = 0; j < h; j += gridSize) {
          ctx.beginPath();
          ctx.arc(i, j, 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      stars.current.forEach(star => {
        const twinkle = Math.sin(Date.now() * star.blinkSpeed + star.phase) * 0.5 + 0.5;
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 0.3 + twinkle * 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      elements.current.forEach((el) => {
        const px = el.baseX + (x - w/2) * (1 - el.z) * 0.03;
        const py = el.baseY + (y - h/2) * (1 - el.z) * 0.03;
        ctx.font = `${el.isCode ? "300" : "500"} ${el.size}px 'Inter', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(el.rotation);
        ctx.fillStyle = `rgba(100, 110, 140, ${el.opacity})`; 
        ctx.fillText(el.text, 0, 0);
        ctx.restore();
      });

      // 2. Light Yellow Torchlight (Subtle & Clean)
      ctx.save();
      const distToCenter = Math.sqrt((x - w/2)**2 + (y - h/2)**2);
      const beamScale = 1 + (distToCenter / w) * 0.15;

      const outerGrad = ctx.createRadialGradient(x, y, 0, x, y, 200 * beamScale);
      outerGrad.addColorStop(0, "rgba(255, 250, 210, 0.12)"); // Light Yellow center
      outerGrad.addColorStop(0.7, "rgba(255, 245, 180, 0.03)");
      outerGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = outerGrad;
      ctx.fillRect(0, 0, w, h);

      const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, 60 * beamScale);
      coreGrad.addColorStop(0, "rgba(255, 255, 230, 0.3)"); 
      coreGrad.addColorStop(1, "rgba(255, 250, 200, 0)");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(x, y, 180 * beamScale, 0, Math.PI * 2);
      ctx.clip();

      // 3. Revealed Text in White
      elements.current.forEach((el) => {
        const px = el.baseX + (x - w/2) * (1 - el.z) * 0.03;
        const py = el.baseY + (y - h/2) * (1 - el.z) * 0.03;
        const dist = Math.sqrt((px - x) ** 2 + (py - y) ** 2);
        if (dist < 180 * beamScale) {
          const intensity = Math.max(0, 1 - dist / (160 * beamScale));
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(el.rotation);
          ctx.font = `${el.isCode ? "300" : "500"} ${el.size}px 'Inter', sans-serif`;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + intensity * 0.5})`; // White revealed text
          ctx.fillText(el.text, 0, 0);
          ctx.restore();
        }
      });

      particles.current.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const dist = Math.sqrt((p.x - x)**2 + (p.y - y)**2);
        if (dist < 180 * beamScale) {
          const intensity = Math.max(0, 1 - dist / (160 * beamScale));
          ctx.globalAlpha = p.opacity * intensity;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        }
      });
      ctx.restore();

      animationFrame.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[2]"
    />
  );
};
