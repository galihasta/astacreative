import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initialMsg = {
  role: "assistant",
  content:
    "Halo! 👋 Saya CS Asta Creative. Ada yang bisa saya bantu seputar AI Content Studio kami? Tanyakan tentang layanan, paket harga, atau timeline produksi.",
};

const sessionKey = "asta-cs-session";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([initialMsg]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => {
    let id = localStorage.getItem(sessionKey);
    if (!id) {
      id = `asta_${Math.random().toString(36).slice(2)}_${Date.now()}`;
      localStorage.setItem(sessionKey, id);
    }
    return id;
  });
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await axios.post(`${API}/chat`, {
        session_id: sessionId,
        message: text,
      });
      setMessages((m) => [...m, { role: "assistant", content: res.data.reply }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Maaf, ada gangguan koneksi. Silakan coba lagi atau isi form kontak kami.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 18 }}
        onClick={() => setOpen((v) => !v)}
        data-testid="chat-fab"
        className="fixed bottom-24 right-6 z-[999] h-14 w-14 rounded-full bg-amber text-black flex items-center justify-center glow-amber hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed bottom-44 right-6 z-[999] w-[92vw] max-w-[400px] h-[560px] rounded-2xl border border-white/10 bg-[#0F0F0F] shadow-2xl overflow-hidden flex flex-col"
            data-testid="chat-window"
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3 bg-[#121212]">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#FFB000] to-[#FF6A00] flex items-center justify-center">
                <Bot className="h-5 w-5 text-black" />
              </div>
              <div className="leading-tight">
                <p className="text-white font-heading font-semibold text-sm">
                  CS Asta Creative
                </p>
                <p className="text-amber text-[10px] uppercase tracking-[0.25em] flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AI Powered · Online
                </p>
              </div>
            </div>

            <div
              ref={scrollerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0A0A0A]"
              data-testid="chat-scroll"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    data-testid={`chat-msg-${m.role}-${i}`}
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-amber text-black rounded-br-sm"
                        : "bg-[#1A1A1A] text-white/90 border border-white/10 rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber animate-bounce" />
                      <span
                        className="h-2 w-2 rounded-full bg-amber animate-bounce"
                        style={{ animationDelay: "120ms" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-amber animate-bounce"
                        style={{ animationDelay: "240ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/10 bg-[#0F0F0F]">
              <div className="flex items-end gap-2 bg-[#1A1A1A] border border-white/10 rounded-xl p-2">
                <textarea
                  data-testid="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  rows={1}
                  placeholder="Tulis pertanyaan Anda..."
                  className="flex-1 bg-transparent text-white text-sm outline-none resize-none placeholder:text-white/30 py-1 px-2 max-h-24"
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  data-testid="chat-send"
                  className="h-9 w-9 rounded-lg bg-amber text-black flex items-center justify-center hover:bg-white disabled:opacity-40 transition-colors"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[10px] text-white/30 text-center mt-2">
                Powered by Asta Creative AI · Claude Sonnet
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
