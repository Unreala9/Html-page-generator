import { LandingPageData } from "./types";
import { useEffect } from "react";

interface Props {
  data: LandingPageData;
}

export default function Design6CryptoMinimal({ data }: Props) {
  useEffect(() => {
    // Meta Pixel tracking
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8 overflow-x-hidden">
      <main className="w-full max-w-md">
        {/* TOP CTA */}

        {/* CIRCULAR IMAGE */}
        <div className="mt-3 md:mt-5 flex justify-center">
          <div className="w-44 h-44 rounded-full p-[6px] bg-white">
            <img
              src={data.imageUrl}
              alt={data.channelTitle}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        <div className="mt-3 md:mt-5 flex justify-center">
          <h1 className="text-[24px] md:text-[32px] font-extrabold leading-snug ">
            {data.channelName}
          </h1>
        </div>

        {/* TITLE & DESCRIPTION */}
        <section className="mt-3 md:mt-5 text-center">
          <h1 className="text-[20px] md:text-[28px] font-extrabold leading-snug">
            {data.channelTitle}
          </h1>

          <div className="mt-3 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              {data.channelSubscribers.toLocaleString()} Subscribers
            </span>
          </div>

          <p className="mt-3 text-[20px] leading-relaxed text-white/85">
            <span className="text-2xl font-bold">{data.desc1}</span>
          </p>
        </section>

        {/* HIGHLIGHTS */}
        {data.desc2 && (
          <section className="mt-3 md:mt-4 space-y-2 text-center text-white/80 text-[20px]">
            <p className="text-2xl font-bold">{data.desc2}</p>
          </section>
        )}

        {/* BOTTOM CTA */}
        <div className="mt-4 md:mt-6 flex justify-center">
          <a
            href={data.channelLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-lg md:text-[24px] font-semibold border-2 border-[#1DA1F2] bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/15 active:scale-[0.99] transition"
            aria-label="Join Telegram Channel"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
            {data.ctaButtonText}
          </a>
        </div>

        {/* DISCLAIMER */}
        <section className="mt-3 md:mt-6">
          <p className="text-center text-[12px] text-white/75 leading-7">
            <span className="font-semibold text-white">Disclaimer:</span> This
            channel provides information for educational purposes only and is
            not financial advice. Trading involves risk; please trade
            responsibly. The owner is not liable for any losses or damages.
          </p>
        </section>
      </main>
    </div>
  );
}


