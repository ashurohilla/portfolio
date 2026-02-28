"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Bot, 
  Smartphone, 
  Zap, 
  Globe, 
  Database,
  Layout,
  Cpu
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

// --- SERVICES DATA ---
const services = [
  {
    title: "AI Integration",
    description: "Custom LLMs, Chatbots, and Automation pipelines.",
    icon: Bot,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "group-hover:border-rose-500/50",
    colSpan: "md:col-span-2", // Wide card
  },
  {
    title: "Web Apps",
    description: "Next.js & React platforms that scale globally.",
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
    colSpan: "md:col-span-1",
  },
  {
    title: "Mobile First",
    description: "Responsive designs and native-feel PWA experiences.",
    icon: Smartphone,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "group-hover:border-amber-500/50",
    colSpan: "md:col-span-1",
  },
  {
    title: "UI/UX Design",
    description: "Award-winning interfaces created in Figma.",
    icon: Layout,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50",
    colSpan: "md:col-span-2", // Wide card
  },
  {
    title: "Speed Optimization",
    description: "99+ Lighthouse scores.",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "group-hover:border-yellow-500/50",
    colSpan: "md:col-span-1",
  },
  {
    title: "Backend Systems",
    description: "Robust APIs & DBs.",
    icon: Database,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50",
    colSpan: "md:col-span-1",
  },
  {
    title: "SaaS Architecture",
    description: "Multi-tenant setups.",
    icon: Code2,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "group-hover:border-indigo-500/50",
    colSpan: "md:col-span-1",
  },
];

const ServicesSection = () => {
  return (
    <section className={`relative w-full bg-neutral-950 py-32 overflow-hidden ${bodyFont.className}`}>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-neutral-950 opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-indigo-300 text-sm font-bold tracking-widest uppercase mb-6">
                 <Cpu className="w-4 h-4 inline mr-2 -mt-1" />
                 Our Capabilities
              </span>
              
              <h2 className={`text-4xl md:text-7xl font-black text-white mb-6 leading-tight ${titleFont.className}`}>
                 We Build The <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
                   Impossible
                 </span>
              </h2>
              
              <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                 From simple landing pages to complex AI-driven SaaS platforms, we have the tech stack to handle it all.
              </p>
           </motion.div>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
           {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`
                  ${service.colSpan} 
                  group relative overflow-hidden rounded-3xl p-8 
                  bg-neutral-900/50 backdrop-blur-sm border border-white/10 
                  transition-all duration-500 hover:bg-neutral-800/80
                  ${service.border}
                `}
              >
                 {/* Hover Gradient Bloom */}
                 <div className={`absolute top-0 right-0 w-32 h-32 ${service.bg} rounded-full blur-[60px] group-hover:blur-[80px] transition-all duration-500`}></div>

                 <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="mb-6">
                       <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                          <service.icon className={`w-6 h-6 ${service.color}`} />
                       </div>
                       <h3 className={`text-2xl font-bold text-white mb-2 ${titleFont.className}`}>
                          {service.title}
                       </h3>
                       <p className="text-neutral-400 font-medium leading-relaxed">
                          {service.description}
                       </p>
                    </div>
                    
                    {/* Decorative Line */}
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full w-0 group-hover:w-full transition-all duration-700 ease-out ${service.bg.replace('/10', '')} bg-current`}></div>
                    </div>
                 </div>
              </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;