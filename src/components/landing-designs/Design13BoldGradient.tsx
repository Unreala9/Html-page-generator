import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

export default function Design15BoldGradient({ pageData }: any) {
  return (
    <main className="bg-slate-950 text-white relative overflow-hidden selection:bg-fuchsia-500/30 selection:text-fuchsia-300">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Mobile Layout (< md) ── compact, no scroll */}
      <div className="h-svh flex flex-col items-center justify-center gap-4 px-6 relative z-10 md:hidden">
        {/* Circular logo */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-600 blur-xl opacity-60" />
          <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-fuchsia-500/50 shadow-[0_0_30px_rgba(147,51,234,0.5)]">
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="w-full h-full object-contain bg-slate-900"
            />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-fuchsia-400 text-xs font-medium uppercase tracking-wider shrink-0">
          <TrendingUp size={12} />
          <span>Exclusive Access</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black tracking-tight leading-[1.1] text-center bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent shrink-0">
          {pageData.channel_title}
        </h1>

        {/* Description */}
        <p className="text-sm text-slate-400 text-center max-w-xs leading-relaxed shrink-0 line-clamp-3">
          {pageData.channel_desc1}
        </p>

        {/* CTA + Stats */}
        <div className="flex flex-col items-center gap-3 w-full shrink-0">
          <Button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full max-w-xs h-12 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:from-blue-500 hover:to-fuchsia-500 text-white font-bold text-base shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all hover:scale-105 border-0"
          >
            {pageData.cta_button_text || "Get Started Now"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-xl font-bold text-white tabular-nums">
              {pageData.channel_subscribers?.toLocaleString()}
            </span>
            <span className="text-xs uppercase tracking-wide">
              Active Subscribers
            </span>
          </div>
        </div>

        {/* Checkmarks */}
        <div className="flex gap-5 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Instant Updates</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Premium Analysis</span>
          </div>
        </div>

        <p className="text-[9px] text-slate-600 text-center shrink-0">
          <span className="font-bold text-slate-500">Disclaimer:</span>{" "}
          Educational only. {pageData.channel_name} not responsible for
          financial decisions.
        </p>
      </div>

      {/* ── Desktop Layout (md+) ── 2 columns */}
      <div className="hidden md:flex container mx-auto px-6 h-svh items-center justify-between relative z-10">
        {/* Left Content */}
        <div className="flex-1 md:pr-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-fuchsia-400 text-xs font-medium mb-6 uppercase tracking-wider">
            <TrendingUp size={14} />
            <span>Exclusive Access</span>
          </div>

          <h1 className="text-7xl font-black tracking-tight leading-[1.1] mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {pageData.channel_title}
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-xl leading-relaxed">
            {pageData.channel_desc1}
          </p>

          {pageData.channel_desc2 && (
            <p className="text-lg text-slate-500 mb-8 max-w-xl leading-relaxed">
              {pageData.channel_desc2}
            </p>
          )}

          <div className="flex flex-row items-center gap-6">
            <Button
              onClick={() => window.open(pageData.channel_link, "_blank")}
              className="h-14 px-8 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:from-blue-500 hover:to-fuchsia-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all hover:scale-105 border-0"
            >
              {pageData.cta_button_text || "Get Started Now"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold text-white tabular-nums tracking-tight">
                {pageData.channel_subscribers?.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                Active Subscribers
              </span>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-slate-900/50 pt-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Instant Updates</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Premium Analysis</span>
            </div>
          </div>

          <p className="mt-8 text-[10px] text-slate-600">
            <span className="font-bold text-slate-500">Disclaimer:</span>{" "}
            Educational content only. {pageData.channel_name} is not responsible
            for financial decisions.
          </p>
        </div>

        {/* Right Visual */}
        <div className="flex-1 relative h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800 rounded-3xl -rotate-6 scale-90 opacity-50 border border-slate-700/50" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-fuchsia-900/20 rounded-3xl rotate-3 scale-95 opacity-50 border border-slate-700/50" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-700 group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-10" />
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-6 left-6 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-lg transform transition hover:-translate-y-1">
              <p className="text-xs text-slate-400 font-medium mb-1">
                Featured Channel
              </p>
              <p className="font-bold text-white">{pageData.channel_name}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


