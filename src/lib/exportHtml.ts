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
  21: "WhatsApp Chat Classic",
  22: "WhatsApp Chat Dark",
  23: "WhatsApp Channel Modern",
  24: "WhatsApp Glassmorphic",
  25: "WhatsApp Cyber Chat",
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
    bg: "#efeae2",
    card: "#efeae2",
    accent: "#008069",
    text: "#1e293b",
    btn: "#25d366",
    btnText: "#fff",
    timerBg: "#eff6ff",
    timerText: "#1d4ed8",
  },
  22: {
    bg: "#0b141a",
    card: "#0b141a",
    accent: "#00a884",
    text: "#e9edef",
    btn: "#00a884",
    btnText: "#fff",
    timerBg: "#0f1b29",
    timerText: "#60a5fa",
  },
  23: {
    bg: "#f0f2f5",
    card: "#ffffff",
    accent: "#25d366",
    text: "#1e293b",
    btn: "#008069",
    btnText: "#fff",
    timerBg: "#fff1f2",
    timerText: "#e11d48",
  },
  24: {
    bg: "linear-gradient(135deg, #030d0a, #0f172a)",
    card: "rgba(255,255,255,0.03)",
    accent: "#34d399",
    text: "#f1f5f9",
    btn: "linear-gradient(90deg, #10b981, #14b8a6)",
    btnText: "#fff",
    timerBg: "rgba(16,185,129,0.1)",
    timerText: "#34d399",
  },
  25: {
    bg: "#05080a",
    card: "#050b09",
    accent: "#00ff66",
    text: "#00ff66",
    btn: "#00ff66",
    btnText: "#05080a",
    timerBg: "rgba(239,68,68,0.1)",
    timerText: "#ef4444",
  },
};

/** Returns a full standalone HTML document for the given page data */
export function generateHtmlContent(data: PageData): string {
  if (data.designStyle >= 21 && data.designStyle <= 25) {
    return generateWhatsAppHtmlContent(data);
  }
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

/** Generates custom WhatsApp designs 21-25 */
function generateWhatsAppHtmlContent(data: PageData): string {
  const theme = DESIGN_THEMES[data.designStyle] ?? DESIGN_THEMES[21];
  const subs = Number(data.channelSubscribers).toLocaleString();

  const metaPixelHtml = data.metalink
    ? `<!-- Meta Pixel Code -->
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

  let customCss = "";
  let bodyContent = "";

  if (data.designStyle === 21) {
    customCss = `
      body {
        background: linear-gradient(135deg, #022c22, #064e3b, #0f172a);
        color: #ffffff;
        overflow-x: hidden;
      }
      .blob1 {
        position: absolute; top: -10%; right: -10%; width: 24rem; height: 24rem;
        background: rgba(16, 185, 129, 0.2); border-radius: 50%; filter: blur(100px);
        pointer-events: none; animation: pulse 6s ease-in-out infinite;
      }
      .blob2 {
        position: absolute; bottom: -10%; left: -10%; width: 30rem; height: 30rem;
        background: rgba(20, 184, 166, 0.1); border-radius: 50%; filter: blur(120px);
        pointer-events: none; animation: pulse 8s ease-in-out infinite 1s;
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 0.9; transform: scale(1.05); }
      }
      .main-container {
        position: relative; z-index: 10; width: 100%; max-width: 42rem;
        background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1.5rem; padding: 2rem; text-align: center;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      }
      @media (min-width: 640px) {
        .main-container { padding: 2.5rem; }
      }
      .badge-official {
        display: inline-flex; align-items: center; gap: 0.5rem;
        background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3);
        color: #34d399; padding: 0.375rem 1rem;
        border-radius: 9999px; font-size: 0.75rem; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.05em; margin: 0 auto 1.5rem;
      }
      .avatar-glow-wrap {
        position: relative; display: inline-block; margin: 0 auto 1.5rem;
      }
      .avatar-glow-bg {
        position: absolute; inset: 0; background: linear-gradient(to right, #10b981, #14b8a6);
        border-radius: 50%; filter: blur(16px); opacity: 0.6;
        animation: glowPulse 2s infinite alternate;
      }
      @keyframes glowPulse {
        from { opacity: 0.4; transform: scale(0.95); }
        to { opacity: 0.8; transform: scale(1.05); }
      }
      .avatar-img {
        position: relative; z-index: 10; width: 7rem; height: 7rem;
        border-radius: 50%; object-fit: cover; border: 4px solid rgba(255, 255, 255, 0.1);
      }
      @media (min-width: 640px) {
        .avatar-img { width: 8rem; height: 8rem; }
      }
      .channel-name-title {
        font-size: 1.5rem; font-weight: 800; tracking-tight: -0.025em;
        background: linear-gradient(to right, #34d399, #5eead4, #34d399);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text; margin-bottom: 0.75rem;
      }
      @media (min-width: 640px) {
        .channel-name-title { font-size: 2.25rem; }
      }
      .channel-subtitle {
        font-size: 1.125rem; font-weight: 500; color: #e2e8f0;
        max-width: 32rem; margin: 0 auto 1.5rem; line-height: 1.5;
      }
      .badge-subs {
        display: inline-flex; align-items: center; gap: 0.5rem;
        background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.5rem 1rem; border-radius: 9999px; color: #cbd5e1;
        font-size: 0.875rem; font-weight: 600; box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.06);
        margin-bottom: 1.5rem;
      }
      .description-box {
        background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 1rem; padding: 1.25rem; text-align: left;
        max-width: 36rem; margin: 0 auto 1.5rem;
      }
      @media (min-width: 640px) {
        .description-box { padding: 1.5rem; }
      }
      .desc-text-1 {
        color: #cbd5e1; font-size: 0.875rem; line-height: 1.625;
        white-space: pre-wrap; font-weight: 500;
      }
      @media (min-width: 640px) {
        .desc-text-1 { font-size: 1rem; }
      }
      .desc-text-2 {
        color: #94a3b8; font-size: 0.75rem; line-height: 1.625;
        border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 0.75rem;
        margin-top: 0.75rem;
      }
      @media (min-width: 640px) {
        .desc-text-2 { font-size: 0.875rem; }
      }
      .timer-pill {
        display: inline-flex; align-items: center; gap: 0.5rem;
        background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2);
        color: #f87171; padding: 0.5rem 1rem; border-radius: 0.75rem;
        font-size: 0.75rem; font-weight: 700; margin-bottom: 1.25rem;
        animation: bounce 1s infinite alternate;
      }
      @keyframes bounce {
        from { transform: translateY(0); }
        to { transform: translateY(-4px); }
      }
      .cta-btn-modern {
        display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
        width: 100%; max-width: 28rem; height: 3.5rem;
        background: linear-gradient(to right, #10b981, #14b8a6);
        color: #ffffff; font-weight: 700; border-radius: 9999px;
        font-size: 1rem; border: none; cursor: pointer; text-decoration: none;
        box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -4px rgba(16, 185, 129, 0.3);
        transition: all 0.3s ease;
      }
      @media (min-width: 640px) {
        .cta-btn-modern { font-size: 1.125rem; }
      }
      .cta-btn-modern:hover {
        background: linear-gradient(to right, #34d399, #2dd4bf);
        transform: translateY(-2px);
        box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.4), 0 8px 10px -6px rgba(16, 185, 129, 0.4);
      }
      .cta-btn-modern:active { transform: translateY(0); }
      .small-redirect-note {
        font-size: 0.75rem; color: #64748b; margin-top: 0.75rem;
      }
      .disclaimer-section {
        border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 1rem;
        margin-top: 1.5rem; text-align: center;
      }
      .disclaimer-text {
        font-size: 0.75rem; color: #64748b; line-height: 1.5; max-width: 32rem; margin: 0 auto;
      }
    `;

    bodyContent = `
      <div class="blob1"></div>
      <div class="blob2"></div>
      <div class="main-container">
        <div class="badge-official">
          <svg class="h-4 w-4" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 11 2 2 4-4"/>
          </svg>
          <span>Official WhatsApp Community</span>
        </div>

        <div class="avatar-glow-wrap">
          <div class="avatar-glow-bg"></div>
          <img src="${escAttr(data.imageUrl)}" alt="${escAttr(data.channelName)}" class="avatar-img" />
        </div>

        <div>
          <h1 class="channel-name-title">${escHtml(data.channelName)}</h1>
          <h2 class="channel-subtitle">${escHtml(data.channelTitle)}</h2>
          
          <div class="badge-subs">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>${escHtml(subs)} active subscribers</span>
          </div>
        </div>

        <div class="description-box">
          <p class="desc-text-1">${escHtml(data.channelDesc1)}</p>
          ${data.channelDesc2 ? `<p class="desc-text-2">${escHtml(data.channelDesc2)}</p>` : ""}
        </div>

        <div style="display: flex; flex-direction: column; align-items: center;">
          <div id="timerBox" class="timer-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 2s linear infinite;">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>Offer Link Expires In: <span id="countdown">30</span>s</span>
          </div>

          <a id="ctaBtn" href="${escAttr(data.channelLink)}" target="_blank" rel="noopener noreferrer" class="cta-btn-modern">
            <span>${escHtml(data.ctaButtonText || "Join WhatsApp Group")}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>

          <p class="small-redirect-note">* By clicking join, you will be redirected to the secure WhatsApp channel interface.</p>
        </div>

        <div class="disclaimer-section">
          <p class="disclaimer-text">
            <strong>Disclaimer:</strong> All contents provided on this page and inside the channel are for educational use. ${escHtml(data.channelName)} is not responsible for individual financial choices.
          </p>
        </div>
      </div>
      
      <style>
        @keyframes spin { 100% { transform: rotate(360deg); } }
      </style>
    `;
  } else if (data.designStyle === 22) {
    customCss = `
      body {
        background-color: #0b0f19;
        color: #e9edef;
        overflow-x: hidden;
      }
      .glow-left {
        position: absolute; top: 0; left: 0; width: 20rem; height: 20rem;
        background: rgba(0, 168, 132, 0.05); border-radius: 50%; filter: blur(100px);
        pointer-events: none;
      }
      .glow-right {
        position: absolute; bottom: 0; right: 0; width: 30rem; height: 30rem;
        background: rgba(99, 102, 241, 0.05); border-radius: 50%; filter: blur(120px);
        pointer-events: none;
      }
      .main-container {
        position: relative; z-index: 10; width: 100%; max-width: 56rem;
        background: #111827; border: 1px solid #1e293b; border-radius: 1.5rem;
        padding: 1.5rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        display: flex; flex-direction: column; align-items: center; gap: 2rem;
      }
      @media (min-width: 768px) {
        .main-container {
          flex-direction: row; padding: 2.5rem; gap: 3rem; text-align: left;
        }
      }
      .col-left {
        width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center;
      }
      @media (min-width: 768px) {
        .col-left { width: 40%; }
      }
      .col-right {
        width: 100%; display: flex; flex-direction: column; gap: 1.25rem;
      }
      @media (min-width: 768px) {
        .col-right { width: 60%; }
      }
      .avatar-container {
        position: relative; margin-bottom: 1rem;
      }
      .avatar-glow {
        position: absolute; inset: 0; background: rgba(0, 168, 132, 0.3);
        border-radius: 1.5rem; filter: blur(24px); opacity: 0.4;
        transition: opacity 0.3s;
      }
      .avatar-img-style {
        position: relative; z-index: 10; width: 11rem; height: 11rem;
        border-radius: 1.5rem; object-fit: cover; border: 4px solid rgba(0, 168, 132, 0.2);
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);
      }
      @media (min-width: 640px) {
        .avatar-img-style { width: 13rem; height: 13rem; }
      }
      .badge-verified-mint {
        display: inline-flex; align-items: center; gap: 0.375rem;
        background: rgba(0, 168, 132, 0.1); color: #00f7b1;
        border: 1px solid rgba(0, 168, 132, 0.2); padding: 0.25rem 0.75rem;
        border-radius: 9999px; font-size: 0.75rem; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;
      }
      .left-update-note {
        font-size: 0.75rem; color: #64748b; font-weight: 600; letter-spacing: 0.025em;
      }
      .right-title-group {
        display: flex; flex-direction: column; gap: 0.5rem;
      }
      .channel-title-22 {
        font-size: 1.875rem; font-weight: 800; color: #ffffff;
        line-height: 1.2; margin: 0;
      }
      @media (min-width: 640px) {
        .channel-title-22 { font-size: 2.25rem; }
      }
      .members-badge-row {
        color: #00f7b1; font-weight: 600; font-size: 0.875rem;
        display: flex; align-items: center; gap: 0.5rem;
      }
      @media (min-width: 640px) {
        .members-badge-row { font-size: 1rem; }
      }
      .channel-subtitle-22 {
        font-size: 1.125rem; font-weight: 700; color: #e2e8f0; line-height: 1.4; margin: 0;
      }
      .desc-quote-border {
        border-left: 2px solid rgba(0, 168, 132, 0.4); padding-left: 1rem;
        display: flex; flex-direction: column; gap: 0.75rem; color: #94a3b8;
      }
      .desc-body-1 {
        font-size: 0.875rem; line-height: 1.625; white-space: pre-wrap; margin: 0;
      }
      @media (min-width: 640px) {
        .desc-body-1 { font-size: 1rem; }
      }
      .desc-body-2 {
        font-size: 0.75rem; font-weight: 500; margin: 0;
      }
      @media (min-width: 640px) {
        .desc-body-2 { font-size: 0.875rem; }
      }
      .actions-container-22 {
        display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;
        width: 100%; margin-top: 0.5rem;
      }
      @media (max-width: 767px) {
        .actions-container-22 { align-items: center; }
      }
      .timer-pill-yellow {
        display: inline-flex; align-items: center; gap: 0.5rem;
        background: rgba(234, 179, 8, 0.1); border: 1px solid rgba(234, 179, 8, 0.2);
        color: #facc15; padding: 0.5rem 1rem; border-radius: 0.75rem;
        font-size: 0.75rem; font-weight: 700;
      }
      .cta-btn-mint {
        display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
        width: 100%; height: 3.5rem; background: #00a884; color: #ffffff;
        font-weight: 800; border-radius: 1rem; font-size: 1rem; border: none;
        cursor: pointer; text-decoration: none; transition: all 0.3s ease;
        box-shadow: 0 10px 15px -3px rgba(0, 168, 132, 0.25);
      }
      @media (min-width: 640px) {
        .cta-btn-mint { font-size: 1.125rem; }
      }
      .cta-btn-mint:hover {
        background: #009071; transform: translateY(-2px);
        box-shadow: 0 20px 25px -5px rgba(0, 168, 132, 0.35);
      }
      .cta-btn-mint:active { transform: translateY(0); }
      .disclaimer-section-22 {
        border-top: 1px solid #1f2937; padding-top: 1rem; width: 100%;
      }
      .disclaimer-text-22 {
        font-size: 0.75rem; color: #64748b; line-height: 1.5; margin: 0;
      }
    `;

    bodyContent = `
      <div class="glow-left"></div>
      <div class="glow-right"></div>
      <div class="main-container">
        <div class="col-left">
          <div class="avatar-container">
            <div class="avatar-glow"></div>
            <img src="${escAttr(data.imageUrl)}" alt="${escAttr(data.channelName)}" class="avatar-img-style" />
          </div>

          <div class="badge-verified-mint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span>Verified Creator</span>
          </div>

          <p class="left-update-note">Updated today • Active channel</p>
        </div>

        <div class="col-right">
          <div class="right-title-group">
            <h1 class="channel-title-22">${escHtml(data.channelName)}</h1>
            <div class="members-badge-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>${escHtml(subs)} Community Members</span>
            </div>
          </div>

          <h2 class="channel-subtitle-22">${escHtml(data.channelTitle)}</h2>

          <div class="desc-quote-border">
            <p class="desc-body-1">${escHtml(data.channelDesc1)}</p>
            ${data.channelDesc2 ? `<p class="desc-body-2">${escHtml(data.channelDesc2)}</p>` : ""}
          </div>

          <div class="actions-container-22">
            <div id="timerBox" class="timer-pill-yellow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: pulse-glow 2s infinite;">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>Limited Link Access: Active for <span id="countdown">30</span>s</span>
            </div>

            <a id="ctaBtn" href="${escAttr(data.channelLink)}" target="_blank" rel="noopener noreferrer" class="cta-btn-mint">
              <span>${escHtml(data.ctaButtonText || "Access WhatsApp Channel")}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          <div class="disclaimer-section-22">
            <p class="disclaimer-text-22">
              <strong>Disclaimer:</strong> ${escHtml(data.channelName)} is an educational group. Trading and business operations carry risks—please research beforehand.
            </p>
          </div>
        </div>
      </div>
      
      <style>
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      </style>
    `;
  } else if (data.designStyle === 23) {
    customCss = `
      body {
        background-color: #f8fafc;
        color: #334155;
        overflow-x: hidden;
      }
      .light-glow-1 {
        position: absolute; top: -10%; right: -10%; width: 25rem; height: 25rem;
        background: rgba(37, 211, 102, 0.05); border-radius: 50%; filter: blur(80px);
        pointer-events: none;
      }
      .light-glow-2 {
        position: absolute; bottom: -10%; left: -10%; width: 25rem; height: 25rem;
        background: rgba(20, 184, 166, 0.05); border-radius: 50%; filter: blur(80px);
        pointer-events: none;
      }
      .main-container {
        position: relative; z-index: 10; width: 100%; max-width: 42rem;
        background: #ffffff; border: 1px solid #f1f5f9; border-radius: 1.5rem;
        padding: 2rem; text-align: center; display: flex; flex-direction: column;
        gap: 1.5rem; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.03);
      }
      @media (min-width: 640px) {
        .main-container { padding: 2.5rem; gap: 2rem; }
      }
      .verified-community-tag {
        display: inline-flex; align-items: center; gap: 0.25rem;
        background: #f0fdf4; color: #15803d; border: 1px solid #dcfce7;
        padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem;
        font-weight: 700; margin: 0 auto;
      }
      .avatar-wrapper-check {
        position: relative; display: inline-block; margin: 0 auto;
      }
      .avatar-style-23 {
        width: 7rem; height: 7rem; border-radius: 50%; object-fit: cover;
        border: 4px solid #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      }
      @media (min-width: 640px) {
        .avatar-style-23 { width: 8rem; height: 8rem; }
      }
      .check-badge-overlay {
        position: absolute; bottom: 0; right: 0; background: #25d366;
        padding: 0.375rem; border-radius: 50%; border: 2px solid #ffffff;
        color: #ffffff; display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      }
      .header-info-23 {
        display: flex; flex-direction: column; gap: 0.5rem;
      }
      .channel-name-23 {
        font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 0;
      }
      @media (min-width: 640px) {
        .channel-name-23 { font-size: 1.875rem; }
      }
      .channel-subtitle-23 {
        font-size: 0.875rem; font-weight: 600; color: #64748b;
        max-width: 32rem; margin: 0 auto; line-height: 1.6;
      }
      @media (min-width: 640px) {
        .channel-subtitle-23 { font-size: 1rem; }
      }
      .stats-grid-container {
        display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; width: 100%;
      }
      @media (min-width: 640px) {
        .stats-grid-container { grid-template-columns: repeat(3, 1fr); }
      }
      .stat-card-style {
        background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 1rem;
        padding: 1rem; display: flex; flex-direction: column; align-items: center;
        justify-content: center;
      }
      .stat-icon {
        color: #059669; margin-bottom: 0.25rem;
      }
      .stat-val {
        font-size: 0.875rem; font-weight: 700; color: #1e293b;
      }
      @media (min-width: 640px) {
        .stat-val { font-size: 1rem; }
      }
      .stat-lbl {
        font-size: 0.625rem; color: #94a3b8; font-weight: 700;
        text-transform: uppercase; tracking-wider: 0.05em; margin-top: 0.125rem;
      }
      .col-span-mobile-full {
        grid-column: span 2 / span 2;
      }
      @media (min-width: 640px) {
        .col-span-mobile-full { grid-column: span 1 / span 1; }
      }
      .desc-text-wrapper-23 {
        display: flex; flex-direction: column; gap: 0.75rem;
        max-width: 36rem; margin: 0 auto; text-align: center;
      }
      .desc-1-style-23 {
        font-size: 0.875rem; color: #475569; line-height: 1.625; white-space: pre-wrap; margin: 0;
      }
      @media (min-width: 640px) {
        .desc-1-style-23 { font-size: 1rem; }
      }
      .desc-2-style-23 {
        font-size: 0.75rem; color: #64748b; font-style: italic;
        line-height: 1.6; border-top: 1px solid #f1f5f9; padding-top: 0.75rem; margin: 0;
      }
      @media (min-width: 640px) {
        .desc-2-style-23 { font-size: 0.875rem; }
      }
      .cta-wrapper-23 {
        display: flex; flex-direction: column; align-items: center; gap: 1rem;
        width: 100%; max-width: 28rem; margin: 0 auto;
      }
      .timer-pill-light {
        display: inline-flex; align-items: center; gap: 0.375rem;
        background: #fff1f2; border: 1px solid #fecdd3; color: #e11d48;
        padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem;
        font-weight: 700; animation: flash-timer 1.5s infinite;
      }
      @keyframes flash-timer {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 1; }
      }
      .cta-btn-light-green {
        display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
        width: 100%; height: 3.5rem; background: #25d366; color: #ffffff;
        font-weight: 800; border-radius: 9999px; font-size: 1rem; border: none;
        cursor: pointer; text-decoration: none; transition: all 0.3s ease;
        box-shadow: 0 10px 15px -3px rgba(37, 211, 102, 0.3);
      }
      @media (min-width: 640px) {
        .cta-btn-light-green { font-size: 1.125rem; }
      }
      .cta-btn-light-green:hover {
        background: #20ba59; transform: scale(1.02);
        box-shadow: 0 20px 25px -5px rgba(37, 211, 102, 0.4);
      }
      .cta-btn-light-green:active { transform: scale(0.98); }
      .under-btn-text-23 {
        font-size: 0.75rem; color: #94a3b8; font-weight: 500; margin: 0;
      }
      .disclaimer-section-23 {
        border-top: 1px solid #f1f5f9; padding-top: 1.25rem; width: 100%;
      }
      .disclaimer-text-23 {
        font-size: 0.75rem; color: #94a3b8; line-height: 1.5; max-width: 32rem; margin: 0 auto;
      }
    `;

    bodyContent = `
      <div class="light-glow-1"></div>
      <div class="light-glow-2"></div>
      <div class="main-container">
        <div class="verified-community-tag">
          <svg class="h-4.5 w-4.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 11 2 2 4-4"/>
          </svg>
          <span>WhatsApp Verified Community</span>
        </div>

        <div class="avatar-wrapper-check">
          <img src="${escAttr(data.imageUrl)}" alt="${escAttr(data.channelName)}" class="avatar-style-23" />
          <div class="check-badge-overlay">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>

        <div class="header-info-23">
          <h1 class="channel-name-23">${escHtml(data.channelName)}</h1>
          <p class="channel-subtitle-23">${escHtml(data.channelTitle)}</p>
        </div>

        <div class="stats-grid-container">
          <div class="stat-card-style">
            <svg class="stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span class="stat-val">${escHtml(subs)}</span>
            <span class="stat-lbl">Active Members</span>
          </div>

          <div class="stat-card-style">
            <svg class="stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 11 2 2 4-4"/>
            </svg>
            <span class="stat-val">100%</span>
            <span class="stat-lbl">Secure Link</span>
          </div>

          <div class="stat-card-style col-span-mobile-full">
            <svg class="stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            <span class="stat-val">Daily</span>
            <span class="stat-lbl">Free Updates</span>
          </div>
        </div>

        <div class="desc-text-wrapper-23">
          <p class="desc-1-style-23">${escHtml(data.channelDesc1)}</p>
          ${data.channelDesc2 ? `<p class="desc-2-style-23">${escHtml(data.channelDesc2)}</p>` : ""}
        </div>

        <div class="cta-wrapper-23">
          <div id="timerBox" class="timer-pill-light">
            <span>Link will be refreshed in <strong id="countdown">30</strong>s</span>
          </div>

          <a id="ctaBtn" href="${escAttr(data.channelLink)}" target="_blank" rel="noopener noreferrer" class="cta-btn-light-green">
            <span>${escHtml(data.ctaButtonText || "Join WhatsApp Group")}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>

          <p class="under-btn-text-23">No signup required. Redirects directly to WhatsApp application.</p>
        </div>

        <div class="disclaimer-section-23">
          <p class="disclaimer-text-23">
            <strong>Disclaimer:</strong> Content shared is for informational purposes only. ${escHtml(data.channelName)} does not warrant financial returns or take accountability for trading risk.
          </p>
        </div>
      </div>
    `;
  } else if (data.designStyle === 24) {
    customCss = `
      body {
        background-color: #020b08;
        color: #f1f5f9;
        overflow-x: hidden;
      }
      .blur-blob-1 {
        position: absolute; top: 10%; left: 25%; width: 22rem; height: 22rem;
        background: rgba(16, 185, 129, 0.1); border-radius: 50%; filter: blur(100px);
        pointer-events: none; animation: float-glow 8s infinite alternate;
      }
      .blur-blob-2 {
        position: absolute; bottom: 10%; right: 25%; width: 25rem; height: 25rem;
        background: rgba(37, 211, 102, 0.05); border-radius: 50%; filter: blur(120px);
        pointer-events: none; animation: float-glow 10s infinite alternate-reverse;
      }
      @keyframes float-glow {
        from { transform: translate(0, 0) scale(1); }
        to { transform: translate(15px, -15px) scale(1.08); }
      }
      .main-container {
        position: relative; z-index: 10; width: 100%; max-width: 42rem;
        background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        border-radius: 1.5rem; padding: 2rem; text-align: center;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); display: flex;
        flex-direction: column; gap: 1.5rem;
      }
      @media (min-width: 640px) {
        .main-container { padding: 2.5rem; gap: 2rem; }
      }
      .premium-access-badge {
        display: inline-flex; align-items: center; gap: 0.375rem;
        background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
        color: #34d399; padding: 0.375rem 0.875rem; border-radius: 9999px;
        font-size: 0.75rem; font-weight: 700; margin: 0 auto;
        box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.06);
      }
      .avatar-wrapper-glass {
        position: relative; display: inline-block; margin: 0 auto;
      }
      .avatar-glow-glass {
        position: absolute; inset: -8px;
        background: linear-gradient(135deg, rgba(37, 211, 102, 0.4), rgba(20, 184, 166, 0.4));
        border-radius: 50%; filter: blur(8px); opacity: 0.5;
        animation: pulse-ring 2s infinite alternate;
      }
      @keyframes pulse-ring {
        from { transform: scale(0.97); opacity: 0.4; }
        to { transform: scale(1.03); opacity: 0.6; }
      }
      .avatar-img-glass {
        position: relative; z-index: 10; width: 7rem; height: 7rem;
        border-radius: 50%; object-fit: cover; border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
      }
      @media (min-width: 640px) {
        .avatar-img-glass { width: 8rem; height: 8rem; }
      }
      .header-info-24 {
        display: flex; flex-direction: column; gap: 0.5rem;
      }
      .channel-name-24 {
        font-size: 1.875rem; font-weight: 800; margin: 0;
        background: linear-gradient(to right, #34d399, #5eead4, #34d399);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      @media (min-width: 640px) {
        .channel-name-24 { font-size: 2.25rem; }
      }
      .channel-subtitle-24 {
        font-size: 1rem; font-weight: 500; color: #cbd5e1; max-width: 28rem;
        margin: 0 auto; line-height: 1.5;
      }
      .members-badge-glass {
        display: inline-flex; align-items: center; gap: 0.375rem;
        background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 0.5rem 1rem; border-radius: 9999px; color: #cbd5e1;
        font-size: 0.75rem; font-weight: 600; margin: 0 auto;
        box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.06);
      }
      @media (min-width: 640px) {
        .members-badge-glass { font-size: 0.875rem; }
      }
      .desc-box-glass {
        background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        border-radius: 1rem; padding: 1.25rem; text-align: left;
        max-width: 36rem; margin: 0 auto; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      }
      @media (min-width: 640px) {
        .desc-box-glass { padding: 1.5rem; }
      }
      .desc-1-style-24 {
        font-size: 0.875rem; color: #cbd5e1; line-height: 1.625; white-space: pre-wrap;
        font-weight: 500; margin: 0;
      }
      @media (min-width: 640px) {
        .desc-1-style-24 { font-size: 1rem; }
      }
      .desc-2-style-24 {
        font-size: 0.75rem; color: #94a3b8; line-height: 1.6;
        border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 0.75rem;
        margin-top: 0.75rem; margin-bottom: 0;
      }
      @media (min-width: 640px) {
        .desc-2-style-24 { font-size: 0.875rem; }
      }
      .cta-wrapper-24 {
        display: flex; flex-direction: column; align-items: center; gap: 1rem;
        width: 100%; max-width: 28rem; margin: 0 auto;
      }
      .timer-pill-glass {
        display: inline-flex; align-items: center; gap: 0.375rem;
        background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(16, 185, 129, 0.2);
        color: #34d399; padding: 0.5rem 1rem; border-radius: 0.75rem;
        font-size: 0.75rem; font-weight: 700; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      }
      .cta-btn-glass {
        display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
        width: 100%; height: 3.5rem; background: linear-gradient(90deg, #10b981, #14b8a6);
        color: #ffffff; font-weight: 700; border-radius: 9999px;
        font-size: 1rem; border: none; cursor: pointer; text-decoration: none;
        transition: all 0.3s ease; box-shadow: 0 8px 30px rgba(16, 185, 129, 0.3);
      }
      @media (min-width: 640px) {
        .cta-btn-glass { font-size: 1.125rem; }
      }
      .cta-btn-glass:hover {
        background: linear-gradient(90deg, #34d399, #2dd4bf);
        transform: scale(1.02); box-shadow: 0 8px 30px rgba(16, 185, 129, 0.5);
      }
      .cta-btn-glass:active { transform: scale(0.98); }
      .under-btn-text-24 {
        font-size: 0.75rem; color: #64748b; margin: 0;
      }
      .disclaimer-section-24 {
        border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 1.25rem; width: 100%;
      }
      .disclaimer-text-24 {
        font-size: 0.75rem; color: #64748b; line-height: 1.5; max-width: 32rem; margin: 0 auto;
      }
    `;

    bodyContent = `
      <div class="blur-blob-1"></div>
      <div class="blur-blob-2"></div>
      <div class="main-container">
        <div class="premium-access-badge">
          <svg class="h-4 w-4 animate-pulse" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#34d399;">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5 5 3Z"/>
            <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z"/>
          </svg>
          <span>Premium Access Active</span>
        </div>

        <div class="avatar-wrapper-glass">
          <div class="avatar-glow-glass"></div>
          <img src="${escAttr(data.imageUrl)}" alt="${escAttr(data.channelName)}" class="avatar-img-glass" />
        </div>

        <div class="header-info-24">
          <h1 class="channel-name-24">${escHtml(data.channelName)}</h1>
          <p class="channel-subtitle-24">${escHtml(data.channelTitle)}</p>
        </div>

        <div class="members-badge-glass">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #34d399;">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>${escHtml(subs)} followers in community</span>
        </div>

        <div class="desc-box-glass">
          <p class="desc-1-style-24">${escHtml(data.channelDesc1)}</p>
          ${data.channelDesc2 ? `<p class="desc-2-style-24">${escHtml(data.channelDesc2)}</p>` : ""}
        </div>

        <div class="cta-wrapper-24">
          <div id="timerBox" class="timer-pill-glass">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#34d399; animation: pulse 2s infinite;">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>Link secured. Expires in: <span id="countdown">30</span>s</span>
          </div>

          <a id="ctaBtn" href="${escAttr(data.channelLink)}" target="_blank" rel="noopener noreferrer" class="cta-btn-glass">
            <span>${escHtml(data.ctaButtonText || "Join WhatsApp Group")}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>

          <p class="under-btn-text-24">Secure redirect powered by WhatsApp Business.</p>
        </div>

        <div class="disclaimer-section-24">
          <p class="disclaimer-text-24">
            <strong>Disclaimer:</strong> ${escHtml(data.channelName)} shares updates for educational purposes. Trading financial assets contains risk—verify references and do your own diligence.
          </p>
        </div>
      </div>
    `;
  } else if (data.designStyle === 25) {
    customCss = `
      body {
        background-color: #030608;
        color: #00ff66;
        font-family: 'Courier New', Courier, monospace;
        overflow-x: hidden;
      }
      .cyber-grid-overlay {
        position: absolute; inset: 0; opacity: 0.05; pointer-events: none;
        background-size: 30px 30px;
        background-image: linear-gradient(to right, #00ff66 1px, transparent 1px), linear-gradient(to bottom, #00ff66 1px, transparent 1px);
      }
      .cyber-glow-bg-1 {
        position: absolute; top: 10%; left: 10%; width: 22rem; height: 22rem;
        background: rgba(0, 255, 102, 0.03); border-radius: 50%; filter: blur(120px);
        pointer-events: none;
      }
      .cyber-glow-bg-2 {
        position: absolute; bottom: 10%; right: 10%; width: 22rem; height: 22rem;
        background: rgba(0, 225, 255, 0.03); border-radius: 50%; filter: blur(120px);
        pointer-events: none;
      }
      .main-container {
        position: relative; z-index: 10; width: 100%; max-width: 42rem;
        background: #060b0d; border: 1px solid rgba(0, 255, 102, 0.2);
        border-radius: 1rem; padding: 1.5rem; text-align: center;
        box-shadow: 0 0 50px rgba(0, 255, 102, 0.1); display: flex;
        flex-direction: column; gap: 1.25rem;
      }
      @media (min-width: 640px) {
        .main-container { padding: 2.5rem; gap: 1.5rem; }
      }
      .terminal-header-row {
        display: flex; align-items: center; justify-content: space-between;
        border-bottom: 1px solid rgba(0, 255, 102, 0.2); padding-bottom: 1rem;
        margin-bottom: 0.5rem;
      }
      .term-title-left {
        display: flex; align-items: center; gap: 0.5rem;
      }
      .term-icon-cpu {
        color: #00e1ff; animation: glow-flash 2s infinite alternate;
      }
      @keyframes glow-flash {
        from { opacity: 0.5; }
        to { opacity: 1; }
      }
      .term-title-text {
        font-size: 0.75rem; color: #ffffff; font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .term-status-right {
        display: flex; align-items: center; gap: 0.375rem;
      }
      .green-dot-pulse {
        width: 0.625rem; height: 0.625rem; border-radius: 50%;
        background-color: #00ff66; animation: blink-dot 1s infinite;
      }
      @keyframes blink-dot {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
      .avatar-wrapper-cyber {
        position: relative; display: inline-block; margin: 0 auto;
      }
      .avatar-glow-cyber {
        position: absolute; inset: -4px; background: rgba(0, 255, 102, 0.3);
        border-radius: 50%; filter: blur(6px); opacity: 0.5;
      }
      .avatar-img-cyber {
        position: relative; z-index: 10; width: 7rem; height: 7rem;
        border-radius: 50%; object-fit: cover; border: 2px solid rgba(0, 255, 102, 0.3);
      }
      @media (min-width: 640px) {
        .avatar-img-cyber { width: 8rem; height: 8rem; }
      }
      .cyber-h1 {
        font-size: 1.5rem; font-weight: 700; color: #ffffff; margin: 0;
        text-transform: uppercase; letter-spacing: 0.025em;
      }
      @media (min-width: 640px) {
        .cyber-h1 { font-size: 1.875rem; }
      }
      .cyber-sub-status {
        color: #00e1ff; font-size: 0.75rem; font-weight: 600;
        letter-spacing: 0.1em; text-transform: uppercase; margin: 0;
      }
      @media (min-width: 640px) {
        .cyber-sub-status { font-size: 0.875rem; }
      }
      .cyber-host-title-bar {
        border: 1px solid rgba(0, 255, 102, 0.2); border-radius: 0.5rem;
        padding: 0.625rem; background: rgba(0,0,0,0.4); font-size: 0.75rem;
        color: rgba(0, 255, 102, 0.9); max-width: 32rem; margin: 0 auto;
        text-align: center;
      }
      .cyber-log-box {
        background: rgba(0,0,0,0.5); border: 1px solid rgba(0, 255, 102, 0.1);
        border-radius: 0.75rem; padding: 1.25rem; text-align: left;
        max-width: 36rem; margin: 0 auto;
      }
      .log-title-row {
        display: flex; align-items: center; gap: 0.375rem; font-size: 0.75rem;
        color: #64748b; font-weight: 700; border-bottom: 1px solid rgba(0, 255, 102, 0.1);
        padding-bottom: 0.5rem; margin-bottom: 0.75rem;
      }
      .log-desc1 {
        color: #cbd5e1; font-size: 0.75rem; line-height: 1.625; white-space: pre-wrap; margin: 0;
      }
      @media (min-width: 640px) {
        .log-desc1 { font-size: 0.875rem; }
      }
      .log-desc2 {
        color: #00e1ff; font-size: 0.75rem; line-height: 1.6;
        border-top: 1px solid rgba(0, 255, 102, 0.1); padding-top: 0.75rem;
        margin-top: 0.75rem; margin-bottom: 0;
      }
      @media (min-width: 640px) {
        .log-desc2 { font-size: 0.875rem; }
      }
      .cta-wrapper-cyber {
        display: flex; flex-direction: column; align-items: center; gap: 1rem;
        width: 100%; max-width: 28rem; margin: 0 auto;
      }
      .timer-pill-cyber {
        display: inline-flex; align-items: center; gap: 0.375rem;
        background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);
        color: #f87171; padding: 0.375rem 0.75rem; border-radius: 0.5rem;
        font-size: 0.75rem; font-weight: 700;
      }
      .cta-btn-cyber {
        display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
        width: 100%; height: 3.5rem; background: #00ff66; color: #05080a;
        font-weight: 800; border-radius: 0.5rem; font-size: 1rem; border: none;
        cursor: pointer; text-decoration: none; transition: all 0.3s ease;
        box-shadow: 0 0 25px rgba(0, 255, 102, 0.3); letter-spacing: 0.05em;
        text-transform: uppercase;
      }
      @media (min-width: 640px) {
        .cta-btn-cyber { font-size: 1.125rem; }
      }
      .cta-btn-cyber:hover {
        background: #00d050; box-shadow: 0 0 35px rgba(0, 255, 102, 0.5);
        transform: scale(1.02);
      }
      .cta-btn-cyber:active { transform: scale(0.98); }
      .under-btn-cyber {
        font-size: 0.5625rem; color: rgba(0, 255, 102, 0.6); margin: 0;
      }
      @media (min-width: 640px) {
        .under-btn-cyber { font-size: 0.75rem; }
      }
      .disclaimer-section-cyber {
        border-top: 1px solid rgba(0, 255, 102, 0.1); padding-top: 1.25rem; width: 100%;
      }
      .disclaimer-text-cyber {
        font-size: 0.5625rem; color: #64748b; line-height: 1.5; max-width: 32rem; margin: 0 auto;
        text-transform: uppercase; tracking-wider: 0.05em;
      }
      @media (min-width: 640px) {
        .disclaimer-text-cyber { font-size: 0.75rem; }
      }
    `;

    bodyContent = `
      <div class="cyber-grid-overlay"></div>
      <div class="cyber-glow-bg-1"></div>
      <div class="cyber-glow-bg-2"></div>
      <div class="main-container">
        <div class="terminal-header-row">
          <div class="term-title-left">
            <svg class="term-icon-cpu" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2"/>
              <rect x="9" y="9" width="6" height="6"/>
              <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/>
            </svg>
            <span class="term-title-text">Secure Portal v4.28</span>
          </div>
          <div class="term-status-right">
            <div class="green-dot-pulse"></div>
            <span class="term-title-text">Link Active</span>
          </div>
        </div>

        <div class="avatar-wrapper-cyber">
          <div class="avatar-glow-cyber"></div>
          <img src="${escAttr(data.imageUrl)}" alt="${escAttr(data.channelName)}" class="avatar-img-cyber" />
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <h1 class="cyber-h1">${escHtml(data.channelName)}</h1>
          <p class="cyber-sub-status">SYS_ONLINE // ${escHtml(subs)} CLIENT_COMMUNITIES</p>
          <div class="cyber-host-title-bar">
            &gt;&gt; HOST_TITLE: "${escHtml(data.channelTitle)}"
          </div>
        </div>

        <div class="cyber-log-box">
          <div class="log-title-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #00ff66;">
              <polyline points="4 17 10 11 4 5"/>
              <line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
            <span>sys_payload_description.log</span>
          </div>
          <p class="log-desc1">&gt; ${escHtml(data.channelDesc1)}</p>
          ${data.channelDesc2 ? `<p class="log-desc2">&gt;&gt; ${escHtml(data.channelDesc2)}</p>` : ""}
        </div>

        <div class="cta-wrapper-cyber">
          <div id="timerBox" class="timer-pill-cyber">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #f87171;">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>LINK_DECAY_IN // <span id="countdown">30</span>s</span>
          </div>

          <a id="ctaBtn" href="${escAttr(data.channelLink)}" target="_blank" rel="noopener noreferrer" class="cta-btn-cyber">
            <span>${escHtml(data.ctaButtonText || "Execute Connection")}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </a>

          <p class="under-btn-cyber">SECURE DIRECT POINT-TO-POINT REDIRECT TUNNEL ACTIVE</p>
        </div>

        <div class="disclaimer-section-cyber">
          <p class="disclaimer-text-cyber">
            <strong>Notice:</strong> Encryption tunnels established. Education payload only. ${escHtml(data.channelName)} accepts zero liabilities for system trading anomalies.
          </p>
        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(data.channelName)}</title>
  <meta name="description" content="${escAttr(data.channelDesc1.substring(0, 160))}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  ${metaPixelHtml}
  ${gtagHtml}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { min-height: 100vh; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      margin: 0;
      position: relative;
    }
    ${customCss}
  </style>
</head>
<body>
  ${bodyContent}

  <script>
    /* ── Countdown Timer ── */
    var t = 30;
    var cd  = document.getElementById('countdown');
    var timer = setInterval(function(){
      t--;
      if(cd) cd.textContent = t;
      if(t <= 0){
        clearInterval(timer);
      }
    }, 1000);

    /* ── Link Actions ── */
    var url = ${JSON.stringify(data.channelLink)};
    function clickAction() {
      if(url) window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    var cta = document.getElementById('ctaBtn');
    if(cta) {
      cta.addEventListener('click', function(e){
        e.preventDefault();
        clickAction();
      });
    }
    
    /* ── prefetch ── */
    (function(){
      if(!url) return;
      fetch(url, { method: 'GET', mode: 'no-cors', credentials: 'omit' }).catch(function(){});
    })();
  </script>
</body>
</html>`;
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
