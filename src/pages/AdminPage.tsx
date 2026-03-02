import React, { useEffect, useState } from "react";
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
  LogOut,
  Wand2,
  Shield,
  Plus,
  Trash2,
} from "lucide-react";
import { downloadHtml, DESIGN_NAMES } from "@/lib/exportHtml";

const DESIGN_LIST = Object.entries(DESIGN_NAMES).map(([k, v]) => ({
  id: Number(k),
  label: v,
}));

const DESIGN_EMOJIS: Record<number, string> = {
  1: "🎨",
  2: "🌙",
  3: "✨",
  4: "🌊",
  5: "💎",
  6: "🌟",
  7: "🔮",
  8: "⚪",
  9: "🌈",
  10: "🌿",
  11: "🌅",
  12: "🟣",
  13: "🎨",
  14: "✨",
  15: "💨",
  16: "🌊",
  17: "🖼️",
  18: "💡",
  19: "⚪",
  20: "☁️",
  21: "🔥",
  22: "💎",
  23: "📈",
  24: "👑",
  25: "⚡",
  26: "☀️",
  27: "💜",
  28: "🎯",
  29: "💗",
  30: "▶",
  31: "❄️",
  32: "🌸",
  33: "🌋",
  34: "🌌",
  35: "💎",
  36: "🏜️",
  37: "🌌",
  38: "◆",
  39: "🚀",
  40: "♦",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState<number | null>(null);

  // Check admin auth
  useEffect(() => {
    if (!sessionStorage.getItem("admin_auth")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    navigate("/");
    toast.success("Logged out");
  };

  // Individual form state for each new page
  const [forms, setForms] = useState([newForm()]);

  function newForm() {
    return {
      id: Date.now(),
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
      imageFile: null as File | null,
      imagePreview: "",
    };
  }

  const updateForm = (
    id: number,
    key: string,
    value: string | number | File | null,
  ) =>
    setForms((fs) => fs.map((f) => (f.id === id ? { ...f, [key]: value } : f)));

  const handleImage = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be < 5MB");
      return;
    }
    updateForm(id, "imageFile", file);
    updateForm(id, "imagePreview", URL.createObjectURL(file));
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(file);
    });

  const handleGenerate = async (form: ReturnType<typeof newForm>) => {
    if (
      !form.channelName.trim() ||
      !form.channelTitle.trim() ||
      !form.channelDesc1.trim() ||
      !form.channelLink.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!form.imageFile && !form.imagePreview) {
      toast.error("Please upload a channel image");
      return;
    }
    setGenerating(form.id);
    try {
      let imageUrl = form.imagePreview;
      if (form.imageFile) imageUrl = await toBase64(form.imageFile);
      downloadHtml({
        channelName: form.channelName.trim(),
        channelTitle: form.channelTitle.trim(),
        channelSubscribers: parseInt(form.channelSubscribers) || 0,
        channelDesc1: form.channelDesc1.trim(),
        channelDesc2: form.channelDesc2.trim() || undefined,
        ctaButtonText: form.ctaButtonText.trim() || "Join on Telegram",
        channelLink: form.channelLink.trim(),
        metalink: form.metalink.trim() || undefined,
        gtagLink: form.gtagLink.trim() || undefined,
        imageUrl,
        designStyle: form.designStyle,
        slug: form.slug.trim() || undefined,
      });
      toast.success(`✅ "${form.channelName}" downloaded!`);
    } catch {
      toast.error("Failed to generate HTML");
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-foreground leading-none">
                Admin Panel
              </div>
              <div className="text-[11px] text-muted-foreground">
                HTML Landing Page Generator
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="text-xs h-8 gap-1.5"
            >
              <Wand2 className="h-3.5 w-3.5" /> Public Generator
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-xs h-8 gap-1.5 text-rose-500 border-rose-800 hover:bg-rose-950/30"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Generate Landing Pages
            </h1>
            <p className="text-sm text-muted-foreground">
              Create multiple pages at once — each downloads as a standalone
              HTML file
            </p>
          </div>
          <Button
            onClick={() => setForms((fs) => [...fs, newForm()])}
            className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
          >
            <Plus className="h-4 w-4" /> Add Page
          </Button>
        </div>

        <div className="space-y-5">
          {forms.map((form, idx) => (
            <div
              key={form.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">
                  Page #{idx + 1}
                  {form.channelName ? ` — ${form.channelName}` : ""}
                </h2>
                {forms.length > 1 && (
                  <button
                    onClick={() =>
                      setForms((fs) => fs.filter((f) => f.id !== form.id))
                    }
                    className="text-rose-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Image upload */}
              <div className="mb-4 flex items-center gap-4">
                <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-border bg-muted transition hover:bg-muted/70 flex-shrink-0">
                  {form.imagePreview ? (
                    <img
                      src={form.imagePreview}
                      alt="Preview"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <>
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground mt-1">
                        Upload
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImage(form.id, e)}
                    className="hidden"
                  />
                </label>
                <div className="flex-1 grid gap-2.5 md:grid-cols-3">
                  <F label="Channel Name *">
                    <Input
                      placeholder="e.g., TechReviews"
                      value={form.channelName}
                      onChange={(e) =>
                        updateForm(form.id, "channelName", e.target.value)
                      }
                      className="h-9"
                    />
                  </F>
                  <F label="Channel Title *">
                    <Input
                      placeholder="e.g., Tech Reviews & Tutorials"
                      value={form.channelTitle}
                      onChange={(e) =>
                        updateForm(form.id, "channelTitle", e.target.value)
                      }
                      className="h-9"
                    />
                  </F>
                  <F label="Subscribers">
                    <Input
                      type="number"
                      placeholder="e.g., 10000"
                      value={form.channelSubscribers}
                      onChange={(e) =>
                        updateForm(
                          form.id,
                          "channelSubscribers",
                          e.target.value,
                        )
                      }
                      className="h-9"
                    />
                  </F>
                </div>
              </div>

              <div className="grid gap-2.5 md:grid-cols-2 mb-3">
                <F label="Description 1 *">
                  <Textarea
                    placeholder="Main description"
                    value={form.channelDesc1}
                    onChange={(e) =>
                      updateForm(form.id, "channelDesc1", e.target.value)
                    }
                    rows={2}
                    className="resize-none"
                  />
                </F>
                <F label="Description 2 (optional)">
                  <Textarea
                    placeholder="Additional description"
                    value={form.channelDesc2}
                    onChange={(e) =>
                      updateForm(form.id, "channelDesc2", e.target.value)
                    }
                    rows={2}
                    className="resize-none"
                  />
                </F>
              </div>

              <div className="grid gap-2.5 md:grid-cols-4 mb-3">
                <F label="Channel Link *">
                  <Input
                    type="url"
                    placeholder="https://t.me/yourchannel"
                    value={form.channelLink}
                    onChange={(e) =>
                      updateForm(form.id, "channelLink", e.target.value)
                    }
                    className="h-9"
                  />
                </F>
                <F label="CTA Button Text">
                  <Input
                    placeholder="Join on Telegram"
                    value={form.ctaButtonText}
                    onChange={(e) =>
                      updateForm(form.id, "ctaButtonText", e.target.value)
                    }
                    className="h-9"
                  />
                </F>
                <F label="Meta Pixel ID">
                  <Input
                    placeholder="e.g., 1234567890"
                    value={form.metalink}
                    onChange={(e) =>
                      updateForm(form.id, "metalink", e.target.value)
                    }
                    className="h-9"
                  />
                </F>
                <F label="Google Tag ID">
                  <Input
                    placeholder="G-XXXXXXXXXX"
                    value={form.gtagLink}
                    onChange={(e) =>
                      updateForm(form.id, "gtagLink", e.target.value)
                    }
                    className="h-9"
                  />
                </F>
              </div>

              <div className="grid gap-2.5 md:grid-cols-3 mb-4">
                <F label="File Name / Slug">
                  <Input
                    placeholder="my-channel"
                    value={form.slug}
                    onChange={(e) =>
                      updateForm(
                        form.id,
                        "slug",
                        e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                      )
                    }
                    className="h-9"
                  />
                </F>
                <F label="Design Style *">
                  <Select
                    value={String(form.designStyle)}
                    onValueChange={(v) =>
                      updateForm(form.id, "designStyle", parseInt(v))
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DESIGN_LIST.map((d) => (
                        <SelectItem key={d.id} value={String(d.id)}>
                          {DESIGN_EMOJIS[d.id]} {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </F>
              </div>

              <Button
                onClick={() => handleGenerate(form)}
                disabled={generating === form.id}
                className="h-10 w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-700 hover:to-fuchsia-700"
              >
                {generating === form.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" /> Download HTML
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
    </div>
  );
}
