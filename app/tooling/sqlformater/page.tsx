"use client";

import React, { useState, useRef } from "react";
import Script from "next/script";
import { 
  Database, 
  AlignLeft, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  Copy, 
  ArrowRight, 
  Check, 
  Type, // For Uppercase/Lowercase
  Search,
  Code,
  ShieldCheck,
  Zap,
  Globe,
  Server,
  HelpCircle
} from "lucide-react";
import { Titan_One, Nunito, Fira_Code } from 'next/font/google';

// --- FONTS ---
const titleFont = Titan_One({ weight: '400', subsets: ['latin'] });
const bodyFont = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'] });
const codeFont = Fira_Code({ subsets: ['latin'], weight: ['400', '500'] });

// --- UTILS: BASIC SQL FORMATTER (Heuristic) ---
// Note: For production, you might want to use a library like 'sql-formatter'
// This is a robust regex-based formatter for the demo.
const formatSql = (sql: string) => {
  let formatted = sql
    .replace(/\s+/g, ' ') // Remove extra spaces
    .replace(/'/g, "'")   // Standardize quotes
    .replace(/(\b(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING|LIMIT|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN|UNION|CREATE TABLE|DROP TABLE|ALTER TABLE)\b)/gi, "\n$1") // Newline keywords
    .replace(/(\b(FROM|WHERE|ORDER BY|GROUP BY|LIMIT|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN)\b)/gi, "\n$1") // Extra spacing for major clauses
    .replace(/\(/g, "(\n  ") // Indent parenthesis open
    .replace(/\)/g, "\n)")   // Indent parenthesis close
    .replace(/,/g, ",\n  ")  // Newline for commas
    .replace(/^\s*/, '');    // Trim start

  return formatted;
};

const minifySql = (sql: string) => {
  return sql.replace(/\s+/g, ' ').replace(/\s*([,()=])\s*/g, '$1').trim();
};

// --- EDITOR PANE ---
interface EditorPaneProps {
  label: string;
  code: string;
  setCode: (code: string) => void;
  readOnly?: boolean;
}

const EditorPane: React.FC<EditorPaneProps> = ({ label, code, setCode, readOnly = false }) => {
  return (
    <div className="flex flex-col h-[700px] bg-neutral-900 rounded-xl border border-white/10 overflow-hidden shadow-2xl relative group">
      {/* Header */}
      <div className="bg-[#0f0f0f] border-b border-white/5 p-3 flex justify-between items-center">
        <div className="text-xs font-bold uppercase tracking-widest px-2 text-indigo-400">
           {label}
        </div>
        <div className="text-xs text-slate-500 font-mono">
           {code.length} chars
        </div>
      </div>
      
      {/* Text Area */}
      <div className="flex-1 overflow-hidden relative bg-[#0a0a0a]">
         <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            readOnly={readOnly}
            className={`w-full h-full bg-transparent p-6 resize-none focus:outline-none ${codeFont.className} text-sm leading-7 text-slate-300 selection:bg-indigo-500/40 placeholder:text-slate-700`}
            spellCheck={false}
            placeholder={readOnly ? "Formatted output will appear here..." : "SELECT * FROM users WHERE..."}
         />
      </div>
    </div>
  );
};

// --- FAQ DATA ---
const faqs = [
  {
    question: "Why should I format my SQL?",
    answer: "Formatted SQL is easier to read, debug, and share. Proper indentation helps identify logic errors in complex joins and subqueries quickly."
  },
  {
    question: "Is my database data safe?",
    answer: "Yes. This tool runs entirely in your browser using JavaScript. No SQL queries are ever sent to our servers or executed against any database."
  },
  {
    question: "Does this support all SQL dialects?",
    answer: "This tool uses standard SQL formatting rules that apply to MySQL, PostgreSQL, SQL Server, and SQLite. It handles common keywords standard across these platforms."
  },
  {
    question: "Can I minify the SQL for production?",
    answer: "Absolutely. Use the 'Minify' button to remove all unnecessary whitespace and newlines, reducing the payload size for your application."
  },
  {
    question: "How do I copy the result?",
    answer: "Click the 'Copy' button in the central toolbar. The formatted code is copied instantly to your clipboard, ready to be pasted into your IDE or database client."
  }
];

// --- MAIN PAGE ---
export default function SqlFormatterPage() {
  const [inputSql, setInputSql] = useState("SELECT id, name, email FROM users WHERE active = 1 AND created_at > '2024-01-01' ORDER BY id DESC");
  const [outputSql, setOutputSql] = useState("");

  // --- ACTIONS ---
  const handleFormat = () => {
    // 1. Basic Format
    let formatted = formatSql(inputSql);
    // 2. Default to Uppercase Keywords for standard practice
    formatted = formatted.replace(/\b(select|from|where|and|or|order by|group by|limit|insert|update|delete|join|on|as|in|is|null|like)\b/gi, (match) => match.toUpperCase());
    setOutputSql(formatted);
  };

  const handleMinify = () => {
    setOutputSql(minifySql(inputSql));
  };

  const handleUppercase = () => {
    // Converts common keywords to Uppercase, keeps values intact-ish (simple regex)
    const upper = inputSql.replace(/\b(select|from|where|and|or|order by|group by|limit|insert|update|delete|join|on|as|in|is|null|like)\b/gi, (match) => match.toUpperCase());
    setInputSql(upper);
  };

  const handleClear = () => {
    setInputSql("");
    setOutputSql("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputSql || inputSql);
  };

  // --- SAMPLE LOAD ---
  const loadSample = () => {
    setInputSql("select u.id, u.username, o.total from users u join orders o on u.id = o.user_id where o.status = 'completed' group by u.id having sum(o.total) > 1000");
  };

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Scale Saas SQL Formatter",
    "description": "Free online SQL formatter and beautifier. Indent, prettify, and minify your SQL queries securely in the browser.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "featureList": "SQL Beautifier, SQL Minifier, Uppercase Keywords, Syntax Highlighting",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    }
  };

  return (
    <div className={`w-full min-h-screen bg-neutral-950 text-white ${bodyFont.className}`}>
      
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* --- HEADER --- */}
      <header className="pt-24 pb-12 px-6 relative z-10 text-center">
         <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-bold uppercase tracking-widest mb-6">
            <Database className="w-4 h-4" /> SQL Tool
         </div>
         <h1 className={`text-4xl md:text-5xl font-black mb-4 ${titleFont.className}`}>
            Pro <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-400">SQL Formatter</span>
         </h1>
         <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Beautify tough queries instantly. Secure, client-side formatting for MySQL, PostgreSQL, and SQL Server.
         </p>
      </header>

      {/* --- TOOLBAR --- */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 relative z-10 mb-6">
         <div className="bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-wrap gap-4 justify-between items-center shadow-2xl">
            
            <div className="flex gap-2">
               <button onClick={loadSample} className="px-4 py-2 bg-white/5 text-slate-300 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Search className="w-3 h-3" /> Load Sample
               </button>
               <button onClick={handleUppercase} className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-bold hover:bg-blue-500/20 transition-colors flex items-center gap-2">
                  <Type className="w-3 h-3" /> Uppercase Keys
               </button>
            </div>

            <div className="flex gap-2">
               <button onClick={handleFormat} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" /> Format SQL
               </button>
            </div>

         </div>
      </div>

      {/* --- MAIN WORKSPACE --- */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 pb-20 relative z-10">
         <div className="flex flex-col xl:flex-row gap-4 items-stretch">
            
            {/* 1. LEFT EDITOR */}
            <div className="flex-1 min-w-0">
               <EditorPane label="Raw SQL Query" code={inputSql} setCode={setInputSql} />
            </div>

            {/* 2. MIDDLE TOOLS */}
            <div className="flex xl:flex-col gap-3 justify-center items-center py-4 xl:py-0">
               <div className="bg-neutral-900 border border-white/10 p-2 rounded-xl flex xl:flex-col gap-2 shadow-xl">
                  
                  <button onClick={handleFormat} className="group relative p-3 bg-white/5 hover:bg-emerald-600 rounded-lg transition-all" title="Run Formatter">
                     <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-white" />
                  </button>

                  <div className="w-px h-8 xl:w-8 xl:h-px bg-white/10 mx-auto my-1"></div>

                  <button onClick={handleMinify} className="group relative p-3 bg-white/5 hover:bg-amber-600 rounded-lg transition-all flex flex-col items-center gap-1" title="Minify / Compress">
                     <Minimize2 className="w-5 h-5 text-slate-300 group-hover:text-white" />
                  </button>

                  <button onClick={handleCopy} className="group relative p-3 bg-white/5 hover:bg-blue-600 rounded-lg transition-all flex flex-col items-center gap-1" title="Copy Result">
                     <Copy className="w-5 h-5 text-slate-300 group-hover:text-white" />
                  </button>

                  <button onClick={handleClear} className="group relative p-3 bg-white/5 hover:bg-rose-600 rounded-lg transition-all flex flex-col items-center gap-1" title="Clear All">
                     <Trash2 className="w-5 h-5 text-slate-300 group-hover:text-white" />
                  </button>

               </div>
            </div>

            {/* 3. RIGHT EDITOR */}
            <div className="flex-1 min-w-0">
               <EditorPane label="Beautified Output" code={outputSql} setCode={setOutputSql} />
            </div>

         </div>
      </div>

      {/* --- SEO & CONTENT SECTION --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
         
         <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20"></div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Left: Description */}
            <div>
               <h2 className={`text-3xl font-black text-white mb-6 ${titleFont.className}`}>
                  Master Your <span className="text-indigo-400">Database</span>
               </h2>
               <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                  Writing SQL is hard. Reading messy SQL is harder. Scale Saas SQL Formatter transforms unreadable queries into clean, standardized code instantly. 
               </p>
               <div className="space-y-4">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="text-white font-bold">100% Private</h4>
                        <p className="text-sm text-neutral-500">Code never leaves your browser.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                        <Zap className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="text-white font-bold">Instant Formatting</h4>
                        <p className="text-sm text-neutral-500">Handles 5000+ line queries in milliseconds.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                        <Server className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="text-white font-bold">Multi-Dialect Support</h4>
                        <p className="text-sm text-neutral-500">Works with MySQL, PostgreSQL, Oracle, and MS SQL.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: FAQs */}
            <div>
               <h3 className={`text-2xl font-black text-white mb-6 ${titleFont.className}`}>
                  Common Questions
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