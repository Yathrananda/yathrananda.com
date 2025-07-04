"use client";

import { JSX, useCallback, useEffect } from "react";
import type React from "react";
import Image from "next/image";
import { Search, Play, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import { HTMLAttributes, useRef, useState } from "react";
import { VideoModal } from "./_components/video-modal";
import Header from "./_components/hero-header";
import UpcomingToursSection from "./_components/sections/upcoming-tours-section";
import TrendingToursSection from "./_components/sections/trending-tours-section";
import InternationalToursSection from "./_components/sections/international-tours-section";
import DomesticToursSection from "./_components/sections/domestic-tours-section";
import { useRouter } from "next/navigation";
import { HeroMedia } from "@/types/package-detail";

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
  const [testimonialsError, setTestimonialsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/hero`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch hero content');
        }

        const data = await response.json();
        const sortedMedia = data.media.sort((a: HeroMedia, b: HeroMedia) => a.carousel_order - b.carousel_order);
        setHeroContent(sortedMedia);
      } catch (err) {
        console.error('Error fetching hero content:', err);
        setError('Failed to load hero content');
        // Fallback to default content if API fails
        setHeroContent([
          {
            id: '1',
            type: 'image',
            url: '/images/hero-background-2.jpg',
            carousel_order: 1
          },
          {
            id: '2',
            type: 'video',
            url: '/videos/hero-video-1.mp4',
            carousel_order: 2
          },
          {
            id: '3',
            type: 'image',
            url: '/images/hero-background.jpg',
            carousel_order: 3
          },
          {
            id: '4',
            type: 'video',
            url: '/videos/hero-video-2.mp4',
            carousel_order: 4
          },
          {
            id: '5',
            type: 'image',
            url: '/images/hero-background-3.jpg',
            carousel_order: 5
          }
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
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/testimonials`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }

        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setTestimonialsError('Failed to load testimonials');
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/faqs`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }

        const data = await response.json();
        setFaqs(data.faqs);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setFaqsError('Failed to load FAQs');
      } finally {
        setIsFaqsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50 transition-all duration-200"
      >
        Skip to main content
      </a>
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {heroContent.map((content, index) => (
            <motion.div
              key={content.id}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: currentImageIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              aria-hidden={currentImageIndex !== index}
            >
              {content.type === "image" ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${content.url})` }}
                  role="img"
                  aria-label={`Hero image ${index + 1}`}
                />
              ) : (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={content.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </motion.div>
          ))}

          <div
            className="absolute inset-0 bg-foreground/30"
            aria-hidden="true"
          ></div>

          {/* Navigation dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-2">
              {heroContent.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === index
                      ? "bg-primary w-4"
                      : "bg-background/60 hover:bg-background/80"
                  }`}
                  onClick={() => {
                    setCurrentImageIndex(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentImageIndex === index}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 py-20">
            <div className="text-center max-w-4xl mx-auto w-full sm:mt-12">
              <motion.div
                className="mb-6 sm:mb-8 mt-6 sm:mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                <span className="bg-background/20 text-primary-foreground px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm backdrop-blur-sm border border-background/30">
                  Travel More, Worry Less
                </span>
              </motion.div>

              <motion.h1
                id="hero-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground mb-4 sm:mb-6 leading-tight px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                Explore the World, One Journey at a Time
              </motion.h1>

              <motion.p
                className="text-primary-foreground/90 text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              >
                Discover personalized and hassle-free travel experiences with
                Yathrananda. Expert trip planning, adventure tours, and 24/7
                support for your perfect journey to destinations worldwide.
              </motion.p>

              <motion.div
                className="bg-background text-card-foreground backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-background/30 w-full max-w-7xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                role="search"
                aria-labelledby="search-heading"
              >
                <h2
                  id="search-heading"
                  className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4"
                >
                  Find Your Perfect Destination
                </h2>

                {/* Search Form */}
                <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  {[
                    {
                      label: "Where to?",
                      placeholder: "Destination",
                      type: "text",
                      icon: Search,
                    },
                    {
                      label: "Check in",
                      type: "date",
                      placeholder: "Add date",
                    },
                    {
                      label: "Check out",
                      type: "date",
                      placeholder: "Add date",
                    },
                    {
                      label: "Guests",
                      type: "number",
                      placeholder: "Add guests",
                      min: "1",
                    },
                  ].map((field, index) => (
                    <div
                      key={field.label}
                      className="relative flex flex-col items-start w-full"
                    >
                      <label
                        htmlFor={field.label.toLowerCase().replace(" ", "-")}
                        className="block text-xs font-medium text-card-foreground mb-1.5 ml-1"
                      >
                        {field.label}
                      </label>
                      <div className="relative w-full">
                        {field.icon && (
                          <field.icon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-card-foreground" />
                        )}
                        <input
                          id={field.label.toLowerCase().replace(" ", "-")}
                          type={field.type}
                          min={field.min}
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-2 outline-none border border-border rounded-lg text-sm bg-transparent text-card-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-background focus:border-background ${
                            field.icon ? "pl-8" : ""
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </form>

                {/* Filter Buttons and Search */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-2 min-w-max">
                      {[
                        "All",
                        "International",
                        "Domestic"
                      ].map((item) => (
                        <button
                          key={item}
                          data-active={item === "All"}
                          className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ease-out whitespace-nowrap
              bg-background text-card-foreground hover:bg-muted hover:text-muted-foreground 
              data-[active=true]:bg-primary data-[active=true]:text-primary-foreground 
              border border-border`}
                          onClick={() => console.log(`Filter by ${item}`)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    className="flex-shrink-0 w-full sm:w-auto rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground py-2.5 px-6 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Search className="w-4 h-4" aria-hidden="true" />
                    <span>Search</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
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
                        setExpandedFaqId(expandedFaqId === item.id ? null : item.id)
                      }
                      aria-expanded={expandedFaqId === item.id}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span className="font-medium text-card-foreground text-sm sm:text-base pr-4">
                        {index + 1}. {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedFaqId === item.id ? 180 : 0 }}
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
                            src={testimonials[currentTestimonialIndex].image_url}
                            alt={`${testimonials[currentTestimonialIndex].client_name}'s profile picture`}
                            width={48}
                            height={48}
                            className="rounded-full object-cover border border-border"
                          />
                          <div>
                            <cite className="font-semibold text-card-foreground text-sm sm:text-base not-italic">
                              {testimonials[currentTestimonialIndex].client_name}
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
      </main>

      {/* Footer */}
      <AnimatedSection as="footer">
        <footer
          className="bg-background border-t border-border py-12 sm:py-16 px-4 sm:px-6"
          role="contentinfo"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="sm:col-span-2 lg:col-span-1"
                variants={fadeInUp}
              >
                <div className="flex items-center space-x-2 group">
                  <Image
                    src={"/images/logo.png"}
                    alt="Yathrananda Logo"
                    width={40}
                    height={40}
                    className="w-32 object-cover rounded-full"
                    loading="eager"
                    priority
                  />
                </div>
                <p className="text-muted-foreground mb-6 text-sm max-w-sm">
                  Subscribe to our newsletter for exclusive travel deals,
                  destination guides, and travel tips.
                </p>
                <form className="relative group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all duration-200 ease-out text-foreground placeholder:text-muted-foreground pr-24"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-1 top-1 bg-primary text-primary-foreground px-4 py-1 rounded-md text-sm transition-all duration-200 hover:bg-primary-hover"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe
                  </motion.button>
                </form>
              </motion.div>

              {[
                {
                  title: "Destinations",
                  links: [
                    {
                      title: "Group Tours",
                      link: "/international-tours",
                    },
                    {
                      title: "Honeymoon Packages",
                      link: "/international-tours",
                    },
                    {
                      title: "Family Holidays",
                      link: "/international-tours",
                    },
                    {
                      title: "Corporate Packages",
                      link: "/international-tours",
                    },
                  ],
                },
                {
                  title: "Services",
                  links: [
                    {
                      title: "Trip Planning",
                      link: "/services",
                    },
                    {
                      title: "Hotel Booking",
                      link: "/services",
                    },
                    {
                      title: "Flight Reservations",
                      link: "/services",
                    },
                    {
                      title: "24/7 Support",
                      link: "/services",
                    },
                  ],
                },
                {
                  title: "Company",
                  links: [
                    {
                      title: "About Us",
                      link: "/about",
                    },
                    {
                      title: "Travel Blog",
                      link: "/about",
                    },
                    {
                      title: "Reviews",
                      link: "/about",
                    },
                    {
                      title: "Contact",
                      link: "/contact",
                    },
                  ],
                },
              ].map((section) => (
                <motion.div key={section.title} variants={fadeInUp}>
                  <h3 className="font-semibold mb-4 text-sm text-foreground">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <motion.a
                          href={link.link}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 block"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.title}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Copyright Section */}
            <motion.div
              className="border-t border-border/40 mt-12 pt-8 text-center text-muted-foreground/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-sm">
                © {new Date().getFullYear()} Yathrananda Travel. All rights
                reserved.
              </p>
            </motion.div>
          </div>
        </footer>
      </AnimatedSection>
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://www.youtube.com/embed/9oZVMcF55tQ" // Replace with your video URL
      />
    </div>
  );
}
