import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "International Tours - Yathrananda | Global Travel Experiences",
  description:
    "Explore Yathrananda's handpicked international tour packages offering unforgettable experiences worldwide. From European adventures to Asian explorations, discover the world with us.",
  keywords:
    "international tours, global travel packages, Europe tours, Asia packages, world tourism, luxury travel, adventure tours, cultural experiences, holiday packages, international destinations",
  openGraph: {
    title: "Yathrananda International Tours - Global Travel Experiences",
    description:
      "Embark on extraordinary journeys across the globe with our expertly curated international tour packages. Experience world-class destinations and unique cultural experiences.",
    url: "https://yathrananda.com/international-tours",
    images: [
      {
        url: "/images/international-tours/og-tours.jpg",
        width: 1200,
        height: 630,
        alt: "Yathrananda international tours featuring global destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yathrananda International Tours - Global Experiences",
    description: "Discover the world with our carefully curated international tour packages.",
    images: ["/images/international-tours/twitter-tours.jpg"],
  },
  alternates: {
    canonical: "/international-tours",
  },
}

export default function InternationalToursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
