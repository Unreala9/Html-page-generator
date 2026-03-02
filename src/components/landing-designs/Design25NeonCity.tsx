import { useState, useEffect } from "react";

export default function Design25NeonCity({ pageData }: any) {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{ background: "#050008" }}
    >
      {/* Cyberpunk neon glows */}
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "rgba(255,0,200,0.12)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "rgba(0,200,255,0.12)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: "rgba(130,0,255,0.08)" }}
      />

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.5) 2px,rgba(255,255,255,0.5) 3px)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,0,20,0.9)",
          border: "1px solid rgba(255,0,200,0.3)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 0 40px rgba(255,0,200,0.2),0 0 80px rgba(0,200,255,0.1),inset 0 0 20px rgba(130,0,255,0.05)",
        }}
      >
        {/* Neon top stripe */}
        <div
          className="h-[2px]"
          style={{
            background:
              "linear-gradient(90deg,#ff00c8,#8000ff,#00c8ff,#8000ff,#ff00c8)",
          }}
        />

        <div className="p-6 flex flex-col items-center gap-4">
          {/* System badge */}
          <div
            className="flex items-center gap-2 px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest"
            style={{
              background: "rgba(255,0,200,0.1)",
              border: "1px solid rgba(255,0,200,0.3)",
              color: "#ff00c8",
            }}
          >
            <span
              style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
            >
              ■
            </span>
            SIGNAL LIVE
          </div>

          {/* Avatar with neon ring */}
          <div className="relative">
            <div
              className="absolute inset-[-3px] rounded-full animate-spin"
              style={{
                background:
                  "conic-gradient(from 0deg,#ff00c8,#8000ff,#00c8ff,#8000ff,#ff00c8)",
                animationDuration: "3s",
              }}
            />
            <div
              className="absolute inset-[-1px] rounded-full"
              style={{ background: "#050008" }}
            />
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-24 h-24 rounded-full object-cover z-10"
            />
          </div>

          {/* Channel name */}
          <div
            className="text-xs font-mono font-bold uppercase tracking-[0.3em]"
            style={{ color: "#00c8ff", textShadow: "0 0 10px #00c8ff" }}
          >
            // {pageData.channel_name}
          </div>

          {/* Title */}
          <h1
            className="text-2xl font-black text-center leading-tight"
            style={{
              color: "#fff",
              textShadow: "0 0 20px rgba(255,0,200,0.8)",
            }}
          >
            {pageData.channel_title}
          </h1>

          {/* Desc */}
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(200,180,255,0.8)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(200,180,255,0.5)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}

          {/* Subs */}
          <div
            className="flex items-center gap-2 text-sm font-mono"
            style={{ color: "#ff00c8" }}
          >
            <span style={{ opacity: blink ? 1 : 0 }}>▮</span>
            {pageData.channel_subscribers?.toLocaleString()} users online
          </div>

          {/* CTA */}
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 font-mono"
            style={{
              background: "linear-gradient(90deg,#ff00c8,#8000ff,#00c8ff)",
              color: "#fff",
              boxShadow:
                "0 0 20px rgba(255,0,200,0.5),0 0 40px rgba(0,200,255,0.3)",
              border: "none",
            }}
          >
            ⚡ {pageData.cta_button_text || "CONNECT NOW"}
          </button>

          <p
            className="text-[9px] text-center uppercase tracking-widest font-mono"
            style={{ color: "rgba(200,0,255,0.25)" }}
          >
            disclaimer: educational only // not financial advice
          </p>
        </div>
      </div>
    </main>
  );
}
