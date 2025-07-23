// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
import { UpcomingPackage } from "@/types/package-detail";
import { useRouter } from "next/navigation";
import PackageCard from "./package-card";
import { motion } from "motion/react";
import Image from "next/image";


function FramerCarousel({
  items
}: {
  items: UpcomingPackage[]
}) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(items[0]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        ref={carousel}
        drag="x"
        whileDrag={{ scale: 0.95 }}
        dragElastic={0.2}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex will-change-transform cursor-grab active:cursor-grabbing"
      >
        {items?.map((tour) => {
          return (
            <motion.div key={tour.id} className="min-w-[20rem] min-h-[25rem] p-2">
              <div className="relative w-full h-full" onClick={() => {
                router.push(`/packages/${tour.id}`)
              }}>
                <Image
                  src={tour.hero_image_url}
                  width={400}
                  height={400}
                  alt='img'
                  className='w-full h-full object-cover pointer-events-none  rounded-xl'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-md pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-semibold mb-1 line-clamp-1">{tour.title}</h3>
                    <p className="text-sm text-gray-200 mb-2">{tour.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">₹{tour.price.toLocaleString()}</span>
                      <span className="text-sm bg-white/20 px-2 py-1 rounded">{tour.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default FramerCarousel;
