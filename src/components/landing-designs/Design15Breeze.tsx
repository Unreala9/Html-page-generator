import { Button } from "@/components/ui/button";
import { Wind, Leaf, Droplets } from "lucide-react";

export default function Design21Breeze({ pageData }: any) {
  return (
    <div className="bg-[#F0F7F4] text-[#4A5D53] font-sans relative overflow-hidden">
      {/* ── Mobile Layout (< md) — compact, no scroll ── */}
      <div className="h-svh flex flex-col items-center justify-center gap-3 px-6 relative z-10 md:hidden">
        {/* Background wind icon */}
        <div className="absolute bottom-8 right-4 opacity-5 pointer-events-none">
          <Wind className="w-48 h-48 text-[#4A5D53]" />
        </div>

        {/* Channel Logo */}
        <div className="relative shrink-0">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <img
              src={pageData.image_url}
              alt={pageData.channel_name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-2 text-[#6B8E7B] uppercase tracking-widest text-[10px] font-semibold shrink-0">
          <Leaf className="w-3 h-3" />
          <span>Natural Growth</span>
        </div>

        {/* Channel name + title */}
        <div className="text-center shrink-0">
          <h1 className="text-3xl font-serif text-[#2C3E34] leading-tight">
            {pageData.channel_name}
          </h1>
          <h2 className="text-base text-[#6B8E7B] font-medium mt-1">
            {pageData.channel_title}
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#5C7267] text-center max-w-xs shrink-0 line-clamp-3">
          {pageData.channel_desc1}
        </p>

        {/* Feature quote */}
        <div className="flex items-center gap-3 border-l-2 border-[#C4DDD2] pl-4 shrink-0">
          <Droplets className="w-4 h-4 text-[#88B09F] shrink-0" />
          <span className="text-xs text-[#5C7267]/80 italic">
            "Like a breath of fresh air for your feed."
          </span>
        </div>

        {/* Stats */}
        <div className="text-center shrink-0">
          <div className="text-2xl font-serif text-[#2C3E34]">
            {pageData.channel_subscribers?.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#6B8E7B] uppercase tracking-wider">
            Community Members
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={() => window.open(pageData.channel_link, "_blank")}
          className="w-full max-w-xs h-12 bg-[#2C3E34] hover:bg-[#1A2620] text-white rounded-full text-xs uppercase tracking-widest transition-all hover:shadow-xl shrink-0"
        >
          {pageData.cta_button_text || "Begin Journey"}
        </Button>

        <p className="text-[9px] text-[#4A5D53]/60 text-center shrink-0">
          <span className="font-bold">Disclaimer:</span> Educational content
          only. {pageData.channel_name} is not responsible for financial
          decisions.
        </p>
      </div>

      {/* ── Desktop Layout (md+) — original 2-column ── */}
      <div className="hidden md:flex min-h-screen items-center justify-center p-12 relative">
        {/* Background panel */}
        <div className="absolute top-0 right-0 w-[50vw] h-full bg-[#E6F2ED] rounded-l-[100px] z-0" />
        <div className="absolute bottom-12 left-12 opacity-10">
          <Wind className="w-64 h-64 text-[#4A5D53]" />
        </div>

        <div className="relative z-10 max-w-4xl w-full grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-[#6B8E7B] uppercase tracking-widest text-xs font-semibold">
              <Leaf className="w-4 h-4" />
              <span>Natural Growth</span>
            </div>

            <h1 className="text-6xl font-serif text-[#2C3E34] leading-tight">
              {pageData.channel_name}
            </h1>
            <h2 className="text-xl text-[#6B8E7B] font-medium mt-2">
              {pageData.channel_title}
            </h2>

            <p className="text-lg leading-relaxed text-[#5C7267]">
              {pageData.channel_desc1}
            </p>

            {pageData.channel_desc2 && (
              <p className="text-base text-[#5C7267]/80 leading-relaxed font-light">
                {pageData.channel_desc2}
              </p>
            )}

            <div className="flex flex-col gap-4 border-l-2 border-[#D4EDE2] pl-6">
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-[#88B09F]" />
                <span className="text-sm font-medium">
                  Daily Refreshing Content
                </span>
              </div>
              <div className="text-sm text-[#5C7267]/80 italic">
                "Like a breath of fresh air for your feed."
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => window.open(pageData.channel_link, "_blank")}
                className="h-14 px-10 bg-[#2C3E34] hover:bg-[#1A2620] text-white rounded-full text-sm uppercase tracking-widest transition-all hover:shadow-xl hover:shadow-[#2C3E34]/20"
              >
                {pageData.cta_button_text || "Begin Journey"}
              </Button>

              <p className="text-[10px] text-[#4A5D53]/60 mt-4">
                <span className="font-bold">Disclaimer:</span> Educational
                content only. {pageData.channel_name} is not responsible for
                financial decisions.
              </p>
            </div>
          </div>

          {/* Right: Image Frame */}
          <div className="flex justify-end relative">
            <div className="relative w-80 h-[500px]">
              <div className="absolute inset-0 bg-white rounded-t-[150px] rounded-b-[20px] shadow-[20px_20px_40px_rgba(0,0,0,0.05)] overflow-hidden">
                <img
                  src={pageData.image_url}
                  alt={pageData.channel_name}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-[0.3s] hover:scale-110"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg max-w-[200px] border border-[#F0F7F4]">
                <div className="text-3xl font-serif text-[#2C3E34] mb-1">
                  {pageData.channel_subscribers?.toLocaleString()}
                </div>
                <div className="text-xs text-[#6B8E7B] uppercase tracking-wider">
                  Community Members
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


