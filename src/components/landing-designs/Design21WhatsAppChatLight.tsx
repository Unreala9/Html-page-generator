import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ShieldCheck, Users, Clock, ExternalLink } from "lucide-react";

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

export default function Design21WhatsAppChatLight({ pageData }: Props) {
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
    <main className="min-h-screen w-full bg-gradient-to-tr from-[#022c22] via-[#064e3b] to-[#0f172a] text-white flex items-center justify-center p-4 sm:p-6 overflow-x-hidden font-sans relative selection:bg-emerald-500/30">
      
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse delay-500" />
      </div>

      <div className="w-full max-w-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 text-center space-y-6 sm:space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Verification Status Banner */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mx-auto">
          <ShieldCheck className="h-4 w-4" />
          <span>Official WhatsApp Community</span>
        </div>

        {/* Profile Avatar Section */}
        <div className="relative inline-block mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-60 animate-pulse" />
          <img
            src={pageData.image_url}
            alt={pageData.channel_name}
            className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover shadow-lg relative z-10 ring-4 ring-white/10"
          />
        </div>

        {/* Heading & Metadata */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
            {pageData.channel_name}
          </h1>
          
          <h2 className="text-lg sm:text-xl font-medium text-slate-200 max-w-xl mx-auto leading-snug">
            {pageData.channel_title}
          </h2>

          {/* Subscribers Count Badge */}
          <div className="flex justify-center pt-2">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-slate-300 text-xs sm:text-sm font-semibold shadow-inner">
              <Users className="h-4 w-4 text-emerald-400" />
              <span>{pageData.channel_subscribers.toLocaleString()} active subscribers</span>
            </div>
          </div>
        </div>

        {/* Marketing/Description Cards */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 sm:p-6 text-left space-y-4 max-w-xl mx-auto">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-medium">
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3">
              {pageData.channel_desc2}
            </p>
          )}
        </div>

        {/* Countdown & CTA area */}
        <div className="space-y-4 max-w-md mx-auto pt-2">
          {/* Active Timer Pill */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md animate-bounce">
              <Clock className="h-4 w-4 animate-spin" />
              <span>Offer Link Expires In: {timeLeft}s</span>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleCTA}
            className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-full text-base sm:text-lg shadow-[0_8px_30px_rgba(16,185,129,0.35)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 border-none"
          >
            <span>{pageData.cta_button_text || "Join WhatsApp Group"}</span>
            <ExternalLink className="h-5 w-5" />
          </Button>

          <p className="text-[10px] sm:text-xs text-slate-500 leading-normal max-w-xs mx-auto">
            * By clicking join, you will be redirected to the secure WhatsApp channel interface.
          </p>
        </div>

        {/* Disclaimer section */}
        <div className="border-t border-white/5 pt-4 text-center">
          <p className="text-[9px] sm:text-xs text-slate-500 leading-relaxed max-w-lg mx-auto">
            <strong>Disclaimer:</strong> All contents provided on this page and inside the channel are for educational use. {pageData.channel_name} is not responsible for individual financial choices.
          </p>
        </div>

      </div>
    </main>
  );
}
