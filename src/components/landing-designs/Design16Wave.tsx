import { Button } from "@/components/ui/button";
import { Waves, Zap, Activity } from "lucide-react";

export default function Design23Wave({ pageData }: any) {
  return (
    <div className="h-screen w-full bg-indigo-950 flex items-center justify-center p-2 sm:p-4 font-sans overflow-hidden relative text-indigo-50">
      {/* Animated Waves Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-blue-600 to-transparent opacity-50 blur-[80px] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-full h-[50vh] bg-gradient-to-b from-purple-600 to-transparent opacity-50 blur-[80px] animate-pulse"></div>

        {/* SVG Waves Mockup */}
        <svg
          className="absolute bottom-0 left-0 w-full h-auto text-blue-500/20 fill-current max-h-[30vh]"
          viewBox="0 0 1440 320"
        >
          <path
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full h-auto text-purple-500/20 fill-current max-h-[30vh]"
          viewBox="0 0 1440 320"
          style={{ transform: "scaleY(-1) translateY(-100%)" }}
        >
          <path
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-sm md:max-w-4xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 items-center h-full justify-center">
        {/* Visual - Hidden on very small screens if needed, or scaled */}
        <div className="relative flex justify-center shrink-0">
          <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-xl animate-pulse"></div>
            <img
              src={pageData.image_url}
              alt={pageData.channel_name}
              className="relative w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl"
            />
            <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-4 sm:px-6 py-1 sm:py-2 rounded-full flex items-center gap-2 whitespace-nowrap">
              <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <span className="text-xs sm:text-sm font-bold">Live Updates</span>
            </div>
          </div>
        </div>

        {/* Content Content*/}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden group hover:bg-white/10 transition-colors w-full flex flex-col max-h-[60vh] md:max-h-[80vh]">
          <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <Waves className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400" />
          </div>

          <div className="overflow-y-auto scrollbar-hide shrink min-h-0">
            <h1 className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200 mb-1 sm:mb-2 truncate">
              {pageData.channel_name}
            </h1>
            <h2 className="text-lg sm:text-xl text-blue-300 font-medium mb-2 sm:mb-4 truncate">
              {pageData.channel_title}
            </h2>

            <p className="text-blue-100/90 text-sm sm:text-lg mb-2 sm:mb-4 leading-relaxed line-clamp-3">
              {pageData.channel_desc1}
            </p>

            {pageData.channel_desc2 && (
              <p className="hidden sm:block text-blue-200/60 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed line-clamp-2">
                {pageData.channel_desc2}
              </p>
            )}

            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-8 shrink-0">
              <div className="bg-white/5 rounded-xl p-2 sm:p-3 border border-white/10">
                <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1 truncate">
                  {pageData.channel_subscribers?.toLocaleString()}
                </div>
                <div className="text-[10px] sm:text-xs text-blue-300">
                  Subscribers
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-2 sm:p-3 border border-white/10">
                <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1 flex items-center gap-1">
                  4.9{" "}
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                </div>
                <div className="text-[10px] sm:text-xs text-blue-300">
                  Rating
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 pt-2">
            <Button
              onClick={() => window.open(pageData.channel_link, "_blank")}
              className="w-full h-10 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm sm:text-lg shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
            >
              {pageData.cta_button_text || "Ride the Wave"}
            </Button>
          </div>

          <p className="text-[8px] sm:text-[10px] text-blue-400/50 text-center mt-2 sm:mt-4 shrink-0">
            Disclaimer: Educational only. {pageData.channel_name} not liable.
          </p>
        </div>
      </div>
    </div>
  );
}


