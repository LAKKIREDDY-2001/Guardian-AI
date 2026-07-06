import { motion } from 'motion/react';
import { OnboardingRole } from '../types';
import {
  Shield,
  Building2,
  Users,
  Activity,
  UserCheck,
  Globe,
  HeartHandshake,
  GraduationCap,
  Wrench,
  Flame,
  Check,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

interface OnboardingProps {
  onComplete: (role: OnboardingRole) => void;
}

interface RoleOption {
  id: OnboardingRole;
  title: string;
  description: string;
  icon: any;
  themeColor: string;
  focusMetric: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'government',
    title: 'Government / Municipality',
    description: 'City administration, resource allocations, smart budget planning, and overall municipal health scoring.',
    icon: Building2,
    themeColor: 'border-blue-500/40 hover:border-blue-500 bg-blue-500/5 text-blue-400',
    focusMetric: 'Community Health & Budget Efficacy'
  },
  {
    id: 'citizen',
    title: 'Citizen',
    description: 'Neighborhood safety summaries, air quality warnings, water availability indices, and citizen reporting interfaces.',
    icon: Users,
    themeColor: 'border-indigo-500/40 hover:border-indigo-500 bg-indigo-500/5 text-indigo-400',
    focusMetric: 'Local Air Quality & Safety Alerts'
  },
  {
    id: 'hospital',
    title: 'Hospital / EMS',
    description: 'Triage tracking, emergency bed occupancy alerts, medical inventory, and public wellness correlations.',
    icon: Activity,
    themeColor: 'border-emerald-500/40 hover:border-emerald-500 bg-emerald-500/5 text-emerald-400',
    focusMetric: 'Bed Influx & Heat Wave Syncope Stress'
  },
  {
    id: 'police',
    title: 'Police Department',
    description: 'Real-time incident dispatches, security alerts, high-risk community zones, and bottleneck road guidance.',
    icon: UserCheck,
    themeColor: 'border-cyan-500/40 hover:border-cyan-500 bg-cyan-500/5 text-cyan-400',
    focusMetric: 'Commute Bottlenecks & Public Dispatch'
  },
  {
    id: 'ngo',
    title: 'NGO / Community Lead',
    description: 'Disaster shelters mapping, garbage overflow tracking, food bank capacity, and mutual-aid assistance networks.',
    icon: HeartHandshake,
    themeColor: 'border-purple-500/40 hover:border-purple-500 bg-purple-500/5 text-purple-400',
    focusMetric: 'Shelter Allocations & Aid Supply'
  },
  {
    id: 'school',
    title: 'School / Education Board',
    description: 'Storm closure announcements, severe heat recommendations, and localized bus dispatch routing.',
    icon: GraduationCap,
    themeColor: 'border-teal-500/40 hover:border-teal-500 bg-teal-500/5 text-teal-400',
    focusMetric: 'School Safety Indices & Safe-Paths'
  },
  {
    id: 'utility',
    title: 'Utilities & Smart Grid',
    description: 'Thermal load profiling, transformer core overheat tracking, clean water reservoirs, and smart-meter sags.',
    icon: Wrench,
    themeColor: 'border-amber-500/40 hover:border-amber-500 bg-amber-500/5 text-amber-400',
    focusMetric: 'Substation Temps & Reservoir Volumes'
  },
  {
    id: 'fire_department',
    title: 'Fire Department',
    description: 'Sewer backflow levels, wild land thermal hotspots, fire risk levels, and localized water reservoir access.',
    icon: Flame,
    themeColor: 'border-red-500/40 hover:border-red-500 bg-red-500/5 text-red-400',
    focusMetric: 'Wild Land Thermal Spots & Hydrant Pressures'
  }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [selected, setSelected] = useState<OnboardingRole>('government');
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete(selected);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center font-sans px-4 overflow-hidden">
      {/* Background Orbits */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-950/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10 bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center border border-blue-400/25">
              <Shield className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-wide">Onboarding Configuration</span>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Step {step} of 2
          </span>
        </div>

        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Who are you in this community?</h2>
              <p className="text-slate-400 text-sm mt-1.5">
                Guardian AI customizes its predictive dashboards, notification sensitivities, and warning thresholds based on your administrative scope.
              </p>
            </div>

            {/* Role Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-800">
              {ROLE_OPTIONS.map((role) => {
                const IconComp = role.icon;
                const isSelected = selected === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelected(role.id)}
                    className={`cursor-pointer text-left p-4 rounded-xl border transition-all flex items-start gap-4 hover:scale-[1.01] ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/10 ring-1 ring-cyan-400/50'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/40'
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 border ${
                      isSelected ? 'border-cyan-400/30 bg-cyan-500/10 text-cyan-400' : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}>
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-white">{role.title}</span>
                        {isSelected && (
                          <span className="h-4 w-4 rounded-full bg-cyan-400 flex items-center justify-center">
                            <Check className="h-2.5 w-2.5 text-slate-950 stroke-[3px]" />
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{role.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Confirm Customization Settings</h2>
              <p className="text-slate-400 text-sm mt-1.5">
                Excellent. Guardian AI has customized your profile telemetry metrics. Confirm your operating parameters.
              </p>
            </div>

            {/* Confirmation Box */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-xs uppercase font-mono tracking-widest text-slate-500">Selected Profile</span>
                  <span className="text-lg font-bold text-white capitalize">
                    {selected.replace('_', ' ')} Command deck
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-900">
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-widest text-slate-500">Core Diagnostic Indicator</span>
                  <span className="text-sm font-semibold text-cyan-400">
                    {ROLE_OPTIONS.find((r) => r.id === selected)?.focusMetric || 'General Operations'}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-widest text-slate-500">System Priority</span>
                  <span className="text-sm font-semibold text-indigo-400">Predictive Prevention</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="block text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1.5">Pre-Seeded Integrations</span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-slate-400">District Telemetry Radar</span>
                  <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-slate-400">Regional SmartGrid API</span>
                  <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-cyan-400">Gemini-3.5-Flash Predictive Core</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Actions */}
        <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-slate-900">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="cursor-pointer font-mono text-xs text-slate-400 hover:text-white px-4 py-2.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-all"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-medium px-6 py-2.5 rounded-lg transition-all hover:scale-[1.01]"
          >
            {step === 1 ? 'Configure Telemetry' : 'Deploy Digital Twin'}
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
