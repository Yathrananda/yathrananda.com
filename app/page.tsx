"use client";

import { JSX, useCallback, useEffect } from "react";
import type React from "react";
import Image from "next/image";
import { ChevronDown, X, Menu, MessageCircle, Mail, Phone } from "lucide-react";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import { HTMLAttributes, useRef, useState } from "react";
import { VideoModal } from "./_components/video-modal";
import UpcomingToursSection from "./_components/sections/upcoming-tours-section";
import InternationalToursSection from "./_components/sections/international-tours-section";
import DomesticToursSection from "./_components/sections/domestic-tours-section";
import { usePathname, useRouter } from "next/navigation";
import { HeroMedia } from "@/types/package-detail";
import Link from "next/link";
import Footer from "./_components/footer";
import TopDestinationsHero from "./_components/hero-section/v1";
import AllToursMarquee from "./_components/sections/packages-marquee";
import IntroAnimation from "./_components/intro-animation";
import dynamic from "next/dynamic";
import {
  IntersectionLoader,
  ProgressiveLoader,
  useIsMobile,
} from "@/components/ui/progressive-loader";
import ImageAccordion from "./_components/image-accordion";

const LazyTrendingToursSection = dynamic(
  () => import("./_components/sections/trending-tours-section"),
  {
    loading: () => <div className="w-full h-96 bg-gray-100 animate-pulse" />,
    ssr: false,
  }
);

const LazyYouTubeShortsMasonry = dynamic(
  () => import("./_components/youtube-shorts-masonry"),
  {
    loading: () => <div className="w-full h-64 bg-gray-100 animate-pulse" />,
    ssr: false,
  }
);

const LazyMarquee = dynamic(() => import("./_components/marquee"), {
  loading: () => <div className="w-full h-32 bg-gray-100 animate-pulse" />,
  ssr: false,
});

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

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  as?: keyof JSX.IntrinsicElements;
}

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
export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(2);
  const [heroContent, setHeroContent] = useState<HeroMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIntroAnimationComplete, setIsIntroAnimationComplete] =
    useState(false);
  const isMobile = useIsMobile();

  const navigationItems = [
    { name: "Home", href: "/" },
    {
      name: "International",
      href: "/international-tours",
      active: pathname === "/international-tours",
    },
    {
      name: "Domestic",
      href: "/domestic-tours",
      active: pathname === "/domestic-tours",
    },
    {
      name: "Kerala",
      href: "/kerala-tours",
      active: pathname === "/kerala-tours",
    },
    {
      name: "Customized",
      href: "/customised-tours",
      active: pathname === "/customised-tours",
    },
    {
      name: "Contact Us",
      href: "/contact",
      active: pathname === "/contact",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroAnimationComplete(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/hero`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch hero content");
        }

        const data = await response.json();
        const sortedMedia = data.media.sort(
          (a: HeroMedia, b: HeroMedia) => a.carousel_order - b.carousel_order
        );
        setHeroContent(sortedMedia);
      } catch (err) {
        console.error("Error fetching hero content:", err);
        setError("Failed to load hero content");
        // Fallback to default content if API fails
        setHeroContent([
          {
            id: "1",
            type: "image",
            url: "/images/hero-background-2.jpg",
            carousel_order: 1,
          },
          {
            id: "2",
            type: "video",
            url: "/videos/hero-video-1.mp4",
            carousel_order: 2,
          },
          {
            id: "3",
            type: "image",
            url: "/images/hero-background.jpg",
            carousel_order: 3,
          },
          {
            id: "4",
            type: "video",
            url: "/videos/hero-video-2.mp4",
            carousel_order: 4,
          },
          {
            id: "5",
            type: "image",
            url: "/images/hero-background-3.jpg",
            carousel_order: 5,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  const nextImage = useCallback(() => {
    if (heroContent.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroContent.length);
      setIsTransitioning(false);
    }, 500);
  }, [heroContent.length]);

  useEffect(() => {
    if (heroContent.length > 0) {
      const intervalId = setInterval(() => {
        nextImage();
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [heroContent.length, nextImage]);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+917593873555";
    const message = "Hi! I'm interested in your travel services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!isIntroAnimationComplete) {
    return <IntroAnimation />;
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50 transition-all duration-200"
        >
          Skip to main content
        </a>
        <section
          id="home"
          className="relative min-h-screen overflow-hidden bg-background"
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0">
            <div className="w-full h-full relative">
              <div className="absolute inset-0 z-0 md:px-12 py-16 md:py-32">
                <TopDestinationsHero />
              </div>
            </div>
          </div>
          <header className="relative z-40 w-full bg-background">
            <div className="relative bg-primary text-sm font-medium text-background block">
              <div className="flex items-center justify-between px-4 sm:px-8 lg:px-[84px] py-2">
                <div className="flex items-center space-x-4">
                  <Link
                    href="tel:917593873555"
                    className="flex items-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+917593873555</span>
                  </Link>
                  <Link
                    href="tel:917593873999"
                    className="items-center space-x-2 hidden md:flex"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+917593873999</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    href="mailto:support@yathrananda.com"
                    className="flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>support@yathrananda.com</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-between px-4 sm:px-8 lg:px-20 py-2">
              <div>
                <Link
                  href="/"
                  className="block group transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
                  aria-label="Return to Yathrananda homepage"
                >
                  <Image
                    src="/images/logo.png"
                    alt="Yathrananda - A Travel Fusion"
                    width={280}
                    height={80}
                    className="h-12 lg:h-16 pr-4 w-auto object-contain transition-all duration-500"
                    loading="eager"
                    priority
                  />
                </Link>
              </div>

              {/* Enhanced Desktop Navigation */}
              <div
                className="hidden lg:flex items-center space-x-1 rounded-full px-2 py-2"
                role="navigation"
                aria-label="Main navigation"
              >
                {navigationItems.map((item, index) => (
                  <div key={`id${index}`}>
                    <Link
                      href={item.href}
                      className={`relative text-sm font-semibold transition-all duration-300 ease-out group py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-lg ${
                        item.active
                          ? "text-foreground bg-white/30 shadow-xl"
                          : "text-foreground/95 hover:text-foreground hover:bg-white/20"
                      }`}
                      aria-label={`Navigate to ${item.name}`}
                      aria-current={item.active ? "page" : undefined}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {item.active && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
                          layoutId="activeTab"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Enhanced Right Side Actions */}
              <div className="flex items-center space-x-3">
                <div className="hidden lg:block">
                  <motion.button
                    className="relative flex items-center space-x-3 bg-primary text-white px-6 py-3 font-semibold text-sm transition-all duration-300 hover:bg-primary-hover rounded-sm"
                    onClick={handleWhatsAppClick}
                    aria-label="Contact Yathrananda on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="xl:inline">WhatsApp Us</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </div>

                {/* Enhanced Mobile Actions */}
                <div className="lg:hidden flex items-center space-x-3">
                  <motion.button
                    className="flex items-center justify-center bg-gradient-to-r from-primary to-primary-hover text-white p-3 rounded-sm transition-all duration-200 hover:from-primary-hover hover:to-primary-hover border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsAppClick}
                    aria-label="Contact Yathrananda on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    className="flex items-center justify-center p-3 text-primary-hover bg-background backdrop-blur-lg rounded-sm transition-all duration-200 hover:bg-white/35 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={toggleMobileMenu}
                    aria-label={
                      isMobileMenuOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                    }
                    aria-expanded={isMobileMenuOpen}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {isMobileMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  className="lg:hidden fixed inset-0 bg-white/70 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={closeMobileMenu}
                />

                <motion.div
                  className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white/70 backdrop-blur-xl z-50 shadow-2xl"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6">
                      <Image
                        src="/images/logo.png"
                        alt="Yathrananda"
                        width={120}
                        height={34}
                        className="h-12 w-auto object-contain"
                      />
                      <button
                        onClick={closeMobileMenu}
                        className="p-2 text-primary hover:text-primary-hover transition-colors rounded-full hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        aria-label="Close navigation menu"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <nav
                      className="flex-1 px-6 py-8"
                      role="navigation"
                      aria-label="Mobile navigation"
                    >
                      <div className="space-y-2">
                        {navigationItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Link
                              href={item.href}
                              className={`block py-4 px-4 text-lg font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                                item.active
                                  ? "text-primary bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-4 border-blue-400 shadow-lg"
                                  : "text-primary/90 hover:text-primary hover:bg-primary/10 hover:translate-x-2"
                              }`}
                              onClick={closeMobileMenu}
                              aria-label={`Navigate to ${item.name}`}
                              aria-current={item.active ? "page" : undefined}
                            >
                              <span className="flex items-center justify-between">
                                {item.name}
                                {item.active && (
                                  <motion.div
                                    className="w-2 h-2 bg-blue-400 rounded-full shadow-lg"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                  />
                                )}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </nav>

                    <div className="p-6">
                      <motion.button
                        className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-primary to-primary-hover text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:from-primary-hover hover:to-primary-hover"
                        onClick={() => {
                          handleWhatsAppClick();
                          closeMobileMenu();
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Contact Yathrananda on WhatsApp"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>+91 75938 73555</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="absolute bottom-0 right-0 z-30">
            <div className="flex items-end justify-between px-4 sm:px-6 lg:px-16 pb-6 sm:pb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="hidden sm:flex flex-col items-center space-y-3 group cursor-pointer"
                onClick={() =>
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                  })
                }
              >
                <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center hover:border-white/80 transition-all duration-300 group-hover:scale-110 backdrop-blur-sm bg-white/10">
                  <motion.div
                    className="w-1 h-2 bg-white/70 rounded-full mt-1.5"
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <span className="text-white/70 text-xs font-semibold group-hover:text-white/90 transition-colors duration-300">
                  Scroll to explore
                </span>
              </motion.div>
            </div>
          </div>
        </section>
        <UpcomingToursSection />
        <div className="relative h-[600px] overflow-hidden md:px-12">
          <iframe
            src="https://widgets.sociablekit.com/google-reviews/iframe/25580492"
            frameBorder="0"
            width="100%"
            height="1000px"
            scrolling="no"
            className="block w-full h-[600px]"
          ></iframe>
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white"></div>
        </div>
        <ProgressiveLoader delay={isMobile ? 1000 : 500}>
          <IntersectionLoader>
            <LazyTrendingToursSection />
          </IntersectionLoader>
        </ProgressiveLoader>

        <AllToursMarquee />
        <InternationalToursSection />
        <DomesticToursSection />
        <ProgressiveLoader
          skipOnMobile={true}
          delay={3000}
          loadOnInteraction={true}
          fallback={
            <div className="w-full py-12 text-center">
              <button
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                onClick={() => window.location.reload()}
              >
                Load YouTube Content
              </button>
            </div>
          }
        >
          <LazyYouTubeShortsMasonry />
        </ProgressiveLoader>
        <div className="relative overflow-hidden mb-12">
          <ImageAccordion />
        </div>
        <ProgressiveLoader
          delay={isMobile ? 5000 : 2500}
          loadOnInteraction={true}
        >
          <div className="relative overflow-hidden mb-12">
            <IntersectionLoader>
              <LazyMarquee />
            </IntersectionLoader>
          </div>
        </ProgressiveLoader>

        {/* Services Section */}
        <AnimatedSection
          id="services"
          className="py-12 sm:py-16 px-4 sm:px-6 bg-muted"
          aria-labelledby="services-heading"
        >
          <div className="w-full px-4 md:px-24 relative">
            <div className="absolute -bottom-96 md:bottom-20 -left-20 w-full h-full z-0">
              <Image
                src="/images/tree.png"
                alt="Services Background"
                width={1000}
                height={1000}
                className="w-[28rem] lg:w-[34rem] h-auto object-cover opacity-5"
              />
            </div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-8xl font-extrabold text-foreground">
                  Love to <br />
                  Travel ?
                </h2>
                <p className="text-muted-foreground mt-1 md:mt-0">
                  We are here to help you plan your next adventure.
                </p>
                <div className="flex gap-4 items-center justify-center">
                  <motion.button
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold mt-6 sm:mt-8 text-sm sm:text-base transition-all duration-200 ease-out hover:bg-primary-hover shadow-lg border border-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="View all Yathrananda travel services"
                    onClick={() => {
                      router.push("/packages");
                    }}
                  >
                    Explore →
                  </motion.button>
                  <motion.button
                    className="w-full bg-transparent py-3 rounded-lg font-semibold mt-6 sm:mt-8 text-sm sm:text-base transition-all duration-200 ease-out shadow-lg border border-primary text-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="View all Yathrananda travel services"
                    onClick={() => {
                      router.push("/contact");
                    }}
                  >
                    Contact Us →
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="space-y-4 order-1 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {[
                  {
                    title: "Consultation & Trip Planning",
                    content:
                      "Our expert travel consultants work closely with you to understand your preferences, budget, and dream destinations. We'll create a personalized travel plan that matches your exact requirements and travel style.",
                  },
                  {
                    title: "Customized Itinerary & Booking",
                    content:
                      "Get a tailor-made travel itinerary that includes carefully selected accommodations, activities, and transportation options. We handle all bookings and reservations to ensure a seamless experience.",
                  },
                  {
                    title: "Seamless Payment & Confirmation",
                    content:
                      "Once your travel itinerary is confirmed, we provide secure payment options with multiple currencies. After payment, you'll receive all travel documents, confirmations, and necessary travel tips to ensure your journey is smooth from start to finish.",
                  },
                  {
                    title: "24/7 Journey Assistance & Support",
                    content:
                      "Travel with peace of mind knowing our dedicated support team is available 24/7. We're here to assist with any questions, changes, or unexpected situations throughout your journey.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="py-4 border-b border-border"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                      delay: index * 0.05,
                    }}
                    viewport={{ once: true }}
                  >
                    <button
                      className="w-full flex items-center justify-between mb-2"
                      onClick={() =>
                        setExpandedService(
                          expandedService === index ? null : index
                        )
                      }
                      aria-expanded={expandedService === index}
                      aria-controls={`service-content-${index}`}
                    >
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground text-left">
                        {item.title}
                      </h3>
                      <motion.div
                        className="text-primary transition-all duration-200 ease-out hover:text-primary-hover p-1 rounded-lg hover:bg-accent"
                        animate={{
                          rotate: expandedService === index ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5" aria-hidden="true" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedService === index && (
                        <motion.div
                          id={`service-content-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-muted-foreground text-sm pb-2">
                            {item.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
        <Footer />
      </div>
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://www.youtube.com/dQw4w9WgXcQ"
      />
    </>
  );
}
