"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FileJson, 
  Database, 
  KeyRound, 
  FileCode, 
  ArrowRight, 
  Hammer,
  Search,
  Lock,
  Crown
} from "lucide-react";
import { Titan_One, Nunito } from 'next/font/google';

// --- FONTS ---
const titleFont = Titan_One({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
});

const bodyFont = Nunito({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

// --- TOOLS DATA ---
const tools = [
  {
    id: "json-editor",
    title: "JSON Studio",
    desc: "Advanced JSON formatter, validator, and converter (XML/CSV) with diff checking.",
    icon: FileJson,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50",
    link: "/tooling/jsoneditor",
    status: "Live"
  },
  {
    id: "sql-formatter",
    title: "SQL Formatter",
    desc: "Beautify complex SQL queries and generate schema diagrams instantly.",
    icon: Database,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
    link: "/tooling/sqlformater",
    status: "Live"
  },
   {
    id: "cron job cretor",
    title: "Cron Creator",
    desc: "Beautify complex SQL queries and generate schema diagrams instantly.",
    icon: Crown,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
    link: "/tooling/generatecronjob",
    status: "Live"
  },
  {
    id: "Yml Generator and differnce checker",
    title: "Yml Generator and differnce checker",
    desc: "Beautify complex Yml files creat and  diagrams instantly.",
    icon: Crown,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
    link: "/tooling/writeymlfiles",
    status: "Live"
  },
   {
    id: "base64decode",
    title: "Decode Encode base64 ",
    desc: "Advanced base 64 Encoder and decoder",
    icon: FileJson,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50",
    link: "/tooling/base64decode",
    status: "Live"
  },
  {
    id: "pwd-generator",
    title: "Password Gen",
    desc: "Generate cryptographically secure passwords with custom entropy settings.",
    icon: KeyRound,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "group-hover:border-rose-500/50",
    link: "#",
    status: "Coming Soon"
  },
  {
    id: "markdown-preview",
    title: "Markdown Live",
    desc: "Real-time Markdown editor with GitHub flavored preview and export options.",
    icon: FileCode,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "group-hover:border-amber-500/50",
    link: "#",
    status: "Coming Soon"
  },
   {
    id: "app on air ",
    title: "App On Air",
    desc: "apps on air is a tool that allows to distribute apps wirelessly.",
    icon: FileCode,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "group-hover:border-amber-500/50",
    link: "/tooling/appsonair",
    status: "Live"
  },
  {
    id: "web view mobile",
    title: "Web View Mobile",
    desc: "View web content in a mobile-friendly format.",
    icon: FileCode,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "group-hover:border-amber-500/50",
    link: "/tooling/webviewmobile",
    status: "Live"
  }
];

export default function ToolsPage() {
  return (
    <div className={`w-full min-h-screen bg-neutral-950 text-white ${bodyFont.className}`}>
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* --- HERO HEADER --- */}
      <section className="pt-32 pb-16 px-6 relative z-10 text-center">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
         >
            <span className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6">
               <Hammer className="w-4 h-4 inline mr-2 -mt-1" />
               Developer Utility Kit
            </span>
            
            <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight ${titleFont.className}`}>
               Build Faster with <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400">
                 Scale Tools.
               </span>
            </h1>
            
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
               A collection of free, high-performance utilities for developers. No ads, no tracking, just utility.
            </p>
         </motion.div>
      </section>

      {/* --- SEARCH BAR (Visual Only for now) --- */}
      <div className="container mx-auto px-6 mb-16 relative z-10">
         <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center bg-neutral-900 border border-white/10 rounded-full px-6 py-4 shadow-2xl focus-within:border-indigo-500/50 transition-colors">
               <Search className="w-5 h-5 text-slate-500 mr-4" />
               <input 
                 type="text" 
                 placeholder="Search tools (e.g. JSON, SQL)..." 
                 className="bg-transparent border-none outline-none text-white w-full placeholder-slate-600 font-medium"
               />
            </div>
         </div>
      </div>

      {/* --- TOOLS GRID --- */}
      <section className="pb-32 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {tools.map((tool, index) => {
                const isLive = tool.status === "Live";
                
                return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={isLive ? tool.link : "#"} className={!isLive ? "cursor-not-allowed" : ""}>
                      <div className={`
                        group relative flex flex-col p-8 rounded-[2rem] bg-neutral-900/50 border border-white/5 backdrop-blur-sm 
                        transition-all duration-300 h-full
                        ${isLive ? 'hover:bg-neutral-900 hover:border-white/10 hover:-translate-y-2 hover:shadow-2xl' : 'opacity-60'}
                        ${tool.border}
                      `}>
                         
                         {/* Glow Effect */}
                         <div className={`absolute top-0 right-0 w-32 h-32 ${tool.bg} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                         <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tool.bg} ${tool.color} border border-white/5`}>
                                  <tool.icon className="w-7 h-7" />
                               </div>
                               <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border ${isLive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-neutral-800 text-neutral-500 border-neutral-700'}`}>
                                  {tool.status}
                               </span>
                            </div>

                            <h3 className={`text-2xl font-bold text-white mb-2 ${titleFont.className}`}>
                               {tool.title}
                            </h3>
                            
                            <p className="text-neutral-400 text-sm leading-relaxed mb-8 h-12 font-medium">
                               {tool.desc}
                            </p>

                            <div className={`flex items-center gap-2 font-bold text-sm transition-colors ${isLive ? 'text-white group-hover:text-indigo-400' : 'text-neutral-600'}`}>
                               {isLive ? (
                                 <>Launch Tool <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>
                               ) : (
                                 <><Lock className="w-3 h-3" /> In Development</>
                               )}
                            </div>
                         </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

           </div>
        </div>
      </section>

    </div>
  );
}