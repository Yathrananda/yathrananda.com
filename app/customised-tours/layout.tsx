import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customised Tours - Yathrananda | Authentic Indian Travel Experiences",
  description:
    "Discover Yathrananda's curated customised tour packages showcasing India's most enchanting destinations. From Manali adventures to Kerala's backwaters, experience the true essence of India.",
  keywords:
    "kerala tours, India travel packages, Manali tours, Kerala packages, Rajasthan tours, spiritual journeys, adventure tours, cultural experiences, Indian holidays",
  openGraph: {
    title: "Yathrananda Customised Tours - Authentic Indian Experiences",
    description:
      "Experience the magic of India with our carefully curated domestic tour packages. From mountain retreats to cultural heritage sites.",
    url: "https://yathrananda.com/customised-tours",
    images: [
      {
        url: "/images/customised-tours/og-tours.jpg",
        width: 1200,
        height: 630,
        alt: "Yathrananda customised tours featuring Indian destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yathrananda Customised Tours - Authentic Experiences",
    description: "Explore our handpicked Indian destinations and cultural experiences.",
    images: ["/images/customised-tours/twitter-tours.jpg"],
  },
  alternates: {
    canonical: "/customised-tours",
  },
}

export default function CustomisedToursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
