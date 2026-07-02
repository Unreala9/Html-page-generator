import { Button } from "@/components/ui/button";
import { Crown, Star, ArrowRight, Award } from "lucide-react";

export default function Design16Elegant({ pageData }: any) {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#08080a] text-[#f7f5f0] font-serif overflow-x-hidden selection:bg-amber-900/50 selection:text-white">
      {/* LEFT SIDEBAR (Image/Brand Area) - 40% Width on Desktop */}
      <div className="w-full lg:w-[42%] h-[45vh] lg:h-full bg-[#111115] relative flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-amber-500/10 shadow-[8px_0_30px_rgba(0,0,0,0.5)] z-20">
        {/* Fine background scale texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]" />

        {/* Outer vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#08080a_100%)] pointer-events-none" />

        {/* Double Fine Golden Frame */}
        <div className="absolute inset-6 border border-amber-500/15 rounded-2xl lg:rounded-none pointer-events-none flex flex-col justify-between p-1">
          <div className="absolute inset-1 border border-amber-500/5" />
          <div className="flex justify-between z-10">
            <div className="w-6 h-6 border-l-2 border-t-2 border-amber-500/40" />
            <div className="w-6 h-6 border-r-2 border-t-2 border-amber-500/40" />
          </div>
          <div className="flex justify-between z-10">
            <div className="w-6 h-6 border-l-2 border-b-2 border-amber-500/40" />
            <div className="w-6 h-6 border-r-2 border-b-2 border-amber-500/40" />
          </div>
        </div>

        {/* Hero Image Container */}
        <div className="relative w-full h-full max-h-[360px] lg:max-h-[500px] flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-amber-500/5 blur-[90px] rounded-full pointer-events-none animate-pulse" />

          <img
            src={pageData.image_url}
            alt={pageData.channel_title}
            className="relative w-full h-full object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.8)] hover:scale-[1.03] transition-transform duration-500"
          />
        </div>

        {/* Bottom Tag */}
        <div className="absolute bottom-6 left-0 w-full text-center">
          <div className="inline-flex items-center gap-2.5 text-amber-500/60 text-[10px] uppercase tracking-[0.4em] font-sans font-black">
            <Crown size={11} className="text-amber-500/40" />
            <span>Premium Access</span>
            <Crown size={11} className="text-amber-500/40" />
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT AREA - 60% Width on Desktop */}
      <div className="flex-1 bg-[#09090c] relative flex flex-col justify-center items-center text-center px-8 lg:px-24 py-16">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-amber-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-8 max-w-2xl mx-auto flex flex-col items-center">
          {/* Rating / Verification Tag */}
          <div className="flex items-center justify-center gap-4 text-amber-500/80">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={12}
                  className="fill-amber-500 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                />
              ))}
            </div>
            <span className="text-[10px] font-sans font-extrabold tracking-[0.2em] uppercase border-l border-amber-800/60 pl-4 text-amber-400">
              Verified Club
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm text-amber-600 font-sans font-extrabold uppercase tracking-[0.3em] text-center">
              {pageData.channel_name}
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight bg-gradient-to-br from-amber-100 via-amber-200 to-amber-500 bg-clip-text text-transparent pb-1 text-center font-serif">
              {pageData.channel_title}
            </h1>
          </div>

          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto" />

          <p className="text-base sm:text-lg text-stone-300 font-sans font-light leading-relaxed max-w-lg text-center">
            {pageData.channel_desc1}
          </p>

          {pageData.channel_desc2 && (
            <p className="text-sm text-stone-500 font-sans leading-relaxed max-w-lg text-center">
              {pageData.channel_desc2}
            </p>
          )}

          {/* Golden Button */}
          <div className="flex flex-col sm:flex-row gap-6 pt-4 justify-center w-full">
            <Button
              onClick={() => window.open(pageData.channel_link, "_blank")}
              className="h-16 px-12 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 text-xs font-sans font-black uppercase tracking-[0.25em] shadow-[0_12px_40px_-10px_rgba(217,119,6,0.35)] hover:shadow-[0_16px_50px_-8px_rgba(217,119,6,0.5)] transition-all hover:scale-105 active:scale-98 rounded-none border border-amber-400/20"
            >
              <span className="mr-3">
                {pageData.cta_button_text || "Join Now"}
              </span>
              <ArrowRight size={16} />
            </Button>
          </div>

          {/* Premium Details */}
          <div className="grid grid-cols-2 gap-8 pt-10 border-t border-amber-900/10 mt-8 w-full">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3.5 rounded-full bg-zinc-900/60 border border-amber-500/10 text-amber-500 shadow-inner">
                <Award size={18} />
              </div>
              <div>
                <p className="font-extrabold text-white text-lg tracking-tight font-sans">
                  {pageData.channel_subscribers?.toLocaleString()}
                </p>
                <p className="text-[9px] text-stone-500 font-sans uppercase tracking-[0.2em] font-bold mt-1">
                  Active Members
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3.5 rounded-full bg-zinc-900/60 border border-amber-500/10 text-amber-500 shadow-inner">
                <Crown size={18} />
              </div>
              <div>
                <p className="font-extrabold text-white text-lg tracking-tight font-sans">VIP</p>
                <p className="text-[9px] text-stone-500 font-sans uppercase tracking-[0.2em] font-bold mt-1">
                  Status
                </p>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-stone-600 font-sans mt-8 text-center tracking-wider">
            <span className="text-amber-700 font-bold">Disclaimer:</span> Educational purposes only. {pageData.channel_name} is not responsible for financial decisions.
          </p>
        </div>
      </div>
    </main>
  );
}
