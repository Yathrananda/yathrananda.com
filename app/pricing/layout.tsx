import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Yathrananda Travel Agency | Transparent Travel Planning Costs",
  description:
    "Discover Yathrananda's transparent pricing for travel planning services. From essential consultation to luxury concierge services. No hidden fees, competitive rates, and custom packages available.",
  keywords:
    "travel planning pricing, trip planning costs, travel agency fees, consultation pricing, travel booking rates, custom travel packages, transparent pricing, travel planning services cost",
  openGraph: {
    title: "Yathrananda Travel Pricing - Transparent & Competitive Rates",
    description:
      "Simple, transparent pricing for all your travel planning needs. From basic consultation to luxury experiences, find the perfect package for your journey.",
    url: "https://yathrananda.com/pricing",
    images: [
      {
        url: "/images/pricing/og-pricing.jpg",
        width: 1200,
        height: 630,
        alt: "Yathrananda travel agency pricing packages and rates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yathrananda Travel Pricing - Transparent & Competitive",
    description:
      "Simple, transparent pricing for travel planning services. No hidden fees, competitive rates.",
    images: ["/images/pricing/twitter-pricing.jpg"],
  },
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
