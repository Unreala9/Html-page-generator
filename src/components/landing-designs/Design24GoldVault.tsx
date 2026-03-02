import { useState, useEffect } from "react";

export default function Design24GoldVault({ pageData }: any) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = pageData.channel_subscribers || 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(
      () => setCount((c) => Math.min(c + step, target)),
      30,
    );
    return () => clearInterval(id);
  }, [pageData.channel_subscribers]);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg,#0a0700 0%,#1a1000 50%,#0a0700 100%)",
      }}
    >
      {/* Gold radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%,rgba(200,150,0,0.18),transparent 65%)",
        }}
      />

      {/* Luxury border card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4"
        style={{
          padding: "2px",
          borderRadius: "20px",
          background: "linear-gradient(135deg,#c8a200,#4a3500,#c8a200)",
        }}
      >
        <div
          className="h-full w-full rounded-[18px] overflow-hidden"
          style={{
            background: "linear-gradient(160deg,#0d0800,#1a1200,#0d0800)",
          }}
        >
          {/* Top bar */}
          <div
            className="h-1"
            style={{
              background: "linear-gradient(90deg,#c8a200,#ffe566,#c8a200)",
            }}
          />

          <div className="p-6 flex flex-col items-center gap-4">
            {/* Crown badge */}
            <div className="text-2xl">👑</div>

            {/* Avatar */}
            <div className="relative">
              <div
                className="absolute -inset-1.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg,#c8a200,#ffe566,#c8a200)",
                  padding: "2px",
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ background: "#0d0800" }}
                />
              </div>
              <img
                src={pageData.image_url}
                alt={pageData.channel_title}
                className="relative w-24 h-24 rounded-full object-cover z-10"
              />
            </div>

            {/* Channel name */}
            <div
              className="text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "#c8a200" }}
            >
              ◆ {pageData.channel_name} ◆
            </div>

            {/* Title */}
            <h1
              className="text-xl font-black text-center leading-tight"
              style={{
                background: "linear-gradient(135deg,#ffe566,#c8a200,#ffe566)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {pageData.channel_title}
            </h1>

            {/* Animated subscriber counter */}
            <div
              className="flex flex-col items-center py-2 w-full rounded-xl"
              style={{
                background: "rgba(200,160,0,0.07)",
                border: "1px solid rgba(200,160,0,0.2)",
              }}
            >
              <div className="text-2xl font-black" style={{ color: "#ffe566" }}>
                {count.toLocaleString()}
              </div>
              <div
                className="text-[10px] uppercase tracking-widest"
                style={{ color: "rgba(200,160,0,0.6)" }}
              >
                Exclusive Members
              </div>
            </div>

            {/* Desc */}
            <p
              className="text-sm text-center leading-relaxed"
              style={{ color: "rgba(255,220,140,0.8)" }}
            >
              {pageData.channel_desc1}
            </p>
            {pageData.channel_desc2 && (
              <p
                className="text-xs text-center"
                style={{ color: "rgba(200,160,80,0.55)" }}
              >
                {pageData.channel_desc2}
              </p>
            )}

            {/* CTA */}
            <button
              onClick={() => window.open(pageData.channel_link, "_blank")}
              className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(90deg,#c8a200,#ffe566,#c8a200)",
                color: "#0a0700",
                boxShadow: "0 0 30px rgba(200,160,0,0.4)",
                border: "none",
              }}
            >
              👑 {pageData.cta_button_text || "Enter the Vault"}
            </button>

            <p
              className="text-[9px] text-center uppercase tracking-widest"
              style={{ color: "rgba(200,160,0,0.25)" }}
            >
              Disclaimer: Educational only. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
