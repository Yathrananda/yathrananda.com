"use client";

import { JSX, useCallback, useEffect } from "react";
import type React from "react";
import Image from "next/image";
import {
  Search,
  Play,
  ChevronDown,
  X,
  Menu,
  MessageCircle,
} from "lucide-react";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import { HTMLAttributes, useRef, useState } from "react";
import { VideoModal } from "./_components/video-modal";
import UpcomingToursSection from "./_components/sections/upcoming-tours-section";
import TrendingToursSection from "./_components/sections/trending-tours-section";
import InternationalToursSection from "./_components/sections/international-tours-section";
import DomesticToursSection from "./_components/sections/domestic-tours-section";
import { usePathname, useRouter } from "next/navigation";
import { HeroMedia } from "@/types/package-detail";
import Link from "next/link";

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

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface Testimonial {
  id: string;
  client_name: string;
  message: string;
  image_url: string;
}

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(2);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [heroContent, setHeroContent] = useState<HeroMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isFaqsLoading, setIsFaqsLoading] = useState(true);
  const [faqsError, setFaqsError] = useState<string | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState<string | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/" },
    {
      name: "International Tours",
      href: "/international-tours",
      active: pathname === "/international-tours",
    },
    {
      name: "Domestic Tours",
      href: "/domestic-tours",
      active: pathname === "/domestic-tours",
    },
    {
      name: "Kerala Tours",
      href: "/kerala-tours",
      active: pathname === "/kerala-tours",
    },
    {
      name: "Customized Tours",
      href: "/customized-tours",
      active: pathname === "/customized-tours",
    },
    {
      name: "Other Services",
      href: "/services",
      active: pathname === "/services",
    },
  ];

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

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/testimonials`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setTestimonialsError("Failed to load testimonials");
      } finally {
        setIsTestimonialsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [testimonials.length]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/faqs`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }

        const data = await response.json();
        setFaqs(data.faqs);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setFaqsError("Failed to load FAQs");
      } finally {
        setIsFaqsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+916282948617";
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

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50 transition-all duration-200"
        >
          Skip to main content
        </a>

        {/* Hero Section with Static Header */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col justify-end overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background Carousel - Seamless Overlapping Transitions */}
          <div className="absolute inset-0">
            <div className="w-full h-full relative">
              {/* Base background to prevent white flashes */}
              <div className="absolute inset-0 bg-gray-900 z-0" />

              {/* Carousel Images with Overlapping Transitions */}
              <div className="absolute inset-0 z-10">
                {isLoading ? (
                  <img
                    src="/images/hero-background-4.jpg?height=1080&width=1920"
                    alt="Travel adventure background"
                    className="w-full h-full object-cover object-center scale-110"
                    draggable="false"
                  />
                ) : (
                  <AnimatePresence>
                    {heroContent.map(
                      (content, index) =>
                        index === currentImageIndex && (
                          <motion.div
                            key={`${index}-${content.url}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0"
                          >
                            {content.type === "video" ? (
                              <video
                                src={content.url}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover object-center scale-110"
                              />
                            ) : (
                              <img
                                src={
                                  content.url ||
                                  "/images/hero-background-4.jpg?height=1080&width=1920"
                                }
                                alt="Travel adventure background"
                                className="w-full h-full object-cover object-center scale-110"
                                draggable="false"
                              />
                            )}
                          </motion.div>
                        )
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Reduced Opacity Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 z-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-20" />
            </div>
          </div>

          {/* Static Logo - Top Left within Hero Section */}
          <div className="absolute top-0 left-0 z-40 p-3 sm:p-4 lg:p-6 xl:p-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Link
                href="/"
                className="block group px-2 transition-all duration-300"
                aria-label="Return to Yathrananda homepage"
              >
                <Image
                  src="/images/logo.png"
                  alt="Yathrananda - A Travel Fusion"
                  width={280}
                  height={80}
                  className="h-10 xs:h-10 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="eager"
                  priority
                />
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation - Right Side */}
          <div className="absolute top-0 right-0 z-40 h-full pointer-events-none hidden lg:block">
            <div className="flex flex-col h-full justify-start items-end pt-6 pr-6 xl:pt-8 xl:pr-8 space-y-8 pointer-events-auto">
              {/* WhatsApp Contact - Enhanced Size */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.button
                  className="flex items-center space-x-3 bg-green-600/80 backdrop-blur-sm text-white px-5 py-4 rounded-xl font-medium text-base transition-all duration-300 hover:bg-green-700/80 shadow-lg hover:shadow-xl group"
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsAppClick}
                  aria-label="Contact Yathrananda on WhatsApp"
                >
                  <span className="hidden xl:inline text-sm font-semibold">
                    +91 62829 48617
                  </span>
                  <span className="xl:hidden font-semibold">WhatsApp Us</span>
                  <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </motion.button>
              </motion.div>

              {/* Vertical Navigation - Enhanced Size and Spacing */}
              <motion.nav
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="flex flex-col items-end space-y-8 bg-transparent rounded-2xl px-4 py-2 backdrop-blur-sm"
                role="navigation"
                aria-label="Main navigation"
              >
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Link
                      href={item.href}
                      className={`text-base lg:text-lg font-medium transition-all duration-300 ease-out relative group text-right block hover:translate-x-[-8px] py-2 px-1 ${
                        item.active
                          ? "text-white font-semibold scale-110"
                          : "text-white/90 hover:text-white hover:scale-105"
                      }`}
                      aria-label={`Navigate to ${item.name}`}
                      aria-current={item.active ? "page" : undefined}
                    >
                      <span className="relative inline-block">
                        {item.name}
                        <span
                          className={`absolute -bottom-1 right-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                            item.active ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                          aria-hidden="true"
                        />
                        {/* Enhanced decorative dot for active state */}
                        {item.active && (
                          <motion.span
                            className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full shadow-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </div>
          </div>

          {/* Mobile Header - Enhanced and Functional */}
          <div className="lg:hidden absolute top-0 right-0 z-50 p-3 sm:p-4">
            <div className="flex items-center space-x-3">
              {/* Mobile WhatsApp Button */}
              <motion.button
                className="flex items-center justify-center bg-green-600/90 backdrop-blur-sm text-white p-3 rounded-full font-medium transition-all duration-200 hover:bg-green-700/90 shadow-lg active:scale-95"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                aria-label="Contact Yathrananda on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.button>

              {/* Mobile Menu Toggle Button */}
              <motion.button
                className="flex items-center justify-center p-3 text-white bg-white/15 backdrop-blur-sm rounded-full transition-all duration-200 hover:bg-white/20 active:scale-95 shadow-lg"
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
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation Menu - Full Screen Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={closeMobileMenu}
                />

                {/* Mobile Menu Panel */}
                <motion.div
                  className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-black/95 backdrop-blur-md z-50 shadow-2xl"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <Image
                          src="/images/logo.png"
                          alt="Yathrananda"
                          width={120}
                          height={34}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <button
                        onClick={closeMobileMenu}
                        className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
                        aria-label="Close navigation menu"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Mobile Navigation Links */}
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
                              className={`block py-4 px-4 text-lg font-medium transition-all duration-200 rounded-xl ${
                                item.active
                                  ? "text-white bg-primary/20 font-semibold border-l-4 border-primary shadow-sm"
                                  : "text-white/90 hover:text-white hover:bg-white/10 hover:translate-x-2"
                              }`}
                              onClick={closeMobileMenu}
                              aria-label={`Navigate to ${item.name}`}
                              aria-current={item.active ? "page" : undefined}
                            >
                              <span className="flex items-center justify-between">
                                {item.name}
                                {item.active && (
                                  <motion.div
                                    className="w-2 h-2 bg-primary rounded-full"
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

                    {/* Mobile Menu Footer */}
                    <div className="p-6 border-t border-white/10">
                      <motion.button
                        className="w-full flex items-center justify-center space-x-3 bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:bg-green-700 active:scale-95 shadow-lg"
                        onClick={() => {
                          handleWhatsAppClick();
                          closeMobileMenu();
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Contact Yathrananda on WhatsApp"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>+91 62829 48617</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Subtle Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
            <motion.div
              className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-40 right-20 w-1 h-1 bg-white/25 rounded-full"
              animate={{
                opacity: [0.25, 0.5, 0.25],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-white/15 rounded-full"
              animate={{
                opacity: [0.15, 0.35, 0.15],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: 2,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-1 h-1 bg-white/30 rounded-full"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: 3,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Hero Content - Left Bottom Aligned */}
          <div className="relative z-30 max-w-5xl px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-24 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 50, x: -30 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Main Headline - Left Aligned */}
              <div className="space-y-4 sm:space-y-6">
                <motion.h1
                  id="hero-heading"
                  className="text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-left"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <motion.span
                    className="block drop-shadow-2xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Explore The World
                  </motion.span>
                  <motion.span
                    className="block text-primary drop-shadow-2xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    With Confidence
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-white/95 text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl leading-relaxed drop-shadow-lg text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  From the Backwaters of Kerala to Every Corner of the Globe
                </motion.p>
              </div>

              {/* Enhanced Search Bar - Left Aligned */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="max-w-2xl"
              >
                <div className="flex flex-col sm:flex-row bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-white/20 hover:shadow-3xl transition-all duration-300 group">
                  <div className="flex-1 flex items-center px-4 sm:px-6 py-3 sm:py-4 lg:py-5">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mr-3 sm:mr-4 flex-shrink-0 group-hover:text-primary transition-colors duration-300" />
                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      className="flex-1 text-base sm:text-lg text-foreground bg-transparent outline-none placeholder:text-muted-foreground font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          router.push(`/packages?search=${searchQuery}`);
                        }
                      }}
                    />
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => {
                      router.push(`/packages?search=${searchQuery}`);
                    }}
                    className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 lg:py-5 font-semibold text-base sm:text-lg hover:bg-primary-hover transition-all duration-300 shadow-lg relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Let's Go</span>
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Carousel Indicators - Bottom Center */}
          {!isLoading && heroContent.length > 1 && (
            <div className="absolute bottom-6 sm:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 z-30">
              <div className="flex space-x-2 sm:space-x-3 bg-black/15 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                {heroContent.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-500 ${
                      currentImageIndex === index
                        ? "bg-white scale-125 shadow-lg"
                        : "bg-white/50 hover:bg-white/70 hover:scale-110"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={currentImageIndex === index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Scroll Indicator - Right Side (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute bottom-20 right-6 z-30 hidden lg:flex flex-col items-center space-y-2"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center hover:border-white/50 transition-colors">
              <motion.div
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
            <span className="text-white/60 text-xs font-medium writing-mode-vertical-rl text-orientation-mixed rotate-180">
              Scroll to explore
            </span>
          </motion.div>
        </section>

        <UpcomingToursSection />
        <TrendingToursSection />
        {/* Statistics Section */}
        <AnimatedSection
          className="py-12 sm:py-16 px-4 sm:px-6 bg-background"
          aria-labelledby="stats-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2
                id="stats-heading"
                className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
              >
                Why Choose Yathrananda Travel Agency
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
                With a commitment to security and efficiency, our travel
                services leverage advanced technologies for seamless and secure
                booking experiences.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {[
                {
                  number: "234",
                  suffix: "M",
                  text: "Supporting multiple currencies for international travelers",
                  bg: "bg-card",
                  textColor: "text-card-foreground",
                  subTextColor: "text-muted-foreground",
                },
                {
                  number: "768",
                  suffix: "K",
                  text: "Creating new travel friendships every single month",
                  bg: "bg-primary",
                  textColor: "text-primary-foreground",
                  subTextColor: "text-primary-foreground/80",
                },
                {
                  number: "5.0",
                  suffix: "+",
                  text: "High star ratings from satisfied travel clients",
                  bg: "bg-card",
                  textColor: "text-card-foreground",
                  subTextColor: "text-muted-foreground",
                },
                {
                  number: "58.8",
                  suffix: "B",
                  text: "Travel consulting increased revenue consistently",
                  bg: "bg-card",
                  textColor: "text-card-foreground",
                  subTextColor: "text-muted-foreground",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`${stat.bg} p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center shadow-lg border border-border transition-all duration-200 ease-out hover:shadow-xl`}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                >
                  <motion.div
                    className={`text-3xl sm:text-4xl font-bold mb-2 ${stat.textColor}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: index * 0.05,
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                    <span className="text-xl sm:text-2xl">{stat.suffix}</span>
                  </motion.div>
                  <p className={`text-xs sm:text-sm ${stat.subTextColor}`}>
                    {stat.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
        {/* Explore Events */}
        <InternationalToursSection />
        <DomesticToursSection />
        {/* Services Section */}
        <AnimatedSection
          id="services"
          className="py-12 sm:py-16 px-4 sm:px-6 bg-muted"
          aria-labelledby="services-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2
                  id="services-heading"
                  className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8"
                >
                  Our Travel Services
                </h2>
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden group">
                  <Image
                    src="/images/hero-background-4.jpg"
                    alt="Beautiful nature landscape showcasing Yathrananda's adventure travel services"
                    width={600}
                    height={400}
                    className="w-full h-48 sm:h-64 object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <motion.button
                    className="absolute inset-0 flex items-center justify-center bg-foreground/30 transition-all duration-200 ease-out hover:bg-foreground/40"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setIsVideoModalOpen(true)}
                    aria-label="Play video about Yathrananda travel services"
                  >
                    <motion.div
                      className="w-12 h-12 sm:w-16 sm:h-16 bg-background rounded-full flex items-center justify-center transition-all duration-200 ease-out shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play
                        className="w-4 h-4 sm:w-6 sm:h-6 text-foreground ml-1"
                        aria-hidden="true"
                      />
                    </motion.div>
                  </motion.button>
                  <div className="absolute bottom-4 left-4 bg-background/90 px-3 py-1 rounded-full border border-border">
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                      Nature Adventures
                    </span>
                  </div>
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

                <motion.button
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold mt-6 sm:mt-8 text-sm sm:text-base transition-all duration-200 ease-out hover:bg-primary-hover shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="View all Yathrananda travel services"
                >
                  Explore All Services →
                </motion.button>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection
          className="py-12 sm:py-16 px-4 sm:px-6"
          aria-labelledby="faq-heading"
        >
          <div className="max-w-4xl mx-auto">
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-12 text-center"
            >
              Frequently Asked Questions
            </h2>

            {isFaqsLoading ? (
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 w-4 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : faqsError || faqs.length === 0 ? null : (
              <motion.div
                className="space-y-3 sm:space-y-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {faqs.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="border border-border rounded-lg transition-all duration-200 ease-out hover:shadow-md bg-card"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.01 }}
                  >
                    <motion.button
                      className="w-full flex items-center justify-between p-4 sm:p-6 text-left transition-all duration-200 ease-out hover:bg-muted rounded-lg"
                      onClick={() =>
                        setExpandedFaqId(
                          expandedFaqId === item.id ? null : item.id
                        )
                      }
                      aria-expanded={expandedFaqId === item.id}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span className="font-medium text-card-foreground text-sm sm:text-base pr-4">
                        {index + 1}. {item.question}
                      </span>
                      <motion.div
                        animate={{
                          rotate: expandedFaqId === item.id ? 180 : 0,
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="text-primary flex-shrink-0"
                      >
                        <ChevronDown
                          className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {expandedFaqId === item.id && (
                        <motion.div
                          id={`faq-answer-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                            <p className="text-muted-foreground text-sm">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </AnimatedSection>

        {/* Client Review */}
        <AnimatedSection
          id="about"
          className="py-12 sm:py-16 px-4 sm:px-6 bg-muted"
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                  <h2
                    id="testimonials-heading"
                    className="text-2xl sm:text-3xl font-bold text-foreground"
                  >
                    Client Testimonials
                  </h2>
                  {isTestimonialsLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-6 h-6 sm:w-8 sm:h-8 bg-muted animate-pulse rounded-full border-2 border-background"
                          />
                        ))}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground animate-pulse">
                        <div className="h-4 w-24 bg-muted rounded"></div>
                        <div className="h-3 w-20 bg-muted rounded mt-1"></div>
                      </div>
                    </div>
                  ) : testimonialsError || testimonials.length === 0 ? null : (
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {testimonials.slice(0, 4).map((testimonial) => (
                          <motion.div
                            key={testimonial.id}
                            className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-background overflow-hidden"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{
                              duration: 0.2,
                              ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                          >
                            <Image
                              src={testimonial.image_url}
                              alt={testimonial.client_name}
                              fill
                              className="object-cover"
                              sizes="32px"
                            />
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <span className="font-semibold">More than 900+</span>
                        <br />
                        <span>Happy Travelers</span>
                      </div>
                    </div>
                  )}
                </div>

                {isTestimonialsLoading ? (
                  <div className="animate-pulse">
                    <div className="bg-card p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-border">
                      <div className="h-6 w-12 bg-muted rounded mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                        <div className="h-4 bg-muted rounded w-4/6"></div>
                      </div>
                      <div className="mt-6 flex items-center space-x-4">
                        <div className="w-10 h-10 bg-muted rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded w-24"></div>
                          <div className="h-3 bg-muted rounded w-32"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : testimonialsError || testimonials.length === 0 ? null : (
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      <motion.blockquote
                        key={testimonials[currentTestimonialIndex].id}
                        className="bg-card p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-border transition-all duration-200 ease-out hover:shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="text-primary text-3xl sm:text-4xl mb-4"
                          aria-hidden="true"
                        >
                          "
                        </div>
                        <p className="text-card-foreground mb-6 text-sm sm:text-base">
                          {testimonials[currentTestimonialIndex].message}
                        </p>
                        <footer className="flex items-center space-x-4">
                          <Image
                            src={
                              testimonials[currentTestimonialIndex].image_url
                            }
                            alt={`${testimonials[currentTestimonialIndex].client_name}'s profile picture`}
                            width={48}
                            height={48}
                            className="rounded-full object-cover border border-border"
                          />
                          <div>
                            <cite className="font-semibold text-card-foreground text-sm sm:text-base not-italic">
                              {
                                testimonials[currentTestimonialIndex]
                                  .client_name
                              }
                            </cite>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              Happy Traveler
                            </div>
                          </div>
                        </footer>
                      </motion.blockquote>
                    </AnimatePresence>

                    <div className="flex justify-center space-x-2 mt-4">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonialIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentTestimonialIndex === index
                              ? "bg-primary w-4"
                              : "bg-border hover:bg-border/80"
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                          aria-current={currentTestimonialIndex === index}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.div
                className="relative order-1 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl group">
                  <Image
                    src="/images/people.webp"
                    alt="Happy travelers enjoying their journey"
                    width={600}
                    height={500}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Newsletter Section */}
        <AnimatedSection
          id="contact"
          className="py-12 sm:py-16 px-4 sm:px-6"
          aria-labelledby="newsletter-heading"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-background border border-border rounded-xl sm:rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative z-10">
                <h2
                  id="newsletter-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground"
                >
                  Start Your Adventure Today
                </h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 text-muted-foreground">
                  Join thousands of travelers who trust Yathrananda for their
                  perfect journey
                </p>
                <motion.button
                  className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
                  whileTap={{ scale: 0.95 }}
                  aria-label="Start planning your trip with Yathrananda"
                  onClick={() => {
                    router.push("/contact");
                  }}
                >
                  <span className="relative z-10">Plan Your Trip Now</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20"></div>
                  </div>
                </motion.button>
              </div>
              <div
                className="absolute inset-0 bg-foreground/5"
                aria-hidden="true"
              ></div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://www.youtube.com/dQw4w9WgXcQ"
      />
    </>
  );
}
