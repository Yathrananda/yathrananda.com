"use client"
import { motion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"
import type { TravelPackageDetailData } from "@/types/package-detail"

interface PackageHeaderProps {
  title: string
  subtitle: string
  contact: TravelPackageDetailData["contact"]
  price?: TravelPackageDetailData["price"]
  duration?: string
  groupSize?: string
}

export function PackageHeader({ title, subtitle, contact, price, duration, groupSize }: PackageHeaderProps) {
  const handleCallNow = () => {
    window.open(`tel:${contact.phone}`, "_self")
  }

  const handleWhatsAppNow = () => {
    const message = encodeURIComponent(`Hi! I'm interested in the ${title} package. Can you provide more details?`)
    window.open(`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`, "_blank")
  }

  return (
    <motion.div
      className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 sm:p-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">{title}</h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4">{subtitle}</p>

          {/* Package Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {duration && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Duration:</span>
                <span>{duration}</span>
              </div>
            )}
            {groupSize && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Group Size:</span>
                <span>{groupSize}</span>
              </div>
            )}
            {price && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Starting from:</span>
                <span className="text-primary font-semibold">
                  {price.currency}
                  {price.amount} {price.per}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 lg:flex-col">
          <motion.button
            onClick={handleCallNow}
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-primary-hover shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="w-4 h-4" />
            Call Now
          </motion.button>

          <motion.button
            onClick={handleWhatsAppNow}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-green-700 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
