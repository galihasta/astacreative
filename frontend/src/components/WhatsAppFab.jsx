import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WA_NUMBER = "6281288880000"; // +62 812 8888 0000 (placeholder)
const WA_TEXT = encodeURIComponent(
  "Halo Asta Creative, saya tertarik dengan layanan Smart Content Studio AI."
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

const WhatsAppFab = () => {
  return (
    <motion.a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 16 }}
      data-testid="whatsapp-fab"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-24 right-6 z-[999] group"
    >
      <motion.span
        animate={{ opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-[#25D366] blur-2xl"
      />
      <span className="relative h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_40px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0F0F0F] border border-white/10 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat WhatsApp
      </span>
    </motion.a>
  );
};

const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.04 1.348-1.04 2.295 0 .788.224 1.602.51 2.336.802 2.052 2.16 4.005 3.78 5.515 1.062 1.016 2.34 1.762 3.703 2.234.4.13.832.215 1.247.215.834 0 1.85-.55 2.234-1.305.215-.402.32-.84.32-1.27 0-.13-.043-.345-.143-.43-.43-.345-2.78-1.546-3.296-1.546zm-2.997 11.075c-2.193 0-4.343-.602-6.234-1.706L1.93 28.853l2.394-7.7c-1.376-1.945-2.106-4.27-2.106-6.692 0-6.486 5.222-11.736 11.692-11.736 6.47 0 11.706 5.25 11.706 11.736 0 6.485-5.236 11.82-11.706 11.82zm0-21.42c-5.32 0-9.65 4.342-9.65 9.685a9.66 9.66 0 0 0 1.847 5.69l-1.39 4.487 4.642-1.476a9.566 9.566 0 0 0 5.165 1.504c5.32 0 9.65-4.342 9.65-9.685S21.434 6.86 16.113 6.86z" />
  </svg>
);

export default WhatsAppFab;
