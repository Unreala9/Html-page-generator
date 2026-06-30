import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Check, Users, ShieldCheck, Heart, ArrowRight } from "lucide-react";

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

export default function Design23WhatsAppChannelModern({ pageData }: Props) {
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
    <main className="min-h-screen w-full bg-[#f8fafc] text-slate-800 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-emerald-100 selection:text-emerald-800">
      
      {/* Light subtle gradient details */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-2xl bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 text-center space-y-6 sm:space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Verification badge */}
        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100 mx-auto">
          <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 fill-emerald-50" />
          <span>WhatsApp Verified Community</span>
        </div>

        {/* Central profile circular frame */}
        <div className="relative inline-block mx-auto">
          <img
            src={pageData.image_url}
            alt={pageData.channel_name}
            className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover shadow-md relative z-10 border-4 border-white"
          />
          <div className="absolute bottom-0 right-0 bg-[#25d366] p-1.5 rounded-full border-2 border-white text-white shadow-md z-20">
            <Check className="h-4 w-4 stroke-[3]" />
          </div>
        </div>

        {/* Header copy */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {pageData.channel_name}
          </h1>
          <h2 className="text-sm sm:text-base font-semibold text-slate-500 max-w-lg mx-auto leading-relaxed">
            {pageData.channel_title}
          </h2>
        </div>

        {/* Quick grid statistics cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-4 flex flex-col items-center">
            <Users className="h-5 w-5 text-emerald-600 mb-1" />
            <span className="text-sm sm:text-base font-bold text-slate-800">
              {pageData.channel_subscribers.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Active Members
            </span>
          </div>

          <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-4 flex flex-col items-center">
            <ShieldCheck className="h-5 w-5 text-emerald-600 mb-1" />
            <span className="text-sm sm:text-base font-bold text-slate-800">
              100%
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Secure Link
            </span>
          </div>

          <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-4 col-span-2 sm:col-span-1 flex flex-col items-center justify-center">
            <Heart className="h-5 w-5 text-emerald-600 mb-1" />
            <span className="text-sm sm:text-base font-bold text-slate-800">
              Daily
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Free Updates
            </span>
          </div>
        </div>

        {/* Descriptions block */}
        <div className="space-y-3 max-w-xl mx-auto pt-2">
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p className="text-slate-500 text-xs sm:text-sm italic leading-relaxed pt-2 border-t border-slate-100">
              {pageData.channel_desc2}
            </p>
          )}
        </div>

        {/* CTA section with timer */}
        <div className="space-y-4 max-w-md mx-auto pt-4">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-3.5 py-1.5 rounded-full text-xs font-bold border border-rose-100 animate-pulse">
              Link will be refreshed in {timeLeft}s
            </span>
          </div>

          <Button
            size="lg"
            onClick={handleCTA}
            className="w-full h-14 bg-[#25d366] hover:bg-[#20ba59] text-white font-extrabold rounded-full text-base sm:text-lg shadow-[0_10px_35px_-10px_rgba(37,211,102,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(37,211,102,0.8)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 border-none"
          >
            <span>{pageData.cta_button_text || "Join WhatsApp Group"}</span>
            <ArrowRight className="h-5 w-5" />
          </Button>

          <p className="text-[10px] text-slate-400 font-medium">
            No signup required. Redirects directly to WhatsApp application.
          </p>
        </div>

        {/* Disclaimer section */}
        <div className="border-t border-slate-100 pt-6 text-center text-[10px] text-slate-400 leading-relaxed max-w-lg mx-auto">
          <strong>Disclaimer:</strong> Content shared is for informational purposes only. {pageData.channel_name} does not warrant financial returns or take accountability for trading risk.
        </div>

      </div>
    </main>
  );
}
