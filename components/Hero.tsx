"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Titan_One, Nunito } from 'next/font/google';
import { EmailFormschemaType } from "@/lib/schema";
import { IEmaildetail } from "@/lib/types";
import { Loader2 } from "lucide-react"; 

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

export default function Hero({
  onHandleSubmit,
  defaultEmail,
  isLoading, // 1. Accept the isLoading prop here
}: {
  defaultEmail?: IEmaildetail;
  onHandleSubmit: (data: EmailFormschemaType) => void;
  isLoading: boolean; // 2. Define the type
}) {
  
  const form = useForm<EmailFormschemaType>({
    mode: "all",
    defaultValues: {
      email: defaultEmail?.email || "",
    },
  });

  const onSubmit = (data: EmailFormschemaType) => {
    onHandleSubmit(data);
  };

  useEffect(() => {
    if (form.getValues().email) {
      form.setValue("created_at", new Date().toISOString().slice(0, 16));
    }
  }, [form.watch("email")]);

  const headline = [
    { text: "Build", className: "text-white" },
    { text: "awesome", className: "text-white" },
    { text: "apps", className: "text-white" },
    { text: "with", className: "text-white" },
    { 
      text: "Scale Saas.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className={`min-h-screen w-full relative flex flex-col items-center justify-center antialiased px-4 bg-neutral-950 overflow-hidden ${bodyFont.className}`}>
      
      <div className="max-w-6xl w-full mx-auto relative z-20 pt-20">
        
        {/* --- MAIN TITLE --- */}
        <div className="w-full flex flex-col items-center justify-center rounded-md">
          <h1 className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center text-white relative z-20 ${titleFont.className}`}>
            Scale Saas
          </h1>
          
          <div className="w-full max-w-[40rem] h-10 relative mt-4">
            {/* Gradients */}
            <div className="absolute inset-x-[10%] sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-[80%] sm:w-3/4 blur-sm" />
            <div className="absolute inset-x-[10%] sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-[80%] sm:w-3/4" />
            <div className="absolute inset-x-[30%] sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-[40%] sm:w-1/4 blur-sm" />
            <div className="absolute inset-x-[30%] sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-[40%] sm:w-1/4" />
          </div>
        </div>

        {/* --- TYPEWRITER --- */}
        <TypewriterEffectSmooth className="justify-center mt-4" words={headline} />
        
        {/* --- DESCRIPTION WITH HIGHLIGHTS --- */}
        <div className="max-w-4xl mx-auto px-4 mt-8">
          <h2 className="text-neutral-300 text-center text-lg md:text-2xl leading-loose font-medium">
            &quot; We specialize in building intelligent,{" "}
            
            <PointerHighlight
              rectangleClassName="bg-indigo-600 border-indigo-500"
              pointerClassName="text-white h-3 w-3"
              containerClassName="inline-block mx-1"
            >
              <span className="relative px-2 z-10 font-bold text-white">scalable software</span>
            </PointerHighlight>
            
            {" "}solutions that leverage the power of artificial intelligence. From custom AI integrations to full-scale SaaS platforms, our team delivers cutting-edge technology that drives{" "}
            
            <PointerHighlight
              rectangleClassName="bg-emerald-600 border-emerald-500"
              pointerClassName="text-white h-3 w-3"
              containerClassName="inline-block mx-1"
            >
              <span className="relative px-2 z-10 font-bold text-white">business growth</span>
            </PointerHighlight>
            . &quot;
          </h2>
        </div>

        {/* --- EMAIL FORM --- */}
        <div className="flex justify-center items-center px-4 mt-12 mb-20">
          <div className="w-full max-w-2xl relative z-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="w-full p-1.5 border border-neutral-700 bg-neutral-900/50 backdrop-blur-sm rounded-full flex items-center gap-2 shadow-2xl">
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1 mb-0">
                        <FormControl>
                          <Input
                            disabled={isLoading} // Disable input while loading
                            placeholder="Enter your email address"
                            {...field}
                            className="flex-1 min-w-0 bg-transparent border-none text-white placeholder-neutral-500 px-6 py-4 text-base md:text-lg focus-visible:ring-0 focus-visible:ring-offset-0 font-medium"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="flex-shrink-0">
                    <HoverBorderGradient
                      containerClassName="rounded-full"
                      as="button"
                      // 3. Conditional Disabled Logic
                      // Note: We pass standard button props here, assuming HoverBorderGradient passes them down.
                      // If it doesn't, the visual cues inside will still work.
                      {...({ disabled: isLoading } as any)}
                      className={`flex justify-center items-center px-6 py-3 bg-neutral-950 text-white transition-opacity ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      <span className={`text-sm md:text-base font-bold ${bodyFont.className} flex items-center gap-2`}>
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          "Get Consultation"
                        )}
                      </span>
                    </HoverBorderGradient>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="text-center text-neutral-500 text-sm font-semibold tracking-wide uppercase relative z-10">
          Trusted by innovative companies to build their AI-powered solutions
        </div>

      </div>
      
      <BackgroundBeams />
    </div>
  );
}