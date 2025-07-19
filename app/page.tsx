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
import Footer from "./_components/footer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [isTestimonialsTooltipOpen, setIsTestimonialsTooltipOpen] =
    useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    }
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

  const nextTestimonial = useCallback(() => {
    if (isTestimonialsTooltipOpen) return;
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  }, [isTestimonialsTooltipOpen, testimonials.length]);

  useEffect(() => {
    if (testimonials.length > 0) {
      const intervalId = setInterval(nextTestimonial, 5000);
      return () => clearInterval(intervalId);
    }
  }, [testimonials.length, nextTestimonial]);

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
          className="relative min-h-screen overflow-hidden bg-slate-900"
          aria-labelledby="hero-heading"
        >
          {/* Enhanced Background Carousel */}
          <div className="absolute inset-0">
            <div className="w-full h-full relative">
              {/* Background Images/Videos */}
              <div className="absolute inset-0 z-0">
                {isLoading ? (
                  <img
                    src="/images/hero-background-4.jpg?height=1080&width=1920"
                    alt="Breathtaking travel destination showcasing natural beauty"
                    className="w-full h-full object-cover scale-105"
                    draggable="false"
                  />
                ) : (
                  <AnimatePresence>
                    {heroContent.map(
                      (content, index) =>
                        index === currentImageIndex && (
                          <motion.div
                            key={`${index}-${content.url}`}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                              duration: 1.5,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="absolute inset-0"
                          >
                            {content.type === "video" ? (
                              <video
                                src={content.url}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover scale-105"
                                aria-label="Travel destination video showcasing beautiful landscapes"
                              />
                            ) : (
                              <img
                                src={
                                  content.url ||
                                  "/images/hero-background-4.jpg?height=1080&width=1920"
                                }
                                alt="Stunning travel destination with breathtaking landscapes"
                                className="w-full h-full object-cover scale-105"
                                draggable="false"
                              />
                            )}
                          </motion.div>
                        )
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Sophisticated Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/70 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 z-10" />
            </div>
          </div>

          {/* Refined Floating Elements */}
          <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 right-1/4 w-2 h-2 bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-full blur-sm"
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-sm"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                y: [0, -15, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/3 w-1 h-1 bg-gradient-to-br from-orange-400/25 to-red-400/25 rounded-full blur-sm"
              animate={{
                opacity: [0.25, 0.5, 0.25],
                scale: [1, 1.5, 1],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>

          {/* Enhanced Header */}
          <header className="relative z-40 w-full">
            {/* Multi-layer blur backdrop for sophisticated blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            <div className="relative flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4">
              {/* Logo with Enhanced Animation */}
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
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
                    className="h-12 lg:h-16 pr-4 w-auto object-contain group-hover:scale-110 transition-all duration-500 drop-shadow-lg"
                    loading="eager"
                    priority
                  />
                </Link>
              </motion.div>

              {/* Enhanced Desktop Navigation */}
              <motion.nav
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="hidden lg:flex items-center space-x-1 rounded-full px-2 py-2"
                role="navigation"
                aria-label="Main navigation"
              >
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
                  >
                    <Link
                      href={item.href}
                      className={`relative text-sm font-semibold transition-all duration-300 ease-out group py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-lg ${
                        item.active
                          ? "text-white bg-white/30 shadow-xl"
                          : "text-white/95 hover:text-white hover:bg-white/20"
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
                  </motion.div>
                ))}
              </motion.nav>

              {/* Enhanced Right Side Actions */}
              <div className="flex items-center space-x-3">
                {/* Enhanced WhatsApp Button - Desktop */}
                <motion.div
                  initial={{ opacity: 0, x: 30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="hidden lg:block"
                >
                  <motion.button
                    className="relative flex items-center space-x-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:from-green-700 hover:to-green-800 shadow-xl hover:shadow-2xl group border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:ring-offset-2 focus:ring-offset-transparent"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsAppClick}
                    aria-label="Contact Yathrananda on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="hidden xl:inline">+91 62829 48617</span>
                    <span className="xl:hidden">WhatsApp</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.div>

                {/* Enhanced Mobile Actions */}
                <div className="lg:hidden flex items-center space-x-3">
                  <motion.button
                    className="flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 text-white p-3 rounded-full transition-all duration-200 hover:from-green-700 hover:to-green-800 shadow-lg border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsAppClick}
                    aria-label="Contact Yathrananda on WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    className="flex items-center justify-center p-3 text-white bg-white/25 backdrop-blur-lg rounded-full transition-all duration-200 hover:bg-white/35 shadow-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
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
                          <X className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </header>

          {/* Enhanced Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={closeMobileMenu}
                />

                <motion.div
                  className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-black backdrop-blur-xl z-50 shadow-2xl"
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
                        className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
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
                              className={`block py-4 px-4 text-lg font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 ${
                                item.active
                                  ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-4 border-blue-400 shadow-lg"
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
                        className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:from-green-700 hover:to-green-800 shadow-lg border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400/50"
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

          {/* Enhanced Main Hero Content */}
          <div className="relative z-30 flex items-center justify-center min-h-[calc(100vh-140px)]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-8 sm:space-y-10"
              >
                {/* Enhanced Main Headline */}
                <div className="space-y-6">
                  <motion.h1
                    id="hero-heading"
                    className="text-white font-bold leading-[1.1] tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{
                      fontSize: "clamp(2rem, 8vw, 4.5rem)",
                      textShadow:
                        "0 4px 20px rgba(0,0,0,0.2), 0 2px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    <motion.span
                      className="block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      Explore The World
                    </motion.span>
                    <motion.span
                      className="block bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent font-extrabold"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      With Confidence
                    </motion.span>
                  </motion.h1>

                  <motion.p
                    className="text-white/95 font-medium leading-relaxed max-w-3xl mx-auto"
                    style={{
                      fontSize: "clamp(1rem, 3vw, 1.25rem)",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  >
                    From the Backwaters of Kerala to Every Corner of the Globe
                  </motion.p>
                </div>

                {/* Enhanced Search Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 1.1 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary/50 to-primary/50 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                    <div className="relative flex flex-col sm:flex-row bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30 group-hover:border-white/50 transition-all duration-300">
                      <div className="flex-1 flex items-center px-6 py-5">
                        <Search className="w-5 h-5 text-slate-500 mr-4 flex-shrink-0 group-hover:text-primary transition-colors duration-300" />
                        <input
                          type="text"
                          placeholder="Where do you want to go?"
                          className="flex-1 text-base font-medium text-slate-900 bg-transparent outline-none placeholder:text-slate-500 focus:placeholder:text-slate-400 transition-colors duration-200"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              router.push(`/packages?search=${searchQuery}`);
                            }
                          }}
                          aria-label="Search for travel destinations"
                        />
                      </div>
                      <motion.button
                        type="button"
                        onClick={() => {
                          router.push(`/packages?search=${searchQuery}`);
                        }}
                        className="relative bg-gradient-to-r from-primary via-primary-hover to-primary text-white px-8 py-5 font-bold text-base hover:from-primary-hover hover:via-primary-hover hover:to-primary-hover transition-all duration-300 shadow-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-white"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Search for travel packages"
                      >
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <span>Let's Go</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            →
                          </motion.div>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.8 }}
                        />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Bottom Navigation Elements */}
          <div className="absolute bottom-0 left-0 right-0 z-30">
            <div className="flex items-end justify-between px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              {/* Enhanced Scroll Indicator */}
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

              {/* Enhanced Carousel Indicators */}
              {!isLoading && heroContent.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.8 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <span className="text-white/70 text-xs font-semibold hidden lg:block">
                    Gallery
                  </span>
                  <div className="space-x-3 bg-black/30 backdrop-blur-sm rounded-full px-4 py-3 border border-white/20 hidden lg:flex">
                    {heroContent.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent ${
                          currentImageIndex === index
                            ? "bg-white scale-125 shadow-lg"
                            : "bg-white/50 hover:bg-white/80 hover:scale-110"
                        }`}
                        whileHover={{ scale: 1.4 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Go to slide ${index + 1} of ${
                          heroContent.length
                        }`}
                        aria-current={currentImageIndex === index}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        <UpcomingToursSection />
        <TrendingToursSection />
        {/* Statistics Section */}
        {/* <AnimatedSection
          className="py-12 sm:py-16 px-4 sm:px-6 bg-mu"
          aria-labelledby="stats-heading"
        >
          <div className="max-w-[1440px] mx-auto">
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
        </AnimatedSection> */}
        {/* Explore Events */}
        <InternationalToursSection />
        <DomesticToursSection />
        {/* Services Section */}
        <AnimatedSection
          id="services"
          className="py-12 sm:py-16 px-4 sm:px-6 bg-background"
          aria-labelledby="services-heading"
        >
          <div className="max-w-[1440px] mx-auto">
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
                    className="w-full h-48 sm:h-72 object-cover transition-transform duration-200 ease-out group-hover:scale-105"
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
          className="py-12 sm:py-16 px-4 sm:px-6 hidden"
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
          <div className="max-w-[1440px] mx-auto">
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
                        <TooltipProvider>
                          <Tooltip onOpenChange={(open) => {
                            setIsTestimonialsTooltipOpen(open);
                          }}>
                            <TooltipTrigger asChild>
                              <p className="text-card-foreground mb-6 text-sm sm:text-base line-clamp-6 cursor-pointer">
                                {testimonials[currentTestimonialIndex].message}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-md max-h-96 overflow-y-auto">
                                {testimonials[currentTestimonialIndex].message}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
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
                    src="/images/bovz3mzbk88htcllt0bp.jpg"
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
              className="bg-background border border-border rounded-xl sm:rounded-2xl p-8 sm:p-12 relative overflow-hidden"
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
                  onClick={handleWhatsAppClick}
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
        {/* <AnimatedSection className="py-16 sm:py-20 px-4 sm:px-6 bg-muted">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-gradient-to-r from-primary to-primary-hover rounded-2xl p-8 sm:p-12 text-primary-foreground relative overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                  Ready for Your Next Adventure?
                </h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
                  Let our expert team create a personalized travel experience
                  that exceeds your expectations. Your dream destination is just
                  one conversation away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="bg-background text-primary-hover px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-background/90 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Start planning your trip with Yathrananda"
                    onClick={() => {
                      router.push("/contact");
                    }}
                  >
                    Call Us Now: +91 6282928617
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      router.push("/packages");
                    }}
                    className="border-2 border-primary-foreground text-primary-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-background/90 hover:text-primary-hover"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="View our travel destinations"
                  >
                    View Destinations
                  </motion.button>
                </div>
              </div>
              <div
                className="absolute inset-0 bg-foreground/10"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </AnimatedSection> */}
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
