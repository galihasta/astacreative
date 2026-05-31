import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const services = [
  "AI Video Ads",
  "AI Content Creator",
  "AI Voice Over",
  "AI Image Generation",
  "Social Media Optimization",
  "Brand Copywriting AI",
];

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Isi semua field wajib (nama, email, pesan)");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/contact`, form);
      toast.success(res.data.message || "Pesan terkirim!");
      setForm({ name: "", email: "", phone: "", service: services[0], message: "" });
    } catch (err) {
      toast.error("Gagal mengirim. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page" className="relative">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-amber mb-4">
          ⌬ Contact
        </p>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[0.95] max-w-4xl">
          Let's make
          <br />
          <span className="text-amber">something cinematic</span>.
        </h1>
        <p className="mt-7 text-white/60 max-w-2xl">
          Ceritakan brand & objektif Anda. Tim strategi kami akan kembali dalam
          1×24 jam dengan rekomendasi paket dan timeline.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          {[
            {
              icon: Mail,
              title: "Email",
              value: "hello@astacreative.id",
              href: "mailto:hello@astacreative.id",
            },
            {
              icon: Phone,
              title: "WhatsApp",
              value: "+62 812 8888 0000",
              href: "https://wa.me/6281288880000",
            },
            {
              icon: MapPin,
              title: "Studio",
              value: "Jl. Sudirman No. 88, Jakarta Selatan",
              href: "#",
            },
          ].map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-testid={`contact-card-${i}`}
              className="flex items-center gap-5 p-6 rounded-2xl border border-white/10 bg-[#0F0F0F] card-elev"
            >
              <div className="h-12 w-12 rounded-xl bg-amber/15 border border-amber/40 flex items-center justify-center text-amber">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  {c.title}
                </p>
                <p className="text-white text-base font-medium mt-1">{c.value}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-white/40" />
            </motion.a>
          ))}

          <div className="p-6 rounded-2xl border border-amber/40 bg-amber/10">
            <p className="text-xs uppercase tracking-[0.25em] text-amber mb-2">
              ⌬ CS Live
            </p>
            <p className="text-white font-medium">
              Butuh jawaban cepat? Klik widget chat CS Asta Creative di pojok
              kanan bawah — terhubung dengan AI assistant kami 24/7.
            </p>
          </div>
        </div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          data-testid="contact-form"
          className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0F0F0F] p-8 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Nama lengkap *"
              value={form.name}
              onChange={update("name")}
              placeholder="Astawan Adi"
              testid="contact-name"
            />
            <Field
              label="Email *"
              value={form.email}
              onChange={update("email")}
              placeholder="brand@perusahaan.com"
              type="email"
              testid="contact-email"
            />
            <Field
              label="No. WhatsApp"
              value={form.phone}
              onChange={update("phone")}
              placeholder="+62..."
              testid="contact-phone"
            />
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2 block">
                Layanan diminati
              </label>
              <select
                value={form.service}
                onChange={update("service")}
                data-testid="contact-service"
                className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white text-sm focus:outline-none focus:border-amber"
              >
                {services.map((s) => (
                  <option key={s} value={s} className="bg-[#181818]">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2 block">
                Ceritakan brief project *
              </label>
              <textarea
                value={form.message}
                onChange={update("message")}
                data-testid="contact-message"
                rows={5}
                placeholder="Brand, objective, timeline, anggaran kasar..."
                className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white text-sm focus:outline-none focus:border-amber resize-none"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            data-testid="contact-submit"
            className="mt-8 inline-flex items-center gap-2 bg-amber text-black px-8 py-4 rounded-full font-semibold text-sm hover:bg-white disabled:opacity-50 transition-colors"
          >
            {submitting ? "Mengirim..." : "Kirim Brief"}
            <Send className="h-4 w-4" />
          </button>
        </motion.form>
      </section>
    </div>
  );
};

const Field = ({ label, value, onChange, placeholder, type = "text", testid }) => (
  <div>
    <label className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2 block">
      {label}
    </label>
    <input
      data-testid={testid}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber"
    />
  </div>
);

export default ContactPage;
