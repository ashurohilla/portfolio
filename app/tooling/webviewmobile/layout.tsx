import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free web view tool | Scale Saas",
  description: "Best free online web view tool. Prettify, minify, and validate JSON. Convert JSON to CSV or XML instantly. Secure, client-side, and developer-friendly.",
  keywords: ["json editor", "json formatter", "json to csv", "json validator", "online json tool"],
  openGraph: {
    title: "Pro JSON Editor by Scale Saas",
    description: "Format, Validate, and Convert JSON instantly in your browser.",
    type: "website",
  }
};

export default function JsonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}