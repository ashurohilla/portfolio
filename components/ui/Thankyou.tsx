"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MessageCircle, // WhatsApp
  Copy,
  Home
} from "lucide-react";
import { Titan_One, Nunito } from 'next/font/google';

// --- FONTS (Same as Admission Page) ---
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

export default function ThankYouPage() {
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Optional: Add toast trigger here
  };

  return (
    // changed bg-neutral-950 to bg-slate-50 (Light Theme)
    <div className={`relative w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 ${bodyFont.className}`}>
      
      {/* Decorative Background Blobs (Optional playfulness) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-violet-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>

      <div className="container max-w-4xl relative z-10">
        
        {/* --- MAIN SUCCESS CARD --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-4 border-white text-center mb-12"
        >
          {/* Success Icon with Bouncing Effect */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="inline-flex items-center justify-center mb-6"
          >
             <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner">
                <CheckCircle className="w-12 h-12 text-emerald-500" />
             </div>
          </motion.div>

          <h1 className={`text-4xl md:text-6xl text-slate-800 mb-4 ${titleFont.className}`}>
             Enquiry <span className="text-violet-500">Sent!</span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Thanks for reaching out to <strong>Little Learners Academy</strong>. <br className="hidden md:block"/>
            We have received your details and will contact you shortly.
          </p>
        </motion.div>


        {/* --- DIRECT CONTACT GRID --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
           
           {/* 1. WhatsApp Card (Green Theme) */}
           <a 
             href="https://wa.me/919588368052" 
             target="_blank" 
             rel="noopener noreferrer"
             className="group bg-white p-6 rounded-3xl shadow-lg border-b-8 border-emerald-400 hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center"
           >
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                 <MessageCircle className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className={`text-xl text-slate-800 mb-1 ${titleFont.className}`}>WhatsApp</h3>
              <p className="text-slate-500 text-sm mb-4 font-bold">Fastest Response</p>
              <span className="mt-auto inline-block bg-emerald-50 text-emerald-600 font-bold px-4 py-2 rounded-full text-sm">
                 Chat Now
              </span>
           </a>

           {/* 2. Phone Card (Blue Theme) */}
           <div className="group bg-white p-6 rounded-3xl shadow-lg border-b-8 border-sky-400 hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-4 group-hover:-rotate-12 transition-transform">
                 <Phone className="w-7 h-7 text-sky-600" />
              </div>
              <h3 className={`text-xl text-slate-800 mb-1 ${titleFont.className}`}>Call Us</h3>
              <p className="text-slate-500 text-sm mb-4 font-bold">Mon-Sat, 9am - 6pm</p>
              
              <button 
                onClick={() => copyToClipboard("+91 95883 68052")}
                className="mt-auto bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold py-2 px-4 rounded-full text-sm flex items-center gap-2 transition-colors"
              >
                 +91 95883 68052 <Copy className="w-3 h-3" />
              </button>
           </div>

           {/* 3. Email Card (Violet Theme) */}
           <div className="group bg-white p-6 rounded-3xl shadow-lg border-b-8 border-violet-400 hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                 <Mail className="w-7 h-7 text-violet-600" />
              </div>
              <h3 className={`text-xl text-slate-800 mb-1 ${titleFont.className}`}>Email Us</h3>
              <p className="text-slate-500 text-sm mb-4 font-bold">For Detailed Queries</p>
              
              <button 
                onClick={() => copyToClipboard("admissions@school.com")}
                className="mt-auto bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold py-2 px-4 rounded-full text-sm flex items-center gap-2 transition-colors"
              >
                 Copy Email <Copy className="w-3 h-3" />
              </button>
           </div>

        </motion.div>


        {/* --- BACK BUTTON --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
           <Link href="/">
              <button className="flex items-center gap-3 bg-white text-slate-600 hover:text-violet-600 font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                 <ArrowLeft className="w-5 h-5" />
                 <span>Back to Home</span>
              </button>
           </Link>
        </motion.div>

      </div>
    </div>
  );
}