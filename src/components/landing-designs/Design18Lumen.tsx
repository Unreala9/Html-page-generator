import { Button } from "@/components/ui/button";
import { Lightbulb, MousePointer2 } from "lucide-react";

export default function Design25Lumen({ pageData }: any) {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 font-sans overflow-x-hidden relative text-white">
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-6 md:space-y-12">
        <div className="relative inline-block group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
          <div className="relative w-40 h-40 rounded-full p-2 bg-black ring-1 ring-emerald-500/50 overflow-hidden">
            <img
              src={pageData.image_url}
              alt={pageData.channel_name}
              className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="absolute -right-4 -bottom-2 bg-emerald-500 text-black px-3 py-1 rounded-full text-xs font-bold font-mono animate-bounce">
            LIVE
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 rounded-full px-4 py-1.5 text-emerald-400 text-xs tracking-widest uppercase bg-emerald-500/5 backdrop-blur-sm">
            <Lightbulb className="w-3 h-3" />
            Illuminating Insights
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            {pageData.channel_name}
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-lg mx-auto leading-relaxed">
            {pageData.channel_title}.{" "}
            <span className="text-zinc-500">{pageData.channel_desc1}</span>
          </p>

          {pageData.channel_desc2 && (
            <p className="text-lg text-zinc-600 font-light max-w-lg mx-auto">
              {pageData.channel_desc2}
            </p>
          )}
        </div>

        <div className="pt-4 md:pt-8">
          <Button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="h-16 px-12 bg-white text-black hover:bg-emerald-400 rounded-full text-lg font-bold transition-all hover:scale-110 hover:shadow-[0_0_40px_rgba(52,211,153,0.5)]"
          >
            {pageData.cta_button_text || "Turn On Access"}
            <MousePointer2 className="ml-2 w-5 h-5" />
          </Button>

          <div className="mt-4 md:mt-8 flex justify-center gap-8 text-sm text-zinc-600 font-mono">
            <div className="flex flex-col items-center gap-1">
              <span className="text-white block">
                {pageData.channel_subscribers?.toLocaleString()}
              </span>
              <span>Observers</span>
            </div>
            <div className="w-[1px] h-10 bg-zinc-800"></div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-white block">24/7</span>
              <span>Active</span>
            </div>
          </div>

          <p className="text-[10px] text-zinc-700 font-mono mt-4 md:mt-8">
            DISCLAIMER: EDUCATIONAL ONLY. {pageData.channel_name} NOT LIABLE.
          </p>
        </div>
      </div>
    </div>
  );
}


