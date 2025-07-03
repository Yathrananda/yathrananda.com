"use client";

import { TravelPackageDetail } from "@/app/_components/travel-package-detail"
import type { TravelPackageDetailData } from "@/types/package-detail"
import { useParams } from "next/navigation";

export default function PackageDetailPage() {
  const params = useParams();
  
  const getSamplePackageData = (id: string): TravelPackageDetailData => ({
    id,
    title: "Manali Family Tour",
    subtitle: "Fully customizable family tour tailored to your needs",
    heroImage: {
      url: "/images/packages/manali-hero.jpg",
      alt: "Scenic view of snow-capped mountains in Manali"
    },
    overview: `Experience the breathtaking beauty of Manali with our specially curated family tour package. This comprehensive tour takes you through the most scenic locations in and around Manali, offering a perfect blend of adventure, relaxation, and cultural experiences.
  
  Our expert guides will ensure you don't miss any of the must-visit attractions while providing insights into the local culture and history. The tour is designed to be family-friendly, with activities suitable for all age groups.
  
  From the snow-capped peaks of the Himalayas to the lush green valleys, from ancient temples to modern adventure sports, this tour offers something for everyone in the family.`,
    highlights: [
      { id: "1", label: "Nature", icon: "nature" },
      { id: "2", label: "Adventure", icon: "adventure" },
      { id: "3", label: "Family Friendly", icon: "family" },
      { id: "4", label: "Culture", icon: "culture" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Manali",
        route: "Delhi - Manali",
        mealPlan: "Dinner",
        activities: [
          "Arrival at Manali and check-in to hotel",
          "Evening leisure time at Mall Road",
          "Welcome dinner at hotel",
          "Overnight stay in Manali",
        ],
        notes: "Check-in time is 2:00 PM. Early check-in subject to availability.",
        images: [
          {
            url: "/images/packages/manali/day1-mall-road.jpg",
            alt: "Evening view of Mall Road, Manali"
          },
          {
            url: "/images/packages/manali/day1-hotel.jpg",
            alt: "Hotel exterior view"
          }
        ]
      },
      {
        day: 2,
        title: "Solang Valley Adventure",
        route: "Manali - Solang Valley - Manali",
        mealPlan: "Breakfast, Lunch, Dinner",
        activities: [
          "Morning visit to Solang Valley",
          "Adventure activities: Paragliding, Zorbing, ATV rides",
          "Lunch at local restaurant",
          "Visit to Atal Tunnel (subject to weather conditions)",
          "Return to hotel for dinner",
        ],
        notes: "Adventure activities are weather dependent and at additional cost.",
        images: [
          {
            url: "/images/packages/manali/day2-solang.jpg",
            alt: "Panoramic view of Solang Valley"
          },
          {
            url: "/images/packages/manali/day2-paragliding.jpg",
            alt: "Paragliding activity in Solang Valley"
          },
          {
            url: "/images/packages/manali/day2-atal-tunnel.jpg",
            alt: "Entrance of Atal Tunnel"
          }
        ]
      },
      {
        day: 3,
        title: "Local Sightseeing",
        route: "Manali Local",
        mealPlan: "Breakfast, Lunch, Dinner",
        activities: [
          "Visit to Hadimba Devi Temple",
          "Explore Manu Temple",
          "Walk through Van Vihar National Park",
          "Shopping at Mall Road",
          "Visit to Tibetan Monastery",
        ],
        notes: "Comfortable walking shoes recommended for temple visits.",
        images: [
          {
            url: "/images/destination-1.jpg",
            alt: "Hadimba Devi Temple"
          },
          {
            url: "/images/destination-2.jpg",
            alt: "Manu Temple"
          },
          {
            url: "/images/destination-3.jpg",
            alt: "Van Vihar National Park"
          }
        ]
      },
      {
        day: 4,
        title: "Departure",
        route: "Manali - Delhi",
        mealPlan: "Breakfast",
        activities: [
          "Check-out from hotel after breakfast",
          "Last-minute shopping if time permits",
          "Departure to Delhi",
          "Drop at Delhi airport/railway station",
        ],
        notes: "Check-out time is 11:00 AM. Late check-out charges may apply.",
        images: [
          {
            url: "/images/destination-1.jpg",
            alt: "Departure from Manali"
          }
        ]
      },
    ],
    gallery: [
      {
        id: "1",
        url: "/images/destination-1.jpg",
        alt: "Snow-capped peaks of Manali",
        caption: "Breathtaking mountain views"
      },
      {
        id: "2",
        url: "/images/destination-2.jpg",
        alt: "Traditional Himachali culture",
        caption: "Local cultural experience"
      },
      {
        id: "3",
        url: "/images/destination-3.jpg",
        alt: "Adventure sports in Solang",
        caption: "Thrilling adventure activities"
      },
    ],
    bookingInfo: {
      advancePayment: "30% of total cost",
      balancePayment: "Before 7 days of travel",
      bookingRules: [
        "Advance payment is non-refundable",
        "Balance payment must be made 7 days before travel",
        "ID proof required for all travelers",
        "Children below 5 years travel free (without separate bed)",
        "Extra bed charges apply for children above 5 years",
      ],
    },
    cancellationPolicy: {
      rules: [
        "Cancellation 30 days before travel: 25% of total cost",
        "Cancellation 15-29 days before travel: 50% of total cost",
        "Cancellation 7-14 days before travel: 75% of total cost",
        "Cancellation less than 7 days before travel: 100% of total cost",
        "No refund for no-show or early departure",
        "Refund will be processed within 7-10 working days",
      ],
    },
    contact: {
      phone: "+91-9876543210",
      whatsapp: "+91-9876543210",
      email: "info@yathrananda.com",
      socialLinks: {
        facebook: "https://facebook.com/yathrananda",
        instagram: "https://instagram.com/yathrananda",
        twitter: "https://twitter.com/yathrananda",
      },
    },
    price: {
      amount: 15999,
      currency: "₹",
      per: "per person",
    },
    duration: "4 Days / 3 Nights",
    groupSize: "2-15 people",
  })

  const packageData = getSamplePackageData((params as { id: string }).id || "manali-family-tour");

  return <TravelPackageDetail 
    data={packageData} 
    backUrl="/" 
    backLabel="Back to Home" 
  />
}
