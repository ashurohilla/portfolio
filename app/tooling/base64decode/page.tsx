"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { 
  FileCode, Lock, Globe, Code2, ArrowRightLeft, 
  Copy, Trash2, Check, AlertCircle, RefreshCw, 
  MoveRight, GitCompare, CheckCircle2, XCircle, FileJson
} from "lucide-react";
import { Nunito, Fira_Code } from 'next/font/google';

// --- FONTS ---
const titleFont = Nunito({ subsets: ['latin'], weight: ['800', '900'] });
const codeFont = Fira_Code({ subsets: ['latin'], weight: ['400', '500'] });

// --- UTILITY: CONVERSION LOGIC ---
const converters = {
  base64: {
    encode: (str: string) => {
      try { return btoa(str); } catch (e) { throw new Error("Input contains characters that cannot be Base64 encoded."); }
    },
    decode: (str: string) => {
      try { return atob(str); } catch (e) { throw new Error("Invalid Base64 string."); }
    }
  },
  url: {
    encode: (str: string) => encodeURIComponent(str),
    decode: (str: string) => decodeURIComponent(str)
  },
  html: {
    encode: (str: string) => str.replace(/[\u00A0-\u9999<>\&]/g, (i) => '&#' + i.charCodeAt(0) + ';'),
    decode: (str: string) => {
      const txt = document.createElement("textarea");
      txt.innerHTML = str;
      return txt.value;
    }
  }
};

// --- COMPONENT: TEXT AREA PANE ---
interface PaneProps {
  label: string;
  value: string;
  setValue?: (val: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  error?: string | null;
  color: string;
  showStats?: boolean;
}

const TextPane: React.FC<PaneProps> = ({ label, value, setValue, readOnly, placeholder, error, color, showStats = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate size stats
  const charCount = value.length;
  const byteSize = new Blob([value]).size;
  const displaySize = byteSize > 1024 ? `${(byteSize / 1024).toFixed(2)} KB` : `${byteSize} B`;

  return (
    <div className={`flex flex-col h-full bg-neutral-900 rounded-2xl border ${error ? 'border-red-500/50' : 'border-white/10'} overflow-hidden shadow-2xl transition-all focus-within:ring-2 ring-${color}-500/30`}>
      {/* Pane Header */}
      <div className="bg-[#0f0f0f] border-b border-white/5 p-4 flex justify-between items-center">
        <div className={`text-xs font-bold text-${color}-400 uppercase tracking-widest flex items-center gap-2`}>
           {label}
        </div>
        <div className="flex gap-2">
           {!readOnly && setValue && (
             <button onClick={() => setValue("")} className="text-slate-500 hover:text-rose-400 transition-colors" title="Clear">
                <Trash2 className="w-4 h-4" />
             </button>
           )}
           <button onClick={handleCopy} className={`transition-colors ${copied ? 'text-emerald-400' : 'text-slate-500 hover:text-white'}`} title="Copy">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
           </button>
        </div>
      </div>

      {/* Text Area */}
      <div className="relative flex-1 bg-[#0a0a0a]">
        <textarea 
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full h-full bg-transparent p-5 resize-none focus:outline-none ${codeFont.className} text-sm leading-relaxed text-slate-300 placeholder:text-slate-700 selection:bg-${color}-500/30`}
          spellCheck={false}
        />
        
        {/* Error Overlay */}
        {error && (
          <div className="absolute bottom-12 right-4 left-4 bg-red-900/90 border border-red-500/50 text-red-200 p-3 rounded-lg text-xs font-mono flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-2 z-10">
             <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
             {error}
          </div>
        )}

        {/* Stats Footer */}
        {showStats && value.length > 0 && (
           <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-neutral-950/50 border-t border-white/5 flex gap-4 text-[10px] text-slate-500 font-mono">
              <span>Length: {charCount}</span>
              <span>Size: {displaySize}</span>
           </div>
        )}
      </div>
    </div>
  );
};

export default function EncoderDecoderPage() {
  const [mode, setMode] = useState<'base64' | 'url' | 'html' | 'comparator'>('base64');
  const [direction, setDirection] = useState<'encode' | 'decode'>('encode');
  
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState(""); // For comparator mode
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [matchStatus, setMatchStatus] = useState<'match' | 'mismatch' | 'idle'>('idle');

  // --- LOGIC ENGINE ---
  useEffect(() => {
    setError(null);

    // 1. COMPARATOR MODE LOGIC
    if (mode === 'comparator') {
        if (!input && !input2) {
            setMatchStatus('idle');
            return;
        }
        if (input === input2) {
            setMatchStatus('match');
        } else {
            setMatchStatus('mismatch');
        }
        return;
    }

    // 2. CONVERSION MODE LOGIC
    if (!input) {
      setOutput("");
      return;
    }

    try {
      // @ts-ignore - Dynamic key access
      const result = converters[mode][direction](input);
      setOutput(result);
    } catch (err: any) {
      setError(err.message || "Conversion failed");
    }
  }, [input, input2, mode, direction]);

  // --- SEO JSON-LD ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Universal Encoder & Comparator",
    "applicationCategory": "DeveloperTool",
    "featureList": "Base64 Encoder, Base64 Comparator, URL Decoder, HTML Entity Converter",
    "browserRequirements": "Requires JavaScript. Works offline."
  };

  const tabs = [
    { id: 'base64', label: 'Base64', icon: Lock, color: 'indigo' },
    { id: 'url', label: 'URL Format', icon: Globe, color: 'cyan' },
    { id: 'html', label: 'HTML Entities', icon: Code2, color: 'orange' },
    { id: 'comparator', label: 'Comparator', icon: GitCompare, color: 'emerald' },
  ];

  const activeColor = tabs.find(t => t.id === mode)?.color || 'indigo';

  return (
    <div className={`min-h-screen bg-neutral-950 text-white ${titleFont.className}`}>
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Background Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-neutral-950 pointer-events-none"></div>

      {/* --- HEADER --- */}
      <header className="relative z-10 pt-12 pb-12 px-6 text-center">
         <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
           Universal <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${activeColor}-400 to-${activeColor}-600`}>Toolbox</span>
         </h1>
         <p className="text-slate-500 text-lg max-w-2xl mx-auto">
           Securely encode, decode, and compare strings instantly in your browser.
         </p>
      </header>

      {/* --- TOOLBAR --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-neutral-900/50 border border-white/5 p-2 rounded-2xl backdrop-blur-sm">
           
           {/* Mode Tabs */}
           <div className="flex p-1 bg-neutral-950/50 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { 
                      setInput(""); 
                      setInput2(""); 
                      setError(null);
                      setMode(tab.id as any); 
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                    mode === tab.id 
                    ? `bg-${tab.color}-600 text-white shadow-lg` 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
           </div>

           {/* Direction Toggle (Hidden in Comparator Mode) */}
           {mode !== 'comparator' && (
               <div className="flex items-center gap-3 bg-neutral-950/50 p-1 rounded-xl w-full md:w-auto animate-in fade-in zoom-in-95 duration-200">
                  <button 
                    onClick={() => setDirection('encode')}
                    className={`flex-1 md:flex-none px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${direction === 'encode' ? 'bg-white text-neutral-900' : 'text-slate-500 hover:text-white'}`}
                  >
                    Encode <MoveRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setDirection('decode')}
                    className={`flex-1 md:flex-none px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${direction === 'decode' ? 'bg-white text-neutral-900' : 'text-slate-500 hover:text-white'}`}
                  >
                    Decode <MoveRight className="w-4 h-4 rotate-180" />
                  </button>
               </div>
           )}

           {/* Comparator Status Indicator */}
           {mode === 'comparator' && (
               <div className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold w-full md:w-auto justify-center transition-all animate-in fade-in zoom-in-95 duration-200
                   ${matchStatus === 'match' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30' : 
                     matchStatus === 'mismatch' ? 'bg-rose-900/30 text-rose-400 border border-rose-500/30' : 
                     'bg-neutral-800 text-slate-500'}`}>
                   {matchStatus === 'match' && <><CheckCircle2 className="w-5 h-5" /> Match</>}
                   {matchStatus === 'mismatch' && <><XCircle className="w-5 h-5" /> Mismatch</>}
                   {matchStatus === 'idle' && "Waiting for input..."}
               </div>
           )}

        </div>
      </div>

      {/* --- MAIN WORKSPACE --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 h-[600px] md:h-[500px] pb-20">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            
            {/* INPUT PANE (Used for Input A in Comparator) */}
            <TextPane 
              label={mode === 'comparator' ? "String A" : (direction === 'encode' ? `Plain Text` : `Encoded ${mode}`)}
              value={input}
              setValue={setInput}
              placeholder={mode === 'comparator' ? "Paste first string..." : (direction === 'encode' ? "Type something to encrypt..." : "Paste hash to decrypt...")}
              color={mode === 'comparator' && matchStatus === 'mismatch' ? 'rose' : "slate"}
            />

            {/* OUTPUT PANE (Used for Input B in Comparator) */}
            <TextPane 
              label={mode === 'comparator' ? "String B" : (direction === 'encode' ? `Encoded ${mode}` : `Plain Text`)}
              value={mode === 'comparator' ? input2 : output}
              setValue={mode === 'comparator' ? setInput2 : undefined}
              readOnly={mode !== 'comparator'}
              error={error}
              placeholder={mode === 'comparator' ? "Paste second string..." : "Result will appear here..."}
              color={mode === 'comparator' ? (matchStatus === 'mismatch' ? 'rose' : 'emerald') : activeColor}
            />

         </div>
      </main>

      {/* --- SEO CONTENT & FAQ --- */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
         <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"></div>
         
         <h2 className="text-3xl font-black text-center mb-12">
            Toolbox <span className={`text-${activeColor}-400`}>Essentials</span>
         </h2>

         <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-neutral-900 border border-white/5 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
               <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-3">
                 <GitCompare className="w-5 h-5 text-emerald-400" /> Comparator
               </h3>
               <p className="text-slate-400 leading-relaxed text-sm">
                 The comparator performs a strict equality check. It is case-sensitive and character-perfect. Useful for verifying if two long Base64 strings (like JWTs or Images) are identical without scanning them manually.
               </p>
            </div>

            <div className="bg-neutral-900 border border-white/5 rounded-2xl p-8 hover:border-indigo-500/30 transition-colors">
               <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-3">
                 <Lock className="w-5 h-5 text-indigo-400" /> What is Base64?
               </h3>
               <p className="text-slate-400 leading-relaxed text-sm">
                 Base64 is a binary-to-text encoding scheme. It is commonly used to embed binary data (like images or fonts) directly into HTML/CSS files, or to transmit data safely over media that are designed to deal with textual data.
               </p>
            </div>

            <div className="bg-neutral-900 border border-white/5 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors">
               <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-3">
                 <Globe className="w-5 h-5 text-cyan-400" /> URL Encoding
               </h3>
               <p className="text-slate-400 leading-relaxed text-sm">
                 URLs can only accept specific characters (ASCII). If you need to send spaces, emojis, or special symbols in a web address, they must be converted to a "%" format (e.g., a space becomes %20) to be valid.
               </p>
            </div>

            <div className="bg-neutral-900 border border-white/5 rounded-2xl p-8 hover:border-orange-500/30 transition-colors">
               <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-3">
                 <RefreshCw className="w-5 h-5 text-orange-400" /> Privacy First
               </h3>
               <p className="text-slate-400 leading-relaxed text-sm">
                 No data is sent to any backend server. All encoding, decoding, and comparing happen 100% in your browser using JavaScript, making this tool safe for sensitive strings like API keys.
               </p>
            </div>
         </div>
      </section>

    </div>
  );
}