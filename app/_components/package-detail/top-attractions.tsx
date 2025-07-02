"use client"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import type { Attraction } from "@/types/package-detail"
import Image from "next/image"

interface TopAttractionsProps {
  attractions: Attraction[]
}

export function TopAttractions({ attractions }: TopAttractionsProps) {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Top Attractions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((attraction, index) => (
          <motion.div
            key={attraction.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{ y: -5 }}
          >
            {attraction.image && (
              <div className="relative h-48 w-full">
                <Image
                  src={attraction.image || "/placeholder.svg"}
                  alt={attraction.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <div className="p-4">
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <h3 className="font-semibold text-foreground">{attraction.name}</h3>
              </div>

              {attraction.description && <p className="text-sm text-muted-foreground">{attraction.description}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
