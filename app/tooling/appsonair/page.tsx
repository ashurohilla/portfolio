"use client";

import React, { useState, useEffect } from "react";
import { 
  Upload, Cloud, Share2, QrCode, Copy, Check, Trash2, 
  Zap, ExternalLink, Box, Code2, ShieldCheck, ArrowRight, Globe
} from "lucide-react";
import { Titan_One, Nunito } from 'next/font/google';
import { createClient } from '@supabase/supabase-js';
import { QRCodeSVG } from 'qrcode.react';

const titleFont = Titan_One({ weight: '400', subsets: ['latin'] });
const bodyFont = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'] });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AppsOnAirPage() {
  const [uploading, setUploading] = useState(false);
  const [apps, setApps] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const { data } = await supabase.from('apps').select('*').order('created_at', { ascending: false });
    if (data) setApps(data);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const parseRes = await fetch('/api/parse-ipa', { 
        method: 'POST', 
        body: formData 
      });
      const metadata = await parseRes.json();

      if (metadata.error) throw new Error("Could not read IPA metadata");

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
      
      const { data: storageData, error: storageError } = await supabase.storage
        .from('app-releases')
        .upload(fileName, file);

      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage
        .from('app-releases')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from('apps').insert([
        { 
          name: metadata.name || file.name, 
          url: publicUrl, 
          bundle_id: metadata.bundle_id,
          version: metadata.version,
          file_path: fileName 
        }
      ]);

      if (dbError) throw dbError;
      fetchApps();
    } catch (error) {
      alert("Upload failed: " + (error as any).message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (app: any) => {
    if (!confirm("Are you sure you want to delete this build?")) return;
    try {
      await supabase.storage.from('app-releases').remove([app.file_path]);
      await supabase.from('apps').delete().eq('id', app.id);
      setSelectedApp(null);
      fetchApps();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const getShareUrl = (app: any) => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/tooling/appsonair/${app.id}`;
  };

  const copyToClipboard = (app: any) => {
    const shareUrl = getShareUrl(app);
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full min-h-screen bg-[#050505] text-white ${bodyFont.className} selection:bg-indigo-500/30`}>
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* --- HEADER --- */}
      <header className="pt-20 pb-12 px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6">
          <Zap className="w-3 h-3 fill-current" /> Dev Tooling
        </div>
        <h1 className={`text-6xl md:text-7xl font-black mb-6 ${titleFont.className}`}>
          Apps <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">On Air</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">
          Scalable wireless distribution for your iOS builds. Instant, secure, and purely over-the-air.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        
        {/* --- UPLOAD SECTION --- */}
        <section className="mb-20">
          <label className="flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-white/10 rounded-[2.5rem] bg-neutral-900/30 backdrop-blur-sm hover:bg-neutral-900/50 hover:border-indigo-500/50 transition-all cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
              <div className="p-5 rounded-3xl bg-indigo-500/10 mb-5 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
                {uploading ? <Cloud className="w-12 h-12 text-indigo-400 animate-bounce" /> : <Upload className="w-12 h-12 text-indigo-400" />}
              </div>
              <p className="mb-2 text-xl text-white font-bold">
                {uploading ? "Extracting Metadata..." : "Drop IPA here or click to browse"}
              </p>
              <p className="text-sm text-slate-500 font-mono">Scale SaaS automated ingestion engine</p>
            </div>
            <input type="file" className="hidden" accept=".ipa" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </section>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Release List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-3xl ${titleFont.className}`}>Recent <span className="text-cyan-400">Builds</span></h2>
              <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase">
                {apps.length} Releases
              </div>
            </div>

            {apps.length === 0 && (
              <div className="p-20 rounded-[2rem] border border-white/5 bg-neutral-900/20 text-center">
                <Box className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 italic">The hangar is empty. Upload your first build.</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {apps.map((app) => (
                <div 
                  key={app.id} 
                  onClick={() => setSelectedApp(app)}
                  className={`group p-6 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${selectedApp?.id === app.id ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.1)]' : 'bg-neutral-900/40 border-white/5 hover:border-white/20'}`}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl flex items-center justify-center text-indigo-400 font-black border border-white/5 group-hover:scale-105 transition-transform">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">{app.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs font-mono text-slate-500">
                        <span>v{app.version}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                        <span>{new Date(app.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-all ${selectedApp?.id === app.id ? 'text-indigo-400 translate-x-0' : 'text-slate-700 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Sharing */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900/50 border border-white/10 rounded-[2.5rem] p-10 sticky top-12 backdrop-blur-md shadow-2xl overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>
              
              {selectedApp ? (
                <div className="text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white p-5 rounded-[2rem] inline-block mb-8 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    <QRCodeSVG value={getShareUrl(selectedApp)} size={200} />
                  </div>
                  
                  <h3 className={`text-2xl mb-2 ${titleFont.className}`}>{selectedApp.name}</h3>
                  <p className="text-sm text-slate-500 mb-8 font-mono">{selectedApp.bundle_id}</p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={() => copyToClipboard(selectedApp)}
                      className="flex items-center justify-center gap-3 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copied ? "Link Copied!" : "Copy Share Link"}
                    </button>
                    
                    <a 
                      href={getShareUrl(selectedApp)}
                      target="_blank"
                      className="flex items-center justify-center gap-3 w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all"
                    >
                      <ExternalLink className="w-5 h-5" /> Open Preview
                    </a>

                    {/* <button 
                      onClick={() => handleDelete(selectedApp)}
                      className="text-xs text-slate-600 hover:text-rose-500 font-bold uppercase tracking-widest mt-6 transition-colors"
                    >
                      Remove Build
                    </button> */}
                  </div>
                </div>
              ) : (
                <div className="text-center py-24 relative z-10">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                    <QrCode className="w-8 h-8 text-slate-700" />
                  </div>
                  <p className="text-slate-500 font-medium">Select a release to generate distribution assets</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- SCALE SAAS FOOTER --- */}
        <section className="mt-40 pt-20 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className={`text-4xl mb-8 ${titleFont.className}`}>Scale <span className="text-cyan-400">SaaS</span> Studio</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Apps On Air is part of the Scale SaaS ecosystem. We specialize in high-performance developer tools, SaaS architecture, and custom application lab services.
              </p>
              <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-white font-bold">100%</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Client Side</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white font-bold">OTA</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Protocol</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white font-bold">Encrypted</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Storage</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Code2, title: "Dev Tools", desc: "Next-gen utilities" },
                { icon: ShieldCheck, title: "Security", desc: "Privacy by design" },
                { icon: Globe, title: "Global", desc: "Edge distribution" },
                { icon: Code2, title: "Docs", desc: "Build your own" }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <feature.icon className="w-6 h-6 text-indigo-400 mb-4" />
                  <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                  <p className="text-xs text-slate-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-32 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
            <p>© 2026 Scale SaaS Studio • All Systems Operational</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-white cursor-pointer transition-colors">GitHub</span>
              <span className="hover:text-white cursor-pointer transition-colors">Discord</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}