"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  Copy, 
  RefreshCw, 
  Check, 
  CalendarClock, 
  Terminal,
  Info,
  ChevronDown
} from "lucide-react";
import { Titan_One, Nunito, Fira_Code } from 'next/font/google';

// --- FONTS ---
const titleFont = Titan_One({ weight: '400', subsets: ['latin'] });
const bodyFont = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'] });
const codeFont = Fira_Code({ subsets: ['latin'], weight: ['400', '500'] });

// --- UTILS: CRON DESCRIPTION ---
const describeCron = (cron: any) => {
  const { minute, hour, dom, month, dow } = cron;
  if (minute === '*' && hour === '*' && dom === '*' && month === '*' && dow === '*') return "Every minute";
  if (minute === '0' && hour === '0' && dom === '*' && month === '*' && dow === '*') return "Every day at midnight";
  if (minute === '0' && hour === '0' && dom === '*' && month === '*' && dow === '0') return "Every Sunday at midnight";
  
  let desc = "At ";
  
  // Time
  if (minute === '*' && hour === '*') desc += "every minute";
  else if (minute !== '*' && hour === '*') desc += `minute ${minute} of every hour`;
  else if (minute === '0' && hour !== '*') desc += `hour ${hour}:00`;
  else desc += `${hour}:${minute.padStart(2, '0')}`;

  // Date
  if (dom !== '*') desc += ` on day-of-month ${dom}`;
  if (month !== '*') desc += ` in month ${month}`;
  if (dow !== '*') desc += ` on day-of-week ${dow}`;
  
  return desc;
};

// --- PRESETS ---
const presets = [
  { label: "Every Minute", value: { minute: "*", hour: "*", dom: "*", month: "*", dow: "*" } },
  { label: "Hourly", value: { minute: "0", hour: "*", dom: "*", month: "*", dow: "*" } },
  { label: "Daily (Midnight)", value: { minute: "0", hour: "0", dom: "*", month: "*", dow: "*" } },
  { label: "Weekly (Sun)", value: { minute: "0", hour: "0", dom: "*", month: "*", dow: "0" } },
  { label: "Monthly (1st)", value: { minute: "0", hour: "0", dom: "1", month: "*", dow: "*" } },
];

// --- COMPONENT: FIELD SELECTOR ---
const CronField = ({ label, value, onChange, options, range }: any) => {
  const [mode, setMode] = useState(value === '*' ? 'every' : 'specific');

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    if (newMode === 'every') onChange('*');
    if (newMode === 'specific') onChange('0');
  };

  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-4 flex flex-col gap-3 group hover:border-indigo-500/30 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-indigo-300 uppercase tracking-wider">{label}</span>
        <select 
          value={mode} 
          onChange={(e) => handleModeChange(e.target.value)}
          className="bg-black/30 border border-white/10 rounded-md text-xs px-2 py-1 text-slate-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="every">Every</option>
          <option value="specific">Specific</option>
        </select>
      </div>

      {mode === 'every' ? (
        <div className="h-10 flex items-center justify-center text-slate-500 text-sm italic">
          * (Any {label})
        </div>
      ) : (
        <div className="relative">
           {/* Simple Range Input for Demo */}
           <input 
             type="range" 
             min={range[0]} 
             max={range[1]} 
             value={parseInt(value) || 0} 
             onChange={(e) => onChange(e.target.value)}
             className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
           />
           <div className="mt-2 text-center font-mono text-white font-bold text-lg">
             {value}
           </div>
        </div>
      )}
    </div>
  );
};

export default function CronGeneratorPage() {
  const [cron, setCron] = useState({ minute: "*", hour: "*", dom: "*", month: "*", dow: "*" });
  const [copied, setCopied] = useState(false);

  const cronString = `${cron.minute} ${cron.hour} ${cron.dom} ${cron.month} ${cron.dow}`;
  const humanDesc = describeCron(cron);

  const handleCopy = () => {
    navigator.clipboard.writeText(cronString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Scale Saas Cron Generator",
    "description": "Free visual cron job schedule generator. Convert clicks to cron syntax instantly.",
    "applicationCategory": "DeveloperApplication",
    "featureList": "Cron Syntax Generator, Human Readable Cron, Cron Presets"
  };

  return (
    <div className={`w-full min-h-screen bg-neutral-950 text-white ${bodyFont.className}`}>
      
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* --- HEADER --- */}
      <header className="pt-24 pb-12 px-6 relative z-10 text-center">
         <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-bold uppercase tracking-widest mb-6">
            <Clock className="w-4 h-4" /> Scheduler Tool
         </div>
         <h1 className={`text-4xl md:text-5xl font-black mb-4 ${titleFont.className}`}>
            Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-400">Cron Builder</span>
         </h1>
      </header>

      <div className="max-w-4xl mx-auto px-6 pb-20 relative z-10">
         
         {/* --- MAIN DISPLAY --- */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8 text-center"
         >
            {/* Glow Behind Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
               <p className="text-slate-400 font-medium mb-2 uppercase tracking-widest text-xs">Generated Expression</p>
               <div className="flex items-center justify-center gap-4 mb-6">
                  <span className={`${codeFont.className} text-4xl md:text-6xl text-white font-bold tracking-wider`}>
                     {cronString}
                  </span>
                  <button 
                    onClick={handleCopy}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
                  >
                     {copied ? <Check className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6" />}
                  </button>
               </div>

               <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-6 py-2 rounded-full">
                  <p className="text-emerald-400 font-bold text-sm md:text-base flex items-center gap-2">
                     <Terminal className="w-4 h-4" /> "{humanDesc}"
                  </p>
               </div>
            </div>
         </motion.div>

         {/* --- PRESETS ROW --- */}
         <div className="flex flex-wrap justify-center gap-3 mb-12">
            {presets.map((preset, i) => (
               <button 
                 key={i}
                 onClick={() => setCron(preset.value)}
                 className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all"
               >
                  {preset.label}
               </button>
            ))}
         </div>

         {/* --- BUILDER CONTROLS --- */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <CronField 
               label="Minute" 
               value={cron.minute} 
               range={[0, 59]}
               onChange={(v: string) => setCron({...cron, minute: v})} 
            />
            <CronField 
               label="Hour" 
               value={cron.hour} 
               range={[0, 23]}
               onChange={(v: string) => setCron({...cron, hour: v})} 
            />
            <CronField 
               label="Day (Month)" 
               value={cron.dom} 
               range={[1, 31]}
               onChange={(v: string) => setCron({...cron, dom: v})} 
            />
            <CronField 
               label="Month" 
               value={cron.month} 
               range={[1, 12]}
               onChange={(v: string) => setCron({...cron, month: v})} 
            />
            <CronField 
               label="Day (Week)" 
               value={cron.dow} 
               range={[0, 6]}
               onChange={(v: string) => setCron({...cron, dow: v})} 
            />

         </div>

      </div>

      {/* --- INFO SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 pb-20 relative z-10 text-center">
         <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8">
            <h3 className={`text-2xl font-bold text-white mb-4 ${titleFont.className}`}>What is Cron?</h3>
            <p className="text-neutral-400 leading-relaxed">
               The software utility <strong>Cron</strong> is a time-based job scheduler in Unix-like computer operating systems. Users that set up and maintain software environments use cron to schedule jobs (commands or shell scripts) to run periodically at fixed times, dates, or intervals.
            </p>
            <div className="flex justify-center gap-8 mt-8 text-sm font-mono text-indigo-300">
               <div>
                  <span className="block text-white font-bold text-lg">*</span>
                  any value
               </div>
               <div>
                  <span className="block text-white font-bold text-lg">,</span>
                  value list separator
               </div>
               <div>
                  <span className="block text-white font-bold text-lg">-</span>
                  range of values
               </div>
               <div>
                  <span className="block text-white font-bold text-lg">/</span>
                  step values
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}