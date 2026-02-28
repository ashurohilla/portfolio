import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps On Air | Wireless iOS IPA Distribution | Scale SaaS Studio",
  description: "Distribute iOS IPA builds wirelessly over-the-air. The best free AppsOnAir alternative for developers. Secure, instant, and public OTA installation for Ad-Hoc and Enterprise builds.",
  keywords: [
    "AppsOnAir alternative", 
    "wireless ios installation", 
    "IPA distribution tool", 
    "OTA ios install", 
    "ios beta testing", 
    "itms-services link generator",
    "Scale SaaS tooling"
  ],
  authors: [{ name: "Scale SaaS Studio" }],
  openGraph: {
    title: "Apps On Air by Scale SaaS",
    description: "Securely share and install iOS builds wirelessly. One-click IPA distribution for dev teams.",
    type: "website",
    url: "https://saasscale.in/tooling/appsonair",
    siteName: "Scale SaaS Studio",
    images: [
      {
        url: "/og-image-appsonair.png", // Ensure you add an OG image in your public folder
        width: 1200,
        height: 630,
        alt: "Apps On Air iOS Distribution Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apps On Air | Scale SaaS",
    description: "Fast, public, and wireless iOS app distribution.",
    creator: "@scalesaas", // Update with your actual handle
  },
};

export default function AppsOnAirLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}