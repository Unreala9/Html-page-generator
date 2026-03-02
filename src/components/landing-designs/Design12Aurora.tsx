import { Button } from "@/components/ui/button";
import { Sparkles, ArrowUpRight, Zap } from "lucide-react";

export default function Design13Aurora({ pageData }: any) {
  return (
    <main className="h-screen w-full relative overflow-hidden bg-black text-white selection:bg-violet-500/40 selection:text-violet-200 flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Aurora Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-violet-600/30 rounded-full blur-[150px] animate-pulse pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-500/20 rounded-full blur-[150px] animate-pulse pointer-events-none mix-blend-screen" />
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-10 text-center max-h-[95vh]">
        {/* Top Floating Logo/Image */}
        <div className="relative mb-4 sm:mb-6 shrink-0 group">
          <div className="absolute inset-0 bg-violet-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]">
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="w-full h-full object-contain bg-black/50"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-violet-950/80 backdrop-blur border border-violet-500/30 text-[8px] sm:text-[10px] uppercase font-bold tracking-widest text-violet-300 px-3 py-0.5 rounded-full whitespace-nowrap">
            Official
          </div>
        </div>

        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-violet-950/30 border border-violet-500/30 text-violet-300 backdrop-blur-md mb-2 sm:mb-6 hover:bg-violet-900/40 transition-colors cursor-default shrink-0">
          <Sparkles size={12} className="text-violet-400 sm:w-3.5 sm:h-3.5" />
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            Next Gen Community
          </span>
        </div>

        {/* Hero Title */}
        <div className="shrink-0 flex flex-col items-center w-full">
          <h1 className="text-sm sm:text-lg md:text-xl font-bold uppercase tracking-widest text-violet-400 mb-1 truncate max-w-full">
            {pageData.channel_name}
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-2 sm:mb-4 bg-gradient-to-br from-white via-violet-200 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.3)] leading-tight line-clamp-2">
            {pageData.channel_title}
          </h1>
        </div>

        <div className="shrink min-h-0 w-full overflow-y-auto scrollbar-hide px-4">
          <p className="text-sm sm:text-base md:text-xl text-violet-100 max-w-2xl mx-auto mb-2 sm:mb-4 leading-relaxed font-normal">
            {pageData.channel_desc1}
          </p>

          {pageData.channel_desc2 && (
            <p className="hidden sm:block text-xs sm:text-sm md:text-lg text-violet-200/80 max-w-2xl mx-auto mb-4 leading-relaxed font-light line-clamp-2">
              {pageData.channel_desc2}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="relative group z-20 shrink-0 mt-2">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-tilt"></div>
          <Button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="relative px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 rounded-full bg-black leading-none flex items-center gap-3 border border-violet-500/50 text-white font-bold text-base sm:text-lg hover:text-violet-300 transition-all"
          >
            {pageData.cta_button_text || "Enter the Cosmos"}
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* Floating Cards / Stats (Simplified) */}
        <div className="mt-4 md:mt-8 grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 w-full max-w-3xl shrink-0">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 sm:p-4 md:p-6 rounded-2xl hover:bg-white/10 transition-colors">
            <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 mb-1 sm:mb-2 mx-auto" />
            <div className="text-sm sm:text-2xl md:text-3xl font-bold font-mono bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent truncate">
              {pageData.channel_subscribers?.toLocaleString()}
            </div>
            <div className="text-[8px] sm:text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mt-0.5 sm:mt-1">
              Active Members
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 sm:p-4 md:p-6 rounded-2xl hover:bg-white/10 transition-colors">
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-fuchsia-400 mb-1 sm:mb-2 mx-auto" />
            <div className="text-sm sm:text-2xl md:text-3xl font-bold font-mono text-fuchsia-200">
              #1
            </div>
            <div className="text-[8px] sm:text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mt-0.5 sm:mt-1">
              Trending
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 sm:p-4 md:p-6 rounded-2xl hover:bg-white/10 transition-colors">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-teal-400/50 mx-auto mb-1 sm:mb-2 flex items-center justify-center text-teal-400 font-bold text-[8px] sm:text-xs">
              A+
            </div>
            <div className="text-sm sm:text-2xl md:text-3xl font-bold font-mono text-teal-200">
              100%
            </div>
            <div className="text-[8px] sm:text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mt-0.5 sm:mt-1">
              Verified
            </div>
          </div>
        </div>

        <p className="text-[8px] sm:text-[10px] text-violet-200/40 mt-4 sm:mt-8 pb-2 shrink-0">
          <span className="font-bold">Disclaimer:</span> Educational content
          only.
        </p>
      </div>
    </main>
  );
}


