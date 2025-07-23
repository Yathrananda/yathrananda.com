"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PackageCard from "@/app/_components/package-card";
import { UpcomingPackage } from "@/types/package-detail";
import UpcomingToursCard from "../cards/upcoming-tours-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const UpcomingToursSection: React.FC = () => {
  const [upcomingTours, setUpcomingTours] = useState<UpcomingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingTours = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/packages/upcoming`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming tours");
        }

        const data = await response.json();
        setUpcomingTours(data.packages);
      } catch (err) {
        console.error("Error fetching upcoming tours:", err);
        setError("Failed to load upcoming tours");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingTours();
  }, []);

  if (isLoading) {
    return (
      <section className="pt-12 pb-6 sm:py-16 lg:py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-muted rounded mb-4"></div>
            <div className="h-4 w-64 bg-muted rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-lg p-4 space-y-3">
                  <div className="h-48 bg-muted rounded"></div>
                  <div className="h-4 w-3/4 bg-muted rounded"></div>
                  <div className="h-4 w-1/2 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return null; // Hide section completely if there's an error
  }

  if (upcomingTours.length === 0) {
    return null; // Hide section if no tours available
  }

  return (
    <section
      className="pt-12 pb-6 sm:pb-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 bg-background"
      aria-labelledby="upcoming-tours-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <div>
            <motion.h2
              id="upcoming-tours-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Upcoming Tours
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              Don't miss out on these exciting upcoming adventures
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/upcoming-tours">
              <motion.button
                className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-sm flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="View all upcoming tours"
              >
                <span className="text-sm sm:text-base">View All</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {upcomingTours.map((tour) => (
            <UpcomingToursCard key={tour.id} data={tour} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingToursSection;
