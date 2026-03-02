export default function Design36SandDune({ pageData }: any) {
  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg,#1a1000 0%,#2d1e00 50%,#1a1000 100%)",
      }}
    >
      {/* Warm glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: "rgba(210,140,0,0.12)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "rgba(180,100,0,0.1)" }}
      />
      {/* Dune SVG wave pseudo bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: "linear-gradient(0deg,rgba(210,140,0,0.08),transparent)",
        }}
      />

      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg,rgba(30,18,0,0.95),rgba(45,28,0,0.95))",
          border: "1px solid rgba(210,160,0,0.2)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 80px rgba(180,120,0,0.2)",
        }}
      >
        {/* Dune color bar */}
        <div
          className="h-28 w-full relative flex items-end justify-center"
          style={{
            background: "linear-gradient(135deg,#8b5e00,#d4960a,#8b5e00)",
          }}
        >
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2">
            <div className="relative">
              <div
                className="absolute -inset-1.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg,#d4960a,#8b5e00)",
                  padding: "2px",
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ background: "#1e1200" }}
                />
              </div>
              <img
                src={pageData.image_url}
                alt={pageData.channel_title}
                className="relative w-24 h-24 rounded-full object-cover z-10 ring-4 ring-[#1e1200]"
              />
            </div>
          </div>
          <div
            className="absolute top-3 left-4 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,230,160,0.7)" }}
          >
            🏜️ {pageData.channel_name}
          </div>
        </div>
        <div className="h-10" />

        <div className="px-6 pb-6 flex flex-col items-center gap-3">
          <h1
            className="text-xl font-black text-center leading-tight"
            style={{
              background: "linear-gradient(135deg,#ffe0a0,#d4960a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {pageData.channel_title}
          </h1>
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(255,210,140,0.8)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(200,160,80,0.5)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(210,150,0,0.12)",
              border: "1px solid rgba(210,150,0,0.3)",
              color: "#d4960a",
            }}
          >
            🏜️ {pageData.channel_subscribers?.toLocaleString()} adventurers
          </div>
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 mt-1"
            style={{
              background:
                "linear-gradient(135deg,#8b5e00,#d4960a,#ffe0a0,#d4960a,#8b5e00)",
              color: "#1a1000",
              boxShadow: "0 8px 30px rgba(210,150,0,0.35)",
              border: "none",
            }}
          >
            🏜️ {pageData.cta_button_text || "Journey Starts Here"}
          </button>
          <p
            className="text-[9px] text-center uppercase tracking-widest"
            style={{ color: "rgba(210,150,0,0.3)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
