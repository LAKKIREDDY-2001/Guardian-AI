import { motion, AnimatePresence } from 'motion/react';
import { SimulationInputs, SimulationResult } from '../types';
import {
  Sliders,
  Play,
  Activity,
  Heart,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Sparkles,
  Zap,
  Flame,
  CloudRain,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';

const DEFAULT_INPUTS: SimulationInputs = {
  rainfall: 12,
  temperature: 24,
  trafficLoad: 45,
  hospitalCapacity: 85,
  roadClosures: 1,
  electricityDemand: 320,
  treePlantationCount: 2500,
  budgetAllocation: 12
};

export default function SimulationPage() {
  const [inputs, setInputs] = useState<SimulationInputs>({ ...DEFAULT_INPUTS });
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStatusMsg, setSimStatusMsg] = useState('');
  const [result, setResult] = useState<SimulationResult | null>(null);

  const resetInputs = () => {
    setInputs({ ...DEFAULT_INPUTS });
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    setResult(null);

    // Dynamic telemetry log messages to simulate deep predictive thinking
    const messages = [
      'Synchronizing Community digital twin grid lines...',
      'Mapping barometric pressure models & sewer velocities...',
      'Loading transformer coil core heating curves...',
      'Running Google Gemini neural predictive inferences...'
    ];

    let msgIdx = 0;
    setSimStatusMsg(messages[0]);
    const msgInterval = setInterval(() => {
      msgIdx++;
      if (msgIdx < messages.length) {
        setSimStatusMsg(messages[msgIdx]);
      }
    }, 700);

    try {
      const response = await fetch('/api/gemini/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(msgInterval);
      setIsSimulating(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'text-red-400 border-red-500/20 bg-red-500/5';
      case 'elevated':
        return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      case 'moderate':
        return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
      default:
        return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans text-left">
      {/* Left panel: Simulation Controls & Sliders */}
      <div className="lg:col-span-5 bg-slate-950/60 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-cyan-400" />
              <h3 className="font-extrabold text-white text-lg">What-If Control Deck</h3>
            </div>
            <button
              onClick={resetInputs}
              className="cursor-pointer text-slate-500 hover:text-white transition-colors flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider"
            >
              <RotateCcw className="h-3 w-3" />
              Reset Core
            </button>
          </div>

          {/* Sliders Grid */}
          <div className="space-y-4">
            {/* Rainfall */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CloudRain className="h-3.5 w-3.5 text-blue-400" /> Hourly Rainfall
                </span>
                <span className="text-white font-bold">{inputs.rainfall} mm/hr</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={inputs.rainfall}
                onChange={(e) => setInputs({ ...inputs, rainfall: Number(e.target.value) })}
                className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Temperature */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-orange-400" /> Ambient Temperature
                </span>
                <span className="text-white font-bold">{inputs.temperature} °C</span>
              </div>
              <input
                type="range"
                min="-10"
                max="50"
                value={inputs.temperature}
                onChange={(e) => setInputs({ ...inputs, temperature: Number(e.target.value) })}
                className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Traffic load */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Arterial Commute Traffic</span>
                <span className="text-white font-bold">{inputs.trafficLoad} %</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={inputs.trafficLoad}
                onChange={(e) => setInputs({ ...inputs, trafficLoad: Number(e.target.value) })}
                className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Hospital bed occupancy */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Hospital Bed Capacity</span>
                <span className="text-white font-bold">{inputs.hospitalCapacity} %</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={inputs.hospitalCapacity}
                onChange={(e) => setInputs({ ...inputs, hospitalCapacity: Number(e.target.value) })}
                className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Road Closures */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Major Road Barriers / Closures</span>
                <span className="text-white font-bold">{inputs.roadClosures} locations</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={inputs.roadClosures}
                onChange={(e) => setInputs({ ...inputs, roadClosures: Number(e.target.value) })}
                className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Electricity demand */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Electricity Grid Load</span>
                <span className="text-white font-bold">{inputs.electricityDemand} MW</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                value={inputs.electricityDemand}
                onChange={(e) => setInputs({ ...inputs, electricityDemand: Number(e.target.value) })}
                className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Tree planting offset */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">New Community Trees Planted</span>
                <span className="text-white font-bold">{inputs.treePlantationCount.toLocaleString()} trees</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={inputs.treePlantationCount}
                onChange={(e) => setInputs({ ...inputs, treePlantationCount: Number(e.target.value) })}
                className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Proactive Mitigation Budget</span>
                <span className="text-white font-bold">$ {inputs.budgetAllocation}M USD</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={inputs.budgetAllocation}
                onChange={(e) => setInputs({ ...inputs, budgetAllocation: Number(e.target.value) })}
                className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none"
              />
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-6 border-t border-slate-900 mt-6">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="cursor-pointer w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <Play className="h-5 w-5 fill-current text-white" />
            Run Digital Twin Simulation
          </button>
        </div>
      </div>

      {/* Right panel: Simulation Results Console */}
      <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-center relative min-h-[450px]">
        <AnimatePresence mode="wait">
          {isSimulating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-6 py-12"
            >
              {/* Spinning futuristic circular radar */}
              <div className="relative h-20 w-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/10 border-t-cyan-400 animate-spin" />
                <div className="absolute inset-3 rounded-full border-4 border-indigo-500/15 border-b-indigo-400 animate-[spin_1.5s_linear_infinite_reverse]" />
                <Sparkles className="h-6 w-6 text-cyan-400 animate-pulse" />
              </div>
              <div className="text-center space-y-1.5">
                <span className="block text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold animate-pulse">
                  SIMULATION ACTIVE
                </span>
                <p className="text-sm font-mono text-slate-400 font-light">{simStatusMsg}</p>
              </div>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 h-full flex flex-col justify-between"
            >
              {/* Top summary row */}
              <div className="flex flex-wrap gap-4 items-center justify-between border-b border-slate-900 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">
                    Simulation result logs
                  </span>
                  <h3 className="text-lg font-extrabold text-white leading-tight">Predictive Community Report</h3>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-widest font-semibold ${getSeverityColor(result.severity)}`}>
                  {result.severity} Risk
                </div>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 text-left">
                  <span className="block text-[8px] uppercase font-mono tracking-wider text-slate-500">Twin Risk Index</span>
                  <span className="text-2xl font-black text-white font-mono">{result.riskScore}%</span>
                  <span className="text-[9px] block text-slate-500 font-light mt-0.5">overall community hazard</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 text-left">
                  <span className="block text-[8px] uppercase font-mono tracking-wider text-slate-500">Financial Impact</span>
                  <span className={`text-2xl font-black font-mono ${result.financialImpact.startsWith('-') ? 'text-red-400' : 'text-emerald-400'}`}>
                    {result.financialImpact}
                  </span>
                  <span className="text-[9px] block text-slate-500 font-light mt-0.5">proactive offset cost</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 text-left">
                  <span className="block text-[8px] uppercase font-mono tracking-wider text-slate-500">Impacted Citizens</span>
                  <span className="text-2xl font-black text-white font-mono">{result.affectedCitizens.toLocaleString()}</span>
                  <span className="text-[9px] block text-slate-500 font-light mt-0.5">estimated exposure</span>
                </div>
              </div>

              {/* Narrative explanation */}
              <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4.5 space-y-2 text-left">
                <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold">
                  Gemini Predictive Synthesis
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{result.narrative}</p>
              </div>

              {/* Charts & micro system indicators split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Micro indicators */}
                <div className="space-y-3 text-left">
                  <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold">
                    System Sub-Indices
                  </span>
                  <div className="space-y-2.5">
                    {/* Flood probability */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Flood Inundation Probability</span>
                        <span className="text-white font-bold">{result.metrics.floodProbability}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${result.metrics.floodProbability}%` }} />
                      </div>
                    </div>

                    {/* Grid stability */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Power Grid Stability</span>
                        <span className="text-white font-bold">{result.metrics.gridStability}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${result.metrics.gridStability}%` }} />
                      </div>
                    </div>

                    {/* Response delay */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Average Emergency Response Delay</span>
                        <span className="text-white font-bold">{result.metrics.responseDelay} min</span>
                      </div>
                      <div className="h-1.5 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${Math.min(100, (result.metrics.responseDelay / 30) * 100)}%` }} />
                      </div>
                    </div>

                    {/* AQI */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Air Quality Index (PM2.5)</span>
                        <span className="text-white font-bold">{result.metrics.airQualityIndex} AQI</span>
                      </div>
                      <div className="h-1.5 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${Math.min(100, (result.metrics.airQualityIndex / 250) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom animated area chart */}
                <div className="space-y-3 text-left">
                  <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold">
                    Risk Progression Chart
                  </span>
                  <div className="h-[120px] bg-slate-950 border border-slate-900 rounded-xl p-3 flex flex-col justify-between">
                    {/* SVG Chart */}
                    <svg className="w-full h-20 text-cyan-400" viewBox="0 0 100 40">
                      <defs>
                        <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={`M 10 30 Q 35 ${30 - (result.charts[1]?.value / 100) * 20}, 60 ${30 - (result.charts[2]?.value / 100) * 20} T 90 ${30 - (result.charts[3]?.value / 100) * 20}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d={`M 10 30 Q 35 ${30 - (result.charts[1]?.value / 100) * 20}, 60 ${30 - (result.charts[2]?.value / 100) * 20} T 90 ${30 - (result.charts[3]?.value / 100) * 20} L 90 35 L 10 35 Z`}
                        fill="url(#chart-grad)"
                      />
                      <circle cx="90" cy={30 - (result.charts[3]?.value / 100) * 20} r="1.5" className="fill-cyan-400" />
                    </svg>
                    <div className="flex justify-between text-[8px] font-mono text-slate-500 px-1">
                      <span>Initial Forecast</span>
                      <span>Active Impact</span>
                      <span>Target Goal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mitigation Checklist */}
              <div className="space-y-2.5 pt-4 border-t border-slate-900 text-left">
                <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold">
                  Recommended Mitigation Blueprints
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.mitigationSteps.map((step, idx) => (
                    <div key={idx} className="bg-slate-950/60 border border-slate-900/60 p-3 rounded-lg flex items-center gap-2.5 text-xs">
                      <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                      <span className="text-slate-300 font-light">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
              <Activity className="h-10 w-10 text-slate-600 mb-2 animate-pulse" />
              <p className="text-sm font-semibold text-slate-300 mb-1">Predictive Digital Twin Ready</p>
              <p className="text-xs max-w-sm font-light">Set your environmental variables in the left panel and click 'Run Simulation' to model community outcomes via Google Gemini.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
