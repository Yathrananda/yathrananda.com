"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
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

const UpcomingToursSection: React.FC = () => {
  const upcomingTours: TravelPackage[] = [
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
      id: "coxs-bazar-beach",
      from: "Dhaka",
      to: "Cox's Bazar",
      destination: "Cox's Bazar",
      duration: "3 days 2 nights",
      date: "Jun 5 - Jun 8",
      price: "$180",
      originalPrice: "$250",
      image: "/images/packages/coxs-bazar.jpg",
      alt: "World's longest natural sea beach in Cox's Bazar - MALVORA travel package",
      trending: true,
      discountPercentage: 28,
      category: "domestic",
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
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-background" aria-labelledby="upcoming-tours-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <div>
            <motion.h2
              id="upcoming-tours-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Upcoming Tours
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              Don't miss out on these exciting upcoming adventures
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/upcoming-tours">
              <motion.button
                className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-sm flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="View all upcoming tours"
              >
                <span className="text-sm sm:text-base">View All</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Tours Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {upcomingTours.map((tour) => (
            <PackageCard key={tour.id} package={tour} aspectRatio="landscape" showRoute={true} type={"upcoming"} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default UpcomingToursSection
