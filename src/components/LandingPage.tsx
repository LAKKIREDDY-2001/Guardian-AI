import { motion } from 'motion/react';
import { Shield, Sparkles, Activity, Globe, ArrowRight, Play, CloudRain, Cpu } from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
  onWatchDemo: () => void;
}

export default function LandingPage({ onLaunch, onWatchDemo }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col justify-between font-sans">
      {/* Absolute futuristic grid & glowing background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Animated Floating Data Grid Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100 - Math.random() * 200],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 border border-blue-400/30">
            <Shield className="h-5.5 w-5.5 text-white" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              Guardian AI
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-cyan-400 font-mono font-semibold">
              Digital Twin OS
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Active Grid: Node-04
          </span>
        </div>
      </header>

      {/* Main Hero Body */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-6 py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Copywriting & High Impact CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-full py-1.5 px-4 text-xs font-medium text-slate-300 shadow-inner"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Google Cloud Hackathon Winning Vision</span>
            <span className="h-3 w-px bg-slate-800" />
            <span className="text-cyan-400 font-mono">v3.5 Live</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
              Predict Tomorrow. <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Protect Today.
              </span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl max-w-xl font-light leading-relaxed">
              Guardian AI is an advanced Community Digital Twin. Instead of reacting to disasters, our neural intelligence monitors multi-sensor grid arrays to model environmental hazards hours before they materialize.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onLaunch}
              className="group cursor-pointer relative inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-medium px-8 py-4 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-indigo-500/30 transition-all border border-blue-400/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Launch Guardian OS
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onWatchDemo}
              className="cursor-pointer inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-medium px-6 py-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="h-4 w-4 fill-current text-cyan-400" />
              Watch Live Simulation
            </button>
          </motion.div>

          {/* Quick micro statistics row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-900 max-w-lg"
          >
            <div>
              <span className="block text-2xl font-bold text-white font-mono">98.4%</span>
              <span className="text-xs text-slate-500">Prediction Accuracy</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-cyan-400 font-mono">-14m</span>
              <span className="text-xs text-slate-500">First-Response Offset</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-indigo-400 font-mono">35K+</span>
              <span className="text-xs text-slate-500">Lives Safeguarded</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Floating Interactive Digital Twin Globe/Map Artwork */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative h-[360px] w-[360px] sm:h-[420px] sm:w-[420px] flex items-center justify-center"
          >
            {/* Spinning ambient outer glow orbits */}
            <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/10 animate-[spin_120s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-dashed border-cyan-500/20 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-16 rounded-full border border-indigo-500/20 animate-[spin_30s_linear_infinite]" />

            {/* Glowing vector grid container representing the Community Twin */}
            <div className="absolute inset-24 bg-gradient-to-tr from-blue-900/20 to-indigo-900/10 rounded-full border border-blue-500/30 flex items-center justify-center overflow-hidden shadow-2xl shadow-indigo-500/10">
              {/* Complex Digital Twin Vector Grid */}
              <svg className="absolute h-full w-full opacity-60 text-indigo-500" viewBox="0 0 200 200">
                <defs>
                  <radialGradient id="grid-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="90" fill="url(#grid-glow)" />
                {/* Simulated street/infrastructure lines */}
                <path d="M 10 100 Q 100 10 190 100" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M 10 100 Q 100 190 190 100" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M 100 10 V 190" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                <path d="M 10 100 H 190" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.25" />
                {/* Node Intercept connections */}
                <circle cx="65" cy="55" r="2.5" className="fill-cyan-400 animate-ping" />
                <circle cx="65" cy="55" r="1.5" className="fill-cyan-400" />
                <circle cx="135" cy="145" r="2" className="fill-indigo-400" />
                <circle cx="140" cy="65" r="3" className="fill-red-500 animate-pulse" />
              </svg>
              <Globe className="h-16 w-16 text-indigo-200/40 animate-[spin_240s_linear_infinite]" />
            </div>

            {/* Glowing floated metrics panels (The "Alive UI" feel) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-2 bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3 shadow-xl backdrop-blur-md"
            >
              <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400">
                <CloudRain className="h-4.5 w-4.5" />
              </div>
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono">Flood Threat</span>
                <span className="text-xs font-bold text-red-400">87% Probability</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-2 -left-6 bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3 shadow-xl backdrop-blur-md"
            >
              <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono">Utility Load</span>
                <span className="text-xs font-bold text-cyan-400">Stable (91.2%)</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
            >
              <div className="px-3.5 py-1.5 bg-slate-950/90 border border-cyan-500/40 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1.5 animate-pulse">
                <Activity className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-[10px] font-bold tracking-widest text-white uppercase font-mono">Living Digital Twin</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Futuristic footer describing capabilities */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 backdrop-blur-sm py-8 px-6 text-slate-500 font-mono text-xs text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Guardian AI Neural Modeling Service • Connected to District Sensors</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-cyan-400 transition-colors">BigQuery Feed</span>
            <span>•</span>
            <span className="hover:text-indigo-400 transition-colors">Gemini Real-Time</span>
            <span>•</span>
            <span className="hover:text-cyan-400 transition-colors">Vertex AI Twin</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
