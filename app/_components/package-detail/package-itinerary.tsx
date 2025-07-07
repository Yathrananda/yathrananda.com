"use client";
import { motion } from "framer-motion";
import { MapPin, Utensils, Clock, Camera, Expand } from "lucide-react";
import type { ItineraryDay } from "@/types/package-detail";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PackageItineraryProps {
  itinerary: ItineraryDay[];
  activitiesDisplayType: "points" | "description";
}

export function PackageItinerary({
  itinerary,
  activitiesDisplayType,
}: PackageItineraryProps) {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
        Detailed Itinerary
      </h2>

      <div className="space-y-8">
        {itinerary.map((day, index) => (
          <DayItinerary
            key={day.day}
            day={day}
            index={index}
            activitiesDisplayType={activitiesDisplayType}
          />
        ))}
      </div>
    </motion.section>
  );
}

function DayItinerary({
  day,
  index,
  activitiesDisplayType,
}: {
  day: ItineraryDay;
  index: number;
  activitiesDisplayType: "points" | "description";
}) {
  return (
    <motion.div
      id="itinerary"
      className="bg-card border border-border rounded-2xl overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
    >
      {/* Day Header */}
      <div className="border-b border-border bg-muted/30 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
            Day {day.day}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              {day.title}
            </h3>
            {day.route && (
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{day.route}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Image Gallery */}
          {day.images.length > 0 && (
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Day Highlights
                </h4>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <Expand className="w-4 h-4" />
                      View All
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full p-1">
                    <DialogTitle className="sr-only">
                      Day {day.day} Gallery - {day.title}
                    </DialogTitle>
                    <Carousel className="w-full">
                      <CarouselContent>
                        {day.images.map((image, idx) => (
                          <CarouselItem key={idx}>
                            <div className="relative aspect-[16/9]">
                              <Image
                                src={image.url}
                                alt={image.alt}
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  </DialogContent>
                </Dialog>
              </div>

              <Carousel
                className="w-full"
                opts={{
                  align: "start",
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {day.images.map((image, idx) => (
                    <CarouselItem
                      key={idx}
                      className="pl-2 md:pl-4 basis-2/3 md:basis-1/2 lg:basis-1/3"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                      >
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {/* Meal Plan */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Utensils className="w-4 h-4" />
              <span className="text-sm font-medium">Meals: {day.mealPlan}</span>
            </div>

            {/* Activities */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                {/* <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span> */}
                Activities & Sightseeing
              </h4>
              {activitiesDisplayType === "points" && (
                <ul className="space-y-2 text-muted-foreground pl-4">
                  {day.activities.map((activity, actIndex) => (
                    <li
                      key={actIndex}
                      className="text-sm relative before:content-[''] before:absolute before:w-1.5 before:h-1.5 before:bg-muted-foreground before:rounded-full before:-left-4 before:top-[0.4rem]"
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
              )}
              {activitiesDisplayType === "description" && (
                <>
                  {day.activities.map((activity, actIndex) => (
                    <p className="text-muted-foreground" key={actIndex}>
                      {activity}
                    </p>
                  ))}
                </>
              )}
            </div>

            {/* Notes */}
            {day.notes && (
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{day.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
