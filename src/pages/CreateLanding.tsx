import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nhost, gql, getPublicUrl } from "@/integrations/supabase/client";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";
import { z } from "zod";
import LandingPreviewPanel from "@/components/LandingPreviewPanel";

const landingPageSchema = z.object({
  channelName: z.string().trim().min(1, "Channel name is required").max(200),
  channelSubscribers: z.number().min(0, "Subscribers must be 0 or greater"),
  channelTitle: z.string().trim().min(1, "Channel title is required").max(200),
  channelDesc1: z.string().trim().min(1, "Description 1 is required").max(1000),
  channelDesc2: z.string().trim().max(1000).optional(),
  ctaButtonText: z.string().trim().min(1).max(50),
  channelLink: z.string().trim().url("Invalid channel URL").max(500),
  metalink: z.string().trim().min(1, "Meta Pixel ID is required").max(100),
  gtagLink: z.string().trim().max(500).optional().or(z.literal("")),
  status: z.enum(["Active", "Inactive"]),
  designStyle: z.number().min(1).max(40),
  slug: z
    .string()
    .trim()
    .min(1, "URL slug is required")
    .max(100)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    ),
});

const CreateLanding = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    channelName: "",
    channelSubscribers: "",
    channelTitle: "",
    channelDesc1: "",
    channelDesc2: "",
    ctaButtonText: "Join on Telegram",
    channelLink: "",
    metalink: "",
    gtagLink: "",
    status: "Active" as "Active" | "Inactive",
    designStyle: 1,
    slug: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [slugGenerating, setSlugGenerating] = useState(false);

  const generateSlug = (channelName: string) =>
    channelName
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase();

  const generateRandomSlug = async () => {
    setSlugGenerating(true);
    try {
      let candidate = "";
      for (let i = 0; i < 8; i++) {
        candidate = Math.random()
          .toString(36)
          .slice(2, 10)
          .replace(/[^a-z0-9-]/g, "")
          .toLowerCase();
        const { data } = await gql<{ landing_pages: { id: string }[] }>(
          `query CheckSlug($slug: String!) {
            landing_pages(where: { slug: { _eq: $slug } }, limit: 1) {
              id
            }
          }`,
          { slug: candidate },
        );
        if (!data?.landing_pages?.length) break;
      }
      setFormData((s) => ({ ...s, slug: candidate }));
    } finally {
      setSlugGenerating(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Resize image on client to reduce upload time
  const resizeImage = (
    file: File,
    maxSize = 1200,
    quality = 0.8,
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Image conversion failed"));
            resolve(blob);
          },
          "image/jpeg",
          quality,
        );
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load image for resizing"));
      };
      img.src = url;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = landingPageSchema.safeParse({
      ...formData,
      channelSubscribers: parseInt(formData.channelSubscribers) || 0,
      slug: formData.slug.trim(),
      designStyle: formData.designStyle,
    });

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    if (!imageFile) {
      toast.error("Please upload a channel image");
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      const session = nhost.getUserSession();
      if (!session?.user) throw new Error("Not authenticated");
      const userId = session.user.id;
      const slug = formData.slug.trim();

      // Pre-check slug uniqueness
      const { data: existing } = await gql<{ landing_pages: { id: string }[] }>(
        `query CheckSlug($slug: String!) {
          landing_pages(where: { slug: { _eq: $slug } }, limit: 1) {
            id
          }
        }`,
        { slug },
      );
      if (existing?.landing_pages?.length) {
        throw new Error(
          "Slug already exists. Please choose another or generate a random one.",
        );
      }

      // Resize image to reduce upload time
      let uploadBlob: Blob = imageFile;
      try {
        uploadBlob = await resizeImage(imageFile);
      } catch (err) {
        console.warn("Image resize failed, uploading original", err);
        uploadBlob = imageFile;
      }

      // Upload to Nhost Storage — throws FetchError on failure
      let uploadResult;
      try {
        uploadResult = await nhost.storage.uploadFiles({
          "bucket-id": "landing-hero-images",
          "file[]": [
            new File([uploadBlob], `${userId}-${slug}.jpg`, {
              type: "image/jpeg",
            }),
          ],
          "metadata[]": [{ name: `${userId}-${slug}.jpg` }],
        });
      } catch (uploadErr) {
        throw new Error(
          "Image upload failed: " +
            (uploadErr instanceof Error
              ? uploadErr.message
              : String(uploadErr)),
        );
      }

      if (!uploadResult.body?.processedFiles?.length) {
        throw new Error("Image upload returned no files");
      }

      const fileId = uploadResult.body.processedFiles[0].id;
      const imageUrl = getPublicUrl(fileId);

      setUploading(false);

      // Insert DB record via GraphQL
      const { error: insertError } = await gql(
        `mutation CreateLandingPage(
          $userId: uuid!
          $channelName: String!
          $channelSubscribers: Int!
          $channelTitle: String!
          $channelDesc1: String!
          $channelDesc2: String
          $ctaButtonText: String!
          $channelLink: String!
          $metalink: String!
          $gtagLink: String
          $status: String!
          $designStyle: Int!
          $imageUrl: String!
          $slug: String!
        ) {
          insert_landing_pages_one(object: {
            user_id: $userId
            channel_name: $channelName
            channel_subscribers: $channelSubscribers
            channel_title: $channelTitle
            channel_desc1: $channelDesc1
            channel_desc2: $channelDesc2
            cta_button_text: $ctaButtonText
            channel_link: $channelLink
            metalink: $metalink
            gtag_link: $gtagLink
            status: $status
            design_style: $designStyle
            image_url: $imageUrl
            slug: $slug
          }) {
            id
          }
        }`,
        {
          userId,
          channelName: formData.channelName.trim(),
          channelSubscribers: parseInt(formData.channelSubscribers) || 0,
          channelTitle: formData.channelTitle.trim(),
          channelDesc1: formData.channelDesc1.trim(),
          channelDesc2: formData.channelDesc2.trim() || null,
          ctaButtonText: formData.ctaButtonText.trim(),
          channelLink: formData.channelLink.trim(),
          metalink: formData.metalink.trim(),
          gtagLink: formData.gtagLink.trim() || null,
          status: formData.status,
          designStyle: formData.designStyle,
          imageUrl: imageUrl,
          slug,
        },
      );

      if (insertError) throw new Error(insertError);

      toast.success(`Landing page created! URL: /${slug}`);
      navigate("/dashboard");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to create landing page");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const previewPageData = {
    channel_name: formData.channelName || "Channel Name",
    channel_title: formData.channelTitle || "Channel Title",
    channel_subscribers: parseInt(formData.channelSubscribers) || 0,
    channel_desc1: formData.channelDesc1 || "Channel description goes here.",
    channel_desc2: formData.channelDesc2 || null,
    cta_button_text: formData.ctaButtonText || "Join Now",
    channel_link: formData.channelLink || "#",
    image_url: imagePreview || "",
    page_views: 0,
  };

  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="container mx-auto max-w-7xl h-full flex flex-col px-3 sm:px-4 py-2 sm:py-3">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-2 hover:bg-muted transition-all text-sm h-8 w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <div className="flex gap-3 flex-1 overflow-hidden min-h-0">
          <Card className="border-border bg-card shadow-2xl flex-1 overflow-hidden flex flex-col min-w-0">
            <CardHeader className="rounded-t-lg bg-muted/50 py-2 sm:py-3 px-4 sm:px-6 flex-shrink-0">
              <CardTitle className="text-base sm:text-lg font-bold text-foreground">
                Create Landing Page
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Build a stunning landing page for your Telegram channel
              </CardDescription>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 overflow-y-auto flex-1">
              {/* Image input top */}
              <div className="mb-2 flex w-full items-center justify-center">
                <label className="flex h-20 w-20 sm:h-24 sm:w-24 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-border bg-muted text-center transition hover:bg-muted/50">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <>
                      <ImageIcon className="mb-2 h-7 w-7 text-muted-foreground" />
                      <span className="text-xs text-foreground">
                        Image Input
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        1:1 • &lt; 5MB
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
                <div className="grid gap-2 sm:gap-2.5 md:grid-cols-3">
                  <FormText
                    id="channel-name"
                    label="Channel Name *"
                    placeholder="e.g., TechReviews"
                    value={formData.channelName}
                    onChange={(v) =>
                      setFormData((s) => ({ ...s, channelName: v }))
                    }
                    disabled={loading}
                  />
                  <FormText
                    id="channel-title"
                    label="Channel Title *"
                    placeholder="e.g., Tech Reviews & Tutorials"
                    value={formData.channelTitle}
                    onChange={(v) =>
                      setFormData((s) => ({ ...s, channelTitle: v }))
                    }
                    disabled={loading}
                  />
                  <FormText
                    id="channel-subscribers"
                    label="Subscribers *"
                    type="number"
                    placeholder="e.g., 10000"
                    value={formData.channelSubscribers}
                    onChange={(v) =>
                      setFormData((s) => ({ ...s, channelSubscribers: v }))
                    }
                    disabled={loading}
                  />
                </div>

                <div className="grid gap-2 sm:gap-2.5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="slug"
                      className="text-sm font-medium text-foreground"
                    >
                      Custom URL Slug *
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData((s) => ({
                            ...s,
                            slug: e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9-]/g, ""),
                          }))
                        }
                        placeholder="e.g., my-awesome-channel"
                        disabled={loading}
                        className="h-9 flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-9 text-xs px-2 whitespace-nowrap"
                        onClick={generateRandomSlug}
                        disabled={loading || slugGenerating}
                      >
                        {slugGenerating ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          "Generate"
                        )}
                      </Button>
                    </div>
                    {formData.channelName && !formData.slug && (
                      <button
                        type="button"
                        className="text-xs text-muted-foreground hover:text-primary underline"
                        onClick={() =>
                          setFormData((s) => ({
                            ...s,
                            slug: generateSlug(s.channelName),
                          }))
                        }
                      >
                        Use "{generateSlug(formData.channelName)}"
                      </button>
                    )}
                  </div>
                  <FormText
                    id="cta-button-text"
                    label="CTA Button Text *"
                    placeholder="e.g., Join on Telegram"
                    value={formData.ctaButtonText}
                    onChange={(v) =>
                      setFormData((s) => ({ ...s, ctaButtonText: v }))
                    }
                    disabled={loading}
                  />
                </div>

                <div className="grid gap-2 sm:gap-2.5 md:grid-cols-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="status"
                      className="text-sm font-medium text-foreground"
                    >
                      Status *
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(v: "Active" | "Inactive") =>
                        setFormData((s) => ({ ...s, status: v }))
                      }
                      disabled={loading}
                    >
                      <SelectTrigger id="status" className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="design-style"
                      className="text-sm font-medium text-foreground"
                    >
                      Design *
                    </Label>
                    <Select
                      value={String(formData.designStyle)}
                      onValueChange={(v) =>
                        setFormData((s) => ({
                          ...s,
                          designStyle: parseInt(v),
                        }))
                      }
                      disabled={loading}
                    >
                      <SelectTrigger id="design-style" className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">🎨 Modern Blue</SelectItem>
                        <SelectItem value="2">🌙 Dark Rose</SelectItem>
                        <SelectItem value="3">✨ Clean Minimal</SelectItem>
                        <SelectItem value="4">🌊 Ocean</SelectItem>
                        <SelectItem value="5">💎 Crypto Minimal</SelectItem>
                        <SelectItem value="6">🌟 Neon Cyber</SelectItem>
                        <SelectItem value="7">🔮 Glassmorphism</SelectItem>
                        <SelectItem value="8">⚪ Gray Minimal</SelectItem>
                        <SelectItem value="9">🌈 Vibrant Gradient</SelectItem>
                        <SelectItem value="10">🌿 Serene Green</SelectItem>
                        <SelectItem value="11">🌅 Sunset</SelectItem>
                        <SelectItem value="12">🟣 Aurora</SelectItem>
                        <SelectItem value="13">🎨 Bold Gradient</SelectItem>
                        <SelectItem value="14">✨ Elegant</SelectItem>
                        <SelectItem value="15">💨 Breeze</SelectItem>
                        <SelectItem value="16">🌊 Wave</SelectItem>
                        <SelectItem value="17">🖼️ Canvas</SelectItem>
                        <SelectItem value="18">💡 Lumen</SelectItem>
                        <SelectItem value="19">⚪ Slate</SelectItem>
                        <SelectItem value="20">☁️ Nimbus</SelectItem>
                        <SelectItem value="21">🔥 FireStrike</SelectItem>
                        <SelectItem value="22">💎 CrystalPro</SelectItem>
                        <SelectItem value="23">📈 VerdantPulse</SelectItem>
                        <SelectItem value="24">👑 GoldVault</SelectItem>
                        <SelectItem value="25">⚡ NeonCity</SelectItem>
                        <SelectItem value="26">☀️ SunriseBoost</SelectItem>
                        <SelectItem value="27">💜 PurpleRain</SelectItem>
                        <SelectItem value="28">🎯 SteelEdge</SelectItem>
                        <SelectItem value="29">💗 RoseElite</SelectItem>
                        <SelectItem value="30">▶ TitanBlack</SelectItem>
                        <SelectItem value="31">❄️ IceStorm</SelectItem>
                        <SelectItem value="32">🌸 MidnightBloom</SelectItem>
                        <SelectItem value="33">🌋 VolcanoRed</SelectItem>
                        <SelectItem value="34">🌌 CosmicDrift</SelectItem>
                        <SelectItem value="35">💎 EmeraldCity</SelectItem>
                        <SelectItem value="36">🏜️ SandDune</SelectItem>
                        <SelectItem value="37">🌌 NordLight</SelectItem>
                        <SelectItem value="38">◆ DiamondEdge</SelectItem>
                        <SelectItem value="39">🚀 SkyRocket</SelectItem>
                        <SelectItem value="40">♦ VelvetLux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormArea
                    id="channel-desc1"
                    label="Description 1 *"
                    placeholder="Main channel description"
                    value={formData.channelDesc1}
                    onChange={(v) =>
                      setFormData((s) => ({ ...s, channelDesc1: v }))
                    }
                    disabled={loading}
                  />
                  <FormArea
                    id="channel-desc2"
                    label="Description 2 (Optional)"
                    placeholder="Additional description"
                    value={formData.channelDesc2}
                    onChange={(v) =>
                      setFormData((s) => ({ ...s, channelDesc2: v }))
                    }
                    disabled={loading}
                  />
                </div>

                <div className="grid gap-2 sm:gap-2.5 md:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-foreground">
                      Channel Link *
                    </Label>
                    <Input
                      type="url"
                      placeholder="e.g., https://t.me/yourchannel"
                      value={formData.channelLink}
                      onChange={(e) =>
                        setFormData((s) => ({
                          ...s,
                          channelLink: e.target.value,
                        }))
                      }
                      disabled={loading}
                      className="h-9"
                    />
                  </div>
                  <FormText
                    id="metalink"
                    label="Meta Pixel ID *"
                    placeholder="e.g., 1234567890"
                    value={formData.metalink}
                    onChange={(v) =>
                      setFormData((s) => ({ ...s, metalink: v }))
                    }
                    disabled={loading}
                  />
                  <FormText
                    id="gtag-link"
                    label="Google Tag ID (Optional)"
                    placeholder="e.g., G-XXXXXXXXXX"
                    value={formData.gtagLink}
                    onChange={(v) =>
                      setFormData((s) => ({ ...s, gtagLink: v }))
                    }
                    disabled={loading}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-1 h-10 w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg transition-all hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Uploading Image...
                    </>
                  ) : loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Creating...
                    </>
                  ) : (
                    "Create Landing Page"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Live Preview Panel */}
          <LandingPreviewPanel
            pageData={previewPageData}
            styleId={formData.designStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateLanding;

function FormText(props: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={props.id} className="text-sm font-medium text-foreground">
        {props.label}
      </Label>
      <Input
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        type={props.type || "text"}
        disabled={props.disabled}
        className="h-9"
      />
    </div>
  );
}

function FormArea(props: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2 h-[120px]">
      <Label htmlFor={props.id} className="text-sm font-medium text-foreground">
        {props.label}
      </Label>
      <Textarea
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        rows={2}
        disabled={props.disabled}
        className="resize-none"
      />
    </div>
  );
}
