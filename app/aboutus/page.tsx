"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import founder from "@/public/founder.jpg"
import { 
  Code2, 
  Cpu, 
  Rocket, 
  Zap, 
  Github, 
  Linkedin, 
  Twitter, 
  Terminal,
  Laptop
} from "lucide-react";
import { FullNavbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

import { Titan_One, Nunito } from 'next/font/google';

// --- PLACEHOLDER IMAGE FOR FOUNDER ---
// Replace this with your actual image path

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

const AboutPage = () => {
  return (
 <div>
   <FullNavbar/>
      <div className={`w-full min-h-screen bg-neutral-950 text-white ${bodyFont.className}`}>
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-neutral-950 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-neutral-950 to-transparent"></div>
      </div>

      {/* =========================================
          HERO: WHO WE ARE
      ========================================= */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="container mx-auto text-center relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
              <span className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6">
                 <Terminal className="w-4 h-4 inline mr-2 -mt-1" />
                 Hello World
              </span>
              
              <h1 className={`text-5xl md:text-7xl font-black mb-8 leading-tight ${titleFont.className}`}>
                 We Are <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">
                   SaaS Makers.
                 </span>
              </h1>
              
              <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                 We aren't just another corporate agency billing you by the hour. <br/>
                 We are a collective of <strong>ambitious engineering graduates</strong> on a mission to democratize technology. We build affordable, high-impact software that actually helps businesses grow.
              </p>
           </motion.div>
        </div>
      </section>


      {/* =========================================
          SECTION 2: THE "NOT AN AGENCY" PHILOSOPHY
      ========================================= */}
      <section className="py-20 px-6 relative z-10">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-neutral-900/50 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-sm">
                
                <div>
                   <h2 className={`text-3xl md:text-5xl font-black mb-6 ${titleFont.className}`}>
                      Builders, <br/>
                      <span className="text-rose-500">Not Billers.</span>
                   </h2>
                   <p className="text-neutral-300 text-lg mb-6 leading-relaxed">
                      Most agencies want to extend timelines to increase costs. <strong>We think like founders.</strong>
                   </p>
                   <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                         <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                            <Zap className="w-4 h-4 text-emerald-400" />
                         </div>
                         <span className="text-neutral-400"><strong className="text-white">Product Mindset:</strong> We care about user experience and scalability, not just code.</span>
                      </li>
                      <li className="flex items-start gap-3">
                         <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 mt-1">
                            <Cpu className="w-4 h-4 text-purple-400" />
                         </div>
                         <span className="text-neutral-400"><strong className="text-white">Affordable Tech:</strong> Being recent graduates, we stay lean and pass the savings to you.</span>
                      </li>
                      <li className="flex items-start gap-3">
                         <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                            <Rocket className="w-4 h-4 text-blue-400" />
                         </div>
                         <span className="text-neutral-400"><strong className="text-white">Innovation First:</strong> We use the latest stacks (Next.js, AI) because we love them, not because we have to.</span>
                      </li>
                   </ul>
                </div>

                <div className="relative h-full min-h-[300px] flex items-center justify-center">
                   {/* Abstract Representation of Code/Building */}
                   <div className="relative w-full max-w-sm aspect-square">
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
                      <div className="relative bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                         <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                         </div>
                         <div className="space-y-2 font-mono text-xs md:text-sm">
                            <div className="text-purple-400">const <span className="text-yellow-400">vision</span> = <span className="text-green-400">"Democratize Tech"</span>;</div>
                            <div className="text-blue-400">while <span className="text-white">(alive)</span> {'{'}</div>
                            <div className="pl-4 text-white">buildCoolStuff();</div>
                            <div className="pl-4 text-white">solveRealProblems();</div>
                            <div className="text-blue-400">{'}'}</div>
                         </div>
                      </div>
                   </div>
                </div>

            </div>
         </div>
      </section>


      {/* =========================================
          SECTION 3: FOUNDER SPOTLIGHT
      ========================================= */}
      <section className="py-20 px-6 relative z-10">
         <div className="container mx-auto">
            
            <div className="text-center mb-16">
               <h2 className={`text-4xl md:text-6xl font-black mb-4 ${titleFont.className}`}>The <span className="text-indigo-500">Architect</span></h2>
               <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
               
               {/* Founder Image */}
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="w-full md:w-5/12 flex justify-center"
               >
                  <div className="relative w-72 h-72 md:w-96 md:h-96">
                     <div className="absolute inset-0 bg-indigo-500 rounded-[2rem] rotate-6 opacity-20 blur-lg"></div>
                     <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-neutral-800 shadow-2xl bg-neutral-900">
                        {/* Replace src with your actual image */}
                        <Image src={founder} alt="Ashish Rohilla" fill className="object-cover" />
                        
                        {/* Placeholder if image not available */}
                        <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-800 text-neutral-600">
                           <Code2 className="w-16 h-16 mb-2" />
                           <span className="font-bold">Founder Image</span>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Founder Bio */}
               <motion.div 
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="w-full md:w-7/12 text-center md:text-left"
               >
                  <h3 className={`text-3xl md:text-5xl font-black text-white mb-2 ${titleFont.className}`}>Ashish Rohilla</h3>
                  <p className="text-indigo-400 font-bold text-lg mb-6 uppercase tracking-widest">Tech Enthusiast & Lead Builder</p>
                  
                  <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                     Ashish isn't just a developer; he's a <strong>problem solver obsessed with efficiency</strong>. With a deep understanding of the entire tech stack—from product architecture to pixel-perfect UI—he leads the team with a "hands-on" approach.
                  </p>
                  <p className="text-neutral-300 text-lg leading-relaxed mb-8">
                     <span className="italic">"I believe technology shouldn't be complicated or expensive. If there is a problem, there is a code to fix it. I don't just manage projects; I build them."</span>
                  </p>

                  <div className="flex justify-center md:justify-start gap-4">
                     <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                        <Github className="w-5 h-5" />
                     </a>
                     <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all">
                        <Linkedin className="w-5 h-5" />
                     </a>
                     <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all">
                        <Twitter className="w-5 h-5" />
                     </a>
                     <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all">
                        <Laptop className="w-5 h-5" />
                     </a>
                  </div>
               </motion.div>

            </div>
         </div>
      </section>

      {/* =========================================
          SECTION 4: CTA
      ========================================= */}
      <section className="py-20 text-center relative z-10">
         <h2 className={`text-3xl md:text-5xl font-black mb-8 ${titleFont.className}`}>
            Work with builders who <br/> <span className="text-indigo-500">actually care.</span>
         </h2>
        <div className="max-w-2xl mx-auto">
            <p className="text-neutral-300 text-lg mb-6">
                Want to discuss website development? I'm available to chat about your project, timelines, and goals — let's build something great together.
            </p>

            <a
                href="https://wa.me/919588368052"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start WhatsApp chat for website development"
            >
                <button className="px-10 py-4 bg-white text-neutral-900 rounded-full font-black text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
                    Start Your Project
                </button>
            </a>
        </div>
      </section>

    </div>
    <Footer/>
 </div>
  );
};

export default AboutPage;