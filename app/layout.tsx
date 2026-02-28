import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"; // 1. Import the Script component

import "../global.css";

export const metadata: Metadata = {
  title: "Scale saas",
  description: "Made by Scale saas teamS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 2. Add the Google Tag scripts here */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17858715668"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17858715668');
          `}
        </Script>
      </head>
      <body className="bg-neutral-950">
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}