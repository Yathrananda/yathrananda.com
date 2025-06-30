"use client";

import type React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Speak directly with our travel experts",
      href: "tel:+15551234567",
      available: "Mon-Fri 9AM-6PM EST",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@yathrananda.com",
      description: "Send us your travel inquiries",
      href: "mailto:hello@yathrananda.com",
      available: "Response within 24 hours",
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      content: "123 Travel Street, Adventure City, AC 12345",
      description: "Schedule an in-person consultation",
      href: "https://maps.google.com",
      available: "By appointment only",
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
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Get In Touch</span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              Contact Our Travel Experts
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            >
              Ready to start planning your next adventure? Our experienced
              travel consultants are here to help you create the perfect
              itinerary tailored to your dreams and preferences.
            </motion.p>
          </div>
        </section>

        {/* Contact Methods */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6"
          aria-labelledby="contact-methods-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                id="contact-methods-heading"
                className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
              >
                How to Reach Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the contact method that works best for you. We're here to
                help make your travel dreams come true.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center shadow-lg transition-all duration-200 ease-out group hover:shadow-xl hover:border-primary/50"
                  variants={scaleIn}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-200 group-hover:bg-primary/20">
                    <method.icon
                      className="w-8 h-8 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {method.title}
                  </h3>
                  <p className="text-primary font-semibold mb-2">
                    {method.content}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {method.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    <span>{method.available}</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6 bg-muted"
          aria-labelledby="contact-form-heading"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="contact-form-heading"
                className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
              >
                Send Us a Message
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24
                hours with personalized travel recommendations.
              </p>
            </div>

            <motion.div
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                aria-label="Contact form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-card-foreground mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out bg-background text-foreground placeholder:text-muted-foreground"
                      placeholder="Enter your full name"
                      aria-label="Full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-card-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out bg-background text-foreground placeholder:text-muted-foreground"
                      placeholder="Enter your email address"
                      aria-label="Email address"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-card-foreground mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out bg-background text-foreground"
                    aria-label="Select inquiry subject"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="trip-planning">
                      Trip Planning Consultation
                    </option>
                    <option value="booking">Booking Assistance</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="group-travel">Group Travel</option>
                    <option value="support">Travel Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-card-foreground mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out bg-background text-foreground placeholder:text-muted-foreground resize-vertical"
                    placeholder="Tell us about your travel plans, preferred destinations, budget, or any specific questions you have..."
                    aria-label="Your message"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-lg flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Send your message to Yathrananda"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Office Hours & Additional Info */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6"
          aria-labelledby="office-info-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3
                  id="office-info-heading"
                  className="text-xl sm:text-2xl font-bold text-foreground mb-6"
                >
                  Office Hours & Information
                </h3>
                <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">
                        Monday - Friday:
                      </span>
                      <span className="text-card-foreground font-medium">
                        9:00 AM - 6:00 PM EST
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Saturday:</span>
                      <span className="text-card-foreground font-medium">
                        10:00 AM - 4:00 PM EST
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Sunday:</span>
                      <span className="text-card-foreground font-medium">
                        Closed
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">
                        Emergency Support:
                      </span>
                      <span className="text-card-foreground font-medium">
                        24/7 for active travelers
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                  What to Expect
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-1">
                        Quick Response
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        We respond to all inquiries within 24 hours during
                        business days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-1">
                        Personalized Consultation
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Every response is tailored to your specific travel needs
                        and preferences.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-1">
                        No Obligation
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Initial consultations and quotes are completely free
                        with no commitment required.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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
                  Ready to Start Your Adventure?
                </h2>
                <p className="text-base sm:text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                  Don't wait any longer to turn your travel dreams into reality.
                  Contact us today and let's start planning your perfect journey
                  together.
                </p>
                <motion.button
                  className="bg-background text-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-background/90 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Call Yathrananda now"
                >
                  Call Us Now: +1 (555) 123-4567
                </motion.button>
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
