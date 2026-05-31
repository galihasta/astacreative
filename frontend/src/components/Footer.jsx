import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Twitter, Linkedin, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="relative mt-32 border-t border-white/10 bg-[#070707]"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#FFB000] to-[#FF6A00] flex items-center justify-center glow-amber">
              <Sparkles className="h-5 w-5 text-black" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-extrabold tracking-tighter text-xl text-white">
                ASTA CREATIVE
              </span>
              <span className="font-heading font-light tracking-[0.3em] text-[10px] text-amber uppercase">
                smart content studio ai
              </span>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-md">
            We connect cameras, social media, and AI into one optimized creative
            engine — built for brands ready to scale at the speed of culture.
          </p>

          <div className="flex items-center gap-3 mt-8">
            {[Instagram, Youtube, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                data-testid={`footer-social-${i}`}
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-amber hover:border-amber transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
            Navigate
          </p>
          <ul className="space-y-3">
            {[
              ["Home", "/"],
              ["Services", "/services"],
              ["Gallery", "/gallery"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  to={href}
                  data-testid={`footer-link-${label.toLowerCase()}`}
                  className="text-white/70 hover:text-amber text-sm transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
            Studio
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            Jl. Sudirman No. 88, Jakarta Selatan
            <br />
            Indonesia, 12190
          </p>
          <p className="text-white/70 text-sm mt-4">
            hello@astacreative.id
            <br />
            +62 812 8888 0000
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
        <p className="text-white/40 text-xs">
          © {new Date().getFullYear()} Asta Creative. All rights reserved.
        </p>
        <p className="text-white/40 text-xs tracking-[0.2em] uppercase">
          Built with AI · Made in Indonesia
        </p>
      </div>
    </footer>
  );
};

export default Footer;
