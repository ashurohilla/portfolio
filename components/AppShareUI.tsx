"use client";

import React, { useState } from "react";
import { 
  Download, Share2, Box, Code2, Rocket, 
  Check, Copy, Info, ChevronRight, Zap 
} from "lucide-react";
import { Titan_One, Nunito } from 'next/font/google';
import { QRCodeSVG } from 'qrcode.react';

const titleFont = Titan_One({ weight: '400', subsets: ['latin'] });
const bodyFont = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function AppShareUI({ app }: { app: any }) {
  const [copied, setCopied] = useState(false);

  // Use the production domain
  const domain = "https://saasscale.in";
  const manifestUrl = `${domain}/api/manifest/${app.id}`;
  const installLink = `itms-services://?action=download-manifest&url=${encodeURIComponent(manifestUrl)}`;
  const shareableLink = `${domain}/tooling/appsonair/${app.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen mt-6 bg-[#050505] text-white ${bodyFont.className} selection:bg-cyan-500/30 relative overflow-x-hidden`}>
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex flex-col items-center">
        
        {/* --- APP INSTALL CARD --- */}
        <div className="w-full max-w-md bg-neutral-900/40 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-16 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-2xl ring-4 ring-[#050505]">
              {app.name.charAt(0)}
            </div>
          </div>

          <div className="mt-10 text-center">
            <h1 className={`text-3xl font-black mb-1 ${titleFont.className}`}>{app.name}</h1>
            <p className="text-slate-500 text-sm font-mono mb-8 uppercase tracking-tighter">
              v{app.version || '1.0.0'} • {app.bundle_id}
            </p>

            <div className="bg-white p-3 rounded-2xl inline-block mb-8 shadow-inner">
               <QRCodeSVG value={shareableLink} size={140} />
            </div>

            <div className="space-y-3">
              <a
                href={installLink}
                className="flex items-center justify-center gap-3 w-full bg-cyan-400 text-black hover:bg-white font-black py-4 rounded-2xl transition-all transform active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                <Download className="w-5 h-5" /> Install App
              </a>
              
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-3 w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all border border-white/10"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5 text-slate-400" />}
                {copied ? "Link Copied!" : "Copy Share Link"}
              </button>
            </div>
          </div>
        </div>

        {/* --- SCALE SAAS ECOSYSTEM --- */}
        <div className="w-full grid md:grid-cols-2 gap-16 items-start border-t border-white/10 pt-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
              <Zap className="w-3 h-3 fill-current" /> Ecosystem
            </div>
            <h2 className={`text-5xl ${titleFont.className}`}>
              Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">SaaS</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              The ultimate launchpad for developers. We build the "behind the scenes" tech that makes high-growth applications possible.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 transition-all">
                <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl group-hover:scale-110 transition-transform"><Code2 /></div>
                <div>
                  <h4 className="font-bold">Dev Tooling</h4>
                  <p className="text-xs text-slate-500">OTA distribution, CLI helpers, and API scaffolding.</p>
                </div>
              </div>
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 transition-all">
                <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl group-hover:scale-110 transition-transform"><Rocket /></div>
                <div>
                  <h4 className="font-bold">SaaS Scaling</h4>
                  <p className="text-xs text-slate-500">Infrastructure built with Next.js, Go, and Supabase.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Box className="text-cyan-400" /> Building Lab
                </h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  We are currently open-sourcing our internal distribution tools. 
                  Get involved in building the next generation of DevOps for mobile.
                </p>
              </div>
              
              <ul className="space-y-4">
                {['Public API for Builds', 'Custom Manifest Support', 'Usage Analytics'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <footer className="mt-24 pt-8 border-t border-white/5 w-full text-center">
          <p className="text-slate-600 text-xs font-mono tracking-widest uppercase">
            Designed & Built by Scale SaaS • 2026
          </p>
        </footer>
      </div>
    </div>
  );
}