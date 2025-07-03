"use client"

import { useState, useRef, useEffect } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Grid3X3, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react"
import Link from "next/link"
import PackageCard from "@/app/_components/package-card"
import { UpcomingPackage } from "@/types/package-detail"

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
  const [trendingTours, setTrendingTours] = useState<UpcomingPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrendingTours = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/packages/trending`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch trending tours');
        }

        const data = await response.json();
        setTrendingTours(data.packages);
      } catch (err) {
        console.error('Error fetching trending tours:', err);
        setError('Failed to load trending tours');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingTours();
  }, []);

  const slidesToShow = 3
  const maxSlide = Math.max(0, trendingTours.length - slidesToShow)

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-background rounded mb-4"></div>
            <div className="h-4 w-64 bg-background rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background rounded-lg p-4 space-y-3">
                  <div className="h-48 bg-muted rounded"></div>
                  <div className="h-4 w-3/4 bg-muted rounded"></div>
                  <div className="h-4 w-1/2 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || trendingTours.length === 0) {
    return null;
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

            <Link href="/trending-tours">
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
                <PackageCard 
                  key={tour.id} 
                  package={tour} 
                  aspectRatio="landscape" 
                  type="trending" 
                />
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
                      <PackageCard 
                        package={tour} 
                        aspectRatio="landscape" 
                        type="trending" 
                      />
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
