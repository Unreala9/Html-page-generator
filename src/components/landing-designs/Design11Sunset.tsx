import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Sunset, Users, ArrowRight } from "lucide-react";

export default function Design12Sunset({ pageData }: any) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="h-screen w-full relative overflow-hidden bg-gradient-to-b from-orange-300 via-rose-300 to-purple-400 flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Sun/Atmosphere Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-yellow-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-purple-900/30 to-transparent pointer-events-none" />

      <div
        className={`relative z-10 max-w-2xl w-full text-center transition-all duration-300 transform flex flex-col items-center justify-center h-full max-h-screen py-4 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 "
        }`}
      >
        {/* Floating Image Container - Scale down on small screens */}
        <div className="shrink-0 mx-auto mb-4 sm:mb-6 relative w-44 sm:w-48 h-44 sm:h-48 group">
          <div className="absolute inset-0 bg-yellow-400 rounded-[2rem] rotate-6 opacity-60 blur-md group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute inset-0 bg-orange-500 rounded-[2rem] -rotate-3 opacity-60 blur-md group-hover:-rotate-6 transition-transform duration-300" />
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white/40 shadow-2xl bg-white/20 backdrop-blur-sm">
            <img
              src={pageData.image_url}
              alt={pageData.channel_title}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="absolute -bottom-3 -right-3 bg-white text-orange-600 px-3 py-0.5 rounded-full shadow-lg font-bold text-xs flex items-center gap-1 animate-bounce-slow">
            <Sunset size={12} />
            <span>Hot Pick</span>
          </div>
        </div>

        {/* Text Content - Compact spacing */}
        <div className="shrink min-h-0 flex flex-col items-center justify-center gap-1 sm:gap-2 w-full px-2">
          <h2 className="text-lg sm:text-xl font-bold text-white/90 uppercase tracking-wide truncate max-w-full">
            {pageData.channel_name}
          </h2>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black text-white drop-shadow-md tracking-tight leading-tight line-clamp-2">
            {pageData.channel_title}
          </h1>

          <div className="h-1 w-16 sm:w-24 bg-white/50 rounded-full mx-auto my-2 sm:my-4 shrink-0" />

          <p className="text-sm xs:text-base sm:text-xl text-white/95 font-medium drop-shadow-sm line-clamp-3 px-2">
            {pageData.channel_desc1}
          </p>

          {pageData.channel_desc2 && (
            <p className="hidden sm:block text-sm text-white/80 mt-2 max-w-lg mx-auto leading-relaxed line-clamp-2">
              {pageData.channel_desc2}
            </p>
          )}
        </div>

        {/* Action Area */}
        <div className="shrink-0 flex flex-col items-center gap-3 sm:gap-4 mt-4 sm:mt-8 w-full">
          <Button
            onClick={() => window.open(pageData.channel_link, "_blank")}
            className="group relative px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg rounded-full bg-white text-rose-600 hover:bg-orange-50 font-bold shadow-xl transition-all hover:-translate-y-1 border border-white/50 w-[90%] sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {pageData.cta_button_text || "Join Our Community"}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/10 backdrop-blur-md rounded-full text-white/90 text-xs sm:text-sm font-medium border border-white/10">
            <Users size={12} />
            <span>{pageData.channel_subscribers?.toLocaleString()} joined</span>
          </div>
        </div>

        <div className="shrink-0 mt-4 sm:mt-8 px-4 text-center">
          <p className="text-[10px] text-white/60 leading-tight">
            <span className="font-bold">Disclaimer:</span> Educational purpose
            only.
          </p>
        </div>
      </div>

      {/* Bottom Footer Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiIGQ9Ik0wLDIyNEw0OCwyMTMuM0M5NiwyMDMsMTkyLDE4MSwyODgsMTgxLjNDMzg0LDE4MSw0ODAsMjAzLDU3NiwyMjRDNjcyLDI0NSw3NjgsMjY3LDg2NCwyNTBCOTkwLDIzNSwxMDU2LDE4MSwxMTUyLDE2MEMxMjQ4LDEzOSwxMzQ0LDE0OSwxMzkyLDE1NEwxNDQwLDE2MEwxNDQwLDMyMEwxMzkyLDMyMEMxMzQ0LDMyMCwxMjQ4LDMyMCwxMTUyLDMyMEMxMDU2LDMyMCw5NjAsMzIwLDg2NCwzMjBDNzY4LDMyMCw2NzIsMzIwLDU3NiwzMjBDNDgwLDMyMCwzODQsMzIwLDI4OCwzMjBDMTkyLDMyMCw5NiwzMjAsNDgsMzIwTDAsMzIwWiI+PC9wYXRoPjwvc3ZnPg==')] bg-cover bg-bottom opacity-30 pointer-events-none" />
    </main>
  );
}



