"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Globe } from "lucide-react"
import Link from "next/link"
import PackageCard from "@/app/_components/package-card"

interface TravelPackage {
  id: string
  from: string
  to: string
  destination: string
  duration: string
  date: string
  price: string
  originalPrice?: string
  image: string
  alt: string
  trending: boolean
  discountPercentage?: number
  category?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const InternationalToursSection: React.FC = () => {
  const internationalTours: TravelPackage[] = [
    {
      id: "thailand-adventure",
      from: "Dhaka",
      to: "Bangkok",
      destination: "Thailand",
      duration: "7 days 6 nights",
      date: "Mar 15 - Mar 22",
      price: "$870",
      originalPrice: "$1,200",
      image: "/images/packages/thailand.jpg",
      alt: "Beautiful beaches and temples in Thailand - MALVORA travel package",
      trending: true,
      discountPercentage: 28,
      category: "international",
    },
    {
      id: "tokyo-cultural",
      from: "Dhaka",
      to: "Tokyo",
      destination: "Tokyo",
      duration: "5 days 4 nights",
      date: "Apr 10 - Apr 15",
      price: "$1,150",
      originalPrice: "$1,400",
      image: "/images/packages/tokyo.jpg",
      alt: "Modern cityscape and traditional culture in Tokyo - MALVORA travel package",
      trending: true,
      discountPercentage: 18,
      category: "international",
    },
    {
      id: "chicago-city",
      from: "Dhaka",
      to: "Chicago",
      destination: "Chicago",
      duration: "6 days 5 nights",
      date: "May 20 - May 26",
      price: "$1,320",
      image: "/images/packages/chicago.jpg",
      alt: "Stunning architecture and lakefront views in Chicago - MALVORA travel package",
      trending: false,
      category: "international",
    },
    {
      id: "dubai-luxury",
      from: "Dhaka",
      to: "Dubai",
      destination: "Dubai",
      duration: "5 days 4 nights",
      date: "Nov 10 - Nov 15",
      price: "$950",
      originalPrice: "$1,200",
      image: "/images/packages/dubai.jpg",
      alt: "Luxury shopping and modern architecture in Dubai - MALVORA travel package",
      trending: true,
      discountPercentage: 21,
      category: "international",
    },
    {
      id: "singapore-city",
      from: "Dhaka",
      to: "Singapore",
      destination: "Singapore",
      duration: "4 days 3 nights",
      date: "Dec 5 - Dec 9",
      price: "$780",
      image: "/images/packages/singapore.jpg",
      alt: "Garden city and cultural diversity in Singapore - MALVORA travel package",
      trending: false,
      category: "international",
    },
  ]

  return (
    <section
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-muted"
      aria-labelledby="international-tours-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            {/* <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" aria-hidden="true" />
            </div> */}
            <div>
              <motion.h2
                id="international-tours-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                International Tours
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true }}
              >
                Explore the world beyond borders with our international packages
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/packages?filter=international">
              <motion.button
                className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-sm flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="View all international tours"
              >
                <span className="text-sm sm:text-base">View All</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Tours Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {internationalTours.map((tour) => (
            <PackageCard key={tour.id} package={tour} aspectRatio="landscape" showRoute={false} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default InternationalToursSection
