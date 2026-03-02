import { useState, useEffect } from "react";

interface Design9Props {
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

export default function Design9GrayMinimal({ pageData }: Design9Props) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gray-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-400/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Simple Card Container */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300 relative z-10 hover:shadow-2xl transition-shadow duration-300">
        {/* Channel Image */}
        <div className="flex justify-center animate-in zoom-in duration-300">
          <img
            src={pageData.image_url}
            alt={pageData.channel_name}
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow-md transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:border-gray-300"
          />
        </div>

        {/* Channel Name */}
        <div className="text-center space-y-2 animate-in slide-in-from-bottom-2 duration-300">
          <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-900 transition-colors">
            {pageData.channel_name}
          </h1>
          <p className="text-base text-gray-600 hover:text-gray-700 transition-colors">
            {pageData.channel_title}
          </p>
        </div>

        {/* Subscribers Badge */}
        <div className="flex justify-center animate-in fade-in duration-300">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300 hover:scale-105 transform">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">
              {pageData.channel_subscribers.toLocaleString()} Members
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="text-center space-y-3 animate-in fade-in duration-300">
          <p className="text-lg font-semibold text-gray-700 leading-relaxed">
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p className="text-lg font-semibold text-gray-600 leading-relaxed">
              {pageData.channel_desc2}
            </p>
          )}
        </div>

        {/* Timer */}
        <div className="flex justify-center animate-in fade-in duration-300">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-gray-200 rounded-full animate-pulse">
            <svg
              className="w-5 h-5 text-gray-600 animate-spin"
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
            <span className="text-sm font-medium text-gray-700">
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
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-xl active:scale-95"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
            {pageData.cta_button_text}
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 animate-in fade-in duration-300"></div>

        {/* Disclaimer */}
        <div className="text-center animate-in fade-in duration-300">
          <p className="text-xs text-gray-500">
            <span className="font-semibold">Disclaimer:</span> Educational
            content only. {pageData.channel_name} is not responsible for any
            financial decisions.
          </p>
        </div>
      </div>
    </div>
  );
}


