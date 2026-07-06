import { motion } from 'motion/react';
import {
  Flame,
  Phone,
  ShieldAlert,
  Compass,
  BellRing,
  Volume2,
  Heart,
  Navigation,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';

export default function EmergencyDashboard() {
  const [sirensActive, setSirensActive] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const triggerSirenOverride = () => {
    setSirensActive(!sirensActive);
  };

  const triggerEmergencyBroadcast = () => {
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 font-sans text-left bg-red-950/20 border border-red-900/60 p-5 sm:p-6 rounded-2xl relative overflow-hidden animate-[pulse_6s_infinite]">
      {/* Background Alerts Overlay */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />

      {/* Extreme High-Intensity Header */}
      <div className="border-b border-red-900/60 pb-5 space-y-3 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-red-600 border border-red-500/30 flex items-center justify-center text-white shadow-lg shadow-red-600/40 animate-pulse">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400 animate-ping" />
                GUARDIAN CRISIS COMMAND • HIGH ALERT MODE ACTIVE
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">Municipal Crisis Emergency HUD</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerSirenOverride}
              className={`cursor-pointer font-mono text-[10px] uppercase tracking-widest font-bold px-4 py-2.5 rounded-lg border transition-all ${
                sirensActive
                  ? 'bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/20'
                  : 'bg-red-950/80 border-red-900/60 text-red-400 hover:bg-red-900/40'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Volume2 className="h-4 w-4" />
                {sirensActive ? 'SIRENS DEPLOYED' : 'TRIGGER MUNICIPAL SIRENS'}
              </span>
            </button>
          </div>
        </div>
        <p className="text-red-300 text-xs leading-relaxed max-w-3xl">
          Standard operational configurations have been superseded by Emergency Protocols. Public broadcasting gates, siren arrays, and satellite geolocation telemetry lines are locked in direct crisis override.
        </p>
      </div>

      {/* Geolocation Evacuation Map mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        <div className="lg:col-span-8 bg-slate-950/80 border border-red-900/40 rounded-xl p-4.5 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-[9px] uppercase font-mono tracking-widest text-red-400 font-bold flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-red-400 animate-spin" />
              Dynamic Evacuation Geopaths (Causal routing)
            </span>
            <h3 className="text-lg font-extrabold text-white mt-1">District 4 Safe-Route Vectors</h3>
          </div>

          {/* Map Vector Grid with Route markings */}
          <div className="relative aspect-[16/9] w-full bg-slate-900/10 border border-red-900/20 rounded-lg overflow-hidden my-4">
            <svg className="absolute inset-0 h-full w-full opacity-45" viewBox="0 0 600 338">
              {/* Street grid overlay */}
              <path d="M 50 100 L 550 100" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
              <path d="M 100 50 L 100 300" fill="none" stroke="#475569" strokeWidth="1" />
              <path d="M 300 50 L 300 300" fill="none" stroke="#475569" strokeWidth="1" />
              <path d="M 500 50 L 500 300" fill="none" stroke="#475569" strokeWidth="1" />

              {/* Dynamic evacuation route highlighted in glowing green/blue */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                d="M 100 280 C 200 280, 250 100, 500 100"
                fill="none"
                stroke="#22c55e"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Inundated area overlay */}
              <circle cx="280" cy="180" r="50" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1" />
            </svg>
            <div className="absolute top-3 left-3 bg-red-950/90 border border-red-500/30 rounded py-1 px-2.5 font-mono text-[9px] text-red-400 uppercase tracking-wider animate-pulse">
              Inundation Flood Cell Active
            </div>
            <div className="absolute bottom-3 right-3 bg-emerald-950/90 border border-emerald-500/30 rounded py-1 px-2.5 font-mono text-[9px] text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <Navigation className="h-3.5 w-3.5 animate-bounce" />
              Optimal Geopath safe route
            </div>
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-slate-500 border-t border-red-950 pt-3">
            <span>Critical Hub Satellite: GPS-E4</span>
            <span className="text-emerald-400">Rerouting Efficacy: 94.2%</span>
          </div>
        </div>

        {/* Right side: Emergency Agencies & Geolocation nodes */}
        <div className="lg:col-span-4 space-y-4">
          {/* Emergency contacts card */}
          <div className="bg-slate-950/80 border border-red-900/40 rounded-xl p-4.5 space-y-3.5">
            <h4 className="text-xs uppercase font-mono tracking-widest text-red-400 font-bold flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              Emergency Response Dispatchers
            </h4>

            <div className="space-y-2.5">
              {/* Mercy Hospital */}
              <div className="bg-slate-900/50 border border-red-950/60 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-white">Mercy Center General</span>
                  <span className="block text-[9px] font-mono text-slate-500">Triage Intake priority</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                  9 beds free
                </span>
              </div>

              {/* Fire station */}
              <div className="bg-slate-900/50 border border-red-950/60 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-white">District 4 Fire Rescue</span>
                  <span className="block text-[9px] font-mono text-slate-500">Water pumps array ready</span>
                </div>
                <span className="text-[10px] font-mono text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded font-bold animate-pulse">
                  Deploying
                </span>
              </div>

              {/* Shelter */}
              <div className="bg-slate-900/50 border border-red-950/60 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-white">Sector 5 Community Shelter</span>
                  <span className="block text-[9px] font-mono text-slate-500">Evacuation holding center</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                  82% space remaining
                </span>
              </div>
            </div>
          </div>

          {/* Quick crisis broadcaster */}
          <div className="bg-slate-950/80 border border-red-900/40 rounded-xl p-4.5 space-y-3.5">
            <h4 className="text-xs uppercase font-mono tracking-widest text-red-400 font-bold flex items-center gap-1.5">
              <BellRing className="h-4 w-4 text-red-400 animate-bounce" />
              Crisis Broadcast Console
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
              Submit a real-time warning broadcast to all municipal television receivers, citizen cellphones, and school displays in the threatened region.
            </p>

            <button
              onClick={triggerEmergencyBroadcast}
              disabled={isBroadcasting}
              className="cursor-pointer w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              {isBroadcasting ? 'BROADCASTING URGENT FEED...' : 'TRANSMIT WARNING BROADCAST'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
