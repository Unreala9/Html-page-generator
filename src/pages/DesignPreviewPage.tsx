import { useMemo } from "react";
import DesignRenderer from "@/components/DesignRenderer";

export const route = "/preview";

export default function DesignPreviewPage() {
  const pageData = useMemo(() => {
    const p = new URLSearchParams(window.location.search);
    return {
      channel_name: p.get("n") || "Channel Name",
      channel_title: p.get("t") || "Channel Title",
      channel_subscribers: parseInt(p.get("s") || "0") || 0,
      channel_desc1: p.get("d1") || "Description goes here.",
      channel_desc2: p.get("d2") || null,
      cta_button_text: p.get("cta") || "Join Now",
      channel_link: p.get("lnk") || "#",
      image_url: p.get("img") || "",
      page_views: 0,
    };
  }, []);

  const styleId =
    parseInt(new URLSearchParams(window.location.search).get("d") || "1") || 1;

  return <DesignRenderer pageData={pageData} styleId={styleId} />;
}
