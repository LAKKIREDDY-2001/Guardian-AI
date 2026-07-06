import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, OnboardingRole } from '../types';
import {
  Send,
  MessageSquare,
  Sparkles,
  User,
  ShieldCheck,
  TrendingUp,
  Cpu,
  BarChart2,
  ListTodo
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ChatBotProps {
  userRole: OnboardingRole;
}

const INITIAL_CHIPS = [
  'What happens if hourly rainfall increases to 55mm?',
  'Which neighborhood hospital is under thermal pressure?',
  'How can we reduce traffic PM2.5 pollution proactively?',
  'Why is the subpass node marked critical?'
];

export default function ChatBot({ userRole }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello Administrator. I am **Guardian AI's Core Intelligence**. I am continuously monitoring our community\'s digital twin telemetry. Ask me any predictive question regarding floods, grid stresses, air quality sags, or resource bottlenecks.`,
      timestamp: '08:17 AM',
      confidence: 100
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsSending(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6), // keep context sliding
          userRole
        })
      });

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: data.recommendations,
        confidence: data.confidence,
        charts: data.chart
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col bg-slate-950/60 border border-slate-900 rounded-2xl h-[550px] shadow-2xl relative font-sans overflow-hidden">
      {/* Background Micro Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.45)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Chat header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-900 bg-slate-950/40 p-4.5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Cpu className="h-5 w-5 animate-pulse" />
          </div>
          <div className="text-left">
            <span className="block text-[8px] uppercase tracking-widest font-mono text-cyan-400 font-bold">
              Predictive LLM Core
            </span>
            <h3 className="font-extrabold text-white text-sm">Guardian Intelligence Copilot</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Gemini-3.5-Flash
          </span>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 relative z-10 scrollbar-thin scrollbar-thumb-slate-900">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto text-left'}`}
            >
              {/* Profile Icon */}
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border ${
                msg.sender === 'user' ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400' : 'bg-slate-900 border-slate-800 text-cyan-400'
              }`}>
                {msg.sender === 'user' ? <User className="h-4.5 w-4.5" /> : <Sparkles className="h-4.5 w-4.5" />}
              </div>

              {/* Message Content Bubble */}
              <div className="space-y-3.5">
                <div className={`p-4 rounded-xl border leading-relaxed text-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-100 rounded-tr-none text-right'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-200 rounded-tl-none text-left'
                }`}>
                  {/* Inline Markdown replacement */}
                  <p className="font-light whitespace-pre-wrap">
                    {msg.text.split('**').map((chunk, idx) => (idx % 2 === 1 ? <strong key={idx} className="font-extrabold text-cyan-300">{chunk}</strong> : chunk))}
                  </p>
                </div>

                {/* Optional Custom AI charts and lists rendered inline inside bubble wrapper */}
                {msg.sender === 'ai' && (
                  <div className="space-y-3 pl-2 text-left">
                    {/* Inline custom chart */}
                    {msg.charts && (
                      <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-3.5 max-w-sm">
                        <span className="block text-[8px] uppercase tracking-wider font-mono text-slate-500 mb-2 flex items-center gap-1.5">
                          <BarChart2 className="h-3.5 w-3.5 text-cyan-400" />
                          {msg.charts.title}
                        </span>
                        {/* Custom visual chart container */}
                        <div className="space-y-2 pt-1.5">
                          {msg.charts.data.map((item, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-[9px] font-mono text-slate-400">
                                <span>{item.name}</span>
                                <span>{item.value}</span>
                              </div>
                              <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${Math.min(100, item.value)}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* AI Checklist Recommendations */}
                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="bg-slate-950/50 border border-slate-900/60 rounded-xl p-3.5 max-w-sm space-y-2">
                        <span className="block text-[8px] uppercase tracking-wider font-mono text-slate-500 flex items-center gap-1.5">
                          <ListTodo className="h-3.5 w-3.5 text-indigo-400" />
                          Recommended Directives
                        </span>
                        <div className="space-y-1.5">
                          {msg.recommendations.map((rec, idx) => (
                            <div key={idx} className="flex gap-2 items-start text-xs font-light text-slate-300">
                              <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Confidence stamp */}
                    {msg.confidence !== undefined && (
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-mono text-slate-500">
                        <TrendingUp className="h-3 w-3 text-emerald-400" />
                        AI Confidence Level: {msg.confidence}%
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing state indicator */}
          {isSending && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4.5 max-w-[80%] mr-auto text-left">
              <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center shrink-0">
                <Sparkles className="h-4.5 w-4.5 animate-pulse" />
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl rounded-tl-none text-slate-400 text-xs flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 ml-1">Predicting Outcomes...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      {/* Preset Chip suggest deck */}
      <div className="relative z-10 bg-slate-950/40 border-t border-slate-900/80 px-4.5 py-3">
        <div className="flex flex-wrap gap-2 justify-start max-h-[70px] overflow-y-auto scrollbar-none">
          {INITIAL_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="cursor-pointer text-left font-mono text-[9px] tracking-wide bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white py-1.5 px-3 rounded-lg transition-all truncate max-w-xs"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input deck bar */}
      <div className="relative z-10 bg-slate-950/80 border-t border-slate-900/80 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            placeholder="Query Digital Twin (e.g. why is the power grid thermal index critical?)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isSending}
            className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl py-3.5 pl-4 pr-14 text-sm text-white placeholder-slate-600 outline-none transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={isSending || !inputValue.trim()}
            className="cursor-pointer absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center hover:scale-105 transition-all disabled:opacity-30 disabled:scale-100"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
