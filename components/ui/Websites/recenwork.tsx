"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, LayoutTemplate, MousePointer2 } from "lucide-react";
import { Titan_One, Nunito } from 'next/font/google';
import Image, { StaticImageData } from "next/image";

// --- PLACEHOLDER IMAGES ---
import image1 from "@/public/image1.png"
import image2 from "@/public/image2.png"
import image3 from "@/public/image3.png"
import image4 from "@/public/image4.png"
import image5 from "@/public/image5.png"
import image6 from "@/public/image6.png"
import image7 from "@/public/image7.png"

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

// --- DATA ---
const showcaseImages: StaticImageData[] = [
  image1,
  image2,
  image3,
  image4,
  image7,
  image5,
  image6,
].filter(Boolean) as StaticImageData[];

const ShowcaseSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- AUTOMATIC SLIDESHOW LOGIC ---
  useEffect(() => {
    // Changing every 1.5 seconds for a snappy "Figma preview" feel
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseImages.length);
    }, 1500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative w-full bg-neutral-950 py-32 overflow-hidden ${bodyFont.className}`}>
      
      {/* Background Animated Gradients - REDUCED GLOW */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:mx-[100px] lg:flex-row items-center lg:items-start justify-between gap-16">
          
          {/* --- LEFT: TEXT --- */}
          <div className="w-full  md:pt-[200px] lg:w-5/12 text-center lg:text-left">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
                <span className="inline-block px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full font-bold text-sm tracking-widest uppercase mb-6 border border-indigo-500/30">
                   <Sparkles className="w-4 h-4 inline mr-2" />
                   Design Portfolio
                </span>
                
                <h2 className={`text-5xl md:text-7xl font-black text-white mb-6 leading-tight ${titleFont.className}`}>
                   Pixel <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">
                     Perfection
                   </span>
                </h2>
                
                <p className="text-slate-400 text-lg md:text-xl font-medium mb-10 leading-relaxed">
                   From concept to code. We craft stunning, high-performance layouts that leave a lasting impression.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                   <button className="bg-white text-slate-900 font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform flex items-center gap-2">
                      View All Projects <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
             </motion.div>
          </div>


          {/* --- RIGHT: HORIZONTAL FIGMA FRAME (BLINKING) --- */}
          <div className="w-full lg:w-4/12 flex  justify-right ">
             
             {/* THE FRAME */}
             <div className="relative w-full aspect-[6/10] bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden group ring-4 ring-slate-800/50">
                
                {/* 1. Figma/Browser Toolbar */}
                <div className="h-10 bg-[#1e1e1e] flex items-center px-4 justify-between border-b border-white/10 z-30 relative">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                   </div>
                   
                   <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded text-[10px] text-slate-400 font-mono tracking-wide">
                      <LayoutTemplate className="w-3 h-3" /> 
                      FRAME: LANDING_PAGE_V{currentIndex + 1}
                   </div>

                   <div className="flex items-center gap-2 text-slate-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-bold">LIVE</span>
                   </div>
                </div>

                {/* 2. THE DROPPING IMAGE AREA */}
                <div className="relative w-full h-full bg-[#0f0f0f] overflow-hidden">
                   <AnimatePresence mode="popLayout">
                      <motion.div
                        key={currentIndex}
                        // ANIMATION: Drop Down ("Show Down")
                        initial={{ y: "-100%" }} 
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }} 
                        transition={{ 
                           duration: 0.6, 
                           ease: [0.22, 1, 0.36, 1] // Custom snappy bezier curve
                        }}
                        className="absolute inset-0 w-full h-full"
                      >
                         <Image 
                             alt="Figma Design Preview" 
                             src={showcaseImages[currentIndex] ?? image1} 
                             fill
                             className="object-cover object-top" // Ensures the 'header' of your design is always seen
                             priority
                         />
                         
                         {/* Flash/Shine overlay for that "Refresh" feel */}
                         <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>
                      </motion.div>
                   </AnimatePresence>

                   {/* Mock Cursor (Just for fun aesthetic) */}
                   <motion.div 
                      animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-10 right-10 z-40"
                   >
                      <MousePointer2 className="w-6 h-6 text-rose-500 fill-rose-500 drop-shadow-lg" />
                      <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded ml-4 font-bold">You</span>
                   </motion.div>
                </div>

             </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default ShowcaseSection;