import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CinematicTransition from "@/components/CinematicTransition";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <CinematicTransition />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
        transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
        className="relative pt-20"
        data-testid="page-main"
      >
        <Outlet />
        <Footer />
      </motion.main>
    </>
  );
};

export default Layout;
