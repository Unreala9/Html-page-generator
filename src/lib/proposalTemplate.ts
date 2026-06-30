/**
 * proposalTemplate.ts
 * Dynamic HTML compiler, regex parser, and defaults for generating the business proposal.
 */

import { LOGO_BASE64 } from "./logoBase64";

export interface ScopeItem {
  id: string;
  module: string;
  description: string;
}

export interface DeliverableItem {
  id: string;
  text: string;
}

export interface TimelinePhase {
  id: string;
  phase: string;
  milestones: string;
  duration: string;
}

export interface CommercialItem {
  id: string;
  item: string;
  cost: string; // allocated fraction or cost amount
}

export interface ClientRequirementItem {
  id: string;
  asset: string;
  instructions: string;
}

export interface ProposalData {
  logoText: string;
  logoSubText: string;
  documentTitle: string;
  heroLetter: string;
  heroTitle: string;
  heroSubTitle: string;
  proposalTitle: string;
  proposalSubTitle: string;

  // Metadata
  preparedFor: string;
  preparedBy: string;
  projectName: string;
  quoteRef: string;
  issueDate: string;
  validUntil: string;

  // Tables & Content lists
  scopeOfWork: ScopeItem[];
  deliverables: DeliverableItem[];
  timeline: TimelinePhase[];
  commercialBreakdown: CommercialItem[];
  totalProjectValue: string;

  // Bottom blocks
  paymentTerms: string[];
  validityNotes: string;

  // Requirements
  clientRequirements: ClientRequirementItem[];

  // CTA
  ctaTitle: string;
  ctaDescription: string;
  contactEmail: string;
  contactPhone: string;
}

/** Parses the text block output of the workflow into structured attributes */
export function parseBlueprintText(text: string): Record<string, any> {
  const result: Record<string, any> = {
    clientName: "",
    websiteType: "",
    budget: "",
    referenceUrl: "",
    domainAvailable: "",
    hostingAvailable: "",
    uiStyle: "",
    layout: "",
    typography: "",
    colorSystem: "",
    pages: [] as string[],
    components: [] as string[],
    routing: "",
    stateManagement: "",
    backendArchitecture: "",
    backendAuthentication: "",
    backendDatabase: "",
    businessLogic: [] as string[],
    internalApis: [] as string[],
    externalIntegrations: [] as string[],
    apiPattern: "",
    techFrontend: "",
    techBackend: "",
    techDatabase: "",
    techHosting: "",
    mvpPhases: [] as string[],
  };

  if (!text) return result;

  // Helper to extract simple Name: Value lines
  const matchLine = (regex: RegExp): string => {
    const match = text.match(regex);
    return match && match[1] ? match[1].trim() : "";
  };

  // Helper to extract lists starting with •
  const matchBulletList = (header: string): string[] => {
    // Find the header and extract everything until the next empty line or next section
    const escapedHeader = header.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`${escapedHeader}:?\\s*\\n([\\s\\S]*?)(?:\\n\\n|\\n═|\\n[A-Z]|$)`, "i");
    const match = text.match(regex);
    if (!match || !match[1]) return [];
    return match[1]
      .split("\n")
      .map((line) => line.replace(/^[•\-\*\s]+/, "").trim())
      .filter((line) => line.length > 0);
  };

  result.clientName = matchLine(/Name:\s*(.*)/i);
  result.websiteType = matchLine(/Website Type:\s*(.*)/i);
  result.budget = matchLine(/Budget:\s*(.*)/i);
  result.referenceUrl = matchLine(/Reference Website:\s*(.*)/i);
  result.domainAvailable = matchLine(/Domain Available:\s*(.*)/i);
  result.hostingAvailable = matchLine(/Hosting Available:\s*(.*)/i);

  result.uiStyle = matchLine(/UI Style:\s*(.*)/i);
  result.layout = matchLine(/Layout:\s*(.*)/i);
  result.typography = matchLine(/Typography:\s*(.*)/i);
  result.colorSystem = matchLine(/Color System:\s*(.*)/i);

  result.pages = matchBulletList("Pages");
  result.components = matchBulletList("Components");
  result.routing = matchLine(/Routing:\s*(.*)/i);
  result.stateManagement = matchLine(/State Management:\s*(.*)/i);

  result.backendArchitecture = matchLine(/Architecture:\s*(.*)/i);
  result.backendAuthentication = matchLine(/Authentication:\s*(.*)/i);
  result.backendDatabase = matchLine(/Database:\s*(.*)/i);
  result.businessLogic = matchBulletList("Business Logic");

  result.internalApis = matchBulletList("Internal APIs");
  result.externalIntegrations = matchBulletList("External Integrations");
  result.apiPattern = matchLine(/API Pattern:\s*(.*)/i);

  result.techFrontend = matchLine(/Frontend:\s*(.*)/i);
  result.techBackend = matchLine(/Backend:\s*(.*)/i);
  result.techDatabase = matchLine(/Database:\s*(.*)/i);
  result.techHosting = matchLine(/Hosting:\s*(.*)/i);

  // Extract MVP Plan
  const mvpMatch = text.match(/📋 MVP PLAN\s*\n([\s\S]*)$/i);
  if (mvpMatch && mvpMatch[1]) {
    result.mvpPhases = mvpMatch[1]
      .split("\n")
      .map((line) => line.replace(/^[•\-\*\s]+/, "").trim())
      .filter((line) => line.length > 0);
  }

  return result;
}

/** Maps parsed blueprint attributes into a full ProposalData structure */
export function mapBlueprintToProposal(blueprintText: string, customId?: string): ProposalData {
  const bp = parseBlueprintText(blueprintText);
  const refId = customId || "MBU-" + Math.floor(10000 + Math.random() * 90000);
  const budgetNum = parseInt((bp.budget || "").replace(/[^0-9]/g, "")) || 30000;
  const currencySymbol = (bp.budget || "").includes("₹") ? "₹" : "$";

  // Create default Scope of Work items (5 modules)
  const scopeOfWork: ScopeItem[] = [
    {
      id: "scope-1",
      module: "Frontend Core UI/UX",
      description: `Production development of a responsive ${bp.uiStyle || "Card-based"} frontend using ${bp.techFrontend || "React, Redux"}. Includes pages: ${bp.pages.slice(0, 5).join(", ")}${bp.pages.length > 5 ? ", etc." : ""}.`,
    },
    {
      id: "scope-2",
      module: "Data & Backend Architecture",
      description: `Structured RESTful API mapping using ${bp.techBackend || "Node.js"} communicating with a secure ${bp.techDatabase || "PostgreSQL"} relational database schema.`,
    },
    {
      id: "scope-3",
      module: "System Security & Auth",
      description: `Integration of robust security parameters including ${bp.backendAuthentication || "JWT-based"} authentication and encrypted credentials protection.`,
    },
    {
      id: "scope-4",
      module: "External System Connectors",
      description: `Seamless connectivity setups with external services: ${bp.externalIntegrations.join(", ") || "Payment Gateways & Shipping services"}.`,
    },
    {
      id: "scope-5",
      module: "Staging, Diagnostics & QA",
      description: `Deployment on ${bp.techHosting || "AWS cloud hosting"} along with extensive multi-vector sandbox testing, load metrics, and validation procedures.`,
    },
  ];

  // Core Deliverables Checklist (4 items)
  const deliverables: DeliverableItem[] = [
    {
      id: "deliv-1",
      text: `Fully functional, responsive ${bp.websiteType || "web application"} frontend interface`,
    },
    {
      id: "deliv-2",
      text: `Optimized backend services with ${bp.techDatabase || "relational"} storage schemas`,
    },
    {
      id: "deliv-3",
      text: `Configured payment processing pathways and secure ${bp.backendAuthentication || "JWT"} credentials protection`,
    },
    {
      id: "deliv-4",
      text: `Active cloud hosting deployment on ${bp.techHosting || "AWS Cloud"} with complete standard QA verification`,
    },
  ];

  // Timeline (3 Phases)
  const timeline: TimelinePhase[] = [
    {
      id: "time-1",
      phase: "Phase 1",
      milestones: bp.mvpPhases.slice(0, 2).join(", ") || "User Authentication, Product Catalog & Discovery",
      duration: "10 Days",
    },
    {
      id: "time-2",
      phase: "Phase 2",
      milestones: bp.mvpPhases.slice(2, 4).join(", ") || "Cart integration, Order validation & Admin controls",
      duration: "15 Days",
    },
    {
      id: "time-3",
      phase: "Phase 3",
      milestones: bp.mvpPhases.slice(4).join(", ") || "Gateways, Shipping pipelines, final sandbox reviews & handover",
      duration: "7 Days",
    },
  ];

  // Commercial summary
  const comm1 = Math.round(budgetNum * 0.4);
  const comm2 = Math.round(budgetNum * 0.4);
  const comm3 = budgetNum - comm1 - comm2;

  const commercialBreakdown: CommercialItem[] = [
    {
      id: "comm-1",
      item: "Frontend UI Engineering & Responsive Layout Integration",
      cost: `${currencySymbol}${comm1.toLocaleString()}`,
    },
    {
      id: "comm-2",
      item: "Backend API development, Authentication Layer & Database Logic",
      cost: `${currencySymbol}${comm2.toLocaleString()}`,
    },
    {
      id: "comm-3",
      item: "Third-party Integrations, Staging Setup & Handover Operations",
      cost: `${currencySymbol}${comm3.toLocaleString()}`,
    },
  ];

  // Client requirements
  const clientRequirements: ClientRequirementItem[] = [
    {
      id: "req-1",
      asset: "Access Permissions",
      instructions: bp.hostingAvailable.toLowerCase().includes("yes")
        ? "Access credentials to target cloud hosting server configurations."
        : "Setup permissions for target staging cloud sandbox environments.",
    },
    {
      id: "req-2",
      asset: "Branding Guidelines",
      instructions: `Brand assets matching ${bp.colorSystem || "selected color pallet"} guidelines, logo vectors, and typography details.`,
    },
    {
      id: "req-3",
      asset: "Content Assets",
      instructions: "Product catalogs, structural textual descriptions, and digital graphic directories.",
    },
    {
      id: "req-4",
      asset: "Existing Data Sheets",
      instructions: `Onboarding schemas, reference guides, and target mapping pipelines (Reference: ${bp.referenceUrl || "N/A"}).`,
    },
  ];

  return {
    logoText: "MetaBull",
    logoSubText: "Universe",
    documentTitle: "Website Development Quotation",
    heroLetter: (bp.clientName ? bp.clientName.charAt(0).toUpperCase() : "M"),
    heroTitle: "MetaBull Universe",
    heroSubTitle: "Digital Marketing & Automation Solutions",
    proposalTitle: `${bp.websiteType || "IT"} Services`,
    proposalSubTitle: "Your Strategy for Digital Excellence",
    preparedFor: bp.clientName || "Client Name",
    preparedBy: "MetaBull Universe",
    projectName: bp.websiteType
      ? `${bp.websiteType.toUpperCase()} Infrastructure Optimization`
      : "Enterprise Infrastructure Optimization",
    quoteRef: refId,
    issueDate: new Date().toISOString().split("T")[0],
    validUntil: "30 Days from Issue Date",
    scopeOfWork,
    deliverables,
    timeline,
    commercialBreakdown,
    totalProjectValue: currencySymbol + budgetNum.toLocaleString(),
    paymentTerms: [
      "40% Advance on Blueprint Approval",
      "30% Following Mid-Development Stage",
      "20% Upon Sandbox Verification Testing",
      "10% Pre-Launch Sign-off & Delivery",
    ],
    validityNotes:
      "This financial ledger model remains strictly valid for 30 days from document issue. Any structural changes applied to initial project briefs will undergo modular evaluation metrics.",
    clientRequirements,
    ctaTitle: "Ready to Launch Your Platform?",
    ctaDescription:
      "Accelerate your growth path today. Connect directly with our optimization team to clear your staging infrastructure limits.",
    contactEmail: "metabulluniverse@gmail.com",
    contactPhone: "+91 89822 85510",
  };
}

/** Escapes special HTML characters */
function escapeHtml(s: string): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Compiles proposal details into the exact A4 CSS printable HTML template */
export function compileProposalHtml(data: ProposalData): string {
  const logoT = escapeHtml(data.logoText);
  const logoSub = escapeHtml(data.logoSubText);
  const docTitle = escapeHtml(data.documentTitle);
  const heroL = escapeHtml(data.heroLetter);
  const heroT = escapeHtml(data.heroTitle);
  const heroSub = escapeHtml(data.heroSubTitle);
  const propT = escapeHtml(data.proposalTitle);
  const propSub = escapeHtml(data.proposalSubTitle);

  const scopeRows = data.scopeOfWork
    .map(
      (item, idx) => `
                 <tr>
                     <td class="col-sn">${idx + 1}</td>
                     <td class="col-feature">${escapeHtml(item.module)}</td>
                     <td class="col-desc">${escapeHtml(item.description)}</td>
                 </tr>`
    )
    .join("");

  const deliverableItems = data.deliverables
    .map(
      (item) => `
         <div class="deliv-item">
             <table class="deliv-table"><tr><td class="deliv-check">&#10004;</td><td class="deliv-text">${escapeHtml(item.text)}</td></tr></table>
         </div>`
    )
    .join("");

  const timelineRows = data.timeline
    .map(
      (item) => `
                 <tr>
                     <td style="color:#6B46C1; font-weight:bold;">${escapeHtml(item.phase)}</td>
                     <td>${escapeHtml(item.milestones)}</td>
                     <td style="color:#DD6B20; font-weight:bold;">${escapeHtml(item.duration)}</td>
                 </tr>`
    )
    .join("");

  const commercialRows = data.commercialBreakdown
    .map(
      (item) => `
                 <tr>
                     <td>${escapeHtml(item.item)}</td>
                     <td style="text-align: right;">${escapeHtml(item.cost)}</td>
                 </tr>`
    )
    .join("");

  const paymentTermsHtml = data.paymentTerms
    .map((term) => `                             • ${escapeHtml(term)}<br>`)
    .join("\n");

  const requirementRows = data.clientRequirements
    .map(
      (item) => `
                 <tr>
                     <td style="color:#6B46C1; font-weight:bold;">${escapeHtml(item.asset)}</td>
                     <td>${escapeHtml(item.instructions)}</td>
                 </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${docTitle}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 0;
        }
        
        *, *::before, *::after {
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1A1C23;
            background-color: #FAFAFB;
            margin: 0;
            padding: 0;
            font-size: 10pt;
            line-height: 1.5;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        /* Fixed Print Structural Classes */
        .page {
            page-break-before: always;
            clear: both;
            padding: 20mm 15mm;
            background-color: #FFFFFF;
            box-sizing: border-box;
        }
        .page:first-child {
            page-break-before: avoid;
        }

        /* Running Header CSS Mechanics */
        .running-header {
            width: 100%;
            margin-bottom: 25px;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
        }
        .header-table td {
            padding: 0 0 8px 0;
            vertical-align: middle;
            border: none !important; 
            background: transparent !important;
        }
        .logo-text {
            font-size: 14pt;
            font-weight: bold;
            color: #1A1C23;
            text-align: left;
        }
        .logo-text span {
            color: #6B46C1;
        }
        .doc-label {
            text-align: right;
            font-size: 10pt;
            font-weight: 600;
            text-transform: uppercase;
            color: #718096;
            letter-spacing: 1px;
        }
        
        /* Ribbon Component Styling */
        .brand-strip {
            width: 100%;
            height: 5px;
            margin-top: 2px;
            font-size: 0;
            line-height: 0;
        }
        .strip-block {
            display: inline-block;
            width: 25%;
            height: 100%;
        }
        .sb-blue { background-color: #3182CE; }
        .sb-purple { background-color: #6B46C1; }
        .sb-magenta { background-color: #D53F8C; }
        .sb-orange { background-color: #DD6B20; }
        
        /* Running Footer Rules */
        .running-footer {
            width: 100%;
            border-top: 1px solid #E2E8F0;
            padding-top: 10px;
            margin-top: 30px;
            font-size: 8.5pt;
            color: #A0AEC0;
        }
        .footer-table {
            width: 100%;
            border-collapse: collapse;
        }

        /* Hero Element Rules */
        .hero-banner {
            background-color: #1A1C23;
            color: #FFFFFF;
            padding: 40px 30px;
            border-radius: 6px;
            margin-top: 10px;
            margin-bottom: 35px;
        }
        .hero-table {
            width: 100%;
            border-collapse: collapse;
        }
        .hero-left {
            width: 20%;
            vertical-align: middle;
        }
        .hero-logo-box {
            width: 65px;
            height: 65px;
            background: linear-gradient(135deg, #6B46C1, #D53F8C);
            border-radius: 10px;
            text-align: center;
            line-height: 65px;
            font-size: 26pt;
            font-weight: bold;
            color: #FFFFFF;
        }
        .header-logo {
            max-height: 35px;
            max-width: 180px;
            object-fit: contain;
            display: block;
        }
        .hero-logo-img {
            max-height: 65px;
            max-width: 65px;
            object-fit: contain;
            display: block;
            border-radius: 10px;
        }
        .hero-right {
            width: 80%;
            vertical-align: middle;
            padding-left: 20px;
        }
        .hero-right h1 {
            margin: 0;
            font-size: 22pt;
            font-weight: 800;
            text-transform: uppercase;
        }
        .hero-right p {
            margin: 4px 0 0 0;
            font-size: 11pt;
            color: #CBD5E0;
        }
        
        .proposal-title-container {
            text-align: center;
            margin-bottom: 35px;
        }
        .proposal-title-container h2 {
            font-size: 18pt;
            color: #6B46C1;
            font-weight: 800;
            text-transform: uppercase;
            margin: 0 0 4px 0;
        }
        .proposal-title-container p {
            font-size: 11pt;
            font-style: italic;
            color: #DD6B20;
            margin: 0;
            font-weight: 500;
        }
        
        /* Grid Tables Elements */
        .metadata-table {
            width: 100%;
            border-collapse: collapse;
        }
        .metadata-table td {
            padding: 12px 15px;
            border: 1px solid #E2E8F0;
        }
        .meta-label {
            background-color: #EDF2F7;
            color: #4A5568;
            font-weight: 600;
            width: 20%;
        }
        .meta-val {
            background-color: #F7FAFC;
            color: #1A202C;
            width: 30%;
        }
        
        .section-bar {
            background-color: #1A1C23;
            color: #FFFFFF;
            padding: 10px 15px;
            font-size: 11pt;
            font-weight: 700;
            text-transform: uppercase;
            margin-top: 20px;
            margin-bottom: 15px;
            border-radius: 4px;
            border-left: 5px solid #6B46C1;
        }
        
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .data-table th {
            background-color: #2D3748;
            color: #FFFFFF;
            text-align: left;
            padding: 10px 12px;
            font-weight: 600;
            font-size: 9.5pt;
            text-transform: uppercase;
        }
        .data-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #E2E8F0;
            vertical-align: top;
            font-size: 9.5pt;
            background-color: #FAF5FF;
        }
        .data-table tr:nth-child(even) td {
            background-color: #F3E8FF;
        }
        
        .col-sn { width: 8%; color: #DD6B20; font-weight: bold; text-align: center; }
        .col-feature { width: 32%; color: #6B46C1; font-weight: bold; }
        .col-desc { width: 60%; color: #4A5568; }
        
        /* Deliverables Element styling */
        .deliv-item {
            background-color: #FAF5FF;
            border: 1px solid #E2E8F0;
            padding: 10px 15px;
            margin-bottom: 8px;
            border-radius: 4px;
        }
        .deliv-table {
            width: 100%;
            border-collapse: collapse;
        }
        .deliv-check {
            width: 5%;
            color: #DD6B20;
            font-weight: bold;
            font-size: 11pt;
        }
        .deliv-text {
            width: 95%;
            color: #2D3748;
            font-weight: 500;
        }

        /* Total Highlight Styles */
        .row-total td {
            background-color: #1A202C !important;
            color: #FFFFFF !important;
            font-weight: bold;
            font-size: 11pt;
        }
        .price-highlight {
            color: #DD6B20;
            font-weight: bold;
        }
        
        /* Split container blocks rule definitions */
        .blocks-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        .blocks-table td {
            width: 50%;
            padding: 0;
            vertical-align: top;
        }
        .block-purple {
            background-color: #6B46C1;
            color: #FFFFFF;
            padding: 15px;
            border-radius: 6px;
        }
        .block-dark {
            background-color: #1A1C23;
            color: #FFFFFF;
            padding: 15px;
            border-radius: 6px;
        }
        .block-title {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 9.5pt;
            margin-bottom: 8px;
            padding-bottom: 4px;
        }
        .block-purple .block-title { color: #FEEBC8; border-bottom: 1px solid rgba(255,255,255,0.2); }
        .block-dark .block-title { color: #E9D8FD; border-bottom: 1px solid rgba(255,255,255,0.2); }
        .block-body { font-size: 9pt; line-height: 1.4; }
        
        /* CTA Design Definition */
        .cta-panel {
            background-color: #1A1C23;
            color: #FFFFFF;
            padding: 35px;
            border-radius: 6px;
            text-align: center;
            margin-top: 30px;
        }
        .cta-panel h3 {
            color: #DD6B20;
            font-size: 16pt;
            margin: 0 0 10px 0;
            text-transform: uppercase;
        }
        .cta-panel p {
            color: #CBD5E0;
            margin: 0 0 20px 0;
            font-size: 10pt;
        }
        .cta-contact {
            font-size: 11pt;
            font-weight: 600;
        }
        .cta-contact span {
            color: #6B46C1;
            margin: 0 12px;
        }
    </style>
</head>
<body>

    <div class="page" id="sec-core">
        <div class="running-header">
            <table class="header-table">
                <tr>
                    <td><img src="${LOGO_BASE64}" class="header-logo" alt="Logo" /></td>
                    <td class="doc-label">${escapeHtml(data.projectName)}</td>
                </tr>
            </table>
            <div class="brand-strip">
                <div class="strip-block sb-blue"></div><div class="strip-block sb-purple"></div><div class="strip-block sb-magenta"></div><div class="strip-block sb-orange"></div>
            </div>
        </div>

        <div class="hero-banner">
            <table class="hero-table">
                <tr>
                    <td class="hero-left"><img src="${LOGO_BASE64}" class="hero-logo-img" alt="Logo" /></td>
                    <td class="hero-right">
                        <h1>${heroT}</h1>
                        <p>${heroSub}</p>
                    </td>
                </tr>
            </table>
        </div>

        <div class="proposal-title-container">
            <h2>${propT}</h2>
            <p>${propSub}</p>
        </div>

        <table class="metadata-table">
            <tr>
                <td class="meta-label">Prepared For</td>
                <td class="meta-val">${escapeHtml(data.preparedFor)}</td>
                <td class="meta-label">Prepared By</td>
                <td class="meta-val">${escapeHtml(data.preparedBy)}</td>
            </tr>
            <tr>
                <td class="meta-label">Project Name</td>
                <td class="meta-val">${escapeHtml(data.projectName)}</td>
                <td class="meta-label">Quote Ref.</td>
                <td class="meta-val">${escapeHtml(data.quoteRef)}</td>
            </tr>
            <tr>
                <td class="meta-label">Issue Date</td>
                <td class="meta-val">${escapeHtml(data.issueDate)}</td>
                <td class="meta-label">Valid Until</td>
                <td class="meta-val">${escapeHtml(data.validUntil)}</td>
            </tr>
        </table>

        <div class="running-footer">
            <table class="footer-table">
                <tr>
                    <td>&copy; 2026 ${heroT}. All Rights Reserved.</td>
                    <td style="text-align: right;">Confidential — For Addressee Only</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="page">
        <div class="running-header">
            <table class="header-table">
                <tr>
                    <td><img src="${LOGO_BASE64}" class="header-logo" alt="Logo" /></td>
                    <td class="doc-label">${escapeHtml(data.projectName)}</td>
                </tr>
            </table>
            <div class="brand-strip">
                <div class="strip-block sb-blue"></div><div class="strip-block sb-purple"></div><div class="strip-block sb-magenta"></div><div class="strip-block sb-orange"></div>
            </div>
        </div>

        <div class="section-bar" id="sec-scope">Scope of Work</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 8%; text-align: center;">#</th>
                    <th style="width: 32%;">Module / Service</th>
                    <th style="width: 60%;">Description</th>
                </tr>
            </thead>
            <tbody>
                ${scopeRows}
            </tbody>
        </table>

        <div class="section-bar" id="sec-deliverables">Core Deliverables Checklist</div>
        ${deliverableItems}

        <div class="running-footer">
            <table class="footer-table">
                <tr>
                    <td>&copy; 2026 ${heroT}. All Rights Reserved.</td>
                    <td style="text-align: right;">Confidential — For Addressee Only</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="page">
        <div class="running-header">
            <table class="header-table">
                <tr>
                    <td><img src="${LOGO_BASE64}" class="header-logo" alt="Logo" /></td>
                    <td class="doc-label">${escapeHtml(data.projectName)}</td>
                </tr>
            </table>
            <div class="brand-strip">
                <div class="strip-block sb-blue"></div><div class="strip-block sb-purple"></div><div class="strip-block sb-magenta"></div><div class="strip-block sb-orange"></div>
            </div>
        </div>

        <div class="section-bar" id="sec-timeline">Project Timeline</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 30%;">Phase Segment</th>
                    <th style="width: 40%;">Core Milestones Execution Target</th>
                    <th style="width: 30%;">Duration Matrix</th>
                </tr>
            </thead>
            <tbody>
                ${timelineRows}
            </tbody>
        </table>

        <div class="section-bar" id="sec-commercials">Commercial Summary</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Service Element Breakdown</th>
                    <th style="text-align: right;">Cost Contribution</th>
                </tr>
            </thead>
            <tbody>
                ${commercialRows}
                <tr class="row-total">
                    <td>TOTAL PROJECT VALUE</td>
                    <td style="text-align: right;"><span class="price-highlight">${escapeHtml(data.totalProjectValue)}</span></td>
                </tr>
            </tbody>
        </table>

        <table class="blocks-table">
            <tr>
                <td style="padding-right: 10px;">
                    <div class="block-purple" id="sec-payments">
                        <div class="block-title">Payment Terms</div>
                        <div class="block-body">
${paymentTermsHtml}
                        </div>
                    </div>
                </td>
                <td style="padding-left: 10px;">
                    <div class="block-dark" id="sec-validity">
                        <div class="block-title">Validity & Notes</div>
                        <div class="block-body">
                            ${escapeHtml(data.validityNotes)}
                        </div>
                    </div>
                </td>
            </tr>
        </table>

        <div class="running-footer">
            <table class="footer-table">
                <tr>
                    <td>&copy; 2026 ${heroT}. All Rights Reserved.</td>
                    <td style="text-align: right;">Confidential — For Addressee Only</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="page">
        <div class="running-header">
            <table class="header-table">
                <tr>
                    <td><img src="${LOGO_BASE64}" class="header-logo" alt="Logo" /></td>
                    <td class="doc-label">${escapeHtml(data.projectName)}</td>
                </tr>
            </table>
            <div class="brand-strip">
                <div class="strip-block sb-blue"></div><div class="strip-block sb-purple"></div><div class="strip-block sb-magenta"></div><div class="strip-block sb-orange"></div>
            </div>
        </div>

        <div class="section-bar">Client Requirements &amp; Baseline Assets</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 35%;">Required Structural Assets</th>
                    <th style="width: 65%;">Operational Handling Instructions</th>
                </tr>
            </thead>
            <tbody>
                ${requirementRows}
            </tbody>
        </table>

        <div class="cta-panel" id="sec-cta">
            <h3>${escapeHtml(data.ctaTitle)}</h3>
            <p>${escapeHtml(data.ctaDescription)}</p>
            <div class="cta-contact">
                ${escapeHtml(data.contactEmail)} <span>|</span> ${escapeHtml(data.contactPhone)}
            </div>
        </div>

        <div class="running-footer">
            <table class="footer-table">
                <tr>
                    <td>&copy; 2026 ${heroT}. All Rights Reserved.</td>
                    <td style="text-align: right;">Confidential — For Addressee Only</td>
                </tr>
            </table>
        </div>
    </div>

</body>
</html>`;
}
