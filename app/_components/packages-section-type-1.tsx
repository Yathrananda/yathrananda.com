import { HTMLAttributes, useEffect, useRef, useState, JSX } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const destinations = [
  {
    from: "Dhaka",
    to: "Thailand",
    date: "Fri, May 21 - Mon, Jun 10",
    price: "$870.00",
    image: "/images/destination-1.jpg",
    alt: "Beautiful beaches and temples in Thailand - Yathrananda travel destination",
  },
  {
    from: "Dhaka",
    to: "Tokyo",
    date: "Fri, May 21 - Mon, Jun 10",
    price: "$670.00",
    image: "/images/destination-2.jpg",
    alt: "Modern cityscape and traditional culture in Tokyo - Yathrananda travel destination",
  },
  {
    from: "Dhaka",
    to: "Chicago",
    date: "Fri, May 21 - Mon, Jun 10",
    price: "$670.00",
    image: "/images/destination-3.jpg",
    alt: "Stunning architecture and lakefront views in Chicago - Yathrananda travel destination",
  },
  {
    from: "Dhaka",
    to: "Cox's Bazar",
    date: "Fri, May 21 - Mon, Jun 10",
    price: "$670.00",
    image: "/images/destination-1.jpg",
    alt: "World's longest natural sea beach in Cox's Bazar - Yathrananda travel destination",
  },
  {
    from: "Dhaka",
    to: "Cox's Bazar 2",
    date: "Fri, May 21 - Mon, Jun 10",
    price: "$670.00",
    image: "/images/destination-3.jpg",
    alt: "World's longest natural sea beach in Cox's Bazar - Yathrananda travel destination",
  },
  {
    from: "Dhaka",
    to: "Cox's Bazar 3",
    date: "Fri, May 21 - Mon, Jun 10",
    price: "$670.00",
    image: "/images/destination-2.jpg",
    alt: "World's longest natural sea beach in Cox's Bazar - Yathrananda travel destination",
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

const PackagesSectionType1 = () => {
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
      id="destinations"
      className="py-12 sm:py-16 px-4 sm:px-6"
      aria-labelledby="destinations-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <h2
            id="destinations-heading"
            className="text-2xl sm:text-3xl font-bold text-foreground"
          >
            Popular Travel Destinations
          </h2>
          <div
            className="flex space-x-2"
            role="group"
            aria-label="Destination carousel controls"
          >
            {[ChevronLeft, ChevronRight].map((Icon, index) => (
              <motion.button
                key={index}
                className="p-2 border border-border rounded-full transition-all duration-200 ease-out hover:bg-muted hover:border-muted-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll(index === 0 ? "left" : "right")}
                aria-label={
                  index === 0 ? "Previous destinations" : "Next destinations"
                }
              >
                <Icon
                  className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground"
                  aria-hidden="true"
                />
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 sm:gap-6 pb-4 pt-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {destinations.map((destination, index) => (
            <motion.article
              key={`${destination.from}-${destination.to}`}
              className="flex-none w-[280px] sm:w-[320px] bg-card rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-border transition-all duration-200 ease-out group hover:shadow-xl"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.alt}
                  fill
                  className="object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                  loading={index < 2 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 280px, 320px"
                />
              </div>
              {/* Rest of the card content remains the same */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-card-foreground text-sm sm:text-base">
                    {destination.from}
                  </span>
                  <span className="text-muted-foreground" aria-hidden="true">
                    ✈
                  </span>
                  <span className="font-semibold text-card-foreground text-sm sm:text-base">
                    {destination.to}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                  {destination.date}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Starting from
                  </span>
                  <span className="text-base sm:text-lg font-bold text-card-foreground">
                    {destination.price}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default PackagesSectionType1;