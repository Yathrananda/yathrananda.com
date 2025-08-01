import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Yathrananda Travel Agency | Expert Travel Planning Team",
  description:
    "Meet the passionate team behind Yathrananda Travel Agency. Learn about our mission, values, and 15+ years of experience creating personalized travel experiences worldwide.",
  keywords:
    "about Yathrananda, travel agency team, travel experts, personalized travel planning, sustainable tourism, travel company history, professional travel consultants",
  openGraph: {
    title: "About Yathrananda Travel Agency - Expert Travel Planning Team",
    description:
      "Discover the story behind Yathrananda Travel Agency. Meet our expert team and learn how we've been creating extraordinary travel experiences for over 15 years.",
    url: "https://Yathrananda.com/about",
    images: [
      {
        url: "/images/about/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Yathrananda Travel Agency team - Expert travel planners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Yathrananda Travel Agency - Expert Travel Planning Team",
    description:
      "Meet our passionate travel experts and learn about our mission to create extraordinary journeys.",
    images: ["/images/about/twitter-about.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
