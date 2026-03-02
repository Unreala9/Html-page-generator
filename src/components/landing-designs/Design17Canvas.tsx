import { Button } from "@/components/ui/button";
import { Paperclip, Pin, Pencil } from "lucide-react";

export default function Design24Canvas({ pageData }: any) {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4 font-serif overflow-x-hidden relative text-slate-800">
      {/* Background Elements */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#a3a3a3 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>
      <div className="absolute top-12 left-12 w-64 h-64 bg-yellow-200/50 rounded-full blur-[60px] animate-pulse"></div>
      <div className="absolute bottom-12 right-12 w-64 h-64 bg-rose-200/50 rounded-full blur-[60px] animate-pulse"></div>

      <div className="relative max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Polaroid — desktop only */}
        <div className="hidden md:block md:order-1 relative transform rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 text-red-500">
            <Pin className="w-8 h-8 fill-red-500 drop-shadow-md" />
          </div>
          <div className="bg-white p-4 pb-12 shadow-xl rounded-sm border border-stone-200">
            <div className="bg-stone-100 aspect-square overflow-hidden mb-4 border border-stone-200">
              <img
                src={pageData.image_url}
                alt="polaroid"
                className="w-full h-full object-cover filter contrast-110 saturate-90"
              />
            </div>
            <div className="font-handwriting text-center text-xl text-stone-600 rotate-[-1deg] font-bold">
              {pageData.channel_name} • {new Date().getFullYear()}
            </div>
          </div>
        </div>

        {/* Right: Notes */}
        <div className="md:order-2 space-y-4 md:space-y-8">
          {/* Mobile logo — shown only on mobile */}
          <div className="flex flex-col items-center gap-2 md:hidden">
            <div className="relative">
              <Pin className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 fill-red-500 text-red-500 drop-shadow-md" />
              <div className="w-32 h-32 rounded-sm overflow-hidden border-4 border-white shadow-xl bg-white p-1 rotate-[-2deg]">
                <img
                  src={pageData.image_url}
                  alt={pageData.channel_name}
                  className="w-full h-full object-cover filter contrast-110"
                />
              </div>
            </div>
            <p className="text-xs text-stone-500 font-bold tracking-wider">
              {pageData.channel_name} • {new Date().getFullYear()}
            </p>
          </div>
          <div className="bg-yellow-100 p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] rotate-[1deg] relative">
            <div className="absolute -top-3 -right-3 text-stone-400">
              <Paperclip className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold text-stone-900 mb-2 font-sans">
              {pageData.channel_title}
            </h1>
            <div className="h-0.5 w-20 bg-stone-300 mb-4 rounded-full"></div>
            <p className="text-lg text-stone-700 leading-relaxed font-sans">
              {pageData.channel_desc1}
            </p>
            {pageData.channel_desc2 && (
              <p className="text-base text-stone-600 leading-relaxed font-sans mt-4">
                {pageData.channel_desc2}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 pl-4 border-l-4 border-stone-300 border-dotted">
            <div className="flex items-center gap-2 text-stone-600 font-sans">
              <div className="w-2 h-2 rounded-full bg-stone-400"></div>
              <span>Creative Community</span>
            </div>
            <div className="flex items-center gap-2 text-stone-600 font-sans">
              <div className="w-2 h-2 rounded-full bg-stone-400"></div>
              <span>Daily Inspiration</span>
            </div>
            <div className="flex items-center gap-2 text-stone-600 font-sans">
              <div className="w-2 h-2 rounded-full bg-stone-400"></div>
              <span>
                {pageData.channel_subscribers?.toLocaleString()} Artists Joined
              </span>
            </div>
          </div>

          <Button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="h-14 bg-stone-800 text-white font-sans text-lg rounded-sm shadow-lg hover:bg-stone-700 hover:-translate-y-1 transition-all flex items-center gap-2 px-8"
          >
            <Pencil className="w-4 h-4" />
            {pageData.cta_button_text || "Sketch Together"}
          </Button>

          <p className="text-[10px] text-stone-500 font-sans">
            <span className="font-bold">Disclaimer:</span> Educational content
            only. {pageData.channel_name} is not responsible for financial
            decisions.
          </p>
        </div>
      </div>
    </div>
  );
}


