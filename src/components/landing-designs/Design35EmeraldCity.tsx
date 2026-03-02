import { useState, useEffect } from "react";

export default function Design35EmeraldCity({ pageData }: any) {
  const [hue, setHue] = useState(140);
  useEffect(() => {
    const id = setInterval(() => setHue((h) => (h === 140 ? 160 : 140)), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(150deg,#001a0d 0%,#002818 60%,#001a0d 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,120,0.5) 3px,rgba(0,255,120,0.5) 4px),repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(0,255,120,0.2) 30px,rgba(0,255,120,0.2) 31px)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none transition-all duration-[1500ms]"
        style={{
          background: `radial-gradient(ellipse,hsla(${hue},100%,35%,0.18),transparent 70%)`,
        }}
      />

      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(0,20,10,0.93)",
          border: "1px solid rgba(0,200,100,0.25)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 60px rgba(0,200,100,0.15)",
        }}
      >
        <div
          className="h-[2px]"
          style={{
            background:
              "linear-gradient(90deg,transparent,#00c864,#80ffb4,#00c864,transparent)",
          }}
        />
        <div className="p-6 flex flex-col items-center gap-4">
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
            style={{
              background: "rgba(0,200,100,0.1)",
              border: "1px solid rgba(0,200,100,0.3)",
              color: "#00c864",
            }}
          >
            💎 EMERALD ACCESS
          </div>
          <div className="relative">
            <div
              className="absolute -inset-1.5 rounded-full"
              style={{
                background: "linear-gradient(135deg,#00c864,#80ffb4,#00c864)",
                padding: "2px",
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ background: "#00140a" }}
              />
            </div>
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="relative w-24 h-24 rounded-full object-cover z-10"
            />
          </div>
          <div
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgba(0,200,100,0.7)" }}
          >
            {pageData.channel_name}
          </div>
          <h1
            className="text-2xl font-black text-center leading-tight"
            style={{
              background: "linear-gradient(135deg,#fff,#80ffb4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {pageData.channel_title}
          </h1>
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(160,255,200,0.8)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(120,200,160,0.5)" }}
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
              { label: "Returns", val: "3.2x" },
              { label: "Streak", val: "21d" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-2 rounded-lg"
                style={{
                  background: "rgba(0,200,100,0.07)",
                  border: "1px solid rgba(0,200,100,0.15)",
                }}
              >
                <div
                  className="text-base font-black"
                  style={{ color: "#00c864" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-[9px] uppercase tracking-widest mt-0.5"
                  style={{ color: "rgba(0,200,100,0.5)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(90deg,#006632,#00c864,#80ffb4,#00c864,#006632)",
              color: "#001a0d",
              boxShadow: "0 0 30px rgba(0,200,100,0.4)",
              border: "none",
            }}
          >
            💎 {pageData.cta_button_text || "Claim Access"}
          </button>
          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(0,200,100,0.25)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
