import { useState, useEffect } from "react";

export default function Design38DiamondEdge({ pageData }: any) {
  const [rotate, setRotate] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRotate((r) => (r + 0.4) % 360), 16);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{ background: "#050505" }}
    >
      {/* Diamond shimmer BG */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0,rgba(255,255,255,0.5) 1px,transparent 0,transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: `conic-gradient(from ${rotate}deg,transparent 85%,rgba(255,255,255,0.04) 90%,transparent 95%)`,
          filter: "blur(40px)",
        }}
      />

      <div
        className="relative z-10 w-full max-w-sm mx-4 overflow-hidden"
        style={{
          padding: "1.5px",
          borderRadius: "20px",
          background: `conic-gradient(from ${rotate}deg,#888 0%,#fff 25%,#888 50%,#fff 75%,#888 100%)`,
        }}
      >
        <div
          className="rounded-[18px] overflow-hidden"
          style={{ background: "#070707" }}
        >
          <div className="p-6 flex flex-col items-center gap-4">
            <div
              className="text-[11px] font-bold uppercase tracking-[0.4em]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              ◆ EXCLUSIVE ◆
            </div>
            {/* Split layout */}
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex-shrink-0">
                <div
                  className="absolute -inset-1 rounded-full"
                  style={{
                    background: `conic-gradient(from ${rotate}deg,#888,#fff,#888)`,
                    padding: "1px",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-[#070707]" />
                </div>
                <img
                  src={pageData.image_url}
                  alt={pageData.channel_title}
                  className="relative w-20 h-20 rounded-full object-cover z-10"
                />
              </div>
              <div className="flex-1">
                <div
                  className="text-[10px] uppercase tracking-widest mb-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {pageData.channel_name}
                </div>
                <h1 className="text-base font-black leading-tight text-white">
                  {pageData.channel_title}
                </h1>
                <div
                  className="text-xs mt-1"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {pageData.channel_subscribers?.toLocaleString()} members
                </div>
              </div>
            </div>
            <div
              className="w-full h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",
              }}
            />
            <p
              className="text-sm text-center leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {pageData.channel_desc1}
            </p>
            {pageData.channel_desc2 && (
              <p
                className="text-xs text-center"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {pageData.channel_desc2}
              </p>
            )}
            <div className="grid grid-cols-3 gap-2 w-full">
              {[
                {
                  label: "Members",
                  val: pageData.channel_subscribers?.toLocaleString(),
                },
                { label: "Win Rate", val: "92%" },
                { label: "Signals", val: "6/day" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center py-2 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="text-sm font-black text-white">{s.val}</div>
                  <div
                    className="text-[9px] uppercase tracking-widest mt-0.5"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "1px",
                borderRadius: "12px",
                background: `conic-gradient(from ${rotate}deg,#555,#fff,#555)`,
                width: "100%",
              }}
            >
              <button
                onClick={() => window.open(pageData.channel_link, "_blank")}
                className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: "#070707", color: "#fff", border: "none" }}
              >
                ◆ {pageData.cta_button_text || "Get Access"}
              </button>
            </div>
            <p
              className="text-[9px] text-center uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.15)" }}
            >
              Disclaimer: Educational only. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
