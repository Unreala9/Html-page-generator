import { useState, useEffect } from "react";

interface Design3Props {
  pageData: {
    channel_name: string;
    channel_title: string;
    channel_subscribers: number;
    channel_desc1: string;
    channel_desc2: string | null;
    cta_button_text: string;
    channel_link: string;
    image_url: string;
    page_views: number;
  };
}

export default function Design3CleanMinimal({ pageData }: Design3Props) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsButtonEnabled(true);
    }
  }, [timeLeft]);

  return (
    <>
      <style>{`
        :root {
          --primary: #1d4ed8;
          --primary-shadow: rgba(29,78,216,0.3);
          --page-grad-from: #e0f2fe;
          --page-grad-to: #dbeafe;
          --ink: #0b1220;
          --card-bg: #ffffffdd;
          --btn-bg: #14b8a6;
          --btn-ink: #000;
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }

        @keyframes shimmer-bg {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .animated-bg::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%);
          transform: translate(-50%, -50%);
          animation: float-gentle 6s ease-in-out infinite;
        }

        .landing-wrap {
          width: min(640px, 92vw);
          text-align: center;
          padding: 24px;
          animation: fadeBody 0.6s ease both;
          position: relative;
          z-index: 10;
        }

        .landing-hero {
          background: var(--card-bg);
          backdrop-filter: saturate(130%) blur(6px);
          border: 1px solid #00000014;
          border-radius: 20px;
          padding: 28px 20px;
          box-shadow: 0 12px 28px -8px rgba(2,8,23,.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .landing-hero:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -12px rgba(2,8,23,.2);
        }

        .landing-logo {
          width: min(220px, 60vw);
          height: auto;
          display: block;
          margin: 0 auto 16px;
          border-radius: 999px;
          box-shadow: 0 10px 30px var(--primary-shadow);
          animation: zoomIn 0.6s ease both 0.1s;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .landing-logo:hover {
          transform: scale(1.05) rotate(5deg);
          box-shadow: 0 15px 40px var(--primary-shadow);
        }

        .landing-h1 {
          font-size: clamp(22px, 3.5vw, 28px);
          margin: 0 0 4px;
          font-weight: 800;
          letter-spacing: 0.2px;
          animation: fadeUp 0.6s ease both 0.18s;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6, #60a5fa);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeUp 0.6s ease both 0.18s, shimmer-bg 3s ease infinite;
        }

        .landing-tag {
          font-size: clamp(16px, 3vw, 20px);
          margin: 0 0 12px;
          font-weight: 800;
          animation: fadeUp 0.6s ease both 0.24s;
        }

        .landing-lead {
          font-size: clamp(14px, 2.6vw, 16px);
          line-height: 1.55;
          margin: 0 auto 16px;
          max-width: 48ch;
          opacity: 0.9;
          animation: fadeUp 0.6s ease both 0.3s;
        }

        .landing-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border-radius: 999px;
          font-weight: 900;
          font-size: clamp(15px, 2.8vw, 18px);
          background: var(--btn-bg);
          color: var(--btn-ink);
          border: 2px solid #000000cc;
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          animation: fadeUp 0.6s ease both 0.36s;
        }

        .landing-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(13,148,136,.28), 0 6px 12px rgba(14,165,233,.18);
        }

        .landing-cta:active {
          transform: translateY(0);
        }

        .landing-disc {
          margin: 10px auto 0;
          max-width: 60ch;
          font-size: 11px;
          line-height: 1.5;
          opacity: 0.85;
          animation: fadeUp 0.6s ease both 0.42s;
        }

        @keyframes fadeBody { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.92) } to { opacity: 1; transform: scale(1) } }
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>

      <div
        className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans overflow-x-hidden relative"
        style={{
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
          color: "var(--ink)",
          background:
            "linear-gradient(120deg, var(--page-grad-from) 0%, var(--page-grad-to) 100%)",
        }}
      >
        <main className="landing-wrap">
          <section className="landing-hero">
            <img
              src={pageData.image_url}
              alt={`${pageData.channel_name} logo`}
              className="landing-logo"
              width="400"
              height="440"
              loading="lazy"
            />

            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-black">
                {pageData.channel_name}
              </h1>
            </div>

            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-black">
                {pageData.channel_title}
              </h1>
              <div className="mt-2 text-sm font-bold text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full">
                {pageData.channel_subscribers.toLocaleString()} Subscribers
              </div>
            </div>

            <p className="landing-lead">
              <span className="text-2xl font-bold">
                {pageData.channel_desc1}
              </span>
              {pageData.channel_desc2 && (
                <>
                  <br />
                  <br />
                  <span className="text-2xl font-bold">
                    {pageData.channel_desc2}
                  </span>
                </>
              )}
            </p>

            {/* Timer Display - Above Button */}
            {!isButtonEnabled && (
              <div
                style={{
                  marginBottom: "16px",
                  animation: "fadeUp 0.6s ease both 0.34s",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    fontWeight: "600",
                    fontSize: "14px",
                    background: "rgba(29,78,216,0.1)",
                    border: "2px solid rgba(29,78,216,0.3)",
                    color: "var(--primary)",
                  }}
                >
                  <svg
                    style={{
                      height: "20px",
                      width: "20px",
                      animation: "spin 1s linear infinite",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      style={{ opacity: 0.25 }}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      style={{ opacity: 0.75 }}
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Click Fast to Grab Offer in {timeLeft}s
                </div>
              </div>
            )}

            {/* CTA Button - Always Clickable */}
            <button
              className="landing-cta"
              onClick={() => {
                window.open(
                  pageData.channel_link,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M9.036 15.501 8.9 19.23c.32 0 .457-.137.622-.3l2.986-2.86 6.19 4.536c1.134.626 1.941.3 2.25-1.05l4.074-19.12h0c.363-1.694-.61-2.356-1.71-1.941L1.68 8.62C.045 9.257.055 10.18 1.39 10.59l5.94 1.854L19.636 4.9c.622-.41 1.189-.183.723.227"
                  fill="currentColor"
                />
              </svg>
              <span>{pageData.cta_button_text || "Join on Telegram"}</span>
            </button>

            <p className="landing-disc">
              <strong>Disclaimer:</strong> All content here is for educational
              purposes only. {pageData.channel_name} is not responsible for any
              profits or losses. Trading involves risk—please do your own
              research.
            </p>
          </section>

          {/* Animated Particles */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: "10%",
                width: "8px",
                height: "8px",
                background: "#3b82f6",
                borderRadius: "50%",
                opacity: 0.6,
                animation: "float-gentle 4s ease-in-out infinite",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: "20%",
                right: "15%",
                width: "6px",
                height: "6px",
                background: "#60a5fa",
                borderRadius: "50%",
                opacity: 0.4,
                animation: "float-gentle 5s ease-in-out infinite",
                animationDelay: "1s",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: "15%",
                left: "20%",
                width: "10px",
                height: "10px",
                background: "#1d4ed8",
                borderRadius: "50%",
                opacity: 0.5,
                animation: "float-gentle 6s ease-in-out infinite",
                animationDelay: "2s",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: "25%",
                right: "25%",
                width: "7px",
                height: "7px",
                background: "#3b82f6",
                borderRadius: "50%",
                opacity: 0.3,
                animation: "float-gentle 5.5s ease-in-out infinite",
                animationDelay: "0.5s",
              }}
            ></div>
          </div>
        </main>
      </div>
    </>
  );
}


