import Image from 'next/image'
import { motion } from 'framer-motion'

interface ItineraryDayProps {
  day: number
  title: string
  route: string
  mealPlan: string
  activities: string[]
  notes: string
  images: Array<{ url: string; alt: string }>
}

export function ItineraryDay({ day, title, route, mealPlan, activities, notes, images }: ItineraryDayProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">Day {day}: {title}</h3>
        <p className="text-muted-foreground mb-4">{route} • {mealPlan}</p>
        
        {/* Activities */}
        <ul className="space-y-2 mb-6">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                {index + 1}
              </span>
              {activity}
            </li>
          ))}
        </ul>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Notes */}
        {notes && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">{notes}</p>
          </div>
        )}
      </div>
    </div>
  )
} 