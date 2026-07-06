import { motion } from 'motion/react';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  Award,
  Globe,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { useState } from 'react';

export default function ReportsPage() {
  const [activeReportType, setActiveReportType] = useState<'government' | 'ppt' | 'citizen'>('government');
  const [exporting, setExporting] = useState(false);
  const [lastExportedFile, setLastExportedFile] = useState<string | null>(null);
  const [showSandboxNotice, setShowSandboxNotice] = useState(false);

  const getReportTitle = (type: 'government' | 'ppt' | 'citizen') => {
    switch (type) {
      case 'government': return 'Guardian AI Operational Allocation Proposal';
      case 'ppt': return 'Predictive Operations Briefing';
      case 'citizen': return 'District 4 Neighborhood Safety Digest';
    }
  };

  const getReportFilename = (type: 'government' | 'ppt' | 'citizen') => {
    switch (type) {
      case 'government': return 'Guardian_AI_Government_Proposal';
      case 'ppt': return 'Guardian_AI_PPT_Briefing_Outline';
      case 'citizen': return 'Guardian_AI_Citizen_Safety_Digest';
    }
  };

  const generateReportInnerHtml = (type: 'government' | 'ppt' | 'citizen') => {
    switch (type) {
      case 'government':
        return `
          <div class="badge">District Municipal Council Proposal</div>
          <h1>Guardian AI Operational Allocation Proposal</h1>
          <div class="meta">Requested by: City Administrative Command &bull; Date: July 2026 &bull; Status: Pending Board Authorization</div>
          <hr/>
          <div class="section">
            <h3>1. EXECUTIVE ARCHITECTURE OVERVIEW</h3>
            <p>Following multi-day telemetry diagnostics, Guardian AI projects an 87% water accumulation risk in District 4 during peak release windows. This proposal mandates a proactive allocation of $12M USD contingency budget to initiate immediate drain purging, sump-pump optimizations, and automated road subpass warning barriers.</p>
          </div>
          <div class="section">
            <h3>2. CORE IMPACT PROJECTIONS</h3>
            <div class="grid">
              <div>
                <strong>Affected Citizens:</strong>
                <p>1,420 directly exposed, including commuting high school dismissals.</p>
              </div>
              <div>
                <strong>Resource Offset Cost:</strong>
                <p>$12.4M saved in potential sewer backflow restorations.</p>
              </div>
            </div>
          </div>
          <div class="section">
            <h3>3. RECOMMENDATION PROTOCOLS</h3>
            <p>Deploy District 4 fire rescue team to purge debris at Main Junction 4B intake. Distribute push notification routing vectors, and configure automated warnings at low-pass intersections.</p>
          </div>
        `;
      case 'ppt':
        return `
          <div class="badge">Executive Briefing Slide Deck Outline</div>
          <h1>Predictive Operations Briefing</h1>
          <div class="meta">4 Slides Configured &bull; Tailored for District Advisory Board Council</div>
          <hr/>
          <div class="slide-box">
            <h3>Slide 1: Title Screen</h3>
            <div class="slide-content">
              <h4>Guardian OS Overview</h4>
              <p>"Predict Tomorrow. Protect Today."</p>
            </div>
          </div>
          <div class="slide-box">
            <h3>Slide 2: Digital Twin Model</h3>
            <div class="slide-content">
              <h4>Active Telemetry Sync</h4>
              <p>Real-time mapping of hydrology systems & power transformer sags.</p>
            </div>
          </div>
          <div class="slide-box">
            <h3>Slide 3: Risk Assessment</h3>
            <div class="slide-content">
              <h4>Hydrology Hazard: Ward 12</h4>
              <p>87% probability sewer backflow cell storm. Close subpasses proactive.</p>
            </div>
          </div>
          <div class="slide-box">
            <h3>Slide 4: Action Roadmap</h3>
            <div class="slide-content">
              <h4>Response Directives</h4>
              <p>Contingency funding allocation, rapid team sweeps, community warning sirens.</p>
            </div>
          </div>
        `;
      case 'citizen':
        return `
          <div class="badge">Neighborhood Safety Summary (Public Access)</div>
          <h1>District 4 Neighborhood Safety Digest</h1>
          <div class="meta">Published by: Guardian AI Public Portal &bull; Updates hourly</div>
          <hr/>
          <div class="alert-box">
            <strong>Status:</strong> All neighborhood residential services are currently operating normally.
          </div>
          <div class="section">
            <h3>Active Weather Alert</h3>
            <p>Light cell storms scheduled in District 4 southern boundary over the next 2 hours. Commuters should bypass District 4 low-pass subpass as a safety precaution due to temporary water accumulation warnings.</p>
          </div>
          <div class="section">
            <h3>Environmental Indicators</h3>
            <p>Air Quality is rated as "Excellent" (42 AQI). Tap water supply is stable with 96.4% reservoir capacity. Local parks are green and clear.</p>
          </div>
        `;
    }
  };

  const generateMarkdownReport = (type: 'government' | 'ppt' | 'citizen') => {
    switch (type) {
      case 'government':
        return `# Guardian AI Operational Allocation Proposal\n\n**District Municipal Council Proposal**\n*Requested by: City Administrative Command • Date: July 2026 • Status: Pending Board Authorization*\n\n---\n\n### 1. EXECUTIVE ARCHITECTURE OVERVIEW\nFollowing multi-day telemetry diagnostics, Guardian AI projects a 87% water accumulation risk in District 4 during peak release windows. This proposal mandates a proactive allocation of $12M USD contingency budget to initiate immediate drain purging, sump-pump optimizations, and automated road subpass warning barriers.\n\n### 2. CORE IMPACT PROJECTIONS\n- **Affected Citizens:** 1,420 directly exposed, including commuting high school dismissals.\n- **Resource Offset Cost:** $12.4M saved in potential sewer backflow restorations.\n\n### 3. RECOMMENDATION PROTOCOLS\nDeploy District 4 fire rescue team to purge debris at Main Junction 4B intake. Distribute push notification routing vectors, and configure automated warnings at low-pass intersections.`;
      case 'ppt':
        return `# Predictive Operations Briefing\n\n**Executive Briefing Slide Deck Outline**\n*4 Slides Configured • Tailored for District Advisory Board Council*\n\n---\n\n### Slide 1: Title Screen\n- **Guardian OS Overview**\n- *"Predict Tomorrow. Protect Today."*\n\n### Slide 2: Digital Twin Model\n- **Active Telemetry Sync**\n- Real-time mapping of hydrology systems & power transformer sags.\n\n### Slide 3: Risk Assessment\n- **Hydrology Hazard: Ward 12**\n- 87% probability sewer backflow cell storm. Close subpasses proactive.\n\n### Slide 4: Action Roadmap\n- **Response Directives**\n- Contingency funding allocation, rapid team sweeps, community warning sirens.`;
      case 'citizen':
        return `# District 4 Neighborhood Safety Digest\n\n**Neighborhood Safety Summary (Public Access)**\n*Published by: Guardian AI Public Portal • Updates hourly*\n\n---\n\n**Status:** All neighborhood residential services are currently operating normally.\n\n### Active Weather Alert\nLight cell storms scheduled in District 4 southern boundary over the next 2 hours. Commuters should bypass District 4 low-pass subpass as a safety precaution due to temporary water accumulation warnings.\n\n### Environmental Indicators\nAir Quality is rated as "Excellent" (42 AQI). Tap water supply is stable with 96.4% reservoir capacity. Local parks are green and clear.`;
    }
  };

  const triggerExport = () => {
    setExporting(true);
    setShowSandboxNotice(false);
    
    setTimeout(() => {
      setExporting(false);
      const title = getReportTitle(activeReportType);
      const innerHtml = generateReportInnerHtml(activeReportType);
      const filename = `${getReportFilename(activeReportType)}.html`;

      // Construct a highly polished, standalone, fully styled HTML report file
      const fullHtmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>\${title}</title>
  <style>
    body {
      background-color: #0b1329;
      color: #e2e8f0;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 40px;
      line-height: 1.6;
    }
    .card {
      background-color: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 16px;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }
    .badge {
      font-family: monospace;
      color: #22d3ee;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.1em;
      margin-bottom: 8px;
      display: inline-block;
    }
    h1 {
      font-size: 28px;
      font-weight: 800;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 12px;
    }
    .meta {
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 24px;
      font-weight: 300;
    }
    hr {
      border: 0;
      border-top: 1px solid #1e293b;
      margin: 24px 0;
    }
    .section {
      margin-bottom: 24px;
    }
    h3 {
      font-size: 14px;
      font-weight: 800;
      color: #38bdf8;
      font-family: monospace;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    p {
      font-size: 13px;
      color: #cbd5e1;
      margin-top: 0;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .slide-box {
      background-color: #090d16;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .slide-box h3 {
      color: #64748b;
      font-size: 10px;
      margin-top: 0;
    }
    .slide-content h4 {
      margin: 0 0 4px 0;
      color: #ffffff;
      font-size: 14px;
    }
    .slide-content p {
      font-size: 11px;
      color: #94a3b8;
      margin-bottom: 0;
    }
    .alert-box {
      background-color: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 8px;
      padding: 16px;
      color: #34d399;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 24px;
    }
    .footer {
      font-family: monospace;
      font-size: 10px;
      color: #475569;
      text-align: center;
      margin-top: 40px;
    }
    
    @media print {
      body {
        background-color: #ffffff;
        color: #000000;
        padding: 20px;
      }
      .card {
        background-color: #ffffff;
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      h1, .slide-content h4 {
        color: #000000;
      }
      .meta, p, .slide-content p {
        color: #334155;
      }
      hr {
        border-top: 1px solid #cbd5e1;
      }
      h3 {
        color: #0284c7;
      }
      .slide-box {
        background-color: #f8fafc;
        border: 1px solid #cbd5e1;
      }
      .alert-box {
        background-color: #f0fdf4;
        border: 1px solid #bbf7d0;
        color: #166534;
      }
      .footer {
        color: #64748b;
      }
    }
  </style>
</head>
<body>
  <div class="card">
    \${innerHtml}
    <div class="footer">
      GUARDIAN MUNICIPAL COMMAND NETWORK &bull; ENCRYPTED REPORT OUTFLOW
    </div>
  </div>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        window.print();
      }, 500);
    });
  <\/script>
</body>
</html>`;

      // Trigger automatic file download of the styled print-ready HTML
      const blob = new Blob([fullHtmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setLastExportedFile(filename);
      setShowSandboxNotice(true);

      // Attempt native print as well, wrapped safely in try-catch in case sandbox restrictions are disabled/bypassed
      try {
        window.print();
      } catch (e) {
        console.warn('Native window.print() was blocked by sandbox: ', e);
      }
    }, 1200);
  };

  const handleDownloadMarkdown = () => {
    const markdownContent = generateMarkdownReport(activeReportType);
    const filename = `${getReportFilename(activeReportType)}.md`;
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans text-left">
      {/* Left Selection panel */}
      <div className="lg:col-span-4 bg-slate-950/60 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative">
        <div className="space-y-6">
          <div className="border-b border-slate-900 pb-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 font-bold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Document Generation Deck
            </span>
            <h3 className="font-extrabold text-white text-lg mt-0.5">Municipal Exporter</h3>
          </div>

          <div className="space-y-3">
            {/* Gov Proposal option */}
            <button
              onClick={() => {
                setActiveReportType('government');
                setShowSandboxNotice(false);
              }}
              className={`cursor-pointer w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                activeReportType === 'government'
                  ? 'border-cyan-400 bg-cyan-950/10 ring-1 ring-cyan-400/50'
                  : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
              }`}
            >
              <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-cyan-400 shrink-0">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-white">Government Proposal</span>
                <span className="block text-[10px] text-slate-400 font-light leading-relaxed mt-0.5">
                  Detailed administrative resource request outlines with budget breakdowns and risk matrices.
                </span>
              </div>
            </button>

            {/* PowerPoint Summary option */}
            <button
              onClick={() => {
                setActiveReportType('ppt');
                setShowSandboxNotice(false);
              }}
              className={`cursor-pointer w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                activeReportType === 'ppt'
                  ? 'border-cyan-400 bg-cyan-950/10 ring-1 ring-cyan-400/50'
                  : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
              }`}
            >
              <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-indigo-400 shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-white">PowerPoint slide Summary</span>
                <span className="block text-[10px] text-slate-400 font-light leading-relaxed mt-0.5">
                  Visual slide outlines, KPI bullet lists, and summary charts built for board or council briefings.
                </span>
              </div>
            </button>

            {/* Citizen Summary option */}
            <button
              onClick={() => {
                setActiveReportType('citizen');
                setShowSandboxNotice(false);
              }}
              className={`cursor-pointer w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                activeReportType === 'citizen'
                  ? 'border-cyan-400 bg-cyan-950/10 ring-1 ring-cyan-400/50'
                  : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
              }`}
            >
              <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-emerald-400 shrink-0">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-white">Citizen Safety Summary</span>
                <span className="block text-[10px] text-slate-400 font-light leading-relaxed mt-0.5">
                  Friendly, non-technical, simple neighborhood summaries focused purely on safety alerts.
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Action Exporter block */}
        <div className="pt-6 border-t border-slate-900 mt-6 space-y-3">
          {showSandboxNotice && (
            <div className="p-3 bg-cyan-950/40 border border-cyan-800/40 rounded-xl text-left space-y-1">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
                Export Complete
              </span>
              <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                Downloaded <strong className="text-white font-mono text-[9px]">{lastExportedFile}</strong> successfully. Open this file to print directly in high-res!
              </p>
            </div>
          )}

          <button
            onClick={triggerExport}
            disabled={exporting}
            className="cursor-pointer w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/15 hover:scale-[1.01] active:scale-[0.99] transition-all text-xs"
          >
            {exporting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Compiling Report...
              </span>
            ) : (
              <>
                <Printer className="h-4 w-4" />
                One-Click Export & Print
              </>
            )}
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="cursor-pointer w-full bg-slate-900 hover:bg-slate-850 text-slate-300 font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 border border-slate-800/80 transition-all text-[11px]"
          >
            <Download className="h-3.5 w-3.5" />
            Download Markdown Format (.md)
          </button>
        </div>
      </div>

      {/* Right Document Preview viewport */}
      <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative min-h-[450px]">
        {/* Absolute glass print header mockup */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6 text-xs text-slate-400 font-mono">
          <span>DOCUMENT ENCRYPT: AES-256</span>
          <span className="text-cyan-400">STATUS: VERIFIED PREVIEW</span>
        </div>

        {/* Render different reports based on selection */}
        <div className="space-y-6">
          {activeReportType === 'government' && (
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 font-bold">
                  District Municipal Council Proposal
                </span>
                <h3 className="text-2xl font-black text-white">Guardian AI Operational Allocation Proposal</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Requested by: City Administrative Command • Date: July 2026 • Status: Pending Board Authorization
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-4 bg-slate-950/70 border border-slate-900 rounded-xl p-5 font-light text-slate-300 text-xs leading-relaxed">
                <div className="space-y-1">
                  <span className="font-extrabold text-sm text-cyan-400 font-mono">1. EXECUTIVE ARCHITECTURE OVERVIEW</span>
                  <p>
                    Following multi-day telemetry diagnostics, Guardian AI projects a 87% water accumulation risk in District 4 during peak release windows. This proposal mandates a proactive allocation of $12M USD contingency budget to initiate immediate drain purging, sump-pump optimizations, and automated road subpass warning barriers.
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-900">
                  <span className="font-extrabold text-sm text-indigo-400 font-mono">2. CORE IMPACT PROJECTIONS</span>
                  <div className="grid grid-cols-2 gap-3.5 pt-1 text-slate-400">
                    <div>
                      <span className="block font-bold text-white">Affected Citizens:</span>
                      <span>1,420 directly exposed, including commuting high school dismissals.</span>
                    </div>
                    <div>
                      <span className="block font-bold text-white">Resource Offset Cost:</span>
                      <span>$12.4M saved in potential sewer backflow restorations.</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-900">
                  <span className="font-extrabold text-sm text-emerald-400 font-mono">3. RECOMMENDATION PROTOCOLS</span>
                  <p>
                    Deploy District 4 fire rescue team to purge debris at Main Junction 4B intake. Distribute push notification routing vectors, and configure automated warnings at low-pass intersections.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeReportType === 'ppt' && (
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-indigo-400 font-bold">
                  Executive Briefing Slide Deck Outline
                </span>
                <h3 className="text-2xl font-black text-white">Predictive Operations Briefing</h3>
                <p className="text-xs text-slate-400 font-light">
                  4 Slides Configured • Tailored for District Advisory Board Council
                </p>
              </div>

              {/* Slides preview stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Slide 1 */}
                <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 space-y-2 text-xs">
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Slide 1: Title Screen</span>
                  <div className="p-3.5 bg-slate-900/60 rounded border border-slate-850 space-y-1 text-left">
                    <span className="font-bold text-sm block text-white">Guardian OS Overview</span>
                    <span className="text-[10px] text-slate-400 block font-light">"Predict Tomorrow. Protect Today."</span>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 space-y-2 text-xs">
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Slide 2: Digital Twin Model</span>
                  <div className="p-3.5 bg-slate-900/60 rounded border border-slate-850 space-y-1 text-left">
                    <span className="font-bold text-sm block text-white">Active Telemetry Sync</span>
                    <span className="text-[10px] text-slate-400 block font-light">Real-time mapping of hydrology systems & power transformer sags.</span>
                  </div>
                </div>

                {/* Slide 3 */}
                <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 space-y-2 text-xs">
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Slide 3: Risk Assessment</span>
                  <div className="p-3.5 bg-slate-900/60 rounded border border-slate-850 space-y-1 text-left">
                    <span className="font-bold text-sm block text-white">Hydrology Hazard: Ward 12</span>
                    <span className="text-[10px] text-slate-400 block font-light">87% probability sewer backflow cell storm. Close subpasses proactive.</span>
                  </div>
                </div>

                {/* Slide 4 */}
                <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 space-y-2 text-xs">
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Slide 4: Action Roadmap</span>
                  <div className="p-3.5 bg-slate-900/60 rounded border border-slate-850 space-y-1 text-left">
                    <span className="font-bold text-sm block text-white">Response Directives</span>
                    <span className="text-[10px] text-slate-400 block font-light">Contingency funding allocation, rapid team sweeps, community warning sirens.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeReportType === 'citizen' && (
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-bold">
                  Neighborhood Safety Summary (Public Access)
                </span>
                <h3 className="text-2xl font-black text-white">District 4 Neighborhood Safety Digest</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Published by: Guardian AI Public Portal • Updates hourly
                </p>
              </div>

              {/* Citizen friendly card */}
              <div className="bg-slate-950/70 border border-slate-900 rounded-xl p-5 space-y-4 text-xs font-light text-slate-300">
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-lg text-emerald-400">
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  <span className="font-semibold">All neighborhood residential services are currently operating normally.</span>
                </div>

                <div className="space-y-3.5">
                  <div className="text-left space-y-1">
                    <span className="font-bold text-sm text-white block">Active Weather Alert</span>
                    <p className="text-slate-400">
                      Light cell storms scheduled in District 4 southern boundary over the next 2 hours. Commuters should bypass District 4 low-pass subpass as a safety precaution due to temporary water accumulation warnings.
                    </p>
                  </div>

                  <div className="text-left space-y-1 pt-3 border-t border-slate-900">
                    <span className="font-bold text-sm text-white block">Environmental Indicators</span>
                    <p className="text-slate-400">
                      Air Quality is rated as "Excellent" (42 AQI). Tap water supply is stable with 96.4% reservoir capacity. Local parks are green and clear.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
