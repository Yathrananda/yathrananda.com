"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

function FramerCarousel({
  images,
}: {
  images: {
    url: string;
    alt: string;
  }[];
}) {
  const [activeItem, setActiveItem] = useState(0);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel]);

  return (
    <>
      <motion.div
        layoutId={"activeItems"}
        className="rounded-md w-full md:pb-4 gap-2 items-center cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <>
          {images?.filter((item) => item.url).map((tab: any, index) => (
            <Fragment key={tab.url}>
              <AnimatePresence mode="popLayout" initial={false}>
                {index === activeItem && (
                  <motion.figure
                    key={tab?.id}
                    className="bg-gray-100/60 rounded-md md:p-4"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={
                        {
                          opacity: 1,
                          transition: {
                            type: "ease",
                            ease: "easeInOut",
                            duration: 0.3,
                            delay: 0.2,
                          },
                        } as any
                      }
                      exit={
                        {
                          opacity: 0,
                          transition: {
                            type: "ease",
                            ease: "easeInOut",
                            duration: 0.2,
                          },
                        } as any
                      }
                    >
                      <Image
                        src={images[activeItem]?.url}
                        width={1000}
                        height={1000}
                        alt={images[activeItem]?.alt || "Travel Image"}
                        className="object-cover md:object-contain h-28 md:h-96 rounded-md"
                      />
                    </motion.div>
                  </motion.figure>
                )}
              </AnimatePresence>
            </Fragment>
          ))}
        </>
        <motion.div className="w-full mt-1 md:mt-4 md:mx-auto overflow-hidden md:bg-gray-100/60 border md:border-none rounded-md">
          <motion.div
            ref={carousel}
            drag="x"
            dragElastic={0.2}
            dragConstraints={{ right: 0, left: -width }}
            dragTransition={{ bounceDamping: 30 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex  "
          >
            {images?.filter((item) => item.url).map((itemData, index) => {
              return (
                <motion.div
                  key={itemData.url}
                  className={`relative p-2 flex-shrink-0 cursor-pointer`}
                  onClick={() => setActiveItem(index)}
                >
                  <Image
                    src={itemData?.url}
                    width={400}
                    height={400}
                    alt="img"
                    className="w-12 h-8 md:w-28 md:h-16 object-cover cursor-pointer relative z-[2] rounded-md pointer-events-none"
                  />
                  {index === activeItem && (
                    <motion.div
                      layoutId="slider"
                      transition={{
                        layout: {
                          duration: 0.2,
                          ease: "easeOut",
                        },
                      }}
                      className="absolute top-0 left-0 h-full w-full bg-white border rounded-md"
                    ></motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default FramerCarousel;
