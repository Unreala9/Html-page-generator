/**
 * exportHtml.ts
 * Generates and downloads a self-contained HTML landing page file.
 * Uses the same Tailwind-based design systems already defined in the project.
 */

interface PageData {
  channelName: string;
  channelTitle: string;
  channelSubscribers: number;
  channelDesc1: string;
  channelDesc2?: string;
  ctaButtonText: string;
  channelLink: string;
  metalink?: string;
  gtagLink?: string;
  imageUrl: string;
  designStyle: number;
  slug?: string;
}

// Design name map for display
export const DESIGN_NAMES: Record<number, string> = {
  1: "Modern Blue",
  2: "Dark Rose",
  3: "Clean Minimal",
  4: "Ocean",
  5: "Crypto Minimal",
  6: "Neon Cyber",
  7: "Glassmorphism",
  8: "Gray Minimal",
  9: "Vibrant Gradient",
  10: "Serene Green",
  11: "Sunset",
  12: "Aurora",
  13: "Bold Gradient",
  14: "Elegant",
  15: "Breeze",
  16: "Wave",
  17: "Canvas",
  18: "Lumen",
  19: "Slate",
  20: "Nimbus",
  21: "FireStrike",
  22: "CrystalPro",
  23: "VerdantPulse",
  24: "GoldVault",
  25: "NeonCity",
  26: "SunriseBoost",
  27: "PurpleRain",
  28: "SteelEdge",
  29: "RoseElite",
  30: "TitanBlack",
  31: "IceStorm",
  32: "MidnightBloom",
  33: "VolcanoRed",
  34: "CosmicDrift",
  35: "EmeraldCity",
  36: "SandDune",
  37: "NordLight",
  38: "DiamondEdge",
  39: "SkyRocket",
  40: "VelvetLux",
};

/** Design colour themes (background gradient, card bg, accent, text) */
const DESIGN_THEMES: Record<
  number,
  {
    bg: string;
    card: string;
    accent: string;
    text: string;
    btn: string;
    btnText: string;
    timerBg: string;
    timerText: string;
  }
> = {
  1: {
    bg: "linear-gradient(135deg,#e8eaf6,#e3f2fd,#ede7f6)",
    card: "rgba(255,255,255,0.92)",
    accent: "#3b82f6",
    text: "#1e293b",
    btn: "linear-gradient(90deg,#06b6d4,#2563eb,#4f46e5)",
    btnText: "#fff",
    timerBg: "#eff6ff",
    timerText: "#1d4ed8",
  },
  2: {
    bg: "linear-gradient(135deg,#1a0a0a,#2d0a1a,#0a0a2d)",
    card: "rgba(30,15,25,0.95)",
    accent: "#ec4899",
    text: "#fce7f3",
    btn: "linear-gradient(90deg,#be185d,#7c3aed)",
    btnText: "#fff",
    timerBg: "#1a0a1a",
    timerText: "#f472b6",
  },
  3: {
    bg: "#f8fafc",
    card: "#fff",
    accent: "#7c3aed",
    text: "#1e293b",
    btn: "linear-gradient(90deg,#7c3aed,#6d28d9)",
    btnText: "#fff",
    timerBg: "#f5f3ff",
    timerText: "#7c3aed",
  },
  4: {
    bg: "linear-gradient(135deg,#0c1a3a,#0a2a5a,#0a3a4a)",
    card: "rgba(10,30,60,0.9)",
    accent: "#38bdf8",
    text: "#e0f2fe",
    btn: "linear-gradient(90deg,#0ea5e9,#2563eb)",
    btnText: "#fff",
    timerBg: "#0c2340",
    timerText: "#38bdf8",
  },
  5: {
    bg: "#0a0a0a",
    card: "rgba(18,18,18,0.97)",
    accent: "#f59e0b",
    text: "#fafafa",
    btn: "linear-gradient(90deg,#d97706,#f59e0b)",
    btnText: "#000",
    timerBg: "#1a1a0a",
    timerText: "#fbbf24",
  },
  6: {
    bg: "linear-gradient(135deg,#030712,#0a0a1a)",
    card: "rgba(5,5,20,0.95)",
    accent: "#a855f7",
    text: "#e9d5ff",
    btn: "linear-gradient(90deg,#7e22ce,#a855f7,#06b6d4)",
    btnText: "#fff",
    timerBg: "#0f0020",
    timerText: "#c084fc",
  },
  7: {
    bg: "linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)",
    card: "rgba(255,255,255,0.15)",
    accent: "#fff",
    text: "#fff",
    btn: "rgba(255,255,255,0.25)",
    btnText: "#fff",
    timerBg: "rgba(255,255,255,0.1)",
    timerText: "#fff",
  },
  8: {
    bg: "#f1f5f9",
    card: "#fff",
    accent: "#475569",
    text: "#1e293b",
    btn: "linear-gradient(90deg,#475569,#334155)",
    btnText: "#fff",
    timerBg: "#f8fafc",
    timerText: "#475569",
  },
  9: {
    bg: "linear-gradient(135deg,#7c3aed,#ec4899,#f59e0b)",
    card: "rgba(255,255,255,0.15)",
    accent: "#fff",
    text: "#fff",
    btn: "rgba(255,255,255,0.3)",
    btnText: "#fff",
    timerBg: "rgba(255,255,255,0.1)",
    timerText: "#fff",
  },
  10: {
    bg: "linear-gradient(135deg,#064e3b,#065f46)",
    card: "rgba(6,78,59,0.9)",
    accent: "#34d399",
    text: "#d1fae5",
    btn: "linear-gradient(90deg,#059669,#10b981)",
    btnText: "#fff",
    timerBg: "#052e1f",
    timerText: "#34d399",
  },
  11: {
    bg: "linear-gradient(135deg,#7c2d12,#9a3412,#b45309)",
    card: "rgba(124,45,18,0.9)",
    accent: "#fb923c",
    text: "#fff7ed",
    btn: "linear-gradient(90deg,#ea580c,#f59e0b)",
    btnText: "#fff",
    timerBg: "#431407",
    timerText: "#fdba74",
  },
  12: {
    bg: "linear-gradient(135deg,#3b0764,#4c1d95,#1e1b4b)",
    card: "rgba(59,7,100,0.85)",
    accent: "#a78bfa",
    text: "#ede9fe",
    btn: "linear-gradient(90deg,#7c3aed,#8b5cf6,#06b6d4)",
    btnText: "#fff",
    timerBg: "#200040",
    timerText: "#c4b5fd",
  },
  13: {
    bg: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
    card: "rgba(26,26,46,0.9)",
    accent: "#e94560",
    text: "#eee",
    btn: "linear-gradient(90deg,#e94560,#f59e0b)",
    btnText: "#fff",
    timerBg: "#0d0d1a",
    timerText: "#f87171",
  },
  14: {
    bg: "linear-gradient(135deg,#0a0a0a,#1a1a1a)",
    card: "rgba(20,20,20,0.95)",
    accent: "#c9a06a",
    text: "#f5f5f4",
    btn: "linear-gradient(90deg,#a07040,#c9a06a)",
    btnText: "#fff",
    timerBg: "#1a1005",
    timerText: "#d4a06a",
  },
  15: {
    bg: "linear-gradient(135deg,#e0f2fe,#f0fdf4)",
    card: "rgba(255,255,255,0.9)",
    accent: "#0ea5e9",
    text: "#164e63",
    btn: "linear-gradient(90deg,#0284c7,#0ea5e9)",
    btnText: "#fff",
    timerBg: "#e0f7ff",
    timerText: "#0284c7",
  },
  16: {
    bg: "linear-gradient(135deg,#082f49,#0c4a6e,#0369a1)",
    card: "rgba(8,47,73,0.9)",
    accent: "#38bdf8",
    text: "#e0f2fe",
    btn: "linear-gradient(90deg,#0284c7,#38bdf8)",
    btnText: "#fff",
    timerBg: "#041c35",
    timerText: "#7dd3fc",
  },
  17: {
    bg: "#fff7ed",
    card: "#fffbf5",
    accent: "#d97706",
    text: "#78350f",
    btn: "linear-gradient(90deg,#b45309,#d97706)",
    btnText: "#fff",
    timerBg: "#fef3c7",
    timerText: "#92400e",
  },
  18: {
    bg: "#fff",
    card: "#f8fafc",
    accent: "#6366f1",
    text: "#1e293b",
    btn: "linear-gradient(90deg,#4f46e5,#6366f1)",
    btnText: "#fff",
    timerBg: "#eef2ff",
    timerText: "#4338ca",
  },
  19: {
    bg: "linear-gradient(135deg,#0f172a,#1e293b)",
    card: "rgba(30,41,59,0.9)",
    accent: "#94a3b8",
    text: "#e2e8f0",
    btn: "linear-gradient(90deg,#475569,#64748b)",
    btnText: "#fff",
    timerBg: "#0f172a",
    timerText: "#94a3b8",
  },
  20: {
    bg: "linear-gradient(135deg,#e2e8f0,#f1f5f9,#e0f2fe)",
    card: "rgba(255,255,255,0.85)",
    accent: "#0ea5e9",
    text: "#1e293b",
    btn: "linear-gradient(90deg,#0ea5e9,#38bdf8)",
    btnText: "#fff",
    timerBg: "#f0f9ff",
    timerText: "#0284c7",
  },
  21: {
    bg: "linear-gradient(135deg,#1a0000,#3b0000)",
    card: "rgba(30,0,0,0.95)",
    accent: "#ef4444",
    text: "#fff",
    btn: "linear-gradient(90deg,#b91c1c,#ef4444,#f97316)",
    btnText: "#fff",
    timerBg: "#1a0000",
    timerText: "#f87171",
  },
  22: {
    bg: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
    card: "rgba(15,12,41,0.92)",
    accent: "#a78bfa",
    text: "#e9d5ff",
    btn: "linear-gradient(90deg,#4c1d95,#7c3aed,#38bdf8)",
    btnText: "#fff",
    timerBg: "#0a0820",
    timerText: "#c4b5fd",
  },
  23: {
    bg: "linear-gradient(135deg,#0a1f0a,#14532d)",
    card: "rgba(10,31,10,0.9)",
    accent: "#4ade80",
    text: "#dcfce7",
    btn: "linear-gradient(90deg,#15803d,#4ade80)",
    btnText: "#000",
    timerBg: "#052e16",
    timerText: "#86efac",
  },
  24: {
    bg: "linear-gradient(135deg,#0a0800,#1a1500)",
    card: "rgba(20,16,0,0.97)",
    accent: "#f59e0b",
    text: "#fef3c7",
    btn: "linear-gradient(90deg,#b45309,#f59e0b,#fbbf24)",
    btnText: "#000",
    timerBg: "#1a1000",
    timerText: "#fbbf24",
  },
  25: {
    bg: "linear-gradient(135deg,#000000,#0a0018)",
    card: "rgba(0,0,10,0.97)",
    accent: "#06b6d4",
    text: "#cffafe",
    btn: "linear-gradient(90deg,#0891b2,#06b6d4,#a855f7)",
    btnText: "#fff",
    timerBg: "#000a12",
    timerText: "#22d3ee",
  },
  26: {
    bg: "linear-gradient(135deg,#431407,#7c2d12,#92400e)",
    card: "rgba(67,20,7,0.9)",
    accent: "#fb923c",
    text: "#fff7ed",
    btn: "linear-gradient(90deg,#ea580c,#fbbf24)",
    btnText: "#fff",
    timerBg: "#3a0d00",
    timerText: "#fdba74",
  },
  27: {
    bg: "linear-gradient(135deg,#1e0a3c,#2d0a5e)",
    card: "rgba(30,10,60,0.9)",
    accent: "#c084fc",
    text: "#ede9fe",
    btn: "linear-gradient(90deg,#7e22ce,#a855f7,#ec4899)",
    btnText: "#fff",
    timerBg: "#140030",
    timerText: "#d8b4fe",
  },
  28: {
    bg: "linear-gradient(135deg,#0f172a,#1e293b)",
    card: "rgba(15,23,42,0.95)",
    accent: "#64748b",
    text: "#cbd5e1",
    btn: "linear-gradient(90deg,#475569,#64748b)",
    btnText: "#fff",
    timerBg: "#0f172a",
    timerText: "#94a3b8",
  },
  29: {
    bg: "linear-gradient(135deg,#fff1f2,#fce7f3)",
    card: "rgba(255,255,255,0.9)",
    accent: "#ec4899",
    text: "#831843",
    btn: "linear-gradient(90deg,#be185d,#ec4899)",
    btnText: "#fff",
    timerBg: "#fff0f5",
    timerText: "#be185d",
  },
  30: {
    bg: "#030303",
    card: "rgba(10,10,10,0.98)",
    accent: "#6b7280",
    text: "#f9fafb",
    btn: "linear-gradient(90deg,#374151,#6b7280)",
    btnText: "#fff",
    timerBg: "#050505",
    timerText: "#9ca3af",
  },
  31: {
    bg: "linear-gradient(135deg,#dbeafe,#eff6ff,#f0f9ff)",
    card: "rgba(255,255,255,0.9)",
    accent: "#3b82f6",
    text: "#1e40af",
    btn: "linear-gradient(90deg,#1d4ed8,#38bdf8)",
    btnText: "#fff",
    timerBg: "#eff6ff",
    timerText: "#1d4ed8",
  },
  32: {
    bg: "linear-gradient(135deg,#0f0520,#1a0a35)",
    card: "rgba(15,5,32,0.9)",
    accent: "#f472b6",
    text: "#fbcfe8",
    btn: "linear-gradient(90deg,#be185d,#f472b6,#818cf8)",
    btnText: "#fff",
    timerBg: "#0a0018",
    timerText: "#f9a8d4",
  },
  33: {
    bg: "linear-gradient(135deg,#1c0000,#3b0000,#7c2d12)",
    card: "rgba(28,0,0,0.92)",
    accent: "#f87171",
    text: "#fef2f2",
    btn: "linear-gradient(90deg,#dc2626,#f97316)",
    btnText: "#fff",
    timerBg: "#150000",
    timerText: "#fca5a5",
  },
  34: {
    bg: "linear-gradient(135deg,#030712,#050d1f,#0f0024)",
    card: "rgba(3,7,18,0.92)",
    accent: "#818cf8",
    text: "#e0e7ff",
    btn: "linear-gradient(90deg,#4338ca,#818cf8,#38bdf8)",
    btnText: "#fff",
    timerBg: "#020510",
    timerText: "#a5b4fc",
  },
  35: {
    bg: "linear-gradient(135deg,#022c22,#064e3b)",
    card: "rgba(2,44,34,0.92)",
    accent: "#34d399",
    text: "#d1fae5",
    btn: "linear-gradient(90deg,#059669,#34d399)",
    btnText: "#000",
    timerBg: "#011c17",
    timerText: "#6ee7b7",
  },
  36: {
    bg: "linear-gradient(135deg,#451a03,#78350f,#92400e)",
    card: "rgba(69,26,3,0.92)",
    accent: "#fbbf24",
    text: "#fef3c7",
    btn: "linear-gradient(90deg,#b45309,#d97706)",
    btnText: "#fff",
    timerBg: "#3a1500",
    timerText: "#fcd34d",
  },
  37: {
    bg: "linear-gradient(135deg,#1e293b,#0f2044)",
    card: "rgba(30,41,59,0.9)",
    accent: "#93c5fd",
    text: "#dbeafe",
    btn: "linear-gradient(90deg,#1d4ed8,#60a5fa)",
    btnText: "#fff",
    timerBg: "#0f172a",
    timerText: "#93c5fd",
  },
  38: {
    bg: "linear-gradient(135deg,#030307,#0f0c29)",
    card: "rgba(5,5,20,0.97)",
    accent: "#67e8f9",
    text: "#cffafe",
    btn: "linear-gradient(90deg,#0891b2,#a855f7)",
    btnText: "#fff",
    timerBg: "#030312",
    timerText: "#a5f3fc",
  },
  39: {
    bg: "linear-gradient(135deg,#0a1930,#0f2b50,#1a3a6e)",
    card: "rgba(10,25,48,0.92)",
    accent: "#38bdf8",
    text: "#e0f2fe",
    btn: "linear-gradient(90deg,#0284c7,#38bdf8,#818cf8)",
    btnText: "#fff",
    timerBg: "#050f20",
    timerText: "#7dd3fc",
  },
  40: {
    bg: "linear-gradient(135deg,#1a0a24,#2d1040)",
    card: "rgba(26,10,36,0.95)",
    accent: "#c084fc",
    text: "#f5f3ff",
    btn: "linear-gradient(90deg,#7c3aed,#c084fc,#ec4899)",
    btnText: "#fff",
    timerBg: "#100820",
    timerText: "#d8b4fe",
  },
};

/** Returns a full standalone HTML document for the given page data */
export function generateHtmlContent(data: PageData): string {
  const theme = DESIGN_THEMES[data.designStyle] ?? DESIGN_THEMES[1];
  const subs = Number(data.channelSubscribers).toLocaleString();
  const desc2Html = data.channelDesc2
    ? `<p style="font-size:1.25rem;font-weight:700;color:${theme.text};margin:0;line-height:1.6;opacity:0.85;">${escHtml(data.channelDesc2)}</p>`
    : "";

  const metaPixelHtml = data.metalink
    ? `<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
  }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init','${escAttr(data.metalink)}');
  fbq('track','PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${escAttr(data.metalink)}&ev=PageView&noscript=1"/></noscript>`
    : "";

  const gtagHtml = data.gtagLink
    ? `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${escAttr(data.gtagLink)}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${escAttr(data.gtagLink)}');
</script>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(data.channelName)}</title>
  <meta name="description" content="${escAttr(data.channelDesc1.substring(0, 160))}" />
  <meta property="og:title" content="${escAttr(data.channelTitle)}" />
  <meta property="og:description" content="${escAttr(data.channelDesc1.substring(0, 160))}" />
  <meta property="og:image" content="${escAttr(data.imageUrl)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  ${metaPixelHtml}
  ${gtagHtml}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; font-family: 'Inter', sans-serif; }
    body {
      min-height: 100vh;
      background: ${theme.bg};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .card {
      background: ${theme.card};
      border-radius: 1.5rem;
      padding: 2rem 1.5rem;
      max-width: 560px;
      width: 100%;
      text-align: center;
      box-shadow: 0 25px 60px rgba(0,0,0,0.3);
      animation: fadeUp .4s ease both;
      ${data.designStyle === 7 ? "backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2);" : ""}
      ${data.designStyle === 9 ? "backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2);" : ""}
    }
    @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    .avatar-wrap { position:relative; display:inline-block; margin-bottom:1.25rem; }
    .avatar-glow {
      position:absolute; inset:-12px; border-radius:50%;
      background: ${theme.accent};
      filter: blur(20px); opacity:.45;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse { 0%,100%{ opacity:.3 } 50%{ opacity:.6 } }
    .avatar {
      width:144px; height:144px; border-radius:50%; object-fit:cover;
      position:relative; z-index:1;
      border: 4px solid ${theme.accent};
    }
    h2.channel-name {
      font-size:1.4rem; font-weight:800; background:${theme.btn};
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      background-clip:text; margin-bottom:.4rem;
    }
    h1.channel-title {
      font-size:1.6rem; font-weight:700; color:${theme.text};
      margin-bottom:.75rem; line-height:1.3;
    }
    .subs-badge {
      display:inline-flex; align-items:center; gap:.4rem;
      background:${theme.timerBg}; color:${theme.timerText};
      padding:.3rem .9rem; border-radius:999px; font-size:.85rem;
      font-weight:600; margin-bottom:1.25rem;
      border: 1px solid ${theme.accent}33;
    }
    .desc { color:${theme.text}; font-size:1.1rem; font-weight:600; line-height:1.6; margin-bottom:1rem; opacity:.9; }
    .timer-box {
      display:inline-flex; align-items:center; gap:.5rem;
      background:${theme.timerBg}; color:${theme.timerText};
      padding:.4rem 1rem; border-radius:999px; font-size:.88rem;
      font-weight:600; margin-bottom:.75rem;
      border: 1px solid ${theme.accent}44;
      animation: bounce .8s ease-in-out infinite alternate;
    }
    @keyframes bounce { from{ transform:translateY(0) } to{ transform:translateY(-4px) } }
    .timer-spinner {
      width:16px; height:16px; border:2px solid ${theme.timerText}44;
      border-top-color:${theme.timerText};
      border-radius:50%; animation:spin .8s linear infinite;
    }
    @keyframes spin { to{ transform:rotate(360deg) } }
    .cta-btn {
      display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
      padding:.9rem 2.2rem; border-radius:999px; border:none; cursor:pointer;
      font-size:1rem; font-weight:700; color:${theme.btnText};
      background:${theme.btn}; letter-spacing:.02em;
      box-shadow: 0 8px 24px rgba(0,0,0,.3);
      transition: transform .2s, box-shadow .2s, opacity .2s;
      text-decoration:none; margin-bottom:1rem;
    }
    .cta-btn:hover { transform:scale(1.04); box-shadow:0 12px 32px rgba(0,0,0,.4); }
    .cta-btn:active { transform:scale(.97); }
    .cta-btn:disabled { opacity:.5; cursor:not-allowed; }
    .disclaimer {
      font-size:.72rem; color:${theme.text}; opacity:.55;
      border-top:1px solid ${theme.accent}22; padding-top:.85rem; line-height:1.6;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="avatar-wrap">
      <div class="avatar-glow"></div>
      <img class="avatar" src="${escAttr(data.imageUrl)}" alt="${escAttr(data.channelName)}" />
    </div>

    <h2 class="channel-name">${escHtml(data.channelName)}</h2>
    <h1 class="channel-title">${escHtml(data.channelTitle)}</h1>

    <div class="subs-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      ${escHtml(subs)} subscribers
    </div>

    <p class="desc">${escHtml(data.channelDesc1)}</p>
    ${desc2Html}

    <div id="timerBox" class="timer-box">
      <div class="timer-spinner"></div>
      <span id="timerText">Click Fast to Grab Offer in <strong><span id="countdown">30</span>s</strong></span>
    </div>
    <br />

    <a id="ctaBtn" href="${escAttr(data.channelLink)}" target="_blank" rel="noopener noreferrer" class="cta-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      ${escHtml(data.ctaButtonText)}
    </a>

    <div class="disclaimer">
      <strong>Disclaimer:</strong> All content is for educational purposes only.
      ${escHtml(data.channelName)} is not responsible for any financial decisions.
      Trading involves risk — please do your own research.
    </div>
  </div>

  <script>
    /* ── Countdown Timer ── */
    var t = 30;
    var box = document.getElementById('timerBox');
    var cd  = document.getElementById('countdown');
    var timer = setInterval(function(){
      t--;
      if(cd) cd.textContent = t;
      if(t <= 0){
        clearInterval(timer);
        if(box) box.style.display = 'none';
      }
    }, 1000);

    /* ── AJAX Prefetch for Fast Navigation ── */
    (function(){
      var btn = document.getElementById('ctaBtn');
      if(!btn) return;
      var dest = btn.getAttribute('href');
      var prefetched = false;

      /* Silently prefetch the destination as soon as the page loads */
      function prefetch(){
        if(prefetched || !dest) return;
        prefetched = true;
        fetch(dest, { method: 'GET', mode: 'no-cors', credentials: 'omit' })
          .catch(function(){/* ignore cross-origin errors – connection is still warmed */});
      }

      /* Start prefetch after a short idle delay */
      if('requestIdleCallback' in window){
        requestIdleCallback(prefetch, { timeout: 2000 });
      } else {
        setTimeout(prefetch, 1500);
      }

      /* Also prefetch on hover for users who haven't loaded yet */
      btn.addEventListener('mouseenter', prefetch, { once: true });
      btn.addEventListener('touchstart', prefetch, { once: true, passive: true });

      /* On click: show spinner, re-fetch with AJAX, then navigate */
      btn.addEventListener('click', function(e){
        e.preventDefault();
        if(!dest) return;

        var origHTML = btn.innerHTML;
        btn.setAttribute('disabled', 'true');
        btn.style.opacity = '0.75';
        btn.innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin .7s linear infinite">' +
            '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>' +
          '</svg>' +
          '&nbsp;Opening…';

        /* Use fetch to warm the connection, then navigate */
        fetch(dest, { method: 'GET', mode: 'no-cors', credentials: 'omit' })
          .catch(function(){/* cross-origin – still navigate */})
          .finally(function(){
            window.open(dest, '_blank', 'noopener,noreferrer');
            /* Restore button */
            btn.removeAttribute('disabled');
            btn.style.opacity = '';
            btn.innerHTML = origHTML;
          });
      });
    })();
  </script>
</body>
</html>`;
}

/** Download the generated HTML as a file */
export function downloadHtml(data: PageData): void {
  const html = generateHtmlContent(data);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${data.slug || data.channelName.replace(/\s+/g, "-").toLowerCase() || "landing-page"}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// HTML escape helpers
function escHtml(s: string): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function escAttr(s: string): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
