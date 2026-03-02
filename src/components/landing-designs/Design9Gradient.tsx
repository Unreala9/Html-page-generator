import { useState, useEffect } from "react";

interface Design10Props {
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

export default function Design10Gradient({ pageData }: Design10Props) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4 relative overflow-x-hidden">
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content Card */}
      <div className="max-w-lg w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Channel Image */}
        <div className="flex justify-center animate-in zoom-in duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
            <img
              src={pageData.image_url}
              alt={pageData.channel_name}
              className="relative w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Channel Name */}
        <div className="text-center space-y-2 animate-in slide-in-from-bottom-2 duration-300">
          <h1 className="text-4xl font-black text-white drop-shadow-lg">
            {pageData.channel_name}
          </h1>
          <p className="text-xl text-white/90 font-medium">
            {pageData.channel_title}
          </p>
        </div>

        {/* Subscribers Badge */}
        <div className="flex justify-center animate-in fade-in duration-300">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 transform">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="text-sm font-bold text-white">
              {pageData.channel_subscribers.toLocaleString()} Members
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="text-center space-y-3 animate-in fade-in duration-300">
          <p className="text-2xl font-bold text-white/95 leading-relaxed">
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p className="text-2xl font-bold text-white/80 leading-relaxed">
              {pageData.channel_desc2}
            </p>
          )}
        </div>

        {/* Timer */}
        <div className="flex justify-center animate-in fade-in duration-300">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 animate-pulse">
            <svg
              className="w-5 h-5 text-white animate-spin"
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
            <span className="text-sm font-bold text-white">
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
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-purple-600 font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl active:scale-95"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
            {pageData.cta_button_text}
          </a>
        </div>

        {/* Disclaimer */}
        <div className="text-center animate-in fade-in duration-300 border-t border-white/20 pt-4">
          <p className="text-xs text-white/70">
            <span className="font-bold">Disclaimer:</span> Educational content
            only. {pageData.channel_name} is not responsible for any financial
            decisions.
          </p>
        </div>

        {/* Page Views */}
        <div className="flex justify-center animate-in fade-in duration-300">
          <div className="inline-flex items-center gap-1.5 text-xs text-white/60">
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


