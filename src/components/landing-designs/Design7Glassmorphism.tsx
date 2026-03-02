import { useState, useEffect } from "react";

interface Design8Props {
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

export default function Design8Glassmorphism({ pageData }: Design8Props) {
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
      className="min-h-screen relative overflow-x-hidden flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      }}
    >
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          style={{ animation: "float 8s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-60 h-60 bg-white/10 rounded-full blur-3xl"
          style={{
            animation: "float 6s ease-in-out infinite",
            animationDelay: "1s",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-xl w-full">
        {/* Glass Card */}
        <div
          className="backdrop-blur-2xl bg-white/10 rounded-[2.5rem] p-8 border border-white/20 shadow-2xl animate-in fade-in zoom-in duration-300"
          style={{
            boxShadow: "0 8px 32px 0 rgba(255, 255, 255, 0.18)",
          }}
        >
          {/* Floating Image */}
          <div className="flex justify-center mb-6 animate-in zoom-in duration-300">
            <div
              className="relative"
              style={{ animation: "float 3s ease-in-out infinite" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-50"></div>
              <img
                src={pageData.image_url}
                alt={pageData.channel_name}
                className="h-36 w-36 rounded-full object-cover relative z-10 ring-4 ring-white/30 shadow-2xl"
              />
              {/* Orbiting Dots */}
              <div
                className="absolute inset-0"
                style={{ animation: "spin 10s linear infinite" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <h1
              className="text-4xl md:text-5xl font-black text-white mb-2 animate-in slide-in-from-bottom-3 duration-300"
              style={{
                textShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              {pageData.channel_name}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-semibold animate-in slide-in-from-bottom-2 duration-300">
              {pageData.channel_title}
            </p>

            {/* Glass Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 animate-in fade-in duration-300">
              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="font-bold text-white text-lg">
                  {pageData.channel_subscribers.toLocaleString()}
                </span>
              </div>
              <span className="text-white/80 font-medium">followers</span>
            </div>

            {/* Description */}
            <div className="space-y-3 pt-4 animate-in fade-in duration-300">
              <p className="text-2xl font-bold text-white/90 leading-relaxed">
                {pageData.channel_desc1}
              </p>
              {pageData.channel_desc2 && (
                <p className="text-2xl font-bold text-white/80 leading-relaxed">
                  {pageData.channel_desc2}
                </p>
              )}
            </div>

            {/* Timer */}
            {!isButtonEnabled && (
              <div className="py-4 animate-pulse">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="font-semibold text-white">
                    Ready in {timeLeft}s
                  </span>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="pt-2 animate-in zoom-in duration-300">
              <button
                onClick={() =>
                  window.open(
                    pageData.channel_link,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="w-full py-4 px-6 text-lg font-bold rounded-2xl bg-white text-purple-600 hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.777 13.38l-2.955-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.954z" />
                  </svg>
                  {pageData.cta_button_text}
                </span>
              </button>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-white/60 pt-4 animate-in fade-in duration-300 border-t border-white/10 mt-4">
              <p>
                <span className="font-bold">Disclaimer:</span> Educational
                content only. {pageData.channel_name} is not responsible for any
                financial decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}


