import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10"
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-testid="logo-link"
          onClick={() => setOpen(false)}
        >
          <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-[#FFB000] to-[#FF6A00] flex items-center justify-center glow-amber">
            <Sparkles className="h-5 w-5 text-black" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-extrabold tracking-tighter text-lg text-white">
              ASTA
            </span>
            <span className="font-heading font-light tracking-[0.3em] text-[10px] text-amber uppercase">
              creative
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-amber" : "text-white/70 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/5 border border-white/10"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          data-testid="navbar-cta"
          className="hidden md:inline-flex items-center gap-2 bg-amber text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white transition-colors"
        >
          Book a Call
          <span aria-hidden>→</span>
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-white/10 bg-black/90"
        >
          <div className="px-6 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm ${
                    isActive
                      ? "text-amber bg-white/5"
                      : "text-white/80 hover:bg-white/5"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              data-testid="mobile-cta"
              className="mt-2 inline-flex justify-center items-center bg-amber text-black px-5 py-3 rounded-full text-sm font-semibold"
            >
              Book a Call
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
