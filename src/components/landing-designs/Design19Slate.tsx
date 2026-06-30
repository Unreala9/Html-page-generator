import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain, Box, Layers } from "lucide-react";

export default function Design26Slate({ pageData }: any) {
  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-[#141211] text-stone-300 font-sans selection:bg-stone-700 selection:text-white flex items-center justify-center p-4">
      {/* Texture Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-[0.25] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1917]/90 via-[#141211]/95 to-[#0c0a09]" />
      
      {/* Structural Line Overlays */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-12">
        {/* Left Monolith Frame (Image Container) */}
        <div className="w-full max-w-[280px] lg:max-w-md lg:w-1/3 relative group shrink-0">
          {/* Asymmetrical Brutalist Slab Borders */}
          <div className="absolute inset-0 bg-stone-900 border border-stone-800 transform rotate-3 scale-105 transition-transform duration-500 shadow-2xl" />
          <div className="absolute inset-0 bg-stone-850 border border-stone-750 transform -rotate-3 scale-105 transition-transform duration-500 shadow-xl" />

          {/* Main Carved Box */}
          <div className="relative bg-stone-950 overflow-hidden shadow-3xl grayscale hover:grayscale-0 transition-all duration-500 ease-out border-[6px] border-stone-900 p-2.5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-30 mix-blend-multiply pointer-events-none" />

            <div className="aspect-square w-full relative bg-stone-900/60 rounded-sm">
              <img
                src={pageData.image_url}
                alt={pageData.channel_title}
                className="w-full h-full object-cover relative z-10 mix-blend-luminosity hover:mix-blend-normal opacity-90 hover:opacity-100 transition-all duration-500"
              />
            </div>

            <div className="absolute bottom-4 left-4 border-l-[3px] border-stone-600 pl-3 z-20">
              <p className="text-[9px] font-black uppercase text-stone-500 tracking-[0.35em] font-mono">
                Exhibit // 01
              </p>
            </div>
          </div>
        </div>

        {/* Right Content - Structured brutalist typography */}
        <div className="flex-1 max-w-2xl text-center space-y-6 md:space-y-10 flex flex-col items-center justify-center">
          <div className="w-full space-y-4">
            <div className="inline-flex items-center gap-2 mb-2 text-stone-500 font-extrabold uppercase tracking-[0.45em] text-[10px] md:text-xs font-mono">
              <Mountain size={12} className="text-stone-600 animate-pulse" />
              <span>The Foundation</span>
            </div>

            <h2 className="text-sm md:text-base text-stone-500 font-bold uppercase tracking-[0.25em] mb-1 line-clamp-1 font-mono">
              {pageData.channel_name}
            </h2>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-stone-100 uppercase tracking-tighter leading-[0.85] line-clamp-2">
              {pageData.channel_title}
            </h1>

            {/* Brutalist Thick Separator */}
            <div className="h-1.5 w-32 bg-stone-850 my-6 mx-auto border-t border-b border-stone-800" />

            <p className="text-lg md:text-2xl text-stone-400 font-serif italic leading-relaxed max-w-lg mx-auto line-clamp-3">
              "{pageData.channel_desc1}"
            </p>

            {pageData.channel_desc2 && (
              <p className="hidden md:block text-xs md:text-sm text-stone-500 font-sans mt-4 max-w-md mx-auto line-clamp-2 tracking-wide leading-relaxed">
                {pageData.channel_desc2}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 justify-center w-full pt-4">
            <Button
              onClick={() => window.open(pageData.channel_link, "_blank")}
              className="h-16 md:h-18 px-10 bg-stone-200 hover:bg-white text-stone-950 font-black text-xs uppercase tracking-[0.25em] rounded-none border-b-[6px] border-stone-500 active:border-b-0 active:translate-y-1 transition-all shadow-md font-mono"
            >
              <span>{pageData.cta_button_text || "Solidify"}</span>
              <ArrowRight size={14} className="ml-2" />
            </Button>

            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-stone-500 text-xs font-mono text-center pt-2 sm:pt-0">
              <div className="flex items-center justify-center gap-2">
                <Box size={13} className="text-stone-600" /> <span>Structure</span>
              </div>
              <div className="text-stone-200 font-bold text-center">100%</div>

              <div className="flex items-center justify-center gap-2">
                <Layers size={13} className="text-stone-600" /> <span>Depth</span>
              </div>
              <div className="text-stone-200 font-bold text-center">
                {pageData.channel_subscribers?.toLocaleString()}
              </div>
            </div>
          </div>

          <p className="text-[9px] text-stone-600 font-mono tracking-widest uppercase pt-6 border-t border-stone-900 w-full">
            Disclaimer: Educational only. {pageData.channel_name} not responsible for outcomes.
          </p>
        </div>
      </div>
    </main>
  );
}
