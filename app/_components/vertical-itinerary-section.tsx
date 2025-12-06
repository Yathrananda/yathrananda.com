"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ItineraryDay } from "@/types/package-detail";
import ProgressiveCarousel from "./package-detail/progressive-carousel";
import { Info, MapPin, Utensils, Calendar } from "lucide-react";

interface VerticalItinerarySectionProps {
    items: ItineraryDay[];
    activities_display_type: "points" | "description";
}

const VerticalItinerarySection: React.FC<VerticalItinerarySectionProps> = ({
    items,
    activities_display_type,
}) => {
    const [modalDayIndex, setModalDayIndex] = useState<number | null>(null);
    const shouldReduceMotion = useReducedMotion();

    // Lock body scroll when modal is open
    useEffect(() => {
        if (modalDayIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [modalDayIndex]);

    const ActivitiesModal = ({
        day,
        onClose,
    }: {
        day: ItineraryDay;
        onClose: () => void;
    }) => {
        const modalRef = useRef<HTMLDivElement>(null);

        // Handle escape key
        useEffect(() => {
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape") onClose();
            };
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }, []);

        // Focus trap
        useEffect(() => {
            const modal = modalRef.current;
            if (!modal) return;

            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[
                focusableElements.length - 1
            ] as HTMLElement;

            const handleTab = (e: KeyboardEvent) => {
                if (e.key !== "Tab") return;

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus();
                    }
                }
            };

            modal.addEventListener("keydown", handleTab as any);
            firstElement?.focus();

            return () => modal.removeEventListener("keydown", handleTab as any);
        }, []);

        return (
            <div
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <motion.div
                    ref={modalRef}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden relative"
                >
                    <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-6 pb-4 z-10">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h2
                            id="modal-title"
                            className="text-2xl font-bold font-cuprum pr-12 text-gray-900"
                        >
                            Day {day.day} - {day.title}
                        </h2>
                        {day.route && (
                            <p className="text-sm text-gray-600 mt-1 font-shanti">
                                {day.route}
                            </p>
                        )}
                    </div>
                    <div className="p-6 pt-4 overflow-y-auto max-h-[calc(90vh-120px)] scroll-smooth">
                        {activities_display_type === "points" ? (
                            <ul className="space-y-3 text-gray-700">
                                {day.activities.map((activity, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3 text-base font-shanti leading-relaxed group"
                                    >
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-semibold mt-0.5 group-hover:scale-110 transition-transform">
                                            {idx + 1}
                                        </span>
                                        <span className="flex-1">{activity}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="space-y-4">
                                {day.activities.map((activity, index) => (
                                    <p
                                        key={index}
                                        className="text-gray-700 leading-relaxed text-base whitespace-pre-line font-shanti p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                                    >
                                        {activity}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    };

    return (
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white">
            {/* Modal */}
            {modalDayIndex !== null && items[modalDayIndex] && (
                <ActivitiesModal
                    day={items[modalDayIndex]}
                    onClose={() => setModalDayIndex(null)}
                />
            )}

            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-cuprum">
                        Your Journey Itinerary
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-shanti">
                        Discover the detailed day-by-day plan for your adventure
                    </p>
                </motion.div>
            </div>

            {/* Timeline Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative">
                    {/* Timeline Line - Hidden on mobile */}
                    <div
                        className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-white via-gray-200 to-white top-0 bottom-0"
                        aria-hidden="true"
                    />

                    {/* Itinerary Days */}
                    <div className="space-y-12 md:space-y-16">
                        {[...items].sort((a, b) => a.day - b.day).map((day, index) => (
                            <DayCard
                                key={day.day}
                                day={day}
                                index={index}
                                activities_display_type={activities_display_type}
                                onViewDetails={() => setModalDayIndex(index)}
                                shouldReduceMotion={shouldReduceMotion}
                            />
                        ))}
                    </div>

                    {/* End of Journey Marker */}
                    <motion.div
                        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                        whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-16 text-center relative z-20"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg">
                            <svg
                                className="w-10 h-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 className="mt-4 text-3xl font-bold text-gray-900 font-voltaire">
                            Journey Complete
                        </h3>
                        <p className="mt-2 text-gray-600 font-shanti">
                            Ready to create unforgettable memories?
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

interface DayCardProps {
    day: ItineraryDay;
    index: number;
    activities_display_type: "points" | "description";
    onViewDetails: () => void;
    shouldReduceMotion: boolean | null;
}

const DayCard: React.FC<DayCardProps> = ({
    day,
    index,
    activities_display_type,
    onViewDetails,
    shouldReduceMotion,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.article
            ref={ref}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 50 }}
            animate={
                shouldReduceMotion ? {} : isInView ? { opacity: 1, y: 0 } : {}
            }
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
        >
            {/* Desktop Layout - Image Left, Content Right */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                {/* Left Side - Image (5 columns) */}
                <div className="lg:col-span-5">
                    <DayImage images={day.images} />
                </div>

                {/* Center - Day Badge (2 columns) */}
                <div className="lg:col-span-2 flex justify-center">
                    <DayBadge dayNumber={day.day} />
                </div>

                {/* Right Side - Content (5 columns) */}
                <div className="lg:col-span-5">
                    <DayContent
                        day={day}
                        activities_display_type={activities_display_type}
                        onViewDetails={onViewDetails}
                    />
                </div>
            </div>

            {/* Mobile Layout - Stacked */}
            <div className="lg:hidden">
                <div className="flex items-start gap-4 mb-4">
                    <DayBadge dayNumber={day.day} />
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 font-cuprum">
                            {day.title}
                        </h3>
                        {day.route && (
                            <p className="text-sm text-gray-600 mt-1 font-shanti">
                                {day.route}
                            </p>
                        )}
                    </div>
                </div>
                <DayImage images={day.images} />
                <div className="mt-4">
                    <DayContent
                        day={day}
                        activities_display_type={activities_display_type}
                        onViewDetails={onViewDetails}
                    />
                </div>
            </div>
        </motion.article>
    );
};

const DayBadge: React.FC<{ dayNumber: number }> = ({ dayNumber }) => (
    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(178,100%,33%)] to-[hsl(178,100%,28%)] shadow-lg flex items-center justify-center ring-4 ring-white">
        <div className="text-center">
            <div className="text-xs font-semibold text-white/90 uppercase tracking-wide">
                Day
            </div>
            <div className="text-xl font-bold text-white leading-none">
                {dayNumber}
            </div>
        </div>
    </div>
);

const DayImage: React.FC<{ images: ItineraryDay["images"] }> = ({
    images,
}) => (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl group">
        <ProgressiveCarousel images={images} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
);

interface DayContentProps {
    day: ItineraryDay;
    activities_display_type: "points" | "description";
    onViewDetails: () => void;
}

const DayContent: React.FC<DayContentProps> = ({
    day,
    activities_display_type,
    onViewDetails,
}) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-100">
        {/* Title - Only show on desktop */}
        <div className="hidden lg:block mb-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-2 font-cuprum">
                {day.title}
            </h3>
            {day.route && (
                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-shanti">{day.route}</span>
                </div>
            )}
        </div>

        {/* Meal Plan */}
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                    <Utensils className="h-5 w-5 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 font-cuprum">
                    Meal Plan
                </h4>
            </div>
            <p className="text-gray-700 font-shanti">
                {day.mealPlan}
            </p>
        </div>

        {/* Activities */}
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 font-cuprum">
                    Today's Activities
                </h4>
            </div>
            <div className="max-h-48 overflow-y-auto pr-2 scroll-smooth">
                {activities_display_type === "points" ? (
                    <ul className="space-y-2">
                        {day.activities.slice(0, 6).map((activity, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-2 text-gray-700 font-shanti text-sm"
                            >
                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                <span className="flex-1">{activity}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="space-y-3">
                        {day.activities.slice(0, 3).map((activity, idx) => (
                            <p
                                key={idx}
                                className="text-gray-700 font-shanti text-sm leading-relaxed whitespace-pre-line"
                            >
                                {activity}
                            </p>
                        ))}
                    </div>
                )}
            </div>
            <button
                onClick={onViewDetails}
                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-3 py-2 hover:bg-blue-50"
                aria-label={`View all activities for day ${day.day}`}
            >
                {day.activities.length > (activities_display_type === "points" ? 6 : 3)
                    ? `View All ${day.activities.length} Activities`
                    : "View Full Details"}
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>

        {/* Special Notes */}
        {day.notes && (
            <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Info className="h-5 w-5 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 font-cuprum">
                        Special Notes
                    </h4>
                </div>
                <p className="text-gray-700 font-shanti text-sm">
                    {day.notes}
                </p>
            </div>
        )}
    </div>
);

export default VerticalItinerarySection;
