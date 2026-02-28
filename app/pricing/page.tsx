import React from 'react'
import { FullNavbar } from '@/components/Navbar/Navbar'
import { BackgroundBeams } from "@/components/ui/background-beams"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import Footer from "@/components/Footer"
import Link from 'next/link'

function page() {
  const CheckIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
          fill="currentColor"
          strokeWidth="0"
        />
      </svg>
    );
  };

  const pricingPlans = [
    {
      name: "Starter",
      price: "₹4999",
      period: "one-time",
      description: "Perfect for small businesses getting started",
      features: [
        "3-4 Modern Pages",
        "Basic UI/UX Design",
        "1 Design Revision",
        "Mobile Responsive",
        "Basic Contact Form"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "₹9999",
      period: "one-time",
      description: "Most popular choice for growing businesses",
      features: [
        "5-6 Modern Pages",
        "Custom UI/UX Design",
        "2 Design Revisions",
        "Mobile Responsive",
        "Basic SEO Setup",
        "Contact Forms & Analytics"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "₹19999",
      period: "one-time",
      description: "Complete solution for established businesses",
      features: [
        "8-10 Modern Pages",
        "Advanced UI/UX Design",
        "Unlimited Revisions",
        "Mobile & Tablet Responsive",
        "Advanced SEO Setup",
        "CMS Integration",
        "E-commerce Ready",
        "Performance Optimization"
      ],
      popular: false
    }
  ];

  const customSolutions = [
    {
      title: "Web Applications",
      description: "Full-stack web applications with modern frameworks",
      features: [
        "React/Next.js Development",
        "Database Integration",
        "API Development",
        "User Authentication",
        "Admin Dashboards"
      ]
    },
    {
      title: "Mobile Development",
      description: "Cross-platform mobile applications",
      features: [
        "React Native Apps",
        "iOS & Android",
        "App Store Deployment",
        "Push Notifications",
        "Offline Functionality"
      ]
    },
    {
      title: "Enterprise Solutions",
      description: "Large-scale business applications",
      features: [
        "Custom CRM Systems",
        "Enterprise Applications",
        "AI/ML Integration",
        "Cloud Infrastructure",
        "Maintenance & Support"
      ]
    }
  ];

  return (
    <div className='dark:bg-neutral-950 min-h-screen'>
      <FullNavbar/>
      
      <main className="max-w-7xl md:pt-[160px] pt-[60px] mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. From simple landing pages to complex enterprise solutions.
          </p>
        </div>

        {/* Website Packages */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Website Packages
            </h2>
            <p className="text-gray-400 text-lg">
              Professional websites built with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="absolute -top-10  left-[45%] transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <HoverBorderGradient 
                  containerClassName='rounded-xl h-full' 
                  className="p-8 h-full flex flex-col"
                >
                  <div className="relative z-20 flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                      <div className="flex items-baseline mb-6">
                        <span className="text-4xl md:text-5xl font-bold text-white">{plan.price}</span>
                        <span className="text-gray-400 ml-2">{plan.period}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-3 items-start text-gray-300">
                          <CheckIcon />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <HoverBorderGradient
                      containerClassName="w-full rounded-full"
                      className="w-full py-3 text-center"
                    >
                      <Link href="/contact" className="text-lg font-medium text-white">
                      <span className="text-lg font-medium">Get Started</span>
                      </Link>
                    </HoverBorderGradient>
                  </div>
                </HoverBorderGradient>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Solutions */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Custom Development Solutions
            </h2>
            <p className="text-gray-400 text-lg">
              Tailored software solutions for unique business requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {customSolutions.map((solution, index) => (
              <HoverBorderGradient 
                key={index}
                containerClassName='rounded-xl' 
                className="p-8"
              >
                <div className="relative z-20">
                  <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
                  <p className="text-gray-300 mb-6">{solution.description}</p>
                  
                  <ul className="space-y-3">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-gray-300">
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </HoverBorderGradient>
            ))}
          </div>

          <div className="text-center">
            <HoverBorderGradient
              containerClassName="inline-flex rounded-full"
              className="px-8 py-4"
            >
              <span className="text-lg font-medium">Request Custom Quote</span>
            </HoverBorderGradient>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Additional Services
            </h2>
            <p className="text-gray-400 text-lg">
              Support services to keep your business running smoothly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HoverBorderGradient containerClassName='rounded-xl' className="p-8">
              <div className="relative z-20">
                <h3 className="text-2xl font-bold text-white mb-4">Maintenance & Support</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-white">₹2999</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Regular Updates & Security",
                    "Performance Monitoring",
                    "Content Updates",
                    "Technical Support",
                    "Backup & Recovery"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-gray-300">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <HoverBorderGradient
                  containerClassName="w-full rounded-full"
                  className="w-full py-3 text-center"
                >
                  <span className="text-lg">Subscribe</span>
                </HoverBorderGradient>
              </div>
            </HoverBorderGradient>

            <HoverBorderGradient containerClassName='rounded-xl' className="p-8">
              <div className="relative z-20">
                <h3 className="text-2xl font-bold text-white mb-4">Digital Marketing</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-white">₹5999</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "SEO Optimization",
                    "Social Media Management",
                    "Google Ads Setup",
                    "Analytics & Reporting",
                    "Content Strategy"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-gray-300">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <HoverBorderGradient
                  containerClassName="w-full rounded-full"
                  className="w-full py-3 text-center"
                >
                  <span className="text-lg">Get Started</span>
                </HoverBorderGradient>
              </div>
            </HoverBorderGradient>

            
            <HoverBorderGradient containerClassName='rounded-xl' className="p-8">
              <div className="relative z-20">
                <h3 className="text-2xl font-bold text-white mb-4">Bussiness Consulting</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-white">₹1999</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Business Understanding",
                    "Business Strategy",
                    "Project Management",
                    "Analytics & Reporting",
                    "Product Strategy"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-gray-300">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <HoverBorderGradient
                  containerClassName="w-full rounded-full"
                  className="w-full py-3 text-center"
                >
                  <span className="text-lg">Get Started</span>
                </HoverBorderGradient>
              </div>
            </HoverBorderGradient>
            
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Have questions about our services? Need a custom solution? 
            Get in touch with our team and let &pos; discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/contact">
              <HoverBorderGradient
                containerClassName="inline-flex rounded-full"
                className="px-8 py-3"
              >
                <span className="text-lg font-medium">Contact Us</span>
              </HoverBorderGradient>
            </a>
            <a href="/portfolio" className="text-gray-400 hover:text-white transition-colors">
              View Our Work →
            </a>
          </div>
        </div>
      </main>

      <BackgroundBeams />
      <Footer />
    </div>
  )
}

export default page