"use client"
import { motion } from "framer-motion"
import { CreditCard, MessageCircle } from "lucide-react"
import type { BookingInfo, ContactInfo } from "@/types/package-detail"

interface BookingInfoProps {
  bookingInfo: BookingInfo
  contact: ContactInfo
  packageTitle: string
}

export function BookingInfoSection({ bookingInfo, contact, packageTitle }: BookingInfoProps) {
  const handleBookNow = () => {
    const message = encodeURIComponent(
      `Hi! I would like to book the ${packageTitle} package. Please provide booking details.`,
    )
    window.open(`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`, "_blank")
  }

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(`Hi! I have some questions about the ${packageTitle} package. Can you help me?`)
    window.open(`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`, "_blank")
  }

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Booking Information</h2>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Payment Details
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Advance Payment:</span>
                <span className="text-sm text-primary font-semibold">{bookingInfo.advancePayment}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Balance Payment:</span>
                <span className="text-sm text-primary font-semibold">{bookingInfo.balancePayment}</span>
              </div>
            </div>

            {/* Booking Rules */}
            <div>
              <h4 className="font-medium text-foreground mb-2">Booking Rules:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {bookingInfo.bookingRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-center gap-4">
            <motion.button
              onClick={handleBookNow}
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-primary-hover shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CreditCard className="w-5 h-5" />
              Book Now
            </motion.button>

            <motion.button
              onClick={handleWhatsAppInquiry}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-green-700 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Inquiry
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
