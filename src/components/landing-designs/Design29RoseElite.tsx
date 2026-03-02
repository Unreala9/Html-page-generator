export default function Design29RoseElite({ pageData }: any) {
  return (
    <main
      className="h-svh w-full overflow-hidden relative flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg,#fff0f5 0%,#ffe4ec 40%,#ffd0e0 100%)",
      }}
    >
      {/* Soft blobs */}
      <div
        className="absolute top-[-60px] right-[-60px] w-[320px] h-[320px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(255,100,140,0.25)" }}
      />
      <div
        className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(255,160,180,0.2)" }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,100,140,0.3)",
          boxShadow:
            "0 20px 80px rgba(255,80,120,0.2),inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Pink gradient top */}
        <div
          className="h-24 w-full flex items-end justify-center pb-0 relative"
          style={{
            background: "linear-gradient(135deg,#ff6b9d,#ff4081,#e91e8c)",
          }}
        >
          {/* Avatar overlapping */}
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2">
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  background: "linear-gradient(135deg,#ff6b9d,#ff4081)",
                  padding: "2px",
                }}
              >
                <div className="w-full h-full rounded-full bg-white" />
              </div>
              <img
                src={pageData.image_url}
                alt={pageData.channel_title}
                className="relative w-24 h-24 rounded-full object-cover z-10 ring-4 ring-white"
              />
            </div>
          </div>
        </div>

        {/* Extra space for avatar overlap */}
        <div className="h-10" />

        <div className="px-6 pb-6 flex flex-col items-center gap-3">
          {/* Channel name */}
          <div
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "#ff4081" }}
          >
            {pageData.channel_name}
          </div>

          {/* Title */}
          <h1
            className="text-xl font-black text-center leading-tight"
            style={{ color: "#7b0035" }}
          >
            {pageData.channel_title}
          </h1>

          {/* Desc */}
          <p
            className="text-sm text-center leading-relaxed"
            style={{ color: "rgba(120,0,50,0.75)" }}
          >
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p
              className="text-xs text-center"
              style={{ color: "rgba(120,0,50,0.5)" }}
            >
              {pageData.channel_desc2}
            </p>
          )}

          {/* Subscribers */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(255,64,129,0.1)",
              border: "1px solid rgba(255,64,129,0.3)",
              color: "#e91e8c",
            }}
          >
            💗 {pageData.channel_subscribers?.toLocaleString()} loving members
          </div>

          {/* CTA */}
          <button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 mt-1"
            style={{
              background: "linear-gradient(135deg,#ff6b9d,#ff4081,#e91e8c)",
              color: "#fff",
              boxShadow: "0 8px 30px rgba(255,64,129,0.4)",
              border: "none",
            }}
          >
            💗 {pageData.cta_button_text || "Join Community"}
          </button>

          <p
            className="text-[9px] text-center uppercase tracking-widest mt-1"
            style={{ color: "rgba(200,0,80,0.3)" }}
          >
            Disclaimer: Educational only. Not financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}
