import { motion, AnimatePresence } from 'motion/react';
import { PredictionItem } from '../types';
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Cpu,
  Bookmark,
  ExternalLink,
  ShieldAlert,
  Droplet,
  CloudRain,
  Flame,
  Activity,
  Zap,
  Database
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface PredictionsPageProps {
  predictions: PredictionItem[];
  highlightedPredictionId?: string | null;
}

export default function PredictionsPage({ predictions, highlightedPredictionId }: PredictionsPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(predictions[0]?.id || null);

  useEffect(() => {
    if (highlightedPredictionId) {
      setExpandedId(highlightedPredictionId);
    }
  }, [highlightedPredictionId]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getSeverityBadge = (severity: PredictionItem['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/15 border-red-500/30 text-red-400';
      case 'high':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-400';
      case 'medium':
        return 'bg-blue-500/15 border-blue-500/30 text-blue-400';
      case 'low':
        return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
    }
  };

  const getIcon = (type: string) => {
    const norm = type.toLowerCase();
    if (norm.includes('flood')) return <CloudRain className="h-5 w-5 text-blue-400" />;
    if (norm.includes('power') || norm.includes('outage')) return <Zap className="h-5 w-5 text-amber-400" />;
    if (norm.includes('hospital')) return <Activity className="h-5 w-5 text-emerald-400" />;
    if (norm.includes('pollution') || norm.includes('air')) return <Cpu className="h-5 w-5 text-purple-400" />;
    return <AlertTriangle className="h-5 w-5 text-cyan-400" />;
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/60 border border-slate-900 rounded-2xl p-5 shadow-2xl">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Neural Predictive Operations
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">Active Hazard Projections</h2>
          <p className="text-slate-400 text-xs mt-1 leading-relaxed">
            Guardian AI continuously evaluates real-time telemetry datasets through dynamic causal models to predict neighborhood safety vulnerabilities.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl shrink-0">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <div className="text-left font-mono">
            <span className="block text-[8px] uppercase text-slate-500 font-semibold">Average Accuracy</span>
            <span className="text-sm font-bold text-white">98.4% Precision</span>
          </div>
        </div>
      </div>

      {/* Predictions Expandable Stack */}
      <div className="space-y-4">
        {predictions.map((pred) => {
          const isExpanded = expandedId === pred.id;
          return (
            <div
              key={pred.id}
              className={`bg-slate-900/25 border transition-all rounded-2xl overflow-hidden ${
                isExpanded ? 'border-cyan-500/40 shadow-2xl bg-slate-900/40' : 'border-slate-900 hover:border-slate-800'
              }`}
            >
              {/* Card Header Section */}
              <button
                onClick={() => toggleExpand(pred.id)}
                className="cursor-pointer w-full text-left p-5 flex items-center justify-between gap-6 hover:bg-slate-900/20 transition-colors"
              >
                <div className="flex items-center gap-4.5 flex-1 min-w-0">
                  <div className="h-11 w-11 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0">
                    {getIcon(pred.type)}
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-base font-extrabold text-white leading-none">{pred.type}</h3>
                      <span className={`text-[9px] uppercase tracking-wider font-mono border px-2.5 py-0.5 rounded-full font-semibold ${getSeverityBadge(pred.severity)}`}>
                        {pred.severity}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs truncate max-w-lg">{pred.hazard}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right font-mono hidden sm:block">
                    <span className="block text-[8px] uppercase text-slate-500 font-semibold">Probability</span>
                    <span className="text-base font-extrabold text-white">{pred.probability}%</span>
                  </div>
                  <div className="text-right font-mono hidden md:block">
                    <span className="block text-[8px] uppercase text-slate-500 font-semibold">Time Horizon</span>
                    <span className="text-xs font-semibold text-cyan-400">{pred.timeframe}</span>
                  </div>
                  <div className="text-slate-500 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>
              </button>

              {/* Expandable Body */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-slate-900/80 bg-slate-950/40"
                  >
                    <div className="p-6 space-y-6 text-left">
                      {/* Grid explanation */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Causal reason */}
                        <div className="lg:col-span-7 space-y-3.5">
                          <h4 className="text-xs uppercase font-mono tracking-widest text-slate-500 font-bold flex items-center gap-1.5">
                            <Bookmark className="h-3.5 w-3.5 text-cyan-400" />
                            Causal Inference & Telemetry
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed font-light">{pred.reason}</p>

                          {/* Data sources */}
                          <div className="pt-3">
                            <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-500 mb-2">Authenticated Data Sources</span>
                            <div className="flex flex-wrap gap-2">
                              {pred.dataSources.map((source, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] font-mono bg-slate-950 border border-slate-900 px-2.5 py-1 rounded-md text-slate-400 flex items-center gap-1"
                                >
                                  <Database className="h-3 w-3 text-slate-600" />
                                  {source}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Telemetry Evidence checklist */}
                        <div className="lg:col-span-5 space-y-3.5 bg-slate-950/65 border border-slate-900 rounded-xl p-4.5">
                          <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                            <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
                            Diagnostic Evidence
                          </h4>
                          <div className="space-y-2.5">
                            {pred.evidence.map((ev, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                                <p className="text-slate-400 font-light">{ev}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* AI Recommendations Action Plan */}
                      <div className="space-y-3 pt-4 border-t border-slate-900">
                        <h4 className="text-xs uppercase font-mono tracking-widest text-slate-500 font-bold">
                          AI Automated Action Recommendations
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {pred.recommendations.map((rec, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-950/80 border border-slate-900 p-4 rounded-xl flex items-start gap-3 hover:border-cyan-500/30 transition-all group"
                            >
                              <span className="h-5 w-5 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 font-mono text-[10px] font-bold text-cyan-400 group-hover:bg-cyan-500/20">
                                0{idx + 1}
                              </span>
                              <p className="text-xs text-slate-300 leading-relaxed font-light">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
