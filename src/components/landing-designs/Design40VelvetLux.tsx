import { useState, useEffect } from "react";

export default function Design40VelvetLux({ pageData }: any) {
  const [shimmer, setShimmer] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setShimmer((s) => (s + 1) % 100), 25);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg,#0c0008 0%,#1a0015 50%,#0c0008 100%)",
      }}
    >
      {/* Velvet glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse,rgba(180,0,100,0.18),transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: "rgba(100,0,60,0.15)" }}
      />

      {/* Card with gold shimmer border */}
      <div
        className="relative z-10 w-full max-w-sm mx-4"
        style={{
          padding: "1px",
          borderRadius: "24px",
          background: `linear-gradient(${shimmer * 3.6}deg,#6b003a,#c8006a,#f0c0d8,#c8006a,#6b003a)`,
        }}
      >
        <div
          className="rounded-[23px] overflow-hidden"
          style={{ background: "linear-gradient(160deg,#100010,#1a0018)" }}
        >
          <div className="p-6 flex flex-col items-center gap-4">
            {/* Velvet header */}
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{
                background: "rgba(180,0,100,0.15)",
                border: "1px solid rgba(200,0,120,0.3)",
                color: "#e060a0",
              }}
            >
              ✦ VELVET VIP ✦
            </div>

            {/* Avatar */}
            <div className="relative">
              <div
                className="absolute -inset-[3px] rounded-full"
                style={{
                  background: `conic-gradient(from ${shimmer * 3.6}deg,#6b003a,#c8006a,#f0c0d8,#c8006a,#6b003a)`,
                }}
              />
              <div
                className="absolute -inset-[1px] rounded-full"
                style={{ background: "#100010" }}
              />
              <img
                src={pageData.image_url}
                alt={pageData.channel_title}
                className="relative w-24 h-24 rounded-full object-cover z-10"
              />
            </div>

            <div
              className="text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "rgba(200,0,120,0.7)" }}
            >
              ♦ {pageData.channel_name} ♦
            </div>
            <h1
              className="text-2xl font-black text-center leading-tight"
              style={{
                background: "linear-gradient(135deg,#fff,#f0c0d8,#c8006a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {pageData.channel_title}
            </h1>
            <p
              className="text-sm text-center leading-relaxed"
              style={{ color: "rgba(255,180,220,0.8)" }}
            >
              {pageData.channel_desc1}
            </p>
            {pageData.channel_desc2 && (
              <p
                className="text-xs text-center"
                style={{ color: "rgba(200,130,180,0.5)" }}
              >
                {pageData.channel_desc2}
              </p>
            )}

            {/* Members */}
            <div
              className="flex flex-col items-center py-2 px-6 rounded-xl"
              style={{
                background: "rgba(180,0,100,0.09)",
                border: "1px solid rgba(200,0,120,0.2)",
              }}
            >
              <div className="text-2xl font-black" style={{ color: "#e060a0" }}>
                {pageData.channel_subscribers?.toLocaleString()}
              </div>
              <div
                className="text-[10px] uppercase tracking-widest mt-0.5"
                style={{ color: "rgba(200,0,120,0.5)" }}
              >
                VIP Members
              </div>
            </div>

            {/* Shimmer CTA */}
            <div
              style={{
                padding: "1px",
                borderRadius: "14px",
                background: `linear-gradient(${shimmer * 3.6}deg,#6b003a,#f0c0d8,#6b003a)`,
                width: "100%",
              }}
            >
              <button
                onClick={() => window.open(pageData.channel_link, "_blank")}
                className="w-full py-4 rounded-[13px] font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-95"
                style={{
                  background: "linear-gradient(135deg,#4a0030,#8b0050,#c8006a)",
                  color: "#fff",
                  border: "none",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                ♦ {pageData.cta_button_text || "Enter VIP"}
              </button>
            </div>

            <p
              className="text-[9px] text-center uppercase tracking-widest"
              style={{ color: "rgba(200,0,120,0.25)" }}
            >
              Disclaimer: Educational only. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
