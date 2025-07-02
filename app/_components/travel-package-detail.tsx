"use client"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { TravelPackageDetailData } from "@/types/package-detail"
import { PackageHeader } from "./package-detail/package-header"
import { PackageOverview } from "./package-detail/package-overview"
import { PackageItinerary } from "./package-detail/package-itinerary"
import { TopAttractions } from "./package-detail/top-attractions"
import { BookingInfoSection } from "./package-detail/booking-info"
import { CancellationPolicySection } from "./package-detail/cancellation-policy"
import { ContactSection } from "./package-detail/contact-section"
import Header from "./header"

interface TravelPackageDetailProps {
  data: TravelPackageDetailData
  backUrl?: string
  backLabel?: string
}

export function TravelPackageDetail({
  data,
  backUrl = "/",
  backLabel = "Back to Home",
}: TravelPackageDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              href={backUrl}
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{backLabel}</span>
            </Link>
          </motion.div>

          <div className="">
            <PackageHeader
              title={data.title}
              subtitle={data.subtitle}
              contact={data.contact}
              price={data.price}
              duration={data.duration}
              groupSize={data.groupSize}
            />

            <PackageOverview overview={data.overview} highlights={data.highlights} />

            <PackageItinerary itinerary={data.itinerary} />

            <TopAttractions attractions={data.topAttractions} />

            <BookingInfoSection bookingInfo={data.bookingInfo} contact={data.contact} packageTitle={data.title} />

            <CancellationPolicySection cancellationPolicy={data.cancellationPolicy} />

            <ContactSection contact={data.contact} />
          </div>
        </div>
      </main>
    </div>
  )
}
