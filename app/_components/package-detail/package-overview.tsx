"use client"
import { motion } from "framer-motion"
import { Mountain, Compass, Users, Heart } from "lucide-react"
import type { PackageHighlight } from "@/types/package-detail"

interface PackageOverviewProps {
  overview: string
  highlights: PackageHighlight[]
}

const iconMap = {
  nature: Mountain,
  adventure: Compass,
  family: Users,
  culture: Heart,
}

export function PackageOverview({ overview, highlights }: PackageOverviewProps) {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Overview</h2>

      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{overview}</p>
      </div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {highlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon as keyof typeof iconMap] || Mountain

            return (
              <motion.div
                key={highlight.id}
                className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{highlight.label}</span>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.section>
  )
}
