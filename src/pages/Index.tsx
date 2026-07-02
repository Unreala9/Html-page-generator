import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Wand2,
  FileText,
  Sparkles,
  Download,
  ShieldCheck,
  Layers,
  Coins,
  BarChart3,
  ArrowRight,
  Zap,
  CheckCircle2,
  Settings,
  ChevronRight,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      title: "20+ Premium Design Themes",
      desc: "Fully responsive, premium designs ranging from clean minimalist layouts to glassmorphism and modern gradient styles.",
      icon: Sparkles,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    },
    {
      title: "Self-Contained HTML Exports",
      desc: "Download zero-dependency HTML files with all styling, images, and logic embedded inlined for effortless hosting.",
      icon: Download,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Analytics & Pixel Tracking",
      desc: "Seamlessly inject Meta Pixel and Google Analytics tracking codes into your generated page files on export.",
      icon: BarChart3,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Split-Screen Live PDF Preview",
      desc: "Draft official business quotations using an 8-tab form layout with a real-time side-by-side A4 document preview.",
      icon: FileText,
      color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    },
    {
      title: "Tab-Scroll Sync Engine",
      desc: "Switching form tabs instantly scrolls the PDF preview to the corresponding section smoothly, even during live edits.",
      icon: Layers,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Enterprise Admin Controls",
      desc: "Authorized admin reviews, proposal storage with Supabase integration, and instant quote PDF compiling.",
      icon: ShieldCheck,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Select Your Tool",
      desc: "Choose between building a Telegram landing page or drafting a professional client proposal.",
    },
    {
      num: "02",
      title: "Fill Project Details",
      desc: "Use our streamlined edit panel, or let the n8n automation ingest your client's blueprint specifications.",
    },
    {
      num: "03",
      title: "Live Preview & Refine",
      desc: "Watch the generated A4 layout or landing preview update in real-time as you tweak the details.",
    },
    {
      num: "04",
      title: "Export & Handover",
      desc: "Instantly download a standalone, single-file HTML or print the proposal to PDF with a single click.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080C] text-foreground flex flex-col font-sans relative overflow-x-hidden selection:bg-violet-500/30 selection:text-violet-200">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-[#08080C]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30 animate-pulse">
              <Wand2 className="h-5 w-5 text-white" />
            </div>
            <div className="leading-none">
              <span className="font-extrabold text-lg text-foreground tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                HTML Generator
              </span>
              <span className="ml-2.5 text-xs text-muted-foreground bg-muted/60 border border-border/40 px-2 py-0.5 rounded-full hidden sm:inline">
                Suite v2.1
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin")}
              className="text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 gap-1.5 h-9"
            >
              <ShieldCheck className="h-4 w-4" /> Admin Portal
            </Button>
            <Button
              onClick={() => navigate("/builder")}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-xs shadow-lg shadow-violet-500/25 h-9 px-4 rounded-xl hover:opacity-90 transition-opacity"
            >
              Start Building
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-6 animate-fade-in">
          <Zap className="h-3.5 w-3.5 fill-violet-400/20" />
          <span>Next-Gen Static Document & Page Engine</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6">
          Create Stunning{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
            Landing Pages
          </span>{" "}
          &{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
            Proposals
          </span>{" "}
          in Seconds
        </h1>
        
        <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          The ultimate utility suite for creators and developers. Generate self-contained, lightweight landing pages or design high-quality PDF business quotations using real-time side-by-side renderers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate("/builder")}
            className="w-full sm:w-auto h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm shadow-xl shadow-violet-500/20 rounded-2xl px-8 gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <Wand2 className="h-4.5 w-4.5" /> Launch Landing Builder
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/quotation")}
            className="w-full sm:w-auto h-12 border-border/80 hover:bg-muted/40 font-bold text-sm rounded-2xl px-8 gap-2 text-foreground hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <FileText className="h-4.5 w-4.5 text-violet-400" /> Quotation &amp; PDF Engine
          </Button>
        </div>
      </section>

      {/* Main Core Tool Cards Section */}
      <section className="relative z-10 py-12 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-10 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Select a Specialized Core Utility
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Landing Page Builder */}
          <div className="group relative rounded-3xl border border-border/50 bg-[#0E0E14]/60 backdrop-blur-xl p-8 hover:border-violet-500/40 hover:bg-[#12121A]/70 hover:shadow-2xl hover:shadow-violet-500/5 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/10 rounded-bl-full blur-2xl group-hover:bg-violet-600/20 transition-all duration-300 pointer-events-none" />
            <div>
              <div className="h-12 w-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
                <Wand2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-violet-400 transition-colors">Landing Page Builder</h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-6">
                Build mobile-optimized, high-converting Telegram channel landing pages. Customize titles, graphics, and descriptions, choose from 20 predesigned templates, embed tracking codes, and download self-contained `.html` bundles instantly.
              </p>
              <ul className="space-y-2 mb-8 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-violet-500" /> 20 Elegant Themes Included</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-violet-500" /> Meta Pixel &amp; Google Tag Injection</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-violet-500" /> No Database Required — Instant HTML</li>
              </ul>
            </div>
            <Button
              onClick={() => navigate("/builder")}
              className="w-full h-11 bg-muted hover:bg-violet-600 hover:text-white text-foreground transition-all duration-300 rounded-xl gap-2 font-semibold text-xs border border-border/50"
            >
              Open Builder Panel <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Card 2: Quotation & Proposal Engine */}
          <div className="group relative rounded-3xl border border-border/50 bg-[#0E0E14]/60 backdrop-blur-xl p-8 hover:border-emerald-500/40 hover:bg-[#12121A]/70 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/10 rounded-bl-full blur-2xl group-hover:bg-emerald-600/20 transition-all duration-300 pointer-events-none" />
            <div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">Quotation &amp; PDF Engine</h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-6">
                Review automated client blueprints or draft business estimates manually. Use our side-by-side editing interface, which dynamically scrolls the A4 proposal view to focus on the active form tab. Export professional HTML or print official PDFs.
              </p>
              <ul className="space-y-2 mb-8 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 8-Tab Detailed Proposal Parameters</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Live Split-Screen A4 Document Preview</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Automated Scroll Sync on Tab Change</li>
              </ul>
            </div>
            <Button
              onClick={() => navigate("/quotation")}
              className="w-full h-11 bg-muted hover:bg-emerald-600 hover:text-white text-foreground transition-all duration-300 rounded-xl gap-2 font-semibold text-xs border border-border/50"
            >
              Open Quotation Engine <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto w-full border-t border-border/30 mt-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Powering Speed &amp; Accuracy</h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto">
            Engineered with modern front-end technologies to maximize productivity and yield professional results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-border/40 bg-[#0E0E14]/30 hover:border-border hover:bg-card/20 transition-all duration-300 flex items-start gap-4"
              >
                <div className={`h-10 w-10 shrink-0 rounded-xl border flex items-center justify-center ${feat.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground mb-1">{feat.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto w-full border-t border-border/30 mt-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Simple 4-Step Process</h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto">
            From raw customer blueprint to a fully production-ready page or proposal in under a minute.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl border border-border/40 bg-card/10 hover:border-violet-500/25 transition-all duration-300"
            >
              <span className="absolute top-4 right-4 text-3xl font-black text-violet-500/10 leading-none">
                {step.num}
              </span>
              <h4 className="font-bold text-sm text-foreground mb-2">{step.title}</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 bg-card/25 py-8 mt-auto px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white font-bold text-xs shadow-md">
              W
            </div>
            <span>&copy; 2026 HTML Generator Workspace. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate("/admin")} className="hover:text-foreground transition-colors">Admin Login</button>
            <button onClick={() => navigate("/builder")} className="hover:text-foreground transition-colors">Landing Builder</button>
            <button onClick={() => navigate("/quotation")} className="hover:text-foreground transition-colors">Quotation Tool</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
