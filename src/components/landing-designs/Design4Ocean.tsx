import { useState, useEffect } from "react";

interface Design11Props {
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

export default function Design11Ocean({ pageData }: Design11Props) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-cyan-950 flex flex-col items-center justify-center p-4 font-sans overflow-x-hidden relative">
      {/* Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
        <svg
          className="absolute bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-10 w-4 h-4 bg-white/40 rounded-full animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-6 h-6 bg-white/30 rounded-full animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-3 h-3 bg-cyan-200/50 rounded-full animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-5 h-5 bg-blue-200/40 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}
        ></div>
      </div>

      {/* Content Card */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-300 border-4 border-cyan-300/50">
        {/* Channel Image with Ocean Theme */}
        <div className="flex justify-center animate-in zoom-in duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <img
              src={pageData.image_url}
              alt={pageData.channel_name}
              className="relative w-44 h-44 rounded-full object-cover border-4 border-cyan-400 shadow-xl hover:scale-110 hover:rotate-6 transition-all duration-300"
            />
          </div>
        </div>

        {/* Channel Name */}
        <div className="text-center space-y-2 animate-in slide-in-from-bottom-2 duration-300">
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {pageData.channel_name}
          </h1>
          <p className="text-lg text-blue-600 font-semibold">
            {pageData.channel_title}
          </p>
        </div>

        {/* Subscribers Badge */}
        <div className="flex justify-center animate-in fade-in duration-300">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full border-2 border-cyan-300 hover:from-cyan-200 hover:to-blue-200 transition-all duration-300 hover:scale-105 transform">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="text-sm font-bold text-blue-700">
              {pageData.channel_subscribers.toLocaleString()} Members
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="text-center space-y-3 animate-in fade-in duration-300">
          <p className="text-2xl font-bold text-gray-700 leading-relaxed">
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p className="text-2xl font-bold text-gray-600 leading-relaxed">
              {pageData.channel_desc2}
            </p>
          )}
        </div>

        {/* Timer */}
        <div className="flex justify-center animate-in fade-in duration-300">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300 rounded-full animate-pulse">
            <svg
              className="w-5 h-5 text-cyan-600 animate-spin"
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
            <span className="text-sm font-bold text-cyan-700">
              Unlocking in {timeLeft}s...
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center animate-in zoom-in duration-300">
          <a
            href={pageData.channel_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl active:scale-95"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
            {pageData.cta_button_text}
          </a>
        </div>

        {/* Disclaimer */}
        <div className="text-center animate-in fade-in duration-300 border-t border-cyan-200 pt-4">
          <p className="text-xs text-gray-500">
            <span className="font-bold">Disclaimer:</span> Educational content
            only. {pageData.channel_name} is not responsible for any financial
            decisions.
          </p>
        </div>

        {/* Page Views */}
        <div className="flex justify-center animate-in fade-in duration-300">
          <div className="inline-flex items-center gap-1.5 text-xs text-gray-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{pageData.page_views.toLocaleString()} views</span>
          </div>
        </div>
      </div>
    </div>
  );
}


