"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ExternalLink, 
  Github, 
  ArrowRight, 
  Layers, 
  Zap, 
  Globe, 
  Smartphone,
  Cpu
} from "lucide-react";
import { Titan_One, Nunito } from 'next/font/google';
import Image from "next/image";
import { FullNavbar } from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer";

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

// --- MOCK PROJECT DATA ---
const projects = [
  {
    id: 1,
    title: "Nova Dashboard",
    category: "Fintech SaaS",
    description: "A comprehensive financial analytics platform processing over $1M in daily transactions. Features real-time data visualization, crypto-wallet integration, and AI-driven investment insights.",
    tech: ["Next.js 14", "Supabase", "Recharts", "Stripe"],
    link: "#",
    color: "from-blue-500 to-indigo-500",
    glow: "bg-blue-500/20",
    icon: Layers
  },
  {
    id: 2,
    title: "AskAlice AI",
    category: "AI Automation",
    description: "An intelligent customer support agent for Shopify stores. Automates 80% of support tickets using RAG (Retrieval-Augmented Generation) and custom LLM fine-tuning.",
    tech: ["OpenAI API", "Python", "Pinecone", "React"],
    link: "#",
    color: "from-emerald-400 to-teal-500",
    glow: "bg-emerald-500/20",
    icon: Cpu
  },
  {
    id: 3,
    title: "Velvet & Vine",
    category: "E-Commerce",
    description: "A high-performance headless commerce storefront for a luxury fashion brand. Achieved a 99/100 Lighthouse score and reduced bounce rates by 40%.",
    tech: ["Shopify Headless", "Tailwind", "Framer Motion"],
    link: "#",
    color: "from-rose-400 to-pink-500",
    glow: "bg-rose-500/20",
    icon: Globe
  },
  {
    id: 4,
    title: "MedSync",
    category: "Healthcare App",
    description: "A HIPAA-compliant telemedicine PWA allowing patients to book appointments, video chat with doctors, and manage prescriptions digitally.",
    tech: ["React Native", "Node.js", "WebRTC", "Postgres"],
    link: "#",
    color: "from-amber-400 to-orange-500",
    glow: "bg-amber-500/20",
    icon: Smartphone
  }
];

const ProductsPage = () => {
  return (
 <div>
   <FullNavbar/>
      <div className={`w-full min-h-screen bg-neutral-950 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:32px_32px] ${bodyFont.className}`}>
      
      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
              <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-indigo-300 text-sm font-bold tracking-widest uppercase mb-6">
                 <Zap className="w-4 h-4 inline mr-2 -mt-1" />
                 Our Work
              </span>
              
              <h1 className={`text-5xl md:text-7xl font-black text-white mb-6 leading-tight ${titleFont.className}`}>
                 Built to <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400">
                   Scale.
                 </span>
              </h1>
              
              <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                 We don't just write code; we ship products. Here are a few selected projects that showcase our engineering capabilities.
              </p>
           </motion.div>
        </div>
      </section>


      {/* =========================================
          PROJECTS GRID
      ========================================= */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative flex flex-col rounded-[2.5rem] bg-neutral-900/50 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl"
                >
                   
                   {/* 1. VISUAL AREA (Thumbnail) */}
                   {/* Use this div to hold your image. Currently using a gradient placeholder. */}
                   <div className={`relative h-64 w-full overflow-hidden bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                      {/* Abstract Pattern / Shine */}
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                      <div className="absolute inset-0 bg-black/10"></div>
                      
                      {/* Icon Placeholder (Replace this whole block with <Image /> if you have screenshots) */}
                      <div className="relative z-10 flex flex-col items-center gap-4 text-white transform group-hover:scale-110 transition-transform duration-500">
                         <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                            <project.icon className="w-10 h-10" />
                         </div>
                         <span className={`font-black text-xl tracking-widest uppercase opacity-80 ${titleFont.className}`}>
                            {project.title}
                         </span>
                      </div>
                   </div>

                   {/* 2. CONTENT AREA */}
                   <div className="p-8 flex flex-col flex-1 relative">
                      {/* Glow Effect on Hover */}
                      <div className={`absolute top-0 left-0 w-full h-full ${project.glow} blur-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                      <div className="flex justify-between items-start mb-4">
                         <div>
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 block">
                               {project.category}
                            </span>
                            <h3 className={`text-2xl font-bold text-white ${titleFont.className}`}>
                               {project.title}
                            </h3>
                         </div>
                         <a href={project.link} className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors">
                            <ExternalLink className="w-5 h-5 text-white" />
                         </a>
                      </div>

                      <p className="text-neutral-400 leading-relaxed mb-8 font-medium">
                         {project.description}
                      </p>

                      <div className="mt-auto">
                         <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map((t, i) => (
                               <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-xs font-bold text-neutral-300">
                                  {t}
                               </span>
                            ))}
                         </div>
                         
                         <button className="w-full py-4 rounded-xl bg-white text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors">
                            View Case Study <ArrowRight className="w-4 h-4" />
                         </button>
                      </div>
                   </div>

                </motion.div>
              ))}

           </div>
        </div>
      </section>


      {/* =========================================
          CTA SECTION
      ========================================= */}
      <section className="pb-20 text-center px-6">
         <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 ${titleFont.className}`}>
            Have an idea in mind?
         </h2>
         <p className="text-neutral-400 mb-8 max-w-xl mx-auto font-medium">
            Let's build the next big thing together. Whether it's an MVP or a full-scale platform, we are ready.
         </p>
           <a   href="https://wa.me/919588368052" 
               target="_blank" 
               rel="noopener noreferrer">

         <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 mx-auto">
            Start Your Project <ArrowRight className="w-4 h-4" />
         </button>
               </a>
      </section>

    </div>
    <Footer/>
 </div>
  );
};

export default ProductsPage;