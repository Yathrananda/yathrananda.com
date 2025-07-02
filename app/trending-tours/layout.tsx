import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trending Tours - Yathrananda | Most Popular Travel Experiences",
  description:
    "Discover Yathrananda's most popular and trending tour packages. Experience our best-selling destinations, highly-rated journeys, and traveler favorites across India and abroad.",
  keywords:
    "trending tours, popular packages, best-selling tours, top rated trips, most booked destinations, featured tours, recommended packages, traveler favorites, hot destinations",
  openGraph: {
    title: "Yathrananda Trending Tours - Most Popular Travel Experiences",
    description:
      "Explore our most sought-after tour packages and discover why they're loved by travelers. Join our best-selling tours to premium destinations.",
    url: "https://yathrananda.com/trending-tours",
    images: [
      {
        url: "/images/trending-tours/og-tours.jpg",
        width: 1200,
        height: 630,
        alt: "Yathrananda trending tours and popular destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yathrananda Trending Tours - Most Popular Experiences",
    description: "Join our most popular tours and discover traveler favorites.",
    images: ["/images/trending-tours/twitter-tours.jpg"],
  },
  alternates: {
    canonical: "/trending-tours",
  },
}

export default function TrendingToursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
