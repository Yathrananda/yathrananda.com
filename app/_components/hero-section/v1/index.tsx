"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  image: string;
  blurHash: string;
  rating: number;
  height: number;
  description: string;
}

interface HeroMedia {
  id: string;
  url: string;
  type: "image" | "video";
  carousel_order: number;
}

const destinations: Destination[] = [
  {
    id: "genting",
    name: "Plan. Book. Explore.",
    image: "/images/group1.jpg?height=400&width=260",
    blurHash:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABWdJREFUWEeFl19vHEUQxLtn1t8x/LMxcSzxkhd4QDrbIhEEQiwQLzwgIfiYvtudGVRV3btrx1JyGu1dnLh/U1XT0+df3v833N3czSZ3q6XYWXE7w7MWm/i5WC1ukxcr7lx42TAbXMN6H7ZgNTy7za3bqTU74tk7n8fe7NSHnUa3eQxrY5gLwKwYirtNXCq6AQjsOQBA9ABoBOg2rwBZXCDHrs+nMWwZ3towAPw73Iy7qr4DqIIATELhPRXg/vG/LFQYhuIE6J0qzK3Zad39UwBADmtm5l99+GfgdxUz7XKnQCoxwQrXz0rYgPKAgPywARYIQvJDBVgACO4e72EFVRg2pwLnH/4e2EgqIBu23UuFyuIArJkDbh8YG0DH7kOFzIAAdgpAFWQAsMjA+W9/rRYAQjuNRRtQXJ9RHICwii/VDxU2BfYhfASwqjCoEDNw8f7Pkb+MBfYAUTxVUHFBMAcRA3jAICLZzAB22LaTsOxUgBqwIAG+/vVeAKbjlWmX7Cn/TgUqoX9bEoA2AKBHEBshlIFmp6XZw84KhTMsuHz3Cy1AL0DANhVQdL/ChugJtMGVAv3pqwItdq+T0Oy4IAN4dntYT4cs829+fiMAKoBjBggVrgGgHEgFBjFyUArPAUGGdaoACwCwEELFqQAhesBAnVDg5U+HFQDOonjxKE6QaS1OiBoAGUYXABQgwGjKQQCg+HFZWJgQzAMAdGL86u33zAA0oAIWAK7CFQBe7azuVKjqmgzjHoA2PFZAAIJ4mBMA1qh1+6s3r3EY4qXigKg+hRUASRWkwFTVMWFBKegh+BVQoAPBeloA+Zt2f5wXKpAQqwLXP37LRqTbIBQwFN9WAkgFABSrVAHd08wLmumwQQhYsGXgFPInwHGWFVKgm1/fXT1SwGGBTVYCYKIVTxWQCrIhALzrJOwVaIsUoPSyQAqoRdOC69tLKoDdQwUWj5UqCALyV11QYQNUoAVQoDwPMH8a4FwKDAFQgSEIAlgqIAhe0SuALBDA0FG0xiAufeEx/DTADQDQ05UBH2FBqpAAOJIfKWBW6wbAo2jo8coB2jEykDl41oJXh4vNAkJAAamA3aMvQAkcxU0BjyCGAhW9QCeBLwAMNSK1YuWAfWDNQITw6nDJRkT5AcCVAHWFEMA2JTGE2D0VUBB5FANgGbgPtrtga0TqBbiu1YgOOgXGdrQHKFapAhTAQFK3q/pJBvwpgKkT4pjlhaRmFI1ogToYy4b5y0P0AQBwlbBATyUiIXJOiCMYvYB9gAooiI05EARvvvVCwl2gNkwF8F8uD69lwQrgVgihVQeSEHMClYD/u1acfaDgV8ACmsChk4NJQKxjGe+C/Txw+C5CiN3DRhQWROVSa5ISGtdwFWcTQgZ4GYUCkQLKC4gEyNFcigAgbsOLmx8EQAX0LD0BXAAAQXGckZiety6IuWBoqnV1AqyFOdDwyVE8JuQcRgSAqfjmNiyI4ty9EULFtSYqsQOIiUgB1Hw6HgGEAmMQAAXXiRjXNa9ufC+4fQvbdCGjMBUwq1RBz7U4PkMBXt2apLP4BqB2tIQK+AbEEZ0gAUN7AuCL23dhQQLk7lHcpEA+8d1Bh1U3B0aynMvcrEMBPBMAxS1sIAi+luGzAHB7+Oe37yOEAcBiARHvpwCgIuu1peI8QWojXLwN3KyhMECi4IkgAlBAA+Czu/tVAXrP4rn7eAYI1ODP49rK4nGKA8AIIAu0WDieUkRfyzDG+4u73zUTqo+E71BhSPodDPJBdTIzOROvu4cN2D0gorhZ2JB26AmFaMGLuz8+UgBFyxhG6fcA/PuYnWKOgg14SwtYWPLjSQvCinkHksoA4H8u73Zj+fM9iAAAAABJRU5ErkJggg==",
    rating: 4,
    height: 400,
    description:
      "Welcome to Yathrananda, where every expedition blossoms into a vibrant collection of unforgettable experiences and dreams come true. Our dedicated team of travel professionals is here to craft not just vacations, but extraordinary journeys tailored to your vision. Each destination holds a world of potential, ready to enrich your unique adventure. Let us guide you in creating lasting memories that fuel your passion for exploration and elevate your life.",
  },
  {
    id: "batu",
    name: "Travel. Simplified.",
    image: "/images/group2.jpg?height=300&width=260",
    blurHash:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABTZJREFUWEeNl72OXEUQhav63hm8whLIPAA5ES8AKSFELD/GrCBhgUX8C2xsbwQRiUlIHBCAkBDOiEiQEC/F3tuFzqmq7r47K2Cl3p4ZzUx9fepUVY+eP/rLRFT8r4g/jt2wFxFTf4fF+8xEjC/EJ01URVTVV8GapJTCXafZ93FpwQdEHQB/+PJcCDrAIHCDYNz8J+pP/JOAQHBF4CI6ASICbyAK34NP6fmvfx4C5Mnj9Px6QgRqAqQKCJwAVCAAePqAGAF4ekAA4Jc//gUAQTMdHYAgNsgfEmxTUPz0ExSYYw81GDxT8PPvlwAO8+8+CA/EuwHgf5F/QkT+VaUwcHigzPG8A0AB98CPvx2aMFJglP2yAngtgvOT/nHkn18YEJ5794EbMo3oUHyvFNH7PzzaAtDpaUKvgFwUnUrE4VsVBAANeFUVJITvnv9Q4P7Dn3oK2mk7QFMhTMjnIX1i8JVWAR0ACngqDkuwA3z/0AH4xS65pQIAMhWLPSuhCTAQZB8Q9gCvgtYHmIKEyNNHFdx78N2gwCA/QBg4IGoCAigjRwMYFRgA0oQ9ePhiTMG9b78xz2kaLgLXDI7noUz4YQRI4ZB7TwNOHypEJWwAInhLwd2v72wV4IknT0VAUImaINn7eiPu3TvzD/f3ZnRZfnbKNOHd87PmgZb76gBSJ08Dgw8A8EU04FSAdcgGd6iAl+FWfodQ0a9u37LRgDw5FABEA3AQgw8YHD7QPpsiuBsQIHn6rILoijpCoA+o6J1PXowUZM4z8ACxUSKCxxiyyD13Bs/8+0T0asg+EGDpAzjv9tnzAwCkR+CZywx7AAUEfMHTxzB2X4YaAwBUKPRBH8vbNIQCX77zjHdCGg9r56v6MsIgBZMY9up9oSZAjohBga5CKDCM5ZKjmq1YRb94+wnzfr8Xscf6qni830DUpoJK5Z1EHSS6NYxo6YOpT8OcimhMfNxKUUU/v9W8FAo8KWLXRe1IrEHMVMIVKFItAEwCRKT1qUxDTkOcngrkRCxSYMYcXJ+93keLMrGTqNwghNRrVMSYjllq9IaKNFQENwJw1+hnAcBKyOCTB+dE5O59gBCfvjIAsLYnUXtKRB4XMQegFwYPVARfPfBaK3cLCG+oQydk8FxQYx56gop+fNxT4FfPG6JyXUSORBFcYEQYM+RHcAKY1FodgBABAhlhSFQAFZilzLtLEHkxUdGPXp5MZBbVIw+KpddEBcH3BMgKcenVg69VVqy6Sl1XghggIGg2owYQEPOgRKbhw+On8QlxiJ2o7kVl77vu+DpPj9rP3K/mwRF4DQDsUAJ1ESXJ29A8ywQFEHzeyRR+aBfXD46fNU4yXI8IgKsT9ngsE33RARA8FFhWWZdFFkIshDLXwNtxA5il7HYyESJUyHZ99upzPoxZGn6DLYSAIrMoAXBJCecz/3F6AFwssi6rLOvCVNCQBNArARpEArz/2gu81npZ5NRyANSrAKoBwHg4vTEoTx8Qy+IAawUAsuojmSfeeRqm2MuccVT0vZsvsRX7ZbIDtBlOiJiCqHkCIHjl6RF4iR2vwQcEwLwPAAZGCnaeAqqAKsGh333jOBTQPrXGn1T8CYXlt/EOsMpygeUQmQqvhugF+J55asEJQR94d+ShT9+8yV99TYH2UyrUiJsLfwHg9FSgNvkJEItpSQB8+RUKpApQgIPp9OTEU1BSAYxR71Z+q/X7+xYAKRgUuLhwNZYoRUjAZnSFAvRBKIDvPz15q5sw7vHet/8HAPL/d1eAhvxPBZCGnoJ/AFHy9c5MDyc8AAAAAElFTkSuQmCC",
    rating: 5,
    height: 300,
    description:
      "Welcome to Yathrananda, where every expedition blossoms into a vibrant collection of unforgettable experiences and dreams come true. Our dedicated team of travel professionals is here to craft not just vacations, but extraordinary journeys tailored to your vision. Each destination holds a world of potential, ready to enrich your unique adventure. Let us guide you in creating lasting memories that fuel your passion for exploration and elevate your life.",
  },
  {
    id: "putrajaya",
    name: "Travel. Simplified.",
    image: "/images/group3.jpg?height=300&width=260",
    blurHash:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABWdJREFUWEeFl19vHEUQxLtn1t8x/LMxcSzxkhd4QDrbIhEEQiwQLzwgIfiYvtudGVRV3btrx1JyGu1dnLh/U1XT0+df3v833N3czSZ3q6XYWXE7w7MWm/i5WC1ukxcr7lx42TAbXMN6H7ZgNTy7za3bqTU74tk7n8fe7NSHnUa3eQxrY5gLwKwYirtNXCq6AQjsOQBA9ABoBOg2rwBZXCDHrs+nMWwZ3towAPw73Iy7qr4DqIIATELhPRXg/vG/LFQYhuIE6J0qzK3Zad39UwBADmtm5l99+GfgdxUz7XKnQCoxwQrXz0rYgPKAgPywARYIQvJDBVgACO4e72EFVRg2pwLnH/4e2EgqIBu23UuFyuIArJkDbh8YG0DH7kOFzIAAdgpAFWQAsMjA+W9/rRYAQjuNRRtQXJ9RHICwii/VDxU2BfYhfASwqjCoEDNw8f7Pkb+MBfYAUTxVUHFBMAcRA3jAICLZzAB22LaTsOxUgBqwIAG+/vVeAKbjlWmX7Cn/TgUqoX9bEoA2AKBHEBshlIFmp6XZw84KhTMsuHz3Cy1AL0DANhVQdL/ChugJtMGVAv3pqwItdq+T0Oy4IAN4dntYT4cs829+fiMAKoBjBggVrgGgHEgFBjFyUArPAUGGdaoACwCwEELFqQAhesBAnVDg5U+HFQDOonjxKE6QaS1OiBoAGUYXABQgwGjKQQCg+HFZWJgQzAMAdGL86u33zAA0oAIWAK7CFQBe7azuVKjqmgzjHoA2PFZAAIJ4mBMA1qh1+6s3r3EY4qXigKg+hRUASRWkwFTVMWFBKegh+BVQoAPBeloA+Zt2f5wXKpAQqwLXP37LRqTbIBQwFN9WAkgFABSrVAHd08wLmumwQQhYsGXgFPInwHGWFVKgm1/fXT1SwGGBTVYCYKIVTxWQCrIhALzrJOwVaIsUoPSyQAqoRdOC69tLKoDdQwUWj5UqCALyV11QYQNUoAVQoDwPMH8a4FwKDAFQgSEIAlgqIAhe0SuALBDA0FG0xiAufeEx/DTADQDQ05UBH2FBqpAAOJIfKWBW6wbAo2jo8coB2jEykDl41oJXh4vNAkJAAamA3aMvQAkcxU0BjyCGAhW9QCeBLwAMNSK1YuWAfWDNQITw6nDJRkT5AcCVAHWFEMA2JTGE2D0VUBB5FANgGbgPtrtga0TqBbiu1YgOOgXGdrQHKFapAhTAQFK3q/pJBvwpgKkT4pjlhaRmFI1ogToYy4b5y0P0AQBwlbBATyUiIXJOiCMYvYB9gAooiI05EARvvvVCwl2gNkwF8F8uD69lwQrgVgihVQeSEHMClYD/u1acfaDgV8ACmsChk4NJQKxjGe+C/Txw+C5CiN3DRhQWROVSa5ISGtdwFWcTQgZ4GYUCkQLKC4gEyNFcigAgbsOLmx8EQAX0LD0BXAAAQXGckZiety6IuWBoqnV1AqyFOdDwyVE8JuQcRgSAqfjmNiyI4ty9EULFtSYqsQOIiUgB1Hw6HgGEAmMQAAXXiRjXNa9ufC+4fQvbdCGjMBUwq1RBz7U4PkMBXt2apLP4BqB2tIQK+AbEEZ0gAUN7AuCL23dhQQLk7lHcpEA+8d1Bh1U3B0aynMvcrEMBPBMAxS1sIAi+luGzAHB7+Oe37yOEAcBiARHvpwCgIuu1peI8QWojXLwN3KyhMECi4IkgAlBAA+Czu/tVAXrP4rn7eAYI1ODP49rK4nGKA8AIIAu0WDieUkRfyzDG+4u73zUTqo+E71BhSPodDPJBdTIzOROvu4cN2D0gorhZ2JB26AmFaMGLuz8+UgBFyxhG6fcA/PuYnWKOgg14SwtYWPLjSQvCinkHksoA4H8u73Zj+fM9iAAAAABJRU5ErkJggg==",
    rating: 5,
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
              fill="#FBC02D"
            />
          ) : (
            <path
              d="M20 7.24L12.81 6.62L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27L16.18 19L14.55 11.97L20 7.24ZM10 13.4L6.24 15.67L7.24 11.39L3.92 8.51L8.3 8.13L10 4.1L11.71 8.14L16.09 8.52L12.77 11.4L13.77 15.68L10 13.4Z"
              fill="#FBC02D"
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
  const [heroMedia, setHeroMedia] = useState<HeroMedia[]>([]);
  const [heroCurrentIndex, setHeroCurrentIndex] = useState(0);
  const [heroLoading, setHeroLoading] = useState(true);
  const [heroError, setHeroError] = useState<string | null>(null);

  // Fetch hero media from API
  useEffect(() => {
    const fetchHeroMedia = async () => {
      try {
        setHeroLoading(true);
        setHeroError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/hero`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.media && Array.isArray(data.media)) {
          // Sort by carousel_order
          const sortedMedia = data.media.sort(
            (a: HeroMedia, b: HeroMedia) => a.carousel_order - b.carousel_order
          );
          setHeroMedia(sortedMedia);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (error) {
        console.error("Error fetching hero media:", error);
        setHeroError(
          error instanceof Error ? error.message : "Failed to fetch hero media"
        );
        // Fallback to default image
        setHeroMedia([
          {
            id: "fallback",
            url: "/images/group1.jpg?height=1000&width=1800",
            type: "image",
            carousel_order: 0,
          },
        ]);
      } finally {
        setHeroLoading(false);
      }
    };

    fetchHeroMedia();
  }, []);

  // Auto-advance hero carousel
  useEffect(() => {
    if (heroMedia.length <= 1) return;

    const interval = setInterval(() => {
      setHeroCurrentIndex((prev) => (prev + 1) % heroMedia.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [heroMedia.length]);

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

  const handleHeroPrevious = () => {
    setHeroCurrentIndex((prev) => (prev > 0 ? prev - 1 : heroMedia.length - 1));
  };

  const handleHeroNext = () => {
    setHeroCurrentIndex((prev) => (prev + 1) % heroMedia.length);
  };

  const currentDestination = destinations[currentIndex];
  const currentHeroMedia = heroMedia[heroCurrentIndex];

  return (
    <section className="h-[55em] sm:h-[65em] md:h-[65em] lg:h-screen section py-[10vh] relative overflow-hidden pl-12 rounded-sm">
      {/* Hero Background Carousel */}
      <div className="absolute h-full top-0 left-0 bottom-0 right-0 -z-[10]">
        {heroLoading ? (
          <div className="h-full w-full bg-gray-800 flex items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        ) : heroError ? (
          <div className="h-full w-full bg-gray-800 flex items-center justify-center">
            <div className="text-white">Error loading media</div>
          </div>
        ) : (
          <>
            {currentHeroMedia && (
              <>
                {currentHeroMedia.type === "image" ? (
                  <Image
                    alt="Hero background"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,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"
                    loading="eager"
                    width={1800}
                    height={1000}
                    className="object-cover object-center h-full w-full brightness-75"
                    src={currentHeroMedia.url}
                  />
                ) : (
                  <video
                    autoPlay
                    muted
                    loop
                    className="object-cover object-center h-full w-full brightness-75"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <source src={currentHeroMedia.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </>
            )}

            {heroMedia.length > 1 && (
              <>
                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
                  {heroMedia.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setHeroCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === heroCurrentIndex ? "bg-white" : "bg-white/50"
                      }`}
                      aria-label={`Go to hero media ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
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
                        width={500}
                        height={700}
                        blurDataURL={destination.blurHash}
                        loading="eager"
                        placeholder="blur"
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
