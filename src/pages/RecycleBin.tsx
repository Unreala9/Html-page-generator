import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nhost, gql } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, RefreshCcw, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PageContainer from "@/components/pageContainer";

interface LandingPage {
  id: string;
  channel_name: string;
  channel_title: string;
  slug: string;
  created_at: string;
  image_url: string;
}

export default function RecycleBin() {
  const navigate = useNavigate();
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeletedPages();
  }, []);

  const fetchDeletedPages = async () => {
    try {
      const { data, error } = await gql<{ landing_pages: LandingPage[] }>(
        `query GetDeletedPages {
          landing_pages(where: { status: { _eq: "Deleted" } }, order_by: { created_at: desc }) {
            id
            channel_name
            channel_title
            slug
            created_at
            image_url
          }
        }`,
      );
      if (error) throw new Error(error);
      setPages(data?.landing_pages ?? []);
    } catch {
      toast.error("Failed to load deleted pages");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const { error } = await gql(
        `mutation RestorePage($id: uuid!) {
          update_landing_pages_by_pk(pk_columns: { id: $id }, _set: { status: "Active" }) {
            id
          }
        }`,
        { id },
      );
      if (error) throw new Error(error);
      toast.success("Landing page restored");
      navigate("/dashboard");
    } catch (err) {
      console.error("Restore failed:", err);
      toast.error("Failed to restore");
    }
  };

  const handlePermanentDelete = async (id: string) => {
    try {
      const { error } = await gql(
        `mutation PermanentDeletePage($id: uuid!) {
          delete_landing_pages_by_pk(id: $id) {
            id
          }
        }`,
        { id },
      );
      if (error) throw new Error(error);
      toast.success("Landing page permanently deleted");
      fetchDeletedPages();
    } catch (err) {
      console.error("Permanent delete failed:", err);
      toast.error("Failed to permanently delete");
    }
  };

  return (
    <PageContainer allowScroll className="bg-background">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 pb-8 sm:pb-14 pt-4 sm:pt-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>

        <Card className="rounded-xl sm:rounded-2xl border-border bg-card shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between rounded-t-xl sm:rounded-t-2xl border-b border-border bg-muted/50 px-4 sm:px-6 py-4 sm:py-5">
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold text-foreground">
                Recycle Bin
              </CardTitle>
              <CardDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground">
                Recover soft-deleted landing pages or permanently delete them
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <div className="py-10 text-center text-muted-foreground text-sm">
                Loading...
              </div>
            ) : pages.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground text-sm">
                Recycle bin is empty.
              </div>
            ) : (
              <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-16">
                        Logo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[150px]">
                        Channel Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[200px]">
                        Path
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[140px]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {pages.map((page) => (
                      <tr
                        key={page.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="h-7 w-7 overflow-hidden rounded-full bg-muted ring-1 ring-border">
                            <img
                              src={page.image_url || "/placeholder.svg"}
                              alt={page.channel_title || "Logo"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-base font-medium text-foreground">
                            {page.channel_name}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                          /{page.slug}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 rounded-lg border-emerald-700 text-emerald-500 hover:bg-emerald-950/50 px-2"
                              onClick={() => handleRestore(page.id)}
                            >
                              <RefreshCcw className="h-4 w-4 mr-1.5" /> Restore
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 rounded-lg border-rose-700 text-rose-500 hover:bg-rose-950/50 px-2"
                                >
                                  <Trash2 className="h-4 w-4 mr-1.5" /> Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="rounded-2xl">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Permanently Delete?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete "
                                    {page.channel_title}". This action CANNOT be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="rounded-xl">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handlePermanentDelete(page.id)
                                    }
                                    className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete Permanently
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
