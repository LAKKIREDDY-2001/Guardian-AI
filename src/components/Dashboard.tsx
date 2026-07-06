import { motion } from 'motion/react';
import { OnboardingRole } from '../types';
import {
  Activity,
  ShieldCheck,
  TrendingUp,
  Cpu,
  AlertTriangle,
  Sun,
  Zap,
  Droplet,
  Heart,
  Users
} from 'lucide-react';

interface DashboardProps {
  userRole: OnboardingRole;
}

export default function Dashboard({ userRole }: DashboardProps) {
  // Customize welcome messages or focal cards based on role
  const getRoleHeader = () => {
    switch (userRole) {
      case 'hospital':
        return 'EMS & Emergency Admissions Control';
      case 'police':
        return 'Municipal Dispatch & Safe Transit Control';
      case 'utility':
        return 'Thermal Grid Load & Aquifer Telemetry';
      case 'fire_department':
        return 'Hydroland Water Pressure & Spotter Arrays';
      default:
        return 'Executive Community digital Twin Command';
    }
  };

  const getCustomInsight = () => {
    switch (userRole) {
      case 'hospital':
        return 'Triage beds are standing by. Grid monitoring signals possible local air sags around District 4 in 2 hours.';
      case 'police':
        return 'No major freeway accidents reported. Ward 12 subpass sensor monitoring active stormwater build-up.';
      case 'utility':
        return 'District 3 transformercore thermal winding is holding steady at 82°C. Demand Response profile ready.';
      case 'fire_department':
        return 'Wildfire index is at lowest tier due to heavy condensation. Sump flow monitoring active in District 4.';
      default:
        return 'Continuous simulation active. Sensor arrays are sending 142 discrete telemetry feeds at 100% sync frequency.';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* HUD Header Alert Block */}
      <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            System Status: Connected
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">{getRoleHeader()}</h2>
          <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-2xl">{getCustomInsight()}</p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 py-2.5 px-4 rounded-xl font-mono text-xs">
          <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
          <span className="text-slate-400">Grid Telemetry Sync:</span>
          <span className="font-bold text-emerald-400">99.9%</span>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Community Health Score */}
        <div className="bg-slate-900/25 border border-slate-900 hover:border-cyan-500/30 rounded-2xl p-4 text-left transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-blue-500/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[8px] uppercase tracking-wider font-mono text-slate-500 font-bold">Community Health</span>
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-all">
              <Heart className="h-4.5 w-4.5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white font-mono">94 / 100</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 mt-2">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+1.2% this hour</span>
          </div>
        </div>

        {/* Safety Score */}
        <div className="bg-slate-900/25 border border-slate-900 hover:border-emerald-500/30 rounded-2xl p-4 text-left transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-emerald-500/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[8px] uppercase tracking-wider font-mono text-slate-500 font-bold">Safety Index</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white font-mono">88 / 100</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 mt-2">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Optimal margin holding</span>
          </div>
        </div>

        {/* Air Quality Index */}
        <div className="bg-slate-900/25 border border-slate-900 hover:border-purple-500/30 rounded-2xl p-4 text-left transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-purple-500/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[8px] uppercase tracking-wider font-mono text-slate-500 font-bold">Air Quality Index</span>
            <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-all">
              <Cpu className="h-4.5 w-4.5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white font-mono">42 AQI</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 mt-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>PM2.5: Excellent</span>
          </div>
        </div>

        {/* Hazard Risk level */}
        <div className="bg-slate-900/25 border border-slate-900 hover:border-amber-500/30 rounded-2xl p-4 text-left transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-amber-500/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[8px] uppercase tracking-wider font-mono text-slate-500 font-bold">Active Risk Level</span>
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-all">
              <AlertTriangle className="h-4.5 w-4.5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white font-mono">Moderate</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-400 mt-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>1 active warning</span>
          </div>
        </div>
      </div>

      {/* Secondary scorecard grid (Weather, Utility, Water, Satisfaction) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weather */}
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 text-left flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-cyan-400 shrink-0">
            <Sun className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[8px] uppercase tracking-wider font-mono text-slate-500 font-bold">Micro Climate</span>
            <span className="block text-sm font-extrabold text-white">24°C • Overcast</span>
            <span className="block text-[9px] text-slate-500">65% ambient humidity</span>
          </div>
        </div>

        {/* Electricity */}
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 text-left flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-amber-400 shrink-0">
            <Zap className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="block text-[8px] uppercase tracking-wider font-mono text-slate-500 font-bold">Grid Stability</span>
            <span className="block text-sm font-extrabold text-white">91.2% capacity</span>
          </div>
        </div>

        {/* Water supply */}
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 text-left flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-blue-400 shrink-0">
            <Droplet className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[8px] uppercase tracking-wider font-mono text-slate-500 font-bold">Water Reservoirs</span>
            <span className="block text-sm font-extrabold text-white">96.4% level</span>
          </div>
        </div>

        {/* Satisfaction */}
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 text-left flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-indigo-400 shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[8px] uppercase tracking-wider font-mono text-slate-500 font-bold">Citizen Satisfaction</span>
            <span className="block text-sm font-extrabold text-white">94.8% rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
