"use client";

import type React from "react";
import { Check, Star, ArrowRight, Phone, Mail, Calendar } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { HTMLAttributes, useEffect, useRef, useState, JSX } from "react";
import Link from "next/link";
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

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Essential Planning",
      price: "$150",
      period: "per consultation",
      description: "Perfect for independent travelers who need expert guidance",
      features: [
        "1-hour consultation session",
        "Personalized destination recommendations",
        "Basic itinerary outline",
        "Travel document checklist",
        "Email support for 7 days",
      ],
      popular: false,
      cta: "Get Started",
    },
    {
      name: "Complete Journey",
      price: "$500",
      period: "per trip",
      description: "Comprehensive planning and booking for stress-free travel",
      features: [
        "Full trip planning & consultation",
        "Complete booking services",
        "Detailed day-by-day itinerary",
        "24/7 travel support",
        "Travel insurance assistance",
        "Local contact recommendations",
        "Emergency assistance",
      ],
      popular: true,
      cta: "Most Popular",
    },
    {
      name: "Luxury Experience",
      price: "Custom",
      period: "pricing",
      description:
        "Premium travel experiences with exclusive access and VIP treatment",
      features: [
        "Dedicated travel concierge",
        "Exclusive venue access",
        "Private transportation",
        "VIP experiences & upgrades",
        "Personal travel photographer",
        "24/7 premium support",
        "Post-trip follow-up",
      ],
      popular: false,
      cta: "Contact Us",
    },
  ];

  const additionalServices = [
    { service: "Flight Booking", price: "No fees - competitive rates" },
    { service: "Hotel Reservations", price: "Best rate guarantee" },
    { service: "Travel Insurance", price: "From $50 per person" },
    {
      service: "Group Travel (10+ people)",
      price: "15% discount on planning fees",
    },
    { service: "Last-minute Changes", price: "$75 per modification" },
    { service: "Emergency Support", price: "Included with all packages" },
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

      {/* Navigation Header */}
      <Header />

      <main id="main-content">
        {/* Page Header */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Star className="w-4 h-4" aria-hidden="true" />
              <span>Transparent Pricing</span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              Simple, Transparent Pricing
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            >
              Choose the perfect travel planning package for your needs. No
              hidden fees, no surprises - just exceptional value for
              extraordinary journeys.
            </motion.p>
          </div>
        </section>

        {/* Pricing Tiers */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6"
          aria-labelledby="pricing-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                id="pricing-heading"
                className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
              >
                Choose Your Travel Planning Package
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From basic consultation to luxury concierge services, we have
                the right package for every traveler.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  className={`relative bg-card border rounded-2xl p-6 sm:p-8 shadow-lg transition-all duration-200 ease-out group hover:shadow-xl ${
                    tier.popular
                      ? "border-primary ring-2 ring-primary/20 scale-105"
                      : "border-border hover:border-primary/50"
                  }`}
                  variants={scaleIn}
                  whileHover={{ y: tier.popular ? 0 : -5 }}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-2">
                      {tier.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl sm:text-4xl font-bold text-primary">
                        {tier.price}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        {tier.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {tier.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <Check
                          className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-card-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ease-out flex items-center justify-center space-x-2 ${
                      tier.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg"
                        : "border border-border text-card-foreground hover:bg-muted"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Select ${tier.name} package`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Additional Services */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6 bg-muted"
          aria-labelledby="additional-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                id="additional-heading"
                className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
              >
                Additional Services & Pricing
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Enhance your travel experience with our additional services, all
                at transparent, competitive rates.
              </p>
            </div>

            <motion.div
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="divide-y divide-border">
                {additionalServices.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 sm:p-6 hover:bg-muted/50 transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                      delay: index * 0.05,
                    }}
                    viewport={{ once: true }}
                  >
                    <span className="font-medium text-card-foreground">
                      {item.service}
                    </span>
                    <span className="text-primary font-semibold">
                      {item.price}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground mb-4">
                * Prices may vary based on destination, season, and specific
                requirements
              </p>
              <motion.button
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Get custom pricing quote"
              >
                Get Custom Quote
              </motion.button>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="contact-heading"
                className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
              >
                Ready to Start Planning?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Contact our travel experts to discuss your needs and get a
                personalized quote for your perfect journey.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+1 (555) 123-4567",
                  description: "Speak with our pricing specialists",
                  href: "tel:+15551234567",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "support@yathrananda.com",
                  description: "Get detailed pricing information",
                  href: "mailto:support@yathrananda.com",
                },
                {
                  icon: Calendar,
                  title: "Schedule Consultation",
                  content: "Free 15-minute call",
                  description: "Discuss your travel plans",
                  href: "/contact",
                },
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="bg-card border border-border rounded-2xl p-6 text-center shadow-lg transition-all duration-200 ease-out group hover:shadow-xl hover:border-primary/50"
                  variants={scaleIn}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 group-hover:bg-primary/20">
                    <contact.icon
                      className="w-6 h-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-primary font-semibold mb-2">
                    {contact.content}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {contact.description}
                  </p>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Final CTA */}
        <AnimatedSection className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-gradient-to-r from-primary to-primary-hover rounded-2xl p-8 sm:p-12 text-primary-foreground relative overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Start Your Journey Today
                </h2>
                <p className="text-base sm:text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                  Don't let planning stress hold you back from your dream
                  vacation. Let our experts handle the details while you focus
                  on the excitement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="bg-background text-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-background/90 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Get started with travel planning"
                  >
                    Get Started Now
                  </motion.button>
                  <motion.button
                    className="border-2 border-primary-foreground text-primary-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-foreground hover:text-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="View our services"
                  >
                    View Services
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
