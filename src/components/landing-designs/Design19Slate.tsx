import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain, Box, Layers } from "lucide-react";

export default function Design26Slate({ pageData }: any) {
  return (
    <main className="h-screen w-full relative overflow-hidden bg-[#1c1917] text-stone-300 font-sans selection:bg-stone-600 selection:text-white flex items-center justify-center p-2">
      {/* Stone Texture Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-30 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-[#1c1917] to-stone-950 opacity-90" />

      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 lg:gap-24">
        {/* Left Monolith (Image) */}
        <div className="w-full max-w-[280px] lg:max-w-md lg:w-1/3 relative group perspective-1000 shrink-0">
          {/* Jagged Stone Background Shape (CSS Clip Path) */}
          <div className="absolute inset-0 bg-stone-800 transform rotate-3 scale-105 clip-path-polygon-[10%_0,100%_0,90%_100%,0%_100%]" />
          <div className="absolute inset-0 bg-stone-700 transform -rotate-2 scale-105 clip-path-polygon-[0_10%,100%_0,100%_90%,10%_100%]" />

          {/* Main Image Container - 'Carved' Look */}
          <div className="relative bg-stone-900 overflow-hidden shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-300 ease-out border-4 border-stone-800 p-1 md:p-2">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-50 mix-blend-multiply pointer-events-none" />

            <div className="aspect-square w-full relative">
              <img
                src={pageData.image_url}
                alt={pageData.channel_title}
                className="w-full h-full object-contain relative z-10 mix-blend-hard-light group-hover:mix-blend-normal opacity-90 group-hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Carved Overlay */}
            <div className="absolute bottom-4 left-4 border-l-4 border-stone-500 pl-3 z-20">
              <p className="text-[10px] md:text-xs font-black uppercase text-stone-500 tracking-[0.3em]">
                Exhibit A
              </p>
            </div>
          </div>
        </div>

        {/* Right Content - Chiseled Typography */}
        <div className="flex-1 max-w-2xl text-center lg:text-left space-y-4 md:space-y-8 flex flex-col items-center lg:items-start justify-center">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 mb-2 md:mb-6 text-stone-500 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">
              <Mountain size={14} />
              <span>The Foundation</span>
            </div>

            <h2 className="text-lg md:text-xl text-stone-600 font-bold uppercase tracking-widest mb-1 md:mb-2 line-clamp-1">
              {pageData.channel_name}
            </h2>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-stone-100 uppercase tracking-tighter leading-[0.85] mix-blend-luminosity line-clamp-2">
              {pageData.channel_title}
            </h1>

            {/* Horizontal Divider */}
            <div className="h-1 md:h-2 w-24 md:w-32 bg-stone-800 my-4 md:my-8 mx-auto lg:mx-0" />

            <p className="text-lg md:text-2xl text-stone-400 font-serif italic leading-relaxed line-clamp-3">
              "{pageData.channel_desc1}"
            </p>

            {pageData.channel_desc2 && (
              <p className="hidden md:block text-sm md:text-lg text-stone-500 font-sans mt-2 md:mt-4 max-w-lg line-clamp-2">
                {pageData.channel_desc2}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
            <Button
              onClick={() => window.open(pageData.channel_link, "_blank")}
              className="h-16 md:h-20 px-8 md:px-12 bg-stone-200 hover:bg-white text-stone-900 font-black text-lg md:text-xl uppercase tracking-widest rounded-none border-b-8 border-stone-600 active:border-b-0 active:translate-y-2 transition-all"
            >
              {pageData.cta_button_text || "Solidify"}
            </Button>

            <div className="absolute bottom-2 right-4 text-[8px] md:text-[10px] text-stone-700 uppercase tracking-widest hidden lg:block">
              Disclaimer: Educational only.
            </div>

            <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-1 md:gap-y-2 text-stone-500 text-xs md:text-sm font-mono text-left">
              <div className="flex items-center gap-2">
                <Box size={14} /> <span>Structure</span>
              </div>
              <div className="text-stone-300 font-bold">100%</div>

              <div className="flex items-center gap-2">
                <Layers size={14} /> <span>Depth</span>
              </div>
              <div className="text-stone-300 font-bold">
                {pageData.channel_subscribers?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


