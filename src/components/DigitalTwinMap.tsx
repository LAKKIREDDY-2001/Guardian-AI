import { motion, AnimatePresence } from 'motion/react';
import { MapHotspot } from '../types';
import {
  ShieldAlert,
  Info,
  Users,
  Activity,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Database,
  Zap
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface DigitalTwinMapProps {
  hotspots: MapHotspot[];
  onTriggerAction: (action: string, hotspotId: string) => void;
  highlightedHotspotId?: string | null;
}

export default function DigitalTwinMap({ hotspots, onTriggerAction, highlightedHotspotId }: DigitalTwinMapProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<MapHotspot | null>(hotspots[0] || null);

  useEffect(() => {
    if (highlightedHotspotId) {
      const match = hotspots.find((h) => h.id === highlightedHotspotId);
      if (match) {
        setSelectedHotspot(match);
      }
    }
  }, [highlightedHotspotId, hotspots]);
  const [activeLayers, setActiveLayers] = useState<{ [key: string]: boolean }>({
    flowGrid: true,
    thermal: true,
    nodes: true
  });

  const toggleLayer = (layer: string) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const getStatusColor = (status: MapHotspot['status']) => {
    switch (status) {
      case 'safe':
        return 'fill-emerald-500 stroke-emerald-500';
      case 'warning':
        return 'fill-amber-500 stroke-amber-500';
      case 'critical':
        return 'fill-red-500 stroke-red-500';
      case 'prediction':
        return 'fill-purple-500 stroke-purple-500';
    }
  };

  const getStatusBg = (status: MapHotspot['status']) => {
    switch (status) {
      case 'safe':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'warning':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'critical':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'prediction':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans">
      {/* Left side: Immersive Digital Twin Canvas */}
      <div className="lg:col-span-8 flex flex-col justify-between bg-slate-950/60 border border-slate-900 rounded-2xl p-5 relative overflow-hidden min-h-[500px] shadow-2xl">
        {/* Background micro grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.45)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Map Header with controls */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 font-bold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Living Digital Twin Simulator
            </span>
            <h2 className="text-xl font-extrabold text-white">Dynamic CommuniTwin HUD</h2>
          </div>

          {/* Layer Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleLayer('flowGrid')}
              className={`cursor-pointer font-mono text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-lg border transition-all ${
                activeLayers.flowGrid
                  ? 'bg-blue-600/10 border-blue-500/40 text-blue-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              Hydrology Grid
            </button>
            <button
              onClick={() => toggleLayer('thermal')}
              className={`cursor-pointer font-mono text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-lg border transition-all ${
                activeLayers.thermal
                  ? 'bg-amber-600/10 border-amber-500/40 text-amber-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              Thermal Sensor Array
            </button>
            <button
              onClick={() => toggleLayer('nodes')}
              className={`cursor-pointer font-mono text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-lg border transition-all ${
                activeLayers.nodes
                  ? 'bg-purple-600/10 border-purple-500/40 text-purple-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              Logical Nodes
            </button>
          </div>
        </div>

        {/* Interactive Map Canvas Container */}
        <div className="relative flex-1 flex items-center justify-center py-6">
          <div className="relative w-full max-w-2xl aspect-[16/9] bg-slate-900/10 border border-slate-900/60 rounded-xl overflow-hidden shadow-inner">
            {/* Base vector map artwork (Streets, Canals) */}
            <svg className="absolute inset-0 h-full w-full opacity-35" viewBox="0 0 800 450">
              {/* Main Expressway Grid */}
              <path d="M 50 150 L 750 150" fill="none" stroke="#334155" strokeWidth="2.5" />
              <path d="M 120 50 L 120 400" fill="none" stroke="#334155" strokeWidth="2.5" />
              <path d="M 400 50 L 400 400" fill="none" stroke="#334155" strokeWidth="2" />
              <path d="M 680 50 L 680 400" fill="none" stroke="#334155" strokeWidth="2" />

              {/* Grid Connection Lanes */}
              <path d="M 50 300 C 250 300, 350 200, 750 200" fill="none" stroke="#1e293b" strokeWidth="1.5" />
              <path d="M 200 50 L 600 400" fill="none" stroke="#1e293b" strokeWidth="1" />

              {/* Water Canal Overlay */}
              {activeLayers.flowGrid && (
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  d="M 50 180 Q 250 120, 500 240 T 750 380"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3.5"
                  strokeOpacity="0.85"
                />
              )}

              {/* Heat thermal rings */}
              {activeLayers.thermal && (
                <>
                  <circle cx="220" cy="180" r="40" fill="#f59e0b" fillOpacity="0.05" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3,3" />
                  <circle cx="550" cy="300" r="60" fill="#ef4444" fillOpacity="0.04" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="4,4" />
                </>
              )}
            </svg>

            {/* Glowing signal transit particles (The "Alive UI" effect) */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, idx) => (
                <motion.div
                  key={idx}
                  className="absolute h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400"
                  animate={{
                    left: ['15%', '50%', '85%'],
                    top: ['33%', '53%', '44%'],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: idx * 2
                  }}
                />
              ))}
            </div>

            {/* Interactive Map Markers */}
            {hotspots.map((hs) => {
              const isSelected = selectedHotspot?.id === hs.id;
              const colorClass = getStatusColor(hs.status);
              return (
                <motion.button
                  key={hs.id}
                  onClick={() => setSelectedHotspot(hs)}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 focus:outline-none z-10"
                  style={{ left: `${(hs.lng / 800) * 100}%`, top: `${(hs.lat / 450) * 100}%` }}
                  whileHover={{ scale: 1.25 }}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    {/* Ring animation */}
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${
                      hs.status === 'critical' ? 'bg-red-400' : hs.status === 'warning' ? 'bg-amber-400' : hs.status === 'prediction' ? 'bg-purple-400' : 'bg-emerald-400'
                    }`} />
                    <span className={`relative inline-flex rounded-full h-4.5 w-4.5 border-2 border-slate-950 shadow-md ${
                      hs.status === 'critical' ? 'bg-red-500' : hs.status === 'warning' ? 'bg-amber-500' : hs.status === 'prediction' ? 'bg-purple-500' : 'bg-emerald-500'
                    } ${isSelected ? 'ring-2 ring-white scale-110' : ''}`} />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Dynamic map legend */}
        <div className="relative z-10 flex flex-wrap gap-4 items-center justify-between border-t border-slate-900 pt-4 text-xs font-mono text-slate-500">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Nominally Safe</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Active Warning</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Critical Condition</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-purple-500" /> AI Hazard Prediction</span>
          </div>
          <span>District Sensors Online: 142/142</span>
        </div>
      </div>

      {/* Right side: High-Fidelity Sliding AI Reasoning Panel */}
      <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {selectedHotspot ? (
            <motion.div
              key={selectedHotspot.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-5 flex-1 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] uppercase tracking-widest font-mono border px-2.5 py-1 rounded-full font-semibold ${getStatusBg(selectedHotspot.status)}`}>
                    {selectedHotspot.status} hotspot
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 font-mono text-[10px]">
                    <TrendingUp className="h-3 w-3 text-cyan-400" />
                    <span>Confidence: {selectedHotspot.confidence}%</span>
                  </div>
                </div>
                <h3 className="text-lg font-extrabold text-white leading-snug">{selectedHotspot.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{selectedHotspot.hazard}</p>
              </div>

              {/* AI Reasoning Block */}
              <div className="bg-slate-950/75 border border-slate-900 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 font-mono">
                  <Activity className="h-4 w-4" />
                  <span>AI CAUSAL INTERPOLATION</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{selectedHotspot.aiReasoning}</p>
              </div>

              {/* Key Indicators */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/40 border border-slate-900/60 rounded-xl p-3 text-left">
                  <span className="block text-[8px] uppercase font-mono tracking-wider text-slate-500">Citizen Impact</span>
                  <span className="text-sm font-bold text-white font-mono">{selectedHotspot.affectedCount.toLocaleString()}</span>
                  <span className="text-[9px] block text-slate-600">under risk matrix</span>
                </div>
                <div className="bg-slate-950/40 border border-slate-900/60 rounded-xl p-3 text-left">
                  <span className="block text-[8px] uppercase font-mono tracking-wider text-slate-500">Telemetry Feed</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono">100% Sync</span>
                  <span className="text-[9px] block text-slate-600">real-time frequency</span>
                </div>
              </div>

              {/* Timeline feed */}
              <div className="space-y-2.5">
                <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-500">Node History Logs</span>
                <div className="space-y-2 max-h-[110px] overflow-y-auto pr-1">
                  {selectedHotspot.timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-left text-xs leading-relaxed">
                      <Clock className="h-3.5 w-3.5 text-slate-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-cyan-400 font-mono text-[10px] font-semibold mr-1.5">{item.time}</span>
                        <span className="text-slate-400 font-light">{item.event}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="space-y-3 pt-3 border-t border-slate-900">
                <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-500">AI Response Directives</span>
                <div className="space-y-2">
                  {selectedHotspot.actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => onTriggerAction(action, selectedHotspot.id)}
                      className="cursor-pointer w-full text-left bg-slate-950/50 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/40 p-2.5 rounded-lg text-xs font-medium text-slate-200 flex items-center justify-between transition-all hover:translate-x-1 group"
                    >
                      <span className="truncate pr-4">{action}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
              <Info className="h-8 w-8 text-slate-600 mb-2" />
              <p className="text-xs">Select any digital twin node on the vector map to analyze telemetry models.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
