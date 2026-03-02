import { useState, useEffect } from "react";

export default function Design33VolcanoRed({ pageData }: any) {
  const [lava, setLava] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLava((l) => (l + 1) % 100), 40);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg,#0d0000 0%,#1a0000 60%,#2d0800 100%)",
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(0deg,rgba(255,50,0,0.25),transparent)`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(255,60,0,0.1),transparent 70%)",
        }}
      />
      {/* Lava shimmer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
        style={{
          background: `linear-gradient(90deg,transparent ${lava}%,rgba(255,100,0,0.9) ${lava + 8}%,transparent ${lava + 16}%)`,
        }}
      />

      <div
        className="relative z-10 w-full max-w-sm mx-4 overflow-hidden rounded-2xl"
        style={{
          background: "rgba(18,2,2,0.92)",
          border: "1px solid rgba(255,50,0,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 60px rgba(255,50,0,0.2)",
        }}
      >
        <div
          className="h-1"
          style={{
            background:
              "linear-gradient(90deg,#8b0000,#ff3200,#ff6000,#ff3200,#8b0000)",
          }}
        />
        <div className="p-6 flex flex-col items-center gap-4">
          <div className="text-2xl animate-bounce">🌋</div>
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-full blur-md"
              style={{ background: "rgba(255,60,0,0.4)" }}
            />
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-24 h-24 rounded-full object-cover z-10"
              style={{ border: "2px solid rgba(255,80,0,0.5)" }}
            />
          </div>
          <div
            className="text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,100,50,0.8)" }}
          >
            🌋 {pageData.channel_name}
          </div>
          <h1
            className="text-2xl font-black text-center leading-tight text-white"
            style={{ textShadow: "0 0 20px rgba(255,80,0,0.7)" }}
          >
            {pageData.channel_title}
          </h1>
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(255,200,160,0.8)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(200,130,100,0.55)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}
          <div
            className="flex items-center gap-2 text-sm font-bold"
            style={{ color: "#ff6030" }}
          >
            🔥 {pageData.channel_subscribers?.toLocaleString()} erupting members
          </div>
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(90deg,#8b0000,#cc2000,#ff4500,#cc2000,#8b0000)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(255,50,0,0.5)",
              border: "none",
            }}
          >
            🌋 {pageData.cta_button_text || "Ignite Now"}
          </button>
          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(255,80,0,0.25)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
