import { useMemo } from "react";
import DesignRenderer from "@/components/DesignRenderer";

export const route = "/preview";

// Keys used by LandingPreviewPanel and the download flow to store images in sessionStorage
const STORAGE_IMG_KEYS = ["__prev_img__", "__dl_img__"];

export default function DesignPreviewPage() {
  const pageData = useMemo(() => {
    const p = new URLSearchParams(window.location.search);
    // Resolve image: may be a sessionStorage key or a direct URL/base64
    const rawImg = p.get("img") || "";
    const imageUrl = STORAGE_IMG_KEYS.includes(rawImg)
      ? sessionStorage.getItem(rawImg) || ""
      : rawImg;
    return {
      channel_name: p.get("n") || "Channel Name",
      channel_title: p.get("t") || "Channel Title",
      channel_subscribers: parseInt(p.get("s") || "0") || 0,
      channel_desc1: p.get("d1") || "Description goes here.",
      channel_desc2: p.get("d2") || null,
      cta_button_text: p.get("cta") || "Join Now",
      channel_link: p.get("lnk") || "#",
      image_url: imageUrl,
      page_views: 0,
    };
  }, []);

  const styleId =
    parseInt(new URLSearchParams(window.location.search).get("d") || "1") || 1;

  return <DesignRenderer pageData={pageData} styleId={styleId} />;
}
