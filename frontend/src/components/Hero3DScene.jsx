import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Camera,
  Instagram,
  Youtube,
  Mic,
  Smartphone,
  Sparkles,
  Wand2,
  Video,
  Music,
} from "lucide-react";

/**
 * Cinematic 3D-ish orbiting scene:
 * - Central "AI Core" (Wand) that pulses
 * - Orbiting rings of icons: cameras, social, mic, smartphone
 * - SVG glowing connecting lines (drawn between core and each icon)
 * - Parallax tilt on mouse move
 */
const ICONS = [
  { Icon: Camera, label: "Camera", r: 150, d: 22, delay: 0, color: "#FFB000" },
  { Icon: Video, label: "Video", r: 150, d: 22, delay: -7, color: "#FFB000" },
  { Icon: Instagram, label: "Instagram", r: 230, d: 30, delay: 0, color: "#FF6A00" },
  { Icon: Youtube, label: "YouTube", r: 230, d: 30, delay: -10, color: "#FF6A00" },
  { Icon: Smartphone, label: "Mobile", r: 230, d: 30, delay: -20, color: "#FF6A00" },
  { Icon: Mic, label: "Voice", r: 310, d: 40, delay: 0, color: "#ffffff" },
  { Icon: Music, label: "Audio", r: 310, d: 40, delay: -13, color: "#ffffff" },
  { Icon: Sparkles, label: "Generate", r: 310, d: 40, delay: -26, color: "#ffffff" },
];

const Hero3DScene = () => {
  const containerRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [10, -10]), { stiffness: 80, damping: 12 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-10, 10]), { stiffness: 80, damping: 12 });

  const handleMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
    mx.set(x);
    my.set(y);
  };

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(id);
  }, []);

  // Compute positions for SVG lines (approx of CSS orbit)
  const computePos = (r, d, delay, t) => {
    const speed = (2 * Math.PI) / d;
    const angle = speed * ((t * 0.05) + delay);
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative w-full h-[520px] md:h-[640px] flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
      data-testid="hero-3d-scene"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative w-[700px] h-[700px] flex items-center justify-center"
      >
        {/* Background concentric rings */}
        {[150, 230, 310].map((r) => (
          <div
            key={r}
            className="absolute rounded-full border border-white/10"
            style={{ width: r * 2, height: r * 2 }}
          />
        ))}

        {/* SVG connecting glow lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="-350 -350 700 700">
          {ICONS.map((cfg, i) => {
            const { x, y } = computePos(cfg.r, cfg.d, cfg.delay, tick);
            return (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                stroke="url(#lineGrad)"
                strokeWidth={1}
                strokeOpacity={0.5}
                className="glow-line"
              />
            );
          })}
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB000" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFB000" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central AI core */}
        <div className="ai-core relative h-28 w-28 rounded-full bg-gradient-to-br from-[#FFB000] to-[#FF6A00] flex items-center justify-center z-10">
          <Wand2 className="h-10 w-10 text-black" strokeWidth={2.5} />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-amber uppercase font-heading">
            AI Core
          </div>
        </div>

        {/* Orbiting icons */}
        {ICONS.map(({ Icon, label, r, d, delay, color }, i) => (
          <div
            key={i}
            className="orbit-node"
            style={{ "--r": `${r}px`, "--d": `${d}s`, "--delay": `${delay}s` }}
          >
            <div
              className="h-14 w-14 rounded-xl bg-[#121212] border border-white/15 flex items-center justify-center backdrop-blur-md"
              style={{ boxShadow: `0 0 24px ${color}30` }}
              data-testid={`orbit-node-${label.toLowerCase()}`}
            >
              <Icon className="h-6 w-6" style={{ color }} />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Faint label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/30">
        Camera × Social × AI · Unified Optimization
      </div>
    </div>
  );
};

export default Hero3DScene;
