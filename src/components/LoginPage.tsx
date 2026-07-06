import { motion } from 'motion/react';
import { Shield, Mail, Key, User, ArrowLeft, Radio, Building2, Flame } from 'lucide-react';
import { useState } from 'react';

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess: (userRole: string) => void;
}

export default function LoginPage({ onBack, onLoginSuccess }: LoginPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<'government' | 'citizen' | 'emergency'>('government');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(selectedMethod);
    }, 1200);
  };

  const triggerGuestDemo = () => {
    onLoginSuccess('government'); // default to govt dashboard for maximum capability exploration
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col justify-center items-center font-sans px-4">
      {/* Back to Home Button */}
      <button
        onClick={onBack}
        className="cursor-pointer absolute top-6 left-6 z-20 flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl hover:bg-slate-800 transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>

      {/* Futuristic Background Gradients */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-600/15 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30 mx-auto mb-4">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Access Guardian AI</h2>
          <p className="text-slate-400 text-sm mt-2">Enter credentials or launch instantly using our credentials sandbox.</p>
        </div>

        {/* Central Glassmorphism Card */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
          {/* Custom Selector Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-900/80 mb-6">
            <button
              type="button"
              onClick={() => setSelectedMethod('government')}
              className={`cursor-pointer flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-medium transition-all ${
                selectedMethod === 'government'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="h-4.5 w-4.5 mb-1" />
              Government
            </button>
            <button
              type="button"
              onClick={() => setSelectedMethod('citizen')}
              className={`cursor-pointer flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-medium transition-all ${
                selectedMethod === 'citizen'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="h-4.5 w-4.5 mb-1" />
              Citizen
            </button>
            <button
              type="button"
              onClick={() => setSelectedMethod('emergency')}
              className={`cursor-pointer flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-medium transition-all ${
                selectedMethod === 'emergency'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="h-4.5 w-4.5 mb-1" />
              Emergency
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1.5">
                Authentication ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder={
                    selectedMethod === 'government'
                      ? 'gov.administrator@district.gov'
                      : selectedMethod === 'emergency'
                      ? 'responder-921@alert.net'
                      : 'citizen.identity@community.org'
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-blue-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1.5">
                Secure Password
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`cursor-pointer w-full font-medium py-3 rounded-xl border border-white/10 text-white hover:scale-[1.01] transition-all ${
                selectedMethod === 'government'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 shadow-lg shadow-blue-600/15'
                  : selectedMethod === 'emergency'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 shadow-lg shadow-red-600/15'
                  : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 shadow-lg shadow-indigo-600/15'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Decrypting Vault...
                </span>
              ) : (
                `Enter Command Deck`
              )}
            </button>
          </form>

          {/* Social OAuth Splitter */}
          <div className="relative my-6 text-center">
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-800/80" />
            <span className="relative z-10 px-3 bg-[#111625] text-[10px] uppercase font-mono text-slate-500 tracking-wider">
              Secure Sandbox Access
            </span>
          </div>

          {/* Master Launch Sandbox Guest Button */}
          <button
            onClick={triggerGuestDemo}
            className="cursor-pointer w-full bg-slate-950/90 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 hover:text-emerald-300 font-semibold py-3.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-emerald-500/5 shadow-md shadow-emerald-500/5"
          >
            <Radio className="h-4.5 w-4.5 animate-pulse text-emerald-400" />
            Launch Instant Sandbox (Guest Demo)
          </button>
        </div>

        {/* Security Disclaimers */}
        <p className="text-center text-[10px] text-slate-600 font-mono mt-6">
          Authorized personnel only. Sessions logged and authenticated via Google Cloud Key management vaults.
        </p>
      </motion.div>
    </div>
  );
}
