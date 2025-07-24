import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ItineraryDay } from "@/types/package-detail";
import ProgressiveCarousel from "./package-detail/progressive-carousel";
import { Info, MapPin, Utensils } from "lucide-react";

const HorizontalScrollSection: React.FC<{
  items: ItineraryDay[];
  activities_display_type: "points" | "description";
}> = ({ items, activities_display_type }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${items.length * 100}%`]
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(items.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-screen w-[100vw]">
          {items.map((day, index) => (
            <div
              key={index}
              className="w-screen h-screen flex-shrink-0 relative"
            >
              <div
                key={day.day}
                className="w-full h-full snap-start flex flex-col lg:flex-row mb-12"
              >
                {/* TEXT - 2/3 */}
                <div className="lg:basis-2/3 flex items-center justify-center p-6 lg:p-12">
                  <div className="w-full space-y-6 pl-4 md:pl-8">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">
                          Day {day.day} {day.route ? `- ${day.route}` : null}
                        </span>
                        <div className="h-px bg-gray-200 flex-1" />
                      </div>
                      <h1 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                        {day.title}
                      </h1>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 rounded-lg">
                          <Utensils className="h-5 w-5 text-orange-600" />
                        </div>
                        <h2 className="text-lg font-medium text-gray-900">
                          Meal Plan
                        </h2>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-lg pl-11">
                        {day.mealPlan}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-medium text-gray-900">
                          Today's Journey
                        </h2>
                      </div>
                      {activities_display_type === "points" ? (
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
                      ) : (
                        <>
                          {day.activities.map((activity, index) => (
                            <p key={index} className="text-gray-600 leading-relaxed text-lg pl-11 whitespace-pre-line">
                              {activity}
                            </p>
                          ))}
                        </>
                      )}
                    </div>
                    {day.notes && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Info className="h-5 w-5 text-gray-600" />
                          </div>
                          <h2 className="text-lg font-medium text-gray-900">
                            Special Notes
                          </h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg pl-11">
                          {day.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* IMAGE - 1/3 */}
                <div className="lg:basis-1/3 hidden lg:flex items-center justify-center">
                  <div className="relative w-full max-w-md h-[70vh] rounded-2xl overflow-hidden">
                    <ProgressiveCarousel images={day.images} />
                  </div>
                </div>
                {/* FADED BACKGROUND IMAGE FOR MOBILE */}
                <div className="lg:hidden absolute inset-0 -z-10">
                  <ProgressiveCarousel images={day.images} />
                </div>
              </div>
            </div>
          ))}
          <div className="w-screen h-screen flex-shrink-0 relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground text-center px-6">
              <h2 className="text-4xl md:text-6xl font-semibold mt-20 font-voltaire opacity-70">
                END OF JOURNEY
              </h2>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
