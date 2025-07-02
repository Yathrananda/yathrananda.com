"use client"
import { motion } from "framer-motion"
import { MapPin, Utensils, Clock } from "lucide-react"
import type { ItineraryDay } from "@/types/package-detail"

interface PackageItineraryProps {
  itinerary: ItineraryDay[]
}

export function PackageItinerary({ itinerary }: PackageItineraryProps) {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Itinerary</h2>

      <div className="space-y-6">
        {itinerary.map((day, index) => (
          <motion.div
            key={day.day}
            className="bg-card border border-border rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <div className="flex items-start gap-4">
              {/* Day Number */}
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                {day.day}
              </div>

              <div className="flex-1">
                {/* Day Title */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Day {day.day}: {day.title}
                </h3>

                {/* Route */}
                {day.route && (
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{day.route}</span>
                  </div>
                )}

                {/* Meal Plan */}
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Utensils className="w-4 h-4" />
                  <span className="text-sm font-medium">Meals: {day.mealPlan}</span>
                </div>

                {/* Activities */}
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Activities & Sightseeing:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {day.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="text-sm">
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Notes */}
                {day.notes && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{day.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
