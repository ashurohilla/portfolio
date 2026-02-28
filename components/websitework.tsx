"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Layers, 
} from "lucide-react";
import { Titan_One, Nunito } from 'next/font/google';
import Link from "next/link";
import Image from "next/image";

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

// --- PROJECTS DATA ---
// REPLACE THESE imageSrc URLs with your actual project screenshots.
const projects = [
  {
    title: "Preschool website",
    category: "Education Platform",
    description: "A Preschool website built for our client",
    tags: ["Next.js", "Python", "Tremor"],
    link: "https://www.bestpreschoolanddaycare.com/", 
    // Placeholder image representing a dashboard
    imageSrc: "https://miajmerfkgayimdhfnpy.supabase.co/storage/v1/object/public/images/uploads/rNnLkCPa11kYFp66LXLaE_preschool.png",
    alt: "SaaS Dashboard Screenshot",
    gradient: "from-rose-500 to-orange-500",
    colSpan: "md:col-span-2", // Wide Featured Card
  },
  {
    title: "Preparely",
    category: "Education and Learning",
    description: "Learning and news portal for students",
    tags: ["Next js ", "supabase"],
    link: "https://sarkariresultindia.vercel.app/",
    imageSrc: "https://miajmerfkgayimdhfnpy.supabase.co/storage/v1/object/public/images/uploads/preparely.png",
    alt: "Neon Commerce Storefront",
    gradient: "from-blue-500 to-cyan-500",
    colSpan: "md:col-span-1",
  },
  {
    title: "Little dreamers at Cambridge",
    category: "Mobile PWA",
    description: "A School website for a client with a new ui design style",
    tags: ["PWA", "Supabase"],
    link: "https://www.littledreamersatcambridge.com/",
    // Placeholder mobile app image
    imageSrc: "https://miajmerfkgayimdhfnpy.supabase.co/storage/v1/object/public/images/uploads/dreamers.png",
    alt: "Little dreamers at cambridge",
    gradient: "from-emerald-500 to-teal-500",
    colSpan: "md:col-span-1",
  },
  {
    title: "DevFlow Systems",
    category: "Developer Tool",
    description: "Automated CI/CD pipeline visualizer for large scale teams and multiple developer tools.",
    tags: ["DevOps", "Go", "React"],
    link: "https://scalesaas.ashishrohilla.co.in/tooling",
    // Placeholder tech/code image
    imageSrc: "https://miajmerfkgayimdhfnpy.supabase.co/storage/v1/object/public/images/uploads/tools.png",
    alt: "DevFlow Codebase",
    gradient: "from-purple-500 to-indigo-500",
    colSpan: "md:col-span-2", // Wide Featured Card
  },
  {
    title: "Mega diagnostic",
    category: "Education Platform",
    description: "A Health care platform build for a hospital to interact with clients and book appintments",
    tags: ["Next.js", "Python", "Tremor"],
    link: "https://www.megadiagnosticsandinterventions.com/", 
    // Placeholder image representing a dashboard
    imageSrc: "https://miajmerfkgayimdhfnpy.supabase.co/storage/v1/object/public/images/uploads/mega.png",
    alt: "Mega diagnostic center",
    gradient: "from-rose-500 to-orange-500",
    colSpan: "md:col-span-2", // Wide Featured Card
  },
  {
    title: "Devops Learning platform",
    category: "Education and Learning",
    description: "Devops learning platform for devops engineers",
    tags: ["Next js ", "supabase"],
    link: "https://www.ashishrohilla.co.in/courses",
    // Placeholder image representing e-commerce/fashion
    imageSrc: "https://miajmerfkgayimdhfnpy.supabase.co/storage/v1/object/public/images/uploads/courses.png",
    alt: "devosp learning",
    gradient: "from-blue-500 to-cyan-500",
    colSpan: "md:col-span-1",
  },
];

const WorkShowcaseWithImages = () => {
  return (
    <section className={`relative w-full bg-neutral-950 py-32 overflow-hidden ${bodyFont.className}`}>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-neutral-950 opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="max-w-2xl"
           >
              <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-emerald-300 text-sm font-bold tracking-widest uppercase mb-6">
                 <Layers className="w-4 h-4 inline mr-2 -mt-1" />
                 Selected Projects
              </span>
              
              <h2 className={`text-4xl md:text-6xl font-black text-white mb-6 leading-tight ${titleFont.className}`}>
                 Stuff We've <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                   Shipped Recently
                 </span>
              </h2>
           </motion.div>

           <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-0"
           >
              <p className="text-neutral-400 text-lg font-medium max-w-sm text-right md:text-left">
                We don't just write code; we build digital assets that drive real business growth.
              </p>
           </motion.div>
        </div>

        {/* --- PROJECTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-8xl mx-auto">
           {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                // Added 'group' here specifically for hover states
                className={`${project.colSpan} group relative min-h-[500px] cursor-pointer`}
              >
                 <Link href={project.link} target="_blank" className="block h-full w-full">
                    <div className="h-full w-full relative overflow-hidden rounded-3xl border border-white/10 transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-neutral-900/50">
                       
                       {/* --- BACKGROUND IMAGE & OVERLAYS --- */}
                       <div className="absolute inset-0 h-full w-full z-0">
                          {/* 1. The Image */}
                          <Image
                             src={project.imageSrc}
                             alt={project.alt}
                             fill
                             // 'object-cover' prevents distortion. 'group-hover:scale-105' adds subtle zoom.
                             className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {/* 2. Dark Gradient Overlay for Text Readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20 transition-opacity duration-500 group-hover:via-neutral-950/80"></div>
                          
                          {/* 3. Color Blur Effect (Subtle top right color pop) */}
                          <div className={`absolute -right-10 -top-10 w-72 h-72 bg-gradient-to-br ${project.gradient} blur-[100px] opacity-30 group-hover:opacity-50 transition-all duration-500`}></div>
                       </div>


                       {/* --- CONTENT --- */}
                       <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                          
                          {/* Hover Action Button */}
                          <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-white/20">
                             <ArrowUpRight className="text-white w-6 h-6" />
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                             {project.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-neutral-200 uppercase tracking-wider">
                                   {tag}
                                </span>
                             ))}
                          </div>

                          <h3 className={`text-3xl font-bold text-white mb-2 drop-shadow-lg ${titleFont.className}`}>
                             {project.title}
                          </h3>
                          
                          <p className="text-neutral-300 font-medium line-clamp-2 mb-4 drop-shadow-md">
                             {project.description}
                          </p>

                          <div className="flex items-center text-sm font-bold text-white/70 group-hover:text-white transition-colors">
                             <span className="uppercase tracking-widest">{project.category}</span>
                             <div className={`h-px flex-1 bg-white/30 ml-4 group-hover:bg-white/60 transition-colors`}></div>
                          </div>

                       </div>
                    </div>
                 </Link>
              </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default WorkShowcaseWithImages;