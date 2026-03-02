import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useState, useEffect } from "react";

interface Design1Props {
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

export default function Design1Modern({ pageData }: Design1Props) {
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
    <main className="h-screen w-full overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-2 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header Image */}
          <div className="relative flex justify-center items-center pt-6">
            <div className="relative animate-in zoom-in duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <img
                src={pageData.image_url}
                alt={pageData.channel_title}
                className="h-44 rounded-full w-44 object-cover shadow-lg relative z-10 ring-4 ring-white/80"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="text-center space-y-3 animate-in slide-in-from-bottom-3 duration-300">
              <h2 className="text-lg md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-in fade-in duration-300">
                {pageData.channel_name}
              </h2>
              <h1 className="text-2xl md:text-xl font-bold leading-tight text-slate-900">
                {pageData.channel_title}
              </h1>

              <div className="flex items-center justify-center gap-3 text-sm flex-wrap">
                <div className="flex items-center gap-2 text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full font-semibold">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>
                    {pageData.channel_subscribers.toLocaleString()} subscribers
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-center animate-in slide-in-from-bottom-2 duration-300">
              <p className="text-2xl font-bold text-slate-700 leading-relaxed">
                {pageData.channel_desc1}
              </p>
              {pageData.channel_desc2 && (
                <p className="text-2xl font-bold text-slate-600 leading-relaxed">
                  {pageData.channel_desc2}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center pt-3 space-y-3 animate-in fade-in duration-300">
              {/* Timer Display - Above Button */}
              {!isButtonEnabled && (
                <div className="text-center w-full animate-bounce">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full font-semibold text-sm shadow-lg border-2 border-blue-200">
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
              <Button
                size="lg"
                onClick={() => {
                  window.open(
                    pageData.channel_link,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
                className="text-base px-8 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-600 hover:via-blue-700 hover:to-indigo-700 flex items-center gap-2 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <svg
                  className="h-5 w-5 relative z-10 group-hover:rotate-12 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                {pageData.cta_button_text || "Join on Telegram"}
              </Button>
            </div>

            {/* Standard Disclaimer */}
            <div className="mt-4 pt-4 border-t border-slate-200/50">
              <p className="text-[10px] md:text-xs text-slate-500 text-center leading-relaxed opacity-80">
                <span className="font-semibold text-slate-700">
                  Disclaimer:
                </span>{" "}
                All content is for educational purposes only.{" "}
                {pageData.channel_name} is not responsible for any financial
                decisions. Trading involves risk—please do your own research.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


