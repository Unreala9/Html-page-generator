import { Button } from "@/components/ui/button";
import { Crown, Star, ArrowRight, Award } from "lucide-react";

export default function Design16Elegant({ pageData }: any) {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-zinc-950 text-amber-50 font-serif overflow-x-hidden selection:bg-amber-900/50 selection:text-white">
      {/* LEFT SIDEBAR (Image/Brand Area) - 40% Width on Desktop */}
      <div className="w-full lg:w-[40%] h-[40vh] lg:h-full bg-zinc-900 relative flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-amber-900/20 shadow-2xl z-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]" />

        {/* Gradient Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.8)_100%)] pointer-events-none" />

        {/* Golden Frame */}
        <div className="absolute inset-6 border border-amber-500/20 rounded-xl lg:rounded-none pointer-events-none flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-8 h-8 border-l border-t border-amber-500/40" />
            <div className="w-8 h-8 border-r border-t border-amber-500/40" />
          </div>
          <div className="flex justify-between">
            <div className="w-8 h-8 border-l border-b border-amber-500/40" />
            <div className="w-8 h-8 border-r border-b border-amber-500/40" />
          </div>
        </div>

        {/* Main Hero Image */}
        <div className="relative w-full h-full max-h-[400px] lg:max-h-[600px] flex items-center justify-center">
          {/* Glowing Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-amber-600/10 blur-[80px] rounded-full pointer-events-none" />

          <img
            src={pageData.image_url}
            alt={pageData.channel_title}
            className="relative w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Sidebar Footer Badge */}
        <div className="absolute bottom-6 left-0 w-full text-center">
          <div className="inline-flex items-center gap-2 text-amber-500/60 text-xs uppercase tracking-[0.3em]">
            <Crown size={12} />
            <span>Premium Access</span>
            <Crown size={12} />
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT AREA - 60% Width on Desktop */}
      <div className="flex-1 h-full bg-zinc-950 relative flex flex-col justify-center px-8 lg:px-24 py-12">
        {/* Background Ambience */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-8 max-w-2xl mx-auto lg:mx-0">
          {/* Header Tags */}
          <div className="flex items-center gap-4 text-amber-500/80">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-amber-500 text-amber-500"
                />
              ))}
            </div>
            <span className="text-xs font-sans font-bold tracking-widest uppercase border-l border-amber-800 pl-4">
              Verified Channel
            </span>
          </div>

          <h2 className="text-lg text-amber-600 font-sans font-bold uppercase tracking-widest mb-2">
            {pageData.channel_name}
          </h2>
          <h1 className="text-5xl lg:text-7xl font-medium tracking-tight bg-gradient-to-br from-amber-100 via-amber-200 to-amber-600 bg-clip-text text-transparent pb-2">
            {pageData.channel_title}
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-transparent rounded-full" />

          <p className="text-lg lg:text-xl text-zinc-400 font-sans font-light leading-relaxed">
            {pageData.channel_desc1}
          </p>

          {pageData.channel_desc2 && (
            <p className="text-base text-zinc-500 font-sans leading-relaxed">
              {pageData.channel_desc2}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <Button
              onClick={() => window.open(pageData.channel_link, "_blank")}
              className="h-16 px-10 bg-amber-600 hover:bg-amber-500 text-zinc-950 text-lg font-sans font-bold uppercase tracking-widest shadow-[0_0_40px_-10px_rgba(217,119,6,0.3)] hover:shadow-[0_0_60px_-10px_rgba(217,119,6,0.5)] transition-all transform hover:-translate-y-1 rounded-sm"
            >
              <span className="mr-3">
                {pageData.cta_button_text || "Join Now"}
              </span>
              <ArrowRight size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-12 border-t border-zinc-900 mt-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-amber-500">
                <Award size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-xl">
                  {pageData.channel_subscribers?.toLocaleString()}
                </p>
                <p className="text-xs text-zinc-500 font-sans uppercase tracking-wider mt-1">
                  Active Members
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-amber-500">
                <Crown size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-xl">VIP</p>
                <p className="text-xs text-zinc-500 font-sans uppercase tracking-wider mt-1">
                  Status
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-zinc-600 font-sans mt-8">
            <span className="text-amber-700 font-bold">Disclaimer:</span>{" "}
            Educational purposes only. {pageData.channel_name} is not
            responsible for financial decisions.
          </p>
        </div>
      </div>
    </main>
  );
}


