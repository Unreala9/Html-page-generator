import { Button } from "@/components/ui/button";
import {
  Zap,
  Activity,
  AlertTriangle,
} from "lucide-react";

export default function Design28Nimbus({ pageData }: any) {
  return (
    <main className="h-svh w-full relative overflow-hidden bg-slate-950 text-white font-sans selection:bg-yellow-500/30 selection:text-yellow-400">
      {/* Atmospheric Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[150px] pointer-events-none" />

      {/* ── Mobile Layout (< lg) — stacked, no scroll ── */}
      <div className="h-full flex flex-col items-center justify-center px-5 py-4 gap-4 relative z-10 lg:hidden">
        {/* Logo at very top */}
        <div className="relative shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-yellow-500/60 shadow-[0_0_30px_rgba(250,204,21,0.3)] bg-slate-900">
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="w-full h-full object-contain p-2"
            />
          </div>
          <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-[spin_0.3s_linear_infinite]" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500 text-yellow-950 text-[10px] font-bold uppercase tracking-widest skew-x-[-10deg] animate-pulse shrink-0">
          <AlertTriangle size={11} className="fill-yellow-950" />
          <span>High Voltage • {pageData.channel_name}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-[0.9] text-center drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] shrink-0">
          {pageData.channel_title}
        </h1>

        {/* Desc */}
        <p className="text-sm text-blue-100/80 font-medium text-center border-l-4 border-yellow-500 pl-3 py-1 bg-gradient-to-r from-blue-900/20 to-transparent max-w-xs shrink-0">
          {pageData.channel_desc1}
        </p>

        {/* CTA + stat */}
        <div className="flex flex-col items-center gap-3 w-full shrink-0">
          <Button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="w-full max-w-xs h-12 bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-base font-black uppercase italic tracking-widest skew-x-[-10deg] shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all"
          >
            <Zap className="mr-1.5 fill-slate-950 w-4 h-4" />
            {pageData.cta_button_text || "Strike Now"}
          </Button>
          <div className="text-center font-mono text-xs text-blue-300">
            <div className="text-xl font-bold text-white">{pageData.channel_subscribers?.toLocaleString()}</div>
            <div>VOLTS_GENERATED</div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[9px] text-blue-500/50 uppercase tracking-widest text-center shrink-0">
          Disclaimer: Educational only. {pageData.channel_name} not liable.
        </p>
      </div>

      {/* ── Desktop Layout (lg+) — 2 columns ── */}
      <div className="hidden lg:flex h-full container mx-auto px-8 items-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-7 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500 text-yellow-950 text-xs font-bold uppercase tracking-widest skew-x-[-10deg] animate-pulse">
              <AlertTriangle size={13} className="fill-yellow-950" />
              <span>High Voltage • {pageData.channel_name}</span>
            </div>
            <h1 className="text-7xl xl:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              {pageData.channel_title}
            </h1>
            <p className="text-xl text-blue-100/80 font-medium max-w-lg border-l-4 border-yellow-500 pl-6 py-2 bg-gradient-to-r from-blue-900/20 to-transparent">
              {pageData.channel_desc1}
            </p>
            {pageData.channel_desc2 && (
              <p className="text-lg text-blue-200/60 font-medium max-w-lg pl-7">{pageData.channel_desc2}</p>
            )}
            <div className="flex items-center gap-6 pt-2">
              <Button
                onClick={() => window.open(pageData.channel_link, "_blank")}
                className="h-16 px-10 bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xl font-black uppercase italic tracking-widest skew-x-[-10deg] shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:shadow-[0_0_50px_rgba(250,204,21,0.8)] transition-all hover:scale-105"
              >
                <Zap className="mr-2 fill-slate-950 w-6 h-6 animate-bounce" />
                {pageData.cta_button_text || "Strike Now"}
              </Button>
              <div className="flex items-center gap-3 px-5 border-l border-blue-800 text-blue-300 font-mono text-xs">
                <div>
                  <div className="text-2xl font-bold text-white leading-none">{pageData.channel_subscribers?.toLocaleString()}</div>
                  <div className="mt-0.5">VOLTS_GENERATED</div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-blue-500/50 uppercase tracking-widest">
              Disclaimer: Educational only. {pageData.channel_name} not liable.
            </p>
          </div>

          {/* Right Visual — Storm Core */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square mx-auto">
              <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-[spin_0.3s_linear_infinite]" />
              <div className="absolute inset-4 border-2 border-yellow-500/30 rounded-full animate-[spin_0.3s_linear_infinite_reverse]" />
              <div className="absolute inset-8 bg-slate-900/80 backdrop-blur-md rounded-full border border-blue-500/50 shadow-[0_0_100px_rgba(59,130,246,0.3)] overflow-hidden flex items-center justify-center">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-500/50" />
                <div className="absolute top-0 left-1/2 h-full w-[1px] bg-blue-500/50" />
                <img
                  src={pageData.image_url}
                  alt={pageData.channel_title}
                  className="w-full h-full object-contain p-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] z-10"
                />
                <Activity className="absolute bottom-6 right-6 text-yellow-400 animate-pulse w-5 h-5" />
              </div>
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-yellow-400 rounded-full blur-[2px] shadow-[0_0_10px_#facc15] animate-[orbit_0.3s_linear_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


