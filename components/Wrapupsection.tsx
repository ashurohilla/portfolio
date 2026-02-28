"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Lightbulb, 
  Search, 
  PenTool, 
  Code, 
  Rocket, 
  ArrowRight,
  MessageSquare
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

// --- PROCESS DATA ---
const steps = [
  {
    icon: Search,
    title: "Discovery",
    desc: "We dive deep into your business goals, audience, and competitors to find the winning angle.",
    color: "bg-blue-500",
    text: "text-blue-400"
  },
  {
    icon: PenTool,
    title: "Design",
    desc: "Wireframes and high-fidelity prototypes. We iterate until the pixel-perfect vision is locked in.",
    color: "bg-rose-500",
    text: "text-rose-400"
  },
  {
    icon: Code,
    title: "Development",
    desc: "Clean, scalable code using Next.js and Tailwind. Built for speed, SEO, and performance.",
    color: "bg-amber-500",
    text: "text-amber-400"
  },
  {
    icon: Rocket,
    title: "Launch & Scale",
    desc: "Rigorous testing, deployment, and post-launch support to ensure you scale without friction.",
    color: "bg-emerald-500",
    text: "text-emerald-400"
  }
];

const WrapUpSection = () => {
  return (
    <div className={`w-full flex flex-col  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none  ${bodyFont.className}`}>
      
      {/* =========================================
          SECTION 1: THE PROCESS (TIMELINE)
      ========================================= */}
      <section className="relative w-full py-32 px-6 overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-24 relative z-10">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className={`text-4xl md:text-6xl font-black text-white mb-6 leading-tight ${titleFont.className}`}
           >
             The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-400">Blueprint</span>
           </motion.h2>
           <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
             How we turn your complex ideas into shipping products. Simple, transparent, and efficient.
           </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
           
           {/* Center Line */}
           <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-rose-500 to-emerald-500 opacity-20 rounded-full"></div>

           <div className="flex flex-col gap-12 md:gap-24">
              {steps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                     
                     {/* Text Side */}
                     <div className={`w-full md:w-1/2 pl-20 md:px-6 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                        <h3 className={`text-2xl font-bold text-white mb-2 ${titleFont.className}`}>{step.title}</h3>
                        <p className="text-neutral-400 leading-relaxed font-medium">{step.desc}</p>
                     </div>

                     {/* Icon Node (Absolute Center) */}
                     <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                        <div className={`w-16 h-16 rounded-full border-4 border-neutral-950 ${step.color} shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center z-10 relative group`}>
                           <step.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                           {/* Pulse Effect */}
                           <div className={`absolute inset-0 rounded-full ${step.color} animate-ping opacity-20`}></div>
                        </div>
                     </div>

                     {/* Empty Side for Balance */}
                     <div className="hidden md:block w-1/2"></div>

                  </motion.div>
                );
              })}
           </div>

        </div>
      </section>


      {/* =========================================
          SECTION 2: FINAL CTA (MAGNETIC)
      ========================================= */}
      <section className="relative w-full py-40 overflow-hidden">
         
         {/* Massive Glow Background */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse"></div>
         </div>

         <div className="container mx-auto px-6 relative z-10 text-center">
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
               <h2 className={`text-5xl md:text-8xl font-black text-white mb-8 leading-none tracking-tight ${titleFont.className}`}>
                  Let's Build the <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
                    Future.
                  </span>
               </h2>
               
               <p className="text-xl md:text-2xl text-neutral-300 font-bold mb-12 max-w-3xl mx-auto">
                  You have the vision. We have the firepower. Stop waiting and start shipping.
               </p>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

                  {/* Primary Button */}
            <Link href="#home" className="group hover: relative px-10 py-5 bg-white text-neutral-900 text-lg font-black rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all duration-300 flex items-center gap-3">
                     Start Project
                     <div className="bg-neutral-900 rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                        <ArrowRight className="w-4 h-4 text-white" />
                     </div>
                </Link>

                  {/* Secondary Button */}
                  <button className="px-10 py-5 bg-neutral-900 border border-neutral-800 text-white text-lg font-bold rounded-full hover:bg-neutral-800 hover:border-neutral-700 transition-all flex items-center gap-3">
                     <MessageSquare className="w-5 h-5 text-neutral-400" />
                     Book a Call
                  </button>
               </div>

               <p className="mt-8 text-neutral-500 text-sm font-semibold tracking-wide uppercase">
                  Limited slots available for {new Date().getFullYear()}
               </p>

            </motion.div>

         </div>
      </section>

    </div>
  );
};

export default WrapUpSection;