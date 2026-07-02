import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  Download,
  Building,
  Coins,
  Link,
  Info,
  Layers,
  Wand2,
  Printer,
  Search,
  Shield,
  Lock,
  Trash2,
  Plus,
  ChevronLeft,
  Save,
  FileSpreadsheet,
  Edit,
  Loader2,
  LogOut,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/supabaseClient";
import {
  mapBlueprintToProposal,
  parseBlueprintText,
  compileProposalHtml,
  ProposalData,
  ScopeItem,
  DeliverableItem,
  TimelinePhase,
  CommercialItem,
  ClientRequirementItem,
} from "@/lib/proposalTemplate";

export default function QuotationPage() {
  const navigate = useNavigate();
  const editorTabs = [
    { label: "Core Details", icon: Building },
    { label: "Scope of Work", icon: Layers },
    { label: "Timeline", icon: FileText },
    { label: "Commercials", icon: Coins },
    { label: "Deliverables", icon: CheckCircle },
    { label: "Payment Terms", icon: Coins },
    { label: "Validity & Notes", icon: Info },
    { label: "CTA & Contact", icon: Link },
  ];
  const [activeTab, setActiveTab] = useState<"manual" | "status" | "admin">("manual");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  const [generatedBlueprintText, setGeneratedBlueprintText] = useState("");

  // Admin Panel Gate State
  const [adminAuthorized, setAdminAuthorized] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "1";
  });
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  // Quotation editor states
  const [quotations, setQuotations] = useState<any[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [quoteView, setQuoteView] = useState<"list" | "edit" | "preview">("list");
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const [editedQuoteData, setEditedQuoteData] = useState<ProposalData | null>(null);
  const [editorTab, setEditorTab] = useState<number>(0);

  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [iframeLoadedCount, setIframeLoadedCount] = useState(0);
  const prevTabRef = React.useRef<number>(0);

  // Scroll sync effect: scrolls the PDF preview iframe to the corresponding section when the tab changes or content updates
  useEffect(() => {
    if (quoteView !== "edit" || !editedQuoteData) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const idMap = [
      "sec-core",
      "sec-scope",
      "sec-timeline",
      "sec-commercials",
      "sec-deliverables",
      "sec-payments",
      "sec-validity",
      "sec-cta"
    ];
    const targetId = idMap[editorTab];
    if (!targetId) return;

    const handleScroll = () => {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      const element = doc.getElementById(targetId);
      if (element) {
        const isTabChange = prevTabRef.current !== editorTab;
        element.scrollIntoView({
          behavior: isTabChange ? "smooth" : "auto",
          block: "start"
        });
      }
      prevTabRef.current = editorTab;
    };

    // A tiny timeout ensures the iframe document has parsed/rendered its content and updated height
    const timer = setTimeout(handleScroll, 100);
    return () => clearTimeout(timer);
  }, [editorTab, iframeLoadedCount, quoteView, editedQuoteData]);

  // Import text modal
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");

  // Newly created quotation state
  const [createdQuotation, setCreatedQuotation] = useState<any | null>(null);

  // Manual form state
  const [manualForm, setManualForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    projectName: "",
    websiteType: "ecommerce",
    budget: "₹50000",
    referenceUrl: "",
    domainAvailable: "no",
    hostingAvailable: "no",
    requirements: "",
  });

  // Track Status State
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleManualChange = (
    key: string,
    val: string
  ) => {
    setManualForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleTrackStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) {
      toast.error("Please enter your Reference Key.");
      return;
    }
    setSearchLoading(true);
    setSearched(true);
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from("website_quotations")
          .select("*")
          .eq("id", searchId.trim());
        if (error) throw error;
        if (data && data.length > 0) {
          setSearchResult(data[0]);
        } else {
          setSearchResult(null);
        }
      } else {
        const stored = JSON.parse(localStorage.getItem("website_quotations") || "[]");
        const found = stored.find((q: any) => q.id === searchId.trim());
        setSearchResult(found || null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error retrieving status. Checking local storage.");
      const stored = JSON.parse(localStorage.getItem("website_quotations") || "[]");
      const found = stored.find((q: any) => q.id === searchId.trim());
      setSearchResult(found || null);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleDownloadPDF = (parsedData: any, clientName: string) => {
    toast.info("Compiling PDF document...");
    const html = compileProposalHtml(parsedData);
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Pop-up blocked. Please allow popups to retrieve PDF.");
      return;
    }
    printWindow.document.write(html);
    printWindow.document.close();

    const script = printWindow.document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => {
      const opt = {
        margin: 0,
        filename: `Business-Proposal-${clientName.replace(/\s+/g, "-")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      (printWindow as any).html2pdf().from(printWindow.document.body).set(opt).save().then(() => {
        setTimeout(() => printWindow.close(), 1000);
      });
    };
    printWindow.document.head.appendChild(script);
  };

  const handlePrintPDF = (parsedData: any) => {
    const html = compileProposalHtml(parsedData);
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Pop-up blocked.");
      return;
    }
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // =========================================================================
  // ADMIN & APPROVAL SECTION HANDLERS
  // =========================================================================

  useEffect(() => {
    if (activeTab === "admin" || activeTab === "status") {
      fetchQuotations();
    }
  }, [activeTab]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    if (adminEmail.trim() === "shwetchourey0@gmail.com" && adminPass === "HtmlMeta@07") {
      sessionStorage.setItem("admin_auth", "1");
      setAdminAuthorized(true);
      toast.success("Welcome back, Administrator!");
    } else {
      toast.error("Invalid administrator credentials.");
    }
    setAdminLoading(false);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAdminAuthorized(false);
    setQuotations([]);
    toast.success("Administrator logged out.");
  };

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

  const handleImportTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) {
      toast.error("Please paste website blueprint output.");
      return;
    }

    try {
      const parsed = parseBlueprintText(importText);
      const clientName = parsed.clientName || "Valued Client";
      const websiteType = parsed.websiteType || "saas";
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
    setEditorTab(0);
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
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // Helper to compile manual inputs into a standard blueprint text format
  const generateBlueprintFromManual = () => {
    const f = manualForm;
    return `
🚀 WEBSITE BLUEPRINT

═══════════════════════
👤 CLIENT REQUIREMENTS
═══════════════════════

Name: ${f.clientName}

Website Type:
${f.websiteType}

Budget:
${f.budget}

Reference Website:
${f.referenceUrl || "None provided"}

Domain Available:
${f.domainAvailable}

Hosting Available:
${f.hostingAvailable}

═══════════════════════
🎨 DESIGN SYSTEM
═══════════════════════

UI Style:
Modern, user-centric clean aesthetic

Layout:
Optimized standard landing layout with custom sections

Typography:
Inter / Sans-serif clean web fonts

Color System:
Harmonious modern color palette matching brand guidelines

═══════════════════════
🖥 FRONTEND SYSTEM
═══════════════════════

Pages:
• Home
• Listing Page
• Product/Item Details
• About Us
• Contact Us
• Request Form

Components:
• Header / Navigation Bar
• Footer
• Information Card
• Contact Form Component
• Call To Action (CTA) Banner

Routing:
Single Page / Standard client-side routing

State Management:
Local React state context

═══════════════════════
⚙ BACKEND SYSTEM
═══════════════════════

Architecture:
Monolithic Standard Serverless Architecture

Authentication:
Simple credentials lookup / Session storage

Database:
Relational SQL schemas for information storage

Business Logic:
• User feedback capture
• Analytics logging
• Dynamic pages configuration

═══════════════════════
🔌 API LAYER
═══════════════════════

Internal APIs:
• Lead capture API
• Analytics API

External Integrations:
• Basic contact notification webhook

API Pattern:
RESTful HTTP endpoints

═══════════════════════
🛠 TECHNOLOGY STACK
═══════════════════════

Frontend:
React, Tailwind CSS

Backend:
Node.js (Serverless functions)

Database:
PostgreSQL / Supabase Storage

Hosting:
Vercel / Netlify Cloud Hosting

═══════════════════════
📋 MVP PLAN
═══════════════════════

• Phase 1: Interactive Prototype and Front-end Setup
• Phase 2: Form submission APIs and database schema staging
• Phase 3: Launch staging review and client sandbox handover
`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let blueprintText = "";
    let clientName = "";
    let email = "";
    let phone = "";
    let projectName = "";
    let websiteType = "";
    let budget = "";
    let referenceUrl = "";

    // Format the payload to look exactly like the Tally Form Response payload expected by the n8n workflow
    const payload = {
      eventId: "Q-" + Date.now().toString(),
      eventType: "FORM_RESPONSE",
      createdAt: new Date().toISOString(),
      data: {
        responseId: "R-" + Date.now().toString().slice(-6),
        submissionId: "S-" + Date.now().toString().slice(-6),
        formId: "PdY4B5",
        formName: "Client Details",
        createdAt: new Date().toISOString(),
        fields: [
          {
            key: "question_eEB7qo",
            label: "client_name",
            type: "INPUT_TEXT",
            value: manualForm.clientName
          },
          {
            key: "question_W0AMOQ",
            label: "client_website_type",
            type: "INPUT_TEXT",
            value: manualForm.websiteType
          },
          {
            key: "question_aGBDQy",
            label: "client_budget",
            type: "INPUT_NUMBER",
            value: parseInt(manualForm.budget.replace(/[^0-9]/g, "")) || 0
          },
          {
            key: "question_6xdO85",
            label: "client_reference_website_name",
            type: "INPUT_TEXT",
            value: manualForm.projectName
          },
          {
            key: "question_7oZDWZ",
            label: "client_has_domain",
            type: "INPUT_TEXT",
            value: manualForm.domainAvailable
          },
          {
            key: "question_bLOk7L",
            label: "client_has_hosting",
            type: "INPUT_TEXT",
            value: manualForm.hostingAvailable
          },
          {
            key: "question_7ZdVRz",
            label: "client_reference_website_url",
            type: "INPUT_LINK",
            value: manualForm.referenceUrl || "https://none.provided/"
          }
        ]
      }
    };

    // Manual form validation and setup
    if (
      !manualForm.clientName.trim() ||
      !manualForm.email.trim() ||
      !manualForm.projectName.trim()
    ) {
      toast.error("Please fill in all required fields (Name, Email, Project Name).");
      setLoading(false);
      return;
    }
    blueprintText = generateBlueprintFromManual();
    clientName = manualForm.clientName;
    email = manualForm.email;
    phone = manualForm.phone;
    projectName = manualForm.projectName;
    websiteType = manualForm.websiteType;
    budget = manualForm.budget;
    referenceUrl = manualForm.referenceUrl;

    let proposalData: ProposalData | null = null;

    try {
      // Use local dev server proxy to bypass CORS, fallback to direct webhook url in production
      const targetUrl = import.meta.env.DEV
        ? "/api/n8n-webhook"
        : "https://n8n.getaipilot.in/webhook/e5d3d3a8-2851-4690-9467-d73ffb51f402";

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        const responseObj = Array.isArray(responseData) ? responseData[0] : responseData;
        
        if (responseObj) {
          if (responseObj.parsed_data) {
            proposalData = responseObj.parsed_data;
            toast.success("Successfully loaded proposal data from n8n workflow!");
            if (proposalData) {
              if (proposalData.preparedFor) clientName = proposalData.preparedFor;
              if (proposalData.projectName) projectName = proposalData.projectName;
              if (proposalData.totalProjectValue) budget = proposalData.totalProjectValue;
            }
          } else if (responseObj.website_blueprint) {
            blueprintText = responseObj.website_blueprint;
            toast.success("Successfully analyzed by n8n workflow!");
            
            // Re-parse the blueprint returned by n8n
            const parsed = parseBlueprintText(blueprintText);
            if (parsed.clientName) clientName = parsed.clientName;
            if (parsed.websiteType) websiteType = parsed.websiteType;
            if (parsed.budget) budget = parsed.budget;
            if (parsed.referenceUrl) referenceUrl = parsed.referenceUrl;
          }
        }
      } else {
        toast.warning("n8n workflow was unreachable. Compiled local draft proposal.");
      }
    } catch (err) {
      console.error("n8n webhook error:", err);
      toast.warning("Unable to reach n8n workflow. Using local draft.");
    }

    if (!proposalData) {
      proposalData = mapBlueprintToProposal(blueprintText);
    }
    proposalData.preparedFor = clientName;
    proposalData.projectName = projectName;
    proposalData.totalProjectValue = budget;
    if (email !== "pending-contact@example.com") {
      proposalData.contactEmail = email;
    }
    if (phone) {
      proposalData.contactPhone = phone;
    }

    const id = "Q-" + Date.now().toString().slice(-6);
    const databaseRecord = {
      client_name: clientName,
      email: email,
      phone: phone || null,
      project_name: projectName,
      website_type: websiteType,
      budget: budget,
      reference_url: referenceUrl || null,
      raw_blueprint: blueprintText,
      parsed_data: proposalData,
      status: "Pending",
    };

    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from("website_quotations")
          .insert([databaseRecord])
          .select();

        if (error) throw error;
        if (data && data.length > 0) {
          setCreatedQuotation(data[0]);
        } else {
          setCreatedQuotation({ id, ...databaseRecord, created_at: new Date().toISOString() });
        }
        toast.success("Saved to Supabase database successfully!");
      } else {
        // Fallback to localStorage
        const storedQuotes = JSON.parse(localStorage.getItem("website_quotations") || "[]");
        const newRecord = {
          id: id,
          ...databaseRecord,
          created_at: new Date().toISOString(),
        };
        storedQuotes.push(newRecord);
        localStorage.setItem("website_quotations", JSON.stringify(storedQuotes));
        setCreatedQuotation(newRecord);
        toast.info("Supabase not configured. Saved to Local Storage.");
      }

      setGeneratedId(id);
      setGeneratedBlueprintText(blueprintText);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error("Database connection failed. Falling back to local storage.");
      
      // LocalStorage Fallback even on DB runtime error
      const storedQuotes = JSON.parse(localStorage.getItem("website_quotations") || "[]");
      const newRecord = {
        id: id,
        ...databaseRecord,
        created_at: new Date().toISOString(),
      };
      storedQuotes.push(newRecord);
      localStorage.setItem("website_quotations", JSON.stringify(storedQuotes));
      setCreatedQuotation(newRecord);
      
      setGeneratedId(id);
      setGeneratedBlueprintText(blueprintText);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };



  const downloadAnalysisFile = () => {
    const blob = new Blob([generatedBlueprintText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `website-blueprint-analysis-${generatedId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Blueprint text file downloaded!");
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0E0E10] text-foreground flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card/40 border border-border/80 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Quotation Submitted!</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Your website requirements have been parsed and sent to the administrator for review. An approved PDF proposal will be generated shortly.
          </p>

          <div className="bg-muted/40 rounded-2xl p-4 mb-6 border border-border/50 text-left space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Reference Key:</span>
              <span className="font-mono font-medium text-foreground">{generatedId}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Status:</span>
              <span className="text-yellow-400 font-semibold">Pending Approval</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => {
                if (createdQuotation) {
                  setSuccess(false);
                  setActiveTab("admin");
                  handleReviewQuote(createdQuotation);
                } else {
                  setSuccess(false);
                  setActiveTab("admin");
                  setQuoteView("list");
                }
              }}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl h-11 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform active:scale-[0.99]"
            >
              <Shield className="h-4 w-4" /> Go to Approve &amp; Edit Page
            </Button>
            <Button
              onClick={downloadAnalysisFile}
              className="w-full h-11 border-border/60 hover:bg-muted text-foreground font-medium rounded-xl flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" /> Download Analysis Text File
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full h-11 border-border/60 hover:bg-muted text-foreground font-medium rounded-xl"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isReviewingOrEditing = activeTab === "admin" && (quoteView === "edit" || quoteView === "preview");

  return (
    <div className={`bg-[#0E0E10] text-foreground transition-all duration-300 h-screen overflow-hidden ${
      isReviewingOrEditing 
        ? "flex flex-col" 
        : "flex"
    }`}>
      {/* Left Sidebar Menu */}
      {!isReviewingOrEditing && (
        <aside className="w-72 border-r border-border/60 bg-card/25 backdrop-blur-xl flex flex-col justify-between p-6 shrink-0 h-screen">
          <div className="space-y-8">
            {/* Logo / Brand Header */}
            <div className="flex items-center gap-2.5 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow shadow-violet-500/30">
                <Wand2 className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white uppercase">Quotation Flow</span>
            </div>

            {/* Navigation Tabs (Vertical Menu) */}
            <nav className="space-y-1.5">
              <button
                onClick={() => setActiveTab("manual")}
                className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "manual"
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                }`}
              >
                <FileText className="h-4 w-4" /> Request Manually
              </button>
              <button
                onClick={() => { setActiveTab("status"); setSearched(false); setSearchResult(null); }}
                className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "status"
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                }`}
              >
                <CheckCircle className="h-4 w-4" /> Track Status
              </button>
              <button
                onClick={() => setActiveTab("admin")}
                className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "admin"
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                }`}
              >
                <Shield className="h-4 w-4" /> Approve &amp; Edit
              </button>
            </nav>
          </div>

          {/* Footer Navigation */}
          <div className="border-t border-border/40 pt-5">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-rose-950/10 hover:text-rose-400 transition-all border border-transparent hover:border-rose-950/20"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </button>
          </div>
        </aside>
      )}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Preview Focus Mode Header */}
        {isReviewingOrEditing && (
          <header className="sticky top-0 z-50 border-b border-border/60 bg-[#0E0E10]/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <button
                onClick={() => setQuoteView("list")}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                <ArrowLeft className="h-4 w-4" /> Back to List
              </button>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow shadow-violet-500/30">
                  <Wand2 className="h-3.5 w-3.5" />
                </div>
                <span className="font-bold text-sm tracking-tight text-white">Quotation Editor Workspace</span>
              </div>
            </div>
          </header>
        )}

        <main className={`mx-auto transition-all duration-300 ${
          isReviewingOrEditing 
            ? "flex-1 min-h-0 w-full max-w-[1600px] flex flex-col overflow-hidden px-4 mt-2 pb-4" 
            : `px-6 mt-4 flex-1 overflow-y-auto pb-6 w-full ${activeTab === "admin" ? "max-w-7xl" : "max-w-4xl"}`
        }`}>
          {/* Header Title Section inside Main Container */}
          {!isReviewingOrEditing && (
            <div className="mb-4 border-b border-border/40 pb-3">
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                {activeTab === "admin" 
                  ? "Quotation Approval Workspace" 
                  : activeTab === "status" 
                  ? "Track Proposal Status" 
                  : "Get Website Quotation Proposal"}
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                {activeTab === "admin"
                  ? "Review, edit, approve, and export client quotation requests into finalized proposal documents."
                  : activeTab === "status"
                  ? "Find and download approved business proposals by tracking reference keys or browsing the dashboard list."
                  : "Enter your custom website parameters manually to compile a structured commercial project proposal."}
              </p>
            </div>
          )}

          {/* Card Panel */}
        {activeTab === "admin" ? (
          /* Admin Workspace Dashboard */
          <div className={isReviewingOrEditing ? "flex-1 min-h-0 flex flex-col overflow-hidden" : "space-y-6"}>
            {/* VIEW: QUOTATIONS LIST */}
            {quoteView === "list" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Quotations Proposals</h2>
                      <p className="text-xs text-muted-foreground">
                        Manage, edit, and approve business proposals generated from your workflow blueprints.
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowImport(true)}
                      className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs h-9 rounded-lg"
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
                        <form onSubmit={handleImportTextSubmit} className="space-y-4">
                          <Textarea
                            placeholder="🚀 WEBSITE BLUEPRINT..."
                            rows={12}
                            value={importText}
                            onChange={(e) => setImportText(e.target.value)}
                            className="font-mono text-xs resize-none bg-muted/20 border-border"
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

                  {/* Table List */}
                  <div className="rounded-2xl border border-border/60 bg-card/30 overflow-hidden shadow-xl backdrop-blur-md">
                    {loadingQuotes ? (
                      <div className="p-8 text-center text-muted-foreground flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-violet-500" /> Loading quotations...
                      </div>
                    ) : quotations.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground text-sm">
                        No quotation requests found. You can import blueprint outputs or submit from the public form.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
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
                              <tr key={quote.id} className="hover:bg-muted/10 transition-colors">
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
                                      className="h-8 gap-1.5 border-violet-500/30 text-violet-400 hover:bg-violet-600 hover:text-white transition-all text-xs"
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
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VIEW: EDIT QUOTATION */}
              {quoteView === "edit" && editedQuoteData && (
                <div className="flex-1 min-h-0 flex flex-col space-y-4 overflow-hidden animate-in fade-in duration-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-3 shrink-0 gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuoteView("list")}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium border border-border bg-muted/20 hover:bg-muted/50 px-2.5 py-1.5 rounded-lg"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" /> Back
                      </button>
                      <div>
                        <h2 className="text-base font-bold text-foreground leading-tight">Review &amp; Edit Proposal</h2>
                        <p className="text-[10px] text-muted-foreground">Modify quotation parameters and approve the proposal</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleExportHtml} className="gap-1 text-[11px] h-8 px-2.5">
                        <Download className="h-3.5 w-3.5 text-violet-400" /> Export HTML
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleExportPdf} className="gap-1 text-[11px] h-8 px-2.5">
                        <Download className="h-3.5 w-3.5 text-emerald-400" /> Export PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePrintPdf} className="gap-1 text-[11px] h-8 px-2.5">
                        <Printer className="h-3.5 w-3.5 text-amber-400" /> Print PDF
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSaveProposalEdits}
                        className="gap-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20 text-xs h-8 px-3"
                      >
                        <Save className="h-3.5 w-3.5" /> Save &amp; Approve
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                    {/* Left Column: Tabbed Forms */}
                    <div className="lg:col-span-7 xl:col-span-6 flex flex-col min-h-0 pb-6">
                      {/* Tabs Navigation (Sticky at top of left column) */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 border-b border-border/40 mb-4 shrink-0 scrollbar-hide">
                        {editorTabs.map((tab, idx) => {
                          const Icon = tab.icon;
                          const isActive = editorTab === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => setEditorTab(idx)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                                isActive
                                  ? "bg-violet-600/10 text-violet-400 border-violet-500/30"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/10 border-transparent"
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {tab.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Tab Form Content (Scrollable Container) */}
                      <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0 scrollbar-hide">
                        {editorTab === 0 && (
                          /* 1. Core Proposal Details */
                          <div className="bg-card border border-border rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-left-2 duration-200">
                            <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Building className="h-3.5 w-3.5" /> 1. Core Proposal Details
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <F label="Client Name (Prepared For)">
                                <Input
                                  value={editedQuoteData.preparedFor}
                                  onChange={(e) =>
                                    setEditedQuoteData({ ...editedQuoteData, preparedFor: e.target.value })
                                  }
                                  className="h-9 text-xs"
                                />
                              </F>
                              <F label="Project Title Name">
                                <Input
                                  value={editedQuoteData.projectName}
                                  onChange={(e) =>
                                    setEditedQuoteData({ ...editedQuoteData, projectName: e.target.value })
                                  }
                                  className="h-9 text-xs"
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
                                  className="h-9 text-xs"
                                />
                              </F>
                              <F label="Issue Date">
                                <Input
                                  type="date"
                                  value={editedQuoteData.issueDate}
                                  onChange={(e) =>
                                    setEditedQuoteData({ ...editedQuoteData, issueDate: e.target.value })
                                  }
                                  className="h-9 text-xs"
                                />
                              </F>
                              <F label="Validity Window text">
                                <Input
                                  value={editedQuoteData.validUntil}
                                  onChange={(e) =>
                                    setEditedQuoteData({ ...editedQuoteData, validUntil: e.target.value })
                                  }
                                  className="h-9 text-xs"
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
                                  className="h-9 text-xs"
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
                                  className="h-9 text-xs"
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
                                  className="h-9 text-xs"
                                />
                              </F>
                              <F label="Logo Accent Text">
                                <Input
                                  value={editedQuoteData.logoSubText}
                                  onChange={(e) =>
                                    setEditedQuoteData({ ...editedQuoteData, logoSubText: e.target.value })
                                  }
                                  className="h-9 text-xs"
                                />
                              </F>
                            </div>
                          </div>
                        )}

                        {editorTab === 1 && (
                          /* 2. Scope of Work */
                          <div className="bg-card border border-border rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-left-2 duration-200">
                            <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Layers className="h-3.5 w-3.5" /> 2. Scope of Work (5 Modules)
                            </h3>
                            {editedQuoteData.scopeOfWork.map((scope, idx) => (
                              <div key={scope.id} className="border-b border-border/40 pb-4 last:border-b-0 last:pb-0 space-y-2">
                                <div className="flex justify-between items-center text-[11px] font-semibold text-muted-foreground">
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
                                  className="h-8 text-xs font-semibold"
                                />
                                <Textarea
                                  value={scope.description}
                                  onChange={(e) => {
                                    const updated = [...editedQuoteData.scopeOfWork];
                                    updated[idx].description = e.target.value;
                                    setEditedQuoteData({ ...editedQuoteData, scopeOfWork: updated });
                                  }}
                                  placeholder="Description"
                                  rows={2.5}
                                  className="text-xs resize-none bg-muted/10 border-border"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {editorTab === 2 && (
                          /* 3. Timeline Phases */
                          <div className="bg-card border border-border rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-left-2 duration-200">
                            <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                              <FileText className="h-3.5 w-3.5" /> 3. Project Timeline Phases
                            </h3>
                            {editedQuoteData.timeline.map((item, idx) => (
                              <div key={item.id} className="border-b border-border/40 pb-3 last:border-b-0 last:pb-0 grid gap-3 sm:grid-cols-3">
                                <F label={`Phase Label #${idx + 1}`}>
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
                                <F label="Milestone Target">
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
                                <F label="Duration">
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
                        )}

                        {editorTab === 3 && (
                          /* 4. Commercial Breakdown */
                          <div className="bg-card border border-border rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-left-2 duration-200">
                            <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Coins className="h-3.5 w-3.5" /> 4. Commercial Breakdown splits
                            </h3>
                            {editedQuoteData.commercialBreakdown.map((item, idx) => (
                              <div key={item.id} className="border-b border-border/40 pb-3 last:border-b-0 last:pb-0 grid gap-3 sm:grid-cols-3 items-end">
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
                        )}

                        {editorTab === 4 && (
                          /* 5. Deliverables */
                          <div className="bg-card border border-border rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-left-2 duration-200">
                            <div className="flex justify-between items-center">
                              <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircle className="h-3.5 w-3.5" /> 5. Deliverables
                              </h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newDeliv: DeliverableItem = {
                                    id: "deliv-" + Date.now(),
                                    text: "New deliverable checklist item",
                                  };
                                  setEditedQuoteData({
                                    ...editedQuoteData,
                                    deliverables: [...editedQuoteData.deliverables, newDeliv],
                                  });
                                }}
                                className="h-7 text-[11px] text-violet-400 hover:text-violet-300 hover:bg-violet-950/20 px-2 rounded-lg"
                              >
                                <Plus className="h-3 w-3 mr-1" /> Add Item
                              </Button>
                            </div>
                            <div className="space-y-3">
                              {editedQuoteData.deliverables.map((item, idx) => (
                                <div key={item.id} className="flex gap-2 items-start bg-muted/10 p-2.5 rounded-xl border border-border/30">
                                  <span className="text-xs mt-2 text-muted-foreground font-semibold">{idx + 1}.</span>
                                  <Textarea
                                    value={item.text}
                                    onChange={(e) => {
                                      const updated = [...editedQuoteData.deliverables];
                                      updated[idx].text = e.target.value;
                                      setEditedQuoteData({ ...editedQuoteData, deliverables: updated });
                                    }}
                                    rows={2}
                                    className="text-xs resize-none flex-1 bg-transparent border-0 focus-visible:ring-0 p-0"
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
                                    className="h-7 w-7 p-0 text-rose-500 hover:bg-rose-950/20 rounded-lg"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {editorTab === 5 && (
                          /* 6. Payment Terms */
                          <div className="bg-card border border-border rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-left-2 duration-200">
                            <div className="flex justify-between items-center">
                              <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Coins className="h-3.5 w-3.5" /> 6. Payment Terms
                              </h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditedQuoteData({
                                    ...editedQuoteData,
                                    paymentTerms: [...editedQuoteData.paymentTerms, "New payment term milestones"],
                                  });
                                }}
                                className="h-7 text-[11px] text-violet-400 hover:text-violet-300 hover:bg-violet-950/20 px-2 rounded-lg"
                              >
                                <Plus className="h-3 w-3 mr-1" /> Add Term
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
                                    className="h-7 w-7 p-0 text-rose-500 hover:bg-rose-950/20 rounded-lg"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {editorTab === 6 && (
                          /* 7. Validity & Notes */
                          <div className="bg-card border border-border rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-left-2 duration-200">
                            <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Info className="h-3.5 w-3.5" /> 7. Validity &amp; Notes
                            </h3>
                            <Textarea
                              value={editedQuoteData.validityNotes}
                              onChange={(e) =>
                                setEditedQuoteData({ ...editedQuoteData, validityNotes: e.target.value })
                              }
                              rows={4}
                              className="text-xs resize-none bg-muted/10 border-border"
                            />
                          </div>
                        )}

                        {editorTab === 7 && (
                          /* 8. CTA & Contact Info */
                          <div className="bg-card border border-border rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-left-2 duration-200">
                            <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Link className="h-3.5 w-3.5" /> 8. CTA &amp; Contact Info
                            </h3>
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
                                rows={3}
                                className="text-xs resize-none bg-muted/10 border-border"
                              />
                            </F>
                            <div className="grid gap-4 sm:grid-cols-2">
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
                              <F label="Contact Phone Number">
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
                        )}
                      </div>

                      {/* Sticky Navigation Footer */}
                      <div className="flex items-center justify-between border-t border-border pt-4 mt-4 shrink-0">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={editorTab === 0}
                            onClick={() => setEditorTab((prev) => Math.max(0, prev - 1))}
                            className="text-xs h-9"
                          >
                            Previous
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={editorTab === editorTabs.length - 1}
                            onClick={() => setEditorTab((prev) => Math.min(editorTabs.length - 1, prev + 1))}
                            className="text-xs h-9"
                          >
                            Next
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setQuoteView("list")} className="h-9">
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSaveProposalEdits}
                            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-lg shadow-violet-500/20 text-xs h-9 px-4 rounded-lg"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" /> Save &amp; Approve
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Live Sticky Preview Frame */}
                    <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 flex-col min-h-0 h-full bg-card border border-border rounded-2xl overflow-hidden p-2 shadow-xl">
                      <div className="bg-muted/30 border-b border-border py-2.5 px-4 flex justify-between items-center text-xs text-muted-foreground shrink-0 rounded-t-xl">
                        <span className="font-semibold flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-violet-400" /> A4 Live Document Preview
                        </span>
                        <span className="font-mono text-[10px] bg-muted px-2 py-0.5 rounded border border-border">
                          {editedQuoteData.preparedFor ? `${editedQuoteData.preparedFor.toLowerCase().replace(/\s+/g, "-")}-proposal.pdf` : "proposal.pdf"}
                        </span>
                      </div>
                      {/* Live Render Frame */}
                      <iframe
                        ref={iframeRef}
                        onLoad={() => setIframeLoadedCount((c) => c + 1)}
                        title="Proposal PDF Document Live Render Preview"
                        srcDoc={compileProposalHtml(editedQuoteData)}
                        className="flex-1 w-full bg-white border-0 rounded-b-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW: PROPOSAL PREVIEW */}
              {quoteView === "preview" && editedQuoteData && (
                <div className="flex-1 min-h-0 flex flex-col space-y-4 overflow-hidden animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-3 shrink-0">
                    <button
                      onClick={() => setQuoteView("edit")}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium border border-border bg-muted/20 hover:bg-muted/50 px-2.5 py-1.5 rounded-lg"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" /> Back to editor
                    </button>
                    <div>
                      <h2 className="text-base font-bold">Proposal Preview &amp; Export</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={handleExportHtml} className="gap-1.5 text-xs h-8">
                        <Download className="h-3.5 w-3.5 text-violet-400" /> Export HTML
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleExportPdf} className="gap-1.5 text-xs h-8">
                        <Download className="h-3.5 w-3.5 text-emerald-400" /> Export PDF
                      </Button>
                      <Button
                        size="sm"
                        onClick={handlePrintPdf}
                        className="gap-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-lg shadow-violet-500/20 text-xs h-8 px-4 rounded-lg"
                      >
                        <Printer className="h-3.5 w-3.5" /> Print / Save PDF
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 bg-card border border-border rounded-3xl overflow-hidden p-2 shadow-2xl flex flex-col max-w-[850px] mx-auto w-full">
                    <div className="bg-muted/30 border-b border-border py-2 px-4 flex justify-between text-xs text-muted-foreground shrink-0 rounded-t-2xl">
                      <span>A4 Document Preview Layout</span>
                      <span className="font-mono">confidential-proposal.pdf</span>
                    </div>
                    {/* Live Render Frame */}
                    <iframe
                      title="Proposal PDF Document Live Render Preview"
                      srcDoc={compileProposalHtml(editedQuoteData)}
                      className="flex-1 w-full bg-white border-0"
                    />
                  </div>
          </div>
        )}
      </div>
    ) : (
      /* User views */
          <div className="bg-card/40 border border-border/80 rounded-3xl p-5 md:p-6 shadow-xl backdrop-blur-md">
            {activeTab === "status" ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground font-medium">Enter Quotation Reference Key *</Label>
                  <form onSubmit={handleTrackStatus} className="flex gap-2">
                    <Input
                      placeholder="e.g., Q-123456 or UUID"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="bg-muted/30 border-border/60 h-10 flex-1"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={searchLoading}
                      className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl h-10 px-5 flex items-center justify-center gap-2"
                    >
                      {searchLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} Track Status
                    </Button>
                  </form>
                </div>

                {searched && (
                  <div className="border-t border-border/40 pt-6 animate-in fade-in duration-200">
                    {searchResult ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/20 border border-border/50 rounded-2xl">
                          <div>
                            <h3 className="font-bold text-base text-foreground">{searchResult.project_name}</h3>
                            <p className="text-xs text-muted-foreground">Prepared for: {searchResult.client_name}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              searchResult.status === "Approved"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            }`}
                          >
                            {searchResult.status}
                          </span>
                        </div>

                        {searchResult.status === "Approved" ? (
                          <div className="space-y-4">
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-3">
                              <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                                <CheckCircle className="h-4 w-4" /> Quotation Proposal Approved!
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Your project proposal has been finalized. You can now download the official Business Proposal PDF below.
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleDownloadPDF(searchResult.parsed_data || searchResult.data, searchResult.client_name)}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-9 rounded-lg gap-1.5"
                                >
                                  <Download className="h-3.5 w-3.5" /> Download Proposal PDF
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handlePrintPDF(searchResult.parsed_data || searchResult.data)}
                                  className="text-xs h-9 border-border/50 rounded-lg gap-1.5"
                                >
                                  <Printer className="h-3.5 w-3.5" /> View &amp; Print
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl space-y-2">
                            <h4 className="text-sm font-semibold text-yellow-400">Analysis Staged &amp; Under Review</h4>
                            <p className="text-xs text-muted-foreground">
                              The workflow has successfully analyzed your website blueprint. The proposal is currently awaiting final admin approval. Check back shortly to download your PDF!
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground text-sm bg-muted/10 border border-border/40 rounded-2xl">
                        No quotation record found for reference key: <span className="font-mono text-foreground font-semibold">{searchId}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* List of All Quotations (Client Tracking View) */}
                <div className="mt-8 border-t border-border/40 pt-6 space-y-4">
                  <h3 className="text-sm font-bold text-foreground">All Quotation Proposals</h3>
                  <div className="rounded-2xl border border-border/60 bg-card/30 overflow-hidden shadow-xl backdrop-blur-md">
                    {loadingQuotes ? (
                      <div className="p-8 text-center text-muted-foreground flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-violet-500" /> Loading quotations...
                      </div>
                    ) : quotations.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground text-sm">
                        No quotation requests found. You can submit a request using the manual form or via n8n workflow.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                              <th className="px-4 py-3 text-left">Client Name</th>
                              <th className="px-4 py-3 text-left">Project Title</th>
                              <th className="px-4 py-3 text-center">Budget</th>
                              <th className="px-4 py-3 text-center">Status</th>
                              <th className="px-4 py-3 text-center">Submitted At</th>
                              <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {quotations.map((quote) => (
                              <tr key={quote.id} className="hover:bg-muted/10 transition-colors">
                                <td className="px-4 py-3 font-semibold text-foreground">
                                  {quote.client_name}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                  {quote.project_name}
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
                                <td className="px-4 py-3 text-center">
                                  {quote.status === "Approved" ? (
                                    <div className="flex justify-center gap-1.5">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDownloadPDF(quote.parsed_data || quote.data, quote.client_name)}
                                        className="h-8 gap-1.5 text-xs text-emerald-400 border-emerald-500/20 hover:bg-emerald-600 hover:text-white"
                                      >
                                        <Download className="h-3.5 w-3.5" /> PDF
                                      </Button>
                                    </div>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">Under Review</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  {/* Manual Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground">Client Name / Company *</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="e.g. ABC Technologies"
                          value={manualForm.clientName}
                          onChange={(e) => handleManualChange("clientName", e.target.value)}
                          className="pl-10 h-10 bg-muted/30 border-border/60"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground">Project Name *</Label>
                      <div className="relative">
                        <Info className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="e.g. Website Overhaul"
                          value={manualForm.projectName}
                          onChange={(e) => handleManualChange("projectName", e.target.value)}
                          className="pl-10 h-10 bg-muted/30 border-border/60"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground">Email Address *</Label>
                      <Input
                        type="email"
                        placeholder="client@example.com"
                        value={manualForm.email}
                        onChange={(e) => handleManualChange("email", e.target.value)}
                        className="h-10 bg-muted/30 border-border/60"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground">Phone Number</Label>
                      <Input
                        type="tel"
                        placeholder="+91 99999 99999"
                        value={manualForm.phone}
                        onChange={(e) => handleManualChange("phone", e.target.value)}
                        className="h-10 bg-muted/30 border-border/60"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground">Website Type</Label>
                      <select
                        value={manualForm.websiteType}
                        onChange={(e) => handleManualChange("websiteType", e.target.value)}
                        className="w-full h-10 bg-muted/30 border border-border/60 rounded-lg px-3 text-sm focus:border-violet-500 outline-none text-foreground bg-[#1A1A1E]"
                      >
                        <option value="ecommerce">E-Commerce</option>
                        <option value="saas">SaaS Landing</option>
                        <option value="corporate">Corporate Site</option>
                        <option value="blog">Blog / Content</option>
                        <option value="portfolio">Portfolio</option>
                        <option value="custom">Custom Web App</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground">Target Budget *</Label>
                      <div className="relative">
                        <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="e.g. ₹50,000"
                          value={manualForm.budget}
                          onChange={(e) => handleManualChange("budget", e.target.value)}
                          className="pl-10 h-10 bg-muted/30 border-border/60"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground">Reference Website URL</Label>
                      <div className="relative">
                        <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="https://example.com"
                          value={manualForm.referenceUrl}
                          onChange={(e) => handleManualChange("referenceUrl", e.target.value)}
                          className="pl-10 h-10 bg-muted/30 border-border/60"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground">Domain Available?</Label>
                      <select
                        value={manualForm.domainAvailable}
                        onChange={(e) => handleManualChange("domainAvailable", e.target.value)}
                        className="w-full h-10 bg-muted/30 border border-border/60 rounded-lg px-3 text-sm focus:border-violet-500 outline-none text-foreground bg-[#1A1A1E]"
                      >
                        <option value="yes">Yes, already bought</option>
                        <option value="no">No, need guidance</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground">Hosting Setup Available?</Label>
                      <select
                        value={manualForm.hostingAvailable}
                        onChange={(e) => handleManualChange("hostingAvailable", e.target.value)}
                        className="w-full h-10 bg-muted/30 border border-border/60 rounded-lg px-3 text-sm focus:border-violet-500 outline-none text-foreground bg-[#1A1A1E]"
                      >
                        <option value="yes">Yes, server ready</option>
                        <option value="no">No, need configuration</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground">Detailed Requirements / Target Features</Label>
                    <Textarea
                      placeholder="List the pages, layouts, visual directions, target platforms, custom integrations (e.g. payment gateway, shipping updates, authentication, admin dashboard)..."
                      rows={4}
                      value={manualForm.requirements}
                      onChange={(e) => handleManualChange("requirements", e.target.value)}
                      className="resize-none bg-muted/30 border-border/60 focus:border-violet-500 text-sm"
                    />
                  </div>
                </div>

                {/* Submission Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 hover:scale-[1.01] transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>Processing Quotation Analysis...</>
                  ) : (
                    <>
                      <Layers className="h-4 w-4" /> Parse &amp; Submit Quotation Request
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        )}
      </main>
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
