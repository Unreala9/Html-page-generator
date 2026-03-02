import { useState, useEffect } from "react";

export default function Design26SunriseBoost({ pageData }: any) {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAngle((a) => (a + 0.5) % 360), 16);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg,#fffbeb 0%,#fde68a 40%,#fbbf24 70%,#f59e0b 100%)",
      }}
    >
      {/* Sun glow */}
      <div
        className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(251,191,36,0.6)" }}
      />
      {/* Warm shadow bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{
          background: "linear-gradient(0deg,rgba(180,100,0,0.2),transparent)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,200,50,0.5)",
          boxShadow:
            "0 20px 80px rgba(251,191,36,0.3),inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        <div className="p-6 flex flex-col items-center gap-4">
          {/* Rotating sun symbol */}
          <div
            className="text-4xl"
            style={{
              display: "inline-block",
              transform: `rotate(${angle}deg)`,
              transition: "none",
            }}
          >
            ☀️
          </div>

          {/* Avatar */}
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-full"
              style={{
                background: "linear-gradient(135deg,#fbbf24,#f59e0b,#fde68a)",
                padding: "2px",
              }}
            >
              <div className="w-full h-full rounded-full bg-white" />
            </div>
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-24 h-24 rounded-full object-cover z-10"
            />
          </div>

          {/* Channel name */}
          <div
            className="text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "#b45309" }}
          >
            {pageData.channel_name}
          </div>

          {/* Title */}
          <h1
            className="text-2xl font-black text-center leading-tight"
            style={{ color: "#78350f" }}
          >
            {pageData.channel_title}
          </h1>

          {/* Desc */}
          <p
            className="text-sm text-center leading-relaxed font-medium"
            style={{ color: "#92400e" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(120,60,14,0.6)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}

          {/* Subscribers pill */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(251,191,36,0.3)",
              border: "1px solid rgba(251,191,36,0.5)",
              color: "#b45309",
            }}
          >
            ✨ {pageData.channel_subscribers?.toLocaleString()} subscribers
          </div>

          {/* CTA */}
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#f59e0b,#fbbf24,#f59e0b)",
              color: "#fff",
              boxShadow: "0 8px 30px rgba(245,158,11,0.5)",
              border: "none",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            ☀️ {pageData.cta_button_text || "Start Today"}
          </button>

          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(120,60,14,0.4)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
