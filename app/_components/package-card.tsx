"use client";

import type React from "react";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface TravelPackage {
  id: string;
  from: string;
  to: string;
  destination: string;
  duration: string;
  date: string;
  price: string;
  originalPrice?: string;
  image: string;
  alt: string;
  trending: boolean;
  discountPercentage?: number;
  category?: string;
}

interface PackageCardProps {
  package: TravelPackage;
  aspectRatio?: "square" | "landscape" | "portrait";
  showRoute?: boolean;
  className?: string;
  type?: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  aspectRatio = "landscape",
  showRoute = true,
  className = "",
  type = "",
}) => {
  const getImageHeightClass = () => {
    switch (aspectRatio) {
      case "square":
        return "h-48 sm:h-56";
      case "portrait":
        return "h-64 sm:h-72";
      case "landscape":
      default:
        return "h-48 sm:h-56 lg:h-60";
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className={`group ${className}`}
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
              {(type !== "trending" && pkg.trending) && (
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
                <ArrowRight
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Mobile Arrow Icon */}
            <div className="absolute bottom-3 right-3 sm:hidden">
              <div className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                <ArrowRight
                  className="w-4 h-4 text-foreground"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6">
            {/* Route Information */}
            {showRoute && (
              <div className="flex items-center space-x-2 mb-3">
                <MapPin
                  className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {pkg.from} → {pkg.to}
                </span>
              </div>
            )}

            {/* Destination */}
            <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2 line-clamp-1">
              {pkg.destination}
            </h3>

            {/* Duration and Date */}
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 text-xs sm:text-sm text-muted-foreground">
              {type !== "upcoming" && (
                <span className="line-clamp-1">{pkg.duration}</span>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" aria-hidden="true" />
                <span className="line-clamp-1">{pkg.date}</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">
                    Starting from
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl font-bold text-primary">
                      {pkg.price}
                    </span>
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
  );
};

export default PackageCard;
