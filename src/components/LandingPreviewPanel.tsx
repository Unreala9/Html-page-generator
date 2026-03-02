import { useMemo } from "react";
import { PageData } from "./DesignRenderer";

interface Props {
  pageData: PageData;
  styleId: number;
}

/** Inner screen is 285px wide; design iframe is 375px wide → scale = 285/375 */
const SCALE = 285 / 375;
const SCREEN_W = 285;   // px — visible screen width inside phone frame
const SCREEN_H = 580;   // px — visible screen height inside phone frame

export default function LandingPreviewPanel({ pageData, styleId }: Props) {
  const iframeSrc = useMemo(() => {
    const p = new URLSearchParams({
      d: String(styleId),
      n: pageData.channel_name || "",
      t: pageData.channel_title || "",
      s: String(pageData.channel_subscribers || 0),
      d1: pageData.channel_desc1 || "",
      d2: pageData.channel_desc2 || "",
      cta: pageData.cta_button_text || "",
      lnk: pageData.channel_link || "",
      img: pageData.image_url || "",
    });
    return `/preview?${p.toString()}`;
  }, [styleId, pageData]);

  const outerW = SCREEN_W + 16; // phone shell padding on each side = 8px × 2

  return (
    <div className="hidden xl:flex flex-col w-[330px] flex-shrink-0 gap-2">
      {/* Label */}
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest text-center select-none">
        Live Preview
      </p>

      {/* Phone shell */}
      <div className="flex items-start justify-center overflow-hidden pt-1">
        <div
          className="relative flex-shrink-0 rounded-[38px] bg-gradient-to-b from-slate-600 to-slate-700 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.55)]"
          style={{
            width: `${outerW}px`,
            paddingTop: "12px",
            paddingBottom: "18px",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
        >
          {/* Top notch bar */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            <div className="w-10 h-1.5 bg-slate-800 rounded-full" />
            <div className="w-2 h-2 rounded-full border border-slate-500 bg-slate-700" />
          </div>

          {/* Screen glass */}
          <div
            className="rounded-[30px] overflow-hidden bg-black relative"
            style={{ width: `${SCREEN_W}px`, height: `${SCREEN_H}px` }}
          >
            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 h-6 z-30 flex items-center justify-between px-3 bg-black/50 pointer-events-none select-none">
              <span className="text-white text-[8px] font-bold">9:41</span>
              <div className="flex items-center gap-1 text-white text-[8px]">
                <span>▲▲▲</span>
                <span>WiFi</span>
                <span className="font-bold">100%</span>
              </div>
            </div>

            <iframe
              key={iframeSrc}
              src={iframeSrc}
              title="design-preview"
              scrolling="no"
              style={{
                width: "375px",
                height: `${Math.ceil(SCREEN_H / SCALE)}px`,
                border: "none",
                display: "block",
                transform: `scale(${SCALE})`,
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Home indicator */}
          <div className="mt-2 mx-auto w-14 h-1 rounded-full bg-slate-500" />
        </div>
      </div>
    </div>
  );
}
