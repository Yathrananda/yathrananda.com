"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Grid3X3, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react"
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

const TrendingToursSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid")
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const trendingTours: TravelPackage[] = [
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
      id: "singapore-city",
      from: "Dhaka",
      to: "Singapore",
      destination: "Singapore",
      duration: "4 days 3 nights",
      date: "Dec 5 - Dec 9",
      price: "$780",
      image: "/images/packages/singapore.jpg",
      alt: "Garden city and cultural diversity in Singapore - MALVORA travel package",
      trending: true,
      category: "international",
    },
  ]

  const slidesToShow = 3
  const maxSlide = Math.max(0, trendingTours.length - slidesToShow)

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-muted" aria-labelledby="trending-tours-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <div>
            <motion.h2
              id="trending-tours-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Most Trending Tours
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              Popular destinations loved by travelers worldwide
            </motion.p>
          </div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* View Mode Toggle */}
            <div className="flex items-center bg-background rounded-lg p-1 border border-border shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("carousel")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "carousel"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-label="Carousel view"
                aria-pressed={viewMode === "carousel"}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>

            <Link href="/packages?filter=trending">
              <motion.button
                className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-sm flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="View all trending tours"
              >
                <span className="text-sm sm:text-base">View All</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Tours Display */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              viewport={{ once: true, margin: "-50px" }}
            >
              {trendingTours.slice(0, 6).map((tour) => (
                <PackageCard key={tour.id} package={tour} aspectRatio="landscape" showRoute={true} type="trending" />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="carousel"
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Carousel Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-2 rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={currentSlide >= maxSlide}
                    className="p-2 rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Slide Indicators */}
                <div className="flex items-center space-x-2">
                  {Array.from({ length: maxSlide + 1 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        i === currentSlide ? "bg-primary" : "bg-border hover:bg-muted-foreground"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Carousel Container */}
              <div className="overflow-hidden" ref={carouselRef}>
                <motion.div
                  className="flex space-x-6"
                  animate={{
                    x: `calc(-${currentSlide * (100 / slidesToShow)}% - ${currentSlide * 1.5}rem)`,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {trendingTours.map((tour) => (
                    <div
                      key={tour.id}
                      className="flex-shrink-0"
                      style={{ width: `calc(${100 / slidesToShow}% - 1rem)` }}
                    >
                      <PackageCard package={tour} aspectRatio="landscape" showRoute={true} type="trending" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default TrendingToursSection
