import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Zap, TrendingUp, Camera, Wand2, Play } from "lucide-react";
import Hero3DScene from "@/components/Hero3DScene";
import Marquee from "@/components/Marquee";

const stats = [
  { label: "Brands Served", value: "120+" },
  { label: "Content Output / Month", value: "8K+" },
  { label: "AI Models Trained", value: "37" },
  { label: "Avg. CTR Lift", value: "3.4×" },
];

const services = [
  {
    icon: Wand2,
    title: "AI Video Ads",
    desc: "Iklan video performance-driven yang dibangun dengan AI scripting, scene generation, dan editing otomatis.",
  },
  {
    icon: Camera,
    title: "AI Content Creator",
    desc: "Studio konten 24/7: foto, reels, dan post sosmed yang dipersonalisasi oleh AI per audience segment.",
  },
  {
    icon: Zap,
    title: "Smart Optimization",
    desc: "Algoritma kami terus belajar dari performa konten dan auto-tune copy, thumbnail, hingga jam tayang.",
  },
];

const HomePage = () => {
  return (
    <div data-testid="home-page" className="relative">
      {/* HERO */}
      <section className="relative dot-grid">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-white/70">
                  Smart Content Studio AI
                </span>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.95] text-white">
                Camera. Social.
                <br />
                <span className="text-amber text-glow-amber">AI</span>{" "}
                <span className="text-white/80">optimized.</span>
              </h1>
              <p className="mt-7 text-base md:text-lg text-white/60 max-w-xl leading-relaxed">
                Asta Creative adalah agency konten kreator berbasis AI. Kami
                menyatukan peralatan kamera, panggung sosial media, dan
                kecerdasan AI dalam satu studio cerdas — siap mempercepat
                produksi konten brand Anda hingga 10x.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  data-testid="hero-cta-primary"
                  className="group inline-flex items-center gap-2 bg-amber text-black px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white transition-colors"
                >
                  Mulai Project
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
                <Link
                  to="/gallery"
                  data-testid="hero-cta-secondary"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  <Play className="h-4 w-4 text-amber" />
                  Lihat Studio
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Hero3DScene />
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-testid={`stat-${i}`}
              className="text-left"
            >
              <p className="font-heading text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
                {s.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee
        items={[
          "AI Video Ads",
          "Content Creator AI",
          "Social Optimization",
          "Brand Storytelling",
          "Performance Studio",
          "Generative Visuals",
        ]}
      />

      {/* SERVICES TEASER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber mb-3">
              ⌬ Our Capability
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tighter text-white max-w-2xl">
              Satu studio. <span className="text-amber">Tiga senjata</span>.
              Hasil tanpa batas.
            </h2>
          </div>
          <Link
            to="/services"
            data-testid="services-link-home"
            className="text-sm text-white/70 hover:text-amber inline-flex items-center gap-1.5"
          >
            All services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-elev p-7 rounded-2xl bg-[#121212] border border-white/10"
              data-testid={`service-card-${i}`}
            >
              <div className="h-12 w-12 rounded-xl bg-amber/10 border border-amber/30 flex items-center justify-center text-amber mb-6">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-white tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS - cinematic timeline */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-amber mb-3">
              ⌬ Workflow
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tighter text-white leading-tight">
              Dari brief ke{" "}
              <span className="text-amber">campaign live</span> dalam 72 jam.
            </h2>
            <p className="text-white/60 text-sm mt-6 max-w-md">
              Tim kreatif manusia + agen AI bekerja paralel di setiap tahap.
              Anda mendapat output sinematik tanpa menunggu jadwal studio
              tradisional.
            </p>
          </div>
          <div className="md:col-span-7 space-y-4">
            {[
              ["01", "Brief & Discovery", "Form singkat, AI brief generator menyiapkan konteks brand."],
              ["02", "Concept Lab", "Konsep visual & copy iklan diproduksi paralel oleh tim & AI."],
              ["03", "Smart Production", "Studio kamera, voice over, dan generative asset bekerja serentak."],
              ["04", "Optimize & Launch", "AI bertindak sebagai layer optimasi: A/B test, scheduling, hingga reporting."],
            ].map(([n, title, desc], i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-6 rounded-xl border border-white/10 bg-[#0F0F0F] card-elev"
                data-testid={`workflow-step-${i}`}
              >
                <div className="font-heading text-3xl font-extrabold text-amber tracking-tight">
                  {n}
                </div>
                <div>
                  <h4 className="font-heading text-xl font-semibold text-white">
                    {title}
                  </h4>
                  <p className="text-sm text-white/55 mt-1.5">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#FFB000]/15 via-[#0A0A0A] to-[#0A0A0A] p-12 md:p-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Sparkles className="h-7 w-7 text-amber mb-4" />
              <h3 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-tight">
                Siap meledakkan konten brand Anda?
              </h3>
              <p className="text-white/60 text-sm mt-5 max-w-md">
                Sesi konsultasi 30 menit gratis dengan tim strategi & AI engineer.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link
                to="/contact"
                data-testid="cta-strip-btn"
                className="inline-flex items-center gap-2 bg-amber text-black px-8 py-4 rounded-full font-semibold text-sm hover:bg-white transition-colors"
              >
                Jadwalkan Sesi <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
