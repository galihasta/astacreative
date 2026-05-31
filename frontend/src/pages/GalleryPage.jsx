import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const galleryItems = [
  {
    url: "https://static.prod-images.emergentagent.com/jobs/056936a9-f2e5-421b-ba5a-d34211c8877a/images/df1efef27f0de52e858dd166c175bfc5d83f39f7f3b1eb5d1a960f6b16db2b98.png",
    title: "Robotic Camera Arm",
    tag: "Studio System",
    span: "md:col-span-8 md:row-span-2 h-[420px] md:h-[560px]",
  },
  {
    url: "https://static.prod-images.emergentagent.com/jobs/056936a9-f2e5-421b-ba5a-d34211c8877a/images/ba73290784d35c51ba9dee553c2c665f0eb010bdd3d82ae3079ceb77b603c1ec.png",
    title: "AI Core Node",
    tag: "Generative Visual",
    span: "md:col-span-4 h-[260px]",
  },
  {
    url: "https://static.prod-images.emergentagent.com/jobs/056936a9-f2e5-421b-ba5a-d34211c8877a/images/89760e36cc490426e7d01e1b13a5be98d6a9e0431dbcf8368ff7cf081c56f57b.png",
    title: "Social Network AI",
    tag: "Concept Art",
    span: "md:col-span-4 h-[280px]",
  },
  {
    url: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2FtZXJhJTIwbGlnaHRpbmclMjBzdHVkaW98ZW58MHx8fHwxNzgwMTkzOTMwfDA&ixlib=rb-4.1.0&q=85",
    title: "Cinema Lens Setup",
    tag: "Studio Day",
    span: "md:col-span-6 h-[340px]",
  },
  {
    url: "https://images.pexels.com/photos/28277575/pexels-photo-28277575.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Camera Wall",
    tag: "Production",
    span: "md:col-span-6 h-[340px]",
  },
  {
    url: "https://images.pexels.com/photos/31726559/pexels-photo-31726559.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Podcast Studio",
    tag: "Voice Lab",
    span: "md:col-span-8 h-[360px]",
  },
  {
    url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxhaSUyMHN0dWRpbyUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzgwMTkzOTMwfDA&ixlib=rb-4.1.0&q=85",
    title: "Neon Tech Setup",
    tag: "Tech",
    span: "md:col-span-4 h-[360px]",
  },
];

const GalleryPage = () => {
  return (
    <div data-testid="gallery-page" className="relative">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-amber mb-4">
          ⌬ Gallery
        </p>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[0.95]">
          Inside our{" "}
          <span className="text-amber">AI studio</span>.
        </h1>
        <p className="mt-6 text-white/60 max-w-2xl">
          Showcase peralatan studio, hasil generatif AI, dan moodboard project
          Asta Creative. Setiap gambar adalah cerita tentang bagaimana AI dan
          kamera bekerja berdampingan.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {galleryItems.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              whileHover={{ y: -6 }}
              data-testid={`gallery-item-${i}`}
              className={`relative overflow-hidden rounded-2xl border border-white/10 group ${g.span}`}
            >
              <img
                src={g.url}
                alt={g.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-amber mb-1">
                    {g.tag}
                  </p>
                  <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
                    {g.title}
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
