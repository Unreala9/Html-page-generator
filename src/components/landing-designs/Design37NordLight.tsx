import { useState, useEffect } from "react";

export default function Design37NordLight({ pageData }: any) {
  const [auroraPos, setAuroraPos] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAuroraPos((p) => (p + 0.3) % 100), 30);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg,#020d10 0%,#041520 70%,#020d10 100%)",
      }}
    >
      {/* Aurora ribbons */}
      <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none overflow-hidden">
        <div
          className="absolute w-full h-32"
          style={{
            top: `${auroraPos * 0.3}px`,
            background:
              "linear-gradient(180deg,transparent,rgba(0,255,180,0.08),rgba(0,200,255,0.06),transparent)",
            filter: "blur(12px)",
            transform: `skewY(${Math.sin(auroraPos * 0.05) * 3}deg)`,
          }}
        />
        <div
          className="absolute w-full h-24"
          style={{
            top: `${20 + auroraPos * 0.2}px`,
            background:
              "linear-gradient(180deg,transparent,rgba(120,0,255,0.06),rgba(0,200,255,0.05),transparent)",
            filter: "blur(8px)",
            transform: `skewY(${Math.cos(auroraPos * 0.04) * 2}deg)`,
          }}
        />
      </div>

      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl overflow-hidden"
        style={{
          background: "rgba(2,16,22,0.92)",
          border: "1px solid rgba(0,220,180,0.2)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 0 80px rgba(0,200,180,0.1)",
        }}
      >
        <div
          className="h-[2px]"
          style={{
            background:
              "linear-gradient(90deg,transparent,#00dcb4,#00c8ff,#8000ff,#00c8ff,#00dcb4,transparent)",
          }}
        />
        <div className="p-6 flex flex-col items-center gap-4">
          <div className="text-2xl">🌌</div>
          <div className="relative">
            <div
              className="absolute -inset-2 rounded-full blur-md"
              style={{ background: "rgba(0,200,180,0.25)" }}
            />
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-24 h-24 rounded-full object-cover z-10"
              style={{ border: "2px solid rgba(0,220,180,0.4)" }}
            />
          </div>
          <div
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgba(0,220,180,0.7)" }}
          >
            {pageData.channel_name}
          </div>
          <h1
            className="text-2xl font-black text-center leading-tight"
            style={{
              background: "linear-gradient(135deg,#fff,#00dcb4,#00c8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {pageData.channel_title}
          </h1>
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(180,240,230,0.8)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(140,200,190,0.5)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(0,220,180,0.08)",
              border: "1px solid rgba(0,220,180,0.25)",
              color: "#00dcb4",
            }}
          >
            🌌 {pageData.channel_subscribers?.toLocaleString()} members
          </div>
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#006654,#00dcb4,#00c8ff)",
              color: "#020d10",
              boxShadow: "0 0 30px rgba(0,200,180,0.4)",
              border: "none",
            }}
          >
            🌌 {pageData.cta_button_text || "See the Light"}
          </button>
          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(0,200,180,0.25)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
