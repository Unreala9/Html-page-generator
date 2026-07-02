import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

export default function Design15BoldGradient({ pageData }: any) {
  return (
    <main className="bg-[#030614] text-white relative min-h-screen overflow-hidden flex flex-col justify-between selection:bg-fuchsia-500/30 selection:text-fuchsia-300">
      {/* Premium Ambient Light Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] bg-fuchsia-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
        
        {/* Subtle mesh background noise pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
      </div>

      {/* ── Mobile Layout (< md) ── */}
      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 py-8 relative z-10 md:hidden h-full max-h-screen">
        {/* Circular profile image with glass glow */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-fuchsia-500 blur-xl opacity-60 animate-pulse" />
          <div className="relative w-36 h-36 rounded-full overflow-hidden ring-4 ring-white/10 shadow-[0_0_40px_rgba(139,92,246,0.3)] p-1 bg-slate-950/40 backdrop-blur-md">
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-fuchsia-400 text-[10px] font-extrabold uppercase tracking-[0.2em] shrink-0">
          <TrendingUp size={11} className="text-fuchsia-500" />
          <span>Exclusive Access</span>
        </div>

        {/* Title */}
        <div className="text-center space-y-1 shrink-0">
          <h2 className="text-xs font-bold text-indigo-400 tracking-[0.3em] uppercase">
            {pageData.channel_name}
          </h2>
          <h1 className="text-3xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200">
            {pageData.channel_title}
          </h1>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 text-center max-w-xs leading-relaxed shrink-0 line-clamp-3">
          {pageData.channel_desc1}
        </p>

        {/* CTA + stats info */}
        <div className="flex flex-col items-center gap-4 w-full shrink-0">
          <Button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full max-w-xs h-13 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 hover:from-blue-500 hover:via-indigo-500 hover:to-fuchsia-500 text-white font-extrabold text-sm uppercase tracking-widest shadow-[0_8px_30px_rgba(79,70,229,0.4)] transition-all hover:scale-[1.03] active:scale-[0.98] border-0"
          >
            <span>{pageData.cta_button_text || "Get Started Now"}</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-lg font-black text-white">
              {pageData.channel_subscribers?.toLocaleString()}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold">
              Active Subscribers
            </span>
          </div>
        </div>

        {/* Bullet points */}
        <div className="flex gap-6 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Access</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Premium Analytics</span>
          </div>
        </div>

        <p className="text-[9px] text-slate-500 text-center shrink-0">
          Disclaimer: Educational only. {pageData.channel_name} not responsible for financial decisions.
        </p>
      </div>

      {/* ── Desktop Layout (md+) ── */}
      <div className="hidden md:flex flex-1 container mx-auto px-12 items-center justify-between relative z-10 gap-16 py-12">
        {/* Left column content */}
        <div className="flex-grow flex-1 text-center flex flex-col items-center justify-center max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-fuchsia-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
            <TrendingUp size={14} className="text-fuchsia-500" />
            <span>Exclusive Access</span>
          </div>

          <h2 className="text-sm font-extrabold text-indigo-400 tracking-[0.35em] uppercase mb-2">
            {pageData.channel_name}
          </h2>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-300">
            {pageData.channel_title}
          </h1>

          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            {pageData.channel_desc1}
          </p>

          {pageData.channel_desc2 && (
            <p className="text-base text-slate-400 mb-8 leading-relaxed">
              {pageData.channel_desc2}
            </p>
          )}

          <div className="flex flex-row items-center gap-8 justify-center w-full">
            <Button
              onClick={() => window.open(pageData.channel_link, "_blank")}
              className="h-16 px-10 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 hover:from-blue-500 hover:via-indigo-500 hover:to-fuchsia-500 text-white font-extrabold text-base uppercase tracking-widest shadow-[0_12px_40px_-8px_rgba(79,70,229,0.5)] transition-all hover:scale-[1.03] active:scale-[0.98] border-0"
            >
              <span>{pageData.cta_button_text || "Get Started Now"}</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="flex flex-col items-center border-l border-white/10 pl-8">
              <span className="text-3xl font-black text-white tabular-nums tracking-tight">
                {pageData.channel_subscribers?.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-1">
                Subscribers
              </span>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/5 pt-8 justify-center w-full">
            <div className="flex items-center gap-2 text-sm text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Premium Analytics</span>
            </div>
          </div>

          <p className="mt-8 text-[10px] text-slate-500 text-center">
            Disclaimer: Educational content only. {pageData.channel_name} is not responsible for financial decisions.
          </p>
        </div>

        {/* Right visual mockup */}
        <div className="flex-1 relative h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/60 to-slate-800/40 rounded-3xl -rotate-6 scale-90 opacity-40 border border-white/5 shadow-2xl" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-fuchsia-900/10 rounded-3xl rotate-3 scale-95 opacity-40 border border-white/5 shadow-2xl" />
          
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)] border border-white/15 p-2 bg-[#090b16]/80 backdrop-blur-md">
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="w-full h-full object-cover rounded-[2.2rem] opacity-90 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-slate-950/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <p className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-[0.2em] mb-1">
                  Official Portal
                </p>
                <p className="font-extrabold text-white text-base leading-tight">{pageData.channel_name}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
