import React from 'react'
import { FullNavbar } from '@/components/Navbar/Navbar'
import { BackgroundBeams } from "@/components/ui/background-beams"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import Footer from "@/components/Footer"

function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information that you provide directly to us, including when you fill out a contact form, subscribe to a maintenance plan, or communicate with us regarding a project. This may include your name, email address, phone number, and business details.",
      bullets: [
        "Personal Identification Information",
        "Business and Project Requirements",
        "Communication History",
        "Technical Usage Data (via Analytics)"
      ]
    },
    {
      title: "2. How We Use Your Information",
      content: "The information we collect is used solely to provide, maintain, and improve our development and consulting services. We do not sell your personal data to third parties.",
      bullets: [
        "To deliver custom web and mobile solutions",
        "To process payments for subscribed maintenance plans",
        "To send project updates and technical support notices",
        "To improve our website performance and user experience"
      ]
    },
    {
      title: "3. Data Security",
      content: "We implement industry-standard security measures to protect your information. Our deployment workflows on AWS and Vercel utilize encrypted connections and secure authentication protocols to ensure your data remains confidential.",
    },
    {
      title: "4. Cookies and Tracking",
      content: "Our website uses cookies to enhance your browsing experience. These cookies help us understand how you interact with our service offerings and pricing tiers, allowing us to provide a more personalized experience.",
    },
    {
      title: "5. Contact Us",
      content: "If you have any questions about this Privacy Policy or our data practices, please reach out to our team through the contact section.",
    }
  ];

  return (
    <div className='dark:bg-neutral-950 min-h-screen relative'>
      <FullNavbar />
      
      <main className="max-w-4xl md:pt-[160px] pt-[60px] mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Last Updated: January 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <HoverBorderGradient
              key={index}
              containerClassName="rounded-2xl w-full"
              className="p-8 md:p-10 bg-neutral-900/50 backdrop-blur-sm"
            >
              <div className="relative z-20">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {section.content}
                </p>
                {section.bullets && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-400 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </HoverBorderGradient>
          ))}
        </div>

        {/* Agreement Note */}
        <div className="mt-20 p-8 border border-neutral-800 rounded-2xl bg-neutral-900/30 text-center">
          <p className="text-gray-400 text-sm">
            By using our services, you acknowledge that you have read and understood our 
            Privacy Policy and agree to our terms of service regarding data handling.
          </p>
        </div>
      </main>

      <BackgroundBeams className="z-0" />
      <Footer />
    </div>
  )
}

export default PrivacyPage;