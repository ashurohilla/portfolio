"use client";

import React, { useState, useRef, useEffect } from "react";
import Script from "next/script"; // For JSON-LD Schema
import { 
  Search, AlignLeft, ListTree, Maximize2, Minimize2, Trash2, Copy, 
  Check, AlertCircle, ArrowRight, ArrowLeft, FileCode, FileSpreadsheet, 
  Download, HelpCircle, ShieldCheck, Zap, Globe
} from "lucide-react";
import { Titan_One, Nunito, Fira_Code } from 'next/font/google';

// --- FONTS ---
const titleFont = Titan_One({ weight: '400', subsets: ['latin'] });
const bodyFont = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'] });
const codeFont = Fira_Code({ subsets: ['latin'], weight: ['400', '500'] });

// --- UTILS & TREE COMPONENT (Kept same as before) ---
const jsonToXml = (obj: any): string => {
  let xml = '';
  for (let prop in obj) {
    xml += obj[prop] instanceof Array ? '' : '<' + prop + '>';
    if (obj[prop] instanceof Array) {
      for (let array in obj[prop]) {
        xml += '<' + prop + '>';
        xml += jsonToXml(new Object(obj[prop][array]));
        xml += '</' + prop + '>';
      }
    } else if (typeof obj[prop] == 'object') {
      xml += jsonToXml(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? '' : '</' + prop + '>';
  }
  return xml.replace(/<\/?[0-9]{1,}>/g, '');
};

const jsonToCsv = (json: any): string => {
  const items = Array.isArray(json) ? json : [json];
  if (items.length === 0) return "";
  const keys = Object.keys(items[0]);
  const csv = [
    keys.join(','),
    ...items.map(row => keys.map(k => {
      const val = row[k];
      return typeof val === 'object' ? JSON.stringify(val) : JSON.stringify(val)
    }).join(','))
  ].join('\n');
  return csv;
};

const JsonTreeItem = ({ k, value, isLast, depth = 0 }: { k?: string, value: any, isLast: boolean, depth?: number }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const isEmpty = isObject && Object.keys(value).length === 0;
  const paddingLeft = `${depth * 20}px`;

  if (!isObject) {
    let valueColor = "text-emerald-400"; 
    if (typeof value === 'number') valueColor = "text-orange-400";
    if (typeof value === 'boolean') valueColor = "text-rose-400";
    if (value === null) valueColor = "text-slate-500";

    return (
      <div style={{ paddingLeft }} className="font-mono text-sm leading-6 hover:bg-white/5 px-2 rounded cursor-default break-all">
        {k && <span className="text-indigo-300">"{k}"</span>}
        {k && <span className="text-slate-400 mr-2">:</span>}
        <span className={`${valueColor}`}>{typeof value === 'string' ? `"${value}"` : String(value)}</span>
        {!isLast && <span className="text-slate-500">,</span>}
      </div>
    );
  }

  return (
    <div className="font-mono text-sm leading-6">
      <div onClick={() => setIsExpanded(!isExpanded)} style={{ paddingLeft }} className="flex items-center hover:bg-white/5 px-2 rounded cursor-pointer group select-none">
        <span className="text-slate-500 w-4 -ml-4 flex justify-center text-xs">{!isEmpty && (isExpanded ? "▼" : "▶")}</span>
        {k && <span className="text-indigo-300">"{k}"</span>}
        {k && <span className="text-slate-400 mr-2">:</span>}
        <span className="text-yellow-400">{isArray ? "[" : "{"}</span>
        {!isExpanded && <span className="text-slate-500 text-xs mx-1">...</span>}
        {!isExpanded && <span className="text-yellow-400">{isArray ? "]" : "}"}</span>}
        {!isExpanded && !isLast && <span className="text-slate-500">,</span>}
      </div>
      {isExpanded && !isEmpty && (
        <div>
          {Object.entries(value).map(([key, val], idx, arr) => (
            <JsonTreeItem key={key} k={isArray ? undefined : key} value={val} isLast={idx === arr.length - 1} depth={depth + 1} />
          ))}
          <div style={{ paddingLeft }} className="px-2"><span className="text-yellow-400">{isArray ? "]" : "}"}</span>{!isLast && <span className="text-slate-500">,</span>}</div>
        </div>
      )}
    </div>
  );
};

// --- EDITOR PANE COMPONENT ---
interface EditorPaneProps {
  label: string;
  code: string;
  setCode: (code: string) => void;
}

const EditorPane: React.FC<EditorPaneProps> = ({ label, code, setCode }) => {
  const [viewMode, setViewMode] = useState<"text" | "tree">("text");
  const [searchQuery, setSearchQuery] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [parsedData, setParsedData] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const p = JSON.parse(code);
      setParsedData(p);
      setIsValid(true);
    } catch (e) {
      setIsValid(false);
      setParsedData(null);
    }
  }, [code]);

  const handleFormat = () => isValid && setCode(JSON.stringify(parsedData, null, 2));
  const handleMinify = () => isValid && setCode(JSON.stringify(parsedData));
  const handleClear = () => setCode("");
  const handleCopy = () => navigator.clipboard.writeText(code);
  
  const handleSearch = () => {
    if (!searchQuery || !textareaRef.current) return;
    const text = textareaRef.current.value;
    const index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (index !== -1) {
      setViewMode("text");
      setTimeout(() => {
        textareaRef.current?.focus();
        textareaRef.current?.setSelectionRange(index, index + searchQuery.length);
        const lineHeight = 24; 
        const lines = text.substring(0, index).split("\n").length;
        if(textareaRef.current) textareaRef.current.scrollTop = (lines - 5) * lineHeight;
      }, 50);
    }
  };

  return (
    <div className="flex flex-col h-[750px] bg-neutral-900 rounded-xl border border-white/10 overflow-hidden shadow-2xl relative group">
      <div className="bg-[#0f0f0f] border-b border-white/5 p-3 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-4">
           <div className={`text-xs font-bold uppercase tracking-widest px-2 ${isValid ? 'text-indigo-400' : 'text-rose-400'}`}>
              {label} {isValid ? "" : "(Invalid)"}
           </div>
           <div className="relative flex-1 max-w-[200px]">
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-white/5 border border-white/10 rounded-md py-1.5 pl-8 pr-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
           </div>
        </div>
        <div className="flex justify-between items-center">
           <div className="flex bg-white/5 rounded-lg p-0.5">
              <button onClick={() => setViewMode("text")} className={`p-1.5 rounded-md ${viewMode === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}><AlignLeft className="w-3.5 h-3.5" /></button>
              <button onClick={() => setViewMode("tree")} className={`p-1.5 rounded-md ${viewMode === 'tree' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}><ListTree className="w-3.5 h-3.5" /></button>
           </div>
           <div className="flex gap-1">
              <button onClick={handleFormat} title="Beautify" className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-md"><Maximize2 className="w-3.5 h-3.5" /></button>
              <button onClick={handleMinify} title="Minify" className="p-1.5 text-amber-400 hover:bg-amber-500/10 rounded-md"><Minimize2 className="w-3.5 h-3.5" /></button>
              <button onClick={handleCopy} title="Copy" className="p-1.5 text-slate-300 hover:bg-white/10 rounded-md"><Copy className="w-3.5 h-3.5" /></button>
              <button onClick={handleClear} title="Clear" className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-md"><Trash2 className="w-3.5 h-3.5" /></button>
           </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative bg-[#0a0a0a]">
         {viewMode === "text" ? (
            <textarea 
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full h-full bg-transparent p-4 resize-none focus:outline-none ${codeFont.className} text-sm leading-6 text-slate-300 selection:bg-indigo-500/40`}
              spellCheck={false}
            />
         ) : (
            <div className="h-full overflow-auto p-4 scrollbar-thin scrollbar-thumb-white/10">
               {isValid && parsedData ? <JsonTreeItem value={parsedData} isLast={true} /> : <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2"><AlertCircle className="w-8 h-8 opacity-20" /><span className="text-xs">Invalid JSON</span></div>}
            </div>
         )}
      </div>
    </div>
  );
};

// --- FAQ DATA ---
const faqs = [
  {
    question: "Is my JSON data safe?",
    answer: "Yes, absolutely. This tool runs 100% in your browser using JavaScript. Your data is never sent to our servers or stored anywhere."
  },
  {
    question: "Can I convert JSON to XML or CSV?",
    answer: "Yes! Use the conversion buttons in the center toolbar to transform your JSON into XML or CSV formats instantly."
  },
  {
    question: "How do I validate JSON code?",
    answer: "Simply paste your code into the editor. Our tool automatically checks syntax in real-time. If there is an error, the editor will highlight the issue immediately."
  },
  {
    question: "Does this work with large files?",
    answer: "Yes, our editor is optimized for performance and can handle large JSON files without lag, thanks to efficient rendering."
  }
];

// --- MAIN PAGE ---
export default function JsonEditorPage() {
  const [leftCode, setLeftCode] = useState('{\n  "id": 1,\n  "project": "Scale Saas",\n  "status": "active"\n}');
  const [rightCode, setRightCode] = useState('[]');

  const copyLeftToRight = () => setRightCode(leftCode);
  const copyRightToLeft = () => setLeftCode(rightCode);
  
  const convertToXml = () => {
    try {
      const obj = JSON.parse(leftCode);
      setRightCode(jsonToXml(obj));
    } catch(e) { alert("Invalid JSON in Left Editor"); }
  };

  const convertToCsv = () => {
    try {
      const obj = JSON.parse(leftCode);
      setRightCode(jsonToCsv(obj));
    } catch(e) { alert("Invalid JSON or Not an Array"); }
  };

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Scale Saas JSON Editor",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": "JSON Formatting, JSON Validation, JSON to XML, JSON to CSV",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    }
  };

  return (
    <div className={`w-full min-h-screen bg-neutral-950 text-white ${bodyFont.className}`}>
      
      {/* Inject JSON-LD Schema for SEO */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <header className="pt-8 pb-8 px-6 relative z-10 text-center">
         <h1 className={`text-4xl md:text-5xl font-black mb-4 ${titleFont.className}`}>
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-400">JSON Studio</span>
         </h1>
      </header>

      {/* --- EDITOR AREA --- */}
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 pb-20 relative z-10">
         <div className="flex flex-col xl:flex-row gap-4 items-stretch">
            <div className="flex-1 min-w-0"><EditorPane label="Input / Source" code={leftCode} setCode={setLeftCode} /></div>
            <div className="flex xl:flex-col gap-3 justify-center items-center py-4 xl:py-0">
               <div className="bg-neutral-900 border border-white/10 p-2 rounded-xl flex xl:flex-col gap-2 shadow-xl">
                  <button onClick={copyLeftToRight} className="group relative p-3 bg-white/5 hover:bg-indigo-600 rounded-lg transition-all" title="Copy to Right"><ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-white" /></button>
                  <button onClick={copyRightToLeft} className="group relative p-3 bg-white/5 hover:bg-indigo-600 rounded-lg transition-all" title="Copy to Left"><ArrowLeft className="w-5 h-5 text-slate-300 group-hover:text-white" /></button>
                  <div className="w-px h-8 xl:w-8 xl:h-px bg-white/10 mx-auto my-1"></div>
                  <button onClick={convertToXml} className="group relative p-3 bg-white/5 hover:bg-rose-600 rounded-lg transition-all flex flex-col items-center gap-1" title="Convert to XML">
                     <FileCode className="w-5 h-5 text-slate-300 group-hover:text-white" />
                     <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-white">XML</span>
                  </button>
                  <button onClick={convertToCsv} className="group relative p-3 bg-white/5 hover:bg-emerald-600 rounded-lg transition-all flex flex-col items-center gap-1" title="Convert to CSV">
                     <FileSpreadsheet className="w-5 h-5 text-slate-300 group-hover:text-white" />
                     <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-white">CSV</span>
                  </button>
               </div>
            </div>
            <div className="flex-1 min-w-0"><EditorPane label="Output / Target" code={rightCode} setCode={setRightCode} /></div>
         </div>
      </div>

      {/* --- SEO & CONTENT SECTION --- */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
         
         <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20"></div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Features Text */}
            <div>
               <h2 className={`text-3xl font-black text-white mb-6 ${titleFont.className}`}>
                  Why use this <span className="text-indigo-400">JSON Editor?</span>
               </h2>
               <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                  Scale Saas provides a free, powerful, and secure online JSON editor for developers. 
                  Validate, format, and convert your data without it ever leaving your browser.
               </p>
               <ul className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: "100% Client-Side Privacy" },
                    { icon: Zap, text: "Instant Error Highlighting" },
                    { icon: Globe, text: "Works Offline (PWA Ready)" },
                    { icon: FileSpreadsheet, text: "One-Click CSV/XML Conversion" },
                  ].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-neutral-300 font-medium">
                        <item.icon className="w-5 h-5 text-emerald-400" /> {item.text}
                     </li>
                  ))}
               </ul>
            </div>

            {/* FAQs */}
            <div>
               <h3 className={`text-2xl font-black text-white mb-6 ${titleFont.className}`}>
                  Frequently Asked Questions
               </h3>
               <div className="space-y-4">
                  {faqs.map((faq, index) => (
                     <div key={index} className="bg-neutral-900/50 border border-white/10 rounded-xl p-5 hover:bg-neutral-900 transition-colors">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                           <HelpCircle className="w-4 h-4 text-indigo-400" /> {faq.question}
                        </h4>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                           {faq.answer}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </div>

      </section>

    </div>
  );
}