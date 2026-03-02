import { useState, useEffect } from "react";

interface Design7Props {
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

export default function Design7Neon({ pageData }: Design7Props) {
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
    <div className="h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        ></div>
      </div>

      {/* Neon Glows */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px] animate-pulse"></div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Neon Border Card */}
        <div className="relative group">
          {/* Animated Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>

          <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/50">
            {/* Logo with Neon Effect */}
            <div className="flex justify-center mb-6 animate-in zoom-in duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <img
                  src={pageData.image_url}
                  alt={pageData.channel_name}
                  className="h-44 w-44 rounded-full object-cover relative z-10 ring-4 ring-cyan-500/50 hover:ring-purple-500/50 transition-all duration-300 hover:scale-110"
                />
              </div>
            </div>

            {/* Channel Name with Neon Text */}
            <h1 className="text-4xl md:text-5xl  text-center mb-2 animate-in slide-in-from-bottom-3 duration-300 text-white">
              {pageData.channel_name}
            </h1>

            {/* Channel Title */}
            <p className="text-xl md:text-2xl text-center text-cyan-400 mb-4 animate-in slide-in-from-bottom-2 duration-300">
              {pageData.channel_title}
            </p>

            {/* Subscribers Badge */}
            <div className="flex justify-center mb-6 animate-in fade-in duration-300">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 backdrop-blur-sm">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="font-bold text-cyan-300">
                  {pageData.channel_subscribers.toLocaleString()} Members
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 text-center mb-6 animate-in fade-in duration-300">
              <p className="text-2xl font-bold text-gray-300 leading-relaxed">
                {pageData.channel_desc1}
              </p>
              {pageData.channel_desc2 && (
                <p className="text-2xl font-bold text-gray-400 leading-relaxed">
                  {pageData.channel_desc2}
                </p>
              )}
            </div>

            {/* Timer */}
            {!isButtonEnabled && (
              <div className="flex justify-center mb-6 animate-bounce">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/50">
                  <svg
                    className="animate-spin h-5 w-5 text-purple-400"
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
                  <span className="font-semibold text-purple-300">
                    Unlocking in {timeLeft}s...
                  </span>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="flex justify-center animate-in zoom-in duration-300">
              <button
                onClick={() =>
                  window.open(
                    pageData.channel_link,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="relative group/btn px-8 py-4 text-lg font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 group-hover/btn:opacity-90"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-xl opacity-50 group-hover/btn:opacity-75 transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-2 text-black">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  {pageData.cta_button_text}
                </span>
              </button>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-gray-500 text-center mt-6 animate-in fade-in duration-300 border-t border-gray-800 pt-4">
              <p>
                <span className="font-semibold text-gray-400">Disclaimer:</span>{" "}
                Educational content only. {pageData.channel_name} is not
                responsible for any financial decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>
  );
}


