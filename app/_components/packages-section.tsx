"use client"

import type React from "react"
import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { Search, MapPin, Calendar, ArrowRight, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, Variants, useInView } from "framer-motion"

// TypeScript interface for package data
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

// Component props interface
interface PackagesSectionProps {
  title?: string
  subtitle?: string
  showSearch?: boolean
  packagesPerPage?: number
  maxPackages?: number
  aspectRatio?: "square" | "landscape" | "portrait"
  className?: string
  enableInfiniteScroll?: boolean
}

// Animation variants
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const PackagesSection: React.FC<PackagesSectionProps> = ({
  title = "Popular Travel Destinations",
  subtitle = "Discover our handpicked travel packages designed to create unforgettable memories. From exotic international destinations to breathtaking local gems.",
  showSearch = true,
  packagesPerPage = 8,
  maxPackages,
  aspectRatio = "landscape",
  className = "",
  enableInfiniteScroll = true,
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [displayedPackages, setDisplayedPackages] = useState<TravelPackage[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const isLoadMoreInView = useInView(loadMoreRef)

  // Enhanced travel packages data with more variety
  const allTravelPackages: TravelPackage[] = [
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

  // Filter packages based on search query
  const filteredPackages = useMemo(() => {
    let packages = allTravelPackages

    if (searchQuery.trim()) {
      packages = packages.filter(
        (pkg) =>
          pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.category?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (maxPackages) {
      packages = packages.slice(0, maxPackages)
    }

    return packages
  }, [searchQuery, maxPackages])

  // Handle search with loading state
  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true)
    setSearchQuery(query)
    setCurrentPage(1)

    // Simulate API delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))
    setIsLoading(false)
  }, [])

  // Initialize displayed packages when filtered packages change
  useEffect(() => {
    if (enableInfiniteScroll) {
      const initialPackages = filteredPackages.slice(0, packagesPerPage)
      setDisplayedPackages(initialPackages)
      setCurrentPage(1)
    } else {
      // For non-infinite scroll, show all packages up to current page
      setDisplayedPackages(filteredPackages.slice(0, currentPage * packagesPerPage))
    }
  }, [filteredPackages, packagesPerPage, enableInfiniteScroll, currentPage])

  // Load more functionality for infinite scroll
  const loadMorePackages = useCallback(async () => {
    if (loadingMore) return

    const nextPage = currentPage + 1
    const startIndex = (nextPage - 1) * packagesPerPage
    const endIndex = startIndex + packagesPerPage
    const newPackages = filteredPackages.slice(startIndex, endIndex)

    if (newPackages.length === 0) return

    setLoadingMore(true)
    
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    setDisplayedPackages(prev => [...prev, ...newPackages])
    setCurrentPage(nextPage)
    setLoadingMore(false)
  }, [loadingMore, currentPage, packagesPerPage, filteredPackages])

  // Handle infinite scroll trigger
  useEffect(() => {
    if (
      enableInfiniteScroll &&
      isLoadMoreInView && 
      !loadingMore && 
      !isLoading &&
      displayedPackages.length < filteredPackages.length &&
      displayedPackages.length > 0 &&
      displayedPackages.length >= packagesPerPage // Only trigger after initial load
    ) {
      console.log("Loading more packages...")
      loadMorePackages()
    }
  }, [
    isLoadMoreInView, 
    loadingMore, 
    isLoading, 
    displayedPackages.length, 
    filteredPackages.length, 
    loadMorePackages, 
    enableInfiniteScroll,
    packagesPerPage
  ])

  // Manual load more for button-based loading
  const handleLoadMore = useCallback(async () => {
    await loadMorePackages()
  }, [loadMorePackages])

  // Get packages to display based on infinite scroll setting
  const packagesToDisplay = useMemo(() => {
    if (enableInfiniteScroll) {
      return displayedPackages
    } else {
      // For non-infinite scroll, show all packages (or implement traditional pagination)
      return filteredPackages
    }
  }, [enableInfiniteScroll, displayedPackages, filteredPackages])

  // Get image height class based on aspect ratio
  const getImageHeightClass = () => {
    switch (aspectRatio) {
      case "square":
        return "h-48 sm:h-56"
      case "portrait":
        return "h-64 sm:h-72"
      case "landscape":
      default:
        return "h-48 sm:h-56 lg:h-60"
    }
  }

  const hasMorePackages = packagesToDisplay.length < filteredPackages.length

  return (
    <section
      className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-background ${className}`}
      aria-labelledby="packages-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.h2
            id="packages-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>

          {/* Search Bar */}
          {showSearch && (
            <motion.div
              className="max-w-md mx-auto relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-full focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out text-card-foreground placeholder:text-muted-foreground shadow-sm hover:shadow-md"
                  aria-label="Search travel destinations"
                />
                {isLoading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" aria-hidden="true" />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Loading State */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              className="flex items-center justify-center py-16"
              variants={loadingVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key="loading"
            >
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" aria-hidden="true" />
                <p className="text-muted-foreground">Searching packages...</p>
              </div>
            </motion.div>
          ) : packagesToDisplay.length > 0 ? (
            <motion.div key="packages">
              {/* Packages Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {packagesToDisplay.map((pkg, index) => (
                  <motion.div 
                    key={pkg.id} 
                    variants={cardVariants} 
                    whileHover={{ y: -8 }} 
                    className="group"
                    initial={index >= packagesPerPage ? { opacity: 0, y: 30 } : false}
                    animate={index >= packagesPerPage ? { opacity: 1, y: 0 } : {}}
                    transition={index >= packagesPerPage ? { duration: 0.4, ease: "easeOut", delay: (index % packagesPerPage) * 0.05 } : {}}
                  >
                    <Link href={`/packages/${pkg.id}`} className="block">
                      <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-out group-hover:shadow-xl relative">
                        {/* Image Section */}
                        <div className={`relative ${getImageHeightClass()} overflow-hidden`}>
                          <Image
                            src={pkg.image || "/placeholder.svg"}
                            alt={pkg.alt}
                            fill
                            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {pkg.trending && (
                              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                                Trending
                              </span>
                            )}
                            {pkg.discountPercentage && (
                              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                                {pkg.discountPercentage}% OFF
                              </span>
                            )}
                          </div>

                          {/* Desktop Hover Overlay */}
                          <div className="absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out hidden sm:flex items-center justify-center">
                            <button
                              className="bg-background text-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-background/90 shadow-lg flex items-center space-x-2"
                              aria-label={`View details for ${pkg.destination} package`}
                            >
                              <span className="text-sm sm:text-base">View Details</span>
                              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                            </button>
                          </div>

                          {/* Mobile Arrow Icon */}
                          <div className="absolute bottom-3 right-3 sm:hidden">
                            <div className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                              <ArrowRight className="w-4 h-4 text-foreground" aria-hidden="true" />
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 sm:p-6">
                          {/* Route Information */}
                          <div className="flex items-center space-x-2 mb-3">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" aria-hidden="true" />
                            <span className="text-xs sm:text-sm text-muted-foreground">
                              {pkg.from} → {pkg.to}
                            </span>
                          </div>

                          {/* Destination */}
                          <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2 line-clamp-1">
                            {pkg.destination}
                          </h3>

                          {/* Duration and Date */}
                          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 text-xs sm:text-sm text-muted-foreground">
                            <span className="line-clamp-1">{pkg.duration}</span>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" aria-hidden="true" />
                              <span className="line-clamp-1">{pkg.date}</span>
                            </div>
                          </div>

                          {/* Price Section */}
                          <div className="bg-primary/10 rounded-lg p-3 sm:p-4 border border-primary/20">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xs text-muted-foreground block mb-1">Starting from</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xl sm:text-2xl font-bold text-primary">{pkg.price}</span>
                                  {pkg.originalPrice && (
                                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                                      {pkg.originalPrice}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground text-right">
                                <span>per person</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Infinite Scroll Trigger or Load More Button */}
              {enableInfiniteScroll && hasMorePackages && (
                <div ref={loadMoreRef}>
                  <motion.div
                    className="flex justify-center items-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {loadingMore ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        <span className="text-muted-foreground">Loading more packages...</span>
                      </div>
                    ) : (
                      <div className="h-4" /> // Invisible trigger for infinite scroll
                    )}
                  </motion.div>
                </div>
              )}

              {/* Manual Load More Button (when infinite scroll is disabled) */}
              {!enableInfiniteScroll && hasMorePackages && (
                <motion.div
                  className="flex justify-center items-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {loadingMore ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      <span className="text-muted-foreground">Loading more packages...</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleLoadMore}
                      className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <span>Load More Packages</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12 sm:py-16"
              variants={loadingVariants}
              initial="hidden"
              animate="visible"
              key="empty"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No packages found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any packages matching "{searchQuery}". Try searching for a different destination or
                clear your search.
              </p>
              <button
                onClick={() => handleSearch("")}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary/90 shadow-sm"
                aria-label="Clear search and show all packages"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PackagesSection