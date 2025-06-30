"use client";

import type React from "react";
import {
  Plane,
  Hotel,
  MapPin,
  Shield,
  Calendar,
  Users,
  Camera,
  Mountain,
  Compass,
  Globe,
  Heart,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { HTMLAttributes, useEffect, useRef, useState, JSX } from "react";
import Header from "../_components/header";

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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
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

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const serviceCategories = [
    {
      id: "planning",
      title: "Trip Planning & Consultation",
      icon: Compass,
      description:
        "Personalized travel planning services tailored to your preferences and budget",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "booking",
      title: "Booking & Reservations",
      icon: Calendar,
      description:
        "Complete booking services for flights, accommodations, and activities",
      color: "from-green-500 to-green-600",
    },
    {
      id: "experiences",
      title: "Unique Experiences",
      icon: Mountain,
      description:
        "Curated adventures and cultural experiences you won't find elsewhere",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "support",
      title: "Travel Support",
      icon: Shield,
      description: "24/7 assistance and support throughout your entire journey",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const detailedServices = [
    {
      category: "planning",
      title: "Personalized Trip Planning",
      icon: MapPin,
      description:
        "Our expert travel consultants work with you to create a completely customized itinerary based on your interests, budget, and travel style.",
      features: [
        "One-on-one consultation with travel experts",
        "Customized itinerary creation",
        "Destination research and recommendations",
        "Budget planning and optimization",
        "Travel document assistance",
      ],
      pricing: "Starting from $150 per consultation",
      image: "/images/services/trip-planning.jpg",
      alt: "Travel consultant working with client on personalized trip planning",
    },
    {
      category: "planning",
      title: "Destination Research & Recommendations",
      icon: Globe,
      description:
        "Comprehensive destination analysis including weather patterns, local customs, must-see attractions, and hidden gems.",
      features: [
        "Detailed destination guides",
        "Seasonal travel recommendations",
        "Cultural insights and etiquette tips",
        "Local contact recommendations",
        "Safety and health information",
      ],
      pricing: "Included with trip planning",
      image: "/images/services/destination-research.jpg",
      alt: "Travel expert researching destinations and creating recommendations",
    },
    {
      category: "booking",
      title: "Flight Booking & Management",
      icon: Plane,
      description:
        "Complete flight booking services with access to exclusive deals and flexible booking options for stress-free travel.",
      features: [
        "Best price guarantee on flights",
        "Flexible booking and cancellation",
        "Seat selection and upgrades",
        "Multi-city and complex routing",
        "Travel insurance options",
      ],
      pricing: "No booking fees - competitive rates",
      image: "/images/services/flight-booking.jpg",
      alt: "Professional flight booking service with multiple airline options",
    },
    {
      category: "booking",
      title: "Accommodation Reservations",
      icon: Hotel,
      description:
        "From luxury resorts to boutique hotels and unique stays, we find the perfect accommodation for your needs.",
      features: [
        "Handpicked hotels and resorts",
        "Exclusive rates and upgrades",
        "Room preference guarantees",
        "Special occasion arrangements",
        "Alternative accommodation options",
      ],
      pricing: "Best rate guarantee",
      image: "/images/services/accommodation.jpg",
      alt: "Luxury hotel accommodation booking and reservation services",
    },
    {
      category: "experiences",
      title: "Adventure Tours & Activities",
      icon: Mountain,
      description:
        "Thrilling adventure experiences from mountain climbing to deep-sea diving, tailored to your skill level and interests.",
      features: [
        "Professional guide arrangements",
        "Equipment and gear provision",
        "Safety briefings and training",
        "Small group experiences",
        "Photography services available",
      ],
      pricing: "From $200 per person per day",
      image: "/images/services/adventure-tours.jpg",
      alt: "Adventure tour group exploring mountain landscapes with professional guides",
    },
    {
      category: "experiences",
      title: "Cultural Immersion Programs",
      icon: Heart,
      description:
        "Authentic cultural experiences that connect you with local communities, traditions, and ways of life.",
      features: [
        "Local family homestays",
        "Traditional cooking classes",
        "Artisan workshop visits",
        "Language learning opportunities",
        "Community project participation",
      ],
      pricing: "From $300 per person per experience",
      image: "/images/services/cultural-immersion.jpg",
      alt: "Travelers participating in authentic cultural immersion experiences with locals",
    },
    {
      category: "experiences",
      title: "Photography Tours",
      icon: Camera,
      description:
        "Capture stunning memories with our professional photography tours led by expert photographers and local guides.",
      features: [
        "Professional photographer guide",
        "Equipment rental available",
        "Photo editing workshops",
        "Exclusive location access",
        "Digital photo delivery",
      ],
      pricing: "From $400 per person per day",
      image: "/images/services/photography-tours.jpg",
      alt: "Professional photography tour capturing stunning landscapes and cultural moments",
    },
    {
      category: "support",
      title: "24/7 Travel Assistance",
      icon: Clock,
      description:
        "Round-the-clock support for any travel emergencies, changes, or assistance needed during your journey.",
      features: [
        "Emergency contact hotline",
        "Real-time flight monitoring",
        "Rebooking assistance",
        "Medical emergency support",
        "Lost luggage assistance",
      ],
      pricing: "Included with all bookings",
      image: "/images/services/travel-support.jpg",
      alt: "24/7 travel support team assisting customers with travel emergencies",
    },
    {
      category: "support",
      title: "Travel Insurance & Protection",
      icon: Shield,
      description:
        "Comprehensive travel insurance options to protect your investment and provide peace of mind during your travels.",
      features: [
        "Trip cancellation coverage",
        "Medical emergency protection",
        "Baggage loss protection",
        "Travel delay compensation",
        "Adventure activity coverage",
      ],
      pricing: "From $50 per person per trip",
      image: "/images/services/travel-insurance.jpg",
      alt: "Travel insurance protection covering various travel scenarios and emergencies",
    },
    {
      category: "booking",
      title: "Group Travel Coordination",
      icon: Users,
      description:
        "Specialized services for group travel including corporate retreats, family reunions, and special interest groups.",
      features: [
        "Group rate negotiations",
        "Coordinated transportation",
        "Group activity planning",
        "Dietary requirement management",
        "Payment plan options",
      ],
      pricing: "Custom pricing based on group size",
      image: "/images/services/group-travel.jpg",
      alt: "Group travel coordination for corporate and family group adventures",
    },
  ];

  const filteredServices =
    activeCategory === "all"
      ? detailedServices
      : detailedServices.filter(
          (service) => service.category === activeCategory
        );

  const testimonials = [
    {
      name: "Jennifer Martinez",
      location: "New York, USA",
      text: "Yathrananda's trip planning service exceeded all expectations. Every detail was perfect!",
      rating: 5,
      service: "Trip Planning",
    },
    {
      name: "David Chen",
      location: "Toronto, Canada",
      text: "The 24/7 support saved our vacation when our flight was cancelled. Incredible service!",
      rating: 5,
      service: "Travel Support",
    },
    {
      name: "Sarah Williams",
      location: "London, UK",
      text: "The cultural immersion program in Thailand was life-changing. Highly recommended!",
      rating: 5,
      service: "Cultural Experiences",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50 transition-all duration-200"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        {/* Page Header */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <motion.div
                className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Star className="w-4 h-4" aria-hidden="true" />
                <span>Premium Travel Services</span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                Comprehensive Travel Services
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
              >
                From personalized trip planning to 24/7 travel support, we offer
                a complete suite of services designed to make your travel dreams
                a reality. Every service is crafted with attention to detail and
                your satisfaction in mind.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
              >
                <motion.button
                  className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-lg flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Get a custom quote for travel services"
                >
                  <span>Get Custom Quote</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </motion.button>
                <motion.button
                  className="border border-border text-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-muted"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="View our service portfolio"
                >
                  View Portfolio
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6"
          aria-labelledby="categories-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                id="categories-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6"
              >
                Our Service Categories
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We organize our services into four main categories to help you
                find exactly what you need for your perfect journey.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className={`relative p-6 rounded-2xl text-white overflow-hidden cursor-pointer transition-all duration-200 ease-out group ${
                    activeCategory === category.id
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${category.color
                      .replace("from-", "")
                      .replace(" to-", ", ")})`,
                  }}
                  variants={scaleIn}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setActiveCategory(category.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Filter services by ${category.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveCategory(category.id);
                    }
                  }}
                >
                  <div className="relative z-10">
                    <category.icon
                      className="w-8 h-8 mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-bold mb-3">{category.title}</h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </motion.div>
              ))}
            </motion.div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <motion.button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out ${
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-background"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory("all")}
                aria-label="Show all services"
              >
                All Services
              </motion.button>
              {serviceCategories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-background"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  aria-label={`Filter by ${category.title}`}
                >
                  {category.title}
                </motion.button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Service Details */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6 bg-muted"
          aria-labelledby="services-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                id="services-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6"
              >
                Detailed Service Offerings
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Explore our comprehensive range of travel services, each
                designed to enhance your journey and provide exceptional value.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {filteredServices.map((service, index) => (
                <motion.article
                  key={index}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg transition-all duration-200 ease-out group hover:shadow-xl"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.alt}
                      fill
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center">
                        <service.icon
                          className="w-5 h-5 text-primary-foreground"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-card-foreground mb-3">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start space-x-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle
                              className="w-4 h-4 text-success flex-shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Pricing
                        </span>
                        <div className="text-lg font-bold text-primary">
                          {service.pricing}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-sm flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Get quote for ${service.title}`}
                      >
                        <span>Get Quote</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </motion.button>
                      <motion.button
                        className="flex-1 border border-border text-card-foreground py-3 px-4 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-muted"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Learn more about ${service.title}`}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6"
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                id="testimonials-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6"
              >
                What Our Clients Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Don't just take our word for it. Here's what our satisfied
                clients have to say about our services.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg transition-all duration-200 ease-out hover:shadow-xl"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-warning fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="text-card-foreground mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <footer>
                    <div className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                    <div className="text-xs text-primary font-medium mt-1">
                      Service: {testimonial.service}
                    </div>
                  </footer>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection
          id="contact"
          className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-primary/5 to-accent/5"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                id="contact-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6"
              >
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Contact our travel experts today to discuss your needs and get a
                personalized quote for any of our services.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+1 (555) 123-4567",
                  description: "Speak directly with our travel experts",
                  action: "Call Now",
                  href: "tel:+15551234567",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "services@yathrananda.com",
                  description: "Get detailed information about our services",
                  action: "Send Email",
                  href: "mailto:services@yathrananda.com",
                },
                {
                  icon: Calendar,
                  title: "Schedule Consultation",
                  content: "Free 30-minute consultation",
                  description: "Book a personalized planning session",
                  action: "Book Now",
                  href: "#booking",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center shadow-lg transition-all duration-200 ease-out group hover:shadow-xl"
                  variants={scaleIn}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-200 group-hover:bg-primary/20">
                    <contact.icon
                      className="w-8 h-8 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {contact.title}
                  </h3>
                  <p className="text-primary font-semibold mb-2">
                    {contact.content}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {contact.description}
                  </p>
                  <motion.a
                    href={contact.href}
                    className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`${contact.action} - ${contact.title}`}
                  >
                    <span>{contact.action}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Final Call to Action */}
        <AnimatedSection className="py-16 sm:py-20 px-4 sm:px-6 bg-muted">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-gradient-to-r from-primary to-primary-hover rounded-2xl p-8 sm:p-12 text-primary-foreground relative overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                  Transform Your Travel Dreams Into Reality
                </h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
                  With our comprehensive suite of travel services, expert
                  guidance, and 24/7 support, your perfect journey is just one
                  conversation away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="bg-background text-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-background/90 shadow-lg flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Start planning your dream trip"
                  >
                    <span>Start Planning Today</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </motion.button>
                  <motion.button
                    className="border-2 border-primary-foreground text-primary-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-foreground hover:text-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Download our service brochure"
                  >
                    Download Brochure
                  </motion.button>
                </div>
              </div>
              <div
                className="absolute inset-0 bg-foreground/10"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
