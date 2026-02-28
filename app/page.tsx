"use client";
import React, { useState } from "react"; // 1. Import useState
import Hero from "@/components/Hero";
import Body from "@/components/Body";
import MethodologySection from "@/components/MainSection";
import { useRouter } from "next/navigation";
import { defaultEmail } from "@/lib/data";
import { createEmail } from "@/lib/actions/blog";
import { EmailFormschemaType } from "@/lib/schema";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { toast } from "sonner";
import RecentWork from "@/components/ui/Websites/recenwork";
import ServicesPage from "@/components/service";
import Showcasework from "@/components/websitework";

import WrapUpSection from "@/components/Wrapupsection";
import { FullNavbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function Page() {
  const router = useRouter();
  
  // 2. Add loading state
  const [isLoading, setIsLoading] = useState(false);

  // Regular expression for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onHandleSubmit = async (data: EmailFormschemaType) => {
    // 3. Start loading
    setIsLoading(true);

    // Validate email format before sending data
    if (!emailRegex.test(data.email)) {
      toast("email verification failed", {
        description: "Please enter a valid email address.",
        action: {
          label: "Try Again",
          onClick: () => {
            router.push("/"); 
          },
        },
      });
      setIsLoading(false); // Stop loading if validation fails
      return; 
    }

    try {
      const result = await createEmail(data);

      console.log("Email submission result:", result);
      if (!result) {
        throw new Error("No response received from server.");
      }

      const parsedResult = result as PostgrestSingleResponse<null>;
      console.log(parsedResult);
      const { error } = parsedResult;

      if (error?.message) {
        toast("Error submitting email", {
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });
        setIsLoading(false); // Stop loading on API error
      } else {
        toast("successfully added the email 🎉", {
          description: data.email,
        });
        router.push("/thankyou");
        // Note: We leave isLoading as true here to prevent double-clicks 
        // while the page redirects.
      }
    } catch (error) {
      console.error("Error occurred while handling submit:", error);
      toast("Error submitting email", {
        description:
          "An error occurred while submitting your email. Please try again.",
      });
      setIsLoading(false); // Stop loading on catch error
    }
  };

  return (
    <div className="bg-neutral-950">
      <FullNavbar />

      <div className="mt-8 md:mt-0">
        {/* 4. Pass the isLoading prop to Hero */}
        <Hero 
          onHandleSubmit={onHandleSubmit} 
          defaultEmail={defaultEmail} 
          isLoading={isLoading} 
        />
      </div>

      <RecentWork />
      <Showcasework/>

      <div className="px-2 mt-[30px]">
        <MethodologySection />
      </div>

      <Body />
      <ServicesPage />
      <WrapUpSection />

      <div className=""></div>
      <Footer />
    </div>
  );
}