import { useState, useEffect } from "react";

export default function Design32MidnightBloom({ pageData }: any) {
  const [glow, setGlow] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setGlow((g) => !g), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{ background: "#08000f" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none transition-all duration-[1800ms]"
        style={{
          background: `radial-gradient(ellipse,${glow ? "rgba(180,0,120,0.18)" : "rgba(120,0,180,0.12)"},transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(255,0,150,0.1)" }}
      />

      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl overflow-hidden"
        style={{
          background: "rgba(15,0,25,0.92)",
          border: "1px solid rgba(200,0,150,0.25)",
          backdropFilter: "blur(20px)",
          boxShadow: `0 0 ${glow ? 80 : 40}px rgba(200,0,150,0.2),inset 0 1px 0 rgba(255,100,200,0.06)`,
        }}
      >
        <div
          className="h-[2px] transition-all duration-[1800ms]"
          style={{
            background: `linear-gradient(90deg,transparent,${glow ? "#ff0096" : "#aa0066"},transparent)`,
          }}
        />
        <div className="p-6 flex flex-col items-center gap-4">
          {/* Bloom avatar */}
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-full pointer-events-none"
              style={{
                background: `conic-gradient(from 0deg,#ff0096,#8800cc,#ff0096)`,
                transform: `rotate(${glow ? 180 : 0}deg)`,
                transition: "transform 1.8s ease-in-out",
                padding: "2px",
                borderRadius: "9999px",
              }}
            />
            <div
              className="absolute -inset-2 rounded-full"
              style={{ background: "#08000f" }}
            />
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-24 h-24 rounded-full object-cover z-10"
            />
          </div>
          <div
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgba(255,0,150,0.7)" }}
          >
            🌸 {pageData.channel_name}
          </div>
          <h1
            className="text-2xl font-black text-center leading-tight"
            style={{
              background: "linear-gradient(135deg,#fff,#ff66c4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {pageData.channel_title}
          </h1>
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(255,180,230,0.8)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(220,150,200,0.5)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}
          <div className="grid grid-cols-2 gap-3 w-full">
            {[
              {
                label: "Members",
                val: pageData.channel_subscribers?.toLocaleString(),
              },
              { label: "Growth", val: "+34%" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-2 rounded-xl"
                style={{
                  background: "rgba(200,0,150,0.08)",
                  border: "1px solid rgba(200,0,150,0.2)",
                }}
              >
                <div
                  className="text-lg font-black"
                  style={{ color: "#ff66c4" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-[9px] uppercase tracking-widest mt-0.5"
                  style={{ color: "rgba(200,0,150,0.5)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#cc0080,#ff0096,#880066)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(255,0,150,0.45)",
              border: "none",
            }}
          >
            🌸 {pageData.cta_button_text || "Join Now"}
          </button>
          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(200,0,150,0.25)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
