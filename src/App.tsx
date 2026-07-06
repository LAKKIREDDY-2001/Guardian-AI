import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Bell,
  Search,
  Sun,
  Cpu,
  Settings,
  Activity,
  Sparkles,
  Map,
  AlertTriangle,
  FileText,
  Compass,
  Volume2,
  ShieldAlert,
  X,
  ChevronRight,
  CheckCircle2,
  User,
  Users,
  LogOut
} from 'lucide-react';

import { ActiveTab, OnboardingRole, MapHotspot, IncidentEvent, PredictionItem } from './types';
import { INITIAL_PREDICTIONS, INITIAL_HOTSPOTS, INITIAL_TIMELINE } from './data';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import DigitalTwinMap from './components/DigitalTwinMap';
import PredictionsPage from './components/PredictionsPage';
import ChatBot from './components/ChatBot';
import IncidentTimeline from './components/IncidentTimeline';
import SimulationPage from './components/SimulationPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';
import EmergencyDashboard from './components/EmergencyDashboard';

export default function App() {
  // Navigation routing states
  const [currentLocation, setCurrentLocation] = useState<'landing' | 'login' | 'onboarding' | 'dashboard'>('landing');
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [activeRole, setActiveRole] = useState<OnboardingRole>('government');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Database lists
  const [hotspots, setHotspots] = useState<MapHotspot[]>(INITIAL_HOTSPOTS);
  const [timelineEvents, setTimelineEvents] = useState<IncidentEvent[]>(INITIAL_TIMELINE);
  const [predictions, setPredictions] = useState<PredictionItem[]>(INITIAL_PREDICTIONS);

  // High intensity state overrides
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Search and Notification states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [highlightedHotspotId, setHighlightedHotspotId] = useState<string | null>(null);
  const [highlightedPredictionId, setHighlightedPredictionId] = useState<string | null>(null);

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'CRITICAL: Sewer Pressure Spike',
      description: 'Ward 12 stormwater drain sensors report 180% load. Local flooding imminent.',
      time: 'Just now',
      category: 'weather',
      severity: 'critical',
      targetTab: 'timeline' as ActiveTab,
      targetId: 'inc-1'
    },
    {
      id: 'notif-2',
      title: 'WARNING: Substation 12 Overheating',
      description: 'Thermal core at 98°C. Reroute load cycles immediately.',
      time: '12m ago',
      category: 'infrastructure',
      severity: 'warning',
      targetTab: 'map' as ActiveTab,
      targetId: 'hs-2'
    },
    {
      id: 'notif-3',
      title: 'HIGH RISK: Air Pollution PM2.5 Spike',
      description: 'Inversion layer trapping heavy early commuter freight exhaust.',
      time: '45m ago',
      category: 'weather',
      severity: 'high',
      targetTab: 'predictions' as ActiveTab,
      targetId: 'pred-3'
    }
  ]);

  const handleTabChange = (tab: ActiveTab) => {
    setHighlightedHotspotId(null);
    setHighlightedPredictionId(null);
    setActiveTab(tab);
  };

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: Array<{
      id: string;
      title: string;
      description: string;
      type: 'prediction' | 'hotspot' | 'timeline';
      severity: string;
      targetTab: ActiveTab;
    }> = [];

    predictions.forEach(p => {
      if (p.type.toLowerCase().includes(query) || p.hazard.toLowerCase().includes(query) || p.reason.toLowerCase().includes(query)) {
        results.push({
          id: p.id,
          title: p.type,
          description: p.hazard,
          type: 'prediction',
          severity: p.severity,
          targetTab: 'predictions'
        });
      }
    });

    hotspots.forEach(h => {
      if (h.name.toLowerCase().includes(query) || h.hazard.toLowerCase().includes(query) || h.aiReasoning.toLowerCase().includes(query)) {
        results.push({
          id: h.id,
          title: h.name,
          description: h.hazard,
          type: 'hotspot',
          severity: h.status,
          targetTab: 'map'
        });
      }
    });

    timelineEvents.forEach(e => {
      if (e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query) || e.aiSummary.toLowerCase().includes(query)) {
        results.push({
          id: e.id,
          title: e.title,
          description: e.description,
          type: 'timeline',
          severity: e.severity,
          targetTab: 'timeline'
        });
      }
    });

    return results;
  };

  const handleSelectSearchResult = (result: { id: string; targetTab: ActiveTab; type: 'prediction' | 'hotspot' | 'timeline'; title: string }) => {
    if (result.type === 'prediction') {
      setHighlightedPredictionId(result.id);
    } else if (result.type === 'hotspot') {
      setHighlightedHotspotId(result.id);
    }
    setActiveTab(result.targetTab);
    setSearchQuery('');
    setSearchFocused(false);
    triggerToast(`Navigated to telemetry match: ${result.title}`, 'info');
  };

  const handleSelectNotification = (notif: { id: string; targetTab: ActiveTab; targetId: string; title: string }) => {
    if (notif.targetTab === 'predictions') {
      setHighlightedPredictionId(notif.targetId);
    } else if (notif.targetTab === 'map') {
      setHighlightedHotspotId(notif.targetId);
    }
    setActiveTab(notif.targetTab);
    setNotificationsOpen(false);
    triggerToast(`Inspecting event alert: ${notif.title}`, 'info');
  };

  const handleDismissNotification = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
    triggerToast('Notification cleared.', 'success');
  };

  const handleAcknowledgeNotification = (id: string, notif: any, e: MouseEvent) => {
    e.stopPropagation();
    const matchedNode = hotspots.find(h => h.id === notif.targetId) || { name: 'Sewer / Grid Nodes' };
    const newEvt: IncidentEvent = {
      id: `inc-live-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: `Directive Dispatched: Automated Mitigation`,
      category: 'infrastructure',
      severity: 'low',
      description: `Acknowledge & Mitigate triggered for notification alert: "${notif.title}" at "${matchedNode.name}".`,
      aiSummary: 'Guardian AI active response sequence initiated. Grid load-balance / drain pumps active.'
    };
    setTimelineEvents((prev) => [newEvt, ...prev]);
    setNotifications(prev => prev.filter(n => n.id !== id));
    triggerToast('Mitigation Directive Dispatched successfully!', 'success');
  };

  // Premium Toast Notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle action dispatch triggers from the Map hotspots
  const handleTriggerAction = (action: string, hotspotId: string) => {
    const matchedNode = hotspots.find((h) => h.id === hotspotId);
    const nodeName = matchedNode ? matchedNode.name : 'Unknown Sensor Hub';

    const newEvt: IncidentEvent = {
      id: `inc-live-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: `Directive Dispatched: ${action}`,
      category: 'infrastructure',
      severity: 'low',
      description: `Administrative dispatch node triggered safety action: "${action}" at "${nodeName}".`,
      aiSummary: 'Guardian OS mapped response compliance. Local field crews have been successfully notified.'
    };

    setTimelineEvents((prev) => [newEvt, ...prev]);
    triggerToast(`Dispatched: "${action}" to ${nodeName}`, 'success');
  };

  // Switch to Emergency HUD state
  const handleToggleEmergency = () => {
    const newState = !isEmergencyMode;
    setIsEmergencyMode(newState);
    if (newState) {
      triggerToast('CRISIS OVERRIDE MODE ACTIVATED. All networks in high warning alert.', 'error');
    } else {
      triggerToast('Emergency parameters cleared. Resuming standard operations.', 'success');
    }
  };

  // Securely log out the active session
  const handleLogout = () => {
    setCurrentLocation('landing');
    setOnboardingComplete(false);
    triggerToast('Logged out of Guardian AI.', 'success');
  };

  return (
    <div className={`min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans ${isEmergencyMode ? 'bg-red-950/5' : 'bg-slate-950'}`}>
      
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -40, x: '-50%' }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 py-3 px-5 rounded-xl border shadow-2xl backdrop-blur-md max-w-md ${
              toast.type === 'error'
                ? 'bg-red-950/90 border-red-500/30 text-red-400 shadow-red-500/10'
                : toast.type === 'info'
                ? 'bg-blue-950/90 border-blue-500/30 text-blue-400 shadow-blue-500/10'
                : 'bg-emerald-950/90 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10'
            }`}
          >
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="text-xs font-semibold font-mono tracking-wide leading-relaxed">{toast.message}</span>
            <button onClick={() => setToast(null)} className="text-slate-500 hover:text-white ml-2">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Router */}
      <AnimatePresence mode="wait">
        {currentLocation === 'landing' && (
          <LandingPage
            onLaunch={() => setCurrentLocation('login')}
            onWatchDemo={() => {
              setActiveRole('government');
              setOnboardingComplete(true);
              setCurrentLocation('dashboard');
              setActiveTab('simulation');
            }}
          />
        )}

        {currentLocation === 'login' && (
          <LoginPage
            onBack={() => setCurrentLocation('landing')}
            onLoginSuccess={(role) => {
              setActiveRole(role as OnboardingRole);
              setCurrentLocation('onboarding');
            }}
          />
        )}

        {currentLocation === 'onboarding' && (
          <Onboarding
            onComplete={(role) => {
              setActiveRole(role);
              setOnboardingComplete(true);
              setCurrentLocation('dashboard');
            }}
          />
        )}

        {currentLocation === 'dashboard' && onboardingComplete && (
          <div className="relative min-h-screen flex">
            {/* Absolute Ambient Backgrounds */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,58,138,0.08)_0%,transparent_50%)] pointer-events-none" />

            {/* Left Sidebar HUD Navigation */}
            <aside className="w-64 bg-slate-950/80 border-r border-slate-900 flex flex-col justify-between p-4 shrink-0 relative z-10">
              <div className="space-y-6">
                {/* Brand Logo */}
                <div className="flex items-center gap-2.5 px-2">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center border transition-all ${
                    isEmergencyMode ? 'bg-red-600 border-red-500/30 text-white animate-pulse' : 'bg-gradient-to-tr from-blue-600 to-cyan-500 border-blue-400/25 text-white'
                  }`}>
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-base tracking-tight text-white block leading-none">Guardian AI</span>
                    <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-mono font-bold block mt-1">Twin OS</span>
                  </div>
                </div>

                {/* Primary Menu Links */}
                <nav className="space-y-1.5">
                  <span className="block text-[8px] uppercase tracking-widest font-mono text-slate-500 font-bold px-2 mb-2">
                    MUNICIPAL SYSTEM PANELS
                  </span>

                  {/* Dashboard HUD */}
                  <button
                    onClick={() => handleTabChange('dashboard')}
                    className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'dashboard'
                        ? 'bg-blue-600/10 border border-blue-500/40 text-blue-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <Activity className="h-4.5 w-4.5" />
                    Dashboard HUD
                  </button>
 
                  {/* Live Twin Map */}
                  <button
                    onClick={() => handleTabChange('map')}
                    className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'map'
                        ? 'bg-blue-600/10 border border-blue-500/40 text-blue-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <Map className="h-4.5 w-4.5" />
                    CommuniTwin Map
                  </button>
 
                  {/* AI Predictions */}
                  <button
                    onClick={() => handleTabChange('predictions')}
                    className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'predictions'
                        ? 'bg-blue-600/10 border border-blue-500/40 text-blue-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <AlertTriangle className="h-4.5 w-4.5" />
                    Risk Predictions
                  </button>
 
                  {/* AI Copilot Chat */}
                  <button
                    onClick={() => handleTabChange('chat')}
                    className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'chat'
                        ? 'bg-blue-600/10 border border-blue-500/40 text-blue-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <Sparkles className="h-4.5 w-4.5" />
                    Copilot Chat
                  </button>
 
                  {/* Incident Timeline */}
                  <button
                    onClick={() => handleTabChange('timeline')}
                    className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'timeline'
                        ? 'bg-blue-600/10 border border-blue-500/40 text-blue-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <Volume2 className="h-4.5 w-4.5" />
                    Incident Timeline
                  </button>
 
                  {/* "What-If" Simulation */}
                  <button
                    onClick={() => handleTabChange('simulation')}
                    className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'simulation'
                        ? 'bg-blue-600/10 border border-blue-500/40 text-blue-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <Compass className="h-4.5 w-4.5" />
                    What-If Engine
                  </button>
 
                  {/* Exporter & Proposal generation */}
                  <button
                    onClick={() => handleTabChange('reports')}
                    className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'reports'
                        ? 'bg-blue-600/10 border border-blue-500/40 text-blue-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <FileText className="h-4.5 w-4.5" />
                    Report Exporter
                  </button>
 
                  {/* Settings Telemetry preferences */}
                  <button
                    onClick={() => handleTabChange('settings')}
                    className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'settings'
                        ? 'bg-blue-600/10 border border-blue-500/40 text-blue-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <Settings className="h-4.5 w-4.5" />
                    System Settings
                  </button>
                </nav>
              </div>

              {/* Bottom sidebar actions (Pulsating RED Emergency trigger) */}
              <div className="space-y-4">
                <button
                  onClick={handleToggleEmergency}
                  className={`cursor-pointer w-full font-extrabold text-xs tracking-widest py-3.5 rounded-xl uppercase flex items-center justify-center gap-2 border shadow-lg transition-all ${
                    isEmergencyMode
                      ? 'bg-green-600 hover:bg-green-500 border-green-500/30 text-white animate-pulse'
                      : 'bg-red-600 hover:bg-red-500 border-red-500/20 text-white shadow-red-600/10'
                  }`}
                >
                  <ShieldAlert className="h-4.5 w-4.5" />
                  {isEmergencyMode ? 'DE-ESCALATE CRISIS' : 'EMERGENCY MODE'}
                </button>

                <div className="flex items-center justify-between border-t border-slate-900 pt-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="text-left font-mono">
                      <span className="block text-[10px] text-white font-bold capitalize">{activeRole.replace('_', ' ')}</span>
                      <span className="block text-[8px] text-slate-500 font-semibold">Active Session</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Log Out Session"
                    className="cursor-pointer h-8 w-8 rounded-lg bg-slate-900 hover:bg-red-950/40 hover:text-red-400 text-slate-500 hover:border-red-500/30 border border-slate-850 flex items-center justify-center transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Application HUD content deck */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              {/* Top Navigation HUD bar */}
              <header className="h-16 border-b border-slate-900 flex items-center justify-between px-6 bg-slate-950/40 relative z-10 backdrop-blur-sm">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-72 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                      placeholder="Search telemetry (e.g. flood, power)..."
                      className="w-full bg-slate-900 border border-slate-850 focus:border-cyan-500/40 rounded-lg py-1.5 pl-9 pr-4 text-xs text-white outline-none transition-all"
                    />

                    {/* Floating Search Results Dropdown */}
                    <AnimatePresence>
                      {searchFocused && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 right-0 mt-2 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 max-h-80 overflow-y-auto backdrop-blur-xl"
                        >
                          {searchQuery.trim() === '' ? (
                            <div className="p-3 text-left">
                              <span className="block text-[8px] uppercase tracking-widest font-mono text-slate-500 font-bold mb-2">SYSTEM SUGGESTIONS</span>
                              <div className="space-y-1">
                                {['Flood', 'Power Outage', 'Hospital', 'Commuter', 'Air Pollution'].map((sug) => (
                                  <button
                                    key={sug}
                                    onMouseDown={() => setSearchQuery(sug)}
                                    className="w-full text-left text-[11px] font-mono text-slate-400 hover:text-white hover:bg-slate-900 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                                  >
                                    → Search for "{sug}"
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : getSearchResults().length === 0 ? (
                            <div className="p-4 text-center text-slate-500 text-xs">
                              <X className="h-5 w-5 mx-auto text-slate-600 mb-1.5" />
                              No telemetry records match your query
                            </div>
                          ) : (
                            <div className="space-y-1 text-left">
                              <span className="block text-[8px] uppercase tracking-widest font-mono text-cyan-400 font-bold px-2.5 py-1.5">TELEMETRY REGISTRY MATCHES</span>
                              {getSearchResults().map((res) => (
                                <button
                                  key={res.id}
                                  onMouseDown={() => handleSelectSearchResult(res)}
                                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-900/65 transition-all flex flex-col gap-0.5 border border-transparent hover:border-slate-800/50 cursor-pointer"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-extrabold text-white text-xs truncate max-w-[180px]">{res.title}</span>
                                    <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded-md ${
                                      res.type === 'prediction' ? 'bg-red-500/15 text-red-400' : res.type === 'hotspot' ? 'bg-amber-500/15 text-amber-400' : 'bg-cyan-500/15 text-cyan-400'
                                    }`}>
                                      {res.type}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 line-clamp-1">{res.description}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* Micro weather gauge */}
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-lg">
                    <Sun className="h-3.5 w-3.5 text-cyan-400" />
                    Overcast 24°C
                  </span>

                  {/* Notifications dropdown with active states */}
                  <div className="relative">
                    <button
                      onClick={() => setNotificationsOpen(!notificationsOpen)}
                      className="cursor-pointer relative h-9 w-9 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/85 transition-all"
                    >
                      <Bell className="h-4.5 w-4.5" />
                      {notifications.length > 0 && (
                        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      )}
                    </button>

                    {/* Floating Notifications Popover */}
                    <AnimatePresence>
                      {notificationsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          className="absolute right-0 mt-3 w-80 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 backdrop-blur-xl"
                        >
                          <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold">SYSTEM HAZARD ALERTS</span>
                            <span className="text-[9px] font-mono text-slate-500 font-bold">{notifications.length} Active</span>
                          </div>

                          {notifications.length === 0 ? (
                            <div className="p-6 text-center text-slate-500 text-xs">
                              <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                              All telemetry networks are stable
                            </div>
                          ) : (
                            <div className="space-y-2 max-h-72 overflow-y-auto">
                              {notifications.map((notif) => (
                                <div
                                  key={notif.id}
                                  onClick={() => handleSelectNotification(notif)}
                                  className="text-left p-2.5 rounded-lg bg-slate-900/40 border border-slate-900/80 hover:border-slate-800/80 transition-all cursor-pointer space-y-1.5 group relative"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-1.5">
                                      <span className={`h-1.5 w-1.5 rounded-full ${notif.severity === 'critical' ? 'bg-red-400 animate-pulse' : 'bg-amber-400'}`} />
                                      <span className="font-extrabold text-white text-[11px] leading-tight block">{notif.title}</span>
                                    </div>
                                    <span className="text-[8px] font-mono text-slate-500 shrink-0">{notif.time}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 font-light leading-relaxed line-clamp-2">{notif.description}</p>
                                  
                                  {/* Interactive Action Buttons */}
                                  <div className="flex items-center gap-1.5 pt-1">
                                    <button
                                      onClick={(e) => handleAcknowledgeNotification(notif.id, notif, e)}
                                      className="text-[8px] uppercase tracking-widest font-mono font-extrabold bg-cyan-950 hover:bg-cyan-900 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20 transition-all cursor-pointer"
                                    >
                                      Acknowledge
                                    </button>
                                    <button
                                      onClick={(e) => handleDismissNotification(notif.id, e)}
                                      className="text-[8px] uppercase tracking-widest font-mono font-extrabold bg-slate-900 hover:bg-slate-800 text-slate-400 px-2 py-1 rounded transition-all cursor-pointer"
                                    >
                                      Dismiss
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <span className="h-5 w-px bg-slate-900" />

                  {/* Profile info node */}
                  <span className="text-xs font-semibold font-mono text-cyan-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    SYSTEM DIRECTIVE: STABLE
                  </span>
                </div>
              </header>

              {/* Central Active View Deck */}
              <main className="flex-1 p-6 relative overflow-y-auto max-w-7xl mx-auto w-full">
                <AnimatePresence mode="wait">
                  {isEmergencyMode ? (
                    <motion.div
                      key="emergency-hud"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full"
                    >
                      <EmergencyDashboard />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="h-full"
                    >
                      {activeTab === 'dashboard' && <Dashboard userRole={activeRole} />}
                      {activeTab === 'map' && (
                        <DigitalTwinMap
                          hotspots={hotspots}
                          onTriggerAction={handleTriggerAction}
                          highlightedHotspotId={highlightedHotspotId}
                        />
                      )}
                      {activeTab === 'predictions' && (
                        <PredictionsPage
                          predictions={predictions}
                          highlightedPredictionId={highlightedPredictionId}
                        />
                      )}
                      {activeTab === 'chat' && <ChatBot userRole={activeRole} />}
                      {activeTab === 'timeline' && <IncidentTimeline timelineEvents={timelineEvents} />}
                      {activeTab === 'simulation' && <SimulationPage />}
                      {activeTab === 'reports' && <ReportsPage />}
                      {activeTab === 'settings' && <SettingsPage />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </main>

              {/* Municipal command deck status footer */}
              <footer className="h-10 border-t border-slate-900/80 bg-slate-950/40 text-[10px] font-mono text-slate-500 flex items-center justify-between px-6">
                <span>Living twin satellite pipeline • Connected</span>
                <span className="text-cyan-400">Guardian AI Operating System v3.5</span>
              </footer>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
