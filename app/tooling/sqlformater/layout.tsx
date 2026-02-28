import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free SQL Formatter Online | Beautify, Minify & Validate SQL",
  description: "Best free online SQL formatter. Beautify messy queries, minify for production, and standardise keywords to uppercase. Secure, client-side, and supports MySQL, PostgreSQL, and SQL Server.",
  keywords: ["sql formatter", "sql beautifier", "format sql online", "sql minifier", "pretty print sql", "database tool"],
  openGraph: {
    title: "Pro SQL Formatter by Scale Saas",
    description: "Format, Minify, and Standardize your SQL queries instantly in your browser.",
    type: "website",
  }
};

export default function SqlLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}