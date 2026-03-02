import { useState, useEffect } from "react";

export default function Design31IceStorm({ pageData }: any) {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      delay: number;
    }>
  >([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        speed: 3 + Math.random() * 4,
        delay: Math.random() * 3,
      })),
    );
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg,#010a14 0%,#001f3a 50%,#010a14 100%)",
      }}
    >
      <style>{`@keyframes snowfall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(360deg);opacity:0}}`}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "rgba(180,220,255,0.6)",
            animation: `snowfall ${p.speed}s linear ${p.delay}s infinite`,
            boxShadow: "0 0 4px rgba(180,220,255,0.8)",
          }}
        />
      ))}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%,rgba(0,180,255,0.15),transparent 65%)",
        }}
      />

      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl overflow-hidden"
        style={{
          background: "rgba(1,20,40,0.88)",
          border: "1px solid rgba(0,200,255,0.25)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 0 80px rgba(0,180,255,0.15),inset 0 1px 0 rgba(180,220,255,0.1)",
        }}
      >
        <div
          className="h-[2px]"
          style={{
            background:
              "linear-gradient(90deg,transparent,#00c8ff,#80e8ff,#00c8ff,transparent)",
          }}
        />
        <div className="p-6 flex flex-col items-center gap-4">
          <div className="text-3xl">❄️</div>
          <div className="relative">
            <div
              className="absolute -inset-1.5 rounded-full blur-sm"
              style={{ background: "rgba(0,200,255,0.3)" }}
            />
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-24 h-24 rounded-full object-cover z-10"
              style={{ border: "2px solid rgba(0,200,255,0.5)" }}
            />
          </div>
          <div
            className="text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "rgba(0,200,255,0.7)" }}
          >
            {pageData.channel_name}
          </div>
          <h1
            className="text-2xl font-black text-center leading-tight"
            style={{
              background: "linear-gradient(135deg,#fff,#80e8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {pageData.channel_title}
          </h1>
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(180,230,255,0.8)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(140,200,255,0.5)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}
          <div
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#80e8ff" }}
          >
            <span>❄️</span>
            <span>
              {pageData.channel_subscribers?.toLocaleString()} explorers
            </span>
          </div>
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#0070b8,#00c8ff,#80e8ff)",
              color: "#001020",
              boxShadow: "0 0 30px rgba(0,200,255,0.4)",
              border: "none",
            }}
          >
            ❄️ {pageData.cta_button_text || "Explore Now"}
          </button>
          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(0,200,255,0.25)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
