"use client";

import { JSX, useCallback, useEffect } from "react";
import type React from "react";
import Image from "next/image";
import {
  Play,
  ChevronDown,
  X,
  Menu,
  MessageCircle,
  Mail,
  Phone,
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
import { ReactLenis } from "lenis/react";
import TopDestinationsHero from "./_components/hero-section/v1";
import YouTubeShortsMasonry from "./_components/youtube-shorts-masonry";

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
  const [isIntroAnimationComplete, setIsIntroAnimationComplete] =
    useState(false);

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
    }, 3000);
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

  // if (!isIntroAnimationComplete) {
  //   return <IntroAnimation />;
  // }

  return (
    <>
      <ReactLenis root>
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
                <div className="absolute inset-0 z-0 px-12 py-32">
                  <TopDestinationsHero />
                </div>
              </div>
            </div>
            <header className="relative z-40 w-full bg-background">
              <div className="relative bg-primary text-sm font-medium text-background hidden md:block">
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
                      className="flex items-center space-x-2"
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

            {/* Mobile Navigation Menu */}
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
          <div className="relative h-[1200px] overflow-hidden md:px-12">
            <iframe
              src="https://widgets.sociablekit.com/google-reviews/iframe/25580492"
              frameBorder="0"
              width="100%"
              height="1200px"
              scrolling="no"
              className="block w-full h-[1200px]"
            ></iframe>
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white"></div>
          </div>
          <TrendingToursSection />
          <InternationalToursSection />
          <DomesticToursSection />
          <YouTubeShortsMasonry />
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
                    ) : testimonialsError ||
                      testimonials.length === 0 ? null : (
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
                            <Tooltip
                              onOpenChange={(open) => {
                                setIsTestimonialsTooltipOpen(open);
                              }}
                            >
                              <TooltipTrigger asChild>
                                <p className="text-card-foreground mb-6 text-sm sm:text-base line-clamp-6 cursor-pointer">
                                  {
                                    testimonials[currentTestimonialIndex]
                                      .message
                                  }
                                </p>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-md max-h-96 overflow-y-auto">
                                  {
                                    testimonials[currentTestimonialIndex]
                                      .message
                                  }
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
      </ReactLenis>
    </>
  );
}
