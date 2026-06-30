import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Download,
  Image as ImageIcon,
  Loader2,
  Lock,
  Eye,
  EyeOff,
  Wand2,
  Link2,
  Hash,
  BarChart3,
  FileType2,
  Palette,
  ShieldCheck,
  Sparkles,
  FileText,
  Home,
} from "lucide-react";
import { DESIGN_NAMES } from "@/lib/exportHtml";
import LandingPreviewPanel from "@/components/LandingPreviewPanel";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL as string;
const ADMIN_PASS  = import.meta.env.VITE_ADMIN_PASS  as string;

const DESIGN_LIST = Object.entries(DESIGN_NAMES).map(([k, v]) => ({
  id: Number(k),
  label: v,
}));

const DESIGN_EMOJIS: Record<number, string> = {
  1:"🎨",2:"🌙",3:"✨",4:"🌊",5:"💎",6:"🌟",7:"🔮",8:"⚪",9:"🌈",10:"🌿",
  11:"🌅",12:"🟣",13:"🎨",14:"✨",15:"💨",16:"🌊",17:"🖼️",18:"💡",19:"⚪",20:"☁️",
  21:"🟢",22:"💬",23:"📢",24:"🔮",25:"📟",
};

export default function BuilderPage() {
  const navigate = useNavigate();

  // Admin modal
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass]   = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  // Form
  const [form, setForm] = useState({
    channelName: "",
    channelTitle: "",
    channelSubscribers: "",
    channelDesc1: "",
    channelDesc2: "",
    ctaButtonText: "Join on Telegram",
    channelLink: "",
    metalink: "",
    gtagLink: "",
    designStyle: 1,
    slug: "",
  });
  const [imageFile, setImageFile]     = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [generating, setGenerating]   = useState(false);

  const set = (key: string, val: string | number) =>
    setForm((s) => ({ ...s, [key]: val }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be < 5MB"); return; }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(file);
    });

  const handleGenerate = async () => {
    if (!form.channelName.trim())  { toast.error("Channel name is required"); return; }
    if (!form.channelTitle.trim()) { toast.error("Channel title is required"); return; }
    if (!form.channelDesc1.trim()) { toast.error("Description is required");  return; }
    if (!form.channelLink.trim())  { toast.error("Channel link is required");  return; }
    if (!imageFile && !imagePreview) { toast.error("Please upload a channel image"); return; }

    setGenerating(true);
    try {
      let imageUrl = imagePreview;
      if (imageFile) imageUrl = await toBase64(imageFile);

      // Store the image in sessionStorage to avoid URL length limits with base64
      const IMG_KEY = "__dl_img__";
      sessionStorage.setItem(IMG_KEY, imageUrl);

      // Build the same URL params that DesignPreviewPage / LandingPreviewPanel use
      const p = new URLSearchParams({
        d:   String(form.designStyle),
        n:   form.channelName.trim(),
        t:   form.channelTitle.trim(),
        s:   String(parseInt(form.channelSubscribers) || 0),
        d1:  form.channelDesc1.trim(),
        d2:  form.channelDesc2.trim(),
        cta: form.ctaButtonText.trim() || "Join on Telegram",
        lnk: form.channelLink.trim(),
        img: IMG_KEY,   // pass the storage key, not the raw base64
        // tracking
        meta: form.metalink.trim(),
        gtag: form.gtagLink.trim(),
      });

      const previewUrl = `/preview?${p.toString()}`;

      // Render the chosen design in a hidden iframe, then capture its HTML
      const html = await new Promise<string>((resolve, reject) => {
        const iframe = document.createElement("iframe");
        iframe.style.cssText =
          "position:fixed;inset:0;width:100vw;height:100vh;border:none;opacity:0;pointer-events:none;z-index:-1";
        document.body.appendChild(iframe);

        const cleanup = () => document.body.removeChild(iframe);

        iframe.onload = () => {
          try {
            // Give React a tick to finish rendering
            setTimeout(() => {
              try {
                const doc = iframe.contentDocument;
                if (!doc) { cleanup(); reject(new Error("No iframe doc")); return; }

                // Inline all same-origin CSS sheets so the HTML is self-contained
                const styleSheets = Array.from(doc.styleSheets);
                let extraCss = "";
                for (const sheet of styleSheets) {
                  try {
                    const rules = Array.from(sheet.cssRules ?? []);
                    extraCss += rules.map((r) => r.cssText).join("\n");
                  } catch { /* cross-origin sheet – skip */ }
                }

                // Mark CTA buttons in the LIVE DOM before cloning
                // so data-cta attribute survives into the static HTML
                const ctaText = form.ctaButtonText.trim() || "Join on Telegram";
                doc.querySelectorAll("button").forEach((btn) => {
                  if (btn.textContent?.trim().includes(ctaText)) {
                    btn.setAttribute("data-cta", "1");
                    btn.setAttribute("data-cta-link", form.channelLink.trim() || "#");
                  }
                });

                // Deep-clone the document
                const clone = doc.documentElement.cloneNode(true) as HTMLElement;

                // Remove external <link rel="stylesheet"> and all Vite/React <script> tags
                clone.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove());
                clone.querySelectorAll("script").forEach((el) => {
                  const src = el.getAttribute("src") || "";
                  const text = el.textContent || "";
                  // Remove Vite HMR, React bundle scripts, and module preloads
                  if (
                    src.includes("/src/") ||
                    src.includes("@vite") ||
                    src.includes("react") ||
                    src.includes("chunk") ||
                    text.includes("__vite") ||
                    text.includes("sessionStorage") || // remove our preview image key script influence
                    el.getAttribute("type") === "module"
                  ) {
                    el.remove();
                  }
                });
                // Remove module preload links
                clone.querySelectorAll('link[rel="modulepreload"]').forEach((el) => el.remove());

                // Inject all collected CSS into <head> via DOM (safe for large CSS)
                if (extraCss) {
                  const styleEl = doc.createElement("style");
                  styleEl.textContent = extraCss;
                  clone.querySelector("head")?.appendChild(styleEl);
                }

                // Serialize to HTML string first, THEN inject tracking scripts as raw strings.
                // This is more reliable than DOM createElement — avoids serialization quirks.
                let fullHtml = "<!DOCTYPE html>\n" + clone.outerHTML;

                // Replace the storage-key placeholder with the actual base64 image
                fullHtml = fullHtml.split(IMG_KEY).join(imageUrl);

                // ── Meta Pixel ───────────────────────────────────────────────
                if (form.metalink.trim()) {
                  const pid = form.metalink.trim();
                  const pixelBlock = `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pid}');
fbq('track','PageView');
<\/script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${pid}&ev=PageView&noscript=1"/></noscript>
<!-- End Meta Pixel Code -->`;
                  // Insert right after <head> so it runs before anything else
                  fullHtml = fullHtml.replace(/<head>/i, "<head>\n" + pixelBlock);
                }

                // ── Google Analytics ─────────────────────────────────────────
                if (form.gtagLink.trim()) {
                  const gid = form.gtagLink.trim();
                  const gtagBlock = `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${gid}"><\/script>
<script>
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${gid}');
<\/script>
<!-- End Google Analytics -->`;
                  fullHtml = fullHtml.replace(/<head>/i, "<head>\n" + gtagBlock);
                }
                // ── Fix CTA Button (React onClick is stripped in static HTML) ─
                // We pre-marked CTA buttons with data-cta in the live DOM above.
                // Now replace <button data-cta="1" ...>...</button> with <a href> in the HTML string.
                const ctaLink = form.channelLink.trim() || "#";
                fullHtml = fullHtml.replace(
                  /<button([^>]*data-cta[^>]*)>([\s\S]*?)<\/button>/gi,
                  (_match, attrs, inner) => {
                    return `<a href="${ctaLink}" target="_blank" rel="noopener noreferrer"${attrs} style="cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;">${inner}</a>`;
                  }
                );

                // Fallback script: if regex didn't catch everything, wire up data-cta elements
                const ctaScript = `<script>
(function(){
  var ctaUrl=${JSON.stringify(ctaLink)};
  document.querySelectorAll('[data-cta]').forEach(function(el){
    el.style.cursor='pointer';
    el.addEventListener('click',function(e){
      e.preventDefault();
      window.open(ctaUrl,'_blank','noopener,noreferrer');
    });
  });
})();
<\/script>`;
                fullHtml = fullHtml.replace(/<\/body>/i, ctaScript + "\n</body>");

                sessionStorage.removeItem(IMG_KEY);
                cleanup();
                resolve(fullHtml);
              } catch (err) {
                cleanup();
                reject(err);
              }
            }, 800);
          } catch (err) {
            cleanup();
            reject(err);
          }
        };

        iframe.onerror = () => { cleanup(); reject(new Error("iframe load error")); };
        iframe.src = previewUrl;
      });

      // Download the captured HTML
      const slug = form.slug.trim() || form.channelName.trim().replace(/\s+/g, "-").toLowerCase() || "landing-page";
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("✅ HTML downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate HTML");
    } finally {
      setGenerating(false);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    setTimeout(() => {
      if (adminEmail === ADMIN_EMAIL && adminPass === ADMIN_PASS) {
        sessionStorage.setItem("admin_auth", "1");
        toast.success("Welcome, Admin!");
        navigate("/admin");
      } else {
        toast.error("Invalid credentials");
      }
      setAdminLoading(false);
    }, 600);
  };

  const preview = {
    channel_name:        form.channelName  || "Channel Name",
    channel_title:       form.channelTitle || "Channel Title",
    channel_subscribers: parseInt(form.channelSubscribers) || 0,
    channel_desc1:       form.channelDesc1 || "Channel description goes here.",
    channel_desc2:       form.channelDesc2 || null,
    cta_button_text:     form.ctaButtonText || "Join Now",
    channel_link:        form.channelLink  || "#",
    image_url:           imagePreview      || "",
    page_views:          0,
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-card/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground mr-2 border border-border/40 bg-muted/40 hover:bg-muted p-1.5 rounded-lg transition-all"
              title="Go back to Home"
            >
              <Home className="h-4 w-4" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
              <Wand2 className="h-4.5 w-4.5 text-white" />
            </div>
            <div className="leading-none">
              <span className="font-bold text-base text-foreground tracking-tight">HTML Generator</span>
              <span className="ml-2 text-[11px] text-muted-foreground hidden sm:inline">Landing Page Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/quotation")}
              className="flex items-center gap-1.5 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-400 hover:text-white hover:bg-violet-600 hover:border-violet-500 transition-all"
            >
              <FileText className="h-3.5 w-3.5" />
              Get Website Quote
            </button>

            <button
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-violet-500/40 hover:bg-violet-500/5 transition-all"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* ── Admin Modal ─────────────────────────────────────────────────── */}
      {showAdmin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && setShowAdmin(false)}
        >
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Admin Login</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Restricted access only</p>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-sm text-foreground">Email</Label>
                <Input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@example.com" required className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-foreground">Password</Label>
                <div className="relative">
                  <Input type={showPass ? "text" : "password"} value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="••••••••" required className="h-9 pr-9" />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <Button type="button" variant="outline" className="flex-1 h-9" onClick={() => setShowAdmin(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={adminLoading}
                  className="flex-1 h-9 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-700 hover:to-fuchsia-700">
                  {adminLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Main layout ─────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 mx-auto max-w-7xl w-full px-4 py-4 overflow-hidden">
        <div className="flex gap-5 h-full overflow-hidden">

          {/* Left — Form */}
          <div className="flex-1 min-w-0 space-y-4 pr-1 pb-6 overflow-y-auto scrollbar-hide">

            {/* Section: Channel Info */}
            <Section title="Channel Info" icon={<Hash className="h-3.5 w-3.5" />}>
              {/* Image + name/title/subs row */}
              <div className="flex items-start gap-4">
                {/* Avatar upload */}
                <label className="group flex h-[72px] w-[72px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/50 transition hover:border-violet-500/60 hover:bg-violet-500/5 overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon className="h-5 w-5 text-muted-foreground group-hover:text-violet-400 transition" />
                      <span className="mt-1 text-[10px] text-muted-foreground">Logo</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>

                {/* Name / Title / Subs */}
                <div className="flex-1 grid gap-3 sm:grid-cols-3">
                  <Field label="Channel Name *">
                    <Input placeholder="e.g., TechReviews" value={form.channelName}
                      onChange={(e) => set("channelName", e.target.value)} className="h-9" />
                  </Field>
                  <Field label="Channel Title *">
                    <Input placeholder="e.g., Tech Reviews & Tutorials" value={form.channelTitle}
                      onChange={(e) => set("channelTitle", e.target.value)} className="h-9" />
                  </Field>
                  <Field label="Subscribers">
                    <Input type="number" placeholder="e.g., 10000" value={form.channelSubscribers}
                      onChange={(e) => set("channelSubscribers", e.target.value)} className="h-9" />
                  </Field>
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid gap-3 sm:grid-cols-2 mt-3">
                <Field label="Description 1 *">
                  <Textarea placeholder="Main description shown on the landing page"
                    value={form.channelDesc1} onChange={(e) => set("channelDesc1", e.target.value)}
                    rows={2} className="resize-none text-sm" />
                </Field>
                <Field label="Description 2 (optional)">
                  <Textarea placeholder="Secondary description (optional)"
                    value={form.channelDesc2} onChange={(e) => set("channelDesc2", e.target.value)}
                    rows={2} className="resize-none text-sm" />
                </Field>
              </div>
            </Section>

            {/* Section: Links & CTA */}
            <Section title="Links & CTA" icon={<Link2 className="h-3.5 w-3.5" />}>
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Telegram / Channel Link *">
                  <Input type="url" placeholder="https://t.me/yourchannel"
                    value={form.channelLink} onChange={(e) => set("channelLink", e.target.value)} className="h-9" />
                </Field>
                <Field label="CTA Button Text *">
                  <Input placeholder="Join on Telegram"
                    value={form.ctaButtonText} onChange={(e) => set("ctaButtonText", e.target.value)} className="h-9" />
                </Field>
                <Field label="File name / Slug">
                  <Input placeholder="my-channel"
                    value={form.slug}
                    onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="h-9 font-mono text-sm" />
                </Field>
              </div>
            </Section>

            {/* Section: Design & Tracking */}
            <Section title="Design & Tracking" icon={<Palette className="h-3.5 w-3.5" />}>
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Design Style *">
                  <Select value={String(form.designStyle)} onValueChange={(v) => set("designStyle", parseInt(v))}>
                    <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent className="max-h-60">
                      {DESIGN_LIST.map((d) => (
                        <SelectItem key={d.id} value={String(d.id)}>
                          {DESIGN_EMOJIS[d.id]} {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Meta Pixel ID">
                  <Input placeholder="e.g., 1234567890"
                    value={form.metalink} onChange={(e) => set("metalink", e.target.value)} className="h-9" />
                </Field>
                <Field label="Google Tag ID">
                  <Input placeholder="e.g., G-XXXXXXXXXX"
                    value={form.gtagLink} onChange={(e) => set("gtagLink", e.target.value)} className="h-9" />
                </Field>
              </div>
            </Section>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {/* shimmer */}
              <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
              {generating ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Generating HTML…</>
              ) : (
                <><Download className="h-5 w-5" /> Generate &amp; Download HTML</>
              )}
            </button>

            {/* Quick stats hint */}
            <div className="flex flex-wrap items-center justify-center gap-4 pb-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><FileType2 className="h-3 w-3 text-violet-400" /> Self-contained .html file</span>
              <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3 text-violet-400" /> Meta Pixel + GA embedded</span>
              <span className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-violet-400" /> 25 premium designs</span>
            </div>
          </div>

          {/* Right — Live Preview */}
          <LandingPreviewPanel pageData={preview} styleId={form.designStyle} />
        </div>
      </div>
    </div>
  );
}

/* ── Small helpers ─────────────────────────────────────────────────────── */

function Section({
  title, icon, children,
}: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-violet-500/15 text-violet-400">
          {icon}
        </span>
        <h2 className="text-[13px] font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
