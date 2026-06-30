import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { BadgeCheck, Users, ShieldAlert, ArrowRight } from "lucide-react";

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

export default function Design22WhatsAppChatDark({ pageData }: Props) {
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
    <main className="min-h-screen w-full bg-[#0b0f19] text-[#e9edef] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#00a884]/20 selection:text-[#00f7b1]">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#00a884]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Left Column: Image/Avatar Showcase */}
        <div className="w-full md:w-2/5 flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#00a884]/30 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition-all duration-300" />
            <img
              src={pageData.image_url}
              alt={pageData.channel_name}
              className="h-44 w-44 sm:h-52 sm:w-52 rounded-3xl object-cover shadow-2xl relative z-10 ring-4 ring-[#00a884]/20 group-hover:ring-[#00a884]/40 transition-all duration-300"
            />
          </div>
          
          <div className="inline-flex items-center gap-1.5 bg-[#00a884]/10 text-[#00f7b1] border border-[#00a884]/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <BadgeCheck className="h-4.5 w-4.5 fill-current text-[#111827]" />
            <span>Verified Creator</span>
          </div>

          <p className="text-xs text-slate-500 font-semibold tracking-wide">
            Updated today • Active channel
          </p>
        </div>

        {/* Right Column: Copywriting & Actions */}
        <div className="w-full md:w-3/5 space-y-5 sm:space-y-6 text-left">
          
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {pageData.channel_name}
            </h1>
            <p className="text-[#00f7b1] font-semibold text-sm sm:text-base tracking-wide flex items-center gap-2">
              <Users className="h-4.5 w-4.5" />
              <span>{pageData.channel_subscribers.toLocaleString()} Community Members</span>
            </p>
          </div>

          <h2 className="text-lg font-bold text-slate-200 leading-snug">
            {pageData.channel_title}
          </h2>

          <div className="space-y-3 border-l-2 border-[#00a884]/40 pl-4 text-slate-400">
            <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
              {pageData.channel_desc1}
            </p>
            {pageData.channel_desc2 && (
              <p className="text-xs sm:text-sm font-medium">
                {pageData.channel_desc2}
              </p>
            )}
          </div>

          <div className="pt-2 space-y-4">
            {/* Timer Banner */}
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold">
              <ShieldAlert className="h-4.5 w-4.5 animate-pulse" />
              <span>Limited Link Access: Active for {timeLeft}s</span>
            </div>

            <Button
              size="lg"
              onClick={handleCTA}
              className="w-full bg-[#00a884] hover:bg-[#009071] text-white font-extrabold rounded-2xl h-14 text-base sm:text-lg shadow-[0_8px_25px_rgba(0,168,132,0.25)] hover:shadow-[0_8px_30px_rgba(0,168,132,0.45)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 border-none"
            >
              <span>{pageData.cta_button_text || "Access WhatsApp Channel"}</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Disclaimer section */}
          <div className="border-t border-slate-800 pt-4 mt-2">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              <strong>Disclaimer:</strong> {pageData.channel_name} is an educational group. Trading and business operations carry risks—please research beforehand.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}
