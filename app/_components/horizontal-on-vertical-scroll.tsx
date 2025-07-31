import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ItineraryDay } from "@/types/package-detail";
import ProgressiveCarousel from "./package-detail/progressive-carousel";
import { Info, MapPin, Utensils } from "lucide-react";

const HorizontalScrollSection: React.FC<{
  items: ItineraryDay[];
  activities_display_type: "points" | "description";
}> = ({ items, activities_display_type }) => {
  const containerRef = useRef(null);
  const [modalDayIndex, setModalDayIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${items.length * 100}%`]
  );

  const ActivitiesModal = ({
    day,
    onClose,
  }: {
    day: ItineraryDay;
    onClose: () => void;
  }) => (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden relative">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 pb-4">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-lg font-semibold font-cuprum pr-8">
            Day {day.day} Activities - {day.title}
          </h2>
        </div>
        <div className="p-6 pt-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          {activities_display_type === "points" ? (
            <ul className="space-y-2 text-gray-700 list-disc pl-5">
              {day.activities.map((activity, idx) => (
                <li key={idx} className="text-sm font-shanti leading-relaxed">
                  {activity}
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-4">
              {day.activities.map((activity, index) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed text-sm whitespace-pre-line font-shanti"
                >
                  {activity}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(items.length + 1) * 100}vh` }}
    >
      {modalDayIndex !== null && items[modalDayIndex] && (
        <ActivitiesModal
          day={items[modalDayIndex]}
          onClose={() => setModalDayIndex(null)}
        />
      )}
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
                <div className="lg:basis-2/3 flex items-center justify-center p-2 lg:p-12">
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
                    <div className="lg:hidden">
                      <ProgressiveCarousel images={day.images} />
                    </div>
                    <div className="md:space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="p-1 md:p-2 bg-orange-50 rounded-lg">
                          <Utensils className="h-3 w-3 md:h-5 md:w-5 text-orange-600" />
                        </div>
                        <h2 className="text-sm md:text-lg font-medium text-gray-900">
                          Meal Plan
                        </h2>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-lg md:pl-11">
                        {day.mealPlan}
                      </p>
                    </div>
                    <div className="md:space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="p-1 md:p-2 bg-blue-50 rounded-lg">
                          <MapPin className="h-3 w-3 md:h-5 md:w-5 text-blue-600" />
                        </div>
                        <h2 className="text-sm md:text-lg font-medium text-gray-900">
                          Today's Journey
                        </h2>
                      </div>
                      
                      {/* Activities Content with Max Height and Scroll */}
                      <div className="h-[25vh] md:h-[30vh] overflow-y-auto pr-2">
                        {activities_display_type === "points" ? (
                          <ul className="space-y-2 text-muted-foreground md:pl-4">
                            {day.activities.slice(0, 10).map((activity, actIndex) => (
                              <li
                                key={actIndex}
                                className="text-xs md:text-sm relative before:content-[''] before:absolute before:w-1.5 before:h-1.5 before:bg-muted-foreground before:rounded-full before:-left-4 before:top-[0.4rem] leading-relaxed"
                              >
                                {activity}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="space-y-3">
                            {day.activities.slice(0, 10).map((activity, index) => (
                              <p
                                key={index}
                                className="text-gray-600 leading-relaxed text-sm md:text-lg md:pl-11 whitespace-pre-line"
                              >
                                {activity}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Read More Button - Show count if more items exist */}
                      <div className="pt-2">
                        <button
                          className="text-blue-600 text-sm hover:text-blue-800 underline focus:outline-none transition-colors"
                          onClick={() => setModalDayIndex(index)}
                        >
                          {day.activities.length > 10 
                            ? `View All ${day.activities.length} Activities` 
                            : "View Full Details"
                          }
                        </button>
                      </div>
                    </div>
                    {day.notes && (
                      <div className="md:space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="p-1 md:p-2 bg-gray-100 rounded-lg">
                            <Info className="h-3 w-3 md:h-5 md:w-5 text-gray-600" />
                          </div>
                          <h2 className="text-sm md:text-lg font-medium text-gray-900">
                            Special Notes
                          </h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-lg md:pl-11">
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
