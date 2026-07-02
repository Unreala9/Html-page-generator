import { lazy, Suspense } from "react";

const Design1Modern = lazy(
  () => import("@/components/landing-designs/Design1Modern"),
);
const Design2DarkRose = lazy(
  () => import("@/components/landing-designs/Design2DarkRose"),
);
const Design3CleanMinimal = lazy(
  () => import("@/components/landing-designs/Design3CleanMinimal"),
);
const Design4Ocean = lazy(
  () => import("@/components/landing-designs/Design4Ocean"),
);
const Design5CryptoMinimal = lazy(
  () => import("@/components/landing-designs/Design5CryptoMinimal"),
);
const Design6Neon = lazy(
  () => import("@/components/landing-designs/Design6Neon"),
);
const Design7Glassmorphism = lazy(
  () => import("@/components/landing-designs/Design7Glassmorphism"),
);
const Design8GrayMinimal = lazy(
  () => import("@/components/landing-designs/Design8GrayMinimal"),
);
const Design9Gradient = lazy(
  () => import("@/components/landing-designs/Design9Gradient"),
);
const Design10Serene = lazy(
  () => import("@/components/landing-designs/Design10Serene"),
);
const Design11Sunset = lazy(
  () => import("@/components/landing-designs/Design11Sunset"),
);
const Design12Aurora = lazy(
  () => import("@/components/landing-designs/Design12Aurora"),
);
const Design13BoldGradient = lazy(
  () => import("@/components/landing-designs/Design13BoldGradient"),
);
const Design14Elegant = lazy(
  () => import("@/components/landing-designs/Design14Elegant"),
);
const Design15Breeze = lazy(
  () => import("@/components/landing-designs/Design15Breeze"),
);
const Design16Wave = lazy(
  () => import("@/components/landing-designs/Design16Wave"),
);
const Design17Canvas = lazy(
  () => import("@/components/landing-designs/Design17Canvas"),
);
const Design18Lumen = lazy(
  () => import("@/components/landing-designs/Design18Lumen"),
);
const Design19Slate = lazy(
  () => import("@/components/landing-designs/Design19Slate"),
);
const Design20Nimbus = lazy(
  () => import("@/components/landing-designs/Design20Nimbus"),
);
const Design21WhatsAppChatLight = lazy(
  () => import("@/components/landing-designs/Design21WhatsAppChatLight"),
);
const Design22WhatsAppChatDark = lazy(
  () => import("@/components/landing-designs/Design22WhatsAppChatDark"),
);
const Design23WhatsAppChannelModern = lazy(
  () => import("@/components/landing-designs/Design23WhatsAppChannelModern"),
);
const Design24WhatsAppGlassmorphic = lazy(
  () => import("@/components/landing-designs/Design24WhatsAppGlassmorphic"),
);
const Design25WhatsAppCyberChat = lazy(
  () => import("@/components/landing-designs/Design25WhatsAppCyberChat"),
);

export interface PageData {
  channel_name: string;
  channel_title: string;
  channel_subscribers: number;
  channel_desc1: string;
  channel_desc2: string | null;
  cta_button_text: string;
  channel_link: string;
  image_url: string;
  page_views?: number;
  metalink?: string;
  gtag_link?: string | null;
  status?: string;
  design_style?: number;
}

interface Props {
  pageData: PageData;
  styleId: number;
}

// Minimal dark fallback shown while the single design chunk loads (<50ms on fast networks)
const DesignFallback = () => (
  <div style={{ minHeight: "100vh", background: "#0E0E10" }} />
);

export default function DesignRenderer({ pageData, styleId }: Props) {
  let content: JSX.Element;

  switch (styleId) {
    case 1:
      content = <Design1Modern pageData={pageData as any} />;
      break;
    case 2:
      content = <Design2DarkRose pageData={pageData as any} />;
      break;
    case 3:
      content = <Design3CleanMinimal pageData={pageData as any} />;
      break;
    case 4:
      content = <Design4Ocean pageData={pageData as any} />;
      break;
    case 5:
      content = (
        <Design5CryptoMinimal
          data={{
            channelName: pageData.channel_name,
            channelTitle: pageData.channel_title,
            channelSubscribers: pageData.channel_subscribers,
            desc1: pageData.channel_desc1,
            desc2: pageData.channel_desc2 || "",
            ctaButtonText: pageData.cta_button_text,
            channelLink: pageData.channel_link,
            imageUrl: pageData.image_url,
          }}
        />
      );
      break;
    case 6:
      content = <Design6Neon pageData={pageData as any} />;
      break;
    case 7:
      content = <Design7Glassmorphism pageData={pageData as any} />;
      break;
    case 8:
      content = <Design8GrayMinimal pageData={pageData as any} />;
      break;
    case 9:
      content = <Design9Gradient pageData={pageData as any} />;
      break;
    case 10:
      content = <Design10Serene pageData={pageData as any} />;
      break;
    case 11:
      content = <Design11Sunset pageData={pageData as any} />;
      break;
    case 12:
      content = <Design12Aurora pageData={pageData as any} />;
      break;
    case 13:
      content = <Design13BoldGradient pageData={pageData as any} />;
      break;
    case 14:
      content = <Design14Elegant pageData={pageData as any} />;
      break;
    case 15:
      content = <Design15Breeze pageData={pageData as any} />;
      break;
    case 16:
      content = <Design16Wave pageData={pageData as any} />;
      break;
    case 17:
      content = <Design17Canvas pageData={pageData as any} />;
      break;
    case 18:
      content = <Design18Lumen pageData={pageData as any} />;
      break;
    case 19:
      content = <Design19Slate pageData={pageData as any} />;
      break;
    case 20:
      content = <Design20Nimbus pageData={pageData as any} />;
      break;
    case 21:
      content = <Design21WhatsAppChatLight pageData={pageData as any} />;
      break;
    case 22:
      content = <Design22WhatsAppChatDark pageData={pageData as any} />;
      break;
    case 23:
      content = <Design23WhatsAppChannelModern pageData={pageData as any} />;
      break;
    case 24:
      content = <Design24WhatsAppGlassmorphic pageData={pageData as any} />;
      break;
    case 25:
      content = <Design25WhatsAppCyberChat pageData={pageData as any} />;
      break;

    default:
      content = <Design8GrayMinimal pageData={pageData as any} />;
  }

  return <Suspense fallback={<DesignFallback />}>{content}</Suspense>;
}
