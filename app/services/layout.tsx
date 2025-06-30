import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Services - MALVORA | Trip Planning, Booking & 24/7 Support",
  description:
    "Comprehensive travel services including personalized trip planning, flight & hotel booking, adventure tours, cultural experiences, and 24/7 travel support. Get your custom quote today.",
  keywords:
    "travel services, trip planning, flight booking, hotel reservations, adventure tours, cultural experiences, travel insurance, group travel, photography tours, 24/7 travel support, custom itinerary",
  openGraph: {
    title: "MALVORA Travel Services - Complete Travel Solutions",
    description:
      "From personalized trip planning to 24/7 support, discover our comprehensive range of travel services designed to make your journey extraordinary.",
    url: "https://malvora.com/services",
    images: [
      {
        url: "/images/services/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "MALVORA comprehensive travel services - Trip planning, booking, and support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MALVORA Travel Services - Complete Travel Solutions",
    description:
      "Comprehensive travel services including trip planning, booking, adventures, and 24/7 support.",
    images: ["/images/services/twitter-services.jpg"],
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
