import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative pt-20"
        data-testid="page-main"
      >
        {/* Cinematic shutter transition */}
        <motion.div
          className="shutter origin-top"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
        />
        <Outlet />
        <Footer />
      </motion.main>
    </>
  );
};

export default Layout;
