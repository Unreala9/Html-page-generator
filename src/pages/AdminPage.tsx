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
  FileText,
  Briefcase,
  ChevronLeft,
  Printer,
  Edit,
  Save,
  CheckCircle,
  FileSpreadsheet,
} from "lucide-react";
import { downloadHtml, DESIGN_NAMES } from "@/lib/exportHtml";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/supabaseClient";
import {
  compileProposalHtml,
  mapBlueprintToProposal,
  ProposalData,
  ScopeItem,
  DeliverableItem,
  TimelinePhase,
  CommercialItem,
  ClientRequirementItem,
} from "@/lib/proposalTemplate";

const DESIGN_LIST = Object.entries(DESIGN_NAMES).map(([k, v]) => ({
  id: Number(k),
  label: v,
}));

const DESIGN_EMOJIS: Record<number, string> = {
  1: "🎨", 2: "🌙", 3: "✨", 4: "🌊", 5: "💎", 6: "🌟", 7: "🔮", 8: "⚪", 9: "🌈", 10: "🌿",
  11: "🌅", 12: "🟣", 13: "🎨", 14: "✨", 15: "💨", 16: "🌊", 17: "🖼️", 18: "💡", 19: "⚪", 20: "☁️",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
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

  // =========================================================================
  // WEBSITE QUOTATION WORKFLOW STATE & METHODS
  // =========================================================================
  const [quotations, setQuotations] = useState<any[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [quoteView, setQuoteView] = useState<"list" | "edit" | "preview">("list");
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const [editedQuoteData, setEditedQuoteData] = useState<ProposalData | null>(null);

  // Import text modal
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setLoadingQuotes(true);
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from("website_quotations")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setQuotations(data || []);
      } else {
        const stored = JSON.parse(localStorage.getItem("website_quotations") || "[]");
        stored.sort(
          (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setQuotations(stored);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load quotations. Loading from Local Storage.");
      const stored = JSON.parse(localStorage.getItem("website_quotations") || "[]");
      stored.sort(
        (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setQuotations(stored);
    } finally {
      setLoadingQuotes(false);
    }
  };

  const handleImportText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) {
      toast.error("Please paste website blueprint output.");
      return;
    }

    try {
      const parsed = parseBlueprintText(importText);
      const clientName = parsed.clientName || "Valued Client";
      const websiteType = parsed.websiteType || "web-application";
      const budget = parsed.budget || "₹30000";
      const refUrl = parsed.referenceUrl || "";
      const proposal = mapBlueprintToProposal(importText);

      const dbRecord = {
        client_name: clientName,
        email: "imported-admin@example.com",
        phone: null,
        project_name: parsed.websiteType
          ? `${parsed.websiteType.toUpperCase()} Development`
          : "Web Application Project",
        website_type: websiteType,
        budget: budget,
        reference_url: refUrl || null,
        raw_blueprint: importText,
        parsed_data: proposal,
        status: "Pending",
      };

      if (isSupabaseConfigured()) {
        const { error } = await supabase.from("website_quotations").insert([dbRecord]);
        if (error) throw error;
        toast.success("Blueprint imported and saved to Supabase!");
      } else {
        const id = "Q-" + Date.now().toString().slice(-6);
        const stored = JSON.parse(localStorage.getItem("website_quotations") || "[]");
        stored.push({
          id,
          ...dbRecord,
          created_at: new Date().toISOString(),
        });
        localStorage.setItem("website_quotations", JSON.stringify(stored));
        toast.info("Supabase not active. Saved to local storage.");
      }

      setImportText("");
      setShowImport(false);
      fetchQuotations();
    } catch (err) {
      console.error(err);
      toast.error("Import failed.");
    }
  };

  const handleDeleteQuotation = async (id: string | number) => {
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from("website_quotations").delete().eq("id", id);
        if (error) throw error;
      } else {
        const stored = JSON.parse(localStorage.getItem("website_quotations") || "[]");
        const filtered = stored.filter((q: any) => q.id !== id);
        localStorage.setItem("website_quotations", JSON.stringify(filtered));
      }
      toast.success("Quotation deleted successfully!");
      fetchQuotations();
    } catch {
      toast.error("Failed to delete quotation.");
    }
  };

  const handleReviewQuote = (quote: any) => {
    setSelectedQuote(quote);
    setEditedQuoteData(quote.parsed_data || quote.data);
    setQuoteView("edit");
  };

  const handleSaveProposalEdits = async () => {
    if (!selectedQuote || !editedQuoteData) return;
    try {
      const updatedRecord = {
        ...selectedQuote,
        parsed_data: editedQuoteData,
        status: "Approved",
        updated_at: new Date().toISOString(),
      };

      if (isSupabaseConfigured()) {
        const { error } = await supabase
          .from("website_quotations")
          .update({
            parsed_data: editedQuoteData,
            status: "Approved",
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedQuote.id);
        if (error) throw error;
      } else {
        const stored = JSON.parse(localStorage.getItem("website_quotations") || "[]");
        const idx = stored.findIndex((q: any) => q.id === selectedQuote.id);
        if (idx !== -1) {
          stored[idx] = updatedRecord;
          localStorage.setItem("website_quotations", JSON.stringify(stored));
        }
      }
      toast.success("Proposal saved & approved!");
      setQuoteView("preview");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes.");
    }
  };

  const handleExportHtml = () => {
    if (!editedQuoteData) return;
    const html = compileProposalHtml(editedQuoteData);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Business-Proposal-${editedQuoteData.preparedFor.replace(/\s+/g, "-")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("HTML proposal downloaded!");
  };

  const handleExportPdf = () => {
    if (!editedQuoteData) return;
    toast.info("Compiling PDF document...");

    const html = compileProposalHtml(editedQuoteData);
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Pop-up blocked. Please enable popups to download PDF.");
      return;
    }

    printWindow.document.write(html);
    printWindow.document.close();

    // Inject html2pdf script dynamically into the popup window for instant download
    const script = printWindow.document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => {
      const opt = {
        margin: 0,
        filename: `Business-Proposal-${editedQuoteData.preparedFor.replace(/\s+/g, "-")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      // Run html2pdf in the popup window
      (printWindow as any).html2pdf().from(printWindow.document.body).set(opt).save().then(() => {
        setTimeout(() => printWindow.close(), 1000);
      });
    };
    printWindow.document.head.appendChild(script);
  };

  const handlePrintPdf = () => {
    if (!editedQuoteData) return;
    const html = compileProposalHtml(editedQuoteData);
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Pop-up blocked.");
      return;
    }
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    // Give it a tiny bit of time to load before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
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
              <div className="font-bold text-foreground leading-none">Admin Panel</div>
              <div className="text-[11px] text-muted-foreground">HTML Generator & Proposal Workspace</div>
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

      {/* Main Panel Content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* SECTION: QUOTATIONS */}
          <div>
            {/* VIEW: QUOTATIONS LIST */}
            {quoteView === "list" && (
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Quotation Proposals</h1>
                    <p className="text-sm text-muted-foreground">
                      Manage, edit, and approve business proposals generated from your workflow blueprints.
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowImport(true)}
                    className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                  >
                    <FileSpreadsheet className="h-4 w-4" /> Import Blueprint Text
                  </Button>
                </div>

                {/* Import Modal */}
                {showImport && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl bg-card border border-border rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                      <h2 className="text-xl font-bold mb-2">Import Workflow Blueprint Output</h2>
                      <p className="text-xs text-muted-foreground mb-4">
                        Paste the raw text blueprint containing CLIENT REQUIREMENTS, DESIGN SYSTEM, FRONTEND SYSTEM, etc.
                      </p>
                      <form onSubmit={handleImportText} className="space-y-4">
                        <Textarea
                          placeholder="🚀 WEBSITE BLUEPRINT..."
                          rows={12}
                          value={importText}
                          onChange={(e) => setImportText(e.target.value)}
                          className="font-mono text-xs resize-none"
                          required
                        />
                        <div className="flex gap-2 justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowImport(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                          >
                            Parse &amp; Import
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Quotations List Table */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow">
                  {loadingQuotes ? (
                    <div className="p-8 text-center text-muted-foreground flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-violet-500" /> Loading quotations...
                    </div>
                  ) : quotations.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground text-sm">
                      No quotation requests found. You can import blueprint outputs or submit from the public form.
                    </div>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50 text-xs font-semibold text-muted-foreground uppercase">
                          <th className="px-4 py-3 text-left">Client Name</th>
                          <th className="px-4 py-3 text-left">Project Title</th>
                          <th className="px-4 py-3 text-left">Website Type</th>
                          <th className="px-4 py-3 text-center">Budget</th>
                          <th className="px-4 py-3 text-center">Status</th>
                          <th className="px-4 py-3 text-center">Submitted At</th>
                          <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {quotations.map((quote) => (
                          <tr key={quote.id} className="hover:bg-muted/20 transition-colors">
                            <td className="px-4 py-3 font-semibold text-foreground">
                              {quote.client_name}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {quote.project_name}
                            </td>
                            <td className="px-4 py-3 text-xs capitalize text-muted-foreground">
                              <span className="bg-muted px-2 py-0.5 rounded-full border border-border">
                                {quote.website_type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center font-medium text-foreground">
                              {quote.budget}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                  quote.status === "Approved"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                }`}
                              >
                                {quote.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center text-xs text-muted-foreground">
                              {new Date(quote.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleReviewQuote(quote)}
                                  className="h-8 gap-1.5 border-violet-500/30 text-violet-400 hover:bg-violet-600 hover:text-white transition-all"
                                >
                                  <Edit className="h-3.5 w-3.5" /> Review &amp; Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteQuotation(quote.id)}
                                  className="h-8 w-8 p-0 text-rose-500 border-rose-950/40 hover:bg-rose-950/20"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* VIEW: EDIT QUOTATION */}
            {quoteView === "edit" && editedQuoteData && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <button
                    onClick={() => setQuoteView("list")}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back to list
                  </button>
                  <h1 className="text-xl font-bold">Review &amp; Edit Proposal Details</h1>
                  <Button
                    onClick={handleSaveProposalEdits}
                    className="gap-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20"
                  >
                    <Save className="h-4 w-4" /> Save &amp; Preview
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {/* Left Column — Metadata Form */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Header Details Card */}
                    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                      <h2 className="text-sm font-semibold text-violet-400">1. Core Proposal Details</h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <F label="Client Name (Prepared For)">
                          <Input
                            value={editedQuoteData.preparedFor}
                            onChange={(e) =>
                              setEditedQuoteData({ ...editedQuoteData, preparedFor: e.target.value })
                            }
                          />
                        </F>
                        <F label="Project Title Name">
                          <Input
                            value={editedQuoteData.projectName}
                            onChange={(e) =>
                              setEditedQuoteData({ ...editedQuoteData, projectName: e.target.value })
                            }
                          />
                        </F>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <F label="Quote Reference ID">
                          <Input
                            value={editedQuoteData.quoteRef}
                            onChange={(e) =>
                              setEditedQuoteData({ ...editedQuoteData, quoteRef: e.target.value })
                            }
                          />
                        </F>
                        <F label="Issue Date">
                          <Input
                            type="date"
                            value={editedQuoteData.issueDate}
                            onChange={(e) =>
                              setEditedQuoteData({ ...editedQuoteData, issueDate: e.target.value })
                            }
                          />
                        </F>
                        <F label="Validity Window text">
                          <Input
                            value={editedQuoteData.validUntil}
                            onChange={(e) =>
                              setEditedQuoteData({ ...editedQuoteData, validUntil: e.target.value })
                            }
                          />
                        </F>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <F label="Prepared By (Agency)">
                          <Input
                            value={editedQuoteData.preparedBy}
                            onChange={(e) =>
                              setEditedQuoteData({ ...editedQuoteData, preparedBy: e.target.value })
                            }
                          />
                        </F>
                        <F label="Total Project Value">
                          <Input
                            value={editedQuoteData.totalProjectValue}
                            onChange={(e) =>
                              setEditedQuoteData({
                                ...editedQuoteData,
                                totalProjectValue: e.target.value,
                              })
                            }
                          />
                        </F>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <F label="Company Logo Main Text">
                          <Input
                            value={editedQuoteData.logoText}
                            onChange={(e) =>
                              setEditedQuoteData({ ...editedQuoteData, logoText: e.target.value })
                            }
                          />
                        </F>
                        <F label="Logo Accent Text">
                          <Input
                            value={editedQuoteData.logoSubText}
                            onChange={(e) =>
                              setEditedQuoteData({ ...editedQuoteData, logoSubText: e.target.value })
                            }
                          />
                        </F>
                      </div>
                    </div>

                    {/* Scope of Work Table Card */}
                    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                      <h2 className="text-sm font-semibold text-violet-400">2. Scope of Work (5 Modules)</h2>
                      {editedQuoteData.scopeOfWork.map((scope, idx) => (
                        <div key={scope.id} className="border-b border-border pb-3 last:border-b-0 space-y-2">
                          <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
                            <span>Module #{idx + 1}</span>
                          </div>
                          <Input
                            value={scope.module}
                            onChange={(e) => {
                              const updated = [...editedQuoteData.scopeOfWork];
                              updated[idx].module = e.target.value;
                              setEditedQuoteData({ ...editedQuoteData, scopeOfWork: updated });
                            }}
                            placeholder="Module Title"
                            className="h-8 text-sm font-semibold"
                          />
                          <Textarea
                            value={scope.description}
                            onChange={(e) => {
                              const updated = [...editedQuoteData.scopeOfWork];
                              updated[idx].description = e.target.value;
                              setEditedQuoteData({ ...editedQuoteData, scopeOfWork: updated });
                            }}
                            placeholder="Description"
                            rows={2}
                            className="text-xs resize-none"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Timeline Phases Card */}
                    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                      <h2 className="text-sm font-semibold text-violet-400">3. Project Timeline Phases</h2>
                      {editedQuoteData.timeline.map((item, idx) => (
                        <div key={item.id} className="border-b border-border pb-3 last:border-b-0 grid gap-3 sm:grid-cols-3">
                          <F label={`Phase label #${idx + 1}`}>
                            <Input
                              value={item.phase}
                              onChange={(e) => {
                                const updated = [...editedQuoteData.timeline];
                                updated[idx].phase = e.target.value;
                                setEditedQuoteData({ ...editedQuoteData, timeline: updated });
                              }}
                              className="h-8 text-xs"
                            />
                          </F>
                          <F label="Milestone Milestones Target">
                            <Input
                              value={item.milestones}
                              onChange={(e) => {
                                const updated = [...editedQuoteData.timeline];
                                updated[idx].milestones = e.target.value;
                                setEditedQuoteData({ ...editedQuoteData, timeline: updated });
                              }}
                              className="h-8 text-xs"
                            />
                          </F>
                          <F label="Duration Stated">
                            <Input
                              value={item.duration}
                              onChange={(e) => {
                                const updated = [...editedQuoteData.timeline];
                                updated[idx].duration = e.target.value;
                                setEditedQuoteData({ ...editedQuoteData, timeline: updated });
                              }}
                              className="h-8 text-xs"
                            />
                          </F>
                        </div>
                      ))}
                    </div>

                    {/* Commercials Card */}
                    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                      <h2 className="text-sm font-semibold text-violet-400">4. Commercial Breakdown splits</h2>
                      {editedQuoteData.commercialBreakdown.map((item, idx) => (
                        <div key={item.id} className="border-b border-border pb-3 last:border-b-0 grid gap-3 sm:grid-cols-3 items-end">
                          <div className="sm:col-span-2">
                            <F label={`Breakdown Item #${idx + 1}`}>
                              <Input
                                value={item.item}
                                onChange={(e) => {
                                  const updated = [...editedQuoteData.commercialBreakdown];
                                  updated[idx].item = e.target.value;
                                  setEditedQuoteData({
                                    ...editedQuoteData,
                                    commercialBreakdown: updated,
                                  });
                                }}
                                className="h-8 text-xs"
                              />
                            </F>
                          </div>
                          <div>
                            <F label="Cost / Fraction Value">
                              <Input
                                value={item.cost}
                                onChange={(e) => {
                                  const updated = [...editedQuoteData.commercialBreakdown];
                                  updated[idx].cost = e.target.value;
                                  setEditedQuoteData({
                                    ...editedQuoteData,
                                    commercialBreakdown: updated,
                                  });
                                }}
                                className="h-8 text-xs"
                              />
                            </F>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column — Sidebar Forms (Deliverables, terms) */}
                  <div className="space-y-6">
                    {/* Deliverables Checklist Card */}
                    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-semibold text-violet-400">5. Deliverables</h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newDeliv: DeliverableItem = {
                              id: "deliv-" + Date.now(),
                              text: "New deliverable checklist target item",
                            };
                            setEditedQuoteData({
                              ...editedQuoteData,
                              deliverables: [...editedQuoteData.deliverables, newDeliv],
                            });
                          }}
                          className="h-7 text-xs text-violet-400"
                        >
                          + Add Item
                        </Button>
                      </div>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto">
                        {editedQuoteData.deliverables.map((item, idx) => (
                          <div key={item.id} className="flex gap-2 items-start">
                            <span className="text-xs mt-2 text-muted-foreground">{idx + 1}.</span>
                            <Textarea
                              value={item.text}
                              onChange={(e) => {
                                const updated = [...editedQuoteData.deliverables];
                                updated[idx].text = e.target.value;
                                setEditedQuoteData({ ...editedQuoteData, deliverables: updated });
                              }}
                              rows={2}
                              className="text-xs resize-none flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const updated = editedQuoteData.deliverables.filter(
                                  (d) => d.id !== item.id
                                );
                                setEditedQuoteData({ ...editedQuoteData, deliverables: updated });
                              }}
                              className="h-7 w-7 p-0 text-rose-500 hover:bg-rose-950/20"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment Terms Bullet Points */}
                    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-semibold text-violet-400">6. Payment Terms</h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditedQuoteData({
                              ...editedQuoteData,
                              paymentTerms: [...editedQuoteData.paymentTerms, "New payment term milestones"],
                            });
                          }}
                          className="h-7 text-xs text-violet-400"
                        >
                          + Add Term
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {editedQuoteData.paymentTerms.map((term, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <Input
                              value={term}
                              onChange={(e) => {
                                const updated = [...editedQuoteData.paymentTerms];
                                updated[idx] = e.target.value;
                                setEditedQuoteData({ ...editedQuoteData, paymentTerms: updated });
                              }}
                              className="h-8 text-xs flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const updated = editedQuoteData.paymentTerms.filter(
                                  (_, index) => index !== idx
                                );
                                setEditedQuoteData({ ...editedQuoteData, paymentTerms: updated });
                              }}
                              className="h-7 w-7 p-0 text-rose-500 hover:bg-rose-950/20"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Validity & Notes Description */}
                    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                      <h2 className="text-sm font-semibold text-violet-400">7. Validity &amp; Notes</h2>
                      <Textarea
                        value={editedQuoteData.validityNotes}
                        onChange={(e) =>
                          setEditedQuoteData({ ...editedQuoteData, validityNotes: e.target.value })
                        }
                        rows={4}
                        className="text-xs resize-none"
                      />
                    </div>

                    {/* Contact Info Card */}
                    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                      <h2 className="text-sm font-semibold text-violet-400">8. CTA &amp; Contact Info</h2>
                      <F label="CTA Title Header">
                        <Input
                          value={editedQuoteData.ctaTitle}
                          onChange={(e) =>
                            setEditedQuoteData({ ...editedQuoteData, ctaTitle: e.target.value })
                          }
                          className="h-8 text-xs"
                        />
                      </F>
                      <F label="CTA Description Box">
                        <Textarea
                          value={editedQuoteData.ctaDescription}
                          onChange={(e) =>
                            setEditedQuoteData({ ...editedQuoteData, ctaDescription: e.target.value })
                          }
                          rows={2}
                          className="text-xs resize-none"
                        />
                      </F>
                      <div className="grid gap-2">
                        <F label="Contact Email">
                          <Input
                            value={editedQuoteData.contactEmail}
                            onChange={(e) =>
                              setEditedQuoteData({
                                ...editedQuoteData,
                                contactEmail: e.target.value,
                              })
                            }
                            className="h-8 text-xs"
                          />
                        </F>
                        <F label="Contact Phone number">
                          <Input
                            value={editedQuoteData.contactPhone}
                            onChange={(e) =>
                              setEditedQuoteData({
                                ...editedQuoteData,
                                contactPhone: e.target.value,
                              })
                            }
                            className="h-8 text-xs"
                          />
                        </F>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-end border-t border-border pt-4">
                  <Button variant="outline" onClick={() => setQuoteView("list")}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProposalEdits}
                    className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-lg shadow-violet-500/20"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Save &amp; Generate HTML Preview
                  </Button>
                </div>
              </div>
            )}

            {/* VIEW: PROPOSAL PREVIEW */}
            {quoteView === "preview" && editedQuoteData && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                  <button
                    onClick={() => setQuoteView("edit")}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back to editor
                  </button>
                  <h1 className="text-xl font-bold">Proposal Preview &amp; Export</h1>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={handleExportHtml} className="gap-1.5">
                      <Download className="h-4 w-4 text-violet-400" /> Export HTML
                    </Button>
                    <Button variant="outline" onClick={handleExportPdf} className="gap-1.5">
                      <Download className="h-4 w-4 text-emerald-400" /> Export PDF
                    </Button>
                    <Button
                      onClick={handlePrintPdf}
                      className="gap-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-lg shadow-violet-500/20"
                    >
                      <Printer className="h-4 w-4" /> Print / Save PDF
                    </Button>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl overflow-hidden p-2 shadow-2xl flex flex-col min-h-[70vh]">
                  <div className="bg-muted/30 border-b border-border py-2 px-4 flex justify-between text-xs text-muted-foreground">
                    <span>A4 Document Preview Layout</span>
                    <span className="font-mono">confidential-proposal.pdf</span>
                  </div>
                  {/* Live Render Frame */}
                  <iframe
                    title="Proposal PDF Document Live Render Preview"
                    srcDoc={compileProposalHtml(editedQuoteData)}
                    className="flex-1 w-full bg-white border-0 min-h-[65vh]"
                  />
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

