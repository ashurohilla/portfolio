"use client";

import React, { useState, useEffect } from "react";
import yaml from "js-yaml"; 
import * as Diff from "diff"; // Import the diff library
import { 
  FileCode, Activity, Layers, ArrowRightLeft, 
  CheckCircle, AlertTriangle, Box, Server, Globe,
  GitCompare, ArrowRight, X, Plus, Minus
} from "lucide-react";
import { Nunito, Fira_Code } from 'next/font/google';

// --- FONTS ---
const bodyFont = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'] });
const codeFont = Fira_Code({ subsets: ['latin'], weight: ['400', '500'] });

// --- REUSABLE EDITOR ---
const SimpleEditor = ({ code, setCode, label, color = "indigo" }: any) => (
  <div className="flex flex-col h-full bg-neutral-900 rounded-xl border border-white/10 overflow-hidden shadow-lg">
    <div className="bg-[#0f0f0f] border-b border-white/5 p-2 flex justify-between items-center">
      <div className={`text-xs font-bold text-${color}-400 uppercase tracking-widest px-2`}>
        {label}
      </div>
    </div>
    <textarea 
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className={`flex-1 w-full h-full bg-transparent p-4 resize-none focus:outline-none ${codeFont.className} text-xs md:text-sm leading-6 text-slate-300 selection:bg-${color}-500/30`}
      spellCheck={false}
    />
  </div>
);

// --- COMPONENT: DIFF VIEWER ---
const DiffViewer = ({ oldText, newText }: { oldText: string, newText: string }) => {
  const [diffs, setDiffs] = useState<Diff.Change[]>([]);

  useEffect(() => {
    if (oldText && newText) {
      // Create line-by-line diff
      const changes = Diff.diffLines(oldText, newText);
      setDiffs(changes);
    }
  }, [oldText, newText]);

  return (
    <div className={`h-full overflow-auto bg-[#0a0a0a] p-4 ${codeFont.className} text-xs md:text-sm`}>
      {diffs.map((part, index) => {
        // Determine style based on change type
        let bgClass = "bg-transparent";
        let textClass = "text-slate-400";
        let sign = " ";

        if (part.added) {
          bgClass = "bg-emerald-500/10 border-l-2 border-emerald-500";
          textClass = "text-emerald-400";
          sign = "+";
        } else if (part.removed) {
          bgClass = "bg-rose-500/10 border-l-2 border-rose-500";
          textClass = "text-rose-400 line-through opacity-70";
          sign = "-";
        }

        return (
          <div key={index} className={`${bgClass} px-2 py-0.5 whitespace-pre-wrap flex`}>
             <span className={`w-6 select-none opacity-50 font-bold ${textClass}`}>{sign}</span>
             <span className={textClass}>{part.value.replace(/\n$/, '')}</span> 
          </div>
        );
      })}
    </div>
  );
};

// --- COMPONENT: DOCKER VISUALIZER ---
const DockerVisualizer = ({ data }: { data: any }) => {
  if (!data || !data.services) return (
    <div className="h-full flex flex-col items-center justify-center text-slate-500">
      <Box className="w-12 h-12 mb-4 opacity-20" />
      <p>Paste a Docker Compose file to visualize</p>
    </div>
  );

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto h-full">
      {Object.entries(data.services).map(([name, service]: [string, any]) => (
        <div key={name} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-indigo-500/50 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
            <Server className="w-12 h-12 text-indigo-500" />
          </div>
          <div className="flex items-center justify-between mb-3 relative z-10">
            <h3 className="font-bold text-white text-lg">{name}</h3>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">
              {service.image || "build"}
            </span>
          </div>
          
          <div className="space-y-2 text-sm font-mono text-slate-400 relative z-10">
            {service.ports && (
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3 text-emerald-400" />
                <span className="text-slate-300">
                   {service.ports.map((p: any) => typeof p === 'string' ? p : `${p.published}:${p.target}`).join(", ")}
                </span>
              </div>
            )}
            {service.volumes && (
              <div className="flex items-center gap-2">
                <Layers className="w-3 h-3 text-pink-400" />
                <span className="text-slate-500 text-xs">{service.volumes.length} Volumes</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function DevOpsYamlTool() {
  // Input State
  const [yamlLeft, setYamlLeft] = useState(
`version: '3'
services:
  web:
    image: nginx:1.19
    ports:
      - "80:80"`
  );
  
  // Only used for Comparison Mode
  const [yamlRight, setYamlRight] = useState(
`version: '3'
services:
  web:
    image: nginx:latest # Changed tag
    ports:
      - "80:80"
      - "443:443" # Added SSL`
  );

  const [activeTab, setActiveTab] = useState<'validate' | 'convert' | 'visualize' | 'compare'>('compare');
  const [parsedObj, setParsedObj] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // --- LOGIC ENGINE ---
  useEffect(() => {
    try {
      const obj = yaml.load(yamlLeft);
      setParsedObj(obj);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setParsedObj(null);
    }
  }, [yamlLeft]);

  return (
    <div className={`min-h-screen bg-neutral-950 text-white ${bodyFont.className} p-4`}>
      
      {/* Header */}
      <header className="max-w-[95rem] mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
             <Layers className="text-indigo-500 w-8 h-8" />
             DevOps <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">YAML Studio</span>
          </h1>
          <p className="text-slate-500 mt-1">Infrastructure Config Manager</p>
        </div>
        
        {/* Tool Selector */}
        <div className="flex flex-wrap bg-neutral-900 p-1 rounded-xl border border-white/10 gap-1">
           {[
             { id: 'visualize', icon: Box, label: 'Viz' },
             { id: 'convert', icon: ArrowRightLeft, label: 'JSON' },
             { id: 'validate', icon: CheckCircle, label: 'Lint' },
             { id: 'compare', icon: GitCompare, label: 'Diff' },
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                 activeTab === tab.id 
                 ? 'bg-indigo-600 text-white shadow-lg' 
                 : 'text-slate-400 hover:text-white hover:bg-white/5'
               }`}
             >
               <tab.icon className="w-4 h-4" />
               <span className="hidden sm:inline">{tab.label}</span>
             </button>
           ))}
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-[95rem] mx-auto h-[700px]">
        
        {/* MODE: SINGLE INPUT (Viz, JSON, Lint) */}
        {activeTab !== 'compare' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              <div className="flex flex-col gap-2">
                 <SimpleEditor code={yamlLeft} setCode={setYamlLeft} label="YAML Input" color="indigo" />
                 {error && (
                   <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs font-mono flex items-center gap-2">
                     <AlertTriangle className="w-4 h-4" /> {error.split('\n')[0]}
                   </div>
                 )}
              </div>

              <div className="flex flex-col h-full bg-neutral-900 rounded-xl border border-white/10 overflow-hidden relative shadow-lg">
                 <div className="bg-[#0f0f0f] border-b border-white/5 p-2 flex justify-between items-center">
                   <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest pl-2">
                     Result
                   </div>
                 </div>
                 <div className="flex-1 overflow-auto bg-[#0a0a0a]">
                    {activeTab === 'visualize' && <DockerVisualizer data={parsedObj} />}
                    {activeTab === 'convert' && (
                      <textarea readOnly value={parsedObj ? JSON.stringify(parsedObj, null, 2) : ""} className={`w-full h-full bg-transparent p-4 resize-none focus:outline-none ${codeFont.className} text-sm text-emerald-300`} />
                    )}
                    {activeTab === 'validate' && (
                      <div className="h-full flex flex-col items-center justify-center gap-4">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center ${error ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
                           {error ? <X className="w-10 h-10 text-red-500" /> : <CheckCircle className="w-10 h-10 text-emerald-500" />}
                        </div>
                        <h2 className="text-2xl font-bold text-white">{error ? "Syntax Error" : "All Good"}</h2>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        )}

        {/* MODE: COMPARE (Diff) */}
        {activeTab === 'compare' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              {/* Input A */}
              <SimpleEditor code={yamlLeft} setCode={setYamlLeft} label="Original (A)" color="slate" />
              
              {/* Input B */}
              <SimpleEditor code={yamlRight} setCode={setYamlRight} label="Modified (B)" color="blue" />
              
              {/* Diff Result */}
              <div className="flex flex-col h-full bg-neutral-900 rounded-xl border border-white/10 overflow-hidden shadow-lg">
                 <div className="bg-[#0f0f0f] border-b border-white/5 p-2 text-xs font-bold text-emerald-400 uppercase tracking-widest pl-2">
                   Differences
                 </div>
                 <DiffViewer oldText={yamlLeft} newText={yamlRight} />
              </div>
           </div>
        )}

      </main>
    </div>
  );
}