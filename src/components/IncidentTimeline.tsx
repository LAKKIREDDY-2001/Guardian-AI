import { motion } from 'motion/react';
import { IncidentEvent } from '../types';
import {
  Clock,
  Volume2,
  FileText,
  AlertTriangle,
  Info,
  ShieldCheck,
  Zap,
  Activity,
  Image as ImageIcon
} from 'lucide-react';
import { useState } from 'react';

interface IncidentTimelineProps {
  timelineEvents: IncidentEvent[];
}

export default function IncidentTimeline({ timelineEvents }: IncidentTimelineProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState<{ [key: string]: boolean }>({});

  const togglePlayAudio = (id: string) => {
    setIsPlayingAudio((prev) => ({ ...prev, [id]: !prev[id] }));
    // Simulate audio stop
    if (!isPlayingAudio[id]) {
      setTimeout(() => {
        setIsPlayingAudio((prev) => ({ ...prev, [id]: false }));
      }, 4000);
    }
  };

  const getCategoryIcon = (category: IncidentEvent['category']) => {
    switch (category) {
      case 'weather':
        return <AlertTriangle className="h-4.5 w-4.5 text-blue-400" />;
      case 'traffic':
        return <Activity className="h-4.5 w-4.5 text-amber-400" />;
      case 'infrastructure':
        return <Zap className="h-4.5 w-4.5 text-purple-400" />;
      default:
        return <Info className="h-4.5 w-4.5 text-cyan-400" />;
    }
  };

  const getSeverityBorder = (severity: IncidentEvent['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-l-4 border-l-red-500';
      case 'high':
        return 'border-l-4 border-l-amber-500';
      case 'medium':
        return 'border-l-4 border-l-blue-500';
      default:
        return 'border-l-4 border-l-emerald-500';
    }
  };

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Timeline info banner */}
      <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 shadow-2xl">
        <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Real-Time Public Safety Stream
        </span>
        <h2 className="text-xl font-extrabold text-white mt-0.5">Community Incident Feed</h2>
        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
          Chronological index of sensory warnings, citizen phone reports, and automated dispatcher statuses mapped and summarized by Guardian AI.
        </p>
      </div>

      {/* Timeline items log stack */}
      <div className="relative border-l border-slate-900 pl-6 ml-3 space-y-8">
        {timelineEvents.map((evt, idx) => {
          const isPlaying = isPlayingAudio[evt.id];
          return (
            <div key={evt.id} className="relative group">
              {/* Timeline bubble bullet */}
              <span className="absolute -left-[35px] top-1.5 h-4.5 w-4.5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
                <span className={`h-1.5 w-1.5 rounded-full ${evt.severity === 'critical' ? 'bg-red-400' : 'bg-cyan-400'}`} />
              </span>

              {/* Central Glass panel */}
              <div className={`bg-slate-900/25 border border-slate-900/80 rounded-2xl p-5 shadow-xl hover:border-slate-800 transition-all ${getSeverityBorder(evt.severity)}`}>
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center shrink-0">
                      {getCategoryIcon(evt.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm leading-tight">{evt.title}</h3>
                      <span className="text-[10px] font-mono text-slate-500">{evt.timestamp} • Sector Node</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 py-0.5 px-2 rounded-full uppercase tracking-widest font-semibold">
                    {evt.category}
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">{evt.description}</p>

                {/* Sub-panels inside card */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* AI summary box */}
                  <div className="md:col-span-7 bg-slate-950/85 border border-slate-900 rounded-xl p-3.5 space-y-1.5">
                    <span className="block text-[8px] uppercase tracking-widest font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                      <FileText className="h-3 w-3" />
                      Guardian AI Briefing
                    </span>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">{evt.aiSummary}</p>
                  </div>

                  {/* Citizen Audio Transcript (if present) */}
                  {evt.citizenAudioTranscript && (
                    <div className="md:col-span-5 bg-slate-950/40 border border-slate-900/60 rounded-xl p-3.5 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="block text-[8px] uppercase tracking-widest font-mono text-slate-500 font-semibold flex items-center gap-1.5">
                          <Volume2 className="h-3 w-3 text-cyan-400" />
                          Citizen Audio Feed
                        </span>
                        <p className="text-[10px] italic text-slate-400 font-light leading-relaxed">
                          {evt.citizenAudioTranscript}
                        </p>
                      </div>

                      <button
                        onClick={() => togglePlayAudio(evt.id)}
                        className={`cursor-pointer font-mono text-[9px] uppercase tracking-widest py-1.5 px-3 rounded-lg border mt-3 transition-all flex items-center justify-center gap-1.5 ${
                          isPlaying
                            ? 'bg-red-500/15 border-red-500/30 text-red-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <span className="h-1.5 w-1.5 bg-red-400 rounded-full animate-ping" />
                            Playing Voice Feed (0:04)
                          </>
                        ) : (
                          'Listen to Speech Report'
                        )}
                      </button>
                    </div>
                  )}

                  {/* Evidence Photo mockup (if present) */}
                  {evt.evidencePhoto && (
                    <div className="md:col-span-5 border border-slate-900 rounded-xl overflow-hidden relative min-h-[100px] flex items-center justify-center">
                      <img
                        src={evt.evidencePhoto}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                        alt="Evidence incident"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      <span className="relative z-10 text-[9px] font-mono text-slate-300 bg-slate-950/95 border border-slate-900 px-2.5 py-1 rounded flex items-center gap-1.5">
                        <ImageIcon className="h-3.5 w-3.5" />
                        Live CCTV/Debris Capture
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
