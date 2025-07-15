import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Contact Us - Yathrananda Travel Agency | Get In Touch With Travel Experts",
  description:
    "Contact Yathrananda's travel experts for personalized trip planning. Call +1 (555) 123-4567, email support@yathrananda.com, or fill out our contact form. Free consultation available.",
  keywords:
    "contact Yathrananda, travel agency contact, trip planning consultation, travel experts contact, travel planning help, travel agency phone number, travel consultation",
  openGraph: {
    title: "Contact Yathrananda Travel Agency - Expert Travel Planning Help",
    description:
      "Get in touch with our travel experts for personalized trip planning. Multiple contact options available with quick response times.",
    url: "https://yathrananda.com/contact",
    images: [
      {
        url: "/images/contact/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Yathrananda travel agency for expert travel planning assistance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Yathrananda Travel Agency - Expert Help Available",
    description:
      "Get in touch with our travel experts for personalized trip planning and travel assistance.",
    images: ["/images/contact/twitter-contact.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
