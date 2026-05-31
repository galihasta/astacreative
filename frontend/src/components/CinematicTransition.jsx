import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Video, Aperture } from "lucide-react";

/**
 * Cinematic page transition:
 *  - Cinemascope black bars slide in/out
 *  - Floating camera "drone" flies across the viewport
 *  - REC indicator + timecode + scene label flash
 *  - Subtle focus-pull blur + radial vignette
 */
const sceneNames = {
  "/": { code: "01", label: "HOME" },
  "/services": { code: "02", label: "SERVICES" },
  "/gallery": { code: "03", label: "GALLERY" },
  "/about": { code: "04", label: "ABOUT" },
  "/contact": { code: "05", label: "CONTACT" },
};

const CinematicTransition = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [scene, setScene] = useState(sceneNames["/"]);
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    const next =
      sceneNames[location.pathname] || { code: "00", label: "SCENE" };
    setScene(next);
    setShow(true);
    const t = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Random-ish timecode for vibe
  useEffect(() => {
    if (!show) return;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const f = String(Math.floor((elapsed / 41) % 24)).padStart(2, "0");
      const s = String(Math.floor((elapsed / 1000) % 60)).padStart(2, "0");
      setTimecode(`00:00:${s}:${f}`);
    }, 41);
    return () => clearInterval(id);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={location.pathname}
          className="pointer-events-none fixed inset-0 z-[100]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          data-testid="cinematic-transition"
        >
          {/* Top cinemascope bar */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 h-[14vh] bg-black"
          >
            {/* REC indicator */}
            <div className="absolute top-6 left-8 flex items-center gap-3">
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
              />
              <span className="text-red-500 text-[11px] font-heading font-bold tracking-[0.3em]">
                REC
              </span>
              <span className="text-white/70 text-[11px] font-mono tracking-wider">
                {timecode}
              </span>
            </div>
            {/* Scene tag - top right */}
            <div className="absolute top-6 right-8 text-right">
              <p className="text-[10px] tracking-[0.35em] text-white/40 font-heading">
                SCENE {scene.code}
              </p>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="text-amber font-heading font-extrabold text-2xl tracking-tighter mt-1"
              >
                {scene.label}
              </motion.p>
            </div>
            {/* Aperture marks */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <Aperture className="h-3.5 w-3.5 text-white/40" />
              <span className="text-[9px] tracking-[0.4em] text-white/40 font-heading">
                ASTA · STUDIO CAM
              </span>
              <Aperture className="h-3.5 w-3.5 text-white/40" />
            </div>
          </motion.div>

          {/* Bottom cinemascope bar */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 h-[14vh] bg-black"
          >
            {/* Tick marks like a film strip */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-8">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 w-1 bg-white/15 rounded-full"
                />
              ))}
            </div>
            <div className="absolute bottom-6 left-8 text-[10px] tracking-[0.3em] text-white/40 font-heading">
              ASTA CREATIVE · 24FPS · 4K · ANAMORPHIC
            </div>
            <div className="absolute bottom-6 right-8 text-[10px] tracking-[0.3em] text-amber font-heading">
              ⬢ AI · DIRECTED
            </div>
          </motion.div>

          {/* Center scene label flash */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 1.05] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.2, 0.7, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-[10px] tracking-[0.5em] text-amber font-heading mb-2">
                ⌬ NOW SHOOTING
              </p>
              <p className="font-heading text-6xl md:text-8xl font-extrabold tracking-tighter text-white text-glow-amber">
                {scene.label}
              </p>
              <p className="text-[10px] tracking-[0.5em] text-white/40 font-heading mt-3">
                TAKE {scene.code} · ACTION
              </p>
            </div>
          </motion.div>

          {/* Flying camera drone */}
          <motion.div
            initial={{ x: "-15vw", y: "30vh", rotate: -12, opacity: 0 }}
            animate={{
              x: ["-15vw", "30vw", "70vw", "115vw"],
              y: ["30vh", "20vh", "55vh", "40vh"],
              rotate: [-12, -4, 6, 12],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.6, 1] }}
            className="absolute top-0 left-0"
          >
            <div className="relative">
              {/* trail line */}
              <div className="absolute top-1/2 right-full h-px w-[28vw] bg-gradient-to-l from-amber to-transparent" />
              <div className="relative h-16 w-16 rounded-2xl bg-[#121212] border border-amber/60 backdrop-blur-md flex items-center justify-center glow-amber">
                <Video className="h-8 w-8 text-amber" strokeWidth={2} />
                <span className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              </div>
              {/* viewfinder frame */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-24 border border-amber/50 rounded-sm">
                <div className="absolute top-1 left-1 h-2 w-2 border-t-2 border-l-2 border-amber" />
                <div className="absolute top-1 right-1 h-2 w-2 border-t-2 border-r-2 border-amber" />
                <div className="absolute bottom-1 left-1 h-2 w-2 border-b-2 border-l-2 border-amber" />
                <div className="absolute bottom-1 right-1 h-2 w-2 border-b-2 border-r-2 border-amber" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 border border-amber rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Subtle radial vignette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicTransition;
