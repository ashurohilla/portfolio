"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Titan_One, Nunito } from 'next/font/google';
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

// --- MOCK REVIEWS ---
const testimonials = [
  {
    name: "Alex Rivera",
    role: "CTO @ TechFlow",
    content: "Scale Saas didn't just build our app; they engineered our growth. The AI integration alone saved us 40 hours a week.",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    name: "Sarah Jenkins",
    role: "Founder @ Bloom",
    content: "I was skeptical about agencies, but their design team blew me away. The blinking showcase feature increased our conversions by 200%.",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    name: "Michael Chen",
    role: "Product Lead",
    content: "Clean code, fast delivery, and actual communication. It's rare to find a team that cares about the product as much as the founder does.",
    image: "https://i.pravatar.cc/150?u=a04258114e29026302d",
  },
  {
    name: "Jessica Wu",
    role: "Marketing VP",
    content: "The landing page performance is insane. We hit a 99/100 Google PageSpeed score. Highly recommended for high-performance sites.",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    name: "David Smith",
    role: "CEO @ StartUp",
    content: "From Figma to live deployment in 2 weeks. These guys are wizards. The dark mode implementation is flawless.",
    image: "https://i.pravatar.cc/150?u=a04258a2462d82673ca",
  },
];

const TestimonialsSection = () => {
  return (
    <section className={`relative w-full bg-neutral-950 py-24 overflow-hidden ${bodyFont.className}`}>
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 mb-16 text-center">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
            <h2 className={`text-4xl md:text-6xl font-black text-white mb-6 leading-tight ${titleFont.className}`}>
               Trusted by <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                 Market Leaders
               </span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
               Don't just take our word for it. Here is what founders, CTOs, and product managers are saying about working with Scale Saas.
            </p>
         </motion.div>
      </div>

      {/* --- INFINITE MARQUEE --- */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade Gradient */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-neutral-950 to-transparent z-20"></div>
        {/* Right Fade Gradient */}
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-neutral-950 to-transparent z-20"></div>

        {/* Moving Container */}
        <motion.div 
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 40, // Adjust speed (higher = slower)
            repeat: Infinity 
          }}
        >
          {/* We double the array to create a seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div 
              key={index}
              className="relative w-[350px] md:w-[450px] bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex flex-col gap-4 group hover:border-indigo-500/50 transition-colors duration-300"
            >
               {/* Quote Icon */}
               <Quote className="w-8 h-8 text-indigo-500/30 absolute top-6 right-6" />

               {/* Stars */}
               <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
               </div>

               {/* Content */}
               <p className="text-neutral-300 text-base leading-relaxed relative z-10">
                 "{testimonial.content}"
               </p>

               {/* User Info */}
               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                     <Image 
                       src={testimonial.image} 
                       alt={testimonial.name} 
                       width={40} 
                       height={40} 
                       className="object-cover"
                     />
                  </div>
                  <div>
                     <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                     <p className="text-indigo-400 text-xs font-semibold">{testimonial.role}</p>
                  </div>
               </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- STATS SECTION --- */}
      <div className="container mx-auto px-6 mt-24">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
            {[
              { label: "Projects Shipped", value: "20+" },
              { label: "Happy Clients", value: "15+" },
              { label: "Years Experience", value: "3+" },
              { label: "Revenue Generated", value: "$1M+" },
            ].map((stat, idx) => (
               <div key={idx} className="text-center">
                  <h3 className={`text-3xl md:text-4xl font-black text-white mb-2 ${titleFont.className}`}>
                    {stat.value}
                  </h3>
                  <p className="text-neutral-500 text-sm uppercase tracking-widest font-bold">
                    {stat.label}
                  </p>
               </div>
            ))}
         </div>
      </div>

    </section>
  );
};

export default TestimonialsSection;