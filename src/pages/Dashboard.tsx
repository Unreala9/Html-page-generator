import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nhost, gql, signOut } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Plus,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Users,
  Copy,
  Check,
  Search,
  Bell,
  Shield,
  AlertCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PageContainer from "@/components/pageContainer";
import { useUserApproval } from "@/hooks/use-user-approval";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LandingPage {
  id: string;
  user_id: string;
  channel_name: string;
  channel_title: string;
  channel_subscribers: number;
  slug: string;
  created_at: string;
  page_views: number;
  image_url: string;
  status: string;
  channel_desc1?: string;
  channel_desc2?: string;
  channel_link: string;
  design_style: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    isApproved,
    isAdmin,
    approvalStatus,
    loading: approvalLoading,
  } = useUserApproval();

  useEffect(() => {
    fetchLandingPages();
    const session = nhost.getUserSession();
    setCurrentUserId(session?.user?.id ?? null);
  }, []);

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const fetchLandingPages = async () => {
    try {
      const { data, error } = await gql<{
        landing_pages: LandingPage[];
      }>(
        `query GetLandingPages {
          landing_pages(where: { status: { _neq: "Deleted" } }, order_by: { created_at: desc }) {
            id
            user_id
            channel_name
            channel_title
            channel_subscribers
            slug
            created_at
            page_views
            image_url
            status
            channel_desc1
            channel_desc2
            channel_link
            design_style
          }
        }`,
      );

      if (error) throw new Error(error);
      setPages(data?.landing_pages ?? []);
    } catch {
      toast.error("Failed to load landing pages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await gql(
        `mutation SoftDeletePage($id: uuid!) {
          update_landing_pages_by_pk(pk_columns: { id: $id }, _set: { status: "Deleted" }) {
            id
          }
        }`,
        { id },
      );
      if (error) throw new Error(error);
      toast.success("Landing page moved to recycle bin");
      fetchLandingPages();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete");
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
    toast.success("Logged out");
  };

  const copyToClipboard = (slug: string, id: string) => {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Link copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pages;

    return pages.filter((p) => {
      const title = (p.channel_title || "").toLowerCase();
      const name = (p.channel_name || "").toLowerCase();
      const slug = (p.slug || "").toLowerCase();
      const link = (p.channel_link || "").toLowerCase();
      const desc1 = (p.channel_desc1 || "").toLowerCase();
      const desc2 = (p.channel_desc2 || "").toLowerCase();
      const status = (p.status || "").toLowerCase();
      const subs = (p.channel_subscribers || "").toString();
      const views = (p.page_views || "").toString();
      const fullUrl = `${window.location.origin}/${p.slug || ""}`.toLowerCase();

      return (
        title.includes(q) ||
        name.includes(q) ||
        slug.includes(q) ||
        link.includes(q) ||
        desc1.includes(q) ||
        desc2.includes(q) ||
        status.includes(q) ||
        subs.includes(q) ||
        views.includes(q) ||
        fullUrl.includes(q)
      );
    });
  }, [pages, query]);

  // Pagination Logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedPages = filtered.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <PageContainer allowScroll className="bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 mx-auto w-full bg-transparent/0 backdrop-blur">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 pt-4 sm:pt-8">
          <div className="rounded-xl sm:rounded-2xl border-border bg-card shadow-sm">
            <div className="flex flex-col gap-3 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4">
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                    {isAdmin ? "Admin Dashboard" : "Dashboard"}
                  </h1>
                  {isAdmin && (
                    <Badge
                      variant="outline"
                      className="bg-purple-950/30 text-purple-300 border-purple-700 text-xs"
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      <span className="hidden sm:inline">Admin</span>
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Rows Per Page Selector */}
                  <Select
                    value={pageSize.toString()}
                    onValueChange={(val) => {
                      setPageSize(Number(val));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[100px] h-8 sm:h-9 rounded-xl border-border bg-card text-xs sm:text-sm">
                      <SelectValue placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 rows</SelectItem>
                      <SelectItem value="10">10 rows</SelectItem>
                      <SelectItem value="20">20 rows</SelectItem>
                      <SelectItem value="50">50 rows</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="ghost"
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl border-border bg-card hover:bg-muted md:hidden"
                  >
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="gap-2 rounded-xl border-border bg-card text-foreground hover:bg-muted text-xs sm:text-sm h-8 sm:h-9 px-3 hidden md:flex"
                  >
                    <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>

              {/* Search bar */}
              <div className="flex w-full items-center gap-3 rounded-xl border-border bg-muted px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <input
                  placeholder="Search landing pages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                />
                {query.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Action buttons (Mobile only now as logout moved up) */}
              <div className="flex items-center gap-2 flex-wrap md:hidden">
                {isAdmin && (
                  <Button
                    variant="outline"
                    onClick={() => navigate("/admin")}
                    className="gap-2 rounded-xl border-purple-700 bg-purple-950/30 text-purple-300 hover:bg-purple-950/50 text-xs sm:text-sm h-8 sm:h-9 px-3"
                  >
                    <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">Admin Panel</span>
                    <span className="xs:hidden">Admin</span>
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="gap-2 rounded-xl border-border bg-card text-foreground hover:bg-muted text-xs sm:text-sm h-8 sm:h-9 px-3 ml-auto"
                >
                  <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Logout</span>
                </Button>
              </div>
              {/* Desktop Admin Button */}
              {isAdmin && (
                <div className="hidden md:flex justify-start mt-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/admin")}
                    className="gap-2 rounded-xl border-purple-700 bg-purple-950/30 text-purple-300 hover:bg-purple-950/50 text-xs sm:text-sm h-8 sm:h-9 px-3"
                  >
                    <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Admin Panel</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-3 sm:px-4 pb-8 sm:pb-14 pt-4 sm:pt-6">
        {/* Approval Status Alert */}
        {!approvalLoading && !isApproved && (
          <Alert className="mb-4 sm:mb-6 border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
            <AlertTitle className="text-yellow-800 font-semibold text-sm sm:text-base">
              {approvalStatus === "pending" && "⏳ Approval Pending"}
              {approvalStatus === "rejected" && "❌ Access Denied"}
            </AlertTitle>
            <AlertDescription className="text-yellow-700 text-xs sm:text-sm">
              {approvalStatus === "pending" && (
                <>
                  Your account is awaiting admin approval. You cannot create
                  landing pages until your account is approved.
                  <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Please wait for an administrator to review your request.
                  </div>
                </>
              )}
              {approvalStatus === "rejected" &&
                "Your access request has been rejected by an administrator. Please contact support for more information."}
            </AlertDescription>
          </Alert>
        )}

        {/* Pages */}
        <Card className="rounded-xl sm:rounded-2xl border-border bg-card shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between rounded-t-xl sm:rounded-t-2xl border-b border-border bg-muted/50 px-4 sm:px-6 py-4 sm:py-5">
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold text-foreground">
                Your Landing Pages
              </CardTitle>
              <CardDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground">
                Manage and track all your channel landing pages
              </CardDescription>
            </div>

            <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/recycle-bin")}
                className="gap-2 rounded-xl border-border bg-card text-foreground hover:bg-muted text-xs sm:text-sm h-8 sm:h-9 px-3 w-full sm:w-auto"
                title="View Recycle Bin"
              >
                <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Recycle Bin</span>
              </Button>
              <Button
                onClick={() => navigate("/create")}
                size="sm"
                disabled={!isApproved}
                className="rounded-xl w-full sm:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md hover:from-violet-700 hover:to-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm h-8 sm:h-9"
                title={
                  !isApproved
                    ? "Your account needs admin approval to create pages"
                    : "Create new landing page"
                }
              >
                <Plus className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Create New
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <div className="py-10 text-center text-muted-foreground text-sm">
                Loading...
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground text-sm">
                No landing pages found.
              </div>
            ) : (
              <>
                <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12">
                          #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-16">
                          Logo
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[150px]">
                          Channel Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[150px]">
                          Channel Link
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[200px]">
                          Landing Page URL
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider w-20">
                          Design
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">
                          Subscribers
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider w-20">
                          Views
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[140px]">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                      {paginatedPages.map((page, index) => (
                        <tr
                          key={page.id}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          {/* Serial */}
                          <td className="px-4 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600/90 text-sm font-bold text-white">
                              {startIndex + index + 1}
                            </div>
                          </td>

                          {/* Logo */}
                          <td className="px-4 py-3">
                            <div className="h-7 w-7 overflow-hidden rounded-full bg-muted ring-1 ring-border">
                              <img
                                src={page.image_url || "/placeholder.svg"}
                                alt={page.channel_title || "Logo"}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </td>

                          {/* Channel Name */}
                          <td className="px-4 py-3">
                            <button
                              onClick={() =>
                                window.open(`/${page.slug}`, "_blank")
                              }
                              className="text-base font-medium text-violet-500 hover:text-violet-400 hover:underline cursor-pointer transition-colors text-left"
                            >
                              {page.channel_name}
                            </button>
                          </td>

                          {/* Telegram Channel Link */}
                          <td className="px-4 py-3 max-w-[150px]">
                            <a
                              href={page.channel_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:text-blue-400 hover:underline inline-flex items-center gap-1 w-full truncate"
                            >
                              <span className="truncate">
                                {(page.channel_link || "").replace(
                                  "https://t.me/",
                                  "",
                                )}
                              </span>
                              <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            </a>
                          </td>

                          {/* Landing Page URL */}
                          <td className="px-4 py-3 max-w-[200px]">
                            <button
                              onClick={() =>
                                copyToClipboard(page.slug, page.id)
                              }
                              className="font-mono text-sm text-muted-foreground hover:text-violet-500 cursor-pointer transition-colors inline-flex items-center gap-2 w-full"
                              title="Copy landing page link"
                            >
                              <span className="truncate">
                                {window.location.origin}/{page.slug}
                              </span>
                              {copiedId === page.id ? (
                                <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                              )}
                            </button>
                          </td>

                          {/* Design Style */}
                          <td className="px-4 py-3 text-center">
                            <Badge
                              variant="outline"
                              className="font-mono bg-blue-950/30 text-blue-400 border-blue-800"
                            >
                              #{page.design_style}
                            </Badge>
                          </td>

                          {/* Subscribers */}
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground border border-border">
                              <Users className="h-3.5 w-3.5" />
                              {Number(
                                page.channel_subscribers || 0,
                              ).toLocaleString()}
                            </span>
                          </td>

                          {/* Views */}
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground border border-border">
                              <Eye className="h-3.5 w-3.5" />
                              {Number(page.page_views || 0).toLocaleString()}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 rounded-lg border-border bg-card text-foreground hover:bg-muted p-0 flex-shrink-0"
                                onClick={() =>
                                  window.open(`/${page.slug}`, "_blank")
                                }
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 rounded-lg border-emerald-700 text-emerald-500 hover:bg-emerald-950/50 p-0 flex-shrink-0"
                                onClick={() => navigate(`/edit/${page.id}`)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>

                              <StatusBadge status={page.status} />

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 rounded-lg border-rose-700 text-rose-500 hover:bg-rose-950/50"
                                    title="Delete"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>

                                <AlertDialogContent className="rounded-2xl">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Landing Page?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete "
                                      {page.channel_title}". This action cannot
                                      be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="rounded-xl">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(page.id)}
                                      className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
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

                {/* Pagination Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border bg-muted/50 px-6 py-4 rounded-b-xl sm:rounded-b-2xl">
                  <div className="text-xs text-muted-foreground text-center sm:text-left">
                    Showing{" "}
                    <span className="font-medium text-foreground">
                      {filtered.length > 0 ? startIndex + 1 : 0}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-foreground">
                      {endIndex}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-foreground">
                      {totalItems}
                    </span>{" "}
                    results
                  </div>

                  <Pagination className="w-auto mx-0">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={`hover:bg-muted/80 h-9 px-4 rounded-lg bg-card border border-border/50 text-foreground transition-all ${
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }`}
                          size="default"
                        />
                      </PaginationItem>

                      {getPageNumbers().map((pageNum, idx) => (
                        <PaginationItem key={idx}>
                          {pageNum === "..." ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              isActive={currentPage === pageNum}
                              onClick={() =>
                                handlePageChange(pageNum as number)
                              }
                              size="sm"
                              className={`h-9 w-9 rounded-lg border text-sm font-medium transition-all ${
                                currentPage === pageNum
                                  ? "bg-violet-600 border-violet-600 text-white hover:bg-violet-700 hover:text-white"
                                  : "bg-card border-border/50 text-foreground hover:bg-muted/80 hover:text-foreground"
                              }`}
                            >
                              {pageNum}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(currentPage + 1)}
                          className={`hover:bg-muted/80 h-9 px-4 rounded-lg bg-card border border-border/50 text-foreground transition-all ${
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }`}
                          size="default"
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </PageContainer>
  );
}

// Helper to render badge with custom styles matching screenshot
function StatusBadge({ status }: { status: string }) {
  if (status === "Active") {
    return (
      <Badge className="bg-white text-black hover:bg-white/90 border-0 font-medium px-4 py-0.5 rounded-full">
        Active
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="px-3 py-0.5 rounded-full">
      {status}
    </Badge>
  );
}
