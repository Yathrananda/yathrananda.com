"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  image: string;
  rating: number;
  height: number;
  description: string;
}

const destinations: Destination[] = [
  {
    id: "genting",
    name: "Plan. Book. Explore.",
    image: "/placeholder.svg?height=400&width=260",
    rating: 4,
    height: 400,
    description:
      "Welcome to Yathrananda, where every expedition blossoms into a vibrant collection of unforgettable experiences and dreams come true. Our dedicated team of travel professionals is here to craft not just vacations, but extraordinary journeys tailored to your vision. Each destination holds a world of potential, ready to enrich your unique adventure. Let us guide you in creating lasting memories that fuel your passion for exploration and elevate your life.",
  },
  {
    id: "batu",
    name: "Travel. Simplified.",
    image: "/placeholder.svg?height=300&width=260",
    rating: 4,
    height: 300,
    description:
      "Welcome to Yathrananda, where every expedition blossoms into a vibrant collection of unforgettable experiences and dreams come true. Our dedicated team of travel professionals is here to craft not just vacations, but extraordinary journeys tailored to your vision. Each destination holds a world of potential, ready to enrich your unique adventure. Let us guide you in creating lasting memories that fuel your passion for exploration and elevate your life.",
  },
  {
    id: "putrajaya",
    name: "Travel. Simplified.",
    image: "/placeholder.svg?height=300&width=260",
    rating: 4,
    height: 300,
    description:
      "Welcome to Yathrananda, where every expedition blossoms into a vibrant collection of unforgettable experiences and dreams come true. Our dedicated team of travel professionals is here to craft not just vacations, but extraordinary journeys tailored to your vision. Each destination holds a world of potential, ready to enrich your unique adventure. Let us guide you in creating lasting memories that fuel your passion for exploration and elevate your life.",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          width="18"
          height="17"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {index < rating ? (
            <path
              d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z"
              fill="#ffffff"
            />
          ) : (
            <path
              d="M20 7.24L12.81 6.62L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27L16.18 19L14.55 11.97L20 7.24ZM10 13.4L6.24 15.67L7.24 11.39L3.92 8.51L8.3 8.13L10 4.1L11.71 8.14L16.09 8.52L12.77 11.4L13.77 15.68L10 13.4Z"
              fill="#ffffff"
            />
          )}
        </svg>
      ))}
    </div>
  );
};

export default function TopDestinationsHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : destinations.length - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev < destinations.length - 1 ? prev + 1 : 0));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const currentDestination = destinations[currentIndex];

  return (
    <section className="h-[55em] sm:h-[65em] md:h-[65em] lg:h-screen section py-[10vh] relative overflow-hidden pl-12 rounded-sm">
      <div className="absolute h-full top-0 left-0 bottom-0 right-0 -z-[10]">
        <Image
          alt={currentDestination.name}
          priority
          loading="eager"
          width={1800}
          height={1000}
          className="object-cover object-center h-full w-full brightness-75"
          src="/placeholder.svg?height=1000&width=1800"
        />
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-primary mb-5 md:mb-10 font-semibold text-white relative z-10">
        India&apos;s #1 Travel Experts
      </h2>

      <div className="flex flex-col lg:flex-row-reverse w-full lg:items-center lg:gap-5 mt-5 justify-center relative z-10">
        <div className="w-full lg:w-[45%] h-full">
          <div className="relative w-full overflow-hidden min-h-[350px] md:min-h-[450px] flex items-center">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 275}px)`,
                width: `${destinations.length * 275}px`,
              }}
            >
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="flex-shrink-0 mr-[15px]"
                  style={{ width: "260px" }}
                >
                  <div className="w-[260px] flex flex-col gap-1 overflow-hidden h-full">
                    <div
                      className="w-full overflow-hidden mb-1 rounded-xl"
                      style={{ height: `${destination.height}px` }}
                    >
                      <Image
                        alt={destination.name}
                        loading="eager"
                        width={500}
                        height={700}
                        className="h-full w-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                        src={destination.image || "/placeholder.svg"}
                      />
                    </div>
                    <StarRating rating={destination.rating} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-white flex flex-col lg:w-[55%] h-full relative z-10">
          <h3
            className="uppercase font-extrabold text-[2rem] sm:text-[4.5rem] w-fit transition-opacity duration-300"
            style={{
              opacity: isTransitioning ? 0.7 : 1,
              willChange: "transform",
              transform: "none",
            }}
          >
            {currentDestination.name}
          </h3>
          <p
            className="text-sm sm:text-base h-fit transition-opacity duration-300"
            style={{
              opacity: isTransitioning ? 0.7 : 1,
              willChange: "transform",
              transform: "none",
            }}
          >
            {currentDestination.description}
          </p>
          <button
            className="bg-primary hover:bg-primary-hover transition-all mt-5 w-fit border-0 rounded-sm"
            style={{
              opacity: 1,
              willChange: "transform",
              transform: "none",
            }}
          >
            <Link
              className="h-full w-full px-6 py-3 flex items-center justify-center gap-2"
              href="/malaysia"
            >
              Explore
              <ArrowRight className="w-6 h-6" />
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
