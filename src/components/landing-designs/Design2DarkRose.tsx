import { useState, useEffect } from "react";

interface Design2Props {
  pageData: {
    channel_name: string;
    channel_title: string;
    channel_subscribers: number;
    channel_desc1: string;
    channel_desc2: string | null;
    cta_button_text: string;
    channel_link: string;
    image_url: string;
    page_views: number;
  };
}

export default function Design2DarkRose({ pageData }: Design2Props) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsButtonEnabled(true);
    }
  }, [timeLeft]);

  return (
    <div
      className="min-h-screen flex justify-center items-center p-4 font-sans overflow-x-hidden relative"
      style={{
        background:
          "radial-gradient(circle at center, #1f2937, #111827, #000000)",
        color: "#f0f3f4",
      }}
    >
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-rose-600 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-rose-400 rounded-full animate-ping"></div>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="w-full max-w-7xl  animate-[fadeInUp_0.3s_ease_forwards] relative z-10">
        <section className="text-center p-2  animate-[fadeInUp_0.3s_ease_forwards]">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl blur-2xl opacity-40 animate-pulse"></div>
            <img
              src={pageData.image_url}
              alt={`${pageData.channel_name} Banner`}
              className="w-4/5 max-w-[400px] md:max-w-[300px] rounded-xl mx-auto mb-5 mt-8  animate-[zoomIn_0.3s_ease_forwards] relative z-10 ring-4 ring-rose-500/30 hover:ring-rose-500/60 transition-all duration-300 hover:scale-105"
              style={{ boxShadow: "0 10px 30px rgba(225,29,72,0.3)" }}
            />
          </div>
          <h2
            className="text-3xl md:text-4xl mb-2 font-bold  animate-[fadeInUp_0.3s_ease_forwards] hover:scale-105 transition-transform duration-300"
            style={{
              background: "linear-gradient(135deg, #e11d48, #be185d, #9f1239)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {pageData.channel_name}
          </h2>
          <h3 className="text-xl md:text-2xl mb-4 font-semibold text-rose-400  animate-[fadeInUp_0.3s_ease_forwards]">
            {pageData.channel_title}
          </h3>

          <div className="flex justify-center mb-6  animate-[fadeInUp_0.3s_ease_forwards]">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              {pageData.channel_subscribers.toLocaleString()} Subscribers
            </span>
          </div>
          <p className="md:text-lg text-xl leading-relaxed max-w-[600px] mx-auto mb-6  animate-[fadeInUp_0.3s_ease_forwards]">
            <span className="text-2xl font-bold">{pageData.channel_desc1}</span>
            {pageData.channel_desc2 && (
              <>
                <br />
                <br />
                <span className="text-2xl font-bold">
                  {pageData.channel_desc2}
                </span>
              </>
            )}
          </p>

          {/* Timer Display - Above Button */}
          {!isButtonEnabled && (
            <div className="mb-4  animate-[fadeInUp_0.3s_ease_forwards]">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm"
                style={{
                  background:
                    "linear-gradient(to right, rgba(225,29,72,0.2), rgba(8,145,178,0.2))",
                  border: "2px solid rgba(225,29,72,0.5)",
                  color: "#e11d48",
                }}
              >
                <svg
                  className="h-5 w-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Click Fast to Grab Offer in {timeLeft}s
              </div>
            </div>
          )}

          {/* CTA Button - Always Clickable */}
          <button
            onClick={() => {
              window.open(
                pageData.channel_link,
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="relative inline-block py-4 px-8 rounded-full font-bold text-lg transition-all duration-300 ease-in-out  animate-[zoomIn_0.3s_ease_forwards] hover:-translate-y-1 hover:scale-105 text-white"
            style={{
              background: "linear-gradient(to right, #e11d48, #0891b2)",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.4), 0 0 20px rgba(225,29,72,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 12px 30px rgba(0,0,0,0.5), 0 0 30px rgba(225,29,72,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0,0,0,0.4), 0 0 20px rgba(225,29,72,0.4)";
            }}
          >
            <i className="fab fa-telegram mr-3 text-xl"></i>
            <span className="relative z-10">
              {pageData.cta_button_text || "Join Telegram Channel"}
            </span>
            <span
              className="absolute inset-0 animate-pulse bg-white opacity-20 rounded-full"
              style={{
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            ></span>
          </button>

          <p className="text-[12px] leading-relaxed max-w-[600px] mx-auto mt-8  animate-[fadeInUp_0.3s_ease_forwards]">
            <strong>Disclaimer:</strong> {pageData.channel_name} shares content
            for educational purposes only. Not financial advice. Trading
            involves risk. Do your own research.
          </p>
        </section>
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}



