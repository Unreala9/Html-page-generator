import { useState, useEffect } from "react";

export default function Design21FireStrike({ pageData }: any) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg,#0d0d0d 0%,#1a0500 50%,#0d0d0d 100%)",
      }}
    >
      {/* Fire glow orbs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(255,80,0,0.35),transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[400px] h-[200px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(255,200,0,0.2),transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-2xl border border-orange-800/40 shadow-[0_0_60px_rgba(255,80,0,0.25)] overflow-hidden"
        style={{
          background: "rgba(20,6,0,0.85)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Top stripe */}
        <div
          className="h-1 w-full"
          style={{
            background: "linear-gradient(90deg,#ff4500,#ff9500,#ff4500)",
          }}
        />

        <div className="p-6 flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-60"
              style={{
                background: "radial-gradient(circle,#ff6a00,transparent)",
              }}
            />
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-24 h-24 rounded-full object-cover border-2 border-orange-500 shadow-[0_0_20px_rgba(255,100,0,0.6)]"
            />
          </div>

          {/* Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: "rgba(255,80,0,0.15)",
              border: "1px solid rgba(255,80,0,0.4)",
              color: "#ff9060",
            }}
          >
            🔥 {pageData.channel_name}
          </div>

          {/* Title */}
          <h1
            className="text-2xl font-black text-center leading-tight"
            style={{
              color: "#fff",
              textShadow: "0 0 30px rgba(255,120,0,0.7)",
            }}
          >
            {pageData.channel_title}
          </h1>

          {/* Desc */}
          <p
            className="text-sm text-center font-medium leading-relaxed"
            style={{ color: "rgba(255,200,160,0.85)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(255,160,100,0.6)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}

          {/* Subscribers */}
          <div
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#ffaa60" }}
          >
            <span>🔥</span>
            <span>
              {pageData.channel_subscribers?.toLocaleString()} members burning
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-xl font-black text-base uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: pulse
                ? "linear-gradient(90deg,#ff6a00,#ffba08)"
                : "linear-gradient(90deg,#ff4500,#ff9500)",
              color: "#000",
              boxShadow: "0 0 30px rgba(255,100,0,0.6)",
              border: "none",
            }}
          >
            🔥 {pageData.cta_button_text || "Join Now"}
          </button>

          {/* Disclaimer */}
          <p
            className="text-[9px] text-center uppercase tracking-widest mt-1"
            style={{ color: "rgba(255,120,60,0.4)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
