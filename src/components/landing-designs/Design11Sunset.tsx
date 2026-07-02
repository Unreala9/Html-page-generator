import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Sunset, Users, ArrowRight } from "lucide-react";

export default function Design12Sunset({ pageData }: any) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="h-screen w-full relative overflow-hidden bg-[#0d0714] flex flex-col items-center justify-center p-4">
      {/* Premium Sunset Atmosphere */}
      <div className="absolute inset-0 z-0">
        {/* Deep Sunset Glow (Amber, Rose, Violet) */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[90%] h-[80%] bg-gradient-to-t from-amber-500/20 via-rose-500/10 to-transparent rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
        <div className="absolute top-[15%] left-[20%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Soft Grid Lines for high-end aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div
        className={`relative z-10 max-w-2xl w-full text-center transition-all duration-700 transform flex flex-col items-center justify-center h-full max-h-screen py-4 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* Floating Image Container with sunset frames */}
        <div className="shrink-0 mx-auto mb-6 relative w-44 sm:w-48 h-44 sm:h-48 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-[2.5rem] rotate-8 opacity-40 blur-xl group-hover:rotate-12 group-hover:scale-105 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-600 to-orange-500 rounded-[2.5rem] -rotate-6 opacity-40 blur-xl group-hover:-rotate-12 group-hover:scale-105 transition-all duration-500" />
          
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/20 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] bg-slate-950/20 backdrop-blur-md p-1.5">
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="w-full h-full object-cover rounded-[2.2rem] filter brightness-95 contrast-105"
            />
          </div>

          <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-3.5 py-1.5 rounded-full shadow-[0_8px_20px_rgba(244,63,94,0.3)] font-black text-[10px] tracking-widest uppercase flex items-center gap-1.5 animate-bounce" style={{ animationDuration: '4s' }}>
            <Sunset size={12} />
            <span>Golden Pick</span>
          </div>
        </div>

        {/* Text Content in premium typography */}
        <div className="shrink min-h-0 flex flex-col items-center justify-center gap-2 w-full px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
            <Users size={10} className="text-amber-500" />
            <span>{pageData.channel_subscribers?.toLocaleString()} Active Members</span>
          </div>

          <h2 className="text-sm sm:text-base font-extrabold text-amber-500/80 uppercase tracking-[0.25em] max-w-full truncate">
            {pageData.channel_name}
          </h2>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            {pageData.channel_title}
          </h1>

          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-3 shrink-0" />

          <p className="text-sm xs:text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-md mx-auto line-clamp-3">
            {pageData.channel_desc1}
          </p>

          {pageData.channel_desc2 && (
            <p className="hidden sm:block text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed line-clamp-2 mt-1">
              {pageData.channel_desc2}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="shrink-0 flex flex-col items-center gap-4 mt-6 sm:mt-8 w-full">
          <Button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="group relative px-8 py-6 text-sm rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:via-rose-400 hover:to-purple-500 text-white font-extrabold shadow-[0_12px_32px_rgba(244,63,94,0.3)] transition-all duration-300 hover:scale-105 active:scale-98 border-0 w-[85%] sm:w-auto uppercase tracking-widest"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {pageData.cta_button_text || "Join Our Community"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>

        <div className="shrink-0 mt-6 sm:mt-8 px-4 text-center">
          <p className="text-[10px] text-slate-500/80 tracking-wider">
            <span className="font-bold text-slate-400">Disclaimer:</span> Educational purpose only. {pageData.channel_name} is not responsible for financial decisions.
          </p>
        </div>
      </div>
    </main>
  );
}
