import React from "react";

const Marquee = ({ items = [], speed = 30 }) => {
  const list = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#0A0A0A] py-6">
      <div
        className="marquee-track text-3xl md:text-5xl font-heading font-black tracking-tighter uppercase"
        style={{ animationDuration: `${speed}s` }}
      >
        {list.map((text, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6">
            <span className="text-white/80">{text}</span>
            <span className="text-amber">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
