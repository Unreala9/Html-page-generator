import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ShieldAlert, Users, Sparkles, ExternalLink } from "lucide-react";

interface Props {
  pageData: {
    channel_name: string;
    channel_title: string;
    channel_subscribers: number;
    channel_desc1: string;
    channel_desc2: string | null;
    cta_button_text: string;
    channel_link: string;
    image_url: string;
    page_views?: number;
  };
}

export default function Design24WhatsAppGlassmorphic({ pageData }: Props) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCTA = () => {
    window.open(pageData.channel_link, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen w-full bg-[#020b08] text-[#f1f5f9] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
      
      {/* Dynamic blurred blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#25d366]/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-10 text-center space-y-6 sm:space-y-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Glow Tag */}
        <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-inner">
          <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>Premium Access Active</span>
        </div>

        {/* Frosted Avatar */}
        <div className="relative inline-block mx-auto">
          <div className="absolute inset-[-8px] bg-gradient-to-tr from-[#25d366]/40 to-teal-500/40 rounded-full blur-lg opacity-50 animate-pulse" />
          <img
            src={pageData.image_url}
            alt={pageData.channel_name}
            className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover shadow-2xl relative z-10 border border-white/20"
          />
        </div>

        {/* Header content */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            {pageData.channel_name}
          </h1>
          <h2 className="text-base sm:text-lg font-medium text-slate-300 max-w-md mx-auto leading-relaxed">
            {pageData.channel_title}
          </h2>
        </div>

        {/* Stats and followers */}
        <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm font-semibold bg-white/[0.02] border border-white/5 px-4 py-2 rounded-full w-fit mx-auto shadow-inner">
          <Users className="h-4.5 w-4.5 text-emerald-400" />
          <span>{pageData.channel_subscribers.toLocaleString()} followers in community</span>
        </div>

        {/* Glass description card */}
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 text-left space-y-4 max-w-xl mx-auto shadow-lg">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-medium">
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p className="text-slate-400 text-xs sm:text-sm border-t border-white/5 pt-3 leading-relaxed">
              {pageData.channel_desc2}
            </p>
          )}
        </div>

        {/* Timer countdown and CTA button */}
        <div className="space-y-4 max-w-md mx-auto pt-2">
          
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 bg-[#eff6ff]/5 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md">
              <ShieldAlert className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
              <span>Link secured. Expires in: {timeLeft}s</span>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleCTA}
            className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-full text-base sm:text-lg shadow-[0_8px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 border-none"
          >
            <span>{pageData.cta_button_text || "Join WhatsApp Group"}</span>
            <ExternalLink className="h-5 w-5" />
          </Button>

          <p className="text-[10px] text-slate-500">
            Secure redirect powered by WhatsApp Business.
          </p>
        </div>

        {/* Disclaimer section */}
        <div className="border-t border-white/5 pt-5 text-center text-[10px] sm:text-xs text-slate-500 leading-relaxed max-w-lg mx-auto">
          <strong>Disclaimer:</strong> {pageData.channel_name} shares updates for educational purposes. Trading financial assets contains risk—verify references and do your own diligence.
        </div>

      </div>
    </main>
  );
}
