import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Terminal, Cpu, ShieldAlert, ChevronRight } from "lucide-react";

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

export default function Design25WhatsAppCyberChat({ pageData }: Props) {
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
    <main className="min-h-screen w-full bg-[#030608] text-[#00ff66] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-mono selection:bg-[#00ff66]/20 selection:text-[#00ff66] relative overflow-hidden">
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{
          backgroundSize: "30px 30px",
          backgroundImage: "linear-gradient(to right, #00ff66 1px, transparent 1px), linear-gradient(to bottom, #00ff66 1px, transparent 1px)",
        }}
      />
      
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#00ff66]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00e1ff]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl bg-[#060b0d] border border-[#00ff66]/20 rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(0,255,102,0.1)] relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#00ff66]/20 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-[#00e1ff] animate-pulse" />
            <span className="text-xs text-white font-bold uppercase tracking-wider">Secure Portal v4.28</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-ping" />
            <span className="text-[10px] text-white font-bold uppercase tracking-wider">Link Active</span>
          </div>
        </div>

        {/* Cyber Circular Avatar */}
        <div className="relative inline-block mx-auto mb-4 left-1/2 -translate-x-1/2">
          <div className="absolute inset-[-4px] bg-[#00ff66]/30 rounded-full blur-md opacity-50" />
          <img
            src={pageData.image_url}
            alt={pageData.channel_name}
            className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover shadow-2xl relative z-10 border-2 border-[#00ff66]/30"
          />
        </div>

        {/* Heading information */}
        <div className="space-y-3 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
            {pageData.channel_name}
          </h1>
          <p className="text-[#00e1ff] text-xs sm:text-sm font-semibold tracking-widest uppercase">
            SYS_ONLINE // {pageData.channel_subscribers.toLocaleString()} CLIENT_COMMUNITIES
          </p>
          <div className="border border-[#00ff66]/20 rounded-lg p-2.5 bg-black/40 text-xs text-[#00ff66]/90 max-w-lg mx-auto leading-relaxed">
            &gt;&gt; HOST_TITLE: "{pageData.channel_title}"
          </div>
        </div>

        {/* Command execution representation */}
        <div className="bg-black/50 border border-[#00ff66]/10 rounded-xl p-5 text-left space-y-4 max-w-xl mx-auto mt-6">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold border-b border-[#00ff66]/10 pb-2 mb-2">
            <Terminal className="h-4 w-4 text-[#00ff66]" />
            <span>sys_payload_description.log</span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
            {pageData.channel_desc1}
          </p>
          {pageData.channel_desc2 && (
            <p className="text-[#00e1ff] text-xs sm:text-sm leading-relaxed border-t border-[#00ff66]/10 pt-3">
              &gt;&gt; {pageData.channel_desc2}
            </p>
          )}
        </div>

        {/* Flashing alerts & CTA */}
        <div className="space-y-4 max-w-md mx-auto pt-6 text-center">
          
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 text-red-400 px-3.5 py-1.5 rounded-lg text-xs font-bold animate-pulse">
              <ShieldAlert className="h-4.5 w-4.5" />
              <span>LINK_DECAY_IN // {timeLeft}s</span>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleCTA}
            className="w-full h-14 bg-[#00ff66] hover:bg-[#00d050] text-black font-extrabold rounded-lg text-base sm:text-lg shadow-[0_0_25px_rgba(0,255,102,0.3)] hover:shadow-[0_0_35px_rgba(0,255,102,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 border-none font-bold tracking-widest uppercase"
          >
            <span>{pageData.cta_button_text || "Execute Connection"}</span>
            <ChevronRight className="h-5 w-5" />
          </Button>

          <p className="text-[9px] text-[#00ff66]/60">
            SECURE DIRECT POINT-TO-POINT REDIRECT TUNNEL ACTIVE
          </p>
        </div>

        {/* Disclaimer section */}
        <div className="border-t border-[#00ff66]/10 pt-5 mt-6 text-center text-[9px] text-slate-500 leading-normal max-w-lg mx-auto uppercase tracking-wide">
          <strong>Notice:</strong> Encryption tunnels established. Education payload only. {pageData.channel_name} accepts zero liabilities for system trading anomalies.
        </div>

      </div>
    </main>
  );
}
