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
const Design21FireStrike = lazy(
  () => import("@/components/landing-designs/Design21FireStrike"),
);
const Design22CrystalPro = lazy(
  () => import("@/components/landing-designs/Design22CrystalPro"),
);
const Design23VerdantPulse = lazy(
  () => import("@/components/landing-designs/Design23VerdantPulse"),
);
const Design24GoldVault = lazy(
  () => import("@/components/landing-designs/Design24GoldVault"),
);
const Design25NeonCity = lazy(
  () => import("@/components/landing-designs/Design25NeonCity"),
);
const Design26SunriseBoost = lazy(
  () => import("@/components/landing-designs/Design26SunriseBoost"),
);
const Design27PurpleRain = lazy(
  () => import("@/components/landing-designs/Design27PurpleRain"),
);
const Design28SteelEdge = lazy(
  () => import("@/components/landing-designs/Design28SteelEdge"),
);
const Design29RoseElite = lazy(
  () => import("@/components/landing-designs/Design29RoseElite"),
);
const Design30TitanBlack = lazy(
  () => import("@/components/landing-designs/Design30TitanBlack"),
);
const Design31IceStorm = lazy(
  () => import("@/components/landing-designs/Design31IceStorm"),
);
const Design32MidnightBloom = lazy(
  () => import("@/components/landing-designs/Design32MidnightBloom"),
);
const Design33VolcanoRed = lazy(
  () => import("@/components/landing-designs/Design33VolcanoRed"),
);
const Design34CosmicDrift = lazy(
  () => import("@/components/landing-designs/Design34CosmicDrift"),
);
const Design35EmeraldCity = lazy(
  () => import("@/components/landing-designs/Design35EmeraldCity"),
);
const Design36SandDune = lazy(
  () => import("@/components/landing-designs/Design36SandDune"),
);
const Design37NordLight = lazy(
  () => import("@/components/landing-designs/Design37NordLight"),
);
const Design38DiamondEdge = lazy(
  () => import("@/components/landing-designs/Design38DiamondEdge"),
);
const Design39SkyRocket = lazy(
  () => import("@/components/landing-designs/Design39SkyRocket"),
);
const Design40VelvetLux = lazy(
  () => import("@/components/landing-designs/Design40VelvetLux"),
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
      content = <Design21FireStrike pageData={pageData as any} />;
      break;
    case 22:
      content = <Design22CrystalPro pageData={pageData as any} />;
      break;
    case 23:
      content = <Design23VerdantPulse pageData={pageData as any} />;
      break;
    case 24:
      content = <Design24GoldVault pageData={pageData as any} />;
      break;
    case 25:
      content = <Design25NeonCity pageData={pageData as any} />;
      break;
    case 26:
      content = <Design26SunriseBoost pageData={pageData as any} />;
      break;
    case 27:
      content = <Design27PurpleRain pageData={pageData as any} />;
      break;
    case 28:
      content = <Design28SteelEdge pageData={pageData as any} />;
      break;
    case 29:
      content = <Design29RoseElite pageData={pageData as any} />;
      break;
    case 30:
      content = <Design30TitanBlack pageData={pageData as any} />;
      break;
    case 31:
      content = <Design31IceStorm pageData={pageData as any} />;
      break;
    case 32:
      content = <Design32MidnightBloom pageData={pageData as any} />;
      break;
    case 33:
      content = <Design33VolcanoRed pageData={pageData as any} />;
      break;
    case 34:
      content = <Design34CosmicDrift pageData={pageData as any} />;
      break;
    case 35:
      content = <Design35EmeraldCity pageData={pageData as any} />;
      break;
    case 36:
      content = <Design36SandDune pageData={pageData as any} />;
      break;
    case 37:
      content = <Design37NordLight pageData={pageData as any} />;
      break;
    case 38:
      content = <Design38DiamondEdge pageData={pageData as any} />;
      break;
    case 39:
      content = <Design39SkyRocket pageData={pageData as any} />;
      break;
    case 40:
      content = <Design40VelvetLux pageData={pageData as any} />;
      break;
    default:
      content = <Design1Modern pageData={pageData as any} />;
  }

  return <Suspense fallback={<DesignFallback />}>{content}</Suspense>;
}
