import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video } from "lucide-react";

/**
 * Studio-style intro preloader (rewritten — simpler & robust):
 *   - Black fullscreen overlay
 *   - Tripod + camera shooting animation
 *   - REC blinking, scene label
 *   - Auto fades out after 3.3s
 * Plays once per browser session.
 */
const IntroPreloader = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return !window.sessionStorage.getItem("asta-intro-seen-3");
    } catch {
      return true;
    }
  });
  const [tc, setTc] = useState("00:00:00:00");

  useEffect(() => {
    if (!visible) return;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const f = String(Math.floor((elapsed / 41) % 24)).padStart(2, "0");
      const s = String(Math.floor((elapsed / 1000) % 60)).padStart(2, "0");
      setTc(`00:00:${s}:${f}`);
    }, 41);
    return () => clearInterval(id);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      try {
        window.sessionStorage.setItem("asta-intro-seen-3", "1");
      } catch {}
      setVisible(false);
    }, 3500);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-[#050505] overflow-hidden grain"
          data-testid="intro-preloader"
        >
          {/* Top REC + scene info */}
          <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]"
            />
            <span className="text-red-500 text-[10px] font-mono font-bold tracking-[0.25em]">
              REC
            </span>
            <span className="text-white/60 text-[10px] font-mono tracking-[0.2em]">
              {tc}
            </span>
          </div>

          <div className="absolute top-6 right-6 text-right z-10">
            <p className="text-[10px] tracking-[0.3em] text-white/40 font-heading">
              STUDIO CAM · ROLL A
            </p>
            <p className="text-amber text-[10px] font-mono tracking-[0.25em] mt-1">
              TAKE 01 · SCENE 00
            </p>
          </div>

          {/* Tripod + camera */}
          <div className="absolute inset-0 flex items-end justify-center pb-10">
            <div className="relative w-[360px] h-[440px]">
              {/* Tripod */}
              <svg
                viewBox="0 0 360 440"
                className="absolute inset-0 w-full h-full overflow-visible"
                fill="none"
              >
                {/* Floor shadow */}
                <motion.ellipse
                  cx="180"
                  cy="420"
                  rx="100"
                  ry="6"
                  fill="#FFB000"
                  initial={{ opacity: 0, rx: 20 }}
                  animate={{ opacity: 0.2, rx: 100 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                />

                {/* Left leg */}
                <motion.line
                  x1="180"
                  y1="240"
                  x2="90"
                  y2="420"
                  stroke="#FFB000"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.55 }}
                />
                {/* Right leg */}
                <motion.line
                  x1="180"
                  y1="240"
                  x2="270"
                  y2="420"
                  stroke="#FFB000"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.55 }}
                />
                {/* Middle leg behind */}
                <motion.line
                  x1="180"
                  y1="240"
                  x2="180"
                  y2="420"
                  stroke="#FFB000"
                  strokeOpacity="0.45"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.35, duration: 0.55 }}
                />

                {/* Joint */}
                <motion.circle
                  cx="180"
                  cy="240"
                  r="6"
                  fill="#FFB000"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.85, duration: 0.3 }}
                />

                {/* Mounting plate */}
                <motion.g
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95, duration: 0.4 }}
                >
                  <rect
                    x="160"
                    y="225"
                    width="40"
                    height="14"
                    rx="2"
                    fill="#1A1A1A"
                    stroke="#FFB000"
                    strokeWidth="1.5"
                  />
                  <rect x="168" y="219" width="24" height="6" rx="1" fill="#FFB000" />
                </motion.g>

                {/* Camera body */}
                <motion.g
                  initial={{ opacity: 0, y: -180 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* viewfinder hump */}
                  <rect x="166" y="148" width="28" height="14" rx="2" fill="#1A1A1A" stroke="#FFB000" strokeWidth="1.2" />
                  <rect x="172" y="152" width="16" height="6" rx="1" fill="#0A0A0A" />

                  {/* main body */}
                  <rect x="118" y="162" width="124" height="62" rx="6" fill="#121212" stroke="#FFB000" strokeWidth="1.5" />
                  {/* grip */}
                  <rect x="222" y="168" width="18" height="48" rx="2" fill="#1A1A1A" stroke="#FFB000" strokeOpacity="0.4" />

                  {/* lens */}
                  <circle cx="162" cy="193" r="30" fill="#0A0A0A" stroke="#FFB000" strokeWidth="1.8" />
                  <circle cx="162" cy="193" r="23" fill="#1A1A1A" stroke="#FFB000" strokeOpacity="0.5" />
                  <circle cx="162" cy="193" r="16" fill="#000" stroke="#FFB000" strokeOpacity="0.7" />
                  <ellipse cx="155" cy="186" rx="8" ry="3.5" fill="#FFB000" fillOpacity="0.3" />
                  <motion.circle
                    cx="162"
                    cy="193"
                    r="6"
                    fill="#FFB000"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: 1.6 }}
                  />

                  {/* REC dot */}
                  <motion.circle
                    cx="206"
                    cy="174"
                    r="3.5"
                    fill="#EF4444"
                    animate={{ opacity: [1, 0.15, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 1.5 }}
                  />
                  <text x="214" y="177" fontSize="6" fill="#EF4444" fontFamily="monospace" fontWeight="bold">
                    REC
                  </text>

                  <rect x="202" y="214" width="14" height="2" rx="1" fill="#FFB000" />
                </motion.g>
              </svg>

              {/* Brand under tripod */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="absolute -bottom-2 left-0 right-0 text-center"
              >
                <p className="text-[10px] tracking-[0.5em] text-amber font-heading mb-2">
                  ⌬ NOW SHOOTING
                </p>
                <h1 className="font-heading font-extrabold tracking-tighter text-white text-4xl md:text-5xl">
                  ASTA CREATIVE
                </h1>
                <p className="text-amber text-[10px] font-heading uppercase mt-2 tracking-[0.4em]">
                  Smart Content Studio AI
                </p>
              </motion.div>
            </div>
          </div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10"
          >
            <span className="text-white/40 text-[10px] tracking-[0.25em] font-mono uppercase">
              Loading scene
            </span>
            {[0, 0.15, 0.3].map((d, i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: d }}
                className="h-1 w-1 rounded-full bg-amber"
              />
            ))}
          </motion.div>

          {/* Subtle film grain handled by .grain class on parent */}

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Lens beam shooting forward (subtle) */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 0.6, 0.3], scaleX: 1 }}
            transition={{ delay: 1.9, duration: 0.7 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 h-px origin-left"
            style={{
              width: "32vw",
              background:
                "linear-gradient(to right, rgba(255,176,0,0.7), transparent)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroPreloader;
