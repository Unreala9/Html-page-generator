import { useState, useEffect } from "react";

export default function Design30TitanBlack({ pageData }: any) {
  const [steps, setSteps] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSteps((s) => Math.min(s + 1, 3)), 700);
    return () => clearInterval(id);
  }, []);

  const benefits = [
    "Exclusive market analysis daily",
    "Real-time trade alerts",
    "1-on-1 expert guidance",
  ];

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{ background: "#000000" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Red accent glow */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: "rgba(220,0,0,0.12)" }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,10,10,0.97)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 100px rgba(0,0,0,0.8)",
        }}
      >
        {/* Red accent top bar */}
        <div
          className="h-1"
          style={{
            background: "linear-gradient(90deg,#cc0000,#ff2020,#cc0000)",
          }}
        />

        <div className="p-6 flex flex-col gap-4">
          {/* Top row: avatar + text */}
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={pageData.image_url}
                alt={pageData.channel_title}
                className="w-16 h-16 rounded-full object-cover"
                style={{ border: "2px solid rgba(220,0,0,0.5)" }}
              />
              <div
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "#cc0000" }}
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.25em] mb-0.5"
                style={{ color: "rgba(220,0,0,0.8)" }}
              >
                {pageData.channel_name}
              </div>
              <h1
                className="text-base font-black leading-tight"
                style={{ color: "#fff" }}
              >
                {pageData.channel_title}
              </h1>
              <div
                className="text-[11px] mt-0.5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {pageData.channel_subscribers?.toLocaleString()} members
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-[1px]"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />

          {/* Desc */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              {pageData.channel_desc2}
            </p>
          )}

          {/* Step reveal benefits */}
          <div className="flex flex-col gap-2">
            {benefits.map((b, i) => (
              <div
                key={b}
                className="flex items-center gap-2 text-sm transition-all duration-500"
                style={{
                  opacity: steps > i ? 1 : 0.2,
                  transform: steps > i ? "translateX(0)" : "translateX(-8px)",
                }}
              >
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: steps > i ? "#cc0000" : "rgba(255,255,255,0.1)",
                  }}
                >
                  {steps > i && (
                    <span style={{ color: "#fff", fontSize: "8px" }}>✓</span>
                  )}
                </div>
                <span
                  style={{
                    color: steps > i ? "#fff" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 mt-1"
            style={{
              background: "linear-gradient(90deg,#cc0000,#ff3030,#cc0000)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(200,0,0,0.4)",
              border: "none",
            }}
          >
            ► {pageData.cta_button_text || "Get Access Now"}
          </button>

          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
