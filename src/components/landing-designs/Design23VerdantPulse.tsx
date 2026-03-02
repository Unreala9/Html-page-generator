import { useState, useEffect } from "react";

export default function Design23VerdantPulse({ pageData }: any) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1200);
    return () => clearInterval(id);
  }, []);
  const values = ["+2.4%", "+5.1%", "+1.8%", "+3.7%", "+6.2%"];

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{ background: "#020f08" }}
    >
      {/* BG grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,100,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,100,0.3) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%,rgba(0,255,100,0.1),transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(2,20,10,0.92)",
          border: "1px solid rgba(0,255,100,0.25)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 60px rgba(0,255,100,0.1)",
        }}
      >
        <div className="p-6 flex flex-col items-center gap-4">
          {/* Live ticker */}
          <div
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono overflow-hidden"
            style={{
              background: "rgba(0,255,100,0.07)",
              border: "1px solid rgba(0,255,100,0.2)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
              style={{ background: "#00ff64" }}
            />
            <span style={{ color: "#00ff64" }}>LIVE &nbsp;</span>
            <span style={{ color: "rgba(0,255,100,0.7)" }}>
              {values[tick % values.length]} &nbsp;●&nbsp; SIGNALS ACTIVE
            </span>
          </div>

          {/* Avatar */}
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-full blur-md"
              style={{ background: "rgba(0,255,100,0.3)" }}
            />
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-20 h-20 rounded-full object-cover z-10"
              style={{ border: "2px solid rgba(0,255,100,0.5)" }}
            />
          </div>

          {/* Channel name */}
          <div
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgba(0,255,100,0.6)" }}
          >
            {pageData.channel_name}
          </div>

          {/* Title */}
          <h1
            className="text-xl font-black text-center"
            style={{ color: "#fff" }}
          >
            {pageData.channel_title}
          </h1>

          {/* Stats row */}
          <div className="w-full grid grid-cols-3 gap-2">
            {[
              {
                label: "Members",
                val: pageData.channel_subscribers?.toLocaleString(),
              },
              { label: "Accuracy", val: "94%" },
              { label: "Daily Calls", val: "5+" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-2 rounded-lg"
                style={{
                  background: "rgba(0,255,100,0.06)",
                  border: "1px solid rgba(0,255,100,0.15)",
                }}
              >
                <div
                  className="text-base font-black"
                  style={{ color: "#00ff64" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-[9px] uppercase tracking-widest mt-0.5"
                  style={{ color: "rgba(0,255,100,0.5)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Desc */}
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(180,255,200,0.75)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(140,220,160,0.5)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}

          {/* CTA */}
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#00c850,#00ff64)",
              color: "#020f08",
              boxShadow: "0 0 30px rgba(0,255,100,0.4)",
              border: "none",
            }}
          >
            📈 {pageData.cta_button_text || "Join Free"}
          </button>

          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(0,255,100,0.25)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
