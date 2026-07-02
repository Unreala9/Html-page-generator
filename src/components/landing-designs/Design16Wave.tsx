import { Button } from "@/components/ui/button";
import { Waves, Zap, Activity } from "lucide-react";

export default function Design23Wave({ pageData }: any) {
  return (
    <div className="h-screen w-full bg-[#0a0c16] flex items-center justify-center p-4 font-sans overflow-hidden relative text-indigo-100">
      {/* Premium Glass/Atmosphere Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-bl from-blue-500/10 to-teal-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />

        {/* Dynamic Wave Backdrops */}
        <div className="absolute bottom-0 left-0 w-full h-[35vh] opacity-25 mix-blend-screen">
          <svg className="w-full h-full fill-current text-indigo-500" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,144C672,149,768,203,864,229.3C960,256,1056,256,1152,240C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[40vh] opacity-15 mix-blend-screen">
          <svg className="w-full h-full fill-current text-purple-500" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ transform: 'scaleX(-1)' }}>
            <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,144C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-sm md:max-w-4xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-8 items-center h-full justify-center">
        {/* Visual Showcase */}
        <div className="relative flex justify-center shrink-0">
          <div className="w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80 relative group">
            {/* Glowing outer shadow ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition duration-500 animate-pulse" />
            
            <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-white/10 bg-slate-950/40 backdrop-blur-md p-2">
              <img
                src={pageData.image_url}
                alt={pageData.channel_name}
                className="w-full h-full object-cover rounded-full filter contrast-110 saturate-110 hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full flex items-center gap-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-slate-200">Interactive</span>
            </div>
          </div>
        </div>

        {/* Premium Glass Card */}
        <div className="bg-[#0f1425]/60 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-[2.5rem] shadow-[0_24px_80px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden w-full flex flex-col items-center text-center">
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 pointer-events-none" />
          
          <div className="absolute top-0 right-0 p-6 opacity-30">
            <Waves className="w-12 h-12 text-indigo-400/50" />
          </div>

          <div className="w-full space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-extrabold uppercase tracking-[0.2em] mb-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                <Activity size={12} />
                <span>Featured Channel</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300 tracking-tight leading-tight">
                {pageData.channel_name}
              </h1>
              <h2 className="text-sm sm:text-base text-sky-400 font-bold tracking-wider mt-1">
                {pageData.channel_title}
              </h2>
            </div>

            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />

            <p className="text-indigo-200/80 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              {pageData.channel_desc1}
            </p>

            {pageData.channel_desc2 && (
              <p className="hidden sm:block text-indigo-300/60 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                {pageData.channel_desc2}
              </p>
            )}

            {/* Premium Stat Boxes */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-4 border border-white/5 hover:bg-white/[0.06] transition-colors">
                <div className="text-2xl font-black text-white tracking-tight">
                  {pageData.channel_subscribers?.toLocaleString()}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mt-1">
                  Subscribers
                </div>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-4 border border-white/5 hover:bg-white/[0.06] transition-colors">
                <div className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-1">
                  Active
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mt-1">
                  Status
                </div>
              </div>
            </div>
          </div>

          {/* CTA Action */}
          <div className="w-full pt-6">
            <Button
              onClick={() => window.open(pageData.channel_link, "_blank")}
              className="w-full h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white rounded-2xl font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-[0_12px_40px_-8px_rgba(79,70,229,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] border-0"
            >
              {pageData.cta_button_text || "Ride the Wave"}
            </Button>
          </div>

          <p className="text-[10px] text-indigo-400/40 text-center mt-5 pt-4 border-t border-white/5 w-full">
            Disclaimer: Educational only. {pageData.channel_name} is not responsible for financial decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
