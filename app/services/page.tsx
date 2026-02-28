"use client";

import React from "react";
import { motion } from "framer-motion";

import { 
  Check, 
  X, 
  Zap, 
  Database, 
  Layout, 
  Code2, 
  Cpu, 
  ArrowRight,
  Sparkles,
  Bot,
  Lightbulb,
  Workflow
} from "lucide-react";
import { Titan_One, Nunito } from 'next/font/google';
import { FullNavbar } from "@/components/Navbar/Navbar";
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

// --- SECTION 1: WEB DEVELOPMENT DATA ---
const webPlans = [
  {
    id: "starter",
    title: "Single Page",
    subtitle: "Perfect for portfolios & landing pages.",
    price: "₹6,000",
    period: "/one-time",
    icon: Layout,
    color: "blue",
    features: [
      "Modern Single Page Design",
      "Interactive Navbar (Scroll Sections)",
      "1 Contact Form (Database Linked)",
      "Mobile Responsive (Mobile First)",
      "Fast Loading Speed",
      "Basic SEO Setup",
      "Hosting Setup Support"
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    id: "growth",
    title: "Multi Page",
    subtitle: "For businesses needing a complete presence.",
    price: "₹14,000",
    period: "/one-time",
    icon: Database, 
    color: "rose",
    features: [
      "Up to 5-7 Unique Pages",
      "Dynamic Routing",
      "Multiple Forms + Database Storage",
      "Advanced Animations (Framer Motion)",
      "Google Maps Integration",
      "Social Media Integration",
      "WhatsApp Chat Button",
      "1 Month Free Support"
    ],
    buttonText: "Choose Growth",
    popular: true 
  },
  {
    id: "enterprise",
    title: "Custom Dev",
    subtitle: "SaaS, Dashboards & Complex Logic.",
    price: "Custom",
    period: "Quote",
    icon: Cpu,
    color: "amber",
    features: [
      "Full Product Dashboards",
      "User Authentication (Login/Signup)",
      "CMS & Blog Architecture",
      "Software & API Integrations",
      "Payment Gateway (Stripe/Razorpay)",
      "Admin Panels",
      "Database Design (Postgres/Mongo)",
      "Priority 24/7 Support"
    ],
    buttonText: "Let's Talk",
    popular: false
  }
];

// --- SECTION 2: SPECIALIZED SERVICES DATA ---
const specializedServices = [
  {
    id: "consulting",
    title: "Tech Consultancy",
    subtitle: "Expert advice to clear your doubts.",
    price: "₹1,000",
    period: "/session",
    icon: Lightbulb,
    color: "yellow",
    features: [
      "1 Hour Dedicated Call",
      "Tech Stack Selection Advice",
      "Code Review & Audit",
      "Hosting & Domain Guidance",
      "Cost Optimization Strategy",
      "Roadmap Planning"
    ],
    buttonText: "Book Call"
  },
  {
    id: "automation",
    title: "AI & Automation",
    subtitle: "Chatbots & N8N Workflows.",
    price: "Custom",
    period: "Quote",
    icon: Bot,
    color: "emerald",
    features: [
      "Custom AI Chatbots (OpenAI/Claude)",
      "Lead Generation Automation",
      "N8N / Zapier Workflow Setup",
      "CRM Integrations (HubSpot/Salesforce)",
      "Automated Email Sequences",
      "WhatsApp Business API Setup"
    ],
    buttonText: "Automate Now"
  }
];

const PricingPage = () => {
  return (
  <div>
    <FullNavbar/>
      <div className={`w-full md:mt-6 min-h-screen bg-neutral-950 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:32px_32px] ${bodyFont.className}`}>
      
      {/* =========================================
          HEADER SECTION
      ========================================= */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="container mx-auto relative z-10 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
              <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-indigo-300 text-sm font-bold tracking-widest uppercase mb-6">
                 <Sparkles className="w-4 h-4 inline mr-2 -mt-1" />
                 Transparent Pricing
              </span>
              
              <h1 className={`text-5xl md:text-7xl font-black text-white mb-6 leading-tight ${titleFont.className}`}>
                 Choose Your <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400">
                   Power Level
                 </span>
              </h1>
              
              <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                 From simple landing pages to complex AI automation. We deliver pixel-perfect results at every scale.
              </p>
           </motion.div>
        </div>
      </section>


      {/* =========================================
          SECTION 1: WEB DEVELOPMENT GRID
      ========================================= */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
           
           <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-white/50 uppercase tracking-widest font-bold text-sm">Website Development</span>
              <div className="h-px bg-white/10 flex-1"></div>
           </div>

           {/* Grid with auto-equal height */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              
              {webPlans.map((plan, index) => {
                const isPopular = plan.popular;
                const borderColor = isPopular ? 'border-rose-500/50' : 'border-white/10';
                const glowColor = isPopular ? 'bg-rose-500/20' : 'bg-blue-500/5';
                const btnColor = isPopular 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20' 
                  : 'bg-white text-neutral-900 hover:bg-neutral-200';

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      relative flex flex-col p-8 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-300 group h-full
                      ${borderColor} ${isPopular ? 'bg-neutral-900/80 scale-105 shadow-2xl z-10' : 'bg-neutral-900/40 hover:border-white/20'}
                    `}
                  >
                     {/* Popular Badge */}
                     {isPopular && (
                       <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                         Most Popular
                       </div>
                     )}

                     {/* Background Glow */}
                     <div className={`absolute inset-0 rounded-[2.5rem] ${glowColor} blur-3xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                     {/* Header */}
                     <div className="mb-8">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isPopular ? 'bg-rose-500/20 text-rose-400' : 'bg-white/5 text-neutral-400'}`}>
                           <plan.icon className="w-8 h-8" />
                        </div>
                        <h3 className={`text-2xl font-bold text-white mb-2 ${titleFont.className}`}>{plan.title}</h3>
                        <p className="text-neutral-400 text-sm font-medium">{plan.subtitle}</p>
                     </div>

                     {/* Price */}
                     <div className="mb-8 flex items-baseline gap-1">
                        <span className={`text-4xl font-black ${isPopular ? 'text-white' : 'text-neutral-200'}`}>
                          {plan.price}
                        </span>
                        <span className="text-neutral-500 font-bold text-sm">
                          {plan.period}
                        </span>
                     </div>

                     {/* Features - Using flex-1 to push button down */}
                     <div className="flex-1 space-y-4 mb-10">
                        {plan.features.map((feature, i) => (
                           <div key={i} className="flex items-start gap-3">
                              <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isPopular ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white'}`}>
                                 <Check className="w-3 h-3" />
                              </div>
                              <span className="text-neutral-300 text-sm font-medium">{feature}</span>
                           </div>
                        ))}
                     </div>

                     {/* Button */}
                     <a   href="https://wa.me/919588368052" 
               target="_blank" 
               rel="noopener noreferrer">

                     <button className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${btnColor}`}>
                        {plan.buttonText}
                        {isPopular ? <Zap className="w-4 h-4 fill-white" /> : <ArrowRight className="w-4 h-4" />}
                     </button>
               </a>

                  </motion.div>
                );
              })}

           </div>
        </div>
      </section>


      {/* =========================================
          SECTION 2: SPECIALIZED SERVICES
      ========================================= */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-5xl">
           
           <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-indigo-400 uppercase tracking-widest font-bold text-sm">Specialized Add-ons</span>
              <div className="h-px bg-white/10 flex-1"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {specializedServices.map((service, index) => {
                 // Dynamic styling for specialized cards
                 const isConsulting = service.id === 'consulting';
                 const accentColor = isConsulting ? 'text-yellow-400' : 'text-emerald-400';
                 const borderHover = isConsulting ? 'group-hover:border-yellow-500/50' : 'group-hover:border-emerald-500/50';
                 const glow = isConsulting ? 'bg-yellow-500/10' : 'bg-emerald-500/10';

                 return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className={`
                        relative flex flex-col p-8 rounded-[2.5rem] border border-white/10 bg-neutral-900/40 backdrop-blur-xl 
                        transition-all duration-300 group h-full hover:bg-neutral-900/60 ${borderHover}
                      `}
                    >
                       <div className={`absolute inset-0 rounded-[2.5rem] ${glow} blur-3xl -z-10 opacity-30 group-hover:opacity-60 transition-opacity`}></div>

                       <div className="flex items-center justify-between mb-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 ${accentColor}`}>
                             <service.icon className="w-8 h-8" />
                          </div>
                          <div className="text-right">
                             <span className={`block text-3xl font-black text-white`}>{service.price}</span>
                             <span className="text-neutral-500 text-xs font-bold uppercase tracking-wide">{service.period}</span>
                          </div>
                       </div>

                       <h3 className={`text-2xl font-bold text-white mb-2 ${titleFont.className}`}>{service.title}</h3>
                       <p className="text-neutral-400 text-sm font-medium mb-8">{service.subtitle}</p>

                       <div className="flex-1 space-y-3 mb-8">
                          {service.features.map((feature, i) => (
                             <div key={i} className="flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full ${isConsulting ? 'bg-yellow-500' : 'bg-emerald-500'}`}></div>
                                <span className="text-neutral-300 text-sm font-medium">{feature}</span>
                             </div>
                          ))}
                       </div>

                       <a   href="https://wa.me/919588368052" 
               target="_blank" 
               rel="noopener noreferrer">

                       <button className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95`}>
                          {service.buttonText}
                          {service.id === 'automation' ? <Workflow className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                       </button>
                       </a>
                    </motion.div>
                 )
              })}

           </div>
        </div>
      </section>

      {/* =========================================
          FAQ / INFO
      ========================================= */}
      <section className="pb-20 text-center px-6">
         <p className="text-neutral-500 text-sm font-medium">
            Prices are subject to change based on project complexity. <br/>
            <a   href="https://wa.me/919588368052" 
               target="_blank" 
               rel="noopener noreferrer"  className="text-white hover:text-indigo-400 underline decoration-indigo-500/50 underline-offset-4 transition-colors">Contact us</a> for a tailored quote.
         </p>
      </section>

    </div>
    <Footer/>
  </div>
  );
};

export default PricingPage;