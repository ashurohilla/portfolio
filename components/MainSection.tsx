"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Search, ShieldCheck, Database, Cpu, Code2 } from "lucide-react";
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

const features = [
  {
    title: "Blazing Fast",
    desc: "We don't just build websites; we build rockets. Expect 99+ Lighthouse scores and sub-second load times using Next.js Edge caching.",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "group-hover:border-yellow-400/50"
  },
  {
    title: "SEO Native",
    desc: "Semantic HTML, dynamic sitemaps, and structured schema markup are baked in. Google loves our code as much as users do.",
    icon: Search,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "group-hover:border-blue-400/50"
  },
  {
    title: "AI Powered",
    desc: "Future-proof your business. We integrate LLMs (OpenAI, Claude) directly into your workflow for automation and chatbots.",
    icon: Cpu,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "group-hover:border-purple-400/50"
  },
  {
    title: "Bulletproof Security",
    desc: "Enterprise-grade authentication, encrypted databases, and protected API routes standard with every build.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "group-hover:border-emerald-400/50"
  }
];

const MethodologySection = () => {
  return (
    <section className={`relative w-full bg-neutral-950 py-32 overflow-hidden ${bodyFont.className}`}>
      
      {/* Background Grid - Matching your theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* --- LEFT: STICKY HEADER --- */}
          <div className="w-full lg:w-1/3">
             <div className="sticky top-32">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                   <span className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6">
                      Our Standard
                   </span>
                   
                   <h2 className={`text-4xl md:text-6xl font-black text-white mb-6 leading-tight ${titleFont.className}`}>
                      Not Just <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                        Pretty.
                      </span> <br/>
                      Powerful.
                   </h2>
                   
                   <p className="text-neutral-400 text-lg font-medium leading-relaxed mb-8">
                      Most agencies stop at design. We obsess over the engine under the hood. Every pixel is engineered for performance, scale, and conversion.
                   </p>

                   {/* Visual "Score" Element */}
                   <div className="p-6 bg-neutral-900/80 border border-white/10 rounded-2xl backdrop-blur-md inline-block">
                      <div className="flex items-center gap-4">
                         <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                               <path className="text-neutral-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                               <path className="text-green-500" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            </svg>
                            <span className="absolute text-green-500 font-bold text-xl">100</span>
                         </div>
                         <div>
                            <p className="text-white font-bold text-sm">Google Performance</p>
                            <p className="text-neutral-500 text-xs">Average Client Score</p>
                         </div>
                      </div>
                   </div>

                </motion.div>
             </div>
          </div>

          {/* --- RIGHT: FEATURE GRID --- */}
          <div className="w-full lg:w-2/3">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: index * 0.1 }}
                     className={`group p-8 rounded-[2rem] bg-neutral-900/50 border border-white/5 hover:bg-neutral-900 transition-all duration-300 ${feature.border}`}
                   >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color}`}>
                         <feature.icon className="w-7 h-7" />
                      </div>
                      
                      <h3 className={`text-2xl font-bold text-white mb-3 ${titleFont.className}`}>
                         {feature.title}
                      </h3>
                      
                      <p className="text-neutral-400 font-medium leading-relaxed">
                         {feature.desc}
                      </p>
                   </motion.div>
                ))}

                {/* --- CODE BLOCK CARD (Visual Interest) --- */}
                <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 }}
                   className="md:col-span-2 p-8 rounded-[2rem] bg-neutral-900/50 border border-white/5 hover:border-indigo-500/30 transition-all group overflow-hidden relative"
                >
                   <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Code2 className="w-32 h-32 text-indigo-500" />
                   </div>

                   <h3 className={`text-2xl font-bold text-white mb-4 ${titleFont.className}`}>
                      Clean Code. No Bloat.
                   </h3>
                   <div className="bg-black/50 rounded-xl p-4 font-mono text-xs md:text-sm text-neutral-300 border border-white/5 overflow-x-auto">
                      <p><span className="text-purple-400">const</span> <span className="text-yellow-400">scaleSaas</span> = <span className="text-blue-400">async</span> () ={'>'} {'{'}</p>
                      <p className="pl-4"><span className="text-purple-400">return</span> {'{'}</p>
                      <p className="pl-8">performance: <span className="text-green-400">'100%'</span>,</p>
                      <p className="pl-8">security: <span className="text-green-400">'Enterprise'</span>,</p>
                      <p className="pl-8">scalable: <span className="text-blue-400">true</span></p>
                      <p className="pl-4">{'}'}</p>
                      <p>{'}'}</p>
                   </div>
                </motion.div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MethodologySection;