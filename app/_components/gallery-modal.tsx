"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import Image from "next/image";
import { X } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
}

const GalleryModal: React.FC<GallerySectionProps> = ({ images }) => {
  return (
    <>
      <div className="w-full columns-3 px-4 sm:px-6 md:px-12 mb-12">
        {images
          ?.filter((image) => image.url)
          ?.map((item, index) => (
            <SliderModal
              key={item.id}
              item={item}
              itemArr={images}
              uniqueId={`id-${index}`}
            />
          ))}
      </div>
    </>
  );
};

export const SliderModal = ({
  item,
  uniqueId,
  itemArr,
}: {
  item: GalleryImage;
  uniqueId: string;
  itemArr: GalleryImage[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState(item);
  const [constraints, setConstraints] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    const element = carousel.current;
    const viewportHeight = (element as any)?.offsetHeight;
    const viewScrollHeight = (element as any)?.scrollHeight;
    setConstraints(Number(viewportHeight) - Number(viewScrollHeight));
  }, [carousel, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <motion.div
        onClick={() => {
          setIsOpen(true);
          setNewItem(item);
        }}
        className="overflow-hidden mb-3"
      >
        <motion.div layoutId={uniqueId}>
          <Image
            width={400}
            height={400}
            src={item?.url}
            className="bg-white text-black rounded-md w-full cursor-zoom-in"
            alt="img"
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 top-0 left-0  right-0 bottom-0  flex flex-col items-center w-full h-screen justify-center bg-gray-300/60 backdrop-blur-lg cursor-zoom-out"
            onClick={() => {
              setNewItem(null as any);
              setIsOpen(false);
            }}
          >
            <button
              className="absolute top-2 right-2 p-4 border text-white  bg-gray-400/40 backdrop-blur-lg "
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <motion.div
              layoutId={uniqueId}
              className="rounded-md w-fit h-[80%] flex gap-2 items-center mx-auto cursor-auto "
              onClick={(e) => e.stopPropagation()}
            >
              {newItem && (
                <AnimatePresence>
                  {itemArr
                    ?.filter((image) => image.url)
                    ?.map((tab) => (
                      <React.Fragment key={tab.id}>
                        <AnimatePresence mode="popLayout">
                          {tab.id === newItem.id && (
                            <motion.figure
                              key={tab?.id}
                              className="bg-white border rounded-md p-4"
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
                                transition={{ duration: 0.2, delay: 0.2 }}
                              >
                                <Image
                                  src={newItem.url}
                                  width={1000}
                                  height={1000}
                                  alt="preview_img"
                                  className=" object-contain h-[70vh]  mx-auto rounded-md"
                                />
                              </motion.div>
                            </motion.figure>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                </AnimatePresence>
              )}
              <motion.div
                className="h-[300px] overflow-hidden bg-white/40 border rounded-md"
                ref={carousel}
              >
                <motion.div
                  whileDrag={{ scale: 0.95 }}
                  dragElastic={0.2}
                  dragTransition={{ bounceDamping: 30 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="h-fit "
                  drag="y"
                  dragConstraints={{ top: constraints, bottom: 0 }}
                >
                  {itemArr
                    ?.filter((image) => image.url)
                    ?.map((itemData) => {
                      return (
                        <motion.div
                          key={itemData.id}
                          className={`relative p-2   cursor-grab active:cursor-grabbing`}
                          onClick={() => setNewItem(itemData as any)}
                        >
                          <Image
                            src={itemData?.url}
                            width={400}
                            height={400}
                            alt="img"
                            className="sm:w-28 w-52 h-16 object-cover cursor-pointer relative z-[2] rounded-md pointer-events-none"
                          />
                          {itemData?.id === newItem?.id && (
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
                    }
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryModal;
