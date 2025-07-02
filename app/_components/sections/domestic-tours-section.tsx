"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight, MapPin } from "lucide-react"
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

const DomesticToursSection: React.FC = () => {
  const domesticTours: TravelPackage[] = [
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
      id: "sylhet-tea-gardens",
      from: "Dhaka",
      to: "Sylhet",
      destination: "Sylhet",
      duration: "4 days 3 nights",
      date: "Jul 12 - Jul 16",
      price: "$220",
      image: "/images/packages/sylhet.jpg",
      alt: "Lush tea gardens and natural beauty in Sylhet - MALVORA travel package",
      trending: false,
      category: "domestic",
    },
    {
      id: "bandarban-hills",
      from: "Dhaka",
      to: "Bandarban",
      destination: "Bandarban",
      duration: "5 days 4 nights",
      date: "Aug 8 - Aug 13",
      price: "$280",
      originalPrice: "$350",
      image: "/images/packages/bandarban.jpg",
      alt: "Scenic hill tracts and tribal culture in Bandarban - MALVORA travel package",
      trending: true,
      discountPercentage: 20,
      category: "domestic",
    },
    {
      id: "sundarbans-mangrove",
      from: "Dhaka",
      to: "Sundarbans",
      destination: "Sundarbans",
      duration: "3 days 2 nights",
      date: "Sep 15 - Sep 18",
      price: "$320",
      image: "/images/packages/sundarbans.jpg",
      alt: "Mangrove forests and Royal Bengal Tigers in Sundarbans - MALVORA travel package",
      trending: false,
      category: "domestic",
    },
    {
      id: "rangamati-lake",
      from: "Dhaka",
      to: "Rangamati",
      destination: "Rangamati",
      duration: "4 days 3 nights",
      date: "Oct 20 - Oct 24",
      price: "$240",
      originalPrice: "$300",
      image: "/images/packages/rangamati.jpg",
      alt: "Serene lakes and tribal heritage in Rangamati - MALVORA travel package",
      trending: true,
      discountPercentage: 20,
      category: "domestic",
    },
    {
      id: "kuakata-beach",
      from: "Dhaka",
      to: "Kuakata",
      destination: "Kuakata",
      duration: "2 days 1 night",
      date: "Jan 15 - Jan 17",
      price: "$120",
      originalPrice: "$160",
      image: "/images/packages/kuakata.jpg",
      alt: "Panoramic sea beach and sunrise views in Kuakata - MALVORA travel package",
      trending: false,
      discountPercentage: 25,
      category: "domestic",
    },
    {
      id: "sajek-valley",
      from: "Dhaka",
      to: "Sajek",
      destination: "Sajek Valley",
      duration: "3 days 2 nights",
      date: "Feb 20 - Feb 23",
      price: "$200",
      image: "/images/packages/sajek.jpg",
      alt: "Cloud-kissed hills and tribal culture in Sajek Valley - MALVORA travel package",
      trending: true,
      category: "domestic",
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-background" aria-labelledby="domestic-tours-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            {/* <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" aria-hidden="true" />
            </div> */}
            <div>
              <motion.h2
                id="domestic-tours-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Domestic Tours
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true }}
              >
                Discover the hidden gems and natural beauty of Bangladesh
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/domestic-tours">
              <motion.button
                className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-sm flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="View all domestic tours"
              >
                <span className="text-sm sm:text-base">View All</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Tours Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {domesticTours.slice(0, 8).map((tour) => (
            <PackageCard key={tour.id} package={tour} aspectRatio="landscape" showRoute={false} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default DomesticToursSection
