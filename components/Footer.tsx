"use client";
import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full">
      <BackgroundBeamsWithCollision className="w-full flex-col justify-end items-center min-h-[390px] bg-neutral-950">
        
        {/* Main Content Container */}
        <div className="w-full max-w-7xl mx-auto px-6 py-4   relative z-20">
          
          {/* Top Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            {/* 1. Brand Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Scale Saas
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                We build intelligent, scalable software solutions that leverage the power of AI to drive business growth and innovation.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                  <a 
                    key={idx} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* 2. Services */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Services</h3>
              <ul className="space-y-4">
                {['Web Development', 'Mobile Apps', 'Cloud Solutions', 'AI Integration', 'UI/UX Design'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-neutral-400 hover:text-blue-400 text-sm flex items-center gap-2 group transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-blue-400 transition-colors"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Company</h3>
              <ul className="space-y-4">
                {['About Us', 'Our Team', 'Careers', 'Blog',].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-neutral-400 hover:text-emerald-400 text-sm flex items-center gap-2 group transition-colors">
                      <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {item}
                    </Link>
                    

                  </li>
                ))}
                 <Link href="/privacy" className="text-neutral-400 py-2 hover:text-emerald-400 text-sm flex items-center gap-2 group transition-colors">
                      <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      Privacy policy
                    </Link>
              </ul>
            </div>

            {/* 4. Contact Info (Updated) */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-3 text-neutral-400 group">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm leading-relaxed group-hover:text-neutral-200 transition-colors">
                    Badshahpur, Sector 69,<br />
                    Gurugram, Haryana
                  </span>
                </li>
                <li className="flex items-center gap-3 text-neutral-400 group">
                  <Phone className="w-5 h-5 text-emerald-500 shrink-0 group-hover:text-emerald-400 transition-colors" />
                  <a href="tel:+919588368052" className="text-sm group-hover:text-neutral-200 transition-colors">
                    +91 95883 68052
                  </a>
                </li>
                <li className="flex items-center gap-3 text-neutral-400 group">
                  <Mail className="w-5 h-5 text-purple-500 shrink-0 group-hover:text-purple-400 transition-colors" />
                  <a href="mailto:Scalesaas@gmail.com" className="text-sm group-hover:text-neutral-200 transition-colors">
                    Scalesaas@gmail.com
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm text-center md:text-left">
              © 2025 Scale Saas. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm font-medium text-neutral-500">
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>

        </div>
      </BackgroundBeamsWithCollision>
    </footer>
  );
}