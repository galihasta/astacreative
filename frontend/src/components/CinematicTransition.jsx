import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

/**
 * Minimal, non-intrusive cinematic transition:
 *   1. Realistic camera descends from above
 *   2. Brief shutter flash (snap!)
 *   3. Camera ascends back up
 *   4. Subtle REC chip in the corner
 * Content stays fully visible and interactive.
 */
const sceneNames = {
  "/": "01 · HOME",
  "/services": "02 · SERVICES",
  "/gallery": "03 · GALLERY",
  "/about": "04 · ABOUT",
  "/contact": "05 · CONTACT",
};

const Camera = () => (
  <div className="relative" data-testid="camera-rig">
    {/* Strap / mount line from top */}
    <div className="absolute -top-[100vh] left-1/2 -translate-x-1/2 w-px h-screen bg-gradient-to-b from-transparent via-white/10 to-white/30" />
    <div className="relative">
      <svg
        width="120"
        height="86"
        viewBox="0 0 120 86"
        fill="none"
        className="drop-shadow-[0_8px_40px_rgba(255,176,0,0.35)]"
      >
        {/* Top viewfinder hump */}
        <rect x="46" y="0" width="28" height="14" rx="2" fill="#1A1A1A" stroke="#FFB000" strokeWidth="1" />
        <rect x="52" y="4" width="16" height="6" rx="1" fill="#0A0A0A" />

        {/* Main body */}
        <rect x="4" y="14" width="112" height="60" rx="6" fill="#121212" stroke="#FFB000" strokeWidth="1.2" />

        {/* Grip on right */}
        <rect x="96" y="20" width="16" height="48" rx="2" fill="#1A1A1A" stroke="#FFB000" strokeOpacity="0.4" />

        {/* Lens body */}
        <circle cx="46" cy="44" r="26" fill="#0A0A0A" stroke="#FFB000" strokeWidth="1.5" />
        <circle cx="46" cy="44" r="20" fill="#1A1A1A" stroke="#FFB000" strokeOpacity="0.5" />
        {/* Inner lens */}
        <circle cx="46" cy="44" r="14" fill="#000" stroke="#FFB000" strokeOpacity="0.7" />
        {/* Glass highlight */}
        <ellipse cx="40" cy="38" rx="6" ry="3" fill="#FFB000" fillOpacity="0.25" />
        <circle cx="46" cy="44" r="4" fill="#FFB000" fillOpacity="0.8" />

        {/* REC dot */}
        <circle cx="82" cy="22" r="3" fill="#EF4444" />
        <text x="88" y="25" fontSize="6" fill="#EF4444" fontFamily="monospace" fontWeight="bold">REC</text>

        {/* Tally light bottom */}
        <rect x="78" y="64" width="14" height="2" rx="1" fill="#FFB000" />

        {/* Buttons */}
        <circle cx="104" cy="22" r="2" fill="#FFB000" />
        <rect x="80" y="48" width="10" height="3" rx="1" fill="#333" />
        <rect x="80" y="54" width="10" height="3" rx="1" fill="#333" />
      </svg>

      {/* Lens flare glow when snapping */}
      <div className="absolute top-1/2 left-[46px] -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-amber blur-[12px] opacity-80 pointer-events-none" />
    </div>
  </div>
);

const CinematicTransition = () => {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const [flash, setFlash] = useState(false);
  const [scene, setScene] = useState(sceneNames["/"]);

  useEffect(() => {
    setScene(sceneNames[location.pathname] || "—");
    setActive(true);

    // Trigger flash mid-animation when camera reaches lowest point
    const flashOn = setTimeout(() => setFlash(true), 520);
    const flashOff = setTimeout(() => setFlash(false), 660);
    const end = setTimeout(() => setActive(false), 1300);
    return () => {
      clearTimeout(flashOn);
      clearTimeout(flashOff);
      clearTimeout(end);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {active && (
        <div
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
          data-testid="cinematic-transition"
        >
          {/* Tiny REC chip in corner — non intrusive */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-24 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md"
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]"
            />
            <span className="text-red-500 text-[10px] font-mono font-bold tracking-[0.25em]">
              REC
            </span>
            <span className="text-white/60 text-[10px] font-mono tracking-[0.2em]">
              SCENE {scene}
            </span>
          </motion.div>

          {/* Camera rig descends, snaps, ascends — positioned off-center (right) to avoid covering headings */}
          <motion.div
            initial={{ y: "-30vh" }}
            animate={{
              y: ["-30vh", "10vh", "10vh", "-30vh"],
            }}
            transition={{
              duration: 1.3,
              times: [0, 0.35, 0.55, 1],
              ease: [0.45, 0, 0.3, 1],
            }}
            className="absolute top-0 right-[8vw] md:right-[12vw]"
          >
            <motion.div
              animate={{ rotate: [0, 0, -1.2, 1.2, 0] }}
              transition={{ duration: 1.3, times: [0, 0.4, 0.5, 0.6, 0.7] }}
            >
              <Camera />
            </motion.div>
          </motion.div>

          {/* Shutter / snap flash — subtle, only in top-right area where camera is */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.35, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, times: [0, 0.4, 1] }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 85% 18%, rgba(255,255,255,0.85) 0%, rgba(255,176,0,0.15) 18%, transparent 45%)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Subtle viewfinder corners — only at the snap moment, hint at composing the frame */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-10"
              >
                <div className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-amber" />
                <div className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-amber" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-amber" />
                <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-amber" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CinematicTransition;
