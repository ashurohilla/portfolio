"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Script from "next/script";
import { 
  Search, AlignLeft, ListTree, Maximize2, Minimize2, Trash2, Copy, 
  Check, AlertCircle, ArrowRight, ArrowLeft, FileCode, FileSpreadsheet, 
  ChevronDown, ChevronRight as ChevronRightIcon, X, ChevronUp, Network,
  // Added these two for the Full Screen feature
  Expand, Shrink 
} from "lucide-react";
import { HelpCircle , Zap , ShieldCheck , Globe  } from "lucide-react";
import { Titan_One, Nunito, Fira_Code } from 'next/font/google';

// --- FONTS ---
const titleFont = Titan_One({ weight: '400', subsets: ['latin'] });
const bodyFont = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'] });
const codeFont = Fira_Code({ subsets: ['latin'], weight: ['400', '500'] });

// --- UTILS: CONVERTERS ---
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

// --- COMPONENT: TREE ITEM ---
interface TreeItemProps {
  k?: string;
  value: any;
  isLast: boolean;
  depth?: number;
  searchTerm: string;
  path: string;
  forceShow?: boolean;
}

const JsonTreeItem: React.FC<TreeItemProps> = ({ k, value, isLast, depth = 0, searchTerm, path, forceShow = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPath, setShowPath] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);
  
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const isEmpty = isObject && Object.keys(value).length === 0;
  
  const paddingLeft = `${depth * 16}px`;

  const currentPath = k 
    ? (path ? (path.endsWith(']') ? `${path}.${k}` : `${path}.${k}`) : k) 
    : path;

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentPath);
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  // --- SEARCH MATCH LOGIC ---
  const matchesSearch = useMemo(() => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const keyMatch = k ? k.toLowerCase().includes(term) : false;
    const valueMatch = !isObject && String(value).toLowerCase().includes(term);
    return keyMatch || valueMatch;
  }, [k, value, searchTerm, isObject]);

  const hasMatchingChildren = useMemo(() => {
    if (!isObject || !searchTerm) return false;
    const checkRecursive = (val: any): boolean => {
      if (val !== null && typeof val === 'object') {
        return Object.entries(val).some(([ck, cv]) => 
          ck.toLowerCase().includes(searchTerm.toLowerCase()) || String(cv).toLowerCase().includes(searchTerm.toLowerCase()) || checkRecursive(cv)
        );
      }
      return String(val).toLowerCase().includes(searchTerm.toLowerCase());
    };
    return checkRecursive(value);
  }, [value, searchTerm, isObject]);

  useEffect(() => {
    if (searchTerm) setIsExpanded(true); 
    else setIsExpanded(depth < 1);
  }, [searchTerm, depth]);

  const shouldRender = forceShow || !searchTerm || matchesSearch || hasMatchingChildren;

  if (!shouldRender) {
    return null;
  }

  const keyMatches = k && searchTerm && k.toLowerCase().includes(searchTerm.toLowerCase());
  const childrenForceShow = forceShow || !!keyMatches;

  const highlightClass = searchTerm && matchesSearch ? "bg-white/10 text-white rounded px-1 animate-pulse tree-match ring-1 ring-indigo-500" : "";
  const keyHighlightClass = searchTerm && k && k.toLowerCase().includes(searchTerm.toLowerCase()) ? "bg-indigo-500/40 text-white px-1 rounded tree-match" : "";

  const PathControl = () => (
    <div className={`absolute right-4 flex items-center gap-2 bg-neutral-800 text-indigo-100 text-[10px] px-2 py-1 rounded shadow-xl border border-indigo-500/30 transition-opacity ${showPath ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-50`}>
        <Network className="w-3 h-3 text-indigo-400" />
        <span className="font-mono opacity-80 max-w-[150px] truncate">{currentPath}</span>
        <div className="w-px h-3 bg-white/20 mx-1"></div>
        <button onClick={handleCopyPath} className="hover:text-white flex items-center gap-1">
            {copiedPath ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copiedPath ? "Copied" : "Copy Path"}
        </button>
    </div>
  );

  // 1. PRIMITIVE
  if (!isObject) {
    let valueColor = "text-emerald-400"; // String (Green)
    let valueClass = "";

    if (typeof value === 'number') {
        valueColor = "text-orange-400"; // Number (Orange)
    }
    else if (typeof value === 'boolean') {
        valueColor = "text-rose-400 font-bold"; // Boolean (Pink + Bold)
    }
    else if (value === null) {
        valueColor = "text-slate-500 italic"; // Null (Grey + Italic)
    }

    return (
      <div 
        style={{ paddingLeft }} 
        className="font-mono text-sm leading-6 hover:bg-white/5 pr-2 rounded cursor-default whitespace-nowrap flex items-center relative group transition-colors duration-200"
        onMouseEnter={() => setShowPath(true)}
        onMouseLeave={() => setShowPath(false)}
      >
        <div className="flex items-center">
            {/* Object Key Color */}
            {k && <span className={`text-cyan-300 mr-1 ${keyHighlightClass}`}>{k}</span>}
            {k && <span className="text-slate-400 mr-2">:</span>}
            
            {/* Value Color */}
            <span className={`${valueColor} ${valueClass} ${!k ? highlightClass : ''} ${!k && searchTerm && matchesSearch ? "tree-match" : ""}`}>
            {typeof value === 'string' ? `"${value}"` : String(value)}
            </span>
            {!isLast && <span className="text-slate-500">,</span>}
        </div>
        <PathControl />
      </div>
    );
  }

  // 2. OBJECT / ARRAY
  return (
    <div className="font-mono text-sm leading-6">
      <div 
        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} 
        style={{ paddingLeft }} 
        onMouseEnter={() => setShowPath(true)}
        onMouseLeave={() => setShowPath(false)}
        className="flex items-center hover:bg-white/5 pr-2 rounded cursor-pointer group select-none relative transition-colors duration-200 whitespace-nowrap"
      >
        <span className="text-slate-500 w-4 -ml-4 flex justify-center mr-1">
           {!isEmpty && (isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />)}
        </span>
        
        {/* Object Key Color for Objects/Arrays */}
        {k && <span className={`text-cyan-300 mr-1 ${keyHighlightClass}`}>{k}</span>}
        {k && <span className="text-slate-400 mr-2">:</span>}
        
        {/* Bracket Color */}
        <span className="text-yellow-400 font-bold">{isArray ? "[" : "{"}</span>
        
        {!isExpanded && <span className="text-slate-500 text-xs mx-1 tracking-widest">...</span>}
        
        {!isExpanded && <span className="text-yellow-400 font-bold">{isArray ? "]" : "}"}</span>}
        {!isExpanded && !isLast && <span className="text-slate-500">,</span>}
        
        {!isExpanded && (
           <span className="ml-2 text-xs text-slate-600 italic group-hover:text-slate-400">
             {isArray ? `${value.length} items` : `${Object.keys(value).length} keys`}
           </span>
        )}
        
        <PathControl />
      </div>

      {isExpanded && !isEmpty && (
        <div>
          {Object.entries(value).map(([key, val], idx, arr) => {
             const nextPath = isArray ? `${currentPath}[${key}]` : currentPath;
             return (
                <JsonTreeItem 
                  key={key} 
                  k={isArray ? undefined : key} 
                  value={val} 
                  isLast={idx === arr.length - 1} 
                  depth={depth + 1}
                  searchTerm={searchTerm}
                  path={nextPath}
                  forceShow={childrenForceShow}
                />
             );
          })}
          <div style={{ paddingLeft }} className="px-2">
             <span className="text-yellow-400 font-bold">{isArray ? "]" : "}"}</span>
             {!isLast && <span className="text-slate-500">,</span>}
          </div>
        </div>
      )}
      
      {isExpanded && isEmpty && (
         <div style={{ paddingLeft }} className="px-2">
            <span className="text-yellow-400 font-bold">{isArray ? "]" : "}"}</span>
            {!isLast && <span className="text-slate-500">,</span>}
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
  readOnly?: boolean;
  onToggleFullScreen: () => void;
  isFullScreen: boolean;
}

// --- UTILS: SYNTAX HIGHLIGHTER ---
const highlightJSON = (code: string) => {
  if (!code) return "";
  
  // 1. Escape HTML special characters to prevent rendering issues
  const htmlEscaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 2. Regex to tokenize JSON parts
  // Captures: Strings (with optional key colon), Booleans, Nulls, Numbers, Brackets
  return htmlEscaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[\[\]\{\},])/g,
    (match) => {
      let cls = 'text-indigo-300'; // Default punctuation
      
      // Strings & Keys
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          // It's a key (ends with :)
          // We split the color: Key is Cyan, Colon is Grey
          return `<span class="text-cyan-300">${match.slice(0, -1)}</span><span class="text-slate-500">:</span>`;
        } else {
          cls = 'text-emerald-400'; // String Value
        }
      } 
      // Booleans
      else if (/true|false/.test(match)) {
        cls = 'text-rose-400 font-bold';
      } 
      // Null
      else if (/null/.test(match)) {
        cls = 'text-slate-500 italic';
      } 
      // Numbers
      else if (/^-?\d/.test(match)) {
        cls = 'text-orange-400';
      } 
      // Brackets
      else if (/[\[\]\{\}]/.test(match)) {
         cls = 'text-yellow-400 font-bold'; 
      } 
      // Commas
      else if (/,/.test(match)) {
         cls = 'text-slate-500';
      }

      return `<span class="${cls}">${match}</span>`;
    }
  );
};

const EditorPane: React.FC<EditorPaneProps> = ({ 
  label, code, setCode, readOnly = false, onToggleFullScreen, isFullScreen 
}) => {
  const [viewMode, setViewMode] = useState<"text" | "tree">("text");
  const [searchQuery, setSearchQuery] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [parsedData, setParsedData] = useState<any>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // --- SEARCH NAV STATE ---
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatchIdx, setCurrentMatchIdx] = useState(0);
  const [textMatchIndices, setTextMatchIndices] = useState<number[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null); // Ref for the colored background
  const treeContainerRef = useRef<HTMLDivElement>(null);

  // Generate highlighted HTML for the background layer
  const highlightedCode = useMemo(() => highlightJSON(code), [code]);

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

  // --- SCROLL SYNC ---
  // When textarea scrolls, move the colored background to match
  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // --- SEARCH LOGIC (TEXT MODE) ---
  useEffect(() => {
    if (viewMode === 'text' && searchQuery && code) {
       const indices: number[] = [];
       const lowerCode = code.toLowerCase();
       const lowerQuery = searchQuery.toLowerCase();
       let idx = lowerCode.indexOf(lowerQuery);
       while (idx !== -1) {
         indices.push(idx);
         idx = lowerCode.indexOf(lowerQuery, idx + 1);
       }
       setTextMatchIndices(indices);
       setMatchCount(indices.length);
       setCurrentMatchIdx(0);
       if (indices.length > 0 && typeof indices[0] === "number") highlightTextMatch(indices[0]);
    } else if (viewMode === 'text') {
        setMatchCount(0);
    }
  }, [searchQuery, code, viewMode]);

  // --- SEARCH LOGIC (TREE MODE) ---
  useEffect(() => {
    if (viewMode === 'tree' && searchQuery) {
        const timer = setTimeout(() => {
            if (treeContainerRef.current) {
                const matches = treeContainerRef.current.querySelectorAll('.tree-match');
                setMatchCount(matches.length);
                setCurrentMatchIdx(0);
                if (matches.length > 0) {
                      if (matches[0]) {
                        (matches[0] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
                        (matches[0] as HTMLElement).classList.add('ring-2', 'ring-yellow-400');
                      }
                }
            }
        }, 300);
        return () => clearTimeout(timer);
    }
  }, [searchQuery, viewMode, parsedData]);

  const highlightTextMatch = (index: number) => {
      if (textareaRef.current && searchQuery) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(index, index + searchQuery.length);
        
        // Calculate scroll position to center the match
        const text = textareaRef.current.value;
        const lineHeight = 24; 
        const lines = text.substring(0, index).split("\n").length;
        const newScrollTop = (lines - 10) * lineHeight;
        
        textareaRef.current.scrollTop = newScrollTop;
        // Manually sync preRef because programmatic scroll might not trigger onScroll
        if(preRef.current) preRef.current.scrollTop = newScrollTop;
      }
  };

  const navigateSearch = (direction: 'next' | 'prev') => {
      if (matchCount === 0) return;

      let newIndex = currentMatchIdx;
      if (direction === 'next') {
          newIndex = (currentMatchIdx + 1) % matchCount;
      } else {
          newIndex = (currentMatchIdx - 1 + matchCount) % matchCount;
      }
      setCurrentMatchIdx(newIndex);

      if (viewMode === 'text') {
          const idx = textMatchIndices[newIndex];
          if (typeof idx === 'number') {
              highlightTextMatch(idx);
          }
      } else {
          if (treeContainerRef.current) {
              const matches = treeContainerRef.current.querySelectorAll('.tree-match');
              matches.forEach(m => m.classList.remove('ring-2', 'ring-yellow-400'));
              
              const target = matches[newIndex] as HTMLElement;
              if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  target.classList.add('ring-2', 'ring-yellow-400');
              }
          }
      }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          navigateSearch(e.shiftKey ? 'prev' : 'next');
      }
  };

  const handleFormat = () => isValid && setCode(JSON.stringify(parsedData, null, 2));
  const handleMinify = () => isValid && setCode(JSON.stringify(parsedData));
  const handleClear = () => setCode("");
  const handleCopy = () => navigator.clipboard.writeText(code);

  return (
    <div className="flex flex-col h-[700px] bg-neutral-900 rounded-xl border border-white/10 overflow-hidden shadow-2xl relative group">
      
      {/* Top Toolbar */}
      <div className="bg-[#0f0f0f] border-b border-white/5 p-3 flex flex-wrap justify-between items-center gap-2">
         <div className="flex items-center gap-3">
            <div className={`text-xs font-bold uppercase tracking-widest px-2 hidden md:block ${isValid ? 'text-indigo-400' : 'text-rose-400'}`}>
                {label}
            </div>
            <div className="flex bg-white/5 rounded-lg p-0.5">
                <button 
                  onClick={() => setViewMode("text")} 
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <AlignLeft className="w-3 h-3 inline mr-1" /> Text
                </button>
                <button 
                  onClick={() => setViewMode("tree")} 
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'tree' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <ListTree className="w-3 h-3 inline mr-1" /> Tree
                </button>
            </div>
         </div>

         <div className="flex items-center gap-2">
            {/* Search Box */}
            {searchOpen ? (
                <div className="flex items-center bg-white/5 border border-white/10 rounded-md px-2 py-1 animate-in slide-in-from-right-5 fade-in duration-300">
                    <Search className="w-3 h-3 text-slate-400 mr-2" />
                    <input 
                        type="text" 
                        placeholder="Find..." 
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none text-xs text-white focus:outline-none w-24 md:w-32"
                    />
                    
                    {matchCount > 0 && (
                        <div className="flex items-center gap-1 mx-2 border-l border-white/10 pl-2">
                            <span className="text-[10px] text-slate-500 whitespace-nowrap mr-1">
                                {currentMatchIdx + 1}/{matchCount}
                            </span>
                            <button onClick={() => navigateSearch('prev')} className="hover:bg-white/10 rounded p-0.5"><ChevronUp className="w-3 h-3 text-slate-300" /></button>
                            <button onClick={() => navigateSearch('next')} className="hover:bg-white/10 rounded p-0.5"><ChevronDown className="w-3 h-3 text-slate-300" /></button>
                        </div>
                    )}

                    <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="ml-1 text-slate-500 hover:text-white"><X className="w-3 h-3" /></button>
                </div>
            ) : (
                <button onClick={() => setSearchOpen(true)} className="p-1.5 text-slate-300 hover:bg-white/10 rounded-md transition-colors" title="Search">
                    <Search className="w-4 h-4" />
                </button>
            )}

            <div className="h-4 w-px bg-white/10 mx-1"></div>

            <button onClick={handleFormat} className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-md" title="Format"><Maximize2 className="w-4 h-4" /></button>
            <button onClick={handleMinify} className="p-1.5 text-amber-400 hover:bg-amber-500/10 rounded-md" title="Minify"><Minimize2 className="w-4 h-4" /></button>
            <button onClick={handleCopy} className="p-1.5 text-slate-300 hover:bg-white/10 rounded-md" title="Copy"><Copy className="w-4 h-4" /></button>
            <button onClick={handleClear} className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-md" title="Clear"><Trash2 className="w-4 h-4" /></button>
            <div className="h-4 w-px bg-white/10 mx-1"></div>
            <button 
                onClick={onToggleFullScreen} 
                className={`p-1.5 rounded-md transition-colors ${isFullScreen ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:bg-white/10'}`}
                title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
            >
                {isFullScreen ? <Shrink className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
            </button>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative bg-[#0a0a0a]">
         {viewMode === "text" ? (
            <div className="relative w-full h-full text-sm font-mono">
                {/* Layer 1: The Colored Render (Behind) */}
                <pre 
                    ref={preRef}
                    className={`absolute inset-0 w-full h-full p-4 m-0 overflow-auto whitespace-pre pointer-events-none ${codeFont.className} leading-6`}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
                
                {/* Layer 2: The Transparent Input (Front) */}
                <textarea 
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onScroll={handleScroll}
                    readOnly={readOnly}
                    spellCheck={false}
                    className={`absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white resize-none border-none focus:outline-none whitespace-pre ${codeFont.className} leading-6 selection:bg-indigo-500/30`}
                />
            </div>
         ) : (
            <div ref={treeContainerRef} className="h-full overflow-auto p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
               {isValid && parsedData ? (
                  <div className="min-w-fit"> 
                      <JsonTreeItem 
                        value={parsedData} 
                        isLast={true} 
                        searchTerm={searchQuery} 
                        path="" 
                        forceShow={false}
                      />
                   </div>
               ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-4">
                      <AlertCircle className="w-12 h-12 opacity-20" />
                      <span className="text-sm font-bold">Invalid JSON: Fix syntax to view Tree</span>
                  </div>
               )}
            </div>
         )}
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
export default function JsonEditorPage() {
  const [leftCode, setLeftCode] = useState('{\n  "id": 1,\n  "project": "Scale Saas",\n  "status": "active",\n  "nested": {\n    "key": "value",\n    "find_me": "here"\n  }\n}');
  const [rightCode, setRightCode] = useState('[]');
  
  // State for Full Screen Mode: 'left' | 'right' | null (both)
  const [fullScreenSide, setFullScreenSide] = useState<'left' | 'right' | null>(null);

  const copyLeftToRight = () => setRightCode(leftCode);
  const copyRightToLeft = () => setLeftCode(rightCode);
  
  const convertToXml = () => { try { setRightCode(jsonToXml(JSON.parse(leftCode))) } catch {} };
  const convertToCsv = () => { try { setRightCode(jsonToCsv(JSON.parse(leftCode))) } catch {} };

  // Handlers for toggling full screen
  const toggleLeftFullScreen = () => setFullScreenSide(prev => prev === 'left' ? null : 'left');
  const toggleRightFullScreen = () => setFullScreenSide(prev => prev === 'right' ? null : 'right');

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Scale Saas JSON Editor",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "featureList": "JSON Formatting, Path Finder, XML/CSV Converter"
  };

  return (
    <div className={`w-full min-h-screen bg-neutral-950 text-white ${bodyFont.className}`}>
      
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <header className="pt-6 pb-8 px-2 relative z-10 text-center">
         <h1 className={`text-5xl md:text-5xl font-black mb-6 ${titleFont.className}`}>
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-400">JSON Studio</span>
         </h1>
      </header>

      {/* --- EDITOR AREA --- */}
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 pb-32 relative z-10">
         <div className="flex flex-col xl:flex-row gap-6 items-stretch">
            
            {/* Left Pane: Show if 'left' is selected OR if nothing is selected (split view) */}
            {(fullScreenSide === 'left' || fullScreenSide === null) && (
                <div className="flex-1 min-w-0">
                    <EditorPane 
                        label="Input / Source" 
                        code={leftCode} 
                        setCode={setLeftCode} 
                        onToggleFullScreen={toggleLeftFullScreen}
                        isFullScreen={fullScreenSide === 'left'}
                    />
                </div>
            )}
            
            {/* Center Controls: Hide if ANY side is full screen */}
            {fullScreenSide === null && (
                <div className="flex xl:flex-col gap-4 justify-center items-center py-4 xl:py-0">
                   <div className="bg-neutral-900 border border-white/10 p-3 rounded-2xl flex xl:flex-col gap-4 shadow-xl">
                      <button onClick={copyLeftToRight} className="group relative p-4 bg-white/5 hover:bg-indigo-600 rounded-xl transition-all" title="Copy to Right"><ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-white" /></button>
                      <button onClick={copyRightToLeft} className="group relative p-4 bg-white/5 hover:bg-indigo-600 rounded-xl transition-all" title="Copy to Left"><ArrowLeft className="w-6 h-6 text-slate-300 group-hover:text-white" /></button>
                      <div className="w-px h-10 xl:w-10 xl:h-px bg-white/10 mx-auto my-2"></div>
                      <button onClick={convertToXml} className="group relative p-4 bg-white/5 hover:bg-rose-600 rounded-xl transition-all flex flex-col items-center gap-1" title="Convert to XML">
                          <FileCode className="w-6 h-6 text-slate-300 group-hover:text-white" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-white">XML</span>
                      </button>
                      <button onClick={convertToCsv} className="group relative p-4 bg-white/5 hover:bg-emerald-600 rounded-xl transition-all flex flex-col items-center gap-1" title="Convert to CSV">
                          <FileSpreadsheet className="w-6 h-6 text-slate-300 group-hover:text-white" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-white">CSV</span>
                      </button>
                   </div>
                </div>
            )}

            {/* Right Pane: Show if 'right' is selected OR if nothing is selected (split view) */}
            {(fullScreenSide === 'right' || fullScreenSide === null) && (
                <div className="flex-1 min-w-0">
                    <EditorPane 
                        label="Output / Target" 
                        code={rightCode} 
                        setCode={setRightCode}
                        onToggleFullScreen={toggleRightFullScreen}
                        isFullScreen={fullScreenSide === 'right'}
                    />
                </div>
            )}
            
         </div>
      </div>

      {/* --- SEO SECTION --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
         <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20"></div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
               <h2 className={`text-4xl font-black text-white mb-8 ${titleFont.className}`}>
                  Why use this <span className="text-indigo-400">JSON Editor?</span>
               </h2>
               <p className="text-neutral-400 text-lg leading-loose mb-8">
                  Scale Saas provides a free, powerful, and secure online JSON editor. 
               </p>
               <ul className="space-y-6">
                  {[
                    { icon: ShieldCheck, text: "100% Client-Side Privacy" },
                    { icon: Zap, text: "Instant Error Highlighting" },
                    { icon: Globe, text: "Works Offline (PWA Ready)" },
                    { icon: FileSpreadsheet, text: "One-Click CSV/XML Conversion" },
                  ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-neutral-300 text-lg font-medium">
                         <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><item.icon className="w-6 h-6" /></div> {item.text}
                      </li>
                  ))}
               </ul>
            </div>
            <div>
               <h3 className={`text-3xl font-black text-white mb-8 ${titleFont.className}`}>
                  Frequently Asked Questions
               </h3>
               <div className="space-y-6">
                  <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 hover:bg-neutral-900 transition-colors">
                      <h4 className="font-bold text-white mb-3 flex items-center gap-3 text-lg">
                         <HelpCircle className="w-5 h-5 text-indigo-400" /> Is my JSON data safe?
                      </h4>
                      <p className="text-neutral-400 text-base leading-relaxed pl-8">
                          Yes, absolutely. This tool runs 100% in your browser using JavaScript. Your data is never sent to our servers or stored anywhere.
                      </p>
                  </div>
                  <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 hover:bg-neutral-900 transition-colors">
                      <h4 className="font-bold text-white mb-3 flex items-center gap-3 text-lg">
                         <HelpCircle className="w-5 h-5 text-indigo-400" /> How do I search?
                      </h4>
                      <p className="text-neutral-400 text-base leading-relaxed pl-8">
                          Click the Search icon in the toolbar. The list filters automatically. Use the Up/Down arrows to jump to and highlight specific matches in the tree.
                      </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}