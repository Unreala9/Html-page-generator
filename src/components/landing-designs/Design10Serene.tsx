import { Button } from "@/components/ui/button";
import { Leaf, Wind, ArrowRight, Check } from "lucide-react";

export default function Design11Serene({ pageData }: any) {
  return (
    <main className="h-screen relative overflow-hidden bg-[#0c1a15] text-white selection:bg-emerald-500/30 selection:text-emerald-200 font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-900/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between py-12 lg:py-0 relative z-10 gap-12 lg:gap-8">
        {/* Left Content Column */}
        <div className="flex-1 max-w-2xl text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/30 border border-emerald-800/50 text-emerald-400 text-sm font-medium tracking-wide">
            <Leaf size={14} className="animate-pulse" />
            <span>Growth & Prosperity</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-serif font-medium tracking-tight text-emerald-50 leading-[1.1]">
            {pageData.channel_title}
          </h1>

          <p className="text-lg lg:text-xl text-emerald-100/70 leading-relaxed font-light">
            {pageData.channel_desc1}
          </p>

          {pageData.channel_desc2 && (
            <p className="text-lg lg:text-xl text-emerald-100/60 leading-relaxed font-light mt-4">
              {pageData.channel_desc2}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            <Button
              onClick={() => window.open(pageData.channel_link, "_blank")}
              className="h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-medium shadow-[0_10px_30px_-10px_rgba(16,185,129,0.4)] transition-all hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] border border-emerald-500/20"
            >
              <span className="mr-2">
                {pageData.cta_button_text || "Begin Journey"}
              </span>
              <ArrowRight size={18} />
            </Button>

            <p className="text-sm text-emerald-400/80 font-medium px-4">
              Join {pageData.channel_subscribers?.toLocaleString()} others
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-emerald-900/50">
            <div className="space-y-1">
              <h4 className="text-2xl font-serif text-emerald-300">
                {pageData.channel_subscribers?.toLocaleString()}
              </h4>
              <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">
                Community
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-2xl font-serif text-emerald-300">100%</h4>
              <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">
                Verified
              </p>
            </div>
            <div className="space-y-1 hidden sm:block">
              <h4 className="text-2xl font-serif text-emerald-300">24/7</h4>
              <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">
                Support
              </p>
            </div>
          </div>

          <p className="text-[10px] text-emerald-800/60 mt-4">
            <span className="font-bold text-emerald-800/80">Disclaimer:</span>{" "}
            Educational content only. {pageData.channel_name} is not responsible
            for financial decisions.
          </p>
        </div>

        {/* Right Visual Column — shown at top on mobile */}
        <div className="flex-1 w-full max-w-lg lg:max-w-xl relative order-first lg:order-last max-h-[45vw] lg:max-h-none">
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[3/4] max-h-[600px] w-full">
            {/* Image Frame */}
            <div className="absolute inset-0 bg-emerald-900/20 backdrop-blur-sm rounded-t-[10rem] rounded-b-[2rem] border border-emerald-500/20 transform rotate-3 scale-95 transition-transform duration-300 hover:rotate-6 hover:scale-100" />

            <div className="absolute inset-0 rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10 group">
              <img
                src={pageData.image_url}
                alt={pageData.channel_title}
                className="w-full h-full object-contain grayscale-[20%] group-hover:grayscale-0 transition-all duration-300 scale-105 group-hover:scale-110"
              />

              {/* Floating Glass Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">
                    Featured Channel
                  </p>
                  <p className="text-white font-serif text-lg">
                    {pageData.channel_name}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 text-emerald-300">
                  <Wind size={18} />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 text-emerald-900/20 animate-spin-slow pointer-events-none">
              <Leaf size={120} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


