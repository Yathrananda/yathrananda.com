"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PackageCard from "@/app/_components/package-card";
import { UpcomingPackage } from "@/types/package-detail";

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

const InternationalToursSection: React.FC = () => {
  const [internationalTours, setInternationalTours] = useState<
    UpcomingPackage[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInternationalTours = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/packages/international`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch international tours");
        }

        const data = await response.json();
        setInternationalTours(data.packages);
      } catch (err) {
        console.error("Error fetching international tours:", err);
        setError("Failed to load international tours");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInternationalTours();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="flex items-start space-x-3 mb-8">
              <div>
                <div className="h-8 w-48 bg-background rounded mb-2"></div>
                <div className="h-4 w-64 bg-background rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-background rounded-lg p-4 space-y-3">
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

  if (error || internationalTours.length === 0) {
    return null;
  }

  return (
    <section
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-background"
      aria-labelledby="international-tours-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div>
              <motion.h2
                id="international-tours-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                International Tours
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-sm sm:text-base font-shanti"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true }}
              >
                Explore the world beyond borders with our international packages
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/international-tours">
              <motion.button
                className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-sm flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="View all international tours"
              >
                <span className="text-sm sm:text-base">View All</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Tours Grid */}
        {/* <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {internationalTours.map((tour) => (
            <PackageCard 
              key={tour.id} 
              package={tour} 
              aspectRatio="landscape" 
              type="international" 
            />
          ))}
        </motion.div> */}
        <motion.div
          className="overflow-x-auto scrollbar-hide"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex gap-4 sm:gap-6 pb-4 min-w-max">
            {internationalTours.map((tour) => (
              <div
                key={tour.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[350px]"
              >
                <PackageCard
                  key={tour.id}
                  package={tour}
                  aspectRatio="landscape"
                  type="international"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InternationalToursSection;
