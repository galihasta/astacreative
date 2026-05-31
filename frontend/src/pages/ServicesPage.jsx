import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  Camera,
  Mic,
  Wand2,
  TrendingUp,
  Image as ImageIcon,
  Megaphone,
  PenTool,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    icon: Video,
    title: "AI Video Ads",
    sub: "Performance Video Studio",
    desc: "Iklan video singkat 5–30 detik dirancang AI untuk meta, TikTok, dan YouTube Shorts. Storyboard, voice over, dan editing 100% siap publish.",
    points: ["Hook AI scripting", "Multi-aspect render", "A/B variation"],
  },
  {
    icon: Camera,
    title: "AI Content Creator",
    sub: "Always-on Visual Studio",
    desc: "Studio konten harian: foto produk, reels, behind-the-scene, hingga UGC AI-generated yang konsisten dengan tone brand.",
    points: ["30+ asset/bulan", "Brand voice tuning", "Trend-aware drops"],
  },
  {
    icon: Mic,
    title: "AI Voice Over & Dubbing",
    sub: "Multi-language Studio",
    desc: "Voice over natural dalam bahasa Indonesia, English, dan 12 bahasa lain. Cloning suara brand ambassador (dengan izin).",
    points: ["Studio-grade audio", "12+ bahasa", "Karakter custom"],
  },
  {
    icon: ImageIcon,
    title: "AI Image Generation",
    sub: "Concept & Mockup Lab",
    desc: "Visual konsep iklan, mockup produk, dan key-visual campaign dibuat dalam menit, bukan minggu.",
    points: ["Gaya editorial", "Mockup 360°", "Storyworld assets"],
  },
  {
    icon: TrendingUp,
    title: "Social Media Optimization",
    sub: "AI-driven Growth",
    desc: "AI memantau performa konten harian dan auto-tune jadwal, thumbnail, dan copy untuk reach maksimum.",
    points: ["Auto reschedule", "Smart hashtags", "Realtime report"],
  },
  {
    icon: PenTool,
    title: "Brand Copywriting AI",
    sub: "Story Engine",
    desc: "Caption, tagline, hingga script panjang yang konsisten dengan tone-of-voice brand Anda — disetir agen Claude Sonnet.",
    points: ["TOV training", "Long-form & micro", "SEO ready"],
  },
];

const ServicesPage = () => {
  return (
    <div data-testid="services-page" className="relative">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-amber mb-4">
          ⌬ Services
        </p>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[0.95]">
          Smart Content Studio,
          <br />
          <span className="text-amber">all-in-one engine</span>.
        </h1>
        <p className="mt-7 text-white/60 max-w-2xl">
          Setiap layanan kami berbagi otak AI yang sama — sehingga voice,
          visual, dan strategy brand Anda tetap konsisten di seluruh kanal.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24" style={{ perspective: 1500 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              index={i}
              testid={`service-${i}`}
            />
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 border-t border-white/10">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-amber mb-3">
            ⌬ Packages
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tighter text-white max-w-3xl">
            Paket fleksibel, <span className="text-amber">scale anytime</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter",
              price: "Rp 2,5 jt",
              tagline: "/bulan",
              desc: "Untuk UMKM yang baru memulai journey konten AI.",
              features: ["10 asset/bulan", "AI copywriting", "1 platform"],
            },
            {
              name: "Studio",
              price: "Rp 7,5 jt",
              tagline: "/bulan",
              desc: "Untuk brand yang serius scale di multi-platform.",
              features: [
                "30+ asset/bulan",
                "AI Video Ads (5)",
                "Voice Over (ID/EN)",
                "Smart scheduler",
              ],
              highlight: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              tagline: "",
              desc: "Untuk brand yang butuh full team AI + studio dedikasi.",
              features: [
                "Unlimited asset",
                "Custom AI model",
                "Dedicated team",
                "SLA support",
              ],
            },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-testid={`pkg-${i}`}
              className={`rounded-2xl border p-8 card-elev ${
                p.highlight
                  ? "border-amber bg-gradient-to-b from-amber/15 to-transparent glow-amber"
                  : "border-white/10 bg-[#0F0F0F]"
              }`}
            >
              {p.highlight && (
                <p className="inline-block mb-4 text-[10px] uppercase tracking-[0.25em] bg-amber text-black px-2 py-1 rounded-full">
                  Most Popular
                </p>
              )}
              <h3 className="font-heading text-3xl font-bold text-white tracking-tight">
                {p.name}
              </h3>
              <p className="text-sm text-white/55 mt-2">{p.desc}</p>
              <div className="flex items-baseline gap-1 mt-6">
                <span className="font-heading text-4xl font-extrabold text-white tracking-tighter">
                  {p.price}
                </span>
                <span className="text-white/50 text-sm">{p.tagline}</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="h-4 w-4 text-amber" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                data-testid={`pkg-cta-${i}`}
                className={`mt-8 inline-flex w-full justify-center items-center px-5 py-3 rounded-full text-sm font-semibold ${
                  p.highlight
                    ? "bg-amber text-black hover:bg-white"
                    : "border border-white/15 text-white hover:bg-white/5"
                } transition-colors`}
              >
                Pilih Paket
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
