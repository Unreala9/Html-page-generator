import { useState, useEffect } from "react";

export default function Design39SkyRocket({ pageData }: any) {
  const [countdown, setCountdown] = useState(10);
  const [launched, setLaunched] = useState(false);
  useEffect(() => {
    if (countdown > 0) {
      const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(id);
    } else {
      setLaunched(true);
    }
  }, [countdown]);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg,#000010 0%,#000428 60%,#001a6e 100%)",
      }}
    >
      {/* Stars BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle,rgba(255,255,255,0.7) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.15,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(0deg,rgba(0,80,200,0.2),transparent)",
        }}
      />
      {/* Launch exhaust */}
      {launched && (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none"
          style={{
            height: "200px",
            background:
              "linear-gradient(0deg,rgba(255,120,0,0.4),rgba(255,200,0,0.2),transparent)",
            filter: "blur(8px)",
            animation: "none",
          }}
        />
      )}

      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl overflow-hidden"
        style={{
          background: "rgba(0,4,40,0.92)",
          border: "1px solid rgba(60,120,255,0.3)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 60px rgba(0,80,255,0.2)",
        }}
      >
        <div
          className="h-[2px]"
          style={{
            background:
              "linear-gradient(90deg,transparent,#3c78ff,#80b0ff,#3c78ff,transparent)",
          }}
        />
        <div className="p-6 flex flex-col items-center gap-4">
          <div
            className="text-3xl"
            style={{
              display: "inline-block",
              animation: launched ? "none" : undefined,
            }}
          >
            {launched ? "🚀💫" : "🚀"}
          </div>
          {/* Countdown badge */}
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold"
            style={{
              background: launched
                ? "rgba(0,200,80,0.15)"
                : "rgba(60,120,255,0.15)",
              border: `1px solid ${launched ? "rgba(0,200,80,0.4)" : "rgba(60,120,255,0.35)"}`,
              color: launched ? "#00c850" : "#80b0ff",
            }}
          >
            {launched ? "✓ LAUNCHED" : `T-${countdown}s TO LAUNCH`}
          </div>
          <div className="relative">
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="w-20 h-20 rounded-full object-cover"
              style={{ border: "2px solid rgba(60,120,255,0.5)" }}
            />
          </div>
          <div
            className="text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "rgba(100,150,255,0.7)" }}
          >
            {pageData.channel_name}
          </div>
          <h1
            className="text-xl font-black text-center leading-tight"
            style={{ color: "#fff" }}
          >
            {pageData.channel_title}
          </h1>
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(180,210,255,0.8)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(140,180,255,0.5)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}
          <div className="text-sm font-semibold" style={{ color: "#80b0ff" }}>
            🚀 {pageData.channel_subscribers?.toLocaleString()} on board
          </div>
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: launched
                ? "linear-gradient(135deg,#00a040,#00c850)"
                : "linear-gradient(135deg,#1a40cc,#3c78ff,#80b0ff)",
              color: "#fff",
              boxShadow: launched
                ? "0 0 30px rgba(0,200,80,0.5)"
                : "0 0 30px rgba(60,120,255,0.5)",
              border: "none",
            }}
          >
            🚀 {pageData.cta_button_text || "Join the Mission"}
          </button>
          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(60,120,255,0.3)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
