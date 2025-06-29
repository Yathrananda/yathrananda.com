"use client";

import { JSX, useCallback, useEffect } from "react";
import type React from "react";
import Image from "next/image";
import { Search, Play, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import { HTMLAttributes, useRef, useState } from "react";
import DestinationsSection from "./_components/packages-section-type-1";
import PackagesSectionType2 from "./_components/packages-section-type-2";
import Header from "./_components/header";
import { VideoModal } from "./_components/video-modal";

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

const heroContent = [
  {
    type: "image",
    url: "/images/hero-background-2.jpg",
    alt: "Beautiful travel destination scenery",
    poster: "",
  },
  {
    type: "video",
    url: "/videos/hero-video-1.mp4",
    poster: "/images/video-poster-1.jpg",
  },
  {
    type: "image",
    url: "/images/hero-background.jpg",
    alt: "Scenic mountain landscape",
  },
  {
    type: "video",
    url: "/videos/hero-video-2.mp4",
    poster: "/images/video-poster-2.jpg",
  },
  {
    type: "image",
    url: "/images/hero-background-3.jpg",
    alt: "Tropical beach paradise",
  },
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(2);

  const nextImage = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroContent.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(nextImage, 5000);
    return () => clearInterval(intervalId);
  }, [nextImage]);

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
              key={content.url}
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
                  aria-label={content.alt}
                />
              ) : (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={content.poster}
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
                className="bg-background text-card-foreground backdrop-blur-sm rounded-2xl px-12 py-3 border border-background/30 sm:rounded-xl p-4 sm:p-5 max-w-7xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                role="search"
                aria-labelledby="search-heading"
              >
                <h2
                  id="search-heading"
                  className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
                >
                  Find Your Perfect Destination
                </h2>
                <form className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
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
                      className="relative flex flex-col items-start w-full justify-center"
                    >
                      <label
                        htmlFor={field.label.toLowerCase().replace(" ", "-")}
                        className="block text-xs font-medium text-card-foreground mb-1.5"
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
                          className={`w-full no-calendar px-4 py-2 outline-none border border-border rounded-lg text-sm bg-transparent text-card-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-background focus:border-background ${
                            field.icon ? "pl-8" : ""
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </form>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="col-span-3 flex items-center justify-start gap-2">
                    {[
                      "All",
                      "International",
                      "Domestic",
                      "Adventure",
                      "Cultural",
                    ].map((item) => (
                      <button
                        key={item}
                        data-active={item === "All"}
                        className={`w-full bg-background text-card-foreground px-4 py-2 rounded-lg text-sm transition-all duration-200 ease-out hover:bg-muted hover:text-muted-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground border border-border`}
                        onClick={() => console.log(`Filter by ${item}`)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground py-2.5 font-medium text-sm flex items-center justify-center space-x-2 transition-colors"
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
        <DestinationsSection />
        {/* Statistics Section */}
        <AnimatedSection
          className="py-12 sm:py-16 px-4 sm:px-6 bg-muted"
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
        <PackagesSectionType2 />
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

            <motion.div
              className="space-y-3 sm:space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {[
                {
                  question:
                    "How do I book a trip with Yathrananda travel agency?",
                  answer:
                    "Simply reach out to us via our website, phone, or email. Share your travel preferences, budget, and desired destinations. We'll create a personalized itinerary for you. Once finalized, you can confirm your booking with our secure payment system. We specialize in creating customized travel experiences tailored to your needs, whether it's destinations, activities, or accommodations.",
                },
                "Can I customize my travel package with Yathrananda?",
                "Do you offer travel insurance for international trips?",
                "What types of adventure tours do you organize?",
                "Can you arrange flights and accommodations together?",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="border border-border rounded-lg transition-all duration-200 ease-out hover:shadow-md bg-card"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.button
                    className="w-full flex items-center justify-between p-4 sm:p-6 text-left transition-all duration-200 ease-out hover:bg-muted rounded-lg"
                    aria-expanded={typeof item === "object"}
                    aria-controls={
                      typeof item === "object"
                        ? `faq-answer-${index}`
                        : undefined
                    }
                  >
                    <span className="font-medium text-card-foreground text-sm sm:text-base pr-4">
                      {index + 1}.{" "}
                      {typeof item === "string" ? item : item.question}
                    </span>
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <ChevronDown
                        className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0"
                        aria-hidden="true"
                      />
                    </motion.div>
                  </motion.button>
                  {typeof item === "object" && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      className="px-4 sm:px-6 pb-4 sm:pb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <p className="text-muted-foreground text-sm">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
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
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2" aria-hidden="true">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-6 h-6 sm:w-8 sm:h-8 bg-muted-foreground rounded-full border-2 border-background"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{
                            duration: 0.2,
                            ease: "easeOut",
                            delay: i * 0.05,
                          }}
                          viewport={{ once: true }}
                        />
                      ))}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      <span className="font-semibold">More than 500+</span>
                      <br />
                      <span>Happy Travelers</span>
                    </div>
                  </div>
                </div>

                <motion.blockquote
                  className="bg-card p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-border transition-all duration-200 ease-out hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="text-primary text-3xl sm:text-4xl mb-4"
                    aria-hidden="true"
                  >
                    "
                  </div>
                  <p className="text-card-foreground mb-6 text-sm sm:text-base">
                    Working with Yathrananda travel team was an absolute
                    pleasure. They understood our vision for the perfect
                    vacation and helped us find destinations that exceeded our
                    expectations. The personalized service and attention to
                    detail made our journey unforgettable. We couldn't have
                    planned such an amazing trip without their expertise!
                  </p>
                  <footer className="flex items-center space-x-4">
                    <motion.div
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-full border border-border"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      aria-hidden="true"
                    />
                    <div>
                      <cite className="font-semibold text-card-foreground text-sm sm:text-base not-italic">
                        Sajibur Rahman
                      </cite>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Travel Enthusiast & CEO
                      </div>
                    </div>
                  </footer>
                </motion.blockquote>
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
                    src="/images/happy-traveler.jpg"
                    alt="Happy Yathrananda client enjoying their travel experience"
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
              className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative z-10">
                <h2
                  id="newsletter-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
                >
                  Start Your Adventure Today
                </h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
                  Join thousands of travelers who trust Yathrananda for their
                  perfect journey
                </p>
                <motion.button
                  className="bg-background text-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ease-out hover:bg-background/90 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Start planning your trip with Yathrananda"
                >
                  Plan Your Trip Now
                </motion.button>
              </div>
              <div
                className="absolute inset-0 bg-foreground/20"
                aria-hidden="true"
              ></div>
            </motion.div>
          </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <AnimatedSection as="footer">
        <footer
          className="bg-foreground text-background py-12 sm:py-16 px-4 sm:px-6"
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
                <div className="flex items-center space-x-2 mb-6">
                  <div
                    className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="text-primary-foreground font-bold text-sm">
                      M
                    </span>
                  </div>
                  <span className="text-background font-semibold text-lg">
                    Yathrananda
                  </span>
                </div>
                <p className="text-muted-foreground mb-6 text-sm">
                  Subscribe to our newsletter for exclusive travel deals,
                  destination guides, and travel tips.
                </p>
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address for newsletter
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out text-foreground placeholder:text-muted-foreground"
                    aria-label="Email address for newsletter subscription"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 rounded-lg text-sm transition-all duration-200 ease-out hover:bg-primary-hover shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Subscribe to Yathrananda newsletter"
                  >
                    Subscribe
                  </motion.button>
                </form>
              </motion.div>

              {[
                {
                  title: "Destinations",
                  links: [
                    "Thailand Tours",
                    "Tokyo Adventures",
                    "Chicago Trips",
                    "Cox's Bazar",
                    "Europe Packages",
                  ],
                },
                {
                  title: "Services",
                  links: [
                    "Trip Planning",
                    "Hotel Booking",
                    "Flight Reservations",
                    "Travel Insurance",
                    "24/7 Support",
                  ],
                },
                {
                  title: "Company",
                  links: [
                    "About Yathrananda",
                    "Travel Blog",
                    "Customer Reviews",
                    "Contact Us",
                    "Careers",
                  ],
                },
              ].map((section) => (
                <motion.div key={section.title} variants={fadeInUp}>
                  <h3 className="font-semibold mb-4 text-sm sm:text-base text-background">
                    {section.title}
                  </h3>
                  <nav aria-label={`${section.title} links`}>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      {section.links.map((link) => (
                        <li key={link}>
                          <motion.a
                            href="#"
                            className="transition-all duration-200 ease-out hover:text-background"
                            whileHover={{ x: 5 }}
                            aria-label={`Navigate to ${link}`}
                          >
                            {link}
                          </motion.a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="border-t border-border mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Yathrananda Travel Agency. All
                rights reserved. | Privacy Policy | Terms of Service
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
