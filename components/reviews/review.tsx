"use client";
import { CardStack } from "../ui/card-stack";
import { cn } from "@/lib/utils";

export function FloatingReviewCards({ className }: { className?: string }) {
  return (
    <div className={cn("h-[40rem] flex items-center justify-center", className)}>
      <CardStack items={CLIENT_REVIEWS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CLIENT_REVIEWS = [
  {
    id: 0,
    name: "Sarah Johnson",
    designation: "CTO, TechVision Inc.",
    content: (
      <p>
        Scale Saas transformed our business with their{" "}
        <Highlight>exceptional AI solutions</Highlight>. Their team delivered a
        custom SaaS platform that exceeded our expectations in terms of
        functionality and scalability.
      </p>
    ),
  },
  {
    id: 1,
    name: "Michael Chen",
    designation: "Founder, InnovatePro",
    content: (
      <p>
        Working with Scale Saas was a game-changer. Their{" "}
        <Highlight>cutting-edge technology</Highlight> and{" "}
        <Highlight>professional approach</Highlight> helped us launch our AI-powered
        product in record time. Highly recommended!
      </p>
    ),
  },
  {
    id: 2,
    name: "Emma Rodriguez",
    designation: "Product Director, FutureScale",
    content: (
      <p>
        The expertise at Scale Saas is unmatched. They delivered a{" "}
        <Highlight>sophisticated AI integration</Highlight> that perfectly aligned
        with our business needs. Their attention to detail and commitment to
        excellence sets them apart.
      </p>
    ),
  },
];
