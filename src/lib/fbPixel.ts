// src/lib/fbPixel.ts
declare global {
  interface Window {
    fbq?: any;
    _fbqLoaded?: boolean;
    _fbqInitIds?: Set<string>;
  }
}

export const loadFbPixelLib = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if (window.fbq || window._fbqLoaded) return resolve();

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    s.onload = () => {
      window._fbqLoaded = true;

      // Safety bootstrap (rare)
      if (!window.fbq) {
        (function (
          f: any,
          b: Document,
          e: string,
          v: string,
          n?: any,
          t?: any,
          s?: any
        ) {
          if (f.fbq) return;
          n = f.fbq = function () {
            n.callMethod
              ? n.callMethod.apply(n, arguments)
              : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = true;
          n.version = "2.0";
          n.queue = [];
        })(window, document, "script", s.src);
      }
      resolve();
    };
    s.onerror = () => reject(new Error("Failed to load Meta Pixel library"));
    document.head.appendChild(s);
  });
};

// Init only once per pixelId
export const ensureFbqInit = (pixelId: string) => {
  if (typeof window === "undefined" || !window.fbq) return;
  if (!window._fbqInitIds) window._fbqInitIds = new Set<string>();
  if (window._fbqInitIds.has(pixelId)) return;
  window.fbq("init", pixelId);
  window._fbqInitIds.add(pixelId);
};

// Track PageView to single pixel (not all)
export const trackSinglePageView = (pixelId: string) => {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackSingle", pixelId, "PageView");
};

// Generic single-pixel event helper
export const trackSingleEvent = (
  pixelId: string,
  eventName: string,
  params: Record<string, any> = {}
) => {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackSingle", pixelId, eventName, params);
};
