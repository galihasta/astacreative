import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Workflow, Zap } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "AI as Optimizer",
    desc: "AI bukan menggantikan kreator; AI mengoptimalkan setiap detik produksi & distribusi.",
  },
  {
    icon: Users,
    title: "Human Direction",
    desc: "Setiap project dipimpin creative director manusia dengan asisten AI yang cepat tanggap.",
  },
  {
    icon: Workflow,
    title: "Studio-grade Workflow",
    desc: "Pipeline produksi bento: setiap modul terpisah tapi terhubung — siap scale.",
  },
  {
    icon: Zap,
    title: "Speed of Culture",
    desc: "Konten siap go-live mengikuti tempo trend, bukan tempo timeline tradisional.",
  },
];

const team = [
  { name: "Astawan A.", role: "Founder & Creative Director" },
  { name: "Rania D.", role: "AI Engineer Lead" },
  { name: "Bima S.", role: "Head of Video Production" },
  { name: "Kayla P.", role: "Brand Strategy" },
];

const AboutPage = () => {
  return (
    <div data-testid="about-page" className="relative">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.3em] text-amber mb-4">
            ⌬ About Asta Creative
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[0.95]">
            Built for the
            <br />
            <span className="text-amber">post-feed</span> era.
          </h1>
          <p className="mt-7 text-white/65 leading-relaxed max-w-2xl">
            Kami percaya konten brand era ini harus diproduksi seperti studio
            film + lab AI: cepat, sinematik, dan terus belajar dari datanya
            sendiri. Asta Creative berdiri untuk membuat hal itu mungkin bagi
            brand Indonesia.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ["2022", "Studio launched"],
              ["120+", "Brands"],
              ["8K+", "Asset / month"],
              ["3.4×", "Avg. CTR lift"],
            ].map(([v, l], i) => (
              <div key={i} className="border-l border-amber/40 pl-4">
                <p className="font-heading text-3xl font-extrabold text-white tracking-tighter">
                  {v}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden border border-white/10">
            <img
              src="https://static.prod-images.emergentagent.com/jobs/056936a9-f2e5-421b-ba5a-d34211c8877a/images/df1efef27f0de52e858dd166c175bfc5d83f39f7f3b1eb5d1a960f6b16db2b98.png"
              alt="Asta Studio"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber">
                The Studio
              </p>
              <p className="font-heading text-2xl font-bold text-white mt-1">
                Jakarta · Bali · Online
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 border-t border-white/10">
        <p className="text-xs uppercase tracking-[0.3em] text-amber mb-3">
          ⌬ Values
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tighter text-white max-w-3xl">
          Empat <span className="text-amber">prinsip</span> yang menggerakkan studio.
        </h2>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-testid={`value-${i}`}
              className="p-7 rounded-2xl border border-white/10 bg-[#0F0F0F] card-elev"
            >
              <div className="h-11 w-11 rounded-lg bg-amber/15 border border-amber/30 flex items-center justify-center text-amber mb-5">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">{v.title}</h3>
              <p className="text-sm text-white/55 mt-2 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 border-t border-white/10">
        <p className="text-xs uppercase tracking-[0.3em] text-amber mb-3">⌬ Team</p>
        <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tighter text-white max-w-3xl">
          Manusia di balik <span className="text-amber">algoritma</span>.
        </h2>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-testid={`team-${i}`}
              className="rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F0F]"
            >
              <div className="aspect-square bg-gradient-to-br from-amber/30 to-[#111] flex items-center justify-center">
                <span className="font-heading text-6xl font-extrabold text-black/40">
                  {t.name.split(" ").map((s) => s[0]).join("")}
                </span>
              </div>
              <div className="p-5">
                <p className="font-heading text-lg font-semibold text-white">
                  {t.name}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-amber mt-1">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
