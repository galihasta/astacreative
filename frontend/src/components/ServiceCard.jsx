import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";

/**
 * Calm, smooth service card.
 *  - Soft lift on hover
 *  - Gentle spotlight that follows the cursor
 *  - Subtle bottom progress bar fills
 *  - Arrow corner rotates softly
 * No rotation, no pulsing, no wiggle — easy on the eyes.
 */
const ServiceCard = ({ service, index, testid }) => {
  const Icon = service.icon;
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50, on: false });

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      on: true,
    });
  };
  const handleLeave = () => setPos((p) => ({ ...p, on: false }));

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.7,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl border border-white/10 hover:border-amber/40 bg-[#101010] p-8 overflow-hidden cursor-pointer transition-colors duration-500"
      data-testid={testid}
    >
      {/* Gentle spotlight that follows cursor */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(255,176,0,0.10), transparent 70%)`,
        }}
      />

      {/* Soft ambient glow */}
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-amber/5 blur-3xl group-hover:bg-amber/12 transition-colors duration-700" />

      {/* Arrow corner — gentle rotate */}
      <div className="absolute top-6 right-6 h-9 w-9 rounded-full border border-white/10 group-hover:border-amber/60 flex items-center justify-center text-white/40 group-hover:text-amber transition-all duration-500">
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45"
          strokeWidth={2}
        />
      </div>

      {/* Icon — only a soft scale + tint */}
      <div className="relative h-14 w-14 rounded-xl bg-amber/15 border border-amber/40 flex items-center justify-center text-amber mb-6 transition-transform duration-500 group-hover:scale-105">
        <Icon className="h-7 w-7" />
      </div>

      <p className="text-[10px] uppercase tracking-[0.25em] text-amber transition-[letter-spacing] duration-500 group-hover:tracking-[0.3em]">
        {service.sub}
      </p>
      <h3 className="font-heading text-2xl font-semibold text-white mt-2 tracking-tight">
        {service.title}
      </h3>
      <p className="text-sm text-white/60 mt-3 leading-relaxed">
        {service.desc}
      </p>

      <ul className="mt-6 space-y-2">
        {service.points.map((p) => (
          <li
            key={p}
            className="flex items-center gap-2 text-sm text-white/75"
          >
            <Check className="h-4 w-4 text-amber" /> {p}
          </li>
        ))}
      </ul>

      {/* Bottom progress bar — smooth fill on hover */}
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-amber transition-[width] duration-700 ease-out group-hover:w-full" />
    </motion.div>
  );
};

export default ServiceCard;
