import { useState, useEffect } from "react";

export default function Design34CosmicDrift({ pageData }: any) {
  const [stars] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      dur: 2 + Math.random() * 4,
      delay: Math.random() * 4,
    })),
  );

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%,#0a0128 0%,#000008 100%)",
      }}
    >
      <style>{`@keyframes twinkle{0%,100%{opacity:0.2}50%{opacity:1}}`}</style>
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: "#fff",
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: "rgba(80,0,200,0.15)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "rgba(0,100,255,0.12)" }}
      />

      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl overflow-hidden"
        style={{
          background: "rgba(5,0,20,0.9)",
          border: "1px solid rgba(120,80,255,0.25)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 80px rgba(80,0,200,0.2)",
        }}
      >
        <div
          className="h-[2px]"
          style={{
            background:
              "linear-gradient(90deg,transparent,#6040ff,#a080ff,#6040ff,transparent)",
          }}
        />
        <div className="p-6 flex flex-col items-center gap-4">
          <div className="text-2xl">🌌</div>
          <div className="relative">
            <div
              className="absolute -inset-[3px] rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg,#6040ff,#a080ff,#00c8ff,#a080ff,#6040ff)",
                padding: "2px",
              }}
            />
            <div
              className="absolute -inset-[1px] rounded-full"
              style={{ background: "#050014" }}
            />
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-24 h-24 rounded-full object-cover z-10"
            />
          </div>
          <div
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgba(160,128,255,0.75)" }}
          >
            {pageData.channel_name}
          </div>
          <h1
            className="text-2xl font-black text-center leading-tight"
            style={{
              background: "linear-gradient(135deg,#fff,#a080ff,#00c8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {pageData.channel_title}
          </h1>
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(200,190,255,0.8)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(160,150,230,0.5)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}
          <div
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#a080ff" }}
          >
            ✦ {pageData.channel_subscribers?.toLocaleString()} stars joined
          </div>
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#4020cc,#6040ff,#a080ff)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(100,60,255,0.5)",
              border: "none",
            }}
          >
            🌌 {pageData.cta_button_text || "Enter the Cosmos"}
          </button>
          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(120,80,255,0.3)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
