import { useState, useEffect } from "react";

export default function Design28SteelEdge({ pageData }: any) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setProgress((p) => Math.min(p + 2, 87)), 30);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg,#060810 0%,#0c1220 50%,#060810 100%)",
      }}
    >
      {/* Steel blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%,rgba(0,100,200,0.15),transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 80%,rgba(0,180,255,0.1),transparent 60%)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(8,15,30,0.95)",
          border: "1px solid rgba(0,150,255,0.2)",
          boxShadow: "0 20px 80px rgba(0,100,200,0.2)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header bar */}
        <div
          className="px-6 py-3 flex items-center justify-between"
          style={{
            background: "rgba(0,100,200,0.1)",
            borderBottom: "1px solid rgba(0,150,255,0.15)",
          }}
        >
          <div
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgba(0,180,255,0.7)" }}
          >
            {pageData.channel_name}
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#00b4ff", boxShadow: "0 0 6px #00b4ff" }}
            />
            <span
              className="text-[10px]"
              style={{ color: "rgba(0,180,255,0.6)" }}
            >
              LIVE
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <svg
              className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]"
              viewBox="0 0 110 110"
            >
              <circle
                cx="55"
                cy="55"
                r="52"
                fill="none"
                stroke="rgba(0,180,255,0.15)"
                strokeWidth="2"
              />
              <circle
                cx="55"
                cy="55"
                r="52"
                fill="none"
                stroke="#00b4ff"
                strokeWidth="2"
                strokeDasharray={`${progress * 3.27} ${327 - progress * 3.27}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "55px 55px",
                  filter: "drop-shadow(0 0 6px #00b4ff)",
                }}
              />
            </svg>
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="w-24 h-24 rounded-full object-cover"
              style={{ border: "2px solid rgba(0,180,255,0.3)" }}
            />
          </div>

          {/* Progress label */}
          <div
            className="text-[11px] font-mono"
            style={{ color: "rgba(0,180,255,0.6)" }}
          >
            ACCURACY: <span style={{ color: "#00b4ff" }}>{progress}%</span>
          </div>

          {/* Title */}
          <h1
            className="text-xl font-black text-center leading-tight"
            style={{ color: "#fff" }}
          >
            {pageData.channel_title}
          </h1>

          {/* Desc */}
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(180,220,255,0.75)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(140,190,255,0.5)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}

          {/* Data strip */}
          <div className="grid grid-cols-3 gap-2 w-full">
            {[
              {
                label: "Members",
                val: pageData.channel_subscribers?.toLocaleString(),
              },
              { label: "Calls/Day", val: "8+" },
              { label: "Streak", val: "14d" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-2 rounded-lg"
                style={{
                  background: "rgba(0,100,200,0.1)",
                  border: "1px solid rgba(0,150,255,0.15)",
                }}
              >
                <div
                  className="text-base font-black"
                  style={{ color: "#00b4ff" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-[9px] uppercase tracking-widest mt-0.5"
                  style={{ color: "rgba(0,150,255,0.5)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(90deg,#0060c8,#00b4ff,#0060c8)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(0,150,255,0.4)",
              border: "none",
            }}
          >
            🎯 {pageData.cta_button_text || "Access Now"}
          </button>

          <p
            className="text-[9px] text-center uppercase tracking-widest font-mono"
            style={{ color: "rgba(0,150,255,0.25)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
