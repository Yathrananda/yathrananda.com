import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Upcoming Tours - Yathrananda | Exclusive Travel Experiences",
  description:
    "Browse Yathrananda's latest upcoming tours and exclusive travel packages. Be the first to explore new destinations and special seasonal journeys across India and worldwide.",
  keywords:
    "upcoming tours, new travel packages, exclusive trips, seasonal tours, festival tours, special journeys, limited edition tours, group departures, early bird offers",
  openGraph: {
    title: "Yathrananda Upcoming Tours - Limited Edition Travel Experiences",
    description:
      "Join our newest curated journeys and be part of exclusive travel experiences. Book early for special offers on upcoming tours.",
    url: "https://yathrananda.com/upcoming-tours",
    images: [
      {
        url: "/images/upcoming-tours/og-tours.jpg",
        width: 1200,
        height: 630,
        alt: "Yathrananda upcoming tours and special experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yathrananda Upcoming Tours - Limited Edition Experiences",
    description: "Discover our newest tour packages and special seasonal journeys.",
    images: ["/images/upcoming-tours/twitter-tours.jpg"],
  },
  alternates: {
    canonical: "/upcoming-tours",
  },
}

export default function UpcomingToursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
