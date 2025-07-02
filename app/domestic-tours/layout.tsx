import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Domestic Tours - Yathrananda | Authentic Indian Travel Experiences",
  description:
    "Discover Yathrananda's curated domestic tour packages showcasing India's most enchanting destinations. From Manali adventures to Kerala's backwaters, experience the true essence of India.",
  keywords:
    "domestic tours, India travel packages, Manali tours, Kerala packages, Rajasthan tours, spiritual journeys, adventure tours, cultural experiences, Indian holidays",
  openGraph: {
    title: "Yathrananda Domestic Tours - Authentic Indian Experiences",
    description:
      "Experience the magic of India with our carefully curated domestic tour packages. From mountain retreats to cultural heritage sites.",
    url: "https://yathrananda.com/domestic-tours",
    images: [
      {
        url: "/images/domestic-tours/og-tours.jpg",
        width: 1200,
        height: 630,
        alt: "Yathrananda domestic tours featuring Indian destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yathrananda Domestic Tours - Authentic Experiences",
    description: "Explore our handpicked Indian destinations and cultural experiences.",
    images: ["/images/domestic-tours/twitter-tours.jpg"],
  },
  alternates: {
    canonical: "/domestic-tours",
  },
}

export default function DomesticToursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
