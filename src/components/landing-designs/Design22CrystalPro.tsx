import { useState, useEffect } from "react";

export default function Design22CrystalPro({ pageData }: any) {
  const [shine, setShine] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setShine((s) => (s + 1) % 100), 30);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg,#020c18 0%,#051b30 50%,#020c18 100%)",
      }}
    >
      {/* Crystal glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(0,200,255,0.15),transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(120,0,255,0.12),transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(0,200,255,0.08),rgba(120,0,255,0.08))",
          border: "1px solid rgba(0,220,255,0.2)",
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 25px 80px rgba(0,200,255,0.15),inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Shimmer top bar */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg,transparent ${shine}%,rgba(0,220,255,0.8) ${shine + 10}%,transparent ${shine + 20}%)`,
          }}
        />

        <div className="p-7 flex flex-col items-center gap-5">
          {/* Avatar with crystal ring */}
          <div className="relative">
            <div
              className="absolute inset-[-6px] rounded-full"
              style={{
                background: "conic-gradient(from 0deg,#00c8ff,#8000ff,#00c8ff)",
                padding: "2px",
                borderRadius: "9999px",
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ background: "#020c18" }}
              />
            </div>
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-24 h-24 rounded-full object-cover z-10"
            />
          </div>

          {/* Label */}
          <div
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(0,220,255,0.7)", letterSpacing: "0.25em" }}
          >
            ◈ {pageData.channel_name} ◈
          </div>

          {/* Title */}
          <h1
            className="text-2xl font-black text-center leading-tight"
            style={{
              background: "linear-gradient(135deg,#ffffff,#00c8ff,#ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {pageData.channel_title}
          </h1>

          {/* Divider */}
          <div
            className="w-16 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(0,220,255,0.6),transparent)",
            }}
          />

          {/* Desc */}
          <p
            className="text-sm text-center leading-relaxed font-medium"
            style={{ color: "rgba(200,240,255,0.8)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(160,210,255,0.55)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}

          {/* Subscribers */}
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-xl font-black" style={{ color: "#00c8ff" }}>
                {pageData.channel_subscribers?.toLocaleString()}
              </div>
              <div
                className="text-[10px] uppercase tracking-widest"
                style={{ color: "rgba(0,200,255,0.5)" }}
              >
                Members
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#00c8ff,#0070ff,#8000ff)",
              color: "#fff",
              boxShadow:
                "0 0 40px rgba(0,150,255,0.5),inset 0 1px 0 rgba(255,255,255,0.2)",
              border: "none",
            }}
          >
            💎 {pageData.cta_button_text || "Join Now"}
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
