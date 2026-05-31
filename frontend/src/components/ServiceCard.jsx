import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";

const ServiceCard = ({ service, index, testid }) => {
  const Icon = service.icon;
  const cardRef = useRef(null);

  // 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [8, -8]), {
    stiffness: 150,
    damping: 15,
  });
  const ry = useSpring(useTransform(mx, [-50, 50], [-8, 8]), {
    stiffness: 150,
    damping: 15,
  });

  // Light spotlight follow
  const lx = useTransform(mx, [-50, 50], ["0%", "100%"]);
  const ly = useTransform(my, [-50, 50], ["0%", "100%"]);

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
    mx.set(x);
    my.set(y);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.7,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      whileHover="hover"
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="group relative rounded-2xl border border-white/10 bg-[#101010] p-8 overflow-hidden cursor-pointer"
      data-testid={testid}
    >
      {/* Cursor-follow radial spotlight */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useTransform(
            [lx, ly],
            ([x, y]) =>
              `radial-gradient(380px circle at ${x} ${y}, rgba(255,176,0,0.18), transparent 70%)`
          ),
        }}
      />

      {/* Animated sweeping top border */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,176,0,0.9), transparent)",
        }}
        initial={{ x: "-100%" }}
        variants={{
          hover: { x: "100%" },
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Top-right blur glow */}
      <motion.div
        className="absolute top-0 right-0 h-40 w-40 rounded-full bg-amber/10 blur-3xl"
        variants={{
          hover: { scale: 1.4, opacity: 0.65 },
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Bottom-left blur (appears on hover) */}
      <motion.div
        className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-amber/0 blur-2xl"
        variants={{
          hover: { backgroundColor: "rgba(255,176,0,0.12)" },
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Floating ArrowUpRight in corner */}
      <motion.div
        className="absolute top-6 right-6 h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-white/40"
        variants={{
          hover: {
            backgroundColor: "rgba(255,176,0,1)",
            color: "#0A0A0A",
            borderColor: "rgba(255,176,0,1)",
            rotate: 45,
          },
        }}
        transition={{ duration: 0.4 }}
      >
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </motion.div>

      {/* Icon with multi-step animation */}
      <motion.div
        className="relative h-14 w-14 rounded-xl bg-amber/15 border border-amber/40 flex items-center justify-center text-amber mb-6"
        style={{ transform: "translateZ(40px)" }}
        variants={{
          hover: {
            scale: 1.08,
            rotate: [0, -8, 6, 0],
            backgroundColor: "rgba(255,176,0,0.25)",
          },
        }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {/* Pulsing aura */}
        <motion.span
          className="absolute inset-0 rounded-xl border border-amber"
          variants={{
            hover: { scale: [1, 1.4, 1.6], opacity: [0.6, 0, 0] },
          }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <Icon className="h-7 w-7 relative" />
      </motion.div>

      <div style={{ transform: "translateZ(20px)" }} className="relative">
        <motion.p
          className="text-[10px] uppercase tracking-[0.25em] text-amber"
          variants={{ hover: { letterSpacing: "0.35em" } }}
          transition={{ duration: 0.4 }}
        >
          {service.sub}
        </motion.p>
        <h3 className="font-heading text-2xl font-semibold text-white mt-2 tracking-tight">
          {service.title}
        </h3>
        <p className="text-sm text-white/60 mt-3 leading-relaxed">
          {service.desc}
        </p>

        <ul className="mt-6 space-y-2">
          {service.points.map((p, i) => (
            <motion.li
              key={p}
              className="flex items-center gap-2 text-sm text-white/75"
              variants={{
                hover: { x: 4, color: "rgba(255,255,255,1)" },
              }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <motion.span
                className="text-amber"
                variants={{
                  hover: { scale: [1, 1.4, 1] },
                }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
              >
                <Check className="h-4 w-4" />
              </motion.span>
              {p}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Bottom progress bar that fills on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-amber"
        initial={{ width: 0 }}
        variants={{
          hover: { width: "100%" },
        }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      />
    </motion.div>
  );
};

export default ServiceCard;
