import { motion } from 'motion/react';
import {
  Settings,
  Database,
  Cpu,
  ShieldAlert,
  Server,
  CloudCheck,
  CheckCircle,
  ToggleLeft
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [bigQuerySync, setBigQuerySync] = useState(true);
  const [modelType, setModelType] = useState('gemini-3.5-flash');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans text-left">
      {/* Settings Panel */}
      <div className="lg:col-span-7 bg-slate-950/60 border border-slate-900 rounded-2xl p-5 space-y-6 shadow-2xl relative">
        <div className="border-b border-slate-900 pb-3">
          <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 font-bold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Guardian OS Config
          </span>
          <h3 className="font-extrabold text-white text-lg mt-0.5">System Preferences</h3>
        </div>

        {/* Configuration stack */}
        <div className="space-y-4">
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="block text-sm font-bold text-white">Google BigQuery Telemetry Sink</span>
              <span className="block text-[11px] text-slate-500 font-light">
                Continuously stream municipal sensor metrics into active BigQuery diagnostic arrays.
              </span>
            </div>
            <button
              onClick={() => setBigQuerySync(!bigQuerySync)}
              className="cursor-pointer h-6 w-11 rounded-full bg-slate-800 border border-slate-700 relative p-0.5 transition-all flex items-center"
            >
              <div className={`h-4.5 w-4.5 rounded-full bg-cyan-400 transition-all ${bigQuerySync ? 'translate-x-5' : 'translate-x-0 bg-slate-500'}`} />
            </button>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 space-y-2">
            <div className="space-y-1">
              <span className="block text-sm font-bold text-white">Active Predictive Model Selection</span>
              <span className="block text-[11px] text-slate-500 font-light">
                Model for causal reasoning and multi-sensory community hazard predictions.
              </span>
            </div>
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none"
            >
              <option value="gemini-3.5-flash">Google Gemini-3.5-Flash (Low Latency Core)</option>
              <option value="gemini-3.1-pro-preview">Google Gemini-3.1-Pro-Preview (Paid Reasoning Mode)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Database/Telemetry logs */}
      <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-5 shadow-2xl backdrop-blur-xl">
        <h4 className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
          <Server className="h-4 w-4 animate-pulse" />
          Network Pipeline Status
        </h4>

        <div className="space-y-3 font-mono text-[11px] text-slate-400">
          <div className="bg-slate-950/80 border border-slate-900 p-3 rounded-lg flex justify-between items-center">
            <span>Vertex AI Twin pipeline:</span>
            <span className="text-emerald-400 flex items-center gap-1"><span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" /> Synchronized</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-900 p-3 rounded-lg flex justify-between items-center">
            <span>District Telemetry Feed:</span>
            <span className="text-emerald-400 flex items-center gap-1">Connected</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-900 p-3 rounded-lg flex justify-between items-center">
            <span>BigQuery Index Sync:</span>
            <span className="text-cyan-400">1.2 Gb / min</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-900 p-3 rounded-lg flex justify-between items-center">
            <span>Guardian OS Version:</span>
            <span>3.5.2-Preview</span>
          </div>
        </div>
      </div>
    </div>
  );
}
