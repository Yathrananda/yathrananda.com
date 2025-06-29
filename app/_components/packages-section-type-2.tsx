import { HTMLAttributes, useEffect, useRef, useState, JSX } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Search, Star } from "lucide-react";
import Image from "next/image";

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  as?: keyof JSX.IntrinsicElements;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const events = [
  {
    title: "Exploring the Hidden Wonders of the World Adventure",
    duration: "3 days 2 nights",
    rating: "4.8",
    reviews: 4,
    price: "$400",
    image: "/images/destination-1.jpg",
    alt: "Adventure tour exploring hidden natural wonders - Yathrananda travel experience",
  },
  {
    title: "Embark on a Cultural Journey Across Stunning Landscapes",
    duration: "5 days 4 nights",
    rating: "4.9",
    reviews: 8,
    price: "$320",
    image: "/images/destination-2.jpg",
    alt: "Cultural journey through stunning landscapes - Yathrananda travel experience",
  },
  {
    title: "Discover Majestic Mountains and Breathtaking Views",
    duration: "7 days 6 nights",
    rating: "4.8",
    reviews: 12,
    price: "$450",
    image: "/images/destination-3.jpg",
    alt: "Mountain adventure with breathtaking views - Yathrananda travel experience",
  },
  {
    title: "Discover Majestic Mountains and Breathtaking Views",
    duration: "7 days 6 nights",
    rating: "4.8",
    reviews: 12,
    price: "$450",
    image: "/images/destination-1.jpg",
    alt: "Mountain adventure with breathtaking views - Yathrananda travel experience",
  },
  {
    title: "Discover Majestic Mountains and Breathtaking Views",
    duration: "7 days 6 nights",
    rating: "4.8",
    reviews: 12,
    price: "$450",
    image: "/images/destination-3.jpg",
    alt: "Mountain adventure with breathtaking views - Yathrananda travel experience",
  },
];

const AnimatedSection = ({
  children,
  className = "",
  variant = fadeInUp,
  as: Component = "section",
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={mounted && isInView ? "visible" : "hidden"}
      variants={variant}
      className={className}
      // @ts-ignore
      // as={Component}
    >
      {children}
    </motion.div>
  );
};

const PackagesSectionType2 = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <AnimatedSection
      id="tours"
      className="py-12 sm:py-16 px-4 sm:px-6"
      aria-labelledby="tours-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 sm:mb-12 space-y-4 lg:space-y-0">
          <h2
            id="tours-heading"
            className="text-2xl sm:text-3xl font-bold text-foreground"
          >
            Adventure Tours & Travel Experiences
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-auto">
              <label htmlFor="tour-search" className="sr-only">
                Search tours by location
              </label>
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                aria-hidden="true"
              />
              <input
                id="tour-search"
                type="text"
                placeholder="Search by Location"
                className="w-full sm:w-auto pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out bg-background text-foreground placeholder:text-muted-foreground"
                aria-label="Search tours by location"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="flex space-x-2"
                role="group"
                aria-label="Tour carousel controls"
              >
                {[ChevronLeft, ChevronRight].map((Icon, index) => (
                  <motion.button
                    key={index}
                    className="p-2 border border-border rounded-full transition-all duration-200 ease-out hover:bg-muted hover:border-muted-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const container = document.getElementById(
                        "tours-scroll-container"
                      );
                      if (container) {
                        const scrollAmount = 350; // Adjust based on card width
                        container.scrollTo({
                          left:
                            container.scrollLeft +
                            (index === 0 ? -scrollAmount : scrollAmount),
                          behavior: "smooth",
                        });
                      }
                    }}
                    aria-label={index === 0 ? "Previous tours" : "Next tours"}
                  >
                    <Icon
                      className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          id="tours-scroll-container"
          className="flex overflow-x-auto scrollbar-hide gap-4 sm:gap-6 py-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {events.map((event, index) => (
            <motion.article
              key={index}
              className="flex-none w-[300px] sm:w-[350px] bg-card rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-border transition-all duration-200 ease-out group hover:shadow-xl"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.alt}
                  fill
                  className="object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 640px) 300px, 350px"
                />
                <motion.button
                  className="absolute top-4 right-4 p-2 bg-background/80 rounded-full transition-all duration-200 ease-out hover:bg-background border border-border/50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Add to favorites"
                >
                  <Heart
                    className="w-4 h-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </motion.button>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-semibold text-card-foreground mb-3 line-clamp-2 text-sm sm:text-base">
                  {event.title}
                </h3>
                <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-3">
                  <span>{event.duration}</span>
                  <div className="flex items-center space-x-1">
                    <Star
                      className="w-3 h-3 sm:w-4 sm:h-4 fill-warning text-warning"
                      aria-hidden="true"
                    />
                    <span>{event.rating} Rating</span>
                    <span>({event.reviews} Reviews)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg sm:text-2xl font-bold text-card-foreground">
                      {event.price}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {" "}
                      /Night
                    </span>
                  </div>
                  <motion.button
                    className="text-primary font-medium text-sm transition-all duration-200 ease-out hover:text-primary-hover"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`View details for ${event.title}`}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default PackagesSectionType2;
