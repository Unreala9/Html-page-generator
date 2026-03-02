import { useEffect, useState, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import { gql } from "@/integrations/supabase/client";
import DesignRenderer from "@/components/DesignRenderer";
import { Helmet } from "react-helmet";

const WORKER_URL = import.meta.env.VITE_WORKER_URL;
const NHOST_PROJECT = import.meta.env.VITE_NHOST_SUBDOMAIN;

const reservedPaths = [
  "auth",
  "dashboard",
  "admin",
  "create",
  "edit",
  "recycle-bin",
];

interface LandingPageData {
  channel_name: string;
  channel_title: string;
  channel_subscribers: number;
  channel_desc1: string;
  channel_desc2: string | null;
  cta_button_text: string;
  channel_link: string;
  metalink: string;
  gtag_link: string | null;
  image_url: string;
  status: string;
  page_views: number;
  design_style: number;
  slug: string;
  redirect_timer?: number;
}

// Fetch via Cloudflare Worker (primary — bypasses DNS blocks in India)
async function fetchViaWorker(slug: string): Promise<LandingPageData | null> {
  const win = window as any;
  if (win.__INITIAL_DATA__) {
    return win.__INITIAL_DATA__;
  }

  // Catch the ultra-fast HTML-injected parallel pre-fetch if it's available
  if (win.__INITIAL_DATA_PROMISE__) {
    try {
      const data = await win.__INITIAL_DATA_PROMISE__;
      win.__INITIAL_DATA_PROMISE__ = null; // Consume
      if (data) return data;
    } catch (e) {
      console.warn("Prefetch failed, trying again...", e);
    }
  }

  if (!WORKER_URL) throw new Error("VITE_WORKER_URL is not configured");

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = `${WORKER_URL}?slug=${encodeURIComponent(slug)}&project=${NHOST_PROJECT}&format=json`;

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data: LandingPageData | null = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (e) {
            reject(new Error("Failed to parse worker response as JSON"));
          }
        } else {
          reject(new Error(`Worker responded with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error during worker fetch"));
    };

    xhr.send();
  });
}

// Fetch directly from Nhost (fallback — no longer DNS-blocked in India)
async function fetchViaNhost(slug: string): Promise<LandingPageData | null> {
  const { data, error } = await gql<{
    landing_pages: LandingPageData[];
  }>(
    `query GetLandingPage($slug: String!) {
      landing_pages(where: { slug: { _eq: $slug }, status: { _eq: "Active" } }, limit: 1) {
        channel_name
        channel_title
        channel_subscribers
        channel_desc1
        channel_desc2
        cta_button_text
        channel_link
        metalink
        gtag_link
        image_url
        status
        page_views
        design_style
        slug
      }
    }`,
    { slug },
  );

  if (error) throw new Error(error);
  return data?.landing_pages?.[0] ?? null;
}

const LandingPage = () => {
  const { slug } = useParams();

  // 🔥 SAFE CHECK (important)
  if (!slug) return <div>Invalid URL</div>;

  if (reservedPaths.includes(slug)) {
    return <Navigate to="/auth" replace />;
  }

  const [pageData, setPageData] = useState<LandingPageData | null>(() => {
    const win = window as any;
    if (win.__INITIAL_DATA__) return win.__INITIAL_DATA__;

    const cached = sessionStorage.getItem(`lp_cache_${slug}`);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(!pageData);
  const [networkError, setNetworkError] = useState(false);

  const fetchAndIncrementViews = useCallback(async () => {
    try {
      console.log("Fetching slug:", slug);

      let data: LandingPageData | null = null;
      let workerError: unknown = null;
      let nhostError: unknown = null;

      // 1️⃣ Try sync pre-fetched data first
      const win = window as any;
      if (win.__INITIAL_DATA__) {
        console.log("Using sync __INITIAL_DATA__");
        data = win.__INITIAL_DATA__;
      } else {
        // 2️⃣ Try Cloudflare Worker (avoids DNS blocking in India)
        try {
          data = await fetchViaWorker(slug);
          console.log("Loaded via Worker:", !!data);
        } catch (workerErr) {
          console.warn(
            "Worker fetch failed, falling back to Nhost:",
            workerErr,
          );
          workerError = workerErr;
        }

        // 3️⃣ Fallback: direct Nhost when worker fails OR returns empty payload
        if (!data) {
          try {
            data = await fetchViaNhost(slug);
            console.log("Loaded via Nhost fallback:", !!data);
          } catch (nhostErr) {
            console.error("Nhost fallback also failed:", nhostErr);
            nhostError = nhostErr;
          }
        }
      }

      setNetworkError(!data && (!!workerError || !!nhostError));

      if (data) {
        sessionStorage.setItem(`lp_cache_${slug}`, JSON.stringify(data));

        // Increment page views on load
        gql(
          `mutation IncrementPageViews($slug: String!) {
            update_landing_pages(where: { slug: { _eq: $slug } }, _inc: { page_views: 1 }) {
              affected_rows
            }
          }`,
          { slug },
        ).catch((error) => console.warn("Page view increment failed:", error));
      }
      setPageData(data);
    } catch (err) {
      console.error("Error loading landing page:", err);
      setNetworkError(true);
      setPageData(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchAndIncrementViews();
  }, [fetchAndIncrementViews]);

  // 🔥 META PIXEL
  useEffect(() => {
    if (!pageData?.metalink) return;

    const fbPixelScript = document.createElement("script");
    fbPixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s){
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pageData.metalink}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbPixelScript);

    return () => {
      fbPixelScript.remove();
    };
  }, [pageData]);

  if (!pageData && !loading && networkError) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0E0E10] text-white/70 p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Connection issue</h1>
          <p className="mb-4">
            We could not load this landing page on your current network. Please
            retry.
          </p>
          <button
            onClick={() => {
              setLoading(true);
              setNetworkError(false);
              fetchAndIncrementViews();
            }}
            className="inline-flex items-center justify-center rounded-full bg-white text-black px-5 py-2 font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // 🔥 404 FIX
  if (!pageData && !loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0E0E10] text-white/50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <p>Landing page not found</p>
        </div>
      </div>
    );
  }

  // Instant Loading / Background Loading State
  if (!pageData) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0E0E10] p-4 text-center">
        <div className="animate-pulse space-y-6 w-full max-w-md">
          <div className="h-44 w-44 bg-white/5 rounded-full mx-auto" />
          <div className="space-y-3">
            <div className="h-8 bg-white/5 rounded-lg w-3/4 mx-auto" />
            <div className="h-6 bg-white/5 rounded-lg w-1/2 mx-auto" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-white/5 rounded w-full" />
            <div className="h-4 bg-white/5 rounded w-5/6 mx-auto" />
          </div>
          <div className="h-12 bg-white/5 rounded-full w-48 mx-auto mt-8" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageData.channel_name}</title>

        <meta
          name="description"
          content={pageData.channel_desc1.substring(0, 160)}
        />

        <meta property="og:title" content={pageData.channel_title} />
        <meta
          property="og:description"
          content={pageData.channel_desc1.substring(0, 160)}
        />
        <meta property="og:image" content={pageData.image_url} />

        <meta name="twitter:title" content={pageData.channel_title} />
        <meta
          name="twitter:description"
          content={pageData.channel_desc1.substring(0, 160)}
        />
        <meta name="twitter:image" content={pageData.image_url} />

        {/* Google Analytics */}
        {pageData.gtag_link && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${pageData.gtag_link}`}
            />
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${pageData.gtag_link}');
              `}
            </script>
          </>
        )}
      </Helmet>

      <div className="lp-root">
        <DesignRenderer
          pageData={pageData}
          styleId={Number(pageData.design_style)}
        />
      </div>
    </>
  );
};

export default LandingPage;
