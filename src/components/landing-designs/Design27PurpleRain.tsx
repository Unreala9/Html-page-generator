import { useState, useEffect } from "react";

export default function Design27PurpleRain({ pageData }: any) {
  const [drops, setDrops] = useState<
    Array<{ id: number; x: number; delay: number; speed: number }>
  >([]);
  useEffect(() => {
    setDrops(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        speed: 1.5 + Math.random() * 2,
      })),
    );
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg,#0c001f 0%,#1a0040 50%,#0c001f 100%)",
      }}
    >
      {/* Purple glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse,rgba(140,0,255,0.3),transparent 70%)",
        }}
      />

      {/* Rain drops */}
      {drops.map((d) => (
        <div
          key={d.id}
          className="absolute top-0 w-[1px] pointer-events-none"
          style={{
            left: `${d.x}%`,
            height: "60px",
            background:
              "linear-gradient(180deg,transparent,rgba(180,100,255,0.4))",
            animation: `rain ${d.speed}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes rain { 0%{transform:translateY(-60px)} 100%{transform:translateY(110vh)} }`}</style>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl overflow-hidden"
        style={{
          background: "rgba(20,0,50,0.85)",
          border: "1px solid rgba(160,80,255,0.3)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 0 80px rgba(140,0,255,0.2),inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="p-6 flex flex-col items-center gap-4">
          {/* Top badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
            style={{
              background: "rgba(140,0,255,0.2)",
              border: "1px solid rgba(160,80,255,0.4)",
              color: "#c080ff",
            }}
          >
            ★ PREMIUM SIGNALS ★
          </div>

          {/* Avatar */}
          <div className="relative">
            <div
              className="absolute -inset-[3px] rounded-full blur-sm"
              style={{ background: "rgba(140,0,255,0.5)" }}
            />
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-24 h-24 rounded-full object-cover z-10"
              style={{ border: "2px solid rgba(160,80,255,0.6)" }}
            />
          </div>

          {/* Channel name */}
          <div
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgba(160,80,255,0.8)" }}
          >
            {pageData.channel_name}
          </div>

          {/* Title */}
          <h1
            className="text-2xl font-black text-center leading-tight"
            style={{
              background: "linear-gradient(135deg,#ffffff,#c080ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {pageData.channel_title}
          </h1>

          {/* Desc */}
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(220,180,255,0.8)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(180,120,255,0.55)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {[
              {
                label: "Members",
                val: pageData.channel_subscribers?.toLocaleString(),
              },
              { label: "Win Rate", val: "91%" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-2 rounded-xl"
                style={{
                  background: "rgba(140,0,255,0.1)",
                  border: "1px solid rgba(160,80,255,0.2)",
                }}
              >
                <div
                  className="text-xl font-black"
                  style={{ color: "#c080ff" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-[9px] uppercase tracking-widest mt-0.5"
                  style={{ color: "rgba(160,80,255,0.5)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#8000ff,#b040ff,#6000cc)",
              color: "#fff",
              boxShadow:
                "0 0 30px rgba(140,0,255,0.5),inset 0 1px 0 rgba(255,255,255,0.15)",
              border: "none",
            }}
          >
            💜 {pageData.cta_button_text || "Join Premium"}
          </button>

          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(160,80,255,0.3)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
